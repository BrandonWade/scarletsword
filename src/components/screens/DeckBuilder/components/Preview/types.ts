import { DeckListItem } from '../../../../../db/types';

export type DeckCardListItemProps = {
  card: DeckListItem;
  onRemoveCard: (string) => void;
};
