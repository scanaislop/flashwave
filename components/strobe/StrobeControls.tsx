import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Slider from '@react-native-community/slider';
import { Pause, Play, Zap } from 'lucide-react-native';

export default function StrobeControls({
  isStrobing,
  onToggleStrobe,
  strobeSpeed,
  onStrobeSpeedChange,
  selectedEffect,
  onSelectEffect,
  strobeEffectTypes,
  sustainedMode,
  onToggleSustained,
  selectedColor,
  onSelectColor,
  strobeColors,
  currentColor,
  styles
}) {
  return (
    <View style={styles.centerControls}>
      <TouchableOpacity
        onPress={onToggleStrobe}
        style={[styles.playButton, { borderColor: currentColor.color }]}
      >
        <LinearGradient
          colors={isStrobing ? ['#EF4444', '#DC2626'] : [currentColor.color, `${currentColor.color}CC`]}
          style={styles.playButtonGradient}
        >
          {isStrobing ? (
            <Pause size={32} color="#FFFFFF" />
          ) : (
            <Play size={32} color="#FFFFFF" />
          )}
        </LinearGradient>
      </TouchableOpacity>
      <Text style={styles.playButtonText}>
        {isStrobing ? 'CONTROLS AUTO-HIDE IN 3 SECONDS' : 'TAP TO START STROBE'}
      </Text>
      {/* Speed Control */}
      <View style={styles.controlSection}>
        <Text style={styles.controlLabel}>
          Speed: {Math.round(strobeSpeed * 100)}%
        </Text>
        <Slider
          style={styles.slider}
          minimumValue={0.1}
          maximumValue={1.0}
          value={strobeSpeed}
          onValueChange={onStrobeSpeedChange}
          minimumTrackTintColor={currentColor.color}
          maximumTrackTintColor="#64748B"
        />
      </View>
      {/* Effect Selection */}
      <View style={styles.controlSection}>
        <Text style={styles.controlLabel}>Effect Type</Text>
        <View style={styles.effectGrid}>
          {strobeEffectTypes.map((effect, index) => (
            <TouchableOpacity
              key={effect.id}
              onPress={() => onSelectEffect(index)}
              style={[
                styles.effectItem,
                selectedEffect === index && {
                  backgroundColor: `${currentColor.color}30`,
                  borderColor: currentColor.color
                }
              ]}
            >
              <effect.icon
                size={16}
                color={selectedEffect === index ? currentColor.color : '#94A3B8'}
              />
              <Text
                style={[
                  styles.effectText,
                  selectedEffect === index && { color: currentColor.color }
                ]}
              >
                {effect.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      {/* Sustained Mode Toggle */}
      <View style={styles.controlSection}>
        <TouchableOpacity
          onPress={onToggleSustained}
          style={[
            styles.sustainedToggle,
            sustainedMode && {
              backgroundColor: `${currentColor.color}30`,
              borderColor: currentColor.color
            }
          ]}
        >
          <Text
            style={[
              styles.sustainedText,
              sustainedMode && { color: currentColor.color }
            ]}
          >
            {sustainedMode ? '✓ Sustained Glow' : 'Sustained Glow'}
          </Text>
        </TouchableOpacity>
      </View>
      {/* Color Selection */}
      <View style={styles.controlSection}>
        <Text style={styles.controlLabel}>Color</Text>
        <View style={styles.colorGrid}>
          {strobeColors.map((color, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => onSelectColor(index)}
              style={[
                styles.colorItem,
                { backgroundColor: color.color },
                selectedColor === index && styles.selectedColorItem
              ]}
            >
              {selectedColor === index && (
                <Zap size={16} color={color.color === '#FFFFFF' ? '#000000' : '#FFFFFF'} />
              )}
              {index === 6 && (
                <LinearGradient
                  colors={['#FF0080', '#FF8000', '#FFFF00', '#80FF00', '#00FF80', '#0080FF']}
                  style={styles.rainbowGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
} 