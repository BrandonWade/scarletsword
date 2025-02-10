import { useLayoutEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { RouteProp, useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import styles from './styles';
import CardImage from '../../common/CardImage';
import { createBookmark, deleteBookmark, getBookmark } from '../../../db/bookmarks';
import { getCard } from '../../../db/cards';
import { deleteDeckCard, getDeckCard, updateDeckCardCount } from '../../../db/decks';
import { Card as DBCard, CardFace, DeckCard } from '../../../db/types';
import { ScreenNames } from '../../../utils/enums';
import { StackNavigation, StackParamsList } from '../../../utils/navigation';
import commonStyles from '../../../utils/styles';
import { getSymbols } from '../../../utils/symbols';

export default function Card() {
  const navigation = useNavigation<StackNavigation>();
  const [deckCard, setDeckCard] = useState<DeckCard>();
  const [card, setCard] = useState<DBCard>();
  const [faces, setFaces] = useState<CardFace[]>([]);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const isFocused = useIsFocused();
  const route = useRoute<RouteProp<StackParamsList, ScreenNames.Card>>();
  const { deckID, cardID } = route.params || {};

  const loadCardInfo = async () => {
    const deckCardResult: DeckCard = await getDeckCard(deckID, cardID);
    setDeckCard(deckCardResult);

    const cardResult: DBCard = await getCard(cardID);
    setCard(cardResult);

    const bookmarkResult: DBCard = await getBookmark(cardID);
    setIsBookmarked(cardID === bookmarkResult?.id);

    try {
      setFaces(JSON.parse(cardResult.faces));
    } catch (err) {
      console.error('Error parsing card faces', err);
    }

    navigation.setOptions({
      title: cardResult.name,
    });
  };

  useLayoutEffect(() => {
    (async () => await loadCardInfo())();
  }, [isFocused]);

  const onAddBookmark = async (cardID: string) => {
    await createBookmark(cardID);
    await loadCardInfo();
  };

  const onRemoveBookmark = async (cardID: string) => {
    await deleteBookmark(cardID);
    await loadCardInfo();
  };

  const onChangeCount = async (deckID: string, cardID: string, count: number) => {
    if (count === 0) {
      await deleteDeckCard(deckID, cardID);
    } else {
      await updateDeckCardCount(deckID, cardID, count);
    }
  };

  const renderText = (text: string) => {
    return text
      .split('\n')
      .map((line: string, i: number) => (
        <Text key={i} style={styles.text}>
          {getSymbols(line)}
        </Text>
      ))
      .flat();
  };

  return (
    <ScrollView>
      <View style={[commonStyles.screenContainer, styles.modalContent]}>
        <View style={styles.imageContainer}>
          <CardImage
            style={styles.image}
            card={card}
            isBookmarked={isBookmarked}
            deckID={deckID}
            count={deckCard?.count || 0}
            onAddBookmark={onAddBookmark}
            onRemoveBookmark={onRemoveBookmark}
            onChangeCount={onChangeCount}
          />
        </View>
        <View style={styles.sectionContainer}>
          {faces?.map((face: CardFace) => {
            return (
              <View key={face.face_index} style={styles.section}>
                <View style={styles.nameRow}>
                  <Text style={styles.name}>{face?.name}</Text>
                  {getSymbols(face?.mana_cost)}
                </View>
                {face?.type_line ? (
                  <Text style={[styles.sectionItem, styles.type]}>{face.type_line}</Text>
                ) : null}
                {face?.oracle_text ? (
                  <View style={[styles.sectionItem, styles.textBlock]}>
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
