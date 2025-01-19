import { Animated, Easing } from 'react-native';

const getAnimationConfig = (toValue) => ({
  toValue,
  duration: 1000,
  easing: Easing.bezier(0.22, 1, 0.36, 1),
  useNativeDriver: true,
});

export const getFrontTransformAmount = (frontTransformValue) =>
  frontTransformValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-180deg'],
  });
export const getBackTransformAmount = (backTransformValue) =>
  backTransformValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '0deg'],
  });

export const getForwardTransformAnimation = (frontTransformValue, backTransformValue) =>
  Animated.parallel([
    Animated.timing(frontTransformValue, getAnimationConfig(1)),
    Animated.timing(backTransformValue, getAnimationConfig(1)),
  ]);
export const getReverseTransformAnimation = (frontTransformValue, backTransformValue) =>
  Animated.parallel([
    Animated.timing(frontTransformValue, getAnimationConfig(0)),
    Animated.timing(backTransformValue, getAnimationConfig(0)),
  ]);
