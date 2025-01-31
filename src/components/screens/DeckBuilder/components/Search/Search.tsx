import { useFormik } from 'formik';
import { useLayoutEffect, useState } from 'react';
import { Button, ImageStyle, ScrollView, StyleProp, View } from 'react-native';
import { RouteProp, useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import styles from '../../styles';
import CardImage from '../../../../common/CardImage';
import CardImageGrid from '../../../../common/CardImageGrid';
import TextInputField from '../../../../common/TextInputField';
import { createBookmark, deleteBookmark } from '../../../../../db/bookmarks';
import { getCard, searchCards } from '../../../../../db/cards';
import {
  deleteDeckCard,
  getDeckCards,
  updateDeckCardCount,
  upsertDeckCard,
} from '../../../../../db/decks';
import { BookmarkCard, CardFace, DeckListItem } from '../../../../../db/types';
import { DeckCardLocation, ScreenNames } from '../../../../../utils/enums';
import { StackNavigation, StackParamsList } from '../../../../../utils/navigation';
import commonStyles from '../../../../../utils/styles';

export default function Search() {
  const navigation = useNavigation<StackNavigation>();
  const isFocused = useIsFocused();
  const route = useRoute<RouteProp<StackParamsList, ScreenNames.Search>>();
  const { deckID } = route.params || {};
  const [results, setResults] = useState<BookmarkCard[]>([]);
  const [deckCardToCountMap, setDeckCardToCountMap] = useState<{ string?: number }>({});

  const refreshDeckCardtoCountMap = async () => {
    if (!deckID) {
      return;
    }

    const result = await getDeckCards(deckID);
    setDeckCardToCountMap(
      (result || [])?.reduce((map: { string?: number }, curr: DeckListItem) => {
        map[curr.card_id] = curr.count;
        return map;
      }, {})
    );
  };

  const fetchCards = async () => {
    const searchResults: BookmarkCard[] = await searchCards(values.name);
    setResults(searchResults);
    await refreshDeckCardtoCountMap();
  };

  const { values, setFieldValue, handleSubmit } = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: fetchCards,
  });

  useLayoutEffect(() => {
    navigation.getParent().setOptions({
      headerRight: () => {
        if (!isFocused) {
          return null;
        }

        return <Button title='Search' onPress={() => handleSubmit()} />;
      },
    });

    (async () => await fetchCards())();
  }, [isFocused]);

  const onPressResult = async (cardID: string) => {
    const card = await getCard(cardID);
    const faces = JSON.parse(card.faces);
    let location;

    faces.forEach((face: CardFace) => {
      const typeLine = face.type_line.toLowerCase();

      if (typeLine.includes('creature')) {
        location = DeckCardLocation.Creatures;
      } else if (typeLine.includes('land')) {
        location = DeckCardLocation.Lands;
      } else {
        location = DeckCardLocation.Spells;
      }
    });

    const count = deckCardToCountMap[cardID] + 1 || 1;
    await upsertDeckCard(deckID, cardID, count, location);
    await fetchCards();
  };

  const onLongPressResult = (cardID: string) => {
    navigation.navigate(ScreenNames.Card, { cardID, deckID });
  };

  const onAddBookmark = async (cardID: string) => {
    await createBookmark(cardID);
    await fetchCards();
  };

  const onRemoveBookmark = async (cardID: string) => {
    await deleteBookmark(cardID);
    await fetchCards();
  };

  const onChangeCount = async (deckID: string, cardID: string, count: number) => {
    if (count === 0) {
      await deleteDeckCard(deckID, cardID);
    } else {
      await updateDeckCardCount(deckID, cardID, count);
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
            onChangeText={(value: string) => setFieldValue('name', value)}
          />
        </View>
        <CardImageGrid
          cards={results}
          renderCard={(card: BookmarkCard, style: StyleProp<ImageStyle>) => (
            <CardImage
              key={card.id}
              style={style}
              card={card}
              deckID={deckID}
              count={deckCardToCountMap[card.id] || 0}
              shouldOverlayActions={true}
              onPress={onPressResult}
              onLongPress={onLongPressResult}
              onAddBookmark={onAddBookmark}
              onRemoveBookmark={onRemoveBookmark}
              onChangeCount={onChangeCount}
            />
          )}
        />
      </ScrollView>
    </View>
  );
}
