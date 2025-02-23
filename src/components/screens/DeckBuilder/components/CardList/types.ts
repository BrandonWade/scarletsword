import { DeckItem } from '../../../../../db/types';
import { DeckCardLocation } from '../../../../../utils/enums';

export type CardListSectionHeaderProps = {
  title: string;
};

export type CardListItemProps = {
  deckID: string;
  card: DeckItem;
  onRemoveCard: (string) => void;
};

export type DeckListSection = {
  title: DeckCardLocation;
  data: DeckItem[];
};
