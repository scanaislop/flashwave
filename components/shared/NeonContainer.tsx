import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface NeonContainerProps {
  children: React.ReactNode;
  style?: ViewStyle | undefined | any;
  glowColor?: string;
  variant?: 'subtle' | 'medium' | 'strong';
}

export default function NeonContainer({
  children, style, glowColor = '#8B5CF6', variant = 'medium'
}: NeonContainerProps) {
  const getOpacity = () => {
    switch (variant) {
      case 'subtle':
        return 0.1;
      case 'strong':
        return 0.3;
      default:
        return 0.2;
    }
  };

  return (<View style={[styles.container, style]}>
    <LinearGradient
      colors={[`${glowColor}00`, `${glowColor}${Math.round(getOpacity() * 255).toString(16).padStart(2, '0')}`, `${glowColor}00`]}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    />
    <View style={styles.content}>
      {children}
    </View>
  </View>);
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16, borderWidth: 1, borderColor: '#8B5CF680', overflow: 'hidden'
  }, gradient: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0
  }, content: {
    padding: 20, backgroundColor: '#0A0A0F99'
  }
});
