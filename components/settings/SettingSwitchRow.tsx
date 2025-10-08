import { Switch, Text, View } from 'react-native';
import { settingsStyles } from '@/components/styles/settings';

interface SettingSwitchRowProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
  description?: string;
  trackColor?: { false: string; true: string };
  thumbColor?: string;
}

export const SettingSwitchRow = ({
  label,
  value,
  onChange,
  description,
  trackColor,
  thumbColor = '#FFFFFF',
}: SettingSwitchRowProps) => (
  <View style={settingsStyles.settingItem}>
    <View style={settingsStyles.settingRow}>
      <Text style={settingsStyles.settingLabel}>{label}</Text>
      <Switch value={value} onValueChange={onChange} trackColor={trackColor} thumbColor={thumbColor} />
    </View>
    {description && <Text style={settingsStyles.settingDescription}>{description}</Text>}
  </View>
);
