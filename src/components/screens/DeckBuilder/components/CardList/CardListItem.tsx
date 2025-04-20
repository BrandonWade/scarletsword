import { Alert, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { CardListItemProps } from './types';
import { getSymbols } from '../../../../../utils/symbols';

export default function CardListItem({ card, onPress, onRemoveCard }: CardListItemProps) {
  const faces = card?.faces ? JSON.parse(card.faces) : [];

  const onPressItem = () => {
    onPress(card.card_id);
  };

  const onPressRemoveCard = () => {
    if (!onRemoveCard) return;

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
    <TouchableOpacity onPress={onPressItem}>
      <View style={styles.itemContentContainer}>
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
