import { StyleSheet } from 'react-native';
import { virtualLayoutStyles } from './layout';
import { virtualColorStyles } from './colors';
import { virtualPresetStyles } from './presets';

export const virtualEffectsStyles = StyleSheet.create<Record<string, any>>({
  ...virtualLayoutStyles,
  ...virtualColorStyles,
  ...virtualPresetStyles,
});
