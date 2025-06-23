import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface AnimatedWaveProps {
  intensity?: number;
  color?: string;
}

export default function AnimatedWave({ intensity = 1, color = '#06FFA5' }: AnimatedWaveProps) {
  const waveAnimation = useSharedValue(0);

  useEffect(() => {
    waveAnimation.value = withRepeat(withTiming(1, { duration: 2000 }), -1, true);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(waveAnimation.value, [0, 1], [0.8, 1.2 * intensity]);

    const opacity = interpolate(waveAnimation.value, [0, 0.5, 1], [0.3, 0.8, 0.3]);

    return {
      transform: [{ scale }], opacity
    };
  });

  return (<View style={styles.container}>
    <Animated.View style={[styles.wave, animatedStyle]}>
      <LinearGradient
        colors={[`${color}80`, `${color}20`, `${color}00`]}
        style={styles.gradient}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />
    </Animated.View>
  </View>);
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center', justifyContent: 'center', height: 200
  }, wave: {
    width: width * 0.8, height: 200, borderRadius: 100
  }, gradient: {
    flex: 1, borderRadius: 100
  }
});
