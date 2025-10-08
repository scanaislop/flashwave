import { Text, View } from 'react-native';
import Slider from '@react-native-community/slider';
import { settingsStyles } from '@/components/styles/settings';

interface SettingSliderRowProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  minLabel: string;
  maxLabel: string;
  minimumValue: number;
  maximumValue: number;
  step?: number;
  trackColor?: string;
}

export const SettingSliderRow = ({
  label,
  value,
  onChange,
  minLabel,
  maxLabel,
  minimumValue,
  maximumValue,
  step = 1,
  trackColor = '#F59E0B',
}: SettingSliderRowProps) => (
  <View style={settingsStyles.settingItem}>
    <Text style={settingsStyles.settingLabel}>{label}</Text>
    <Slider
      style={settingsStyles.slider}
      minimumValue={minimumValue}
      maximumValue={maximumValue}
      value={value}
      step={step}
      onValueChange={onChange}
      minimumTrackTintColor={trackColor}
      maximumTrackTintColor="#64748B"
    />
    <View style={settingsStyles.sliderLabels}>
      <Text style={settingsStyles.sliderLabel}>{minLabel}</Text>
      <Text style={settingsStyles.sliderLabel}>{maxLabel}</Text>
    </View>
  </View>
);
