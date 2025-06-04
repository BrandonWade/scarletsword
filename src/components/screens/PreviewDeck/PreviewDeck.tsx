import { ParamListBase, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView, ScrollView, Text } from 'react-native';
import { StackParamsList } from '../../../utils/navigation';
import { ScreenNames } from '../../../utils/enums';
import { parseExportedDeck } from '../../../utils/decks';
import { useEffect, useLayoutEffect, useState } from 'react';
import { getCardsFromScannedDeckCards } from '../../../db/decks';
import { ScannedDeck } from '../../../db/types';

export default function PreviewDeck() {
  const route = useRoute<RouteProp<StackParamsList, ScreenNames.PreviewDeck>>();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { deckData } = route.params || {};
  const [parsedDeck, setParsedDeck] = useState<ScannedDeck>({});
  const [deckCards, setDeckCards] = useState([]);

  useEffect(() => {
    if (!deckData) {
      return;
    }

    setParsedDeck(parseExportedDeck(deckData));
  }, [deckData]);

  useEffect(() => {
    if (!parsedDeck?.cards) {
      return;
    }

    async function fetchDeckCards() {
      const result = await getCardsFromScannedDeckCards(parsedDeck.cards);
      if (!result) {
        return;
      }

      setDeckCards(result);
    }

    fetchDeckCards();
  }, [parsedDeck]);

  useLayoutEffect(() => {
    if (!parsedDeck?.name) {
      return;
    }

    navigation.setOptions({
      title: parsedDeck.name,
    });
  }, [parsedDeck]);

  if (!parsedDeck) {
    return null;
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <Text>{JSON.stringify(deckCards, null, 2)}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
