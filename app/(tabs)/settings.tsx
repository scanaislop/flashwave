import { useCallback, useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { AlertTriangle, Info, MessageSquare, Shield } from 'lucide-react-native';
import { settingsStyles } from '@/components/styles/settings';
import { SettingSection } from '@/components/settings/SettingSection';
import { SettingSwitchRow } from '@/components/settings/SettingSwitchRow';
import { SettingSliderRow } from '@/components/settings/SettingSliderRow';
import { SupportLink } from '@/components/settings/SupportLink';
import { ImpactStyles, triggerImpact } from '@/utils/haptics';

const gradientColors: readonly [string, string] = ['#0A0A0F', '#1A1A2E'];

export default function SettingsScreen() {
  const [flashlightDefault, setFlashlightDefault] = useState(true);
  const [safetyTimerEnabled, setSafetyTimerEnabled] = useState(true);
  const [safetyTimer, setSafetyTimer] = useState(15);
  const [lowBatteryMode, setLowBatteryMode] = useState(false);
  const [hapticFeedback, setHapticFeedback] = useState(true);
  const [keepScreenOn, setKeepScreenOn] = useState(true);

  const handleSwitch = useCallback(<T extends boolean>(setter: (value: T) => void) => {
    return (value: T) => {
      triggerImpact(ImpactStyles.Light);
      setter(value);
    };
  }, []);

  const handleTimerChange = (value: number) => {
    triggerImpact(ImpactStyles.Light);
    setSafetyTimer(value);
  };

  const sendFeedback = () => {
    triggerImpact(ImpactStyles.Medium);
    Alert.alert('Send Feedback', 'Would you like to send feedback about Flashwave?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Send Email', onPress: () => {} },
    ]);
  };

  const showAppInfo = () => {
    triggerImpact(ImpactStyles.Light);
    Alert.alert(
      'Flashwave v1.0.0',
      'The ultimate party light show app. Transform your phone into a synchronized light controller for epic events.\n\nMade with ❤️ for party lovers everywhere.',
    );
  };

  const viewDisclaimer = () => {
    triggerImpact(ImpactStyles.Light);
    router.push('/disclaimer' as never);
  };

  return (
    <LinearGradient colors={gradientColors} style={settingsStyles.container}>
      <SafeAreaView style={settingsStyles.safeArea} edges={['right', 'left', 'top']}>
        <View style={settingsStyles.header}>
          <Text style={settingsStyles.title}>Settings</Text>
          <Text style={settingsStyles.subtitle}>Customize your experience</Text>
        </View>

        <ScrollView style={settingsStyles.content} showsVerticalScrollIndicator={false}>
          <SettingSection title="Default Settings">
            <SettingSwitchRow
              label="Flashlight Default"
              value={flashlightDefault}
              onChange={handleSwitch(setFlashlightDefault)}
              description="Enable flashlight by default when starting modes"
              trackColor={{ false: '#64748B', true: '#8B5CF6' }}
            />
          </SettingSection>

          <SettingSection title="Safety" icon={<Shield size={20} color="#F59E0B" />} glowColor="#F59E0B">
            <SettingSwitchRow
              label="Auto-Stop Timer"
              value={safetyTimerEnabled}
              onChange={handleSwitch(setSafetyTimerEnabled)}
              description="Automatically stop light shows to prevent eye strain and save battery"
              trackColor={{ false: '#64748B', true: '#F59E0B' }}
            />

            {safetyTimerEnabled && (
              <SettingSliderRow
                label={`Timer Duration: ${safetyTimer} minutes`}
                value={safetyTimer}
                onChange={handleTimerChange}
                minLabel="5 min"
                maxLabel="60 min"
                minimumValue={5}
                maximumValue={60}
                step={5}
                trackColor="#F59E0B"
              />
            )}

            <SettingSwitchRow
              label="Low Battery Mode"
              value={lowBatteryMode}
              onChange={handleSwitch(setLowBatteryMode)}
              description="Reduce effects intensity when battery is below 20%"
              trackColor={{ false: '#64748B', true: '#F59E0B' }}
            />

            <SupportLink
              icon={<AlertTriangle size={20} color="#F59E0B" />}
              title="View Safety Disclaimer"
              description="Review important photosensitivity warnings"
              onPress={viewDisclaimer}
            />
          </SettingSection>

          <SettingSection title="Experience">
            <SettingSwitchRow
              label="Haptic Feedback"
              value={hapticFeedback}
              onChange={handleSwitch(setHapticFeedback)}
              description="Feel the beat with vibration feedback"
              trackColor={{ false: '#64748B', true: '#06FFA5' }}
            />

            <SettingSwitchRow
              label="Keep Screen On"
              value={keepScreenOn}
              onChange={handleSwitch(setKeepScreenOn)}
              description="Prevent screen from dimming during light shows"
              trackColor={{ false: '#64748B', true: '#06FFA5' }}
            />
          </SettingSection>

          <SettingSection title="Support" variant="subtle">
            <SupportLink
              icon={<MessageSquare size={20} color="#8B5CF6" />}
              title="Send Feedback"
              description="Help us improve Flashwave"
              onPress={sendFeedback}
            />

            <SupportLink
              icon={<Info size={20} color="#06FFA5" />}
              title="App Info"
              description="Version and credits"
              onPress={showAppInfo}
            />
          </SettingSection>

          <View style={settingsStyles.footer}>
            <Text style={settingsStyles.footerText}>Flashwave v1.0.0</Text>
            <Text style={settingsStyles.footerSubtext}>Made for party enthusiasts 🎉</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
