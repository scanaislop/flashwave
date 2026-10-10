import { Text, TouchableOpacity, View } from 'react-native';
import { strobeStyles } from '@/components/styles/strobe';
import { strobeEffectTypes } from '@/constants/color';

export const EffectSelection = ({ selectedEffect, currentColor, setSelectedEffect }: {
    selectedEffect: number; currentColor: any; setSelectedEffect: (value: number) => void
}) => (<View style={strobeStyles.controlSection}>
    <Text style={strobeStyles.controlLabel}>Effect Type</Text>
    <View style={strobeStyles.effectGrid}>
        {strobeEffectTypes.map((effect, index) => (<TouchableOpacity
            key={effect.id}
            onPress={() => setSelectedEffect(index)}
            style={[strobeStyles.effectItem, selectedEffect === index && {
                backgroundColor: `${currentColor.color}30`, borderColor: currentColor.color
            }]}
        >
            <effect.icon size={16} color={selectedEffect === index ? currentColor.color : '#94A3B8'} />
            <Text style={[strobeStyles.effectText, selectedEffect === index && { color: currentColor.color }]}>
                {effect.name}
            </Text>
        </TouchableOpacity>))}
    </View>
</View>);
