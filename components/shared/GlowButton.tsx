import React from 'react';
import { Platform, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

interface GlowButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}

export default function GlowButton({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  style,
  textStyle,
  disabled = false
}: GlowButtonProps) {
  const handlePress = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    onPress();
  };

  const getGradientColors = () => {
    if (disabled) return ['#64748B', '#475569'];

    switch (variant) {
      case 'primary':
        return ['#06FFA5', '#059669'];
      case 'secondary':
        return ['#8B5CF6', '#7C3AED'];
      case 'danger':
        return ['#EF4444', '#DC2626'];
      default:
        return ['#06FFA5', '#059669'];
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { height: 40, paddingHorizontal: 16 };
      case 'large':
        return { height: 65, paddingHorizontal: 32 };
      default:
        return { height: 52, paddingHorizontal: 24 };
    }
  };

  const getTextSize = () => {
    switch (size) {
      case 'small':
        return 14;
      case 'large':
        return 20;
      default:
        return 16;
    }
  };

  return (<TouchableOpacity
    onPress={handlePress}
    disabled={disabled}
    style={[styles.container, getSizeStyles(), style]}
    activeOpacity={0.8}>
    <LinearGradient
      colors={getGradientColors() as any}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}>
      <Text
        style={[styles.text, { fontSize: getTextSize() }, disabled && styles.disabledText, textStyle]}>
        {title}
      </Text>
    </LinearGradient>
  </TouchableOpacity>);
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#06FFA5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8
  }, gradient: {
    flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 12
  }, text: {
    color: '#FFFFFF', fontFamily: 'Rajdhani-Bold', textAlign: 'center', letterSpacing: 0.5
  }, disabledText: {
    color: '#9CA3AF'
  }
});
