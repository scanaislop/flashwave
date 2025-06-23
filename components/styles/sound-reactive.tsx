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
      paddingBottom: 20,
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
      flex: 1,
      paddingHorizontal: 20,
      gap: 20,
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
      gap: 10,
    },
    sliderLabel: {
      paddingTop: 10,
      fontSize: 16,
      fontFamily: 'Rajdhani-Medium',
      color: '#FFFFFF',
    },
    slider: {
      height: 40,
    },
    paletteContainer: {
      gap: 16,
    },
    paletteTitle: {
      fontSize: 18,
      fontFamily: 'Rajdhani-Bold',
      color: '#FFFFFF',
    },
    paletteGrid: {
      gap: 12,
    },
    paletteItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      padding: 4,
      borderRadius: 8,
      borderWidth: 2,
      borderColor: 'transparent',
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
      fontSize: 14,
      fontFamily: 'Rajdhani-Medium',
      color: '#FFFFFF',
    },
    primaryButton: {
      marginTop: 10,
    },
  });