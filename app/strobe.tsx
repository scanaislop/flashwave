import React, { useEffect, useRef, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, Animated, Platform, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import * as Brightness from 'expo-brightness';
import Torch from 'react-native-torch';
import { strobeStyles } from '@/components/styles/strobe';
import { strobeColors } from '@/constants/color';
import { Header } from '@/components/strobe/Header';
import { CenterControls } from '@/components/strobe/CenterControls';
import { HardwareControls } from '@/components/strobe/HardwareControls';
import { SpeedControl } from '@/components/strobe/SpeedControl';
import { EffectSelection } from '@/components/strobe/EffectSelection';
import { SustainedModeToggle } from '@/components/strobe/SustainedModeToggle';
import { ColorSelection } from '@/components/strobe/ColorSelection';
import { StrobeEffects } from '@/components/strobe/StrobeEffects';
import { ToggleControlsIcon } from '@/components/strobe/ToggleControlsIcon';

interface StrobeSettings {
  isStrobing: boolean;
  strobeSpeed: number;
  selectedColor: number;
  selectedEffect: number;
  sustainedMode: boolean;
  flashlightEnabled: boolean;
  screenBrightness: number;
}

const STORAGE_KEY = '@flashwave_strobe_settings';

export default function StrobeScreen() {
  const [isStrobing, setIsStrobing] = useState(false);
  const [strobeSpeed, setStrobeSpeed] = useState(0.5);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedEffect, setSelectedEffect] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [sustainedMode, setSustainedMode] = useState(true);
  const [flashlightEnabled, setFlashlightEnabled] = useState(false);
  const [screenBrightness, setScreenBrightness] = useState(1.0);
  const [originalBrightness, setOriginalBrightness] = useState(1.0);
  const [torchAvailable, setTorchAvailable] = useState(false);
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  
  const flashAnimation = useRef(new Animated.Value(0)).current;
  const sustainedAnimation = useRef(new Animated.Value(0)).current;
  const waveAnimation = useRef(new Animated.Value(0)).current;
  const burstAnimation = useRef(new Animated.Value(0)).current;
  const controlsOpacity = useRef(new Animated.Value(1)).current;
  const toggleIconOpacity = useRef(new Animated.Value(0)).current;
  const colorCycleAnimation = useRef(new Animated.Value(0)).current;
  const colorCycleLoopRef = useRef<Animated.CompositeAnimation | null>(null);

  const strobeInterval = useRef<NodeJS.Timeout | null>(null);
  const flashlightInterval = useRef<NodeJS.Timeout | null>(null);
  const hideControlsTimeout = useRef<NodeJS.Timeout | null>(null);
  const isMounted = useRef(true);

  const hideControls = useCallback(() => {
    Animated.parallel([Animated.timing(controlsOpacity, {
      toValue: 0, duration: 300, useNativeDriver: true
    }), Animated.timing(toggleIconOpacity, {
      toValue: 1, duration: 500, useNativeDriver: true
    })]).start(() => {
      setShowControls(false);
    });
  }, [controlsOpacity, toggleIconOpacity]);

  const showControlsPermanently = useCallback(() => {
    setShowControls(true);
    Animated.parallel([Animated.timing(controlsOpacity, {
      toValue: 1, duration: 200, useNativeDriver: true
    }), Animated.timing(toggleIconOpacity, {
      toValue: 0, duration: 200, useNativeDriver: true
    })]).start();
    if (hideControlsTimeout.current) {
      clearTimeout(hideControlsTimeout.current);
    }
  }, [controlsOpacity, toggleIconOpacity]);

  const showControlsTemporarily = useCallback(() => {
    setShowControls(true);
    Animated.parallel([Animated.timing(controlsOpacity, {
      toValue: 1, duration: 200, useNativeDriver: true
    }), Animated.timing(toggleIconOpacity, {
      toValue: 0, duration: 200, useNativeDriver: true
    })]).start();
    
    // Clear existing timer
    if (hideControlsTimeout.current) {
      clearTimeout(hideControlsTimeout.current);
    }
    
    // Only set auto-hide timer if strobing
    if (isStrobing) {
      hideControlsTimeout.current = setTimeout(() => {
        hideControls();
      }, 3000) as unknown as NodeJS.Timeout;
    }
  }, [controlsOpacity, toggleIconOpacity, isStrobing, hideControls]);

  // Load saved settings from AsyncStorage
  const loadSettings = useCallback(async () => {
    try {
      const savedSettings = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedSettings) {
        const settings: StrobeSettings = JSON.parse(savedSettings);
        if (isMounted.current) {
          setStrobeSpeed(settings.strobeSpeed);
          setSelectedColor(settings.selectedColor);
          setSelectedEffect(settings.selectedEffect);
          setSustainedMode(settings.sustainedMode);
          setFlashlightEnabled(settings.flashlightEnabled);
          setScreenBrightness(settings.screenBrightness);
          
          // Start strobing if it was active
          if (settings.isStrobing) {
            setIsStrobing(true);
          }
        }
      }
    } catch (error) {
      console.error('Failed to load settings', error);
    } finally {
      if (isMounted.current) {
        setIsInitialized(true);
      }
    }
  }, []);

  // Save settings to AsyncStorage whenever they change
  const saveSettings = useCallback(async () => {
    if (!isInitialized) return;
    
    const settings: StrobeSettings = {
      isStrobing,
      strobeSpeed,
      selectedColor,
      selectedEffect,
      sustainedMode,
      flashlightEnabled,
      screenBrightness,
    };

    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (error) {
      console.error('Failed to save settings', error);
    }
  }, [isStrobing, strobeSpeed, selectedColor, selectedEffect, sustainedMode, flashlightEnabled, screenBrightness, isInitialized]);

  // Load settings on mount
  useEffect(() => {
    loadSettings();
    return () => {
      isMounted.current = false;
    };
  }, [loadSettings]);

  // Save settings when they change
  useEffect(() => {
    if (!isInitialized) return;
    
    const saveTimeout = setTimeout(() => {
      saveSettings();
    }, 500); // Debounce to avoid too many saves
    
    return () => clearTimeout(saveTimeout);
  }, [saveSettings, isInitialized, isStrobing, strobeSpeed, selectedColor, selectedEffect, sustainedMode, flashlightEnabled, screenBrightness]);

  // Initialize and cleanup
  useEffect(() => {
    return () => {
      isMounted.current = false;
      // Cleanup intervals and timeouts
      if (strobeInterval.current) clearInterval(strobeInterval.current);
      if (flashlightInterval.current) clearInterval(flashlightInterval.current);
      if (hideControlsTimeout.current) clearTimeout(hideControlsTimeout.current);
    };
  }, []);
  
  // Handle screen tap to show controls
  const handleScreenTap = useCallback(() => {
    if (!showControls) {
      showControlsTemporarily();
    }
  }, [showControls, showControlsTemporarily]);

  useEffect(() => {
    const initializeHardware = async () => {
      if (Platform.OS === 'web') return;
      try {
        if (Platform.OS === 'ios') {
          if (Torch && Torch.switchState) {
            await Torch.switchState(false);
            setTorchAvailable(true);
          } else {
            console.log('Torch module not available');
          }
        } else {
          const cameraAllowed = await Torch.requestCameraPermission('Camera Permissions', 'We require camera permissions to use the torch on the back of your phone.');
          if (cameraAllowed) {
            if (Torch && Torch.switchState) {
              await Torch.switchState(false);
              setTorchAvailable(true);
            } else {
              console.log('Torch module not available');
            }
          }
        }
      } catch (error) {
        console.log('Could not check torch availability:', error);
      }
      try {
        const brightness = await Brightness.getBrightnessAsync();
        if (isMounted) {
          setOriginalBrightness(brightness);
          setScreenBrightness(brightness);
        }
      } catch (error) {
        console.log('Could not get brightness:', error);
      }
    };

    initializeHardware();

    return () => {
      isMounted.current = false;
      if (Platform.OS !== 'web') {
        Brightness.setBrightnessAsync(originalBrightness);
        if (torchAvailable) {
          if (Torch && Torch.switchState) {
            Torch.switchState(false);
          }
        }
      }
      // Clear intervals and timeouts
      if (strobeInterval.current) clearInterval(strobeInterval.current);
      if (flashlightInterval.current) clearInterval(flashlightInterval.current);
      if (hideControlsTimeout.current) clearTimeout(hideControlsTimeout.current);
    };
  }, []);

  useEffect(() => {
    const waveLoop = Animated.loop(Animated.sequence([Animated.timing(waveAnimation, {
      toValue: 1, duration: 1500, useNativeDriver: false
    }), Animated.timing(waveAnimation, {
      toValue: 0, duration: 1500, useNativeDriver: false
    })]));
    waveLoop.start();

    if (selectedColor === 6) {
      const loop = Animated.loop(Animated.timing(colorCycleAnimation, {
        toValue: 1, duration: 3000, useNativeDriver: false
      }));
      loop.start();
      colorCycleLoopRef.current = loop;
    }

    return () => {
      waveLoop.stop();
      if (colorCycleLoopRef.current) {
        colorCycleLoopRef.current.stop();
      }
    };
  }, [selectedColor]);

  const handleBrightnessChange = async (value: number) => {
    if (Platform.OS === 'web') {
      setScreenBrightness(value);
      return;
    }
    try {
      await Brightness.setBrightnessAsync(value);
      setScreenBrightness(value);
    } catch (error) {
      console.log('Error setting brightness:', error);
    }
  };

  const toggleFlashlight = async () => {
    if (Platform.OS === 'web') {
      Alert.alert('Not Available', 'Camera flashlight is not available on web platform.');
      return;
    }
    if (!torchAvailable) {
      Alert.alert('Not Available', 'Flashlight is not available on this device.');
      return;
    }
    try {
      const newState = !flashlightEnabled;
      setFlashlightEnabled(newState);
      if (!newState) {
        if (Torch && Torch.switchState) {
          await Torch.switchState(false);
        }
      }
    } catch (error) {
      console.log('Error toggling flashlight:', error);
      Alert.alert('Error', 'Could not control flashlight. Make sure no other app is using the camera.');
    }
  };

  const startFlashlightStrobe = () => {
    if (Platform.OS === 'web' || !torchAvailable) return;
    const baseInterval = Math.max(50, 1000 - strobeSpeed * 950);
    flashlightInterval.current = setInterval(async () => {
      try {
        if (Torch && Torch.switchState) {
          await Torch.switchState(true);
        }
        setTimeout(async () => {
          if (Torch && Torch.switchState) {
            await Torch.switchState(false);
          }
        }, Math.min(100, baseInterval / 2));
      } catch (error) {
        console.log('Flashlight strobe error:', error);
      }
    }, baseInterval) as any;
  };

  const stopFlashlightStrobe = async () => {
    if (flashlightInterval.current) {
      clearInterval(flashlightInterval.current);
      flashlightInterval.current = null;
    }
    if (Platform.OS !== 'web' && torchAvailable) {
      try {
        if (Torch && Torch.switchState) {
          await Torch.switchState(false);
        }
      } catch (error) {
        console.log('Error turning off flashlight:', error);
      }
    }
  };

  const startStrobeEffect = () => {
    if (strobeInterval.current) {
      clearInterval(strobeInterval.current);
    }
    const baseInterval = Math.max(50, 1000 - strobeSpeed * 950);
    let flashCount = 0;
    strobeInterval.current = setInterval(() => {
      flashCount++;
      switch (selectedEffect) {
        case 0:
          createPulseEffect();
          break;
        case 1:
          createWaveEffect(flashCount);
          break;
        case 2:
          createBurstEffect();
          break;
        case 3:
          createFadeEffect();
          break;
      }
      if (selectedColor === 6 && flashCount % 3 === 0) {
        setCurrentColorIndex((prev) => (prev + 1) % 6);
      }
    }, baseInterval) as any;
  };

  const createPulseEffect = () => {
    Animated.sequence([Animated.timing(flashAnimation, {
      toValue: 1, duration: 40, useNativeDriver: false
    }), Animated.timing(flashAnimation, {
      toValue: 0, duration: 80, useNativeDriver: false
    })]).start();
  };

  const createWaveEffect = (count: number) => {
    const intensity = 0.7 + (count % 4) * 0.1;
    Animated.sequence([Animated.timing(flashAnimation, {
      toValue: intensity, duration: 60, useNativeDriver: false
    }), Animated.timing(flashAnimation, {
      toValue: 0, duration: 120, useNativeDriver: false
    })]).start();
  };

  const createBurstEffect = () => {
    Animated.sequence([Animated.timing(flashAnimation, {
      toValue: 1, duration: 30, useNativeDriver: false
    }), Animated.timing(flashAnimation, {
      toValue: 0, duration: 30, useNativeDriver: false
    }), Animated.timing(flashAnimation, {
      toValue: 0.8, duration: 30, useNativeDriver: false
    }), Animated.timing(flashAnimation, {
      toValue: 0, duration: 30, useNativeDriver: false
    }), Animated.timing(flashAnimation, {
      toValue: 0.6, duration: 30, useNativeDriver: false
    }), Animated.timing(flashAnimation, {
      toValue: 0, duration: 60, useNativeDriver: false
    })]).start();
    Animated.sequence([Animated.timing(burstAnimation, {
      toValue: 1, duration: 200, useNativeDriver: false
    }), Animated.timing(burstAnimation, {
      toValue: 0, duration: 300, useNativeDriver: false
    })]).start();
  };

  const createFadeEffect = () => {
    Animated.sequence([Animated.timing(flashAnimation, {
      toValue: 0.9, duration: 100, useNativeDriver: false
    }), Animated.timing(flashAnimation, {
      toValue: 0.3, duration: 200, useNativeDriver: false
    }), Animated.timing(flashAnimation, {
      toValue: 0, duration: 300, useNativeDriver: false
    })]).start();
  };

  const startSustainedEffect = () => {
    Animated.loop(Animated.sequence([Animated.timing(sustainedAnimation, {
      toValue: 0.4, duration: 800, useNativeDriver: false
    }), Animated.timing(sustainedAnimation, {
      toValue: 0.1, duration: 1200, useNativeDriver: false
    })])).start();
  };

  const stopStrobeEffect = () => {
    if (strobeInterval.current) {
      clearInterval(strobeInterval.current);
      strobeInterval.current = null;
    }
    flashAnimation.setValue(0);
  };

  const stopSustainedEffect = () => {
    sustainedAnimation.setValue(0);
  };

  const startStrobing = useCallback(() => {
    if (!isStrobing) {
      setIsStrobing(true);
      showControlsTemporarily();
    }
  }, [isStrobing, showControlsTemporarily]);

  const stopStrobing = useCallback(() => {
    if (isStrobing) {
      setIsStrobing(false);
      showControlsPermanently();
    }
  }, [isStrobing, showControlsPermanently]);

  const handleToggleControls = useCallback(() => {
    if (showControls) {
      hideControls();
    } else {
      showControlsTemporarily();
    }
  }, [showControls, hideControls, showControlsTemporarily]);

  const handleBack = useCallback(async () => {
    // Only allow going back if not strobing
    if (!isStrobing) {
      setIsStrobing(false);
      if (Platform.OS !== 'web') {
        try {
          await Brightness.setBrightnessAsync(originalBrightness);
        } catch (error) {
          console.log('Error restoring brightness:', error);
        }
      }
      stopFlashlightStrobe();
      router.back();
    }
  }, [isStrobing, originalBrightness, stopFlashlightStrobe]);

  const getCurrentColor = () => {
    if (selectedColor === 6) {
      return strobeColors[currentColorIndex];
    }
    return strobeColors[selectedColor];
  };

  const currentColor = getCurrentColor();

  // MAIN STROBE CONTROL - Only starts/stops when isStrobing changes
  useEffect(() => {
    if (isStrobing) {
      startStrobeEffect();
      if (sustainedMode) {
        startSustainedEffect();
      }
      if (flashlightEnabled) {
        startFlashlightStrobe();
      }
    } else {
      stopStrobeEffect();
      stopSustainedEffect();
      stopFlashlightStrobe();
    }
  }, [isStrobing]);

  useEffect(() => {
    if (isStrobing) {
      startStrobeEffect();
    }
  }, [strobeSpeed, selectedEffect]);

  // Handle sustained mode changes
  useEffect(() => {
    if (isStrobing) {
      if (sustainedMode) {
        startSustainedEffect();
      } else {
        stopSustainedEffect();
      }
    }
  }, [sustainedMode]);

  // Handle flashlight changes
  useEffect(() => {
    if (isStrobing) {
      if (flashlightEnabled) {
        startFlashlightStrobe();
      } else {
        stopFlashlightStrobe();
      }
    }
  }, [flashlightEnabled]);

  return (
    <View style={[strobeStyles.container, { backgroundColor: '#000000' }]}>
      <StatusBar hidden />
      <LinearGradient 
        colors={['#000000', '#0A0A0F', '#000000']} 
        style={[StyleSheet.absoluteFillObject, { zIndex: 0 }]} 
      />
      <View style={[StyleSheet.absoluteFillObject, { zIndex: 1 }]}>
        <StrobeEffects
          currentColor={currentColor}
          waveAnimation={waveAnimation}
          burstAnimation={burstAnimation}
          flashAnimation={flashAnimation}
          sustainedAnimation={sustainedAnimation}
          sustainedMode={sustainedMode}
        />
      </View>
      
      {/* Controls Layer */}
      <View style={[StyleSheet.absoluteFillObject, { zIndex: 2 }]} pointerEvents="box-none">
        <ToggleControlsIcon 
          toggleIconOpacity={toggleIconOpacity} 
          currentColor={currentColor}
          handleToggleControls={handleToggleControls} 
        />
        
        {showControls && (
          <Animated.View 
            style={[
              StyleSheet.absoluteFillObject, 
              { 
                opacity: controlsOpacity,
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                zIndex: 10
              }
            ]}
            pointerEvents="box-none"
          >
            <Header handleBack={handleBack} handleToggleControls={handleToggleControls} />
            <CenterControls 
              isStrobing={isStrobing} 
              currentColor={currentColor} 
              toggleStrobe={isStrobing ? stopStrobing : startStrobing} 
            />
            <View style={strobeStyles.bottomControls}>
              <HardwareControls
                flashlightEnabled={flashlightEnabled}
                screenBrightness={screenBrightness}
                currentColor={currentColor}
                torchAvailable={torchAvailable}
                toggleFlashlight={toggleFlashlight}
                handleBrightnessChange={handleBrightnessChange}
              />
              <SpeedControl strobeSpeed={strobeSpeed} currentColor={currentColor} setStrobeSpeed={setStrobeSpeed} />
              <EffectSelection 
                selectedEffect={selectedEffect} 
                currentColor={currentColor}
                setSelectedEffect={setSelectedEffect} 
              />
              <SustainedModeToggle 
                sustainedMode={sustainedMode} 
                currentColor={currentColor}
                setSustainedMode={setSustainedMode} 
              />
              <ColorSelection 
                selectedColor={selectedColor} 
                setSelectedColor={setSelectedColor}
                strobeColors={strobeColors} 
              />
            </View>
          </Animated.View>
        )}
        
        {!showControls && (
          <TouchableOpacity
            style={[StyleSheet.absoluteFillObject, { zIndex: 5 }]}
            onPress={handleScreenTap}
            activeOpacity={1}
          />
        )}
      </View>
    </View>
  );
}