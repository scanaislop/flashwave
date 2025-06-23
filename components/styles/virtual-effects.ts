import { StyleSheet } from 'react-native';

export const virtualEffectsStyles = StyleSheet.create({
    container: {
      flex: 1,
    },
    safeArea: {
      flex: 1,
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
    },
    previewContainer: {
      alignItems: 'center',
      marginBottom: 30,
    },
    previewHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      marginBottom: 20,
    },
    previewTitle: {
      fontSize: 22,
      fontFamily: 'Rajdhani-Bold',
      color: '#FFFFFF',
    },
    previewDescription: {
      fontSize: 14,
      fontFamily: 'Rajdhani-Regular',
      color: '#94A3B8',
      textAlign: 'center',
      marginTop: 16,
    },
    effectsSection: {
      marginBottom: 30,
    },
    sectionTitle: {
      fontSize: 20,
      fontFamily: 'Orbitron-Bold',
      color: '#FFFFFF',
      marginBottom: 16,
      letterSpacing: 0.5,
    },
    effectsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
    },
    effectCard: {
      width: '48%',
      height: 80,
      borderRadius: 12,
      overflow: 'hidden',
    },
    selectedEffectCard: {
      borderWidth: 2,
      borderColor: '#06FFA5',
    },
    effectGradient: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 8,
    },
    effectName: {
      fontSize: 12,
      fontFamily: 'Rajdhani-Medium',
      color: '#64748B',
      textAlign: 'center',
    },
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
      fontFamily: 'Rajdhani-Medium',
      color: '#64748B',
    },
    customToggleActive: {
      color: '#06FFA5',
    },
    colorsSubtitle: {
      fontSize: 14,
      fontFamily: 'Rajdhani-Regular',
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
      fontFamily: 'Rajdhani-Medium',
      color: '#FFFFFF',
    },
    noPresets: {
      fontSize: 14,
      fontFamily: 'Rajdhani-Regular',
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
      fontFamily: 'Rajdhani-Medium',
      color: '#FFFFFF',
    },
    startButton: {
      marginBottom: 30,
    },
  });