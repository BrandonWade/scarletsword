import { DeckItem } from '../../../../../db/types';
import { DeckCardLocation } from '../../../../../utils/enums';

export type CardListSectionHeaderProps = {
  title: string;
};

export type CardListItemProps = {
  card: DeckItem;
  onPress?: (cardID: string) => void;
  onRemoveCard?: (cardID: string) => void;
};

export type DeckListSection = {
  title: DeckCardLocation;
  data: DeckItem[];
};
