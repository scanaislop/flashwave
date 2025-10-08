import React from 'react';
import { View, Text, Animated } from 'react-native';
import { fonts } from '@/constants/fonts';

interface AudioVisualizationProps {
  bassLevel: number;
  midLevel: number;
  trebleLevel: number;
  beatDetected: boolean;
  currentBPM: number;
  colors: string[];
}

export const AudioVisualization: React.FC<AudioVisualizationProps> = ({
  bassLevel,
  midLevel,
  trebleLevel,
  beatDetected,
  currentBPM,
  colors
}) => {
  return (
    <>
      {/* Audio visualization bars */}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        height: 60,
        width: '100%',
        marginBottom: 20
      }}>
        <Animated.View style={{
          width: 20,
          height: bassLevel * 60,
          backgroundColor: colors[0],
          marginHorizontal: 5,
          borderRadius: 4,
          opacity: beatDetected ? 1 : 0.7
        }} />
        <Animated.View style={{
          width: 20,
          height: midLevel * 60,
          backgroundColor: colors[1] || colors[0],
          marginHorizontal: 5,
          borderRadius: 4
        }} />
        <Animated.View style={{
          width: 20,
          height: trebleLevel * 60,
          backgroundColor: colors[2] || colors[0],
          marginHorizontal: 5,
          borderRadius: 4
        }} />
      </View>
      
      {/* BPM Display */}
      <View style={{ alignItems: 'center' }}>
        <Text style={{
          fontSize: 48,
          fontFamily: fonts.bold,
          color: beatDetected ? colors[0] : '#FFFFFF'
        }}>{currentBPM}</Text>
        <Text style={{ fontSize: 16, fontFamily: 'Rajdhani-Bold', color: '#06FFA5' }}>BPM</Text>
      </View>
    </>
  );
};
