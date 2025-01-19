import { Entypo } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import { getFlipAmount, getForwardFlipAnimation, getReverseFlipAnimation } from './animations/flip';
import {
  getRotateCWRotateAmount,
  getRotateCWScaleAmount,
  getForwardRotateCWAnimation,
  getReverseRotateCWAnimation,
} from './animations/rotateCW';
import {
  getFrontTransformAmount,
  getBackTransformAmount,
  getForwardTransformAnimation,
  getReverseTransformAnimation,
} from './animations/transform';
import styles from './styles';
import { CardImageProps } from './types';

export default function CardImage({ style, card, onPress, onLongPress }: CardImageProps) {
  const [flipValue] = useState(new Animated.Value(0));
  const [rotateCWRotateValue] = useState(new Animated.Value(0));
  const [rotateCWScaleValue] = useState(new Animated.Value(0));
  const [frontTransformValue] = useState(new Animated.Value(0));
  const [backTransformValue] = useState(new Animated.Value(0));
  const [isFlipped, setIsFlipped] = useState(false);
  const [isRotatedCW, setIsRotatedCW] = useState(false);
  const [isTransformed, setIsTransformed] = useState(false);
  const [front, back] = card?.faces ? JSON.parse(card.faces) : [];
  const canFlip = ['flip'].includes(card?.layout);
  const canRotateCW = ['split'].includes(card?.layout);
  const canTransform = ['transform', 'double_faced_token', 'modal_dfc'].includes(card?.layout);

  useEffect(() => {
    if (isFlipped) {
      getForwardFlipAnimation(flipValue).start();
    } else {
      getReverseFlipAnimation(flipValue).start();
    }
  }, [isFlipped]);

  useEffect(() => {
    if (isRotatedCW) {
      getForwardRotateCWAnimation(rotateCWRotateValue, rotateCWScaleValue).start();
    } else {
      getReverseRotateCWAnimation(rotateCWRotateValue, rotateCWScaleValue).start();
    }
  }, [isRotatedCW]);

  useEffect(() => {
    if (isTransformed) {
      getForwardTransformAnimation(frontTransformValue, backTransformValue).start();
    } else {
      getReverseTransformAnimation(frontTransformValue, backTransformValue).start();
    }
  }, [isTransformed]);

  const onPressFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const onPressRotateCW = () => {
    setIsRotatedCW(!isRotatedCW);
  };

  const onPressTransform = () => {
    setIsTransformed(!isTransformed);
  };

  const onPressImage = () => {
    onPress?.(card.id);
  };

  const onLongPressImage = () => {
    onLongPress?.(card.id);
  };

  const withPressHandler = (children) => {
    if (!onPress && !onLongPress) {
      return children;
    }

    return (
      <TouchableOpacity onPress={onPressImage} onLongPress={onLongPressImage}>
        {children}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {withPressHandler(
        <Animated.View>
          <Animated.Image
            style={[
              styles.image,
              canFlip
                ? {
                    transform: [{ rotateZ: getFlipAmount(flipValue) }],
                  }
                : null,
              canRotateCW
                ? {
                    transform: [
                      { rotateZ: getRotateCWRotateAmount(rotateCWRotateValue) },
                      { scale: getRotateCWScaleAmount(rotateCWScaleValue) },
                    ],
                  }
                : null,
              canTransform
                ? {
                    transform: [{ rotateY: getFrontTransformAmount(frontTransformValue) }],
                    backfaceVisibility: 'hidden',
                  }
                : null,
              style,
            ]}
            source={{ uri: front?.image_uri }}
            resizeMode='stretch'
          />
          {canTransform && back ? (
            <Animated.Image
              style={[
                styles.image,
                {
                  position: 'absolute',
                  transform: [{ rotateY: getBackTransformAmount(backTransformValue) }],
                  backfaceVisibility: 'hidden',
                },
                style,
              ]}
              source={{ uri: back?.image_uri }}
              resizeMode='stretch'
            />
          ) : null}
        </Animated.View>
      )}
      <View style={styles.actions}>
        {canFlip && (
          <TouchableOpacity onPress={onPressFlip}>
            <View style={styles.actionButton}>
              <Entypo name='cycle' size={16} />
              <Text>Flip</Text>
            </View>
          </TouchableOpacity>
        )}
        {canRotateCW && (
          <TouchableOpacity onPress={onPressRotateCW}>
            <View style={styles.actionButton}>
              <Entypo name='cw' size={16} />
              <Text>Rotate</Text>
            </View>
          </TouchableOpacity>
        )}
        {canTransform && (
          <TouchableOpacity onPress={onPressTransform}>
            <View style={styles.actionButton}>
              <Entypo name='retweet' size={16} />
              <Text>Transform</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
