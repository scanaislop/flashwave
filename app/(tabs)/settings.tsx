import NeonContainer from '@/components/shared/NeonContainer';
import { useTheme } from '@/context/ThemeContext';
import { settingsStyles } from '@/components/styles/settings';
import Slider from '@react-native-community/slider';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { AlertTriangle, Info, MessageSquare, Moon, Shield, Smartphone, Sun } from 'lucide-react-native';
import React, { useState } from 'react';
import { Alert, Platform, ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen() {
  const { colors } = useTheme();
  const [defaultMode, setDefaultMode] = useState('sound-reactive');
  const [flashlightDefault, setFlashlightDefault] = useState(true);
  const [safetyTimer, setSafetyTimer] = useState(15);
  const [safetyTimerEnabled, setSafetyTimerEnabled] = useState(true);
  const [hapticFeedback, setHapticFeedback] = useState(true);
  const [keepScreenOn, setKeepScreenOn] = useState(true);
  const [lowBatteryMode, setLowBatteryMode] = useState(false);

  const handleModeChange = (mode: string) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setDefaultMode(mode);
  };

  const sendFeedback = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    Alert.alert('Send Feedback', 'Would you like to send feedback about Flashwave?', [{
      text: 'Cancel',
      style: 'cancel'
    }, {
      text: 'Send Email', onPress: () => {
      }
    }]);
  };

  const showAppInfo = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    Alert.alert('Flashwave v1.0.0', 'The ultimate party light show app. Transform your phone into a synchronized light controller for epic events.\n\nMade with ❤️ for party lovers everywhere.', [{ text: 'OK' }]);
  };

  return (<LinearGradient colors={['#0A0A0F', '#1A1A2E']} style={settingsStyles.container}>
      <SafeAreaView style={settingsStyles.safeArea} edges={['right', 'left', 'top']}>
        <View style={settingsStyles.header}>
          <Text style={settingsStyles.title}>Settings</Text>
          <Text style={settingsStyles.subtitle}>Customize your experience</Text>
        </View>

        <ScrollView style={settingsStyles.content} showsVerticalScrollIndicator={false}>

          <NeonContainer style={settingsStyles.section}>
            <Text style={settingsStyles.sectionTitle}>Default Settings</Text>

            <View style={settingsStyles.settingItem}>
              <View style={settingsStyles.settingRow}>
                <Text style={settingsStyles.settingLabel}>Flashlight Default</Text>
                <Switch
                  value={flashlightDefault}
                  onValueChange={setFlashlightDefault}
                  trackColor={{ false: '#64748B', true: '#8B5CF6' }}
                  thumbColor="#FFFFFF"
                />
              </View>
              <Text style={settingsStyles.settingDescription}>
                Enable flashlight by default when starting modes
              </Text>
            </View>
          </NeonContainer>

          {/* Safety */}
          <NeonContainer style={settingsStyles.section} glowColor="#F59E0B">
            <View style={settingsStyles.sectionHeader}>
              <Shield size={20} color="#F59E0B" />
              <Text style={settingsStyles.sectionTitle}>Safety</Text>
            </View>

            <View style={settingsStyles.settingItem}>
              <View style={settingsStyles.settingRow}>
                <Text style={settingsStyles.settingLabel}>Auto-Stop Timer</Text>
                <Switch
                  value={safetyTimerEnabled}
                  onValueChange={setSafetyTimerEnabled}
                  trackColor={{ false: '#64748B', true: '#F59E0B' }}
                  thumbColor="#FFFFFF"
                />
              </View>
              <Text style={settingsStyles.settingDescription}>
                Automatically stop light shows to prevent eye strain and save battery
              </Text>
            </View>

            {safetyTimerEnabled && (<View style={settingsStyles.settingItem}>
                <Text style={settingsStyles.settingLabel}>
                  Timer Duration: {safetyTimer} minutes
                </Text>
                <Slider
                  style={settingsStyles.slider}
                  minimumValue={5}
                  maximumValue={60}
                  step={5}
                  value={safetyTimer}
                  onValueChange={setSafetyTimer}
                  minimumTrackTintColor="#F59E0B"
                  maximumTrackTintColor="#64748B"
                  // thumbStyle={{ backgroundColor: '#F59E0B' }}
                />
                <View style={settingsStyles.sliderLabels}>
                  <Text style={settingsStyles.sliderLabel}>5 min</Text>
                  <Text style={settingsStyles.sliderLabel}>60 min</Text>
                </View>
              </View>)}

            <View style={settingsStyles.settingItem}>
              <View style={settingsStyles.settingRow}>
                <Text style={settingsStyles.settingLabel}>Low Battery Mode</Text>
                <Switch
                  value={lowBatteryMode}
                  onValueChange={setLowBatteryMode}
                  trackColor={{ false: '#64748B', true: '#F59E0B' }}
                  thumbColor="#FFFFFF"
                />
              </View>
              <Text style={settingsStyles.settingDescription}>
                Reduce effects intensity when battery is below 20%
              </Text>
            </View>

            <TouchableOpacity 
              onPress={() => router.push('/disclaimer')} 
              style={settingsStyles.supportItem}>
              <AlertTriangle size={20} color="#F59E0B" />
              <View style={settingsStyles.supportText}>
                <Text style={settingsStyles.supportTitle}>View Safety Disclaimer</Text>
                <Text style={settingsStyles.supportDescription}>
                  Review important photosensitivity warnings
                </Text>
              </View>
            </TouchableOpacity>
          </NeonContainer>

          {/* Experience */}
          <NeonContainer style={settingsStyles.section}>
            <Text style={settingsStyles.sectionTitle}>Experience</Text>

            <View style={settingsStyles.settingItem}>
              <View style={settingsStyles.settingRow}>
                <Text style={settingsStyles.settingLabel}>Haptic Feedback</Text>
                <Switch
                  value={hapticFeedback}
                  onValueChange={setHapticFeedback}
                  trackColor={{ false: '#64748B', true: '#06FFA5' }}
                  thumbColor="#FFFFFF"
                />
              </View>
              <Text style={settingsStyles.settingDescription}>
                Feel the beat with vibration feedback
              </Text>
            </View>

            <View style={settingsStyles.settingItem}>
              <View style={settingsStyles.settingRow}>
                <Text style={settingsStyles.settingLabel}>Keep Screen On</Text>
                <Switch
                  value={keepScreenOn}
                  onValueChange={setKeepScreenOn}
                  trackColor={{ false: '#64748B', true: '#06FFA5' }}
                  thumbColor="#FFFFFF"
                />
              </View>
              <Text style={settingsStyles.settingDescription}>
                Prevent screen from dimming during light shows
              </Text>
            </View>
          </NeonContainer>

          {/* Support */}
          <NeonContainer style={settingsStyles.section} variant="subtle">
            <Text style={settingsStyles.sectionTitle}>Support</Text>

            <TouchableOpacity onPress={sendFeedback} style={settingsStyles.supportItem}>
              <MessageSquare size={20} color="#8B5CF6" />
              <View style={settingsStyles.supportText}>
                <Text style={settingsStyles.supportTitle}>Send Feedback</Text>
                <Text style={settingsStyles.supportDescription}>
                  Help us improve Flashwave
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={showAppInfo} style={settingsStyles.supportItem}>
              <Info size={20} color="#06FFA5" />
              <View style={settingsStyles.supportText}>
                <Text style={settingsStyles.supportTitle}>App Info</Text>
                <Text style={settingsStyles.supportDescription}>
                  Version and credits
                </Text>
              </View>
            </TouchableOpacity>
          </NeonContainer>

          <View style={settingsStyles.footer}>
            <Text style={settingsStyles.footerText}>
              Flashwave v1.0.0
            </Text>
            <Text style={settingsStyles.footerSubtext}>
              Made for party enthusiasts 🎉
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>);
}