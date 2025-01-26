import { DeckListItem } from '../../../../../db/types';

export type CardListSectionHeaderProps = {
  title: string;
};

export type CardListItemProps = {
  deckID: string;
  card: DeckListItem;
  onRemoveCard: (string) => void;
};
