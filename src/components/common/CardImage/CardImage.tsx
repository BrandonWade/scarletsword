import { Image, View } from 'react-native';
import styles from './styles';

export default function CardImage({ card }) {
  const [front] = card?.faces ? JSON.parse(card.faces) : []; // TODO: Add support for back

  return (
    <View>
      <Image style={styles.image} source={{ uri: front?.image_uri }} resizeMode='contain' />
    </View>
  );
}
