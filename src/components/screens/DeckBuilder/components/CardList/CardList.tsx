import { useEffect, useLayoutEffect, useState } from 'react';
import { SectionList } from 'react-native';
import { RouteProp, useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { deleteDeckCard, getDeckCards } from '../../../../../db/decks';
import { DeckItem } from '../../../../../db/types';
import { DeckCardLocation, ScreenNames } from '../../../../../utils/enums';
import { StackNavigation, StackParamsList } from '../../../../../utils/navigation';
import CardListItem from './CardListItem';
import CardListSectionHeader from './CardListSectionHeader';
import { DeckListSection } from './types';

export default function CardList() {
  const navigation = useNavigation<StackNavigation>();
  const route = useRoute<RouteProp<StackParamsList, ScreenNames.CardList>>();
  const [deckCards, setDeckCards] = useState<DeckItem[]>([]);
  const [sectionedDeckCards, setSectionedDeckCards] = useState<DeckListSection[]>([]);
  const isFocused = useIsFocused();
  const { deckID } = route.params || {};

  const getCards = async () => {
    const result: DeckItem[] = await getDeckCards(deckID);
    setDeckCards(result);
  };

  useLayoutEffect(() => {
    getCards();
  }, [isFocused]);

  useEffect(() => {
    const sectionLists = {
      [DeckCardLocation.Creatures]: [],
      [DeckCardLocation.Lands]: [],
      [DeckCardLocation.Spells]: [],
    };

    deckCards.forEach((deckCard: DeckItem) => {
      if (deckCard.location === DeckCardLocation.Creatures) {
        sectionLists[DeckCardLocation.Creatures].push(deckCard);
      } else if (deckCard.location === DeckCardLocation.Lands) {
        sectionLists[DeckCardLocation.Lands].push(deckCard);
      } else {
        sectionLists[DeckCardLocation.Spells].push(deckCard);
      }
    });

    setSectionedDeckCards(
      Object.keys(sectionLists).map((sectionName: DeckCardLocation) => ({
        title: sectionName,
        data: sectionLists[sectionName],
      }))
    );
  }, [deckCards]);

  const onPressItem = (cardID: string) => {
    navigation.navigate(ScreenNames.Card, {
      cardID,
      deckID,
    });
  };

  const onRemoveCard = async (cardID: string) => {
    await deleteDeckCard(deckID, cardID);
    await getCards();
  };

  return (
    <SectionList
      sections={sectionedDeckCards}
      keyExtractor={(row: DeckItem) => row.card_id}
      renderSectionHeader={({ section: { title } }: { section: DeckListSection }) => (
        <CardListSectionHeader title={title} />
      )}
      renderItem={({ item }: { item: DeckItem }) => (
        <CardListItem card={item} onPress={onPressItem} onRemoveCard={onRemoveCard} />
      )}
    />
  );
}
