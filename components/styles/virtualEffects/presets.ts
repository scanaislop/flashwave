import { TextStyle, ViewStyle } from 'react-native';
import { fonts } from '@/constants/fonts';

type StyleRecord = Record<string, ViewStyle | TextStyle>;

export const virtualPresetStyles: StyleRecord = {
  presetsContainer: {
    marginBottom: 30,
  },
  presetsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  presetsTitle: {
    fontSize: 18,
    fontFamily: 'Rajdhani-Bold',
    color: '#FFFFFF',
  },
  saveButton: {
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  saveButtonText: {
    fontSize: 12,
    fontFamily: fonts.medium,
    color: '#FFFFFF',
  },
  noPresets: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: '#64748B',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  presetsList: {
    gap: 8,
  },
  presetItem: {
    padding: 12,
    backgroundColor: '#1E293B',
    borderRadius: 8,
  },
  presetName: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: '#FFFFFF',
  },
  startButton: {
    marginBottom: 30,
  },
};
