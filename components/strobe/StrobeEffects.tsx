import { Animated, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { strobeStyles } from '@/components/styles/strobe';

export const StrobeEffects = ({
    currentColor,
    waveAnimation,
    burstAnimation,
    flashAnimation,
    sustainedAnimation,
    sustainedMode
}: {
    currentColor: any;
    waveAnimation: any;
    burstAnimation: any;
    flashAnimation: any;
    sustainedAnimation: any;
    sustainedMode: boolean
}) => {
    const waveScale = waveAnimation.interpolate({
        inputRange: [0, 1], outputRange: [0.6, 1.8]
    });

    const waveOpacity = waveAnimation.interpolate({
        inputRange: [0, 0.5, 1], outputRange: [0.2, 0.6, 0.2]
    });

    const burstScale = burstAnimation.interpolate({
        inputRange: [0, 1], outputRange: [1, 2.5]
    });

    const burstOpacity = burstAnimation.interpolate({
        inputRange: [0, 0.3, 1], outputRange: [0, 0.8, 0]
    });

    const flashOpacity = flashAnimation.interpolate({
        inputRange: [0, 1], outputRange: [0, 0.95]
    });

    const sustainedOpacity = sustainedAnimation.interpolate({
        inputRange: [0, 1], outputRange: [0, 0.3]
    });

    return (<>
        {sustainedMode && (<Animated.View
            style={[StyleSheet.absoluteFillObject, { backgroundColor: currentColor.color, opacity: sustainedOpacity }]}
            pointerEvents="none"
        />)}
        <Animated.View
            style={[strobeStyles.waveContainer, { transform: [{ scale: waveScale }], opacity: waveOpacity }]}
        >
            <LinearGradient
                colors={[`${currentColor.color}00`, `${currentColor.color}60`, `${currentColor.secondary}40`, `${currentColor.color}00`]}
                style={strobeStyles.wave}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            />
        </Animated.View>
        <Animated.View
            style={[strobeStyles.waveContainer, strobeStyles.secondaryWave, {
                transform: [{ scale: 0.7 * waveScale }], opacity: waveOpacity * 0.7
            }]}
        >
            <LinearGradient
                colors={[`${currentColor.secondary}00`, `${currentColor.secondary}50`, `${currentColor.color}30`, `${currentColor.secondary}00`]}
                style={strobeStyles.wave}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
            />
        </Animated.View>
        <Animated.View
            style={[strobeStyles.burstContainer, { transform: [{ scale: burstScale }], opacity: burstOpacity }]}
        >
            <LinearGradient
                colors={[`${currentColor.color}80`, `${currentColor.color}00`]}
                style={strobeStyles.burst}
            />
        </Animated.View>
        <Animated.View
            style={[StyleSheet.absoluteFillObject, { backgroundColor: currentColor.color, opacity: flashOpacity }]}
            pointerEvents="none"
        />
    </>);
};
