import { Text, View } from 'react-native';
import styles from './styles';
import { CardRowProps } from './types';

export default function CardRow({ count, name, manaCost }: CardRowProps) {
  return (
    <View style={styles.rowContainer}>
      <Text>{count}</Text>
      <Text>{manaCost}</Text>
      <Text>{name}</Text>
    </View>
  );
}
