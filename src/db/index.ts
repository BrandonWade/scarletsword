import * as SQLite from 'expo-sqlite';

import { cardsTable, cardFacesTable, decksTable, deckCardsTable } from './schema';

async function createTables() {
  const db = await SQLite.openDatabaseAsync('scarletsword.db');

  try {
    await db.execAsync(cardsTable);
    await db.execAsync(cardFacesTable);
    await db.execAsync(decksTable);
    await db.execAsync(deckCardsTable);
    console.log('Successfully created tables');
  } catch (error) {
    console.error(error);
    throw Error('Failed to create tables');
  }
}

export async function initDB() {
  try {
    await createTables();
    console.log('Database initialized successfully');
  } catch (error) {
    console.error(error);
  }
}
