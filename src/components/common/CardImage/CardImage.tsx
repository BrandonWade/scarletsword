import { Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import { CardImageProps } from './types';

export default function CardImage({ card, onPress }: CardImageProps) {
  const [front] = card?.faces ? JSON.parse(card.faces) : []; // TODO: Add support for back

  const onPressImage = () => {
    onPress?.(card.id);
  };

  return (
    <TouchableOpacity onPress={onPressImage}>
      <Image style={styles.image} source={{ uri: front?.image_uri }} resizeMode='contain' />
    </TouchableOpacity>
  );
}
