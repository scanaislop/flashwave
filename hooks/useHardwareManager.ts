import { useEffect, useCallback, useRef } from 'react';
import { Platform, Alert } from 'react-native';
import * as Brightness from 'expo-brightness';
import Torch from 'react-native-torch';
import { UseHardwareManagerProps } from '@/types/strobe';

export const useHardwareManager = ({ 
  setTorchAvailable, 
  setOriginalBrightness, 
  setScreenBrightness 
}: UseHardwareManagerProps) => {
  const isMounted = useRef(true);

  // Initialize hardware capabilities
  const initializeHardware = useCallback(async () => {
    if (Platform.OS === 'web') return;

    // Check torch availability
    try {
      if (Platform.OS === 'ios') {
        if (Torch && Torch.switchState) {
          await Torch.switchState(false);
          if (isMounted.current) {
            setTorchAvailable(true);
          }
        } else {
          console.log('Torch module not available');
        }
      } else {
        // Android
        const cameraAllowed = await Torch.requestCameraPermission(
          'Camera Permissions',
          'We require camera permissions to use the torch on the back of your phone.'
        );
        if (cameraAllowed) {
          if (Torch && Torch.switchState) {
            await Torch.switchState(false);
            if (isMounted.current) {
              setTorchAvailable(true);
            }
          } else {
            console.log('Torch module not available');
          }
        }
      }
    } catch (error) {
      console.error('Could not check torch availability:', error);
    }

    // Initialize brightness
    try {
      const brightness = await Brightness.getBrightnessAsync();
      if (isMounted.current) {
        setOriginalBrightness(brightness);
        setScreenBrightness(brightness);
      }
    } catch (error) {
      console.error('Could not get brightness:', error);
    }
  }, [setTorchAvailable, setOriginalBrightness, setScreenBrightness]);

  // Brightness control
  const handleBrightnessChange = useCallback(async (value: number) => {
    if (Platform.OS === 'web') {
      setScreenBrightness(value);
      return;
    }
    try {
      await Brightness.setBrightnessAsync(value);
      setScreenBrightness(value);
    } catch (error) {
      console.error('Error setting brightness:', error);
    }
  }, [setScreenBrightness]);

  // Flashlight control
  const toggleFlashlight = useCallback(async (enabled: boolean, torchAvailable: boolean) => {
    if (Platform.OS === 'web') {
      Alert.alert('Not Available', 'Camera flashlight is not available on web platform.');
      return false;
    }
    if (!torchAvailable) {
      Alert.alert('Not Available', 'Flashlight is not available on this device.');
      return false;
    }
    try {
      if (Torch && Torch.switchState) {
        await Torch.switchState(enabled);
        return true;
      }
      return false;
    } catch (error) {
      console.log('Error toggling flashlight:', error);
      Alert.alert('Error', 'Could not control flashlight. Make sure no other app is using the camera.');
      return false;
    }
  }, []);

  // Cleanup hardware state
  const cleanupHardware = useCallback(async (originalBrightness: number, torchAvailable: boolean) => {
    if (Platform.OS !== 'web') {
      try {
        await Brightness.setBrightnessAsync(originalBrightness);
      } catch (error) {
        console.error('Error restoring brightness:', error);
      }
      
      if (torchAvailable && Torch && Torch.switchState) {
        try {
          await Torch.switchState(false);
        } catch (error) {
          console.error('Error turning off flashlight:', error);
        }
      }
    }
  }, []);

  // Initialize hardware on mount
  useEffect(() => {
    initializeHardware();

    return () => {
      isMounted.current = false;
    };
  }, [initializeHardware]);

  return {
    handleBrightnessChange,
    toggleFlashlight,
    cleanupHardware
  };
};
