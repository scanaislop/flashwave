import { StyleSheet } from 'react-native';
import { fonts } from '@/constants/fonts';

export const wordStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
  },
  title: {
    fontSize: 26,
    fontFamily: fonts.orbitron.bold,
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: fonts.rajdhani.regular,
    color: '#94A3B8',
    marginTop: 2,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  sectionSpacing: {
    marginBottom: 10,
  },
  inputContainer: {
    gap: 8,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  labelActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  label: {
    fontSize: 18,
    fontFamily: fonts.rajdhani.bold,
    color: '#FFFFFF',
  },
  charCount: {
    fontSize: 14,
    fontFamily: fonts.rajdhani.medium,
    color: '#94A3B8',
  },
  textInput: {
    backgroundColor: '#1E293B',
    borderRadius: 9,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    fontFamily: fonts.rajdhani.medium,
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#475569',
  },
  sectionHeader: {
    fontSize: 18,
    fontFamily: fonts.rajdhani.bold,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  horizontalOptions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 2,
  },
  colorItem: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  colorItemActive: {
    borderColor: '#FFFFFF',
  },
  pillOption: {
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.4)',
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
  },
  pillOptionActive: {
    borderColor: '#8B5CF6',
    backgroundColor: 'rgba(139, 92, 246, 0.25)',
  },
  pillOptionText: {
    fontSize: 12,
    fontFamily: fonts.rajdhani.medium,
    color: '#CBD5F5',
  },
  pillOptionTextActive: {
    color: '#FFFFFF',
  },
  pillOptionSmall: {
    borderRadius: 11,
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.4)',
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
  },
  pillOptionSmallActive: {
    borderColor: '#F97316',
    backgroundColor: 'rgba(249, 115, 22, 0.2)',
  },
  timerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timerSlider: {
    flex: 1,
  },
  timerInput: {
    width: 60,
    paddingHorizontal: 9,
    paddingVertical: 7,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(249, 115, 22, 0.4)',
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: fonts.rajdhani.medium,
    textAlign: 'center',
  },
  timerHint: {
    fontSize: 10,
    color: '#FCD34D',
    fontFamily: fonts.rajdhani.medium,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 12,
  },
  toggleGroup: {
    flex: 1,
    gap: 6,
  },
  toggleLabel: {
    fontSize: 12,
    fontFamily: fonts.rajdhani.bold,
    color: '#FFFFFF',
  },
  togglePills: {
    flexDirection: 'row',
    gap: 6,
  },
  startButton: {
    marginTop: 10,
  },
});
