import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { listDecks } from '../../../db/decks';
import { Deck } from '../../../db/types';
import DeckItem from '../../common/DeckItem/DeckItem';
import styles from './styles';

export default function DeckList() {
  const isFocused = useIsFocused();
  const [decks, setDecks] = useState<Deck[]>([]);

  const getDecks = async () => {
    const result: Deck[] = await listDecks();
    setDecks(result);
  };

  useEffect(() => {
    getDecks();
  }, [isFocused]);

  return (
    <SafeAreaView>
      <View>
        <FlatList
          style={styles.deckList}
          data={decks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DeckItem
              id={item.id}
              name={item.name}
              colors={item.colors}
              size={item.size}
              onRefreshDecks={getDecks}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}
