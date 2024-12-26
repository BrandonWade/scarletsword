import { useLayoutEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { RouteProp, useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import styles from './styles';
import CardImage from '../../common/CardImage';
import { getCard } from '../../../db/cards';
import { CardFace, Card as DBCard } from '../../../db/types';
import { ScreenNames } from '../../../utils/enums';
import { StackNavigation, StackParamsList } from '../../../utils/navigation';
import commonStyles from '../../../utils/styles';

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
      <View style={[commonStyles.screenContainer, styles.modalContent]}>
        <View style={styles.imageContainer}>
          <CardImage style={styles.image} card={card} />
        </View>
        <View style={styles.sectionContainer}>
          {faces?.map((face) => {
            return (
              <View key={face.face_index} style={styles.section}>
                <Text style={styles.name}>{`${face?.name} ${face?.mana_cost}`}</Text>
                {face?.type_line ? (
                  <Text style={[styles.sectionItem, styles.type]}>{face.type_line}</Text>
                ) : null}
                {face?.oracle_text ? (
                  <Text style={styles.sectionItem}>{face.oracle_text}</Text>
                ) : null}
                {face?.flavor_text ? (
                  <Text style={styles.sectionItem}>{face.flavor_text}</Text>
                ) : null}
                {face?.loyalty ? (
                  <Text
                    style={[styles.sectionItem, styles.statLine]}
                  >{`Loyalty: ${face.loyalty}`}</Text>
                ) : null}
                {face?.power && face?.toughness ? (
                  <Text
                    style={[styles.sectionItem, styles.statLine]}
                  >{`${face.power} / ${face.toughness}`}</Text>
                ) : null}
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}
