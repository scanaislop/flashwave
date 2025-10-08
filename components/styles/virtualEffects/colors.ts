import { TextStyle, ViewStyle } from 'react-native';
import { fonts } from '@/constants/fonts';

type StyleRecord = Record<string, ViewStyle | TextStyle>;

export const virtualColorStyles: StyleRecord = {
  colorsContainer: {
    marginBottom: 20,
  },
  colorsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  colorsTitle: {
    fontSize: 18,
    fontFamily: 'Rajdhani-Bold',
    color: '#FFFFFF',
  },
  customToggle: {
    backgroundColor: '#1E293B',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  customToggleText: {
    fontSize: 12,
    fontFamily: fonts.medium,
    color: '#64748B',
  },
  customToggleActive: {
    color: '#06FFA5',
  },
  colorsSubtitle: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: '#94A3B8',
    marginBottom: 12,
  },
  colorsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  colorItem: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedColorItem: {
    borderColor: '#06FFA5',
    borderWidth: 3,
  },
  colorCheck: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textShadowColor: '#000000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  presetColors: {
    alignItems: 'center',
  },
  presetColorRow: {
    flexDirection: 'row',
    gap: 8,
  },
  presetColorItem: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#64748B',
  },
};
