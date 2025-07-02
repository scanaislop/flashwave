import React, { useEffect, useRef, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, Animated, Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import * as Brightness from 'expo-brightness';
import Torch from 'react-native-torch';
import { strobeStyles } from '@/components/styles/strobe';
import { strobeColors } from '@/constants/color';
import { Header } from '@/components/strobe/Header';
import { CenterControls } from '@/components/strobe/CenterControls';
import { HardwareControls } from '@/components/strobe/HardwareControls';
import { TimerControls } from '@/components/strobe/TimerControls';
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
  timerEnabled?: boolean;
  timerMinutes?: number;
}

const STORAGE_KEY = '@flashwave_strobe_settings';

// Timer styles are now integrated into strobeStyles in components/styles/strobe.ts

interface StrobeScreenProps {
  autoStart?: boolean;
}

export default function StrobeScreen({ autoStart = false }: StrobeScreenProps) {
  const [isStrobing, setIsStrobing] = useState(false);
  const [strobeSpeed, setStrobeSpeed] = useState(0.5);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedEffect, setSelectedEffect] = useState(0);
  const [showControls, setShowControls] = useState(!autoStart);
  const [sustainedMode, setSustainedMode] = useState(true);
  const [flashlightEnabled, setFlashlightEnabled] = useState(false);
  const [screenBrightness, setScreenBrightness] = useState(1.0);
  const [originalBrightness, setOriginalBrightness] = useState(1.0);
  const [torchAvailable, setTorchAvailable] = useState(false);
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const [timerEnabled, setTimerEnabled] = useState(false);
  const [timerMinutes, setTimerMinutes] = useState(5);
  const [timerRemaining, setTimerRemaining] = useState(0);
  const [showTimer, setShowTimer] = useState(false);
  
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
  const timerInterval = useRef<NodeJS.Timeout | null>(null);
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
          
          // Load timer settings if available
          if (settings.timerEnabled !== undefined) {
            setTimerEnabled(settings.timerEnabled);
          }
          if (settings.timerMinutes !== undefined) {
            setTimerMinutes(settings.timerMinutes);
          }
          
          // Start strobing if it was active and we're not auto-starting
          // (if auto-starting, we'll handle this separately)
          if (settings.isStrobing && !autoStart) {
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
  }, [autoStart]);

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
      timerEnabled,
      timerMinutes
    };

    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (error) {
      console.error('Failed to save settings', error);
    }
  }, [isStrobing, strobeSpeed, selectedColor, selectedEffect, sustainedMode, flashlightEnabled, screenBrightness, timerEnabled, timerMinutes, isInitialized]);

  // Load settings on mount
  useEffect(() => {
    loadSettings();
    
    // Auto-start if prop is true
    if (autoStart) {
      // Small delay to ensure settings are loaded
      const startTimeout = setTimeout(() => {
        if (isMounted.current) {
          setIsStrobing(true);
          hideControls();
        }
      }, 300);
      
      return () => {
        clearTimeout(startTimeout);
        isMounted.current = false;
      };
    }
    
    return () => {
      isMounted.current = false;
    };
  }, [loadSettings, autoStart, hideControls]);

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
            console.log('Torch module not available on this device w');
          }
        } else {
          const cameraAllowed = await Torch.requestCameraPermission('Camera Permissions', 'We require camera permissions to use the torch on the back of your phone.');
          if (cameraAllowed) {
            if (Torch && Torch.switchState) {
              await Torch.switchState(false);
              setTorchAvailable(true);
            } else {
              console.log('Torch module not available on this device');
            }
          }
        }
      } catch (error) {
        console.log('Could not check torch availability:', error);
      }
      try {
        // Get and save the original brightness before changing anything
        const brightness = await Brightness.getBrightnessAsync();
        if (isMounted.current) {
          setOriginalBrightness(brightness);
          setScreenBrightness(brightness);
          console.log('Original brightness saved:', brightness);
        }
      } catch (error) {
        console.log('Could not get brightness:', error);
      }
    };

    initializeHardware();

    return () => {
      isMounted.current = false;
      if (Platform.OS !== 'web') {
        // Make sure to restore original brightness when unmounting
        try {
          console.log('Restoring brightness on unmount to:', originalBrightness);
          Brightness.setBrightnessAsync(originalBrightness);
          
          // Turn off flashlight if it was on
          if (torchAvailable) {
            if (Torch && Torch.switchState) {
              Torch.switchState(false);
            }
          }
        } catch (error) {
          console.log('Error during cleanup:', error);
        }
      }
      
      // Clear intervals and timeouts
      if (strobeInterval.current) clearInterval(strobeInterval.current);
      if (flashlightInterval.current) clearInterval(flashlightInterval.current);
      if (hideControlsTimeout.current) clearTimeout(hideControlsTimeout.current);
      if (timerInterval.current) clearInterval(timerInterval.current);
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
      // Only update original brightness if we're not strobing
      // This prevents the original brightness from being overwritten during strobe
      if (!isStrobing) {
        setOriginalBrightness(value);
      }
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

  const toggleTimer = useCallback(() => {
    setTimerEnabled(prev => !prev);
  }, []);

  const handleTimerChange = useCallback((value: number) => {
    setTimerMinutes(Math.round(value));
  }, []);

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
      // Save current brightness as original if not already saved
      if (Platform.OS !== 'web') {
        try {
          // Get current brightness before starting strobe
          Brightness.getBrightnessAsync().then(currentBrightness => {
            if (isMounted.current) {
              setOriginalBrightness(currentBrightness);
              console.log('Saved brightness before strobing:', currentBrightness);
            }
          });
        } catch (error) {
          console.log('Error saving brightness before strobing:', error);
        }
      }
      
      setIsStrobing(true);
      showControlsTemporarily();
    }
  }, [isStrobing, showControlsTemporarily]);

  const stopStrobing = useCallback(() => {
    if (isStrobing) {
      setIsStrobing(false);
      showControlsPermanently();
      
      // Restore original brightness when stopping
      if (Platform.OS !== 'web') {
        try {
          Brightness.setBrightnessAsync(originalBrightness);
          setScreenBrightness(originalBrightness);
        } catch (error) {
          console.log('Error restoring brightness:', error);
        }
      }
    }
  }, [isStrobing, showControlsPermanently, originalBrightness]);

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
          console.log('Restoring brightness before navigating back to:', originalBrightness);
          await Brightness.setBrightnessAsync(originalBrightness);
          setScreenBrightness(originalBrightness);
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
      
      if (flashlightEnabled && torchAvailable && Platform.OS !== 'web') {
        startFlashlightStrobe();
      }
      
      // Auto-hide controls after 3 seconds
      hideControlsTimeout.current = setTimeout(() => {
        hideControls();
      }, 3000) as unknown as NodeJS.Timeout;
      
      // Start timer if enabled
      if (timerEnabled && timerMinutes > 0) {
        const totalSeconds = timerMinutes * 60;
        setTimerRemaining(totalSeconds);
        setShowTimer(true);
        
        timerInterval.current = setInterval(() => {
          setTimerRemaining(prev => {
            if (prev <= 1) {
              // Timer complete, stop strobe
              if (timerInterval.current) {
                clearInterval(timerInterval.current);
                timerInterval.current = null;
              }
              setIsStrobing(false);
              setShowTimer(false);
              return 0;
            }
            return prev - 1;
          });
        }, 1000) as unknown as NodeJS.Timeout;
      }
    } else {
      // Stop all effects
      if (strobeInterval.current) {
        clearInterval(strobeInterval.current);
        strobeInterval.current = null;
      }
      
      // Clear timer if running
      if (timerInterval.current) {
        clearInterval(timerInterval.current);
        timerInterval.current = null;
        setShowTimer(false);
      }
      
      stopFlashlightStrobe();
      
      // Reset animations
      flashAnimation.setValue(0);
      sustainedAnimation.setValue(0);
      burstAnimation.setValue(0);
      
      // Show controls when stopped
      showControlsPermanently();
    }
    
    return () => {
      if (hideControlsTimeout.current) {
        clearTimeout(hideControlsTimeout.current);
      }
      if (timerInterval.current) {
        clearInterval(timerInterval.current);
      }
    };
  }, [isStrobing, flashlightEnabled, torchAvailable, hideControls, showControlsPermanently, timerEnabled, timerMinutes]);

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
      
      {/* Timer Display */}
      {showTimer && timerRemaining > 0 && (
        <View style={[StyleSheet.absoluteFillObject, { zIndex: 3 }]} pointerEvents="none">
          <View style={strobeStyles.timerContainer}>
            <Text style={[strobeStyles.timerText, { color: currentColor.color }]}>
              {Math.floor(timerRemaining / 60)}:{(timerRemaining % 60).toString().padStart(2, '0')}
            </Text>
          </View>
        </View>
      )}
      
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
              <View style={strobeStyles.controlRow}>
                <View style={strobeStyles.controlColumn}>
                  <HardwareControls
                    flashlightEnabled={flashlightEnabled}
                    screenBrightness={screenBrightness}
                    currentColor={currentColor}
                    torchAvailable={torchAvailable}
                    toggleFlashlight={toggleFlashlight}
                    handleBrightnessChange={handleBrightnessChange}
                  />
                </View>
                <View style={strobeStyles.controlColumn}>
                  <TimerControls
                    timerEnabled={timerEnabled}
                    timerMinutes={timerMinutes}
                    currentColor={currentColor}
                    toggleTimer={toggleTimer}
                    handleTimerChange={handleTimerChange}
                  />
                </View>
              </View>
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