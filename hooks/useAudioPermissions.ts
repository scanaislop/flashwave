import { useEffect, useState } from 'react';
import { requestRecordingPermissionsAsync, setAudioModeAsync } from 'expo-audio';
import { Alert, Platform } from 'react-native';

export const useAudioPermissions = () => {
  const [audioPermission, setAudioPermission] = useState<boolean | null>(null);

  const checkAudioPermissions = async () => {
    try {
      const { status } = await requestRecordingPermissionsAsync();
      setAudioPermission(status === 'granted');

      if (status === 'granted') {
        await setAudioModeAsync({
          allowsRecording: true,
          playsInSilentMode: true,
          interruptionMode: 'mixWithOthers',
          interruptionModeAndroid: 'duckOthers',
        });
      }
    } catch (error) {
      console.error('Error checking audio permissions:', error);
      setAudioPermission(false);
    }
  };

  const requestAudioPermission = async () => {
    if (Platform.OS === 'web') {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        setAudioPermission(true);
      } catch (error) {
        Alert.alert('Permission Denied', 'Microphone access is required for sound reactive mode.');
      }
    }
  };

  useEffect(() => {
    checkAudioPermissions();
  }, []);

  return { audioPermission, requestAudioPermission };
};