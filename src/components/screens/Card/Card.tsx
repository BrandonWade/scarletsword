import { useLayoutEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { RouteProp, useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { getCard } from '../../../db/cards';
import { StackNavigation, StackParamsList } from '../../../utils/navigation';
import { CardFace, Card as DBCard } from '../../../db/types';
import { ScreenNames } from '../../../utils/enums';
import CardImage from '../../common/CardImage';

export default function Card() {
  const navigation = useNavigation<StackNavigation>();
  const [card, setCard] = useState<DBCard>();
  const [faces, setFaces] = useState<CardFace[]>([]);
  const isFocused = useIsFocused();
  const route = useRoute<RouteProp<StackParamsList, ScreenNames.Card>>();
  const { cardID } = route.params || {};

  useLayoutEffect(() => {
    const loadCardInfo = async () => {
      const result = await getCard(cardID);
      setCard(result);

      try {
        setFaces(JSON.parse(result.faces));
      } catch (err) {
        console.error('Error parsing card faces', faces);
      }

      navigation.setOptions({
        title: result.name,
      });
    };

    loadCardInfo();
  }, [isFocused]);

  return (
    <ScrollView>
      <CardImage card={card} />
      {faces?.map((face) => {
        return (
          <View key={face.face_index}>
            <Text>{`${face?.name} ${face?.mana_cost}`}</Text>
            <Text>{face?.type_line}</Text>
            <Text>{face?.oracle_text}</Text>
          </View>
        );
      })}
    </ScrollView>
  );
}
