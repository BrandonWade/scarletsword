import { useLayoutEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { RouteProp, useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import styles from './styles';
import CardImage from '../../common/CardImage';
import NumberInputField from '../../common/NumberInputField';
import { getCard } from '../../../db/cards';
import { deleteDeckCard, getDeckCard, upsertDeckCardCount } from '../../../db/decks';
import { CardFace, Card as DBCard, DeckCard } from '../../../db/types';
import { ScreenNames } from '../../../utils/enums';
import { StackNavigation, StackParamsList } from '../../../utils/navigation';
import commonStyles from '../../../utils/styles';

export default function Card() {
  const navigation = useNavigation<StackNavigation>();
  const [deckCard, setDeckCard] = useState<DeckCard>();
  const [card, setCard] = useState<DBCard>();
  const [faces, setFaces] = useState<CardFace[]>([]);
  const isFocused = useIsFocused();
  const route = useRoute<RouteProp<StackParamsList, ScreenNames.Card>>();
  const { deckID, cardID } = route.params || {};

  useLayoutEffect(() => {
    const loadCardInfo = async () => {
      const deckCardResult = await getDeckCard(deckID, cardID);
      setDeckCard(deckCardResult);

      const cardResult = await getCard(cardID);
      setCard(cardResult);

      try {
        setFaces(JSON.parse(cardResult.faces));
      } catch (err) {
        console.error('Error parsing card faces', faces);
      }

      navigation.setOptions({
        title: cardResult.name,
      });
    };

    loadCardInfo();
  }, [isFocused]);

  const onChangeCount = async (count) => {
    if (count === 0) {
      await deleteDeckCard(deckID, cardID);
    } else {
      await upsertDeckCardCount(deckID, cardID, count);
    }
  };

  const renderText = (text) => {
    return text.split('\n').map((line, i) => <Text key={i}>{line}</Text>);
  };

  return (
    <ScrollView>
      <View style={[commonStyles.screenContainer, styles.modalContent]}>
        <View style={styles.imageContainer}>
          <CardImage style={styles.image} card={card} />
          <NumberInputField label='Count' value={deckCard?.count || 0} onChange={onChangeCount} />
        </View>
        <View style={styles.sectionContainer}>
          {faces?.map((face) => {
            return (
              <View key={face.face_index} style={styles.section}>
                <Text style={styles.name}>{`${face?.name} ${face?.mana_cost}`}</Text>
                {face?.type_line ? (
                  <Text style={[styles.sectionItem, styles.type]}>{face.type_line}</Text>
                ) : null}
                {face?.oracle_text ? (
                  <View style={[styles.sectionItem, styles.text]}>
                    {renderText(face.oracle_text)}
                  </View>
                ) : null}
                {face?.flavor_text ? (
                  <Text style={styles.sectionItem}>{face.flavor_text}</Text>
                ) : null}
                {face?.loyalty ? (
                  <Text
                    style={[styles.sectionItem, styles.statLine]}
                  >{`Loyalty: ${face.loyalty}`}</Text>
                ) : null}
                {face?.power && face?.toughness ? (
                  <Text
                    style={[styles.sectionItem, styles.statLine]}
                  >{`${face.power} / ${face.toughness}`}</Text>
                ) : null}
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}
