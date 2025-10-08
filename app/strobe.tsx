import { Animated, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { strobeStyles } from '@/components/styles/strobe';
import { STROBE_COLORS } from '@/types/strobe';
import { Header } from '@/components/strobe/Header';
import { CenterControls } from '@/components/strobe/CenterControls';
import { HardwareControls } from '@/components/strobe/HardwareControls';
import { SpeedControl } from '@/components/strobe/SpeedControl';
import { EffectSelection } from '@/components/strobe/EffectSelection';
import { SustainedModeToggle } from '@/components/strobe/SustainedModeToggle';
import { ColorSelection } from '@/components/strobe/ColorSelection';
import { StrobeEffects } from '@/components/strobe/StrobeEffects';
import { ToggleControlsIcon } from '@/components/strobe/ToggleControlsIcon';
import { useStrobeController } from '@/hooks/useStrobeController';

const gradientColors: readonly [string, string, string] = ['#000000', '#0A0A0F', '#000000'];

export default function StrobeScreen() {
  const {
    settings,
    updateSettings,
    currentColor,
    toggleStrobe,
    torchAvailable,
    handleBrightnessChange,
    toggleFlashlight,
    handleBack,
    animations,
    showControls,
    controlsOpacity,
    toggleIconOpacity,
    handleToggleControls,
    handleScreenTap,
  } = useStrobeController();

  return (
    <View style={[strobeStyles.container, { backgroundColor: '#000000' }]}> 
      <StatusBar hidden />

      <LinearGradient
        colors={gradientColors}
        style={[StyleSheet.absoluteFillObject, { zIndex: 0 }]}
      />

      <View style={[StyleSheet.absoluteFillObject, { zIndex: 1 }]}>
        <StrobeEffects
          currentColor={currentColor}
          waveAnimation={animations.waveAnimation}
          burstAnimation={animations.burstAnimation}
          flashAnimation={animations.flashAnimation}
          sustainedAnimation={animations.sustainedAnimation}
          sustainedMode={settings.sustainedMode}
        />
      </View>

      <View style={[StyleSheet.absoluteFillObject, { zIndex: 2 }]} pointerEvents="box-none">
        <ToggleControlsIcon
          toggleIconOpacity={toggleIconOpacity}
          currentColor={currentColor}
          handleToggleControls={handleToggleControls}
        />

        {showControls && (
          <Animated.View
            style={[
              StyleSheet.absoluteFillObject,
              {
                opacity: controlsOpacity,
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                zIndex: 10,
              },
            ]}
            pointerEvents="box-none"
          >
            <Header handleBack={handleBack} handleToggleControls={handleToggleControls} />

            <CenterControls
              isStrobing={settings.isStrobing}
              currentColor={currentColor}
              toggleStrobe={toggleStrobe}
            />

            <View style={strobeStyles.bottomControls}>
              <HardwareControls
                flashlightEnabled={settings.flashlightEnabled}
                screenBrightness={settings.screenBrightness}
                currentColor={currentColor}
                torchAvailable={torchAvailable}
                toggleFlashlight={toggleFlashlight}
                handleBrightnessChange={handleBrightnessChange}
              />

              <SpeedControl
                strobeSpeed={settings.strobeSpeed}
                currentColor={currentColor}
                setStrobeSpeed={(value) => updateSettings({ strobeSpeed: value })}
              />

              <EffectSelection
                selectedEffect={settings.selectedEffect}
                currentColor={currentColor}
                setSelectedEffect={(value) => updateSettings({ selectedEffect: value })}
              />

              <SustainedModeToggle
                sustainedMode={settings.sustainedMode}
                currentColor={currentColor}
                setSustainedMode={(value) => updateSettings({ sustainedMode: value })}
              />

              <ColorSelection
                selectedColor={settings.selectedColor}
                setSelectedColor={(value) => updateSettings({ selectedColor: value })}
                strobeColors={STROBE_COLORS}
              />
            </View>
          </Animated.View>
        )}

        {!showControls && (
          <TouchableOpacity
            style={[StyleSheet.absoluteFillObject, { zIndex: 5 }]}
            onPress={handleScreenTap}
            activeOpacity={1}
          />
        )}
      </View>
    </View>
  );
}
