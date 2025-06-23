import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Zap } from 'lucide-react-native';
import { strobeStyles } from '@/components/styles/strobe';

export const ColorSelection = ({ selectedColor, setSelectedColor, strobeColors }: {
    selectedColor: number; setSelectedColor: (value: number) => void; strobeColors: any
}) => (<View style={strobeStyles.controlSection}>
    <Text style={strobeStyles.controlLabel}>Color</Text>
    <View style={strobeStyles.colorGrid}>
        {strobeColors.map((color: any, index: number) => (<TouchableOpacity
            key={index}
            onPress={() => setSelectedColor(index)}
            style={[strobeStyles.colorItem, { backgroundColor: color.color }, selectedColor === index && strobeStyles.selectedColorItem]}
        >
            {selectedColor === index && <Zap size={16} color={color.color === '#FFFFFF' ? '#000000' : '#FFFFFF'} />}
            {index === 6 && (<LinearGradient
                colors={['#FF0080', '#FF8000', '#FFFF00', '#80FF00', '#00FF80', '#0080FF']}
                style={strobeStyles.rainbowGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            />)}
        </TouchableOpacity>))}
    </View>
</View>);
