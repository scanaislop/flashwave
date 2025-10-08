import { Switch, Text, View } from 'react-native';
import Slider from '@react-native-community/slider';
import { Timer } from 'lucide-react-native';
import NeonContainer from '@/components/shared/NeonContainer';
import { manualStyles } from '@/components/styles/manual';

interface ManualTimerSettingsProps {
  enabled: boolean;
  minutes: number;
  onToggle: (value: boolean) => void;
  onChange: (value: number) => void;
}

export const ManualTimerSettings = ({ enabled, minutes, onToggle, onChange }: ManualTimerSettingsProps) => (
  <NeonContainer style={manualStyles.timerContainer}>
    <View style={manualStyles.timerHeader}>
      <Timer size={20} color="#F59E0B" />
      <Text style={manualStyles.timerTitle}>Auto-Stop Timer</Text>
      <Switch
        value={enabled}
        onValueChange={onToggle}
        trackColor={{ false: '#64748B', true: '#F59E0B' }}
        thumbColor="#FFFFFF"
      />
    </View>

    {enabled && (
      <View style={manualStyles.timerControls}>
        <Text style={manualStyles.timerLabel}>Duration: {minutes} minutes</Text>
        <Slider
          style={manualStyles.slider}
          minimumValue={1}
          maximumValue={30}
          step={1}
          value={minutes}
          onValueChange={onChange}
          minimumTrackTintColor="#F59E0B"
          maximumTrackTintColor="#64748B"
        />
      </View>
    )}
  </NeonContainer>
);
