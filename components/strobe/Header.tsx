import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ArrowLeft, EyeOff } from 'lucide-react-native';
import { strobeStyles } from '@/components/styles/strobe';

export const Header = ({ handleBack, handleToggleControls }: {
    handleBack: () => void; handleToggleControls: () => void
}) => (<View style={strobeStyles.header}>
    <TouchableOpacity onPress={handleBack} style={strobeStyles.headerButton}>
        <ArrowLeft size={24} color="#FFFFFF" />
    </TouchableOpacity>
    <Text style={strobeStyles.title}>STROBE MODE</Text>
    <TouchableOpacity onPress={handleToggleControls} style={strobeStyles.headerButton}>
        <EyeOff size={20} color="#FFFFFF" />
    </TouchableOpacity>
</View>);
