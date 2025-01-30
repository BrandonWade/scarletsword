import { Entypo } from '@expo/vector-icons';
import { ImageStyle, StyleProp } from 'react-native';
import { BookmarkCard } from '../../../db/types';

export type ActionButtonProps = {
  iconName: keyof typeof Entypo.glyphMap;
  iconSize: number;
  text: string;
  isCompact?: boolean;
  onPress: () => void;
};

export type CardImageProps = {
  style?: StyleProp<ImageStyle>;
  card: BookmarkCard;
  deckID?: string;
  count?: number;
  shouldOverlayActions?: boolean;
  onPress?: (cardID: string) => void;
  onLongPress?: (cardID: string) => void;
  onAddBookmark?: (cardID: string) => void;
  onRemoveBookmark?: (cardID: string) => void;
  onChangeCount?: (deckID: string, cardID: string, count: number) => void;
};
