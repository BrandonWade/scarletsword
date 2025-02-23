import { Button, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { DeckItemProps } from './types';
import { ScreenNames } from '../../../utils/enums';
import { StackNavigation } from '../../../utils/navigation';
import commonStyles from '../../../utils/styles';
import { getSymbols } from '../../../utils/symbols';

export default function DeckItem({ style, id, name, colors, size }: DeckItemProps) {
  const navigation = useNavigation<StackNavigation>();

  const onPressEdit = () => {
    navigation.navigate(ScreenNames.DeckDetailsEditor, { id });
  };

  const onPress = () => {
    navigation.navigate(ScreenNames.DeckBuilder, { id, name, size });
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.deckItem, style]}>
        <View>
          <Text style={commonStyles.titleMd}>{name}</Text>
          <Text style={styles.size}>{`${size} cards`}</Text>
          <View style={styles.colors}>
            {getSymbols(colors ?? '', { style: { width: 18, height: 18 } })}
          </View>
        </View>
        <Button title='Edit' onPress={onPressEdit} />
      </View>
    </TouchableOpacity>
  );
}
