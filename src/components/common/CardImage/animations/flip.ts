import { Animated, Easing } from 'react-native';

const forwardFlipValue = new Animated.Value(0);
const getAnimationConfig = (toValue) => ({
  toValue,
  duration: 1000,
  easing: Easing.bezier(0.16, 1, 0.3, 1),
  useNativeDriver: true,
});

export const forwardFlip = forwardFlipValue.interpolate({
  inputRange: [0, 1],
  outputRange: ['0deg', '180deg'],
});

export const forwardFlipAnimation = Animated.timing(forwardFlipValue, getAnimationConfig(1));
export const reverseFlipAnimation = Animated.timing(forwardFlipValue, getAnimationConfig(0));
