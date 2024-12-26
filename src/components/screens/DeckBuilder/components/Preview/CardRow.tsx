import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigation } from '../../../../../utils/navigation';
import { ScreenNames } from '../../../../../utils/enums';
import styles from './styles';
import { CardRowProps } from './types';

export default function CardRow({ cardID, count, name, manaCost }: CardRowProps) {
  const navigation = useNavigation<StackNavigation>();

  return (
    <TouchableOpacity onPress={() => navigation.navigate(ScreenNames.Card, { cardID })}>
      <View style={styles.rowContainer}>
        <Text>{count}</Text>
        <Text>{manaCost}</Text>
        <Text>{name}</Text>
      </View>
    </TouchableOpacity>
  );
}
