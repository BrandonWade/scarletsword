import { Entypo } from '@expo/vector-icons';
import { ImageStyle, StyleProp } from 'react-native';
import { Card } from '../../../db/types';

export type ActionButtonProps = {
  iconName: keyof typeof Entypo.glyphMap;
  iconSize: number;
  text: string;
  isCompact?: boolean;
  onPress: () => void;
};

export type CardImageProps = {
  style?: StyleProp<ImageStyle>;
  card: Card;
  count?: number;
  shouldOverlayActions?: boolean;
  onPress?: (cardID: string) => void;
  onLongPress?: (cardID: string) => void;
  onChangeCount?: (count: number, cardID?: string) => void;
};
