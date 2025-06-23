import React, { useRef, useState } from 'react';
import { Animated, ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Slider from '@react-native-community/slider';
import GlowButton from '@/components/shared/GlowButton';
import NeonContainer from '@/components/shared/NeonContainer';
import { Hand, Timer, Zap } from 'lucide-react-native';
import { manualStyles } from '@/components/styles/manual';
import { strobeColors } from '@/constants/color';

export default function ManualStrobeScreen() {
  const [isStrobing, setIsStrobing] = useState(false);
  const [flashlightEnabled, setFlashlightEnabled] = useState(true);
  const [strobeSpeed, setStrobeSpeed] = useState(0.5);
  const [selectedColor, setSelectedColor] = useState(0);
  const [timerEnabled, setTimerEnabled] = useState(false);
  const [timerMinutes, setTimerMinutes] = useState(5);
  const [isManualMode, setIsManualMode] = useState(false);

  const flashAnimation = useRef(new Animated.Value(0)).current;
  const strobeInterval = useRef<NodeJS.Timeout | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startStrobe = () => {
    setIsStrobing(true);

    if (!isManualMode) {
      const interval = Math.max(50, 1000 - (strobeSpeed * 950)); // 50ms to 1000ms

      strobeInterval.current = setInterval(() => {
        // Flash animation
        Animated.sequence([Animated.timing(flashAnimation, {
          toValue: 1, duration: 50, useNativeDriver: false
        }), Animated.timing(flashAnimation, {
          toValue: 0, duration: 50, useNativeDriver: false
        })]).start();
      }, interval) as unknown as NodeJS.Timeout;
    }

    // Auto-stop timer
    if (timerEnabled) {
      timerRef.current = setTimeout(() => {
        stopStrobe();
      }, timerMinutes * 60 * 1000) as unknown as NodeJS.Timeout;
    }
  };

  const stopStrobe = () => {
    setIsStrobing(false);

    if (strobeInterval.current) {
      clearInterval(strobeInterval.current);
      strobeInterval.current = null;
    }

    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    // Reset flash animation
    flashAnimation.setValue(0);
  };

  const handleManualFlash = () => {
    if (!isStrobing || !isManualMode) return;

    Animated.sequence([Animated.timing(flashAnimation, {
      toValue: 1, duration: 100, useNativeDriver: false
    }), Animated.timing(flashAnimation, {
      toValue: 0, duration: 100, useNativeDriver: false
    })]).start();
  };

  const toggleMode = () => {
    if (isStrobing) {
      stopStrobe();
    }

    setIsManualMode(!isManualMode);
  };

  const goToFullscreen = () => {
    router.push('/strobe');
  };

  const flashOpacity = flashAnimation.interpolate({
    inputRange: [0, 1], outputRange: [0, 0.9]
  });

  return (<LinearGradient colors={['#0A0A0F', '#1A1A2E']} style={manualStyles.container}>
    <SafeAreaView style={manualStyles.safeArea} edges={['right', 'left', 'top']}>
      {/* Flash Overlay */}
      <Animated.View
        style={[manualStyles.flashOverlay, {
          opacity: flashOpacity, backgroundColor: strobeColors[selectedColor].color
        }]}
        pointerEvents="none"
      />

      <View style={manualStyles.header}>
        <Text style={manualStyles.title}>Manual Strobe</Text>
        <Text style={manualStyles.subtitle}>Control your flash intensity</Text>
      </View>

      <ScrollView>
        <View style={manualStyles.content}>
          <NeonContainer style={manualStyles.modeContainer}>
            <Text style={manualStyles.modeTitle}>Strobe Mode</Text>
            <View style={manualStyles.modeToggle}>
              <View style={manualStyles.modeOption}>
                <Zap size={20} color={!isManualMode ? '#06FFA5' : '#64748B'} />
                <Text style={[manualStyles.modeText, !isManualMode && manualStyles.activeModeText]}>
                  Auto
                </Text>
              </View>

              <Switch
                value={isManualMode}
                onValueChange={toggleMode}
                trackColor={{ false: '#06FFA5', true: '#F59E0B' }}
                thumbColor="#FFFFFF"
              />

              <View style={manualStyles.modeOption}>
                <Hand size={20} color={isManualMode ? '#F59E0B' : '#64748B'} />
                <Text style={[manualStyles.modeText, isManualMode && manualStyles.activeModeText]}>
                  Manual
                </Text>
              </View>
            </View>
          </NeonContainer>

          {!isManualMode && (<NeonContainer style={manualStyles.speedContainer}>
            <Text style={manualStyles.speedLabel}>
              Strobe Speed: {Math.round(strobeSpeed * 100)}%
            </Text>
            <Slider
              style={manualStyles.slider}
              minimumValue={0.1}
              maximumValue={1.0}
              value={strobeSpeed}
              onValueChange={setStrobeSpeed}
              minimumTrackTintColor="#06FFA5"
              maximumTrackTintColor="#64748B"
              // thumbStyle={{ backgroundColor: '#06FFA5' }}
              disabled={isStrobing}
            />
            <View style={manualStyles.speedLabels}>
              <Text style={manualStyles.speedLabel}>Slow</Text>
              <Text style={manualStyles.speedLabel}>Intense</Text>
            </View>
          </NeonContainer>)}

          <NeonContainer style={manualStyles.colorContainer}>
            <Text style={manualStyles.colorTitle}>Flash Color</Text>
            <View style={manualStyles.colorGrid}>
              {strobeColors.map((color, index) => (<TouchableOpacity
                key={index}
                onPress={() => setSelectedColor(index)}
                style={[manualStyles.colorItem, { backgroundColor: color.color }, selectedColor === index && manualStyles.selectedColor]}>
                {selectedColor === index && (<Text style={manualStyles.colorCheck}>✓</Text>)}
              </TouchableOpacity>))}
            </View>
          </NeonContainer>

          <NeonContainer style={manualStyles.timerContainer}>
            <View style={manualStyles.timerHeader}>
              <Timer size={20} color="#F59E0B" />
              <Text style={manualStyles.timerTitle}>Auto-Stop Timer</Text>
              <Switch
                value={timerEnabled}
                onValueChange={setTimerEnabled}
                trackColor={{ false: '#64748B', true: '#F59E0B' }}
                thumbColor="#FFFFFF"
              />
            </View>

            {timerEnabled && (<View style={manualStyles.timerControls}>
              <Text style={manualStyles.timerLabel}>Duration: {timerMinutes} minutes</Text>
              <Slider
                style={manualStyles.slider}
                minimumValue={1}
                maximumValue={30}
                step={1}
                value={timerMinutes}
                onValueChange={setTimerMinutes}
                minimumTrackTintColor="#F59E0B"
                maximumTrackTintColor="#64748B"
              // thumbStyle={{ backgroundColor: '#F59E0B' }}
              />
            </View>)}
          </NeonContainer>

          <View style={manualStyles.controlButtons}>
            {isManualMode && isStrobing && (<TouchableOpacity
              onPress={handleManualFlash}
              style={manualStyles.tapToFlashButton}
              activeOpacity={0.6}>
              <LinearGradient
                colors={['#F59E0B', '#F97316']}
                style={manualStyles.tapGradient}>
                <Text style={manualStyles.tapToFlashText}>TAP TO FLASH</Text>
                <Hand size={24} color="#FFFFFF" />
              </LinearGradient>
            </TouchableOpacity>)}

            <GlowButton
              title="Fullscreen Mode"
              onPress={goToFullscreen}
              variant="secondary"
              size="large"
              style={manualStyles.fullscreenButton}
            />

            <GlowButton
              title={isStrobing ? 'Stop Strobe' : 'Start Strobe'}
              onPress={isStrobing ? stopStrobe : startStrobe}
              variant={isStrobing ? 'danger' : 'primary'}
              size="large"
              style={manualStyles.primaryButton}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  </LinearGradient>);
}