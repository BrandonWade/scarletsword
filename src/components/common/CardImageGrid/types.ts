import { ImageStyle, StyleProp } from 'react-native';
import { Card } from '../../../db/types';

export type CardImageGridProps = {
  cards: Card[];
  renderCard: (card: Card, style: StyleProp<ImageStyle>) => React.JSX.Element;
};
