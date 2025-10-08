import { TextStyle, ViewStyle } from 'react-native';
import { fonts } from '@/constants/fonts';

type StyleRecord = Record<string, ViewStyle | TextStyle>;

export const strobeControlStyles: StyleRecord = {
  controlSection: {
    gap: 12,
  },
  controlLabel: {
    fontSize: 14,
    fontFamily: 'Rajdhani-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  hardwareControls: {
    gap: 16,
  },
  hardwareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  hardwareButtonText: {
    fontSize: 12,
    fontFamily: 'Rajdhani-Bold',
    color: '#94A3B8',
  },
  brightnessContainer: {
    gap: 8,
  },
  brightnessHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  brightnessLabel: {
    fontSize: 12,
    fontFamily: fonts.medium,
    color: '#FFFFFF',
  },
  brightnessSlider: {
    height: 30,
  },
  slider: {
    height: 40,
  },
  effectGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  effectItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  effectText: {
    fontSize: 10,
    fontFamily: fonts.medium,
    color: '#94A3B8',
  },
  sustainedToggle: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'transparent',
    alignItems: 'center',
  },
  sustainedText: {
    fontSize: 10,
    fontFamily: 'Rajdhani-Bold',
    color: '#94A3B8',
  },
  colorGrid: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    flexWrap: 'wrap',
  },
  colorItem: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    overflow: 'hidden',
  },
  selectedColorItem: {
    borderColor: '#FFFFFF',
    borderWidth: 3,
  },
  rainbowGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 18,
  },
};
