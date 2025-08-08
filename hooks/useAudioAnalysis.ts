import { useAudioRecorder, RecordingPresets, setAudioModeAsync } from 'expo-audio';
import { useEffect, useRef, useState } from 'react';
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

  const analyzeAudio = () => {
    if (!isAnalyzing || !isListening) return;
    
    try {
      const status = recorder.getStatus();
      if (status.isRecording) {
        // Simulate real-time audio analysis without storing the recording
        const audioLevel = Math.random() * sensitivity;
        setAudioLevel(audioLevel);
        
        // Focus on bass frequencies for beat detection
        const newBassLevel = audioLevel * (0.7 + Math.random() * 0.3);
        setBassLevel(prev => prev * 0.7 + newBassLevel * 0.3);
        
        // Beat detection logic
        const beatThreshold = 0.4 * sensitivity;
        const now = Date.now();
        const timeSinceLastBeat = now - lastBeatTime.current;
        
        if (newBassLevel > beatThreshold && newBassLevel > bassLevel * 1.2 && timeSinceLastBeat > 300) {
          setBeatDetected(true);
          updateBPM(timeSinceLastBeat);
          lastBeatTime.current = now;
          
          // Reset beat detection after short duration for strobe effect
          setTimeout(() => setBeatDetected(false), 100);
        }
      }
    } catch (error) {
      console.log('Error analyzing audio:', error);
    }
    
    if (isListening && isAnalyzing) {
      animationFrameRef.current = requestAnimationFrame(analyzeAudio);
    }
  };

  const updateBPM = (timeSinceLastBeat: number) => {
    if (lastBeatTime.current > 0 && timeSinceLastBeat > 300 && timeSinceLastBeat < 2000) {
      beatIntervals.current.push(timeSinceLastBeat);
      if (beatIntervals.current.length > 8) {
        beatIntervals.current.shift();
      }
      
      if (beatIntervals.current.length >= 4) {
        const avgInterval = beatIntervals.current.reduce((sum, interval) => sum + interval, 0) / beatIntervals.current.length;
        const calculatedBPM = Math.round(60000 / avgInterval);
        
        if (calculatedBPM >= 60 && calculatedBPM <= 180) {
          setCurrentBPM(calculatedBPM);
        }
      }
    }
  };

  const startAnalyzing = async () => {
    try {
      if (isAnalyzing) {
        await stopAnalyzing();
      }
      
      // Set audio mode for live monitoring (no recording to file)
      await setAudioModeAsync({
        allowsRecording: true,
        playsInSilentMode: true,
        interruptionMode: 'mixWithOthers',
        interruptionModeAndroid: 'duckOthers',
      });
      
      // Prepare and start "recording" but we'll just analyze the stream
      await recorder.prepareToRecordAsync();
      recorder.record();
      setIsAnalyzing(true);
      
      // Start the analysis loop
      requestAnimationFrame(analyzeAudio);
      
    } catch (error) {
      console.error('Failed to start audio analysis', error);
      Alert.alert('Error', 'Failed to start audio analysis. Please check microphone permissions.');
    }
  };

  const stopAnalyzing = async () => {
    if (isAnalyzing) {
      try {
        // Cancel animation frame
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        
        // Stop the recorder (this discards any temporary data)
        await recorder.stop();
        setIsAnalyzing(false);
        
        // Reset states
        setAudioLevel(0);
        setBassLevel(0);
        setBeatDetected(false);
        beatIntervals.current = [];
      } catch (error) {
        console.error('Failed to stop audio analysis', error);
      }
    }
  };

  useEffect(() => {
    if (isListening) {
      startAnalyzing();
    } else {
      stopAnalyzing();
    }
    
    return () => {
      stopAnalyzing();
    };
  }, [isListening]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      stopAnalyzing();
    };
  }, []);

  return {
    audioLevel,
    bassLevel,
    beatDetected,
    currentBPM,
    isAnalyzing
  };
};