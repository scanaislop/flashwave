import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Timer, TimerOff } from 'lucide-react-native';
import Slider from '@react-native-community/slider';
import { strobeStyles } from '@/components/styles/strobe';

export const TimerControls = ({
    timerEnabled,
    timerMinutes,
    currentColor,
    toggleTimer,
    handleTimerChange
}: {
    timerEnabled: boolean;
    timerMinutes: number;
    currentColor: any;
    toggleTimer: () => void;
    handleTimerChange: (value: number) => void
}) => (
    <View style={strobeStyles.controlSection}>
        <Text style={strobeStyles.controlLabel}>Timer</Text>
        <View style={strobeStyles.hardwareControls}>
            <TouchableOpacity
                onPress={toggleTimer}
                style={[strobeStyles.hardwareButton, timerEnabled && {
                    backgroundColor: `${currentColor.color}30`, borderColor: currentColor.color
                }]}
            >
                {timerEnabled ? (
                    <Timer size={20} color={currentColor.color} />
                ) : (
                    <TimerOff size={20} color="#94A3B8" />
                )}
                <Text style={[strobeStyles.hardwareButtonText, timerEnabled && { color: currentColor.color }]}>
                    {timerEnabled ? `${timerMinutes} min` : 'Off'}
                </Text>
            </TouchableOpacity>
            {timerEnabled && (
                <View style={strobeStyles.brightnessContainer}>
                    <View style={strobeStyles.brightnessHeader}>
                        <Text style={strobeStyles.brightnessLabel}>Duration: {timerMinutes} min</Text>
                    </View>
                    <Slider
                        style={strobeStyles.brightnessSlider}
                        minimumValue={1}
                        maximumValue={10}
                        step={1}
                        value={timerMinutes}
                        onValueChange={handleTimerChange}
                        minimumTrackTintColor={currentColor.color}
                        maximumTrackTintColor="#64748B"
                    />
                </View>
            )}
        </View>
    </View>
);
