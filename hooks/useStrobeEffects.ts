import { useRef, useEffect } from 'react';
import { Animated, Platform } from 'react-native';
import * as Haptics from 'expo-haptics';

export const useStrobeEffects = (
  selectedEffect: number,
  screenBrightness: number,
  isListening: boolean
) => {
  const flashAnimation = useRef(new Animated.Value(0)).current;
  const waveAnimation = useRef(new Animated.Value(0)).current;
  const burstAnimation = useRef(new Animated.Value(0)).current;
  const sustainedAnimation = useRef(new Animated.Value(0)).current;

  const createPulseEffect = (intensity: number = 1) => {
    Animated.sequence([
      Animated.timing(flashAnimation, {
        toValue: screenBrightness * intensity,
        duration: 40,
        useNativeDriver: false
      }),
      Animated.timing(flashAnimation, {
        toValue: 0,
        duration: 80,
        useNativeDriver: false
      })
    ]).start();
  };

  const createWaveEffect = (intensity: number = 1) => {
    const adjustedIntensity = 0.5 + (screenBrightness * 0.5) + (intensity * 0.2);
    Animated.sequence([
      Animated.timing(flashAnimation, {
        toValue: adjustedIntensity,
        duration: 60,
        useNativeDriver: false
      }),
      Animated.timing(flashAnimation, {
        toValue: 0,
        duration: 120,
        useNativeDriver: false
      })
    ]).start();

    Animated.timing(waveAnimation, {
      toValue: intensity * 0.5,
      duration: 160,
      useNativeDriver: false
    }).start();
  };

  const createBurstEffect = (intensity: number = 1) => {
    const brightness = screenBrightness * intensity;
    
    Animated.sequence([
      Animated.timing(flashAnimation, {
        toValue: brightness,
        duration: 30,
        useNativeDriver: false
      }),
      Animated.timing(flashAnimation, {
        toValue: 0,
        duration: 30,
        useNativeDriver: false
      }),
      Animated.timing(flashAnimation, {
        toValue: brightness * 0.8,
        duration: 30,
        useNativeDriver: false
      }),
      Animated.timing(flashAnimation, {
        toValue: 0,
        duration: 60,
        useNativeDriver: false
      })
    ]).start();

    Animated.sequence([
      Animated.timing(burstAnimation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false
      }),
      Animated.timing(burstAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false
      })
    ]).start();
  };

  const createFadeEffect = (intensity: number = 1) => {
    const brightness = screenBrightness * intensity;
    
    Animated.sequence([
      Animated.timing(flashAnimation, {
        toValue: brightness * 0.9,
        duration: 100,
        useNativeDriver: false
      }),
      Animated.timing(flashAnimation, {
        toValue: brightness * 0.3,
        duration: 200,
        useNativeDriver: false
      }),
      Animated.timing(flashAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false
      })
    ]).start();

    Animated.timing(sustainedAnimation, {
      toValue: intensity * 0.7,
      duration: 600,
      useNativeDriver: false
    }).start();
  };

  const triggerBeat = (level: number) => {
    if (Platform.OS !== 'web' && level > 0.7) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }

    switch (selectedEffect) {
      case 0:
        createPulseEffect(level);
        break;
      case 1:
        createWaveEffect(level);
        break;
      case 2:
        createBurstEffect(level);
        break;
      case 3:
        createFadeEffect(level);
        break;
    }
  };

  const stopEffects = () => {
    flashAnimation.stopAnimation();
    waveAnimation.stopAnimation();
    burstAnimation.stopAnimation();
    sustainedAnimation.stopAnimation();
    
    flashAnimation.setValue(0);
    waveAnimation.setValue(0);
    burstAnimation.setValue(0);
    sustainedAnimation.setValue(0);
  };

  useEffect(() => {
    if (!isListening) {
      stopEffects();
    }
  }, [isListening]);

  return {
    flashAnimation,
    waveAnimation,
    burstAnimation,
    sustainedAnimation,
    triggerBeat,
    stopEffects
  };
};