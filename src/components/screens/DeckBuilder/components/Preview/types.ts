import { DeckListItem } from '../../../../../db/types';

export type DeckCardListItemProps = {
  deckID: string;
  card: DeckListItem;
  onRemoveCard: (string) => void;
};
