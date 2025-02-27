import { useActionSheet } from '@expo/react-native-action-sheet';
import { Alert, Button, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DeckActions } from './enums';
import styles from './styles';
import { DeckItemProps } from './types';
import { deleteDeck } from '../../../db/decks';
import { ScreenNames } from '../../../utils/enums';
import { StackNavigation } from '../../../utils/navigation';
import commonStyles from '../../../utils/styles';
import { getSymbols } from '../../../utils/symbols';

export default function DeckItem({ style, id, name, colors, size, onRefreshDecks }: DeckItemProps) {
  const navigation = useNavigation<StackNavigation>();
  const { showActionSheetWithOptions } = useActionSheet();

  const onPressEdit = () => {
    navigation.navigate(ScreenNames.DeckDetailsEditor, { id });
  };

  const onPressDelete = async () => {
    Alert.alert('Delete Deck', 'Are you sure you want to delete this deck?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: async () => {
          await deleteDeck(id);
          await onRefreshDecks();
        },
        style: 'destructive',
      },
    ]);
  };

  const onPress = () => {
    navigation.navigate(ScreenNames.DeckBuilder, { id, name, size });
  };

  const onLongPress = () => {
    const options = Object.values(DeckActions);
    const editButtonIndex = options.findIndex((option) => option === DeckActions.Edit);
    const destructiveButtonIndex = options.findIndex((option) => option === DeckActions.Delete);
    const cancelButtonIndex = options.findIndex((option) => option === DeckActions.Cancel);

    showActionSheetWithOptions(
      {
        title: name,
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      async (selectedIndex: number) => {
        switch (selectedIndex) {
          case editButtonIndex:
            onPressEdit();
            break;
          case destructiveButtonIndex:
            await onPressDelete();
            break;
          case cancelButtonIndex:
            break;
        }
      }
    );
  };

  return (
    <TouchableOpacity onPress={onPress} onLongPress={onLongPress}>
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
