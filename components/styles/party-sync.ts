import { StyleSheet } from 'react-native';
export const partySyncStyles = StyleSheet.create({
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
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
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
  hostContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
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
    fontFamily: 'Rajdhani-Regular',
    color: '#94A3B8',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  hostButton: {
    width: '100%',
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
    fontFamily: 'Rajdhani-Medium',
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
    fontFamily: 'Rajdhani-Medium',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    fontFamily: 'Rajdhani-Medium',
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
    fontFamily: 'Rajdhani-Regular',
    color: '#94A3B8',
  },
  partyCodeContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  partyCodeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
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
    fontFamily: 'Orbitron-Bold',
    color: '#06FFA5',
    letterSpacing: 4,
    marginBottom: 8,
  },
  partyCodeSubtitle: {
    fontSize: 12,
    fontFamily: 'Rajdhani-Regular',
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
    fontFamily: 'Rajdhani-Medium',
    color: '#FFFFFF',
  },
  participantStatus: {
    fontSize: 14,
    fontFamily: 'Rajdhani-Regular',
    color: '#06FFA5',
  },
  disconnectedText: {
    color: '#64748B',
  },
  syncContainer: {
    alignItems: 'center',
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
    fontFamily: 'Rajdhani-Regular',
    color: '#94A3B8',
    textAlign: 'center',
    marginBottom: 16,
  },
  syncButton: {
    width: '100%',
  },
  leaveButton: {
    marginBottom: 30,
  },
});