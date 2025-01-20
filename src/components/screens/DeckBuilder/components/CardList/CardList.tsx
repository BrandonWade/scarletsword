import { useLayoutEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { RouteProp, useIsFocused, useRoute } from '@react-navigation/native';
import { deleteDeckCard, getDeckCards } from '../../../../../db/decks';
import { ScreenNames } from '../../../../../utils/enums';
import { StackParamsList } from '../../../../../utils/navigation';
import CardListItem from './CardListItem';

export default function CardList() {
  const route = useRoute<RouteProp<StackParamsList, ScreenNames.CardList>>();
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
    await deleteDeckCard(deckID, cardID);
    await getCards();
  };

  return (
    <FlatList
      data={deckCards}
      keyExtractor={(row) => row.card_id}
      renderItem={({ item }) => (
        <CardListItem deckID={deckID} card={item} onRemoveCard={onRemoveCard} />
      )}
    />
  );
}
