// hooks/useUIControls.ts
import { useCallback, useRef, useState, useEffect } from 'react';
import { Animated } from 'react-native';

export const useUIControls = () => {
  const [showControls, setShowControls] = useState(true);
  const controlsOpacity = useRef(new Animated.Value(1)).current;
  const toggleIconOpacity = useRef(new Animated.Value(0)).current;
  const hideControlsTimeout = useRef<NodeJS.Timeout | null>(null);

  const hideControls = useCallback(() => {
    Animated.parallel([
      Animated.timing(controlsOpacity, {
        toValue: 0, duration: 300, useNativeDriver: true
      }),
      Animated.timing(toggleIconOpacity, {
        toValue: 1, duration: 500, useNativeDriver: true
      })
    ]).start(() => {
      setShowControls(false);
    });
  }, [controlsOpacity, toggleIconOpacity]);

  const showControlsPermanently = useCallback(() => {
    setShowControls(true);
    Animated.parallel([
      Animated.timing(controlsOpacity, {
        toValue: 1, duration: 200, useNativeDriver: true
      }),
      Animated.timing(toggleIconOpacity, {
        toValue: 0, duration: 200, useNativeDriver: true
      })
    ]).start();
    
    if (hideControlsTimeout.current) {
      clearTimeout(hideControlsTimeout.current);
    }
  }, [controlsOpacity, toggleIconOpacity]);

  const showControlsTemporarily = useCallback(() => {
    setShowControls(true);
    Animated.parallel([
      Animated.timing(controlsOpacity, {
        toValue: 1, duration: 200, useNativeDriver: true
      }),
      Animated.timing(toggleIconOpacity, {
        toValue: 0, duration: 200, useNativeDriver: true
      })
    ]).start();

    if (hideControlsTimeout.current) {
      clearTimeout(hideControlsTimeout.current);
    }

    hideControlsTimeout.current = setTimeout(() => {
      hideControls();
    }, 3000) as any;
  }, [controlsOpacity, toggleIconOpacity, hideControls]);

  const handleToggleControls = useCallback(() => {
    if (showControls) {
      hideControls();
    } else {
      showControlsTemporarily();
    }
  }, [showControls, hideControls, showControlsTemporarily]);

  const handleScreenTap = useCallback(() => {
    if (!showControls) {
      showControlsTemporarily();
    }
  }, [showControls, showControlsTemporarily]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hideControlsTimeout.current) {
        clearTimeout(hideControlsTimeout.current);
      }
    };
  }, []);

  return {
    showControls,
    controlsOpacity,
    toggleIconOpacity,
    hideControls,
    showControlsPermanently,
    showControlsTemporarily,
    handleToggleControls,
    handleScreenTap
  };
};