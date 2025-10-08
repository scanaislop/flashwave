import { Animated } from 'react-native';
import { StrobeAnimations } from '@/types/strobe';

export const runPulseEffect = (animations: StrobeAnimations) => {
  Animated.sequence([
    Animated.timing(animations.flashAnimation, {
      toValue: 1,
      duration: 40,
      useNativeDriver: false,
    }),
    Animated.timing(animations.flashAnimation, {
      toValue: 0,
      duration: 80,
      useNativeDriver: false,
    }),
  ]).start();
};

export const runWaveEffect = (animations: StrobeAnimations, count: number) => {
  const intensity = 0.7 + (count % 4) * 0.1;
  Animated.sequence([
    Animated.timing(animations.flashAnimation, {
      toValue: intensity,
      duration: 60,
      useNativeDriver: false,
    }),
    Animated.timing(animations.flashAnimation, {
      toValue: 0,
      duration: 120,
      useNativeDriver: false,
    }),
  ]).start();
};

export const runBurstEffect = (animations: StrobeAnimations) => {
  Animated.sequence([
    Animated.timing(animations.flashAnimation, {
      toValue: 1,
      duration: 30,
      useNativeDriver: false,
    }),
    Animated.timing(animations.flashAnimation, {
      toValue: 0,
      duration: 30,
      useNativeDriver: false,
    }),
    Animated.timing(animations.flashAnimation, {
      toValue: 0.8,
      duration: 30,
      useNativeDriver: false,
    }),
    Animated.timing(animations.flashAnimation, {
      toValue: 0,
      duration: 30,
      useNativeDriver: false,
    }),
    Animated.timing(animations.flashAnimation, {
      toValue: 0.6,
      duration: 30,
      useNativeDriver: false,
    }),
    Animated.timing(animations.flashAnimation, {
      toValue: 0,
      duration: 60,
      useNativeDriver: false,
    }),
  ]).start();

  Animated.sequence([
    Animated.timing(animations.burstAnimation, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }),
    Animated.timing(animations.burstAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }),
  ]).start();
};

export const runFadeEffect = (animations: StrobeAnimations) => {
  Animated.sequence([
    Animated.timing(animations.flashAnimation, {
      toValue: 0.9,
      duration: 100,
      useNativeDriver: false,
    }),
    Animated.timing(animations.flashAnimation, {
      toValue: 0.3,
      duration: 200,
      useNativeDriver: false,
    }),
    Animated.timing(animations.flashAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }),
  ]).start();
};
