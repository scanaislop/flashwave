import React, { useState } from 'react';
import { Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import GlowButton from '@/components/shared/GlowButton';
import NeonContainer from '@/components/shared/NeonContainer';
import { Copy, Crown, UserPlus, Zap } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { partySyncStyles } from '@/components/styles/party-sync';
import { mockParticipants } from '@/mocks/users';


export default function PartySyncScreen() {
  const [isHost, setIsHost] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [partyCode, setPartyCode] = useState('');
  const [participants, setParticipants] = useState(mockParticipants);
  const [hostCode] = useState('FLASH' + Math.random().toString(36).substr(2, 4).toUpperCase());

  const createPartyRoom = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    setIsHost(true);
    setIsConnected(true);
  };

  const joinPartyRoom = () => {
    if (!partyCode.trim()) return;

    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    setIsHost(false);
    setIsConnected(true);
  };

  const leaveParty = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setIsHost(false);
    setIsConnected(false);
    setPartyCode('');
  };

  const syncTestFlash = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }
    // Trigger synchronized flash across all devices
  };

  const copyPartyCode = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    // Copy to clipboard
  };

  if (!isConnected) {
    return (<LinearGradient colors={['#0A0A0F', '#1A1A2E']} style={partySyncStyles.container}>
        <SafeAreaView style={partySyncStyles.safeArea} edges={['right', 'left', 'top']}>
          <View style={partySyncStyles.header}>
            <Text style={partySyncStyles.title}>Party Sync</Text>
            <Text style={partySyncStyles.subtitle}>Connect devices for synchronized light shows</Text>
          </View>

          <ScrollView style={partySyncStyles.content} showsVerticalScrollIndicator={false}>
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
                onPress={createPartyRoom}
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
                  onChangeText={setPartyCode}
                  placeholder="e.g. FLASH1234"
                  placeholderTextColor="#64748B"
                  autoCapitalize="characters"
                />
              </View>

              <GlowButton
                title="Join Party"
                onPress={joinPartyRoom}
                variant="secondary"
                size="medium"
                disabled={!partyCode.trim()}
                style={partySyncStyles.joinButton}
              />
            </NeonContainer>

            <NeonContainer style={partySyncStyles.infoContainer} variant="subtle">
              <Text style={partySyncStyles.infoTitle}>How Party Sync Works</Text>
              <View style={partySyncStyles.infoSteps}>
                <View style={partySyncStyles.infoStep}>
                  <View style={partySyncStyles.stepNumber}>
                    <Text style={partySyncStyles.stepNumberText}>1</Text>
                  </View>
                  <Text style={partySyncStyles.stepText}>Host creates a party room</Text>
                </View>
                <View style={partySyncStyles.infoStep}>
                  <View style={partySyncStyles.stepNumber}>
                    <Text style={partySyncStyles.stepNumberText}>2</Text>
                  </View>
                  <Text style={partySyncStyles.stepText}>Friends join using the party code</Text>
                </View>
                <View style={partySyncStyles.infoStep}>
                  <View style={partySyncStyles.stepNumber}>
                    <Text style={partySyncStyles.stepNumberText}>3</Text>
                  </View>
                  <Text style={partySyncStyles.stepText}>All devices sync to the host's rhythm</Text>
                </View>
              </View>
            </NeonContainer>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>);
  }

  return (<LinearGradient colors={['#0A0A0F', '#1A1A2E']} style={partySyncStyles.container}>
      <SafeAreaView style={partySyncStyles.safeArea}>
        <View style={partySyncStyles.header}>
          <View style={partySyncStyles.titleRow}>
            <Text style={partySyncStyles.title}>{isHost ? 'Hosting Party' : 'Joined Party'}</Text>
            {isHost && <Crown size={24} color="#06FFA5" />}
          </View>
          <Text style={partySyncStyles.subtitle}>
            {participants.filter(p => p.isConnected).length + 1} devices connected
          </Text>
        </View>

        <ScrollView style={partySyncStyles.content} showsVerticalScrollIndicator={false}>
          {isHost && (<NeonContainer style={partySyncStyles.partyCodeContainer} glowColor="#06FFA5">
              <View style={partySyncStyles.partyCodeHeader}>
                <Text style={partySyncStyles.partyCodeTitle}>Party Code</Text>
                <TouchableOpacity onPress={copyPartyCode} style={partySyncStyles.copyButton}>
                  <Copy size={16} color="#06FFA5" />
                </TouchableOpacity>
              </View>
              <Text style={partySyncStyles.partyCodeText}>{hostCode}</Text>
              <Text style={partySyncStyles.partyCodeSubtitle}>Share this code with friends</Text>
            </NeonContainer>)}

          <NeonContainer style={partySyncStyles.participantsContainer}>
            <Text style={partySyncStyles.participantsTitle}>Participants</Text>
            <View style={partySyncStyles.participantsList}>
              {/* Host */}
              <View style={partySyncStyles.participantItem}>
                <View style={partySyncStyles.participantInfo}>
                  <View style={[partySyncStyles.statusIndicator, partySyncStyles.connectedStatus]} />
                  <Text style={partySyncStyles.participantName}>
                    {isHost ? 'You (Host)' : 'Host'}
                  </Text>
                  {isHost && <Crown size={16} color="#F59E0B" />}
                </View>
                <Text style={partySyncStyles.participantStatus}>Connected</Text>
              </View>

              {/* Participants */}
              {participants.map((participant) => (<View key={participant.id} style={partySyncStyles.participantItem}>
                  <View style={partySyncStyles.participantInfo}>
                    <View
                      style={[partySyncStyles.statusIndicator, participant.isConnected ? partySyncStyles.connectedStatus : partySyncStyles.disconnectedStatus]}
                    />
                    <Text style={partySyncStyles.participantName}>{participant.name}</Text>
                  </View>
                  <Text
                    style={[partySyncStyles.participantStatus, !participant.isConnected && partySyncStyles.disconnectedText]}>
                    {participant.isConnected ? 'Connected' : 'Disconnected'}
                  </Text>
                </View>))}
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
              onPress={syncTestFlash}
              variant="secondary"
              size="medium"
              style={partySyncStyles.syncButton}
            />
          </NeonContainer>

          <GlowButton
            title="Leave Party"
            onPress={leaveParty}
            variant="danger"
            size="large"
            style={partySyncStyles.leaveButton}
          />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>);
}
