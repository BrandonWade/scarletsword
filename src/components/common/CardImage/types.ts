import { ImageStyle, StyleProp } from 'react-native';
import { Card } from '../../../db/types';

export type CardImageProps = {
  style?: StyleProp<ImageStyle>;
  card: Card;
  onPress?: (string) => void;
  onLongPress?: (string) => void;
};
