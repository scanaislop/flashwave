import React from 'react';
import { Animated, TouchableOpacity, Platform } from 'react-native';
import { Settings } from 'lucide-react-native';

export const ToggleControlsIcon = ({ toggleIconOpacity, currentColor, handleToggleControls }: {
    toggleIconOpacity: any; currentColor: any; handleToggleControls: () => void
}) => (
    <Animated.View style={[
        {
            position: 'absolute',
            top: Platform.OS === 'ios' ? 50 : 30,
            right: 20,
            zIndex: 1000,
        },
        { opacity: toggleIconOpacity }
    ]}>
        <TouchableOpacity
            onPress={handleToggleControls}
            style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Settings size={20} color={currentColor.color === '#FFFFFF' ? '#000000' : '#FFFFFF'} />
        </TouchableOpacity>
    </Animated.View>
);
