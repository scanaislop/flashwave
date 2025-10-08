import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Animated } from 'react-native';
import { router } from 'expo-router';
import { StrobeSettings, STROBE_COLORS } from '@/types/strobe';
import { useSettingsPersistence } from '@/hooks/useSettingsPersistence';
import { useHardwareManager } from '@/hooks/useHardwareManager';
import { useStrobeLogic } from '@/hooks/useStrobeLogic';
import { useUIControls } from '@/hooks/useUIControls';

const defaultSettings: StrobeSettings = {
  isStrobing: false,
  strobeSpeed: 0.5,
  selectedColor: 0,
  selectedEffect: 0,
  sustainedMode: true,
  flashlightEnabled: false,
  screenBrightness: 1,
};

export const useStrobeController = () => {
  const [settings, setSettings] = useState<StrobeSettings>(defaultSettings);
  const [torchAvailable, setTorchAvailable] = useState(false);
  const [originalBrightness, setOriginalBrightness] = useState(1);
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  const animations = useMemo(
    () => ({
      flashAnimation: new Animated.Value(0),
      sustainedAnimation: new Animated.Value(0),
      waveAnimation: new Animated.Value(0),
      burstAnimation: new Animated.Value(0),
      controlsOpacity: new Animated.Value(1),
      toggleIconOpacity: new Animated.Value(0),
      colorCycleAnimation: new Animated.Value(0),
    }),
    [],
  );

  const strobeInterval = useRef<NodeJS.Timeout | null>(null);
  const flashlightInterval = useRef<NodeJS.Timeout | null>(null);
  const hideControlsTimeout = useRef<NodeJS.Timeout | null>(null);
  const colorCycleLoop = useRef<Animated.CompositeAnimation | null>(null);

  const intervals = { strobeInterval, flashlightInterval, hideControlsTimeout, colorCycleLoop };

  const { loadSettings } = useSettingsPersistence({ settings, isInitialized });

  const { handleBrightnessChange, toggleFlashlight: setHardwareFlashlight, cleanupHardware } =
    useHardwareManager({
      setTorchAvailable,
      setOriginalBrightness,
      setScreenBrightness: (value) =>
        setSettings((prev) => ({ ...prev, screenBrightness: value })),
    });

  const {
    startStrobeEffect,
    stopStrobeEffect,
    startFlashlightStrobe,
    stopFlashlightStrobe,
    startSustainedEffect,
    stopSustainedEffect,
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
    showControlsTemporarily,
    showControlsPermanently,
  } = useUIControls({
    controlsOpacity: animations.controlsOpacity,
    toggleIconOpacity: animations.toggleIconOpacity,
  });

  const updateSettings = useCallback((updates: Partial<StrobeSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  }, []);

  useEffect(() => {
    const initialize = async () => {
      const savedSettings = await loadSettings();
      if (savedSettings) {
        setSettings(savedSettings);
      }
      setIsInitialized(true);
    };

    initialize();
  }, [loadSettings]);

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
  }, [
    settings.isStrobing,
    settings.sustainedMode,
    settings.flashlightEnabled,
    startStrobeEffect,
    stopStrobeEffect,
    startSustainedEffect,
    stopSustainedEffect,
    startFlashlightStrobe,
    stopFlashlightStrobe,
  ]);

  useEffect(() => {
    if (settings.isStrobing) {
      showControlsTemporarily();
    } else {
      showControlsPermanently();
    }
  }, [settings.isStrobing, showControlsTemporarily, showControlsPermanently]);

  useEffect(() => {
    if (!settings.isStrobing) return;

    if (settings.flashlightEnabled) {
      startFlashlightStrobe();
    } else {
      stopFlashlightStrobe();
    }
  }, [settings.isStrobing, settings.flashlightEnabled, startFlashlightStrobe, stopFlashlightStrobe]);

  useEffect(() => {
    if (!settings.isStrobing) return;

    if (settings.sustainedMode) {
      startSustainedEffect();
    } else {
      stopSustainedEffect();
    }
  }, [settings.isStrobing, settings.sustainedMode, startSustainedEffect, stopSustainedEffect]);

  const handleBack = useCallback(async () => {
    if (settings.isStrobing) return;
    await cleanupHardware(originalBrightness, torchAvailable);
    router.back();
  }, [settings.isStrobing, cleanupHardware, originalBrightness, torchAvailable]);

  const toggleStrobe = useCallback(() => {
    updateSettings({ isStrobing: !settings.isStrobing });
  }, [settings.isStrobing, updateSettings]);

  const handleFlashlightToggle = useCallback(async () => {
    const targetState = !settings.flashlightEnabled;
    updateSettings({ flashlightEnabled: targetState });
    await setHardwareFlashlight(targetState, torchAvailable);
  }, [settings.flashlightEnabled, setHardwareFlashlight, torchAvailable, updateSettings]);

  const currentColor = useMemo(() => {
    if (settings.selectedColor === 6) {
      return STROBE_COLORS[currentColorIndex];
    }
    return STROBE_COLORS[settings.selectedColor];
  }, [settings.selectedColor, currentColorIndex]);

  return {
    settings,
    updateSettings,
    currentColor,
    toggleStrobe,
    torchAvailable,
    handleBrightnessChange,
    toggleFlashlight: handleFlashlightToggle,
    handleBack,
    animations,
    showControls,
    controlsOpacity,
    toggleIconOpacity,
    handleToggleControls,
    handleScreenTap,
  };
};
