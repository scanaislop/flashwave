import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Animated } from 'react-native';

const createFlashAnimation = () => new Animated.Value(0);

export const useManualStrobe = () => {
  const [isStrobing, setIsStrobing] = useState(false);
  const [isManualMode, setIsManualMode] = useState(false);
  const [strobeSpeed, setStrobeSpeed] = useState(0.5);
  const [selectedColor, setSelectedColor] = useState(0);
  const [timerEnabled, setTimerEnabled] = useState(false);
  const [timerMinutes, setTimerMinutes] = useState(5);

  const flashAnimation = useRef(createFlashAnimation()).current;
  const strobeInterval = useRef<NodeJS.Timeout | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const clearIntervals = useCallback(() => {
    if (strobeInterval.current) {
      clearInterval(strobeInterval.current);
      strobeInterval.current = null;
    }
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const stopStrobe = useCallback(() => {
    setIsStrobing(false);
    clearIntervals();
    flashAnimation.setValue(0);
  }, [clearIntervals, flashAnimation]);

  const runFlash = useCallback((duration = 50) => {
    Animated.sequence([
      Animated.timing(flashAnimation, {
        toValue: 1,
        duration,
        useNativeDriver: false,
      }),
      Animated.timing(flashAnimation, {
        toValue: 0,
        duration,
        useNativeDriver: false,
      }),
    ]).start();
  }, [flashAnimation]);

  const startStrobe = useCallback(() => {
    clearIntervals();
    setIsStrobing(true);

    if (!isManualMode) {
      const interval = Math.max(50, 1000 - strobeSpeed * 950);
      strobeInterval.current = setInterval(() => {
        runFlash(50);
      }, interval) as unknown as NodeJS.Timeout;
    }

    if (timerEnabled) {
      timerRef.current = setTimeout(stopStrobe, timerMinutes * 60 * 1000) as unknown as NodeJS.Timeout;
    }
  }, [clearIntervals, isManualMode, strobeSpeed, timerEnabled, timerMinutes, runFlash, stopStrobe]);

  const handleManualFlash = useCallback(() => {
    if (!isManualMode || !isStrobing) return;
    runFlash(100);
  }, [isManualMode, isStrobing, runFlash]);

  const toggleMode = useCallback(() => {
    if (isStrobing) {
      stopStrobe();
    }
    setIsManualMode((prev) => !prev);
  }, [isStrobing, stopStrobe]);

  const flashOpacity = useMemo(
    () =>
      flashAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.9],
      }),
    [flashAnimation],
  );

  useEffect(() => () => clearIntervals(), [clearIntervals]);

  return {
    isStrobing,
    isManualMode,
    strobeSpeed,
    selectedColor,
    timerEnabled,
    timerMinutes,
    flashOpacity,
    setStrobeSpeed,
    setSelectedColor,
    setTimerEnabled,
    setTimerMinutes,
    toggleMode,
    startStrobe,
    stopStrobe,
    handleManualFlash,
  };
};
