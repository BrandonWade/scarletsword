import { Animated, Easing } from 'react-native';

const getAnimationConfig = (toValue: number) => ({
  toValue,
  duration: 1000,
  easing: Easing.bezier(0.16, 1, 0.3, 1),
  useNativeDriver: true,
});

export const getFlipAmount = (flipValue: Animated.Value) =>
  flipValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

export const getForwardFlipAnimation = (flipValue: Animated.Value) =>
  Animated.timing(flipValue, getAnimationConfig(1));
export const getReverseFlipAnimation = (flipValue: Animated.Value) =>
  Animated.timing(flipValue, getAnimationConfig(0));
