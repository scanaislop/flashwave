import React, { useEffect, useState } from 'react';
import { Alert, ColorValue, Platform, Switch, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Slider from '@react-native-community/slider';
import GlowButton from '@/components/shared/GlowButton';
import NeonContainer from '@/components/shared/NeonContainer';
import AnimatedWave from '@/components/shared/AnimatedWave';
import { Flashlight, FlashlightOff, Sun, SunDim } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { soundReactiveStyles } from '@/components/styles/sound-reactive';
import { colorPalettes } from '@/constants/color';

export default function SoundReactiveScreen() {
  const [isListening, setIsListening] = useState(false);
  const [flashlightEnabled, setFlashlightEnabled] = useState(true);
  const [screenLightEnabled, setScreenLightEnabled] = useState(true);
  const [sensitivity, setSensitivity] = useState(0.7);
  const [selectedPalette, setSelectedPalette] = useState(0);
  const [currentBPM, setCurrentBPM] = useState(0);
  const [audioPermission, setAudioPermission] = useState<boolean | null>(null);

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

    setIsListening(!isListening);
    if (!isListening) {
      // Start audio analysis
      simulateBPMDetection();
    }
  };

  const simulateBPMDetection = () => {
    // Simulate BPM detection for demo
    const interval = setInterval(() => {
      setCurrentBPM(Math.floor(Math.random() * 40) + 120); // 120-160 BPM
    }, 2000);

    setTimeout(() => clearInterval(interval), 10000);
  };

  const toggleFlashlight = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setFlashlightEnabled(!flashlightEnabled);
  };

  const toggleScreenLight = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setScreenLightEnabled(!screenLightEnabled);
  };

  if (audioPermission === null) {
    return (<LinearGradient colors={['#0A0A0F', '#1A1A2E']} style={soundReactiveStyles.container}>
        <SafeAreaView style={soundReactiveStyles.safeArea}>
          <View style={soundReactiveStyles.loadingContainer}>
            <Text style={soundReactiveStyles.loadingText}>Checking permissions...</Text>
          </View>
        </SafeAreaView>
      </LinearGradient>);
  }

  return (<LinearGradient colors={['#0A0A0F', '#1A1A2E']} style={soundReactiveStyles.container}>
      <SafeAreaView style={soundReactiveStyles.safeArea} edges={['right', 'left', 'top']}>
        <View style={soundReactiveStyles.header}>
          <Text style={soundReactiveStyles.title}>Sound Reactive</Text>
          <Text style={soundReactiveStyles.subtitle}>Sync lights to music beats</Text>
        </View>

        <View style={soundReactiveStyles.content}>
          <View style={soundReactiveStyles.visualizerSection}>
            <AnimatedWave
              color={colorPalettes[selectedPalette].colors[0]}
              intensity={isListening ? sensitivity * 2 : 0.5}
            />

            {isListening && currentBPM > 0 && (<NeonContainer style={soundReactiveStyles.bpmContainer}>
                <Text style={soundReactiveStyles.bpmLabel}>BPM DETECTED</Text>
                <Text style={soundReactiveStyles.bpmValue}>{currentBPM}</Text>
              </NeonContainer>)}
          </View>

          <NeonContainer style={soundReactiveStyles.controlsContainer}>
            <View style={soundReactiveStyles.toggleRow}>
              <View style={soundReactiveStyles.toggleItem}>
                {flashlightEnabled ? <Flashlight size={20} color="#06FFA5" /> : <FlashlightOff size={20} color="#64748B" />}
                <Text style={soundReactiveStyles.toggleLabel} onPress={toggleFlashlight}>Flashlight</Text>
                <Switch
                  value={flashlightEnabled}
                  onValueChange={toggleFlashlight}
                  trackColor={{ false: '#64748B', true: '#06FFA5' }}
                  thumbColor="#FFFFFF"
                />
              </View>

              <View style={soundReactiveStyles.toggleItem}>
                {screenLightEnabled ? <Sun size={20} color="#8B5CF6" /> : <SunDim size={20} color="#64748B" />}
                <Text style={soundReactiveStyles.toggleLabel} onPress={toggleScreenLight}>Screen Light</Text>
                <Switch
                  value={screenLightEnabled}
                  onValueChange={toggleScreenLight}
                  trackColor={{ false: '#64748B', true: '#8B5CF6' }}
                  thumbColor="#FFFFFF"
                />
              </View>
            </View>

            <View style={soundReactiveStyles.sliderContainer}>
              <Text style={soundReactiveStyles.sliderLabel}>Sensitivity: {Math.round(sensitivity * 100)}%</Text>
              <Slider
                style={soundReactiveStyles.slider}
                minimumValue={0.1}
                maximumValue={1.0}
                value={sensitivity}
                onValueChange={setSensitivity}
                minimumTrackTintColor="#06FFA5"
                maximumTrackTintColor="#64748B"
                // thumbStyle={{ backgroundColor: '#06FFA5' }}
              />
            </View>
          </NeonContainer>

          <NeonContainer style={soundReactiveStyles.paletteContainer}>
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

          <GlowButton
            title={isListening ? 'Stop Listening' : 'Start Listening'}
            onPress={toggleListening}
            variant={isListening ? 'danger' : 'primary'}
            size="large"
            style={soundReactiveStyles.primaryButton}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>);
}
