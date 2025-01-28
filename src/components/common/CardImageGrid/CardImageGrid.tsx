import { Dimensions, View } from 'react-native';
import styles from './styles';
import { CardImageGridProps } from './types';
import { Card } from '../../../db/types';

const columnGap = 5;
const gridWidth = Dimensions.get('window').width;
const minCardWidth = 185;
const columns = Math.floor(gridWidth / minCardWidth);
const cardWidth = gridWidth / columns - columnGap * 1.5;

export default function CardImageGrid({ cards, renderCard }: CardImageGridProps) {
  return (
    <View style={[styles.resultsContainer, styles.cardGrid]}>
      {cards.map((card: Card) =>
        renderCard(card, {
          width: cardWidth,
          height: 'auto',
          aspectRatio: 0.7176,
        })
      )}
    </View>
  );
}
