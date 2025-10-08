import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

export type ImpactStyle = Haptics.ImpactFeedbackStyle;
export const ImpactStyles = Haptics.ImpactFeedbackStyle;

export const triggerImpact = async (style: ImpactStyle) => {
  if (Platform.OS === 'web') return;
  try {
    await Haptics.impactAsync(style);
  } catch (error) {
    console.warn('Haptics unavailable', error);
  }
};
