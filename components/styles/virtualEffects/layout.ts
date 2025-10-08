import { TextStyle, ViewStyle } from 'react-native';
import { fonts } from '@/constants/fonts';

type StyleRecord = Record<string, ViewStyle | TextStyle>;

export const virtualLayoutStyles: StyleRecord = {
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
    fontFamily: fonts.regular,
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 16,
  },
  effectsSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: fonts.bold,
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
    fontFamily: fonts.medium,
    color: '#64748B',
    textAlign: 'center',
  },
};
