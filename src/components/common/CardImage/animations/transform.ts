import { Animated, Easing } from 'react-native';

const forwardTransformValue = new Animated.Value(0);
const reverseTransformValue = new Animated.Value(0);
const getAnimationConfig = (toValue) => ({
  toValue,
  duration: 1000,
  easing: Easing.bezier(0.22, 1, 0.36, 1),
  useNativeDriver: true,
});

export const forwardTransform = forwardTransformValue.interpolate({
  inputRange: [0, 1],
  outputRange: ['0deg', '-180deg'],
});
export const reverseTransform = reverseTransformValue.interpolate({
  inputRange: [0, 1],
  outputRange: ['180deg', '0deg'],
});

export const forwardTransformAnimation = Animated.parallel([
  Animated.timing(forwardTransformValue, getAnimationConfig(1)),
  Animated.timing(reverseTransformValue, getAnimationConfig(1)),
]);
export const reverseTransformAnimation = Animated.parallel([
  Animated.timing(forwardTransformValue, getAnimationConfig(0)),
  Animated.timing(reverseTransformValue, getAnimationConfig(0)),
]);
