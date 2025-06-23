import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Flashlight, FlashlightOff, Sun, SunDim } from 'lucide-react-native';
import Slider from '@react-native-community/slider';

export default function StrobeHardware({
  flashlightEnabled,
  torchAvailable,
  onToggleFlashlight,
  screenBrightness,
  onBrightnessChange,
  currentColor,
  styles
}) {
  return (
    <View style={styles.controlSection}>
      <Text style={styles.controlLabel}>Hardware Controls</Text>
      <View style={styles.hardwareControls}>
        <TouchableOpacity
          onPress={onToggleFlashlight}
          style={[
            styles.hardwareButton,
            flashlightEnabled && {
              backgroundColor: `${currentColor.color}30`,
              borderColor: currentColor.color
            }
          ]}
        >
          {flashlightEnabled ? (
            <Flashlight size={20} color={currentColor.color} />
          ) : (
            <FlashlightOff size={20} color="#94A3B8" />
          )}
          <Text
            style={[
              styles.hardwareButtonText,
              flashlightEnabled && { color: currentColor.color }
            ]}
          >
            Flashlight {!torchAvailable && '(N/A)'}
          </Text>
        </TouchableOpacity>
        <View style={styles.brightnessContainer}>
          <View style={styles.brightnessHeader}>
            <SunDim size={16} color="#94A3B8" />
            <Text style={styles.brightnessLabel}>
              Screen: {Math.round(screenBrightness * 100)}%
            </Text>
            <Sun size={16} color={currentColor.color} />
          </View>
          <Slider
            style={styles.brightnessSlider}
            minimumValue={0.1}
            maximumValue={1.0}
            value={screenBrightness}
            onValueChange={onBrightnessChange}
            minimumTrackTintColor={currentColor.color}
            maximumTrackTintColor="#64748B"
          />
        </View>
      </View>
    </View>
  );
} 