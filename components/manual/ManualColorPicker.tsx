import { Text, TouchableOpacity, View } from 'react-native';
import NeonContainer from '@/components/shared/NeonContainer';
import { manualStyles } from '@/components/styles/manual';
import { strobeColors } from '@/constants/color';

interface ManualColorPickerProps {
  selectedColor: number;
  onSelect: (index: number) => void;
}

export const ManualColorPicker = ({ selectedColor, onSelect }: ManualColorPickerProps) => (
  <NeonContainer>
    <Text style={manualStyles.colorTitle}>Flash Color</Text>
    <View style={manualStyles.colorGrid}>
      {strobeColors.map((color, index) => (
        <TouchableOpacity
          key={color.name + index}
          onPress={() => onSelect(index)}
          style={[
            manualStyles.colorItem,
            { backgroundColor: color.color },
            selectedColor === index && manualStyles.selectedColor,
          ]}
        >
          {selectedColor === index && <Text style={manualStyles.colorCheck}>✓</Text>}
        </TouchableOpacity>
      ))}
    </View>
  </NeonContainer>
);
