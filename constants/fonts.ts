import {
  Orbitron_400Regular,
  Orbitron_700Bold,
  Orbitron_900Black,
} from '@expo-google-fonts/orbitron';
import {
  Rajdhani_400Regular,
  Rajdhani_500Medium,
  Rajdhani_600SemiBold,
  Rajdhani_700Bold,
} from '@expo-google-fonts/rajdhani';

export const fontFamilies = {
  orbitron: {
    regular: 'Orbitron-Regular',
    bold: 'Orbitron-Bold',
    black: 'Orbitron-Black',
  },
  rajdhani: {
    regular: 'Rajdhani-Regular',
    medium: 'Rajdhani-Medium',
    semiBold: 'Rajdhani-SemiBold',
    bold: 'Rajdhani-Bold',
  },
} as const;

export const fonts = {
  regular: fontFamilies.rajdhani.regular,
  medium: fontFamilies.rajdhani.medium,
  bold: fontFamilies.orbitron.bold,
  orbitron: fontFamilies.orbitron,
  rajdhani: fontFamilies.rajdhani,
} as const;

export const fontMap = {
  [fontFamilies.orbitron.regular]: Orbitron_400Regular,
  [fontFamilies.orbitron.bold]: Orbitron_700Bold,
  [fontFamilies.orbitron.black]: Orbitron_900Black,
  [fontFamilies.rajdhani.regular]: Rajdhani_400Regular,
  [fontFamilies.rajdhani.medium]: Rajdhani_500Medium,
  [fontFamilies.rajdhani.semiBold]: Rajdhani_600SemiBold,
  [fontFamilies.rajdhani.bold]: Rajdhani_700Bold,
};
