import { useEffect, useLayoutEffect, useState } from 'react';
import { SectionList } from 'react-native';
import { RouteProp, useIsFocused, useRoute } from '@react-navigation/native';
import { deleteDeckCard, getDeckCards } from '../../../../../db/decks';
import { DeckListItem } from '../../../../../db/types';
import { DeckCardLocation, ScreenNames } from '../../../../../utils/enums';
import { StackParamsList } from '../../../../../utils/navigation';
import CardListItem from './CardListItem';
import CardListSectionHeader from './CardListSectionHeader';

export default function CardList() {
  const route = useRoute<RouteProp<StackParamsList, ScreenNames.CardList>>();
  const [deckCards, setDeckCards] = useState([]);
  const [sectionedDeckCards, setSectionedDeckCards] = useState([]);
  const isFocused = useIsFocused();
  const { deckID } = route.params || {};

  const getCards = async () => {
    const result = await getDeckCards(deckID);
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

    deckCards.forEach((deckCard: DeckListItem) => {
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

  const onRemoveCard = async (cardID) => {
    await deleteDeckCard(deckID, cardID);
    await getCards();
  };

  return (
    <SectionList
      sections={sectionedDeckCards}
      keyExtractor={(row) => row.card_id}
      renderSectionHeader={({ section: { title } }) => <CardListSectionHeader title={title} />}
      renderItem={({ item }) => (
        <CardListItem deckID={deckID} card={item} onRemoveCard={onRemoveCard} />
      )}
    />
  );
}
