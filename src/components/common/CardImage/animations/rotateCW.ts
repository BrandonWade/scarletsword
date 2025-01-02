import { Animated, Easing } from 'react-native';

const forwardRotateCWRotateValue = new Animated.Value(0);
const forwardRotateCWScaleValue = new Animated.Value(0);
const getAnimationConfig = (toValue) => ({
  toValue,
  duration: 500,
  easing: Easing.bezier(0.25, 1, 0.5, 1),
  useNativeDriver: true,
});

export const forwardRotateCWRotate = forwardRotateCWRotateValue.interpolate({
  inputRange: [0, 1],
  outputRange: ['0deg', '90deg'],
});
export const forwardRotateCWScale = forwardRotateCWScaleValue.interpolate({
  inputRange: [0, 1],
  outputRange: [1.0, 0.8],
});

export const forwardRotateCWAnimation = Animated.parallel([
  Animated.timing(forwardRotateCWRotateValue, getAnimationConfig(1)),
  Animated.timing(forwardRotateCWScaleValue, getAnimationConfig(1)),
]);
export const reverseRotateCWAnimation = Animated.parallel([
  Animated.timing(forwardRotateCWRotateValue, getAnimationConfig(0)),
  Animated.timing(forwardRotateCWScaleValue, getAnimationConfig(0)),
]);
