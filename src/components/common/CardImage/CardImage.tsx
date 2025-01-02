import { Entypo } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import { forwardFlip, forwardFlipAnimation, reverseFlipAnimation } from './animations/flip';
import {
  forwardRotateCWRotate,
  forwardRotateCWScale,
  forwardRotateCWAnimation,
  reverseRotateCWAnimation,
} from './animations/rotateCW';
import {
  forwardTransform,
  reverseTransform,
  forwardTransformAnimation,
  reverseTransformAnimation,
} from './animations/transform';
import styles from './styles';
import { CardImageProps } from './types';

export default function CardImage({ style, card, onPress, onLongPress }: CardImageProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isRotatedCW, setIsRotatedCW] = useState(false);
  const [isTransformed, setIsTransformed] = useState(false);
  const [front, back] = card?.faces ? JSON.parse(card.faces) : [];
  const canFlip = ['flip'].includes(card?.layout);
  const canRotateCW = ['split'].includes(card?.layout);
  const canTransform = ['transform', 'double_faced_token', 'modal_dfc'].includes(card?.layout);

  useEffect(() => {
    if (isFlipped) {
      forwardFlipAnimation.start();
    } else {
      reverseFlipAnimation.start();
    }
  }, [isFlipped]);

  useEffect(() => {
    if (isRotatedCW) {
      forwardRotateCWAnimation.start();
    } else {
      reverseRotateCWAnimation.start();
    }
  }, [isRotatedCW]);

  useEffect(() => {
    if (isTransformed) {
      forwardTransformAnimation.start();
    } else {
      reverseTransformAnimation.start();
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
                    transform: [{ rotateZ: forwardFlip }],
                  }
                : null,
              canRotateCW
                ? {
                    transform: [
                      { rotateZ: forwardRotateCWRotate },
                      { scale: forwardRotateCWScale },
                    ],
                  }
                : null,
              canTransform
                ? {
                    transform: [{ rotateY: forwardTransform }],
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
                  transform: [{ rotateY: reverseTransform }],
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
