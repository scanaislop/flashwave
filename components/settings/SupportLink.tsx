import { ReactNode } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { settingsStyles } from '@/components/styles/settings';

interface SupportLinkProps {
  icon: ReactNode;
  title: string;
  description: string;
  onPress: () => void;
}

export const SupportLink = ({ icon, title, description, onPress }: SupportLinkProps) => (
  <TouchableOpacity onPress={onPress} style={settingsStyles.supportItem}>
    {icon}
    <View style={settingsStyles.supportText}>
      <Text style={settingsStyles.supportTitle}>{title}</Text>
      <Text style={settingsStyles.supportDescription}>{description}</Text>
    </View>
  </TouchableOpacity>
);
