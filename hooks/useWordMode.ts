import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { fontFamilies } from '@/constants/fonts';
import { customColors } from '@/constants/color';
export type WordAnimation = 'static' | 'pulse' | 'bounce' | 'scroll';

const DEFAULT_WORD = 'FLASHWAVE';
const DEFAULT_FONT = fontFamilies.orbitron.bold;
const DEFAULT_COLOR = customColors[0] ?? '#FFFFFF';

export interface WordState {
  text: string;
  fontFamily: string;
  color: string;
  animation: WordAnimation;
  timer: number;
  confetti: boolean;
  birthday: boolean;
  isActive: boolean;
}

const initialState: WordState = {
  text: DEFAULT_WORD,
  fontFamily: DEFAULT_FONT,
  color: DEFAULT_COLOR,
  animation: 'pulse',
  timer: 0,
  confetti: false,
  birthday: false,
  isActive: false,
};

export const useWordMode = () => {
  const [state, setState] = useState<WordState>(initialState);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const setText = useCallback((value: string) => {
    setState((prev) => ({ ...prev, text: value }));
  }, []);

  const setFontFamily = useCallback((value: string) => {
    setState((prev) => ({ ...prev, fontFamily: value }));
  }, []);

  const setColor = useCallback((value: string) => {
    setState((prev) => ({ ...prev, color: value }));
  }, []);

  const setAnimation = useCallback((value: WordAnimation) => {
    setState((prev) => ({ ...prev, animation: value }));
  }, []);

  const setTimer = useCallback((value: number) => {
    setState((prev) => ({ ...prev, timer: Math.max(0, Math.round(value)) }));
  }, []);

  const setConfetti = useCallback((value: boolean) => {
    setState((prev) => ({ ...prev, confetti: value }));
  }, []);

  const setBirthday = useCallback((value: boolean) => {
    setState((prev) => ({ ...prev, birthday: value }));
  }, []);

  const stopDisplay = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    setState((prev) => ({
      ...prev,
      isActive: false,
    }));
  }, []);

  const startDisplay = useCallback(() => {
    setState((prev) => {
      if (!prev.text.trim()) {
        return prev;
      }
      return { ...prev, isActive: true };
    });
  }, []);

  useEffect(() => {
    if (state.isActive && state.timer > 0) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        stopDisplay();
      }, state.timer * 1000);
    } else if (!state.isActive && timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, [state.isActive, state.timer, stopDisplay]);

  useEffect(
    () => () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    },
    [],
  );

  const effectiveAnimation: WordAnimation = useMemo(() => {
    const word = state.text.trim().toLowerCase();
    if (word === 'log') {
      return 'scroll';
    }
    return state.animation;
  }, [state.animation, state.text]);

  return {
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
  };
};
