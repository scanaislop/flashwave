import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ArrowLeft, EyeOff } from 'lucide-react-native';

export default function StrobeHeader({ onBack, onToggleControls, currentColor, styles }) {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onBack} style={styles.headerButton}>
        <ArrowLeft size={24} color="#FFFFFF" />
      </TouchableOpacity>
      <Text style={styles.title}>STROBE MODE</Text>
      <TouchableOpacity onPress={onToggleControls} style={styles.headerButton}>
        <EyeOff size={20} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
} 