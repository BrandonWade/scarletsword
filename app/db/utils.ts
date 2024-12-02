import * as SQLite from 'expo-sqlite';
import {
  cardsTable,
  cardFacesTable,
  decksTable,
  deckCardsTable,
} from './schema';

export async function resetDB() {
  console.log('Resetting DB');

  const db = await SQLite.openDatabaseAsync('scarletsword.db');

  await db.execAsync('DROP TABLE cards;');
  await db.execAsync('DROP TABLE card_faces;');
  await db.execAsync('DROP TABLE decks;');
  await db.execAsync('DROP TABLE deck_cards;');

  await db.execAsync(cardsTable);
  await db.execAsync(cardFacesTable);
  await db.execAsync(decksTable);
  await db.execAsync(deckCardsTable);
}
