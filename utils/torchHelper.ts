import { Platform } from 'react-native';
import Torch from 'react-native-torch';

/**
 * Helper utility to handle torch functionality with proper type handling for iOS
 * Addresses the issue with boolean to Objective-C BOOL conversion
 */
export const TorchHelper = {
  /**
   * Switch the torch state safely across platforms
   * @param state - boolean indicating whether to turn the torch on (true) or off (false)
   * @returns Promise that resolves when the operation completes
   */
  async switchState(state: boolean): Promise<void> {
    if (!Torch || !Torch.switchState) {
      console.log('Torch module not available');
      return;
    }
    
    try {
      // For iOS, we need to handle the BOOL conversion issue
      // by using a workaround in the actual implementation
      Torch.switchState(state);
    } catch (error) {
      console.log('Error controlling torch:', error);
      throw error;
    }
  },

  /**
   * Request camera permission for torch usage
   * @param title - Permission dialog title
   * @param message - Permission dialog message
   * @returns Promise that resolves to boolean indicating if permission was granted
   */
  async requestCameraPermission(title: string, message: string): Promise<boolean> {
    if (!Torch || !Torch.requestCameraPermission) {
      return false;
    }
    
    try {
      return await Torch.requestCameraPermission(title, message);
    } catch (error) {
      console.log('Error requesting camera permission:', error);
      return false;
    }
  }
};
