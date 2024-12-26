import { Card } from '../../../db/types';

export type CardImageProps = {
  card: Card;
  onPress?: (string) => void;
};
