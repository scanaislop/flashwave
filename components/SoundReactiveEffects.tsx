import { Animated, Dimensions, StyleSheet } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

export const SoundReactiveEffects = ({
  currentColor,
  waveAnimation,
  burstAnimation,
  flashAnimation,
  sustainedAnimation,
}: {
  currentColor: { color: string; };
  waveAnimation: Animated.Value;
  burstAnimation: Animated.Value;
  flashAnimation: Animated.Value;
  sustainedAnimation: Animated.Value;
}) => {
  const { width } = Dimensions.get('window');

  const waveScale = waveAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.6, 1.8]
  });

  const waveOpacity = waveAnimation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.2, 0.6, 0.2]
  });

  const burstScale = burstAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 2.5]
  });

  const burstOpacity = burstAnimation.interpolate({
    inputRange: [0, 0.3, 1],
    outputRange: [0, 0.8, 0]
  });

  const flashOpacity = flashAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.95]
  });

  const sustainedOpacity = sustainedAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.3]
  });

  const waveContainerStyle = StyleSheet.create({
    container: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: width * 1.8,
      height: width * 1.8,
      marginLeft: -(width * 0.9),
      marginTop: -(width * 0.9),
    },
    secondary: {
      width: width * 1.4,
      height: width * 1.4,
      marginLeft: -(width * 0.7),
      marginTop: -(width * 0.7),
    },
    wave: {
      flex: 1,
      borderRadius: width * 0.9,
    },
    burst: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: width * 2,
      height: width * 2,
      marginLeft: -width,
      marginTop: -width,
    },
    burstGradient: {
      flex: 1,
      borderRadius: width,
    }
  });

  return (<>
    <Animated.View
      style={[StyleSheet.absoluteFillObject, { backgroundColor: currentColor.color, opacity: sustainedOpacity }]}
      pointerEvents="none"
    />
    <Animated.View
      style={[waveContainerStyle.container, { transform: [{ scale: waveScale }], opacity: waveOpacity }]}
    >
      <LinearGradient
        colors={[`${currentColor.color}00`, `${currentColor.color}60`, `${currentColor.color}40`, `${currentColor.color}00`]}
        style={waveContainerStyle.wave}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
    </Animated.View>
    <Animated.View
      style={[waveContainerStyle.container, waveContainerStyle.secondary, {
        transform: [{ scale: waveScale.interpolate({ inputRange: [0, 1], outputRange: [0.42, 1.26] }) }],
        opacity: waveOpacity.interpolate({ inputRange: [0, 1], outputRange: [0, 0.7] })
      }]}
    >
      <LinearGradient
        colors={[`${currentColor.color}00`, `${currentColor.color}50`, `${currentColor.color}30`, `${currentColor.color}00`]}
        style={waveContainerStyle.wave}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
      />
    </Animated.View>
    <Animated.View
      style={[waveContainerStyle.burst, { transform: [{ scale: burstScale }], opacity: burstOpacity }]}
    >
      <LinearGradient
        colors={[`${currentColor.color}80`, `${currentColor.color}00`]}
        style={waveContainerStyle.burstGradient}
      />
    </Animated.View>
    <Animated.View
      style={[StyleSheet.absoluteFillObject, { backgroundColor: currentColor.color, opacity: flashOpacity }]}
      pointerEvents="none"
    />
  </>);
};