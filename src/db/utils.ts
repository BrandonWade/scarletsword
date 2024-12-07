import * as SQLite from 'expo-sqlite';
import {
  cardsTable,
  cardFacesTable,
  decksTable,
  deckCardsTable,
} from './schema';

export async function resetDB() {
  console.log('Resetting DB');

  try {
    const db = await SQLite.openDatabaseAsync('scarletsword.db');

    await db.execAsync('DROP TABLE IF EXISTS cards;');
    await db.execAsync('DROP TABLE IF EXISTS card_faces;');
    await db.execAsync('DROP TABLE IF EXISTS decks;');
    await db.execAsync('DROP TABLE IF EXISTS deck_cards;');

    await db.execAsync(cardsTable);
    await db.execAsync(cardFacesTable);
    await db.execAsync(decksTable);
    await db.execAsync(deckCardsTable);
  } catch (err) {
    console.log('Error resetting DB', err);
  }
}
