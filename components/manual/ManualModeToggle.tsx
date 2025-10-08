import { Switch, Text, View } from 'react-native';
import { Zap, Hand } from 'lucide-react-native';
import NeonContainer from '@/components/shared/NeonContainer';
import { manualStyles } from '@/components/styles/manual';

interface ManualModeToggleProps {
  isManualMode: boolean;
  onToggle: () => void;
}

export const ManualModeToggle = ({ isManualMode, onToggle }: ManualModeToggleProps) => (
  <NeonContainer style={manualStyles.modeContainer}>
    <Text style={manualStyles.modeTitle}>Strobe Mode</Text>
    <View style={manualStyles.modeToggle}>
      <View style={manualStyles.modeOption}>
        <Zap size={20} color={!isManualMode ? '#06FFA5' : '#64748B'} />
        <Text style={[manualStyles.modeText, !isManualMode && manualStyles.activeModeText]}>Auto</Text>
      </View>

      <Switch
        value={isManualMode}
        onValueChange={onToggle}
        trackColor={{ false: '#06FFA5', true: '#F59E0B' }}
        thumbColor="#FFFFFF"
      />

      <View style={manualStyles.modeOption}>
        <Hand size={20} color={isManualMode ? '#F59E0B' : '#64748B'} />
        <Text style={[manualStyles.modeText, isManualMode && manualStyles.activeModeText]}>Manual</Text>
      </View>
    </View>
  </NeonContainer>
);
