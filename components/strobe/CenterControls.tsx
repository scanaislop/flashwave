import { Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Pause, Play } from 'lucide-react-native';
import { strobeStyles } from '@/components/styles/strobe';

export const CenterControls = ({ isStrobing, currentColor, toggleStrobe }: {
    isStrobing: boolean; currentColor: any; toggleStrobe: () => void
}) => (<View style={strobeStyles.centerControls}>
    <TouchableOpacity onPress={toggleStrobe} style={[strobeStyles.playButton, { borderColor: currentColor.color }]}>
        <LinearGradient
            colors={isStrobing ? ['#EF4444', '#DC2626'] : [currentColor.color, `${currentColor.color}CC`]}
            style={strobeStyles.playButtonGradient}
        >
            {isStrobing ? <Pause size={32} color="#FFFFFF" /> : <Play size={32} color="#FFFFFF" />}
        </LinearGradient>
    </TouchableOpacity>
    <Text style={strobeStyles.playButtonText}>
        {isStrobing ? 'CONTROLS AUTO-HIDE IN 3 SECONDS' : 'TAP TO START STROBE'}
    </Text>
</View>);
