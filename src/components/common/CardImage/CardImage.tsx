import { useEffect, useState } from 'react';
import { Animated, View } from 'react-native';
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
import ActionButton from './ActionButton';
import styles from './styles';
import { CardImageProps } from './types';
import NumberInputField from '../NumberInputField';
import withPressHandler from '../../../utils/hocs/withPressHandler';

export default function CardImage({
  style,
  card,
  isBookmarked,
  deckID,
  count,
  shouldOverlayActions = false,
  onPress,
  onLongPress,
  onAddBookmark,
  onRemoveBookmark,
  onChangeCount,
}: CardImageProps) {
  const [flipValue] = useState<Animated.Value>(new Animated.Value(0));
  const [rotateCWRotateValue] = useState<Animated.Value>(new Animated.Value(0));
  const [rotateCWScaleValue] = useState<Animated.Value>(new Animated.Value(0));
  const [frontTransformValue] = useState<Animated.Value>(new Animated.Value(0));
  const [backTransformValue] = useState<Animated.Value>(new Animated.Value(0));
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [isRotatedCW, setIsRotatedCW] = useState<boolean>(false);
  const [isTransformed, setIsTransformed] = useState<boolean>(false);
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

  const onPressAddBookmark = () => {
    onAddBookmark(card?.id);
  };

  const onPressRemoveBookmark = () => {
    onRemoveBookmark(card?.id);
  };

  const onChangeCardCount = (count: number) => {
    onChangeCount(deckID, card.id, count);
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
        </Animated.View>,
        {
          onPress: onPress ? () => onPress?.(card.id) : undefined,
          onLongPress: onLongPress ? () => onLongPress?.(card.id) : undefined,
        }
      )}
      <View style={[styles.actions, shouldOverlayActions ? styles.actionsOverlay : {}]}>
        <View style={styles.actionRow}>
          {canFlip && (
            <ActionButton
              iconName='cycle'
              iconSize={16}
              isCompact={shouldOverlayActions}
              text='Flip'
              onPress={onPressFlip}
            />
          )}
          {canRotateCW && (
            <ActionButton
              iconName='cw'
              iconSize={16}
              isCompact={shouldOverlayActions}
              text='Rotate'
              onPress={onPressRotateCW}
            />
          )}
          {canTransform && (
            <ActionButton
              iconName='retweet'
              iconSize={16}
              isCompact={shouldOverlayActions}
              text='Transform'
              onPress={onPressTransform}
            />
          )}
          {isBookmarked ? (
            <ActionButton
              iconName='star'
              iconSize={16}
              isCompact={shouldOverlayActions}
              text='Remove Bookmark'
              onPress={onPressRemoveBookmark}
            />
          ) : (
            <ActionButton
              iconName='star-outlined'
              iconSize={16}
              isCompact={shouldOverlayActions}
              text='Add Bookmark'
              onPress={onPressAddBookmark}
            />
          )}
        </View>
        <View style={styles.actionRow}>
          {deckID && count > 0 && (
            <NumberInputField value={count || 0} onChange={onChangeCardCount} />
          )}
        </View>
      </View>
    </View>
  );
}
