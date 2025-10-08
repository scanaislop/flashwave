import { ScrollView, Text, TextInput, View } from 'react-native';
import { Crown, UserPlus } from 'lucide-react-native';
import GlowButton from '@/components/shared/GlowButton';
import NeonContainer from '@/components/shared/NeonContainer';
import { partySyncStyles } from '@/components/styles/partySync';

interface PartySyncLobbyProps {
  partyCode: string;
  onCodeChange: (value: string) => void;
  onCreateRoom: () => void;
  onJoinRoom: () => void;
}

export const PartySyncLobby = ({
  partyCode,
  onCodeChange,
  onCreateRoom,
  onJoinRoom,
}: PartySyncLobbyProps) => (
  <ScrollView
    style={partySyncStyles.content}
    showsVerticalScrollIndicator={false}
    keyboardShouldPersistTaps="handled"
  >
    <NeonContainer glowColor="#06FFA5">
      <View style={partySyncStyles.hostHeader}>
        <Crown size={24} color="#06FFA5" />
        <Text style={partySyncStyles.hostTitle}>Host a Party</Text>
      </View>
      <Text style={partySyncStyles.hostDescription}>
        Create a party room and let friends join via code or QR
      </Text>
      <GlowButton
        title="Create Party Room"
        onPress={onCreateRoom}
        variant="primary"
        size="medium"
      />
    </NeonContainer>

    <View style={partySyncStyles.divider}>
      <View style={partySyncStyles.dividerLine} />
      <Text style={partySyncStyles.dividerText}>OR</Text>
      <View style={partySyncStyles.dividerLine} />
    </View>

    <NeonContainer style={partySyncStyles.joinContainer} glowColor="#8B5CF6">
      <View style={partySyncStyles.joinHeader}>
        <UserPlus size={24} color="#8B5CF6" />
        <Text style={partySyncStyles.joinTitle}>Join a Party</Text>
      </View>

      <View style={partySyncStyles.inputContainer}>
        <Text style={partySyncStyles.inputLabel}>Enter Party Code</Text>
        <TextInput
          style={partySyncStyles.textInput}
          value={partyCode}
          onChangeText={onCodeChange}
          placeholder="e.g. FLASH1234"
          placeholderTextColor="#64748B"
          autoCapitalize="characters"
          returnKeyType="done"
        />
      </View>

      <GlowButton
        title="Join Party"
        onPress={onJoinRoom}
        variant="secondary"
        size="medium"
        disabled={!partyCode.trim()}
        style={partySyncStyles.joinButton}
      />
    </NeonContainer>

    <NeonContainer style={partySyncStyles.infoContainer} variant="subtle">
      <Text style={partySyncStyles.infoTitle}>How Party Sync Works</Text>
      <View style={partySyncStyles.infoSteps}>
        {['Host creates a party room', 'Friends join using the party code', 'All devices sync to the host\'s rhythm'].map((text, index) => (
          <View key={text} style={partySyncStyles.infoStep}>
            <View style={partySyncStyles.stepNumber}>
              <Text style={partySyncStyles.stepNumberText}>{index + 1}</Text>
            </View>
            <Text style={partySyncStyles.stepText}>{text}</Text>
          </View>
        ))}
      </View>
    </NeonContainer>
  </ScrollView>
);
