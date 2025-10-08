import { StyleSheet } from 'react-native';
import { fonts } from '@/constants/fonts';

export const soundReactiveStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    fontFamily: fonts.regular,
    color: '#94A3B8',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 28,
    fontFamily: fonts.bold,
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: fonts.regular,
    color: '#94A3B8',
    marginTop: 4,
  },
  scrollWrapper: {
    flex: 1,
    paddingHorizontal: 20,
  },
  content: {
    paddingBottom: 20,
  },
  controlLabel: {
    fontSize: 14,
    fontFamily: 'Rajdhani-Bold',
    color: '#FFFFFF',
  },
  slider: {
    height: 40,
    flex: 1,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    gap: 10,
  },
  sliderLabel: {
    fontSize: 12,
    fontFamily: fonts.medium,
    color: '#FFFFFF',
  },
  paletteTitle: {
    fontSize: 14,
    fontFamily: 'Rajdhani-Bold',
    color: '#FFFFFF',
    paddingBottom: 10,
  },
  paletteGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 10,
  },
  paletteItem: {
    width: '31%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 6,
    padding: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  selectedPalette: {
    borderColor: '#06FFA5',
  },
  paletteGradient: {
    width: 40,
    height: 24,
    borderRadius: 12,
  },
  paletteName: {
    fontSize: 10,
    fontFamily: fonts.medium,
    color: '#FFFFFF',
  },
  buttonSection: {
    alignItems: 'center',
    marginTop: 10,
  },
  primaryButton: {
    width: '100%',
  },
  waveSection: {
    alignItems: 'center',
    marginTop: 10,
    height: 50,
  },
  levelOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 20,
    right: 20,
  },
  fullScreenContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: fonts.medium,
    marginLeft: 8,
  },
  bpmText: {
    color: '#94A3B8',
    fontFamily: fonts.regular,
    fontSize: 12,
  },
});
