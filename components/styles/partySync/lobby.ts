import { TextStyle, ViewStyle } from 'react-native';
import { fonts } from '@/constants/fonts';

type StyleRecord = Record<string, ViewStyle | TextStyle>;

export const partySyncLobbyStyles: StyleRecord = {
  hostHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  hostTitle: {
    fontSize: 20,
    fontFamily: 'Rajdhani-Bold',
    color: '#FFFFFF',
  },
  hostDescription: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: '#94A3B8',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#64748B',
  },
  dividerText: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: '#64748B',
    marginHorizontal: 20,
  },
  joinContainer: {
    marginBottom: 30,
  },
  joinHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  joinTitle: {
    fontSize: 20,
    fontFamily: 'Rajdhani-Bold',
    color: '#FFFFFF',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    fontFamily: fonts.medium,
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#64748B',
  },
  joinButton: {
    width: '100%',
  },
  infoContainer: {
    marginBottom: 30,
  },
  infoTitle: {
    fontSize: 18,
    fontFamily: 'Rajdhani-Bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  infoSteps: {
    gap: 12,
  },
  infoStep: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumberText: {
    fontSize: 12,
    fontFamily: 'Rajdhani-Bold',
    color: '#FFFFFF',
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    fontFamily: fonts.regular,
    color: '#94A3B8',
  },
};
