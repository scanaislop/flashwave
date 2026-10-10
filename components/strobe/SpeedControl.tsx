import { Text, View } from 'react-native';
import Slider from '@react-native-community/slider';
import { strobeStyles } from '@/components/styles/strobe';

export const SpeedControl = ({ strobeSpeed, currentColor, setStrobeSpeed }: {
    strobeSpeed: number; currentColor: any; setStrobeSpeed: (value: number) => void
}) => (<View style={strobeStyles.controlSection}>
    <Text style={strobeStyles.controlLabel}>Speed: {Math.round(strobeSpeed * 100)}%</Text>
    <Slider
        style={strobeStyles.slider}
        minimumValue={0.1}
        maximumValue={1.0}
        value={strobeSpeed}
        onValueChange={setStrobeSpeed}
        minimumTrackTintColor={currentColor.color}
        maximumTrackTintColor="#64748B"
    />
</View>);
