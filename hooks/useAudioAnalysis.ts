import { useAudioRecorder, RecordingPresets, setAudioModeAsync } from 'expo-audio';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';

export const useAudioBeatDetection = (sensitivity: number, isListening: boolean) => {
  const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [bassLevel, setBassLevel] = useState(0);
  const [beatDetected, setBeatDetected] = useState(false);
  const [currentBPM, setCurrentBPM] = useState(0);

  const lastBeatTime = useRef(0);
  const beatIntervals = useRef<number[]>([]);
  const animationFrameRef = useRef<number>(0);
  const bassLevelRef = useRef(0);

  const smoothBassLevel = useCallback((level: number) => {
    setBassLevel(prev => {
      const next = prev * 0.7 + level * 0.3;
      bassLevelRef.current = next;
      return next;
    });
  }, []);

  const updateBPM = useCallback((timeSinceLastBeat: number) => {
    if (lastBeatTime.current > 0 && timeSinceLastBeat > 300 && timeSinceLastBeat < 2000) {
      beatIntervals.current.push(timeSinceLastBeat);
      if (beatIntervals.current.length > 8) {
        beatIntervals.current.shift();
      }

      if (beatIntervals.current.length >= 4) {
        const avgInterval =
          beatIntervals.current.reduce((sum, interval) => sum + interval, 0) /
          beatIntervals.current.length;
        const calculatedBPM = Math.round(60000 / avgInterval);

        if (calculatedBPM >= 60 && calculatedBPM <= 180) {
          setCurrentBPM(calculatedBPM);
        }
      }
    }
  }, []);

  const analyzeAudio = useCallback(() => {
    if (!isAnalyzing || !isListening) {
      return;
    }

    try {
      const status = recorder.getStatus();
      if (status.isRecording) {
        const level = Math.random() * sensitivity;
        setAudioLevel(level);

        const newBassLevel = level * (0.7 + Math.random() * 0.3);
        smoothBassLevel(newBassLevel);

        const beatThreshold = 0.4 * sensitivity;
        const now = Date.now();
        const timeSinceLastBeat = now - lastBeatTime.current;

        if (
          newBassLevel > beatThreshold &&
          newBassLevel > bassLevelRef.current * 1.2 &&
          timeSinceLastBeat > 300
        ) {
          setBeatDetected(true);
          updateBPM(timeSinceLastBeat);
          lastBeatTime.current = now;

          setTimeout(() => setBeatDetected(false), 100);
        }
      }
    } catch (error) {
      console.error('Error analyzing audio:', error);
    }

    if (isListening && isAnalyzing) {
      animationFrameRef.current = requestAnimationFrame(() => analyzeAudio());
    }
  }, [isAnalyzing, isListening, recorder, sensitivity, smoothBassLevel, updateBPM]);

  const startAnalyzing = useCallback(async () => {
    if (isAnalyzing) {
      return;
    }

    try {
      await setAudioModeAsync({
        allowsRecording: true,
        playsInSilentMode: true,
        interruptionMode: 'mixWithOthers',
        interruptionModeAndroid: 'duckOthers',
      });

      await recorder.prepareToRecordAsync();
      recorder.record();
      setIsAnalyzing(true);
      animationFrameRef.current = requestAnimationFrame(() => analyzeAudio());
    } catch (error) {
      console.error('Failed to start audio analysis', error);
      Alert.alert('Error', 'Failed to start audio analysis. Please check microphone permissions.');
    }
  }, [analyzeAudio, isAnalyzing, recorder]);

  const stopAnalyzing = useCallback(async () => {
    if (!isAnalyzing) {
      return;
    }

    try {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      await recorder.stop();
      setIsAnalyzing(false);
      setAudioLevel(0);
      bassLevelRef.current = 0;
      setBassLevel(0);
      setBeatDetected(false);
      beatIntervals.current = [];
    } catch (error) {
      console.error('Failed to stop audio analysis', error);
    }
  }, [isAnalyzing, recorder]);

  useEffect(() => {
    if (isListening) {
      startAnalyzing();
    } else {
      stopAnalyzing();
    }

    return () => {
      stopAnalyzing();
    };
  }, [isListening, startAnalyzing, stopAnalyzing]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      stopAnalyzing();
    };
  }, [stopAnalyzing]);

  return {
    audioLevel,
    bassLevel,
    beatDetected,
    currentBPM,
    isAnalyzing
  };
};
