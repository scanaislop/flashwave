import { StyleSheet } from 'react-native';
import { fonts } from '@/constants/fonts';

export const manualStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  flashOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
    gap: 20,
  },
  modeContainer: {},
  modeTitle: {
    fontSize: 18,
    fontFamily: 'Rajdhani-Bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  modeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  modeText: {
    fontSize: 16,
    fontFamily: fonts.medium,
    color: '#64748B',
  },
  activeModeText: {
    color: '#FFFFFF',
  },
  speedContainer: {},
  speedLabel: {
    fontSize: 16,
    fontFamily: fonts.medium,
    color: '#FFFFFF',
  },
  slider: {
    height: 40,
    // marginVertical: 5,
  },
  speedLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  colorTitle: {
    fontSize: 18,
    fontFamily: 'Rajdhani-Bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  colorItem: {
    width: 25,
    height: 25,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedColor: {
    borderColor: '#06FFA5',
    borderWidth: 3,
  },
  colorCheck: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  timerContainer: {},
  timerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  timerTitle: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Rajdhani-Bold',
    color: '#FFFFFF',
  },
  timerControls: {
    marginTop: 5,
  },
  timerLabel: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  controlButtons: {
    gap: 16,
    marginTop: 5,
  },
  tapToFlashButton: {
    height: 80,
    borderRadius: 16,
    overflow: 'hidden',
  },
  tapGradient: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  tapToFlashText: {
    fontSize: 20,
    fontFamily: fonts.bold,
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  fullscreenButton: {
    marginBottom: 8,
  },
  primaryButton: {},
});
