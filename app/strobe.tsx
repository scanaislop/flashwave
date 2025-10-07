import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Platform, StatusBar, TouchableOpacity, View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Animated } from 'react-native';

import { strobeStyles } from '@/components/styles/strobe';
import { STROBE_COLORS } from '@/types/strobe';
import { StrobeSettings } from '@/types/strobe';
import { useSettingsPersistence } from '@/hooks/useSettingsPersistence';
import { useHardwareManager } from '@/hooks/useHardwareManager';
import { useStrobeLogic } from '@/hooks/useStrobeLogic';
import { useUIControls } from '@/hooks/useUIControls';

// UI Components
import { Header } from '@/components/strobe/Header';
import { CenterControls } from '@/components/strobe/CenterControls';
import { HardwareControls } from '@/components/strobe/HardwareControls';
import { SpeedControl } from '@/components/strobe/SpeedControl';
import { EffectSelection } from '@/components/strobe/EffectSelection';
import { SustainedModeToggle } from '@/components/strobe/SustainedModeToggle';
import { ColorSelection } from '@/components/strobe/ColorSelection';
import { StrobeEffects } from '@/components/strobe/StrobeEffects';
import { ToggleControlsIcon } from '@/components/strobe/ToggleControlsIcon';

export default function StrobeScreen() {
  const [settings, setSettings] = useState<StrobeSettings>({
    isStrobing: false,
    strobeSpeed: 0.5,
    selectedColor: 0,
    selectedEffect: 0,
    sustainedMode: true,
    flashlightEnabled: false,
    screenBrightness: 1.0,
  });
  
  const [torchAvailable, setTorchAvailable] = useState(false);
  const [originalBrightness, setOriginalBrightness] = useState(1.0);
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  // Refs - animations only
  const animations = {
    flashAnimation: useRef(new Animated.Value(0)).current,
    sustainedAnimation: useRef(new Animated.Value(0)).current,
    waveAnimation: useRef(new Animated.Value(0)).current,
    burstAnimation: useRef(new Animated.Value(0)).current,
    controlsOpacity: useRef(new Animated.Value(1)).current,
    toggleIconOpacity: useRef(new Animated.Value(0)).current,
    colorCycleAnimation: useRef(new Animated.Value(0)).current,
  };

  const intervals = {
    strobeInterval: useRef<NodeJS.Timeout | null>(null),
    flashlightInterval: useRef<NodeJS.Timeout | null>(null),
    hideControlsTimeout: useRef<NodeJS.Timeout | null>(null),
    colorCycleLoop: useRef<Animated.CompositeAnimation | null>(null),
  };

  // Use extracted hooks - this is the key difference!
  const { loadSettings } = useSettingsPersistence({ settings, isInitialized });
  const { handleBrightnessChange, toggleFlashlight, cleanupHardware } = useHardwareManager({
    setTorchAvailable,
    setOriginalBrightness,
    setScreenBrightness: (value) => setSettings(prev => ({ ...prev, screenBrightness: value })),
  });
  
  const {
    startStrobeEffect,
    stopStrobeEffect,
    startFlashlightStrobe,
    stopFlashlightStrobe,
    startSustainedEffect,
    stopSustainedEffect
  } = useStrobeLogic({
    settings,
    animations,
    intervals,
    setCurrentColorIndex,
  });

  const {
    showControls,
    controlsOpacity,
    toggleIconOpacity,
    handleToggleControls,
    handleScreenTap,
  } = useUIControls();

  // Settings management
  const updateSettings = useCallback((updates: Partial<StrobeSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  }, []);

  // Load settings on mount
  useEffect(() => {
    const initialize = async () => {
      const savedSettings = await loadSettings();
      if (savedSettings) {
        setSettings(savedSettings);
        if (savedSettings.isStrobing) {
          // Start strobing if it was active
        }
      }
      setIsInitialized(true);
    };

    initialize();
  }, [loadSettings]);

  // Main strobe control - much simpler now!
  useEffect(() => {
    if (settings.isStrobing) {
      startStrobeEffect();
      if (settings.sustainedMode) {
        startSustainedEffect();
      }
      if (settings.flashlightEnabled) {
        startFlashlightStrobe();
      }
    } else {
      stopStrobeEffect();
      stopSustainedEffect();
      stopFlashlightStrobe();
    }
  }, [settings.isStrobing]);

  // Flashlight control
  useEffect(() => {
    if (settings.isStrobing) {
      if (settings.flashlightEnabled) {
        startFlashlightStrobe();
      } else {
        stopFlashlightStrobe();
      }
    }
  }, [settings.flashlightEnabled]);

  // Sustained mode control
  useEffect(() => {
    if (settings.isStrobing) {
      if (settings.sustainedMode) {
        startSustainedEffect();
      } else {
        stopSustainedEffect();
      }
    }
  }, [settings.sustainedMode]);

  // Navigation
  const handleBack = useCallback(async () => {
    if (!settings.isStrobing) {
      await cleanupHardware(originalBrightness, torchAvailable);
      router.back();
    }
  }, [settings.isStrobing, originalBrightness, torchAvailable, cleanupHardware]);

  const toggleStrobe = useCallback(() => {
    updateSettings({ isStrobing: !settings.isStrobing });
  }, [settings.isStrobing, updateSettings]);

  // Get current color
  const currentColor = settings.selectedColor === 6 
    ? STROBE_COLORS[currentColorIndex] 
    : STROBE_COLORS[settings.selectedColor];

  return (
    <View style={[strobeStyles.container, { backgroundColor: '#000000' }]}>
      <StatusBar hidden />
      
      {/* Background gradient */}
      <LinearGradient 
        colors={['#000000', '#0A0A0F', '#000000']} 
        style={[StyleSheet.absoluteFillObject, { zIndex: 0 }]} 
      />
      
      {/* Strobe effects layer */}
      <View style={[StyleSheet.absoluteFillObject, { zIndex: 1 }]}>
        <StrobeEffects
          currentColor={currentColor}
          waveAnimation={animations.waveAnimation}
          burstAnimation={animations.burstAnimation}
          flashAnimation={animations.flashAnimation}
          sustainedAnimation={animations.sustainedAnimation}
          sustainedMode={settings.sustainedMode}
        />
      </View>
      
      {/* Controls layer */}
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
            <Header 
              handleBack={handleBack} 
              handleToggleControls={handleToggleControls} 
            />
            
            <CenterControls 
              isStrobing={settings.isStrobing} 
              currentColor={currentColor} 
              toggleStrobe={toggleStrobe} 
            />
            
            <View style={strobeStyles.bottomControls}>
              <HardwareControls
                flashlightEnabled={settings.flashlightEnabled}
                screenBrightness={settings.screenBrightness}
                currentColor={currentColor}
                torchAvailable={torchAvailable}
                toggleFlashlight={() => toggleFlashlight(settings.flashlightEnabled, torchAvailable)}
                handleBrightnessChange={handleBrightnessChange}
              />
              
              <SpeedControl 
                strobeSpeed={settings.strobeSpeed} 
                currentColor={currentColor} 
                setStrobeSpeed={(value) => updateSettings({ strobeSpeed: value })} 
              />
              
              <EffectSelection 
                selectedEffect={settings.selectedEffect} 
                currentColor={currentColor}
                setSelectedEffect={(value) => updateSettings({ selectedEffect: value })} 
              />
              
              <SustainedModeToggle 
                sustainedMode={settings.sustainedMode} 
                currentColor={currentColor}
                setSustainedMode={(value) => updateSettings({ sustainedMode: value })} 
              />
              
              <ColorSelection 
                selectedColor={settings.selectedColor} 
                setSelectedColor={(value) => updateSettings({ selectedColor: value })}
                strobeColors={STROBE_COLORS} 
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