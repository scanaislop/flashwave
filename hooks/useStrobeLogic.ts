import { useEffect, useCallback, useRef } from 'react';
import { Animated } from 'react-native';
import { UseStrobeLogicProps } from '@/types/strobe';
import Torch from 'react-native-torch';
import { Platform } from 'react-native';

export const useStrobeLogic = ({ 
  settings, 
  animations, 
  intervals, 
  setCurrentColorIndex 
}: UseStrobeLogicProps) => {
  const isMounted = useRef(true);

  // Animation effect creators
  const createPulseEffect = useCallback(() => {
    Animated.sequence([
      Animated.timing(animations.flashAnimation, {
        toValue: 1, duration: 40, useNativeDriver: false
      }),
      Animated.timing(animations.flashAnimation, {
        toValue: 0, duration: 80, useNativeDriver: false
      })
    ]).start();
  }, [animations.flashAnimation]);

  const createWaveEffect = useCallback((count: number) => {
    const intensity = 0.7 + (count % 4) * 0.1;
    Animated.sequence([
      Animated.timing(animations.flashAnimation, {
        toValue: intensity, duration: 60, useNativeDriver: false
      }),
      Animated.timing(animations.flashAnimation, {
        toValue: 0, duration: 120, useNativeDriver: false
      })
    ]).start();
  }, [animations.flashAnimation]);

  const createBurstEffect = useCallback(() => {
    Animated.sequence([
      Animated.timing(animations.flashAnimation, {
        toValue: 1, duration: 30, useNativeDriver: false
      }),
      Animated.timing(animations.flashAnimation, {
        toValue: 0, duration: 30, useNativeDriver: false
      }),
      Animated.timing(animations.flashAnimation, {
        toValue: 0.8, duration: 30, useNativeDriver: false
      }),
      Animated.timing(animations.flashAnimation, {
        toValue: 0, duration: 30, useNativeDriver: false
      }),
      Animated.timing(animations.flashAnimation, {
        toValue: 0.6, duration: 30, useNativeDriver: false
      }),
      Animated.timing(animations.flashAnimation, {
        toValue: 0, duration: 60, useNativeDriver: false
      })
    ]).start();
    
    Animated.sequence([
      Animated.timing(animations.burstAnimation, {
        toValue: 1, duration: 200, useNativeDriver: false
      }),
      Animated.timing(animations.burstAnimation, {
        toValue: 0, duration: 300, useNativeDriver: false
      })
    ]).start();
  }, [animations.flashAnimation, animations.burstAnimation]);

  const createFadeEffect = useCallback(() => {
    Animated.sequence([
      Animated.timing(animations.flashAnimation, {
        toValue: 0.9, duration: 100, useNativeDriver: false
      }),
      Animated.timing(animations.flashAnimation, {
        toValue: 0.3, duration: 200, useNativeDriver: false
      }),
      Animated.timing(animations.flashAnimation, {
        toValue: 0, duration: 300, useNativeDriver: false
      })
    ]).start();
  }, [animations.flashAnimation]);

  // Main strobe effect runner
  const startStrobeEffect = useCallback(() => {
    if (intervals.strobeInterval.current) {
      clearInterval(intervals.strobeInterval.current);
    }

    const baseInterval = Math.max(50, 1000 - settings.strobeSpeed * 950);
    let flashCount = 0;

    intervals.strobeInterval = setInterval(() => {
      if (!isMounted.current) return;
      
      flashCount++;
      switch (settings.selectedEffect) {
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

      // Color cycling for rainbow effect
      if (settings.selectedColor === 6 && flashCount % 3 === 0) {
        // @ts-ignore
        setCurrentColorIndex((prev) => (prev + 1) % 6);
      }
    }, baseInterval) as any;
  }, [settings.strobeSpeed, settings.selectedEffect, settings.selectedColor, intervals.strobeInterval, createPulseEffect, createWaveEffect, createBurstEffect, createFadeEffect, setCurrentColorIndex]);

  // Flashlight strobe effect
  const startFlashlightStrobe = useCallback(() => {
    if (intervals.flashlightInterval.current) {
      clearInterval(intervals.flashlightInterval.current);
    }

    const baseInterval = Math.max(50, 1000 - settings.strobeSpeed * 950);
    
    intervals.flashlightInterval = setInterval(async () => {
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
    }, baseInterval) as any;
  }, [settings.strobeSpeed, intervals.flashlightInterval]);

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
    if (intervals.strobeInterval.current) {
      clearInterval(intervals.strobeInterval.current);
      intervals.strobeInterval.current = null;
    }
    animations.flashAnimation.setValue(0);
  }, [animations.flashAnimation, intervals.strobeInterval]);

  const stopFlashlightStrobe = useCallback(async () => {
    if (intervals.flashlightInterval.current) {
      clearInterval(intervals.flashlightInterval.current);
      intervals.flashlightInterval.current = null;
    }
    if (Platform.OS !== 'web' && Torch && Torch.switchState) {
      try {
        await Torch.switchState(false);
      } catch (error) {
        console.log('Error turning off flashlight:', error);
      }
    }
  }, [intervals.flashlightInterval]);

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
      if (intervals.colorCycleLoop.current) {
        intervals.colorCycleLoop.current.stop();
      }
      
      const loop = Animated.loop(
        Animated.timing(animations.colorCycleAnimation, {
          toValue: 1, duration: 3000, useNativeDriver: false
        })
      );
      loop.start();
      intervals.colorCycleLoop.current = loop;
    } else {
      if (intervals.colorCycleLoop.current) {
        intervals.colorCycleLoop.current.stop();
        intervals.colorCycleLoop.current = null;
      }
    }
  }, [settings.selectedColor, animations.colorCycleAnimation, intervals.colorCycleLoop]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMounted.current = false;
      if (intervals.strobeInterval.current) {
        clearInterval(intervals.strobeInterval.current);
      }
      if (intervals.flashlightInterval.current) {
        clearInterval(intervals.flashlightInterval.current);
      }
      if (intervals.colorCycleLoop.current) {
        intervals.colorCycleLoop.current.stop();
      }
    };
  }, [intervals]);

  return {
    startStrobeEffect,
    stopStrobeEffect,
    startFlashlightStrobe,
    stopFlashlightStrobe,
    startSustainedEffect,
    stopSustainedEffect
  };
};