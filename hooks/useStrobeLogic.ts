import { useEffect, useCallback, useRef } from 'react';
import { Animated, Platform } from 'react-native';
import Torch from 'react-native-torch';
import { UseStrobeLogicProps } from '@/types/strobe';
import { runBurstEffect, runFadeEffect, runPulseEffect, runWaveEffect } from '@/utils/strobeEffects';

export const useStrobeLogic = ({
  settings,
  animations,
  intervals,
  setCurrentColorIndex,
}: UseStrobeLogicProps) => {
  const isMounted = useRef(true);
  const { strobeInterval, flashlightInterval, colorCycleLoop } = intervals;

  // Main strobe effect runner
  const startStrobeEffect = useCallback(() => {
    if (strobeInterval.current) {
      clearInterval(strobeInterval.current);
    }

    const baseInterval = Math.max(50, 1000 - settings.strobeSpeed * 950);
    let flashCount = 0;

    strobeInterval.current = setInterval(() => {
      if (!isMounted.current) return;
      
      flashCount++;
      switch (settings.selectedEffect) {
        case 0:
          runPulseEffect(animations);
          break;
        case 1:
          runWaveEffect(animations, flashCount);
          break;
        case 2:
          runBurstEffect(animations);
          break;
        case 3:
          runFadeEffect(animations);
          break;
      }

      // Color cycling for rainbow effect
      if (settings.selectedColor === 6 && flashCount % 3 === 0) {
        // @ts-ignore
        setCurrentColorIndex((prev) => (prev + 1) % 6);
      }
    }, baseInterval) as unknown as NodeJS.Timeout;
  }, [
    settings.strobeSpeed,
    settings.selectedEffect,
    settings.selectedColor,
    animations,
    strobeInterval,
    setCurrentColorIndex,
  ]);

  // Flashlight strobe effect
  const startFlashlightStrobe = useCallback(() => {
    if (flashlightInterval.current) {
      clearInterval(flashlightInterval.current);
    }

    const baseInterval = Math.max(50, 1000 - settings.strobeSpeed * 950);

    flashlightInterval.current = setInterval(async () => {
      if (!isMounted.current) return;
      
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
    }, baseInterval) as unknown as NodeJS.Timeout;
  }, [flashlightInterval, settings.strobeSpeed]);

  // Sustained glow effect
  const startSustainedEffect = useCallback(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animations.sustainedAnimation, {
          toValue: 0.4, duration: 800, useNativeDriver: false
        }),
        Animated.timing(animations.sustainedAnimation, {
          toValue: 0.1, duration: 1200, useNativeDriver: false
        })
      ])
    ).start();
  }, [animations.sustainedAnimation]);

  // Stop all effects
  const stopStrobeEffect = useCallback(() => {
    if (strobeInterval.current) {
      clearInterval(strobeInterval.current);
      strobeInterval.current = null;
    }
    animations.flashAnimation.setValue(0);
  }, [animations.flashAnimation, strobeInterval]);

  const stopFlashlightStrobe = useCallback(async () => {
    if (flashlightInterval.current) {
      clearInterval(flashlightInterval.current);
      flashlightInterval.current = null;
    }
    if (Platform.OS !== 'web' && Torch && Torch.switchState) {
      try {
        await Torch.switchState(false);
      } catch (error) {
        console.log('Error turning off flashlight:', error);
      }
    }
  }, [flashlightInterval]);

  const stopSustainedEffect = useCallback(() => {
    animations.sustainedAnimation.setValue(0);
  }, [animations.sustainedAnimation]);

  // Background wave animation
  useEffect(() => {
    const waveLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(animations.waveAnimation, {
          toValue: 1, duration: 1500, useNativeDriver: false
        }),
        Animated.timing(animations.waveAnimation, {
          toValue: 0, duration: 1500, useNativeDriver: false
        })
      ])
    );
    waveLoop.start();

    return () => {
      waveLoop.stop();
    };
  }, [animations.waveAnimation]);

  // Color cycle animation for rainbow mode
  useEffect(() => {
    if (settings.selectedColor === 6) {
      if (colorCycleLoop.current) {
        colorCycleLoop.current.stop();
      }
      
      const loop = Animated.loop(
        Animated.timing(animations.colorCycleAnimation, {
          toValue: 1, duration: 3000, useNativeDriver: false
        })
      );
      loop.start();
      colorCycleLoop.current = loop;
    } else {
      if (colorCycleLoop.current) {
        colorCycleLoop.current.stop();
        colorCycleLoop.current = null;
      }
    }
  }, [animations.colorCycleAnimation, colorCycleLoop, settings.selectedColor]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMounted.current = false;
      if (strobeInterval.current) {
        clearInterval(strobeInterval.current);
      }
      if (flashlightInterval.current) {
        clearInterval(flashlightInterval.current);
      }
      if (colorCycleLoop.current) {
        colorCycleLoop.current.stop();
      }
    };
  }, [colorCycleLoop, flashlightInterval, strobeInterval]);

  return {
    startStrobeEffect,
    stopStrobeEffect,
    startFlashlightStrobe,
    stopFlashlightStrobe,
    startSustainedEffect,
    stopSustainedEffect
  };
};
