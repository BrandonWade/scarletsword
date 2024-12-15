import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DeckListItemProps } from './types';
import { ScreenNames } from '../../../utils/enums';
import { StackNavigation } from '../../../utils/navigation';
import commonStyles from '../../../utils/styles';
import styles from './styles';

export default function DeckListItem({ name, colors, size }: DeckListItemProps) {
  const navigation = useNavigation<StackNavigation>();

  const onPress = () => {
    navigation.navigate(ScreenNames.DeckBuilder, { name });
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.deckListItem}>
        <Text style={commonStyles.titleMd}>{name}</Text>
        <Text style={styles.size}>{`${size} cards`}</Text>
        <Text style={styles.colors}>{colors}</Text>
      </View>
    </TouchableOpacity>
  );
}
