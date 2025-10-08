import { memo } from 'react';
import { ColorValue, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Slider from '@react-native-community/slider';
import { LinearGradient } from 'expo-linear-gradient';
import GlowButton from '@/components/shared/GlowButton';
import NeonContainer from '@/components/shared/NeonContainer';
import { EffectSelection } from '@/components/strobe/EffectSelection';
import AnimatedWave from '@/components/shared/AnimatedWave';
import { AudioLevelBar } from '@/components/sound/AudioLevelBar';
import { soundReactiveStyles } from '@/components/styles/sound-reactive';

interface PaletteOption {
  name: string;
  colors: string[];
}

interface SoundReactiveControlsProps {
  sensitivity: number;
  onSensitivityChange: (value: number) => void;
  screenBrightness: number;
  onBrightnessChange: (value: number) => void;
  selectedEffect: number;
  onSelectEffect: (value: number) => void;
  selectedPalette: number;
  onSelectPalette: (index: number) => void;
  paletteOptions: PaletteOption[];
  isListening: boolean;
  onToggleListening: () => void;
  audioLevel: number;
}

export const SoundReactiveControls = memo(
  ({
    sensitivity,
    onSensitivityChange,
    screenBrightness,
    onBrightnessChange,
    selectedEffect,
    onSelectEffect,
    selectedPalette,
    onSelectPalette,
    paletteOptions,
    isListening,
    onToggleListening,
    audioLevel,
  }: SoundReactiveControlsProps) => {
    const primaryColor = paletteOptions[selectedPalette].colors[0];

    return (
      <ScrollView style={soundReactiveStyles.scrollWrapper} showsVerticalScrollIndicator={false}>
        <View style={soundReactiveStyles.content}>
          <NeonContainer>
            <Text style={soundReactiveStyles.controlLabel}>Sensitivity</Text>
            <Slider
              style={soundReactiveStyles.slider}
              minimumValue={0.1}
              maximumValue={1}
              value={sensitivity}
              onValueChange={onSensitivityChange}
              minimumTrackTintColor={primaryColor}
              maximumTrackTintColor="#2A2A3A"
              thumbTintColor={primaryColor}
            />
            <View style={soundReactiveStyles.sliderContainer}>
              <Text style={soundReactiveStyles.sliderLabel}>Low</Text>
              <Text style={soundReactiveStyles.sliderLabel}>High</Text>
            </View>
          </NeonContainer>
        </View>

        <View style={soundReactiveStyles.content}>
          <NeonContainer>
            <Text style={soundReactiveStyles.controlLabel}>Screen Brightness</Text>
            <Slider
              style={soundReactiveStyles.slider}
              minimumValue={0.2}
              maximumValue={1}
              value={screenBrightness}
              onValueChange={onBrightnessChange}
              minimumTrackTintColor={primaryColor}
              maximumTrackTintColor="#2A2A3A"
              thumbTintColor={primaryColor}
            />
            <View style={soundReactiveStyles.sliderContainer}>
              <Text style={soundReactiveStyles.sliderLabel}>Dim</Text>
              <Text style={soundReactiveStyles.sliderLabel}>Bright</Text>
            </View>
          </NeonContainer>
        </View>

        <View style={soundReactiveStyles.content}>
          <NeonContainer>
            <EffectSelection
              selectedEffect={selectedEffect}
              currentColor={{ color: primaryColor }}
              setSelectedEffect={onSelectEffect}
            />
          </NeonContainer>
        </View>

        <View style={soundReactiveStyles.content}>
          <NeonContainer>
            <Text style={soundReactiveStyles.paletteTitle}>Color Palette</Text>
            <View style={soundReactiveStyles.paletteGrid}>
              {paletteOptions.map((palette, index) => (
                <TouchableOpacity
                  key={palette.name}
                  onPress={() => onSelectPalette(index)}
                  style={[
                    soundReactiveStyles.paletteItem,
                    selectedPalette === index && soundReactiveStyles.selectedPalette,
                  ]}
                >
                  <LinearGradient
                    colors={palette.colors as unknown as [ColorValue, ColorValue, ...ColorValue[]]}
                    style={soundReactiveStyles.paletteGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  />
                  <Text style={soundReactiveStyles.paletteName}>{palette.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </NeonContainer>
        </View>

        <View style={soundReactiveStyles.buttonSection}>
          <GlowButton
            title={isListening ? 'Stop Listening' : 'Start Listening'}
            onPress={onToggleListening}
            variant={isListening ? 'danger' : 'primary'}
            size='large'
            style={soundReactiveStyles.primaryButton}
          />
        </View>

        <View style={soundReactiveStyles.waveSection}>
          <AnimatedWave color={primaryColor} intensity={audioLevel + 0.5} />
          <View style={soundReactiveStyles.levelOverlay}>
            <AudioLevelBar audioLevel={audioLevel} color={primaryColor} />
          </View>
        </View>
      </ScrollView>
    );
  },
);

SoundReactiveControls.displayName = 'SoundReactiveControls';
