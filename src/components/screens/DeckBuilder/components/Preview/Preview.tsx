import { useLayoutEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { RouteProp, useIsFocused, useRoute } from '@react-navigation/native';
import { getDeckCards } from '../../../../../db/decks';
import { ScreenNames } from '../../../../../utils/enums';
import { StackParamsList } from '../../../../../utils/navigation';
import CardRow from './CardRow';

export default function Preview() {
  const route = useRoute<RouteProp<StackParamsList, ScreenNames.Preview>>();
  const [deckCards, setDeckCards] = useState([]);
  const isFocused = useIsFocused();
  const { deckID } = route.params || {};

  useLayoutEffect(() => {
    const getCards = async () => {
      const result = await getDeckCards(deckID);
      setDeckCards(result);
    };

    getCards();
  }, [isFocused]);

  return (
    <FlatList
      data={deckCards}
      renderItem={({ item }) => (
        <CardRow
          key={item.card_id}
          cardID={item.card_id}
          count={item.count}
          name={item.name}
          manaCost={item.mana_cost}
        />
      )}
    />
  );
}
