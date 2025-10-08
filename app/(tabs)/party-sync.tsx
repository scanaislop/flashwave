import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { partySyncStyles } from '@/components/styles/partySync';
import { usePartySync } from '@/hooks/usePartySync';
import { PartySyncHeader } from '@/components/partySync/PartySyncHeader';
import { PartySyncLobby } from '@/components/partySync/PartySyncLobby';
import { PartySyncConnected } from '@/components/partySync/PartySyncConnected';

const gradientColors: readonly [string, string] = ['#0A0A0F', '#1A1A2E'];

export default function PartySyncScreen() {
  const {
    isConnected,
    isHost,
    partyCode,
    participants,
    hostCode,
    setPartyCode,
    createPartyRoom,
    joinPartyRoom,
    leaveParty,
    syncTestFlash,
    copyPartyCode,
  } = usePartySync();

  return (
    <LinearGradient colors={gradientColors} style={partySyncStyles.container}>
      <SafeAreaView style={partySyncStyles.safeArea} edges={['right', 'left', 'top']}>
        <PartySyncHeader />
        {isConnected ? (
          <PartySyncConnected
            isHost={isHost}
            hostCode={hostCode}
            participants={participants}
            onCopyCode={copyPartyCode}
            onSyncTest={syncTestFlash}
            onLeave={leaveParty}
          />
        ) : (
          <PartySyncLobby
            partyCode={partyCode}
            onCodeChange={setPartyCode}
            onCreateRoom={createPartyRoom}
            onJoinRoom={joinPartyRoom}
          />
        )}
      </SafeAreaView>
    </LinearGradient>
  );
}
