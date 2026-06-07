import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { X } from 'lucide-react-native';

import { wordDisplayStyles } from '@/components/styles/wordDisplayStyles';
import type { WordAnimation } from '@/hooks/useWordMode';

const CONFETTI_COLORS = ['#F97316', '#06B6D4', '#8B5CF6', '#F43F5E', '#22C55E'];

type ConfettiPiece = {
  x: number;
  drift: number;
  size: number;
  color: string;
  animated: Animated.Value;
  loop?: Animated.CompositeAnimation;
};

export interface WordDisplayProps {
  text: string;
  fontFamily: string;
  color: string;
  animation: WordAnimation;
  confetti: boolean;
  birthday: boolean;
  onExit: () => void;
}

export function WordDisplay({ text, fontFamily, color, animation, confetti, birthday, onExit }: WordDisplayProps) {
  const { width, height } = useWindowDimensions();
  const animationValue = useRef(new Animated.Value(0)).current;
  const confettiPiecesRef = useRef<ConfettiPiece[]>([]);
  const [manualScale, setManualScale] = useState(1);
  const tickerActive = useMemo(() => text.trim().length >= 30, [text]);

  const baseFontSize = useMemo(() => {
    const safeLength = Math.max(text.trim().length, 1);
    // For landscape (rotated): height becomes our width when rotated
    const availableSpace = height - 80;
    const calculated = availableSpace / (safeLength * 0.4);
    return Math.max(120, Math.min(calculated, 800));
  }, [height, text]);

  const scaledFontSize = useMemo(() => baseFontSize * manualScale, [baseFontSize, manualScale]);

  const dynamicTextStyle = useMemo(
    () => ({
      fontSize: scaledFontSize,
      lineHeight: scaledFontSize * 1.05,
      maxWidth: Math.max(0, height - 64),
      maxHeight: Math.max(0, width - 64),
    }),
    [scaledFontSize, height, width],
  );

  const adjustScale = useCallback((delta: number) => {
    setManualScale((prev) => {
      const next = Number((prev + delta).toFixed(2));
      return Math.min(5, Math.max(0.4, next));
    });
  }, []);

  useEffect(() => {
    setManualScale(1);
  }, [text, fontFamily]);

  useEffect(() => {
    animationValue.setValue(0);
    let loop: Animated.CompositeAnimation | null = null;

    if (tickerActive) {
      const duration = 7000;
      loop = Animated.loop(
        Animated.sequence([
          Animated.timing(animationValue, {
            toValue: 1,
            duration,
            useNativeDriver: true,
          }),
          Animated.timing(animationValue, {
            toValue: 0,
            duration,
            useNativeDriver: true,
          }),
        ]),
      );
    } else if (animation === 'pulse') {
      loop = Animated.loop(
        Animated.sequence([
          Animated.timing(animationValue, {
            toValue: 1,
            duration: 900,
            useNativeDriver: true,
          }),
          Animated.timing(animationValue, {
            toValue: 0,
            duration: 900,
            useNativeDriver: true,
          }),
        ]),
      );
    } else if (animation === 'bounce') {
      loop = Animated.loop(
        Animated.sequence([
          Animated.timing(animationValue, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(animationValue, {
            toValue: 0,
            duration: 600,
            useNativeDriver: true,
          }),
        ]),
      );
    } else if (animation === 'scroll') {
      loop = Animated.loop(
        Animated.timing(animationValue, {
          toValue: 1,
          duration: 5000,
          useNativeDriver: true,
        }),
      );
    }

    loop?.start();
    return () => {
      loop?.stop();
    };
  }, [animation, animationValue, tickerActive]);

  useEffect(() => {
    confettiPiecesRef.current.forEach((piece) => piece.loop?.stop());

    if (confetti) {
      confettiPiecesRef.current = Array.from({ length: 18 }).map((_, index) => {
        const animated = new Animated.Value(0);
        const loop = Animated.loop(
          Animated.sequence([
            Animated.delay(Math.random() * 1200),
            Animated.timing(animated, {
              toValue: 1,
              duration: 2200 + Math.random() * 2600,
              useNativeDriver: true,
            }),
            Animated.timing(animated, {
              toValue: 0,
              duration: 0,
              useNativeDriver: true,
            }),
          ]),
        );
        loop.start();
        return {
          x: Math.random() * width,
          drift: (Math.random() - 0.5) * width * 0.4,
          size: 6 + Math.random() * 8,
          color: CONFETTI_COLORS[index % CONFETTI_COLORS.length],
          animated,
          loop,
        };
      });
    } else {
      confettiPiecesRef.current = [];
    }

    return () => {
      confettiPiecesRef.current.forEach((piece) => piece.loop?.stop());
    };
  }, [confetti, width, height]);

  const animatedTextStyle = useMemo(() => {
    const transforms: Animated.AnimatedTransform = [];

    if (tickerActive) {
      const travel = height * 0.45;
      const translateX = animationValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [-travel, 0, travel],
      });
      transforms.push({ translateX });
    } else if (animation === 'pulse') {
      const scale = animationValue.interpolate({ inputRange: [0, 1], outputRange: [0.92, 1.08] });
      transforms.push({ scale });
    } else if (animation === 'bounce') {
      const translateY = animationValue.interpolate({ inputRange: [0, 1], outputRange: [-16, 16] });
      transforms.push({ translateY });
    } else if (animation === 'scroll') {
      const translateX = animationValue.interpolate({ inputRange: [0, 1], outputRange: [-height, height] });
      transforms.push({ translateX });
    }

    return transforms.length ? { transform: transforms } : undefined;
  }, [animation, animationValue, height, tickerActive]);

  const stageStyle = useMemo(
    () => [
      wordDisplayStyles.landscapeStage,
      {
        width: height,
        height: width,
        transform: [{ rotate: '-90deg' }],
      },
    ],
    [height, width],
  );

  return (
    <LinearGradient
      colors={birthday ? ['#4318FF', '#C43AD6'] : ['#000000', '#1E1B4B']}
      style={wordDisplayStyles.container}
    >
      <StatusBar hidden />
      <SafeAreaView style={wordDisplayStyles.safeArea} edges={['left', 'right', 'top']}>
        <View style={wordDisplayStyles.topBar}>
          <View style={wordDisplayStyles.fontControlsRow}>
            <TouchableOpacity
              onPress={() => adjustScale(-0.1)}
              style={wordDisplayStyles.fontControlButton}
              accessibilityRole="button"
              accessibilityLabel="Decrease font size"
            >
              <Text style={wordDisplayStyles.fontControlText}>-</Text>
            </TouchableOpacity>
            <Text style={wordDisplayStyles.fontControlLabel}>Size x{manualScale.toFixed(1)}</Text>
            <TouchableOpacity
              onPress={() => adjustScale(0.1)}
              style={wordDisplayStyles.fontControlButton}
              accessibilityRole="button"
              accessibilityLabel="Increase font size"
            >
              <Text style={wordDisplayStyles.fontControlText}>+</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={onExit} style={wordDisplayStyles.exitButton}>
            <X size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={wordDisplayStyles.contentArea}>
          <Animated.View style={stageStyle}>
            <Animated.Text
              numberOfLines={1}
              // allowFontScaling
              style={[
                wordDisplayStyles.wordText,
                { color, fontFamily },
                dynamicTextStyle,
                animatedTextStyle,
              ]}
            >
              {text}
            </Animated.Text>
          </Animated.View>
        </View>

        {confetti && (
          <View pointerEvents="none" style={wordDisplayStyles.confettiContainer}>
            {confettiPiecesRef.current.map((piece, index) => {
              const translateY = piece.animated.interpolate({
                inputRange: [0, 1],
                outputRange: [-80, height + 80],
              });
              const translateX = piece.animated.interpolate({
                inputRange: [0, 1],
                outputRange: [piece.x, piece.x + piece.drift],
              });
              const rotate = piece.animated.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '540deg'],
              });
              const opacity = piece.animated.interpolate({
                inputRange: [0, 0.1, 0.9, 1],
                outputRange: [0, 1, 1, 0],
              });

              return (
                <Animated.View
                  key={`confetti-${index}`}
                  style={{
                    position: 'absolute',
                    width: piece.size,
                    height: piece.size * 2,
                    borderRadius: piece.size / 2,
                    backgroundColor: piece.color,
                    opacity,
                    transform: [{ translateX }, { translateY }, { rotate }],
                  }}
                />
              );
            })}
          </View>
        )}

        {birthday && (
          <View pointerEvents="none" style={wordDisplayStyles.birthdayBanner}>
            <Text style={wordDisplayStyles.birthdayText}>🎂 Happy Celebration! 🎉</Text>
          </View>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
}
