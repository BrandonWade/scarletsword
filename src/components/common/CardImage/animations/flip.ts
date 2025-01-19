import { Animated, Easing } from 'react-native';

const getAnimationConfig = (toValue) => ({
  toValue,
  duration: 1000,
  easing: Easing.bezier(0.16, 1, 0.3, 1),
  useNativeDriver: true,
});

export const getFlipAmount = (flipValue) =>
  flipValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

export const getForwardFlipAnimation = (flipValue) =>
  Animated.timing(flipValue, getAnimationConfig(1));
export const getReverseFlipAnimation = (flipValue) =>
  Animated.timing(flipValue, getAnimationConfig(0));
