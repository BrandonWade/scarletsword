import { Animated, Easing } from 'react-native';

const getAnimationConfig = (toValue) => ({
  toValue,
  duration: 500,
  easing: Easing.bezier(0.25, 1, 0.5, 1),
  useNativeDriver: true,
});

export const getRotateCWRotateAmount = (rotateValue) =>
  rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });
export const getRotateCWScaleAmount = (scaleValue) =>
  scaleValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1.0, 0.8],
  });

export const getForwardRotateCWAnimation = (rotateValue, scaleValue) =>
  Animated.parallel([
    Animated.timing(rotateValue, getAnimationConfig(1)),
    Animated.timing(scaleValue, getAnimationConfig(1)),
  ]);
export const getReverseRotateCWAnimation = (rotateValue, scaleValue) =>
  Animated.parallel([
    Animated.timing(rotateValue, getAnimationConfig(0)),
    Animated.timing(scaleValue, getAnimationConfig(0)),
  ]);
