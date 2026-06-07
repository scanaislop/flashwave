import { useCallback, useEffect, useMemo } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar, Text, View } from 'react-native';

import { WordDisplay } from '@/components/word/WordDisplay';
import { wordStyles } from '@/components/styles/wordStyles';
import { useTabBar } from '@/context/TabBarContext';
import { customColors } from '@/constants/color';
import { fontFamilies } from '@/constants/fonts';
import { useWordMode, type WordAnimation } from '@/hooks/useWordMode';
import { WordConfigurator } from '@/components/word/WordConfigurator';

const gradientColors: readonly [string, string] = ['#0A0A0F', '#1A1A2E'];

const FONT_OPTIONS = [
  { label: 'Orbitron Bold', value: fontFamilies.orbitron.bold },
  { label: 'Orbitron Regular', value: fontFamilies.orbitron.regular },
  { label: 'Rajdhani Bold', value: fontFamilies.rajdhani.bold },
  { label: 'Rajdhani Medium', value: fontFamilies.rajdhani.medium },
  { label: 'Rajdhani Regular', value: fontFamilies.rajdhani.regular },
];

const ANIMATION_OPTIONS: { id: WordAnimation; label: string }[] = [
  { id: 'static', label: 'Static' },
  { id: 'pulse', label: 'Pulse' },
  { id: 'bounce', label: 'Bounce' },
  { id: 'scroll', label: 'Scroll' },
];

export default function WordScreen() {
  const {
    state,
    effectiveAnimation,
    setText,
    setFontFamily,
    setColor,
    setAnimation,
    setTimer,
    setConfetti,
    setBirthday,
    startDisplay,
    stopDisplay,
  } = useWordMode();

  const colorOptions = useMemo(() => customColors.slice(0, 18), []);
  const booleanOptions = useMemo(
    () => [
      { label: 'Off', value: false },
      { label: 'On', value: true },
    ],
    [],
  );

  const handleTimerChange = useCallback(
    (value: string) => {
      const numeric = value.replace(/[^0-9]/g, '');
      const parsed = numeric ? Math.min(999, parseInt(numeric, 10)) : 0;
      setTimer(parsed);
    },
    [setTimer],
  );

  const { setTabBarVisible } = useTabBar();

  useEffect(() => {
    setTabBarVisible(!state.isActive);
    return () => setTabBarVisible(true);
  }, [setTabBarVisible, state.isActive]);

  if (state.isActive) {
    return (
      <WordDisplay
        text={state.text}
        fontFamily={state.fontFamily}
        color={state.color}
        animation={effectiveAnimation}
        confetti={state.confetti}
        birthday={state.birthday}
        onExit={stopDisplay}
      />
    );
  }

  return (
    <LinearGradient colors={gradientColors} style={wordStyles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={wordStyles.safeArea} edges={['top', 'left', 'right']}>
        <View style={wordStyles.header}>
          <Text style={wordStyles.title}>Word Visuals</Text>
          <Text style={wordStyles.subtitle}>
            Craft animated typography for parties and celebrations
          </Text>
        </View>

        <WordConfigurator
          state={state}
          fontOptions={FONT_OPTIONS}
          colorOptions={colorOptions}
          animationOptions={ANIMATION_OPTIONS}
          booleanOptions={booleanOptions}
          onTextChange={setText}
          onFontSelect={setFontFamily}
          onColorSelect={setColor}
          onAnimationSelect={setAnimation}
          onTimerChange={handleTimerChange}
          onConfettiChange={setConfetti}
          onBirthdayChange={setBirthday}
          onStart={startDisplay}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}
