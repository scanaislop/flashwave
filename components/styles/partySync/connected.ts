import { TextStyle, ViewStyle } from 'react-native';
import { fonts } from '@/constants/fonts';

type StyleRecord = Record<string, ViewStyle | TextStyle>;

export const partySyncConnectedStyles: StyleRecord = {
  partyCodeContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  partyCodeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    gap: 12,
    marginBottom: 12,
  },
  partyCodeTitle: {
    fontSize: 16,
    fontFamily: 'Rajdhani-Bold',
    color: '#FFFFFF',
  },
  copyButton: {
    padding: 4,
  },
  partyCodeText: {
    fontSize: 32,
    fontFamily: fonts.bold,
    color: '#06FFA5',
    letterSpacing: 4,
    marginBottom: 8,
  },
  partyCodeSubtitle: {
    fontSize: 12,
    fontFamily: fonts.regular,
    color: '#94A3B8',
  },
  participantsContainer: {
    marginBottom: 20,
  },
  participantsTitle: {
    fontSize: 18,
    fontFamily: 'Rajdhani-Bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  participantsList: {
    gap: 12,
  },
  participantItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  participantInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  connectedStatus: {
    backgroundColor: '#06FFA5',
  },
  disconnectedStatus: {
    backgroundColor: '#64748B',
  },
  participantName: {
    fontSize: 16,
    fontFamily: fonts.medium,
    color: '#FFFFFF',
  },
  participantStatus: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: '#06FFA5',
  },
  disconnectedText: {
    color: '#64748B',
  },
  syncContainer: {
    width: '100%',
    marginBottom: 20,
  },
  syncHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  syncTitle: {
    fontSize: 18,
    fontFamily: 'Rajdhani-Bold',
    color: '#FFFFFF',
  },
  syncDescription: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: '#94A3B8',
    textAlign: 'center',
  },
};
