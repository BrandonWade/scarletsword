import { Image, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { CardImageProps } from './types';

export default function CardImage({ style, card, onPress, onLongPress }: CardImageProps) {
  const [front] = card?.faces ? JSON.parse(card.faces) : []; // TODO: Add support for back

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

  return withPressHandler(
    <View style={[styles.image, style]}>
      <Image
        style={[styles.image, style]}
        source={{ uri: front?.image_uri }}
        resizeMode='stretch'
      />
    </View>
  );
}
