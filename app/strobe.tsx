import React, { useEffect, useRef, useState } from 'react';
import { Alert, Animated, Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import * as Brightness from 'expo-brightness';
import Torch from 'react-native-torch';
import {
  ArrowLeft,
  EyeOff,
  Flashlight,
  FlashlightOff,
  Pause,
  Play,
  Settings,
  Sun,
  SunDim,
  Zap
} from 'lucide-react-native';
import Slider from '@react-native-community/slider';
import { strobeStyles } from '@/components/styles/stobe';
import { strobeColors, strobeEffectTypes } from '@/constants/color';

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

  const flashAnimation = useRef(new Animated.Value(0)).current;
  const sustainedAnimation = useRef(new Animated.Value(0)).current;
  const waveAnimation = useRef(new Animated.Value(0)).current;
  const burstAnimation = useRef(new Animated.Value(0)).current;
  const controlsOpacity = useRef(new Animated.Value(1)).current;
  const toggleIconOpacity = useRef(new Animated.Value(0)).current;
  const colorCycleAnimation = useRef(new Animated.Value(0)).current;

  const strobeInterval = useRef<NodeJS.Timeout | null>(null);
  const flashlightInterval = useRef<NodeJS.Timeout | null>(null);
  const hideControlsTimeout = useRef<NodeJS.Timeout | null>(null);
  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  useEffect(() => {
    let isMounted = true;
    const originalBrightnessRef = useRef<number | null>(null);
    const torchAvailableRef = useRef(false);
  
    const initializeHardware = async () => {
      if (Platform.OS === 'web') return;
  
      try {
        if (Platform.OS === 'ios') {
          Torch.switchState(false);
          torchAvailableRef.current = true;
        } else {
          const cameraAllowed = await Torch.requestCameraPermission(
            'Camera Permissions',
            'We require camera permissions to use the torch on the back of your phone.'
          );
          if (cameraAllowed) {
            Torch.switchState(false);
            torchAvailableRef.current = true;
          }
        }
      } catch (error) {
        console.log('Could not check torch availability:', error);
        torchAvailableRef.current = false;
      }
  
      try {
        const brightness = await Brightness.getBrightnessAsync();
        if (isMounted) {
          originalBrightnessRef.current = brightness;
        }
      } catch (error) {
        console.log('Could not get brightness:', error);
      }
    };
  
    initializeHardware();
  
    return () => {
      isMounted = false;
  
      if (Platform.OS !== 'web') {
        if (originalBrightnessRef.current !== null) {
          Brightness.setBrightnessAsync(originalBrightnessRef.current);
        }
        if (torchAvailableRef.current) {
          Torch.switchState(false);
        }
      }
    };
  }, []);

  useEffect(() => {
    const waveLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(waveAnimation, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: false,
        }),
        Animated.timing(waveAnimation, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: false,
        }),
      ])
    );
    waveLoop.start();
  
    const colorCycleLoopRef = useRef<Animated.CompositeAnimation | null>(null);
  
    if (selectedColor === 6) {
      const loop = Animated.loop(
        Animated.timing(colorCycleAnimation, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: false,
        })
      );
      loop.start();
      colorCycleLoopRef.current = loop;
    }
  
    if (isStrobing && showControls) {
      hideControlsTimeout.current = setTimeout(() => {
        hideControls();
      }, 3000) as unknown as NodeJS.Timeout;
    }
  
    return () => {
      waveLoop.stop();
  
      if (colorCycleLoopRef.current) {
        colorCycleLoopRef.current.stop();
      }
  
      if (strobeInterval.current) {
        clearInterval(strobeInterval.current);
      }
  
      if (flashlightInterval.current) {
        clearInterval(flashlightInterval.current);
      }
  
      if (hideControlsTimeout.current) {
        clearTimeout(hideControlsTimeout.current);
      }
    };
  }, [selectedColor, isStrobing, showControls]);

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
  }, [isStrobing, strobeSpeed, selectedEffect, sustainedMode, flashlightEnabled]);

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
        Torch.switchState(false);
      }
    } catch (error) {
      console.log('Error toggling flashlight:', error);
      Alert.alert('Error', 'Could not control flashlight. Make sure no other app is using the camera.');
    }
  };

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

  const startFlashlightStrobe = () => {
    if (Platform.OS === 'web' || !torchAvailable) return;

    const baseInterval = Math.max(50, 1000 - (strobeSpeed * 950));

    flashlightInterval.current = setInterval(async () => {
      try {
        Torch.switchState(true);
        setTimeout(async () => {
          Torch.switchState(false);
        }, Math.min(100, baseInterval / 2));
      } catch (error) {
        console.log('Flashlight strobe error:', error);
      }
    }, baseInterval) as unknown as NodeJS.Timeout;
  };

  const stopFlashlightStrobe = async () => {
    if (flashlightInterval.current) {
      clearInterval(flashlightInterval.current);
      flashlightInterval.current = null;
    }

    if (Platform.OS !== 'web' && torchAvailable) {
      try {
        await Torch.switchState(false);
      } catch (error) {
        console.log('Error turning off flashlight:', error);
      }
    }
  };

  const startStrobeEffect = () => {
    if (strobeInterval.current) {
      clearInterval(strobeInterval.current);
    }

    const baseInterval = Math.max(50, 1000 - (strobeSpeed * 950));
    let flashCount = 0;

    strobeInterval.current = setInterval(() => {
      flashCount++;

      switch (selectedEffect) {
        case 0: // Pulse
          createPulseEffect();
          break;
        case 1: // Wave
          createWaveEffect(flashCount);
          break;
        case 2: // Burst
          createBurstEffect();
          break;
        case 3: // Fade
          createFadeEffect();
          break;
      }

      if (selectedColor === 6 && flashCount % 3 === 0) {
        setCurrentColorIndex(prev => (prev + 1) % 6);
      }
    }, baseInterval) as unknown as NodeJS.Timeout;
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
    }), Animated.timing(flashAnimation, { toValue: 0, duration: 60, useNativeDriver: false })]).start();

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

  const toggleStrobe = () => {
    setIsStrobing(!isStrobing);
    if (!isStrobing) {
      showControlsTemporarily();
    } else {
      showControlsPermanently();
    }
  };

  const showControlsTemporarily = () => {
    setShowControls(true);
    Animated.parallel([Animated.timing(controlsOpacity, {
      toValue: 1, duration: 200, useNativeDriver: true
    }), Animated.timing(toggleIconOpacity, {
      toValue: 0, duration: 200, useNativeDriver: true
    })]).start();

    if (hideControlsTimeout.current) {
      clearTimeout(hideControlsTimeout.current);
    }
  };

  const showControlsPermanently = () => {
    setShowControls(true);
    Animated.parallel([Animated.timing(controlsOpacity, {
      toValue: 1, duration: 200, useNativeDriver: true
    }), Animated.timing(toggleIconOpacity, {
      toValue: 0, duration: 200, useNativeDriver: true
    })]).start();

    if (hideControlsTimeout.current) {
      clearTimeout(hideControlsTimeout.current);
    }
  };

  const hideControls = () => {
    Animated.parallel([Animated.timing(controlsOpacity, {
      toValue: 0, duration: 300, useNativeDriver: true
    }), Animated.timing(toggleIconOpacity, {
      toValue: 1, duration: 500, useNativeDriver: true
    })]).start(() => {
      setShowControls(false);
    });
  };

  const handleScreenTap = () => {
    if (isStrobing && !showControls) {
      showControlsTemporarily();
    }
  };

  const handleToggleControls = () => {
    if (showControls) {
      hideControls();
    } else {
      showControlsTemporarily();
    }
  };

  const handleBack = async () => {
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
  };

  const getCurrentColor = () => {
    if (selectedColor === 6) { // Rainbow mode
      return strobeColors[currentColorIndex];
    }
    return strobeColors[selectedColor];
  };

  const currentColor = getCurrentColor();

  const waveScale = waveAnimation.interpolate({
    inputRange: [0, 1], outputRange: [0.6, 1.8]
  }) as unknown as number;

  const waveOpacity = waveAnimation.interpolate({
    inputRange: [0, 0.5, 1], outputRange: [0.2, 0.6, 0.2]
  }) as unknown as number;

  const burstScale = burstAnimation.interpolate({
    inputRange: [0, 1], outputRange: [1, 2.5]
  }) as unknown as number;

  const burstOpacity = burstAnimation.interpolate({
    inputRange: [0, 0.3, 1], outputRange: [0, 0.8, 0]
  }) as unknown as number;

  const flashOpacity = flashAnimation.interpolate({
    inputRange: [0, 1], outputRange: [0, 0.95]
  }) as unknown as number;

  const sustainedOpacity = sustainedAnimation.interpolate({
    inputRange: [0, 1], outputRange: [0, 0.3]
  }) as unknown as number;

  return (<View style={strobeStyles.container}>
    <StatusBar hidden />

    <LinearGradient
      colors={['#000000', '#0A0A0F', '#000000']}
      style={StyleSheet.absoluteFillObject}
    />

    {sustainedMode && (<Animated.View
      style={[StyleSheet.absoluteFillObject, {
        backgroundColor: currentColor.color, opacity: sustainedOpacity
      }]}
      pointerEvents="none"
    />)}

    <Animated.View
      style={[strobeStyles.waveContainer, {
        transform: [{ scale: waveScale }], opacity: waveOpacity
      }]}>
      <LinearGradient
        colors={[`${currentColor.color}00`, `${currentColor.color}60`, `${currentColor.secondary}40`, `${currentColor.color}00`]}
        style={strobeStyles.wave}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
    </Animated.View>

    <Animated.View
      style={[strobeStyles.waveContainer, strobeStyles.secondaryWave, {
        transform: [{ scale: 0.7 * waveScale }], opacity: waveOpacity * 0.7
      }]}>
      <LinearGradient
        colors={[`${currentColor.secondary}00`, `${currentColor.secondary}50`, `${currentColor.color}30`, `${currentColor.secondary}00`]}
        style={strobeStyles.wave}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
      />
    </Animated.View>

    {/* Burst Effect */}
    <Animated.View
      style={[strobeStyles.burstContainer, {
        transform: [{ scale: burstScale }], opacity: burstOpacity
      }]}>
      <LinearGradient
        colors={[`${currentColor.color}80`, `${currentColor.color}00`]}
        style={strobeStyles.burst}
      />
    </Animated.View>

    {/* Flash Overlay */}
    <Animated.View
      style={[StyleSheet.absoluteFillObject, {
        backgroundColor: currentColor.color, opacity: flashOpacity
      }]}
      pointerEvents="none"
    />

    {/* Tap Area */}
    <TouchableOpacity
      style={StyleSheet.absoluteFillObject}
      onPress={handleScreenTap}
      activeOpacity={1}
    />

    {/* Toggle Controls Icon */}
    <Animated.View
      style={[strobeStyles.toggleIcon, { opacity: toggleIconOpacity }]}>
      <TouchableOpacity
        onPress={handleToggleControls}
        style={[strobeStyles.toggleButton, { backgroundColor: `${currentColor.color}40` }]}>
        <Settings size={20} color={currentColor.color} />
      </TouchableOpacity>
    </Animated.View>

    {/* Controls Overlay */}
    {showControls && (<Animated.View
      style={[strobeStyles.controlsOverlay, { opacity: controlsOpacity }]}>
      {/* Header */}
      <View style={strobeStyles.header}>
        <TouchableOpacity onPress={handleBack} style={strobeStyles.headerButton}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={strobeStyles.title}>STROBE MODE</Text>
        <TouchableOpacity onPress={handleToggleControls} style={strobeStyles.headerButton}>
          <EyeOff size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Center Controls */}
      <View style={strobeStyles.centerControls}>
        <TouchableOpacity
          onPress={toggleStrobe}
          style={[strobeStyles.playButton, { borderColor: currentColor.color }]}>
          <LinearGradient
            colors={isStrobing ? ['#EF4444', '#DC2626'] : [currentColor.color, `${currentColor.color}CC`]}
            style={strobeStyles.playButtonGradient}>
            {isStrobing ? (<Pause size={32} color="#FFFFFF" />) : (<Play size={32} color="#FFFFFF" />)}
          </LinearGradient>
        </TouchableOpacity>

        <Text style={strobeStyles.playButtonText}>
          {isStrobing ? 'CONTROLS AUTO-HIDE IN 3 SECONDS' : 'TAP TO START STROBE'}
        </Text>
      </View>

      {/* Bottom Controls */}
      <View style={strobeStyles.bottomControls}>
        {/* Hardware Controls */}
        <View style={strobeStyles.controlSection}>
          <Text style={strobeStyles.controlLabel}>Hardware Controls</Text>
          <View style={strobeStyles.hardwareControls}>
            <TouchableOpacity
              onPress={toggleFlashlight}
              style={[strobeStyles.hardwareButton, flashlightEnabled && {
                backgroundColor: `${currentColor.color}30`, borderColor: currentColor.color
              }]}>
              {flashlightEnabled ? (<Flashlight size={20} color={currentColor.color} />) : (
                <FlashlightOff size={20} color="#94A3B8" />)}
              <Text style={[strobeStyles.hardwareButtonText, flashlightEnabled && { color: currentColor.color }]}>
                Flashlight {!torchAvailable && Platform.OS !== 'web' && '(N/A)'}
              </Text>
            </TouchableOpacity>

            <View style={strobeStyles.brightnessContainer}>
              <View style={strobeStyles.brightnessHeader}>
                <SunDim size={16} color="#94A3B8" />
                <Text style={strobeStyles.brightnessLabel}>
                  Screen: {Math.round(screenBrightness * 100)}%
                </Text>
                <Sun size={16} color={currentColor.color} />
              </View>
              <Slider
                style={strobeStyles.brightnessSlider}
                minimumValue={0.1}
                maximumValue={1.0}
                value={screenBrightness}
                onValueChange={handleBrightnessChange}
                minimumTrackTintColor={currentColor.color}
                maximumTrackTintColor="#64748B"
                // thumbStyle={{ backgroundColor: currentColor.color }}
              />
            </View>
          </View>
        </View>

        {/* Speed Control */}
        <View style={strobeStyles.controlSection}>
          <Text style={strobeStyles.controlLabel}>
            Speed: {Math.round(strobeSpeed * 100)}%
          </Text>
          <Slider
            style={strobeStyles.slider}
            minimumValue={0.1}
            maximumValue={1.0}
            value={strobeSpeed}
            onValueChange={setStrobeSpeed}
            minimumTrackTintColor={currentColor.color}
            maximumTrackTintColor="#64748B"
            // thumbStyle={{ backgroundColor: currentColor.color }}
          />
        </View>

        {/* Effect Selection */}
        <View style={strobeStyles.controlSection}>
          <Text style={strobeStyles.controlLabel}>Effect Type</Text>
          <View style={strobeStyles.effectGrid}>
            {strobeEffectTypes.map((effect, index) => (<TouchableOpacity
              key={effect.id}
              onPress={() => setSelectedEffect(index)}
              style={[strobeStyles.effectItem, selectedEffect === index && {
                backgroundColor: `${currentColor.color}30`, borderColor: currentColor.color
              }]}>
              <effect.icon
                size={16}
                color={selectedEffect === index ? currentColor.color : '#94A3B8'}
              />
              <Text style={[strobeStyles.effectText, selectedEffect === index && { color: currentColor.color }]}>
                {effect.name}
              </Text>
            </TouchableOpacity>))}
          </View>
        </View>

        {/* Sustained Mode Toggle */}
        <View style={strobeStyles.controlSection}>
          <TouchableOpacity
            onPress={() => setSustainedMode(!sustainedMode)}
            style={[strobeStyles.sustainedToggle, sustainedMode && {
              backgroundColor: `${currentColor.color}30`, borderColor: currentColor.color
            }]}>
            <Text style={[strobeStyles.sustainedText, sustainedMode && { color: currentColor.color }]}>
              {sustainedMode ? '✓ Sustained Glow' : 'Sustained Glow'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Color Selection */}
        <View style={strobeStyles.controlSection}>
          <Text style={strobeStyles.controlLabel}>Color</Text>
          <View style={strobeStyles.colorGrid}>
            {strobeColors.map((color, index) => (<TouchableOpacity
              key={index}
              onPress={() => setSelectedColor(index)}
              style={[strobeStyles.colorItem, { backgroundColor: color.color }, selectedColor === index && strobeStyles.selectedColorItem]}>
              {selectedColor === index && (<Zap size={16} color={color.color === '#FFFFFF' ? '#000000' : '#FFFFFF'} />)}
              {index === 6 && ( // Rainbow indicator
                <LinearGradient
                  colors={['#FF0080', '#FF8000', '#FFFF00', '#80FF00', '#00FF80', '#0080FF']}
                  style={strobeStyles.rainbowGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                />)}
            </TouchableOpacity>))}
          </View>
        </View>
      </View>
    </Animated.View>)}
  </View>);
}
