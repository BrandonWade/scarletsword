import { useFormik } from 'formik';
import { useLayoutEffect, useState } from 'react';
import { Button, ScrollView, View } from 'react-native';
import { RouteProp, useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import styles from '../../styles';
import CardImage from '../../../../common/CardImage';
import TextInputField from '../../../../common/TextInputField';
import { searchCards } from '../../../../../db/cards';
import { upsertDeckCards } from '../../../../../db/decks';
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
  const { values, setFieldValue, handleSubmit } = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: async () => {
      const searchResults: Card[] = await searchCards(values.name);
      setResults(searchResults);
    },
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
  }, [isFocused]);

  const onPressResult = async (cardID) => {
    await upsertDeckCards(deckID, cardID);
  };

  const onLongPressResult = (cardID) => {
    navigation.navigate(ScreenNames.Card, { cardID, deckID });
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
              onPress={onPressResult}
              onLongPress={onLongPressResult}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
