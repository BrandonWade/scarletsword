import { Entypo } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import {
  forwardTransform,
  reverseTransform,
  forwardTransformAnimation,
  reverseTransformAnimation,
} from './animations/transform';
import styles from './styles';
import { CardImageProps } from './types';

export default function CardImage({ style, card, onPress, onLongPress }: CardImageProps) {
  const [isTransformed, setIsTransformed] = useState(false);
  const [front, back] = card?.faces ? JSON.parse(card.faces) : [];
  const canTransform = ['transform', 'double_faced_token', 'modal_dfc'].includes(card?.layout);

  useEffect(() => {
    if (isTransformed) {
      forwardTransformAnimation.start();
    } else {
      reverseTransformAnimation.start();
    }
  }, [isTransformed]);

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
        <Animated.View style={[styles.image, style]}>
          <Animated.Image
            style={[
              styles.image,
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
          {back ? (
            <Animated.Image
              style={[
                styles.image,
                canTransform
                  ? {
                      position: 'absolute',
                      transform: [{ rotateY: reverseTransform }],
                      backfaceVisibility: 'hidden',
                    }
                  : null,
                style,
              ]}
              source={{ uri: back?.image_uri }}
              resizeMode='stretch'
            />
          ) : null}
        </Animated.View>
      )}
      <View style={styles.actions}>
        {canTransform && (
          <TouchableOpacity onPress={onPressTransform}>
            <View style={styles.actionButton}>
              <Entypo name='cycle' size={16} />
              <Text>Transform</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
