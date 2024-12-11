import { Text, View } from 'react-native';
import { DeckListItemProps } from './types';
import commonStyles from '../../../utils/styles';
import styles from './styles';

export default function DeckListItem({ id, name, notes, colors, size }: DeckListItemProps) {
  return (
    <View style={styles.deckListItem}>
      <Text style={commonStyles.titleMd}>{name}</Text>
      <Text style={styles.size}>{`${size} cards`}</Text>
      <Text style={styles.colors}>{colors}</Text>
    </View>
  );
}
