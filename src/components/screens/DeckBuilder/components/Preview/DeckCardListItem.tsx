import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { DeckCardListItemProps } from './types';
import { ScreenNames } from '../../../../../utils/enums';
import { StackNavigation } from '../../../../../utils/navigation';
import { getSymbols } from '../../../../../utils/symbols';

export default function DeckCardListItem({ deckID, card, onRemoveCard }: DeckCardListItemProps) {
  const navigation = useNavigation<StackNavigation>();
  const faces = card?.faces ? JSON.parse(card.faces) : [];

  const onPressRemoveCard = () => {
    Alert.alert('Remove Card', 'Are you sure you want to remove this card?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Remove',
        onPress: async () => await onRemoveCard(card.card_id),
        style: 'destructive',
      },
    ]);
  };

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(ScreenNames.Card, { cardID: card.card_id, deckID })}
    >
      <View style={styles.contentContainer}>
        <Text style={styles.count}>{card.count}</Text>
        <View style={styles.faceInfoList}>
          {faces.map((face) => {
            return (
              <View key={face.face_index} style={styles.faceInfo}>
                <View style={styles.manaCost}>{getSymbols(face.mana_cost)}</View>
                <Text style={styles.name}>{face.name}</Text>
              </View>
            );
          })}
        </View>
        <TouchableOpacity hitSlop={20} onPress={onPressRemoveCard}>
          <Text style={styles.removeCard}>×</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
