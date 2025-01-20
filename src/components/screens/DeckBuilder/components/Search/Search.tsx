import { useFormik } from 'formik';
import { useLayoutEffect, useState } from 'react';
import { Button, ScrollView, View } from 'react-native';
import { RouteProp, useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import styles from '../../styles';
import CardImage from '../../../../common/CardImage';
import TextInputField from '../../../../common/TextInputField';
import { searchCards } from '../../../../../db/cards';
import { deleteDeckCard, getDeckCards, upsertDeckCard } from '../../../../../db/decks';
import { Card } from '../../../../../db/types';
import { ScreenNames } from '../../../../../utils/enums';
import { StackNavigation, StackParamsList } from '../../../../../utils/navigation';
import commonStyles from '../../../../../utils/styles';

export default function Search() {
  const navigation = useNavigation<StackNavigation>();
  const isFocused = useIsFocused();
  const route = useRoute<RouteProp<StackParamsList, ScreenNames.Search>>();
  const { deckID } = route.params || {};
  const [results, setResults] = useState([]);
  const [deckCardToCountMap, setDeckCardToCountMap] = useState({});
  const { values, setFieldValue, handleSubmit } = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: async () => {
      const searchResults: Card[] = await searchCards(values.name);
      setResults(searchResults);
      await refreshDeckCardtoCountMap();
    },
  });

  const refreshDeckCardtoCountMap = async () => {
    if (!deckID) {
      return;
    }

    const result = await getDeckCards(deckID);

    setDeckCardToCountMap(
      (result || [])?.reduce((map, curr) => {
        map[curr.card_id] = curr.count;
        return map;
      }, {})
    );
  };

  useLayoutEffect(() => {
    navigation.getParent().setOptions({
      headerRight: () => {
        if (!isFocused) {
          return null;
        }

        return <Button title='Search' onPress={() => handleSubmit()} />;
      },
    });

    (async () => await refreshDeckCardtoCountMap())();
  }, [isFocused]);

  const onPressResult = async (cardID) => {
    const count = deckCardToCountMap[cardID] + 1 || 1;
    await upsertDeckCard(deckID, cardID, count);
    await refreshDeckCardtoCountMap();
  };

  const onLongPressResult = (cardID) => {
    navigation.navigate(ScreenNames.Card, { cardID, deckID });
  };

  const onChangeCount = async (count, cardID) => {
    if (count === 0) {
      await deleteDeckCard(deckID, cardID);
    } else {
      await upsertDeckCard(deckID, cardID, count);
    }

    await refreshDeckCardtoCountMap();
  };

  return (
    <View>
      <ScrollView>
        <View style={[commonStyles.screenContainer, styles.searchContainer]}>
          <TextInputField
            label='Name'
            autoCapitalize='none'
            autoComplete='off'
            autoCorrect={false}
            value={values.name}
            description='Any words that appear in the name of the card.'
            onChangeText={(value) => setFieldValue('name', value)}
          />
        </View>
        <View style={[styles.resultsContainer, styles.cardGrid]}>
          {results.map((card) => (
            <CardImage
              key={card.id}
              card={card}
              count={deckCardToCountMap[card.id] || 0}
              shouldOverlayActions={true}
              onPress={onPressResult}
              onLongPress={onLongPressResult}
              onChangeCount={onChangeCount}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
