import { useLayoutEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { RouteProp, useIsFocused, useRoute } from '@react-navigation/native';
import { deleteCard, getDeckCards } from '../../../../../db/decks';
import { ScreenNames } from '../../../../../utils/enums';
import { StackParamsList } from '../../../../../utils/navigation';
import DeckCardListItem from './DeckCardListItem';

export default function Preview() {
  const route = useRoute<RouteProp<StackParamsList, ScreenNames.Preview>>();
  const [deckCards, setDeckCards] = useState([]);
  const isFocused = useIsFocused();
  const { deckID } = route.params || {};

  const getCards = async () => {
    const result = await getDeckCards(deckID);
    setDeckCards(result);
  };

  useLayoutEffect(() => {
    getCards();
  }, [isFocused]);

  const onRemoveCard = async (cardID) => {
    await deleteCard(deckID, cardID);
    await getCards();
  };

  return (
    <FlatList
      data={deckCards}
      keyExtractor={(row) => row.card_id}
      renderItem={({ item }) => <DeckCardListItem card={item} onRemoveCard={onRemoveCard} />}
    />
  );
}
