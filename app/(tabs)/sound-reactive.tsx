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
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Animated, ColorValue, Dimensions, Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SoundReactiveEffects } from '@/components/SoundReactiveEffects';

export default function SoundReactiveScreen() {
  const [isListening, setIsListening] = useState(false);
  const [sensitivity, setSensitivity] = useState(0.7);
  const [selectedPalette, setSelectedPalette] = useState(0);
  const [selectedEffect, setSelectedEffect] = useState(0);
  const [screenBrightness, setScreenBrightness] = useState(0.8);
  const [currentBPM, setCurrentBPM] = useState(0);
  const [audioPermission, setAudioPermission] = useState<boolean | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Animation values for strobing effect
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const waveAnimation = useRef(new Animated.Value(0)).current;
  const burstAnimation = useRef(new Animated.Value(0)).current;
  const flashAnimation = useRef(new Animated.Value(0)).current;
  const sustainedAnimation = useRef(new Animated.Value(0)).current;
  const { width, height } = Dimensions.get('window');

  // Reference for animation intervals
  const strobeInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const waveLoopRef = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    checkAudioPermissions();
  }, []);

  const checkAudioPermissions = async () => {
    if (Platform.OS === 'web') {
      // Web audio permissions are handled differently
      setAudioPermission(true);
      return;
    }
    // For mobile, you would check microphone permissions here
    setAudioPermission(true);
  };

  const requestAudioPermission = async () => {
    if (Platform.OS === 'web') {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        setAudioPermission(true);
      } catch (error) {
        Alert.alert('Permission Denied', 'Microphone access is required for sound reactive mode.');
      }
    }
  };

  const toggleListening = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }

    if (!audioPermission) {
      requestAudioPermission();
      return;
    }

    const newListeningState = !isListening;
    setIsListening(newListeningState);
    setIsFullScreen(newListeningState);

    if (newListeningState) {
      // Start audio analysis and strobing effects
      simulateBPMDetection();
      startStrobeEffect();
    } else {
      // Stop any animations
      fadeAnim.stopAnimation();
      scaleAnim.stopAnimation();
    }
  };

  const stopListening = () => {
    setIsListening(false);
    setIsFullScreen(false);
    StatusBar.setHidden(false);
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }

    // Stop all animations
    if (strobeInterval.current) {
      clearInterval(strobeInterval.current);
      strobeInterval.current = null;
    }
    if (waveLoopRef.current) {
      waveLoopRef.current.stop();
      waveLoopRef.current = null;
    }

    // Reset animation values
    flashAnimation.setValue(0);
    burstAnimation.setValue(0);
    sustainedAnimation.setValue(0);
  };

  const startStrobeEffect = () => {
    if (strobeInterval.current) {
      clearInterval(strobeInterval.current);
    }

    // Base interval adjusted by sensitivity (higher sensitivity = faster strobing)
    const baseInterval = Math.max(50, 1000 - (sensitivity * 950));
    let flashCount = 0;

    strobeInterval.current = setInterval(() => {
      flashCount++;
      // Use the selected effect type to determine the animation
      switch (selectedEffect) {
        case 0: // Pulse
          createPulseEffect();
          break;
        case 1: // Wave
          createWaveEffect(flashCount);
          break;
        case 2: // Burst
          createBurstEffect();
          break;
        case 3: // Fade
          createFadeEffect();
          break;
      }
    }, baseInterval);
  };

  const createPulseEffect = () => {
    Animated.sequence([
      Animated.timing(flashAnimation, {
        toValue: screenBrightness,
        duration: 40,
        useNativeDriver: false
      }),
      Animated.timing(flashAnimation, {
        toValue: 0,
        duration: 80,
        useNativeDriver: false
      })
    ]).start();
  };

  const createWaveEffect = (count: number) => {
    const intensity = 0.5 + (screenBrightness * 0.5) + ((count % 4) * 0.1);
    Animated.sequence([
      Animated.timing(flashAnimation, {
        toValue: intensity,
        duration: 60,
        useNativeDriver: false
      }),
      Animated.timing(flashAnimation, {
        toValue: 0,
        duration: 120,
        useNativeDriver: false
      })
    ]).start();
  };

  const createBurstEffect = () => {
    Animated.sequence([
      Animated.timing(flashAnimation, {
        toValue: screenBrightness,
        duration: 30,
        useNativeDriver: false
      }),
      Animated.timing(flashAnimation, {
        toValue: 0,
        duration: 30,
        useNativeDriver: false
      }),
      Animated.timing(flashAnimation, {
        toValue: screenBrightness * 0.8,
        duration: 30,
        useNativeDriver: false
      }),
      Animated.timing(flashAnimation, {
        toValue: 0,
        duration: 30,
        useNativeDriver: false
      }),
      Animated.timing(flashAnimation, {
        toValue: screenBrightness * 0.6,
        duration: 30,
        useNativeDriver: false
      }),
      Animated.timing(flashAnimation, {
        toValue: 0,
        duration: 60,
        useNativeDriver: false
      })
    ]).start();

    Animated.sequence([
      Animated.timing(burstAnimation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false
      }),
      Animated.timing(burstAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false
      })
    ]).start();
  };

  const createFadeEffect = () => {
    Animated.sequence([
      Animated.timing(flashAnimation, {
        toValue: screenBrightness * 0.9,
        duration: 100,
        useNativeDriver: false
      }),
      Animated.timing(flashAnimation, {
        toValue: screenBrightness * 0.3,
        duration: 200,
        useNativeDriver: false
      }),
      Animated.timing(flashAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false
      })
    ]).start();
  };

  // Effect to update strobing when settings change
  useEffect(() => {
    if (isListening) {
      startStrobeEffect();
    }
  }, [selectedEffect, screenBrightness, sensitivity, selectedPalette]);

  // Simulate BPM detection for demonstration purposes
  const simulateBPMDetection = () => {
    return setInterval(() => {
      const randomBPM = Math.floor(Math.random() * 50) + 90;
      setCurrentBPM(randomBPM);
    }, 2000);
  };

  // Cleanup effect when component unmounts
  useEffect(() => {
    let bpmInterval: ReturnType<typeof setInterval> | null = null;

    if (isListening) {
      bpmInterval = simulateBPMDetection();
    }

    return () => {
      if (bpmInterval) clearInterval(bpmInterval);
      fadeAnim.stopAnimation();
      scaleAnim.stopAnimation();
    };
  }, [isListening]);



  if (audioPermission === null) {
    return (<LinearGradient colors={['#0A0A0F', '#1A1A2E']} style={soundReactiveStyles.container}>
      <SafeAreaView style={soundReactiveStyles.safeArea}>
        <View style={soundReactiveStyles.loadingContainer}>
          <Text style={soundReactiveStyles.loadingText}>Checking permissions...</Text>
        </View>
      </SafeAreaView>
    </LinearGradient>);
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

        {/* Visual Effects Layer */}
        <View style={[StyleSheet.absoluteFillObject, { zIndex: 1 }]}>
          <SoundReactiveEffects
            currentColor={currentColor}
            waveAnimation={waveAnimation}
            burstAnimation={burstAnimation}
            flashAnimation={flashAnimation}
            sustainedAnimation={sustainedAnimation}
          />
        </View>

        {/* UI Controls Layer */}
        <View style={[StyleSheet.absoluteFillObject, { zIndex: 2 }]}>
          <View style={soundReactiveStyles.fullScreenContent}>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 48, fontFamily: 'Orbitron-Bold', color: '#FFFFFF' }}>{currentBPM}</Text>
              <Text style={{ fontSize: 16, fontFamily: 'Rajdhani-Bold', color: '#06FFA5' }}>BPM</Text>
            </View>

            <TouchableOpacity
              style={soundReactiveStyles.backButton}
              onPress={stopListening}
            >
              <ArrowLeft size={24} color="#FFF" />
              <Text style={soundReactiveStyles.backButtonText}>Exit</Text>
            </TouchableOpacity>
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
                minimumValue={0}
                maximumValue={1}
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
                {colorPalettes.map((palette, index) => (<TouchableOpacity
                  key={index}
                  onPress={() => setSelectedPalette(index)}
                  style={[soundReactiveStyles.paletteItem, selectedPalette === index && soundReactiveStyles.selectedPalette]}>
                  <LinearGradient
                    colors={palette.colors as unknown as [ColorValue, ColorValue, ...ColorValue[]]}
                    style={soundReactiveStyles.paletteGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  />
                  <Text style={soundReactiveStyles.paletteName}>{palette.name}</Text>
                </TouchableOpacity>))}
              </View>
            </NeonContainer>
          </View>
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <GlowButton
              title={isListening ? "Stop" : "Start Listening"}
              onPress={toggleListening}
              variant={isListening ? 'danger' : 'primary'}
              size="large"
              style={soundReactiveStyles.primaryButton}
            />
          </View>

          <View style={{ alignItems: 'center', marginTop: 20, height: 100 }}>
            <AnimatedWave
              color={colorPalettes[selectedPalette].colors[0]}
              intensity={1.2}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}