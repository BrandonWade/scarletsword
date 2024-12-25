import { useLayoutEffect, useState } from 'react';
import { ScrollView, Text } from 'react-native';
import { RouteProp, useIsFocused, useRoute } from '@react-navigation/native';
import { getDeckCards } from '../../../../db/decks';
import { ScreenNames } from '../../../../utils/enums';
import { StackParamsList } from '../../../../utils/navigation';

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
    <ScrollView>
      <Text>{JSON.stringify(deckCards, null, 2)}</Text>
    </ScrollView>
  );
}
