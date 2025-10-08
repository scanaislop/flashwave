import { StyleSheet } from 'react-native';
import { partySyncBaseStyles } from './base';
import { partySyncLobbyStyles } from './lobby';
import { partySyncConnectedStyles } from './connected';

export const partySyncStyles = StyleSheet.create<Record<string, any>>({
  ...partySyncBaseStyles,
  ...partySyncLobbyStyles,
  ...partySyncConnectedStyles,
});
