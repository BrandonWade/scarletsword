import { RouteProp, useRoute } from '@react-navigation/native';
import { ScrollView, View } from 'react-native';
import styles from '../styles';
import CardImage from '../../../common/CardImage';
import { upsertDeckCards } from '../../../../db/decks';
import { ScreenNames } from '../../../../utils/enums';
import { StackParamsList } from '../../../../utils/navigation';

export default function Results() {
  const route = useRoute<RouteProp<StackParamsList, ScreenNames.Results>>();
  const { deckID, results = [] } = route.params || {};

  const onPressResult = async (cardID) => {
    await upsertDeckCards(deckID, cardID);
  };

  return (
    <ScrollView style={styles.resultsContainer}>
      <View style={styles.cardGrid}>
        {results.map((card) => (
          <CardImage key={card.id} card={card} onPress={onPressResult} />
        ))}
      </View>
    </ScrollView>
  );
}
