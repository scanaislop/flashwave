import { Text, View } from 'react-native';
import Slider from '@react-native-community/slider';
import NeonContainer from '@/components/shared/NeonContainer';
import { manualStyles } from '@/components/styles/manual';

interface ManualSpeedControlProps {
  value: number;
  onChange: (value: number) => void;
  disabled: boolean;
}

export const ManualSpeedControl = ({ value, onChange, disabled }: ManualSpeedControlProps) => (
  <NeonContainer style={manualStyles.speedContainer}>
    <Text style={manualStyles.speedLabel}>Strobe Speed: {Math.round(value * 100)}%</Text>
    <Slider
      style={manualStyles.slider}
      minimumValue={0.1}
      maximumValue={1}
      value={value}
      onValueChange={onChange}
      minimumTrackTintColor="#06FFA5"
      maximumTrackTintColor="#64748B"
      disabled={disabled}
    />
    <View style={manualStyles.speedLabels}>
      <Text style={manualStyles.speedLabel}>Slow</Text>
      <Text style={manualStyles.speedLabel}>Intense</Text>
    </View>
  </NeonContainer>
);
