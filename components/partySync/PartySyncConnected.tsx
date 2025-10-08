import { memo } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Copy, Crown, Rocket, Zap } from 'lucide-react-native';
import GlowButton from '@/components/shared/GlowButton';
import NeonContainer from '@/components/shared/NeonContainer';
import { partySyncStyles } from '@/components/styles/partySync';
import { PartyParticipant } from '@/types/partySync';
import { fonts } from '@/constants/fonts';

interface PartySyncConnectedProps {
  isHost: boolean;
  hostCode: string;
  participants: PartyParticipant[];
  onCopyCode: () => void;
  onSyncTest: () => void;
  onLeave: () => void;
}

export const PartySyncConnected = memo(
  ({
    isHost,
    hostCode,
    participants,
    onCopyCode,
    onSyncTest,
    onLeave,
  }: PartySyncConnectedProps) => (
    <>
      <View style={styles.overlay}>
        <Rocket size={64} color="#06FFA5" style={styles.rocketIcon} />
        <Text style={styles.comingSoonTitle}>Coming Soon</Text>
        <Text style={styles.comingSoonSubtitle}>
          We&apos;re building something amazing. Stay tuned!
        </Text>
      </View>

      <ScrollView
        style={[partySyncStyles.content, styles.disabledScroll]}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
      >
        {isHost && (
          <NeonContainer style={partySyncStyles.partyCodeContainer} glowColor="#06FFA5">
            <View style={partySyncStyles.partyCodeHeader}>
              <Text style={partySyncStyles.partyCodeTitle}>Party Code</Text>
              <TouchableOpacity onPress={onCopyCode} style={partySyncStyles.copyButton}>
                <Copy size={16} color="#06FFA5" />
              </TouchableOpacity>
            </View>
            <Text style={partySyncStyles.partyCodeText}>{hostCode}</Text>
            <Text style={partySyncStyles.partyCodeSubtitle}>Share this code with friends</Text>
          </NeonContainer>
        )}

        <NeonContainer style={partySyncStyles.participantsContainer}>
          <Text style={partySyncStyles.participantsTitle}>Participants</Text>
          <View style={partySyncStyles.participantsList}>
            <ParticipantRow
              name={isHost ? 'You (Host)' : 'Host'}
              isConnected
              isHost
              showCrown={isHost}
            />

            {participants.map((participant) => (
              <ParticipantRow
                key={participant.id}
                name={participant.name}
                isConnected={participant.isConnected}
              />
            ))}
          </View>
        </NeonContainer>

        <NeonContainer style={partySyncStyles.syncContainer} glowColor="#F59E0B">
          <View style={partySyncStyles.syncHeader}>
            <Zap size={24} color="#F59E0B" />
            <Text style={partySyncStyles.syncTitle}>Sync Test</Text>
          </View>
          <Text style={partySyncStyles.syncDescription}>
            Test synchronized flash across all connected devices
          </Text>
          <GlowButton
            title="Sync Test Flash"
            onPress={onSyncTest}
            variant="secondary"
            size="medium"
          />
        </NeonContainer>

        <GlowButton
          title="Leave Party"
          onPress={onLeave}
          variant="danger"
          size="large"
          style={styles.leaveButton}
        />
      </ScrollView>
    </>
  ),
);

PartySyncConnected.displayName = 'PartySyncConnected';

interface ParticipantRowProps {
  name: string;
  isConnected: boolean;
  showCrown?: boolean;
  isHost?: boolean;
}

const ParticipantRow = ({
  name,
  isConnected,
  showCrown = false,
  isHost = false,
}: ParticipantRowProps) => (
  <View style={partySyncStyles.participantItem}>
    <View style={partySyncStyles.participantInfo}>
      <View
        style={[
          partySyncStyles.statusIndicator,
          isConnected ? partySyncStyles.connectedStatus : partySyncStyles.disconnectedStatus,
        ]}
      />
      <Text style={partySyncStyles.participantName}>{name}</Text>
      {showCrown && isHost && <Crown size={16} color="#F59E0B" />}
    </View>
    <Text
      style={[
        partySyncStyles.participantStatus,
        !isConnected && partySyncStyles.disconnectedText,
      ]}
    >
      {isConnected ? 'Connected' : 'Disconnected'}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(10, 10, 15, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  rocketIcon: {
    marginBottom: 24,
    textShadowColor: 'rgba(6, 255, 165, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
  comingSoonTitle: {
    fontFamily: fonts.bold,
    fontSize: 36,
    color: '#FFFFFF',
    letterSpacing: 2,
    marginBottom: 12,
    textShadowColor: 'rgba(6, 255, 165, 0.7)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  comingSoonSubtitle: {
    fontFamily: fonts.medium,
    fontSize: 18,
    color: '#CBD5E1',
    textAlign: 'center',
    paddingHorizontal: 40,
    lineHeight: 24,
  },
  disabledScroll: {
    opacity: 0.1,
  },
  leaveButton: {
    marginTop: 24,
    marginBottom: 16,
  },
});
