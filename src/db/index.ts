import * as SQLite from 'expo-sqlite';
import { cardsTable, cardFacesTable, decksTable, deckCardsTable } from './schema';

export async function createTables() {
  const db = await SQLite.openDatabaseAsync('scarletsword.db');

  try {
    await db.execAsync(cardsTable);
    await db.execAsync(cardFacesTable);
    await db.execAsync(decksTable);
    await db.execAsync(deckCardsTable);
    console.log('Successfully created tables');
  } catch (err) {
    console.error('Error creating tables', err);
  }
}

export async function resetTables() {
  console.log('Resetting tables');
  const db = await SQLite.openDatabaseAsync('scarletsword.db');

  try {
    await db.execAsync('DROP TABLE IF EXISTS cards;');
    await db.execAsync('DROP TABLE IF EXISTS card_faces;');
    await db.execAsync('DROP TABLE IF EXISTS decks;');
    await db.execAsync('DROP TABLE IF EXISTS deck_cards;');

    await db.execAsync(cardsTable);
    await db.execAsync(cardFacesTable);
    await db.execAsync(decksTable);
    await db.execAsync(deckCardsTable);
  } catch (err) {
    console.log('Error resetting tables', err);
  }
}
