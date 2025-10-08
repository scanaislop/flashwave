import { Container } from 'lucide-react-native';
import { StyleSheet } from 'react-native';

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
      fontFamily: 'Rajdhani-Regular',
      color: '#94A3B8',
    },
    header: {
      paddingHorizontal: 20,
      paddingTop: 10,
    },
    title: {
      fontSize: 28,
      fontFamily: 'Orbitron-Bold',
      color: '#FFFFFF',
      letterSpacing: 1,
    },
    subtitle: {
      fontSize: 16,
      fontFamily: 'Rajdhani-Regular',
      color: '#94A3B8',
      marginTop: 4,
    },
    content: {
      paddingBottom: 20,
    },
    visualizerSection: {
      alignItems: 'center',
      marginBottom: 20,
    },
    bpmContainer: {
      alignItems: 'center',
      marginTop: -50,
    },
    bpmLabel: {
      fontSize: 12,
      fontFamily: 'Rajdhani-Bold',
      color: '#06FFA5',
      letterSpacing: 1,
    },
    bpmValue: {
      fontSize: 32,
      fontFamily: 'Orbitron-Bold',
      color: '#FFFFFF',
      marginTop: 4,
    },
    controlsContainer: {
      gap: 20,
    },
    toggleRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    toggleItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    toggleLabel: {
      fontSize: 14,
      fontFamily: 'Rajdhani-Medium',
      color: '#FFFFFF',
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
      fontFamily: 'Rajdhani-Medium',
      color: '#FFFFFF',
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
    paletteContainer: {
      gap: 16,
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
    fullScreenContainer: {
      flex: 1,
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
      fontFamily: 'Rajdhani-Medium',
      marginLeft: 8,
    },
    fullScreenContent: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    fullScreenBpmText: {
      position: 'absolute',
      color: '#FFFFFF',
      fontSize: 24,
      fontFamily: 'Orbitron-Bold',
    },
    bpmText: {
      color: '#94A3B8',
      fontFamily: 'Rajdhani-Regular',
      fontSize: 12,
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
      fontFamily: 'Rajdhani-Medium',
      color: '#FFFFFF',
    },
    primaryButton: {
      marginTop: 10,
      width: '100%',
    },
  });