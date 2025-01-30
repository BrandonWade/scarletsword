import { ImageStyle, StyleProp } from 'react-native';
import { BookmarkCard, Card } from '../../../db/types';

export type CardImageGridProps = {
  cards: BookmarkCard[];
  renderCard: (card: Card, style: StyleProp<ImageStyle>) => React.JSX.Element;
};
