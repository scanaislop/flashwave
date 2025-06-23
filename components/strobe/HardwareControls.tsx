import React from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import { Flashlight, FlashlightOff, Sun, SunDim } from 'lucide-react-native';
import Slider from '@react-native-community/slider';
import { strobeStyles } from '@/components/styles/strobe';

export const HardwareControls = ({
    flashlightEnabled,
    screenBrightness,
    currentColor,
    torchAvailable,
    toggleFlashlight,
    handleBrightnessChange
}: {
    flashlightEnabled: boolean;
    screenBrightness: number;
    currentColor: any;
    torchAvailable: boolean;
    toggleFlashlight: () => void;
    handleBrightnessChange: (value: number) => void
}) => (<View style={strobeStyles.controlSection}>
    <Text style={strobeStyles.controlLabel}>Hardware Controls</Text>
    <View style={strobeStyles.hardwareControls}>
        <TouchableOpacity
            onPress={toggleFlashlight}
            style={[strobeStyles.hardwareButton, flashlightEnabled && {
                backgroundColor: `${currentColor.color}30`, borderColor: currentColor.color
            }]}
        >
            {flashlightEnabled ? (<Flashlight size={20} color={currentColor.color} />) : (
                <FlashlightOff size={20} color="#94A3B8" />)}
            <Text style={[strobeStyles.hardwareButtonText, flashlightEnabled && { color: currentColor.color }]}>
                Flashlight {!torchAvailable && Platform.OS !== 'web' && '(N/A)'}
            </Text>
        </TouchableOpacity>
        <View style={strobeStyles.brightnessContainer}>
            <View style={strobeStyles.brightnessHeader}>
                <SunDim size={16} color="#94A3B8" />
                <Text style={strobeStyles.brightnessLabel}>Screen: {Math.round(screenBrightness * 100)}%</Text>
                <Sun size={16} color={currentColor.color} />
            </View>
            <Slider
                style={strobeStyles.brightnessSlider}
                minimumValue={0.1}
                maximumValue={1.0}
                value={screenBrightness}
                onValueChange={handleBrightnessChange}
                minimumTrackTintColor={currentColor.color}
                maximumTrackTintColor="#64748B"
            />
        </View>
    </View>
</View>);
