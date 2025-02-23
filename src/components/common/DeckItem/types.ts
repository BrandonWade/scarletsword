import { StyleProp, ViewStyle } from 'react-native';

export type DeckItemProps = {
  style: StyleProp<ViewStyle>;
  id: string;
  name: string;
  colors: string;
  size: number;
};
