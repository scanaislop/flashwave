import { useMemo, useState } from 'react';
import { mockParticipants } from '@/mocks/users';
import { ImpactStyles, triggerImpact } from '@/utils/haptics';
import { PartyParticipant } from '@/types/partySync';

const generateHostCode = () =>
  `FLASH${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

export const usePartySync = () => {
  const [isHost, setIsHost] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [partyCode, setPartyCode] = useState('');
  const [participants, setParticipants] = useState<PartyParticipant[]>(mockParticipants);

  const hostCode = useMemo(generateHostCode, []);

  const createPartyRoom = () => {
    triggerImpact(ImpactStyles.Medium);
    setIsHost(true);
    setIsConnected(true);
  };

  const joinPartyRoom = () => {
    if (!partyCode.trim()) return;
    triggerImpact(ImpactStyles.Medium);
    setIsHost(false);
    setIsConnected(true);
  };

  const leaveParty = () => {
    triggerImpact(ImpactStyles.Light);
    setIsHost(false);
    setIsConnected(false);
    setPartyCode('');
  };

  const syncTestFlash = () => {
    triggerImpact(ImpactStyles.Heavy);
  };

  const copyPartyCode = () => {
    triggerImpact(ImpactStyles.Light);
  };

  return {
    isHost,
    isConnected,
    partyCode,
    participants,
    hostCode,
    setPartyCode,
    setParticipants,
    createPartyRoom,
    joinPartyRoom,
    leaveParty,
    syncTestFlash,
    copyPartyCode,
  };
};
