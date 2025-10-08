import { StyleSheet } from 'react-native';
import { fonts } from '@/constants/fonts';

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  appTitle: {
    fontSize: 28,
    fontFamily: 'Orbitron-Black',
    color: '#06FFA5',
    letterSpacing: 2,
  },
  tagline: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: '#94A3B8',
    marginTop: 2,
  },
  themeToggle: {
    padding: 10,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: fonts.regular,
    color: '#94A3B8',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  primaryButton: {
    width: '100%',
    marginBottom: 20,
  },
  modesSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: fonts.bold,
    color: '#FFFFFF',
    marginBottom: 20,
    letterSpacing: 1,
  },
  modesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'space-between',
  },
  modeCardWrapper: {
    width: '47%',
  },
  modeCard: {
    marginBottom: 0,
    minHeight: 140,
  },
  activeModeCard: {
    borderColor: '#06FFA5',
  },
  modeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  modeIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeIndicator: {
    backgroundColor: '#06FFA520',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  activeText: {
    fontSize: 9,
    fontFamily: 'Rajdhani-Bold',
    color: '#06FFA5',
    letterSpacing: 0.5,
  },
  modeTitle: {
    fontSize: 16,
    fontFamily: 'Rajdhani-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
    lineHeight: 20,
  },
  modeSubtitle: {
    fontSize: 13,
    fontFamily: fonts.regular,
    color: '#94A3B8',
    lineHeight: 16,
  },
  infoCard: {
    marginBottom: 30,
  },
  infoTitle: {
    fontSize: 16,
    fontFamily: 'Rajdhani-Bold',
    color: '#F59E0B',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: '#94A3B8',
    lineHeight: 20,
  },
});
