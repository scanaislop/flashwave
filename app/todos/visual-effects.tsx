import React, { useState } from 'react';
import { Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import GlowButton from '@/components/shared/GlowButton';
import NeonContainer from '@/components/shared/NeonContainer';
import AnimatedWave from '@/components/shared/AnimatedWave';
import * as Haptics from 'expo-haptics';
import { customColors, lightEffects } from '@/constants/color';
import { virtualEffectsStyles } from '@/components/styles/virtual-effects';

export default function VisualEffectsScreen() {
  const [selectedEffect, setSelectedEffect] = useState(0);
  const [selectedColors, setSelectedColors] = useState([0, 1, 2]);
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [savedPresets, setSavedPresets] = useState([]);

  const handleEffectSelect = (index: number) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setSelectedEffect(index);
  };

  const handleColorSelect = (colorIndex: number) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    if (selectedColors.includes(colorIndex)) {
      setSelectedColors(selectedColors.filter(c => c !== colorIndex));
    } else if (selectedColors.length < 4) {
      setSelectedColors([...selectedColors, colorIndex]);
    }
  };

  const savePreset = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    // Save current configuration
  };

  const startEffect = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }
    // Start the selected visual effect
  };

  const currentEffect = lightEffects[selectedEffect];

  return (<LinearGradient colors={['#0A0A0F', '#1A1A2E']} style={virtualEffectsStyles.container}>
      <SafeAreaView style={virtualEffectsStyles.safeArea} edges={['right', 'left', 'top']}>
        <View style={virtualEffectsStyles.header}>
          <Text style={virtualEffectsStyles.title}>Visual Effects</Text>
          <Text style={virtualEffectsStyles.subtitle}>Choose and customize your light show</Text>
        </View>

        <ScrollView style={virtualEffectsStyles.content} showsVerticalScrollIndicator={false}>
          {/* Preview Section */}
          <NeonContainer
            style={virtualEffectsStyles.previewContainer}
            glowColor={currentEffect.preview}
          >
            <View style={virtualEffectsStyles.previewHeader}>
              <currentEffect.icon size={24} color={currentEffect.preview} />
              <Text style={virtualEffectsStyles.previewTitle}>{currentEffect.name}</Text>
            </View>
            <AnimatedWave
              color={currentEffect.preview}
              intensity={1.5}
            />
            <Text style={virtualEffectsStyles.previewDescription}>
              {currentEffect.description}
            </Text>
          </NeonContainer>

          {/* Effect Selection */}
          <View style={virtualEffectsStyles.effectsSection}>
            <Text style={virtualEffectsStyles.sectionTitle}>Light Effects</Text>
            <View style={virtualEffectsStyles.effectsGrid}>
              {lightEffects.map((effect, index) => (<TouchableOpacity
                  key={effect.id}
                  onPress={() => handleEffectSelect(index)}
                  style={[virtualEffectsStyles.effectCard, selectedEffect === index && virtualEffectsStyles.selectedEffectCard]}>
                  <LinearGradient
                    colors={selectedEffect === index ? [effect.preview + '40', effect.preview + '20'] : ['#1E293B', '#0F172A']}
                    style={virtualEffectsStyles.effectGradient}>
                    <effect.icon
                      size={28}
                      color={selectedEffect === index ? effect.preview : '#64748B'}
                    />
                    <Text style={[virtualEffectsStyles.effectName, selectedEffect === index && { color: '#FFFFFF' }]}>
                      {effect.name}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>))}
            </View>
          </View>

          {/* Custom Colors */}
          <NeonContainer style={virtualEffectsStyles.colorsContainer}>
            <View style={virtualEffectsStyles.colorsHeader}>
              <Text style={virtualEffectsStyles.colorsTitle}>Custom Colors</Text>
              <TouchableOpacity
                onPress={() => setIsCustomMode(!isCustomMode)}
                style={virtualEffectsStyles.customToggle}>
                <Text
                  style={[virtualEffectsStyles.customToggleText, isCustomMode && virtualEffectsStyles.customToggleActive]}>
                  {isCustomMode ? 'Using Custom' : 'Use Preset'}
                </Text>
              </TouchableOpacity>
            </View>

            {isCustomMode && (<>
                <Text style={virtualEffectsStyles.colorsSubtitle}>
                  Selected: {selectedColors.length}/4 colors
                </Text>
                <View style={virtualEffectsStyles.colorsGrid}>
                  {customColors.map((color, index) => (<TouchableOpacity
                      key={index}
                      onPress={() => handleColorSelect(index)}
                      style={[virtualEffectsStyles.colorItem, { backgroundColor: color }, selectedColors.includes(index) && virtualEffectsStyles.selectedColorItem]}>
                      {selectedColors.includes(index) && (<Text style={virtualEffectsStyles.colorCheck}>✓</Text>)}
                    </TouchableOpacity>))}
                </View>
              </>)}

            {!isCustomMode && (<View style={virtualEffectsStyles.presetColors}>
                <Text style={virtualEffectsStyles.colorsSubtitle}>Effect Colors</Text>
                <View style={virtualEffectsStyles.presetColorRow}>
                  {currentEffect.colors.map((color, index) => (<View
                      key={index}
                      style={[virtualEffectsStyles.presetColorItem, { backgroundColor: color }]}
                    />))}
                </View>
              </View>)}
          </NeonContainer>

          {/* Saved Presets */}
          <NeonContainer style={virtualEffectsStyles.presetsContainer} variant="subtle">
            <View style={virtualEffectsStyles.presetsHeader}>
              <Text style={virtualEffectsStyles.presetsTitle}>Saved Presets</Text>
              <TouchableOpacity onPress={savePreset} style={virtualEffectsStyles.saveButton}>
                <Text style={virtualEffectsStyles.saveButtonText}>Save Current</Text>
              </TouchableOpacity>
            </View>

            {savedPresets.length === 0 ? (<Text style={virtualEffectsStyles.noPresets}>
                No saved presets yet. Create your perfect combination and save it!
              </Text>) : (<View style={virtualEffectsStyles.presetsList}>
                {savedPresets.map((preset, index) => (
                  <TouchableOpacity key={index} style={virtualEffectsStyles.presetItem}>
                    <Text style={virtualEffectsStyles.presetName}>Preset {index + 1}</Text>
                  </TouchableOpacity>))}
              </View>)}
          </NeonContainer>

          <GlowButton
            title="Start Light Show"
            onPress={startEffect}
            size="large"
            style={virtualEffectsStyles.startButton}
          />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>);
}
