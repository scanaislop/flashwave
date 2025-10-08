import AnimatedWave from '@/components/shared/AnimatedWave';
import GlowButton from '@/components/shared/GlowButton';
import NeonContainer from '@/components/shared/NeonContainer';
import { EffectSelection } from '@/components/strobe/EffectSelection';
import { soundReactiveStyles } from '@/components/styles/sound-reactive';
import { colorPalettes } from '@/constants/color';
import Slider from '@react-native-community/slider';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { ColorValue, Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SoundReactiveEffects } from '@/components/sound/SoundReactiveEffects';
import { useAudioPermissions } from '@/hooks/useAudioPermissions';
import { useAudioBeatDetection } from '@/hooks/useAudioAnalysis';
import { useStrobeEffects } from '@/hooks/useStrobeEffects';
import { AudioVisualization } from '@/components/sound/AudioVisualization';
import { AudioLevelBar } from '@/components/sound/AudioLevelBar';

export default function SoundReactiveScreen() {
  const [isListening, setIsListening] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [sensitivity, setSensitivity] = useState(0.5);
  const [screenBrightness, setScreenBrightness] = useState(0.8);
  const [selectedEffect, setSelectedEffect] = useState(0);
  const [selectedPalette, setSelectedPalette] = useState(0);

  const { audioPermission, requestAudioPermission } = useAudioPermissions();

  // Use the new beat detection hook with sensitivity
  const { beatDetected, currentBPM, audioLevel, bassLevel, isAnalyzing } = useAudioBeatDetection(sensitivity, isListening);

  // Create mock values for mid and treble levels since we removed them
  const midLevel = bassLevel * 0.7; // Derive from bass level
  const trebleLevel = bassLevel * 0.5; // Derive from bass level

  const {
    flashAnimation,
    waveAnimation,
    burstAnimation,
    sustainedAnimation,
    triggerBeat
  } = useStrobeEffects(selectedEffect, screenBrightness, isListening);

  // Trigger beat effects when beat is detected
  useEffect(() => {
    if (beatDetected) {
      triggerBeat(bassLevel);
    }
  }, [beatDetected, bassLevel, triggerBeat]);

  const toggleListening = () => {
    if (!audioPermission) {
      requestAudioPermission();
      return;
    }

    const newState = !isListening;
    setIsListening(newState);
    setIsFullScreen(newState);
    StatusBar.setHidden(newState);

    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  };

  if (audioPermission === null) {
    return (
      <LinearGradient colors={['#0A0A0F', '#1A1A2E']} style={soundReactiveStyles.container}>
        <SafeAreaView style={soundReactiveStyles.safeArea}>
          <View style={soundReactiveStyles.loadingContainer}>
            <Text style={soundReactiveStyles.loadingText}>Checking permissions...</Text>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  if (isFullScreen) {
    const currentColor = { color: colorPalettes[selectedPalette].colors[0] };

    return (
      <View style={[StyleSheet.absoluteFillObject, { backgroundColor: 'black' }]}>
        <StatusBar hidden />
        <LinearGradient
          colors={['#000000', '#0A0A0F', '#000000']}
          style={[StyleSheet.absoluteFillObject, { zIndex: 0 }]}
        />

        <View style={[StyleSheet.absoluteFillObject, { zIndex: 1 }]}>
          <SoundReactiveEffects
            currentColor={currentColor}
            waveAnimation={waveAnimation}
            burstAnimation={burstAnimation}
            flashAnimation={flashAnimation}
            sustainedAnimation={sustainedAnimation}
          />
        </View>

        <View style={[StyleSheet.absoluteFillObject, { zIndex: 2 }]}>
          <View style={soundReactiveStyles.fullScreenContent}>
            <AudioVisualization
              bassLevel={bassLevel}
              midLevel={midLevel}
              trebleLevel={trebleLevel}
              beatDetected={beatDetected}
              currentBPM={currentBPM}
              colors={colorPalettes[selectedPalette].colors}
            />

            <TouchableOpacity
              style={soundReactiveStyles.backButton}
              onPress={toggleListening}
            >
              <ArrowLeft size={24} color="#FFF" />
              <Text style={soundReactiveStyles.backButtonText}>Exit</Text>
            </TouchableOpacity>

            {/* Show analysis status */}
            <View style={{
              position: 'absolute',
              bottom: 20,
              left: 20,
              right: 20,
            }}>
              {currentBPM > 0 && (
                <Text style={soundReactiveStyles.bpmText}>
                  {currentBPM} BPM
                </Text>
              )}
            </View>
          </View>
        </View>
      </View>
    );
  }

  return (
    <LinearGradient colors={['#0A0A0F', '#1A1A2E']} style={soundReactiveStyles.container}>
      <SafeAreaView style={soundReactiveStyles.safeArea} edges={['right', 'left', 'top']}>
        <View style={soundReactiveStyles.header}>
          <Text style={soundReactiveStyles.title}>Sound Reactive</Text>
          <Text style={soundReactiveStyles.subtitle}>Sync lights to music beats</Text>
        </View>

        <ScrollView style={{ flex: 1, padding: 20 }} showsVerticalScrollIndicator={false}>
          <View style={soundReactiveStyles.content}>
            <NeonContainer>
              <Text style={soundReactiveStyles.controlLabel}>Sensitivity</Text>
              <Slider
                style={soundReactiveStyles.slider}
                minimumValue={0.1}
                maximumValue={1.0}
                value={sensitivity}
                onValueChange={setSensitivity}
                minimumTrackTintColor={colorPalettes[selectedPalette].colors[0]}
                maximumTrackTintColor="#2A2A3A"
                thumbTintColor={colorPalettes[selectedPalette].colors[0]}
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
                onValueChange={setScreenBrightness}
                minimumTrackTintColor={colorPalettes[selectedPalette].colors[0]}
                maximumTrackTintColor="#2A2A3A"
                thumbTintColor={colorPalettes[selectedPalette].colors[0]}
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
                currentColor={{ color: colorPalettes[selectedPalette].colors[0] }}
                setSelectedEffect={setSelectedEffect}
              />
            </NeonContainer>
          </View>

          <View style={soundReactiveStyles.content}>
            <NeonContainer>
              <Text style={soundReactiveStyles.paletteTitle}>Color Palette</Text>
              <View style={soundReactiveStyles.paletteGrid}>
                {colorPalettes.map((palette, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setSelectedPalette(index)}
                    style={[
                      soundReactiveStyles.paletteItem,
                      selectedPalette === index && soundReactiveStyles.selectedPalette
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

          <View style={{ alignItems: 'center', marginTop: 10 }}>
            <GlowButton
              title={isListening ? "Stop Listening" : "Start Listening"}
              onPress={toggleListening}
              variant={isListening ? 'danger' : 'primary'}
              size="large"
              style={soundReactiveStyles.primaryButton}
            />
          </View>

          <View style={{ alignItems: 'center', marginTop: 10, height: 50 }}>
            <AnimatedWave
              color={colorPalettes[selectedPalette].colors[0]}
              intensity={audioLevel + 0.5} // Use actual audio level for wave intensity
            />
            
            <View style={{
              position: 'absolute',
              bottom: 0,
              left: 20,
              right: 20,
            }}>
              <AudioLevelBar
                audioLevel={audioLevel}
                color={colorPalettes[selectedPalette].colors[0]}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}