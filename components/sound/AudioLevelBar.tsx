import React from 'react';
import { View, Text, Animated } from 'react-native';

interface AudioLevelBarProps {
  audioLevel: number;
  color: string;
}

export const AudioLevelBar: React.FC<AudioLevelBarProps> = ({ audioLevel, color }) => {
  return (
    <View style={{
      height: 30,
      backgroundColor: 'rgba(0,0,0,0.3)',
      borderRadius: 15,
      overflow: 'hidden',
      marginTop: 10
    }}>
      <Animated.View style={{
        height: '100%',
        width: `${audioLevel * 100}%`,
        backgroundColor: color,
        borderRadius: 15
      }} />
      <Text style={{
        position: 'absolute',
        width: '100%',
        textAlign: 'center',
        color: '#FFFFFF',
        fontSize: 12,
        fontFamily: 'Rajdhani-Bold',
        lineHeight: 30
      }}>Audio Level</Text>
    </View>
  );
};