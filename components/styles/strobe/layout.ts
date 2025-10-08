import { Platform, TextStyle, ViewStyle } from 'react-native';
import { fonts } from '@/constants/fonts';

type StyleRecord = Record<string, ViewStyle | TextStyle>;

export const strobeLayoutStyles: StyleRecord = {
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  toggleIcon: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40,
    right: 20,
    zIndex: 1000,
  },
  toggleButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  controlsOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    zIndex: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontFamily: fonts.bold,
    color: '#FFFFFF',
    letterSpacing: 2,
  },
  centerControls: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  playButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    overflow: 'hidden',
  },
  playButtonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButtonText: {
    fontSize: 12,
    fontFamily: 'Rajdhani-Bold',
    color: '#FFFFFF',
    letterSpacing: 1,
    textAlign: 'center',
    opacity: 0.8,
  },
  bottomControls: {
    paddingHorizontal: 25,
    paddingBottom: 40,
    gap: 25,
  },
};
