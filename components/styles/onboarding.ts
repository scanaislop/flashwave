import { Dimensions, StyleSheet } from 'react-native';

export const onboardingStyles = StyleSheet.create({
    container: {
      flex: 1
    }, safeArea: {
      flex: 1
    }, header: {
      flexDirection: 'row', justifyContent: 'flex-end', paddingHorizontal: 20, paddingTop: 10
    }, skipButton: {
      flexDirection: 'row', alignItems: 'center', gap: 5
    }, skipText: {
      color: '#64748B', fontSize: 16, fontFamily: 'Rajdhani-Medium'
    }, scrollView: {
      flex: 1
    }, slideContainer: {
      width: Dimensions.get('window').width, flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 40
    }, iconContainer: {
      alignItems: 'center', marginBottom: 60
    }, iconGradient: {
      width: 160,
      height: 160,
      borderRadius: 80,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: -50,
      zIndex: 1
    }, textContainer: {
      alignItems: 'center', gap: 16
    }, title: {
      fontSize: 32, fontFamily: 'Orbitron-Bold', color: '#FFFFFF', textAlign: 'center', letterSpacing: 1
    }, subtitle: {
      fontSize: 18, fontFamily: 'Rajdhani-Regular', color: '#94A3B8', textAlign: 'center', lineHeight: 24
    }, footer: {
      paddingHorizontal: 40, paddingBottom: 40, alignItems: 'center', gap: 30
    }, pagination: {
      flexDirection: 'row', gap: 8
    }, dot: {
      width: 8, height: 8, borderRadius: 4, backgroundColor: '#64748B'
    }, activeDot: {
      backgroundColor: '#06FFA5', width: 24
    }, nextButton: {
      width: '100%'
    }
  });