import { useEffect, useState } from 'react';
import { StatusBar, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { soundReactiveStyles } from '@/components/styles/sound-reactive';
import { colorPalettes } from '@/constants/color';
import { useAudioPermissions } from '@/hooks/useAudioPermissions';
import { useAudioBeatDetection } from '@/hooks/useAudioAnalysis';
import { useStrobeEffects } from '@/hooks/useStrobeEffects';
import { ImpactStyles, triggerImpact } from '@/utils/haptics';
import { SoundReactiveFullScreen } from '@/components/sound/SoundReactiveFullScreen';
import { SoundReactiveControls } from '@/components/sound/SoundReactiveControls';

const gradientColors: readonly [string, string] = ['#0A0A0F', '#1A1A2E'];

export default function SoundReactiveScreen() {
  const [isListening, setIsListening] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [sensitivity, setSensitivity] = useState(0.5);
  const [screenBrightness, setScreenBrightness] = useState(0.8);
  const [selectedEffect, setSelectedEffect] = useState(0);
  const [selectedPalette, setSelectedPalette] = useState(0);

  const { audioPermission, requestAudioPermission } = useAudioPermissions();
  const { beatDetected, currentBPM, audioLevel, bassLevel } = useAudioBeatDetection(
    sensitivity,
    isListening,
  );

  const midLevel = bassLevel * 0.7;
  const trebleLevel = bassLevel * 0.5;

  const {
    flashAnimation,
    waveAnimation,
    burstAnimation,
    sustainedAnimation,
    triggerBeat,
  } = useStrobeEffects(selectedEffect, screenBrightness, isListening);

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

    const nextState = !isListening;
    setIsListening(nextState);
    setIsFullScreen(nextState);
    StatusBar.setHidden(nextState);
    triggerImpact(ImpactStyles.Medium);
  };

  if (audioPermission === null) {
    return (
      <LinearGradient colors={gradientColors} style={soundReactiveStyles.container}>
        <SafeAreaView style={soundReactiveStyles.safeArea}>
          <View style={soundReactiveStyles.loadingContainer}>
            <Text style={soundReactiveStyles.loadingText}>Checking permissions...</Text>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  const palette = colorPalettes[selectedPalette];

  if (isFullScreen) {
    return (
      <SoundReactiveFullScreen
        paletteColors={palette.colors}
        bassLevel={bassLevel}
        midLevel={midLevel}
        trebleLevel={trebleLevel}
        beatDetected={beatDetected}
        currentBPM={currentBPM}
        waveAnimation={waveAnimation}
        burstAnimation={burstAnimation}
        flashAnimation={flashAnimation}
        sustainedAnimation={sustainedAnimation}
        onExit={toggleListening}
      />
    );
  }

  return (
    <LinearGradient colors={gradientColors} style={soundReactiveStyles.container}>
      <SafeAreaView style={soundReactiveStyles.safeArea} edges={['right', 'left', 'top']}>
        <View style={soundReactiveStyles.header}>
          <Text style={soundReactiveStyles.title}>Sound Reactive</Text>
          <Text style={soundReactiveStyles.subtitle}>Sync lights to music beats</Text>
        </View>

        <SoundReactiveControls
          sensitivity={sensitivity}
          onSensitivityChange={setSensitivity}
          screenBrightness={screenBrightness}
          onBrightnessChange={setScreenBrightness}
          selectedEffect={selectedEffect}
          onSelectEffect={setSelectedEffect}
          selectedPalette={selectedPalette}
          onSelectPalette={setSelectedPalette}
          paletteOptions={colorPalettes}
          isListening={isListening}
          onToggleListening={toggleListening}
          audioLevel={audioLevel}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}
