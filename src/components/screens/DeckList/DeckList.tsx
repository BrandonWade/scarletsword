import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';
import { listDecks } from '../../../db/decks';
import DeckListItem from './DeckListItem';
import styles from './styles';

export default function DeckList() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const getDecks = async () => {
      const result = await listDecks();
      setDecks(result);
    };

    getDecks();
  }, []);

  return (
    <SafeAreaView>
      <View>
        <FlatList
          style={styles.deckList}
          data={decks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DeckListItem
              id={item.id}
              name={item.name}
              notes={item.notes}
              colors={item.colors}
              size={item.size}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}
