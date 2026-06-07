import { useMemo } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Slider from '@react-native-community/slider';
import NeonContainer from '@/components/shared/NeonContainer';
import GlowButton from '@/components/shared/GlowButton';
import { wordStyles } from '@/components/styles/wordStyles';
import type { WordAnimation, WordState } from '@/hooks/useWordMode';

const MAX_TIMER_LENGTH = 3;

type FontOption = {
  label: string;
  value: string;
};

type AnimationOption = {
  id: WordAnimation;
  label: string;
};

type BooleanOption = {
  label: string;
  value: boolean;
};

export interface WordConfiguratorProps {
  state: WordState;
  fontOptions: FontOption[];
  colorOptions: string[];
  animationOptions: AnimationOption[];
  booleanOptions: BooleanOption[];
  onTextChange: (value: string) => void;
  onFontSelect: (value: string) => void;
  onColorSelect: (value: string) => void;
  onAnimationSelect: (value: WordAnimation) => void;
  onTimerChange: (value: string) => void;
  onConfettiChange: (value: boolean) => void;
  onBirthdayChange: (value: boolean) => void;
  onStart: () => void;
}

export function WordConfigurator({
  state,
  fontOptions,
  colorOptions,
  animationOptions,
  onTextChange,
  onFontSelect,
  onColorSelect,
  onAnimationSelect,
  onTimerChange,
  onStart,
}: WordConfiguratorProps) {
  const activeTimerValue = useMemo(() => (state.timer ? String(state.timer) : ''), [state.timer]);

  return (
    <ScrollView style={wordStyles.content} showsVerticalScrollIndicator={false}>
      <NeonContainer glowColor="#8B5CF6" style={wordStyles.sectionSpacing}>
        <View style={wordStyles.inputContainer}>
          <View style={wordStyles.labelRow}>
            <Text style={wordStyles.label}>Word</Text>
            <View style={wordStyles.labelActions}>
              <Text style={wordStyles.charCount}>{state.text.length} chars</Text>
            </View>
          </View>
          <TextInput
            style={wordStyles.textInput}
            placeholder="Enter a word"
            placeholderTextColor="#64748B"
            value={state.text}
            onChangeText={onTextChange}
            autoCapitalize="characters"
          />
        </View>
      </NeonContainer>

      <NeonContainer style={wordStyles.sectionSpacing}>
        <Text style={wordStyles.sectionHeader}>Font Style</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={wordStyles.horizontalOptions}
        >
          {fontOptions.map((option) => {
            const isActive = state.fontFamily === option.value;
            return (
              <TouchableOpacity
                key={option.value}
                onPress={() => onFontSelect(option.value)}
                style={[wordStyles.pillOption, isActive && wordStyles.pillOptionActive]}
              >
                <Text
                  style={[
                    wordStyles.pillOptionText,
                    { fontFamily: option.value },
                    isActive && wordStyles.pillOptionTextActive,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </NeonContainer>

      <NeonContainer style={wordStyles.sectionSpacing} glowColor="#06FFA5">
        <Text style={wordStyles.sectionHeader}>Color</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={wordStyles.horizontalOptions}
        >
          {colorOptions.map((color) => (
            <TouchableOpacity
              key={color}
              onPress={() => onColorSelect(color)}
              style={[
                wordStyles.colorItem,
                { backgroundColor: color },
                state.color === color && wordStyles.colorItemActive,
              ]}
            />
          ))}
        </ScrollView>
      </NeonContainer>

      <NeonContainer style={wordStyles.sectionSpacing}>
        <Text style={wordStyles.sectionHeader}>Animation</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={wordStyles.horizontalOptions}
        >
          {animationOptions.map((option) => {
            const isActive = state.animation === option.id;
            return (
              <TouchableOpacity
                key={option.id}
                onPress={() => onAnimationSelect(option.id)}
                style={[wordStyles.pillOption, isActive && wordStyles.pillOptionActive]}
              >
                <Text style={[wordStyles.pillOptionText, isActive && wordStyles.pillOptionTextActive]}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </NeonContainer>

      <NeonContainer style={wordStyles.sectionSpacing} glowColor="#F97316">
        <View style={wordStyles.timerRow}>
          <Slider
            style={wordStyles.timerSlider}
            minimumValue={0}
            maximumValue={300}
            step={1}
            value={state.timer}
            onValueChange={(value) => onTimerChange(String(Math.round(value)))}
            minimumTrackTintColor="#F97316"
            maximumTrackTintColor="#1F2937"
            thumbTintColor="#F97316"
          />
          <TextInput
            style={wordStyles.timerInput}
            keyboardType="number-pad"
            value={activeTimerValue}
            onChangeText={onTimerChange}
            placeholder="0"
            placeholderTextColor="#64748B"
            maxLength={MAX_TIMER_LENGTH}
          />
          <Text style={wordStyles.timerHint}>sec</Text>
        </View>
      </NeonContainer>

      <NeonContainer>
        <GlowButton
          title="Start Display"
          onPress={onStart}
          variant="primary"
          size="large"
          style={wordStyles.startButton}
          disabled={!state.text.trim()}
        />
      </NeonContainer>
    </ScrollView>
  );
}
