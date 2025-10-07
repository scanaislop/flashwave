import { useEffect, useCallback, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StrobeSettings, STORAGE_KEY, UseSettingsPersistenceProps } from '@/types/strobe';

export const useSettingsPersistence = ({ settings, isInitialized }: UseSettingsPersistenceProps) => {
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Load settings from AsyncStorage
  const loadSettings = useCallback(async (): Promise<StrobeSettings | null> => {
    try {
      const savedSettings = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedSettings) {
        return JSON.parse(savedSettings);
      }
      return null;
    } catch (error) {
      console.error('Failed to load settings:', error);
      return null;
    }
  }, []);

  // Save settings to AsyncStorage with debouncing
  const saveSettings = useCallback(async (newSettings: StrobeSettings) => {
    if (!isInitialized) return;
    
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  }, [isInitialized]);

  // Debounced save function
  const debouncedSave = useCallback((newSettings: StrobeSettings) => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    
    // @ts-ignore
    saveTimeoutRef.current = setTimeout(() => {
      saveSettings(newSettings);
    }, 500);
  }, [saveSettings]);

  // Auto-save when settings change
  useEffect(() => {
    if (isInitialized && settings) {
      debouncedSave(settings);
    }
  }, [settings, isInitialized, debouncedSave]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  return { loadSettings, saveSettings };
};