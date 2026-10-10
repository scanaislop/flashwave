import { Text, TouchableOpacity, View } from 'react-native';
import { strobeStyles } from '@/components/styles/strobe';

export const SustainedModeToggle = ({ sustainedMode, currentColor, setSustainedMode }: {
    sustainedMode: boolean; currentColor: any; setSustainedMode: (value: boolean) => void
}) => (<View style={strobeStyles.controlSection}>
    <TouchableOpacity
        onPress={() => setSustainedMode(!sustainedMode)}
        style={[strobeStyles.sustainedToggle, sustainedMode && {
            backgroundColor: `${currentColor.color}30`, borderColor: currentColor.color
        }]}
    >
        <Text style={[strobeStyles.sustainedText, sustainedMode && { color: currentColor.color }]}>
            {sustainedMode ? '✓ Sustained Glow' : 'Sustained Glow'}
        </Text>
    </TouchableOpacity>
</View>);
