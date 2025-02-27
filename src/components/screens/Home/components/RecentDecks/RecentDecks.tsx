import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import styles from './styles';
import { RecentDecksProps } from './types';
import DeckItem from '../../../../common/DeckItem';
import { listDecks } from '../../../../../db/decks';
import { Deck } from '../../../../../db/types';

export default function RecentDecks({ numberOfDecks = 3 }: RecentDecksProps) {
  const isFocused = useIsFocused();
  const [decks, setDecks] = useState<Deck[]>([]);

  const getDecks = async () => {
    const result: Deck[] = await listDecks(numberOfDecks);
    setDecks(result);
  };

  useEffect(() => {
    getDecks();
  }, [isFocused]);

  if (!decks.length) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent Decks</Text>
      <View style={styles.deckList}>
        {decks.map((deck: Deck, i: number) => (
          <DeckItem
            key={deck.id}
            style={i === decks.length - 1 ? styles.lastDeckItem : {}}
            id={deck.id}
            name={deck.name}
            colors={deck.colors}
            size={deck.size}
            onRefreshDecks={getDecks}
          />
        ))}
      </View>
    </View>
  );
}
