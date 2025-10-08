import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft } from 'lucide-react-native';
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SoundReactiveEffects } from '@/components/sound/SoundReactiveEffects';
import { AudioVisualization } from '@/components/sound/AudioVisualization';
import { soundReactiveStyles } from '@/components/styles/sound-reactive';

interface SoundReactiveFullScreenProps {
  paletteColors: string[];
  bassLevel: number;
  midLevel: number;
  trebleLevel: number;
  beatDetected: boolean;
  currentBPM: number;
  waveAnimation: any;
  burstAnimation: any;
  flashAnimation: any;
  sustainedAnimation: any;
  onExit: () => void;
}

export const SoundReactiveFullScreen = ({
  paletteColors,
  bassLevel,
  midLevel,
  trebleLevel,
  beatDetected,
  currentBPM,
  waveAnimation,
  burstAnimation,
  flashAnimation,
  sustainedAnimation,
  onExit,
}: SoundReactiveFullScreenProps) => {
  const primaryColor = paletteColors[0];
  const backgroundGradient: readonly [string, string, string] = ['#000000', '#0A0A0F', '#000000'];

  return (
    <View style={[StyleSheet.absoluteFillObject, { backgroundColor: 'black' }]}> 
      <StatusBar hidden />
      <LinearGradient colors={backgroundGradient} style={[StyleSheet.absoluteFillObject, { zIndex: 0 }]} />

      <View style={[StyleSheet.absoluteFillObject, { zIndex: 1 }]}>
        <SoundReactiveEffects
          currentColor={{ color: primaryColor }}
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
            colors={paletteColors}
          />

          <TouchableOpacity style={soundReactiveStyles.backButton} onPress={onExit}>
            <ArrowLeft size={24} color="#FFF" />
            <Text style={soundReactiveStyles.backButtonText}>Exit</Text>
          </TouchableOpacity>

          {currentBPM > 0 && (
            <View style={styles.bpmContainer}>
              <Text style={soundReactiveStyles.bpmText}>{currentBPM} BPM</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bpmContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
});
