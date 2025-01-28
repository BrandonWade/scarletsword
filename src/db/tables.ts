import { openDatabase } from './connections';
import {
  bookmarksTable,
  cardsTable,
  cardFacesTable,
  dataImportsTable,
  decksTable,
  deckCardsTable,
} from './schema';

export async function createTables() {
  const db = await openDatabase();

  try {
    await db.execAsync(dataImportsTable);
    await db.execAsync(cardsTable);
    await db.execAsync(cardFacesTable);
    await db.execAsync(decksTable);
    await db.execAsync(deckCardsTable);
    await db.execAsync(bookmarksTable);
  } catch (err) {
    console.error('Error creating tables', err);
  }
}

export async function resetTables() {
  console.info('Resetting tables');
  const db = await openDatabase();

  try {
    await db.execAsync('DROP TABLE IF EXISTS bookmarks;');
    await db.execAsync('DROP TABLE IF EXISTS deck_cards;');
    await db.execAsync('DROP TABLE IF EXISTS decks;');
    await db.execAsync('DROP TABLE IF EXISTS card_faces;');
    await db.execAsync('DROP TABLE IF EXISTS cards;');
    await db.execAsync('DROP TABLE IF EXISTS data_imports;');

    await createTables();
  } catch (err) {
    console.error('Error resetting tables', err);
  }
}
