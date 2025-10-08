import { Dimensions, ViewStyle } from 'react-native';

type StyleRecord = Record<string, ViewStyle>;

const { width } = Dimensions.get('window');

export const strobeEffectStyles: StyleRecord = {
  waveContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: width * 1.8,
    height: width * 1.8,
    marginLeft: -(width * 0.9),
    marginTop: -(width * 0.9),
  },
  secondaryWave: {
    width: width * 1.4,
    height: width * 1.4,
    marginLeft: -(width * 0.7),
    marginTop: -(width * 0.7),
  },
  wave: {
    flex: 1,
    borderRadius: width * 0.9,
  },
  burstContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: width * 2,
    height: width * 2,
    marginLeft: -width,
    marginTop: -width,
  },
  burst: {
    flex: 1,
    borderRadius: width,
  },
};
