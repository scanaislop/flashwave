import { StyleSheet } from 'react-native';
import { strobeLayoutStyles } from './layout';
import { strobeControlStyles } from './controls';
import { strobeEffectStyles } from './effects';

export const strobeStyles = StyleSheet.create<Record<string, any>>({
  ...strobeLayoutStyles,
  ...strobeControlStyles,
  ...strobeEffectStyles,
});
