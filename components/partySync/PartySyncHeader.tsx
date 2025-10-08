import { Text, View } from 'react-native';
import { partySyncStyles } from '@/components/styles/partySync';

export const PartySyncHeader = () => (
  <View style={partySyncStyles.header}>
    <Text style={partySyncStyles.title}>Party Sync</Text>
    <Text style={partySyncStyles.subtitle}>
      Connect devices for synchronized light shows
    </Text>
  </View>
);
