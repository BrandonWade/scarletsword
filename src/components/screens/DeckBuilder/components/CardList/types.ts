import { DeckListItem } from '../../../../../db/types';

export type CardListItemProps = {
  deckID: string;
  card: DeckListItem;
  onRemoveCard: (string) => void;
};
