import { Animated, ScrollView, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { manualStyles } from '@/components/styles/manual';
import { strobeColors } from '@/constants/color';
import { useManualStrobe } from '@/hooks/useManualStrobe';
import { ManualModeToggle } from '@/components/manual/ManualModeToggle';
import { ManualSpeedControl } from '@/components/manual/ManualSpeedControl';
import { ManualColorPicker } from '@/components/manual/ManualColorPicker';
import { ManualTimerSettings } from '@/components/manual/ManualTimerSettings';
import { ManualActionButtons } from '@/components/manual/ManualActionButtons';

const gradientColors: readonly [string, string] = ['#0A0A0F', '#1A1A2E'];

export default function ManualStrobeScreen() {
  const {
    isStrobing,
    isManualMode,
    strobeSpeed,
    selectedColor,
    timerEnabled,
    timerMinutes,
    flashOpacity,
    setStrobeSpeed,
    setSelectedColor,
    setTimerEnabled,
    setTimerMinutes,
    toggleMode,
    startStrobe,
    stopStrobe,
    handleManualFlash,
  } = useManualStrobe();

  const goToFullscreen = () => router.push('/strobe');
  const toggleStrobe = () => (isStrobing ? stopStrobe() : startStrobe());

  return (
    <LinearGradient colors={gradientColors} style={manualStyles.container}>
      <SafeAreaView style={manualStyles.safeArea} edges={['right', 'left', 'top']}>
        <Animated.View
          style={[
            manualStyles.flashOverlay,
            {
              opacity: flashOpacity,
              backgroundColor: strobeColors[selectedColor].color,
            },
          ]}
          pointerEvents="none"
        />

        <View style={manualStyles.header}>
          <Text style={manualStyles.title}>Manual Strobe</Text>
          <Text style={manualStyles.subtitle}>Control your flash intensity</Text>
        </View>

        <ScrollView>
          <View style={manualStyles.content}>
            <ManualModeToggle isManualMode={isManualMode} onToggle={toggleMode} />

            {!isManualMode && (
              <ManualSpeedControl value={strobeSpeed} onChange={setStrobeSpeed} disabled={isStrobing} />
            )}

            <ManualColorPicker selectedColor={selectedColor} onSelect={setSelectedColor} />

            <ManualTimerSettings
              enabled={timerEnabled}
              minutes={timerMinutes}
              onToggle={setTimerEnabled}
              onChange={setTimerMinutes}
            />

            <ManualActionButtons
              isManualMode={isManualMode}
              isStrobing={isStrobing}
              onManualFlash={handleManualFlash}
              onToggleStrobe={toggleStrobe}
              onFullscreen={goToFullscreen}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
