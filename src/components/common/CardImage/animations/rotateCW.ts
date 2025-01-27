import { Animated, Easing } from 'react-native';

const getAnimationConfig = (toValue: number) => ({
  toValue,
  duration: 500,
  easing: Easing.bezier(0.25, 1, 0.5, 1),
  useNativeDriver: true,
});

export const getRotateCWRotateAmount = (rotateValue: Animated.Value) =>
  rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });
export const getRotateCWScaleAmount = (scaleValue: Animated.Value) =>
  scaleValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1.0, 0.75],
  });

export const getForwardRotateCWAnimation = (
  rotateValue: Animated.Value,
  scaleValue: Animated.Value
) =>
  Animated.parallel([
    Animated.timing(rotateValue, getAnimationConfig(1)),
    Animated.timing(scaleValue, getAnimationConfig(1)),
  ]);
export const getReverseRotateCWAnimation = (
  rotateValue: Animated.Value,
  scaleValue: Animated.Value
) =>
  Animated.parallel([
    Animated.timing(rotateValue, getAnimationConfig(0)),
    Animated.timing(scaleValue, getAnimationConfig(0)),
  ]);
