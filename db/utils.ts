import { connectToDatabase } from './index';
import {
  cardsTable,
  cardFacesTable,
  decksTable,
  deckCardsTable,
} from './schema';

export async function resetDB() {
  console.log('Resetting DB');

  const db = await connectToDatabase();

  await db.executeSql('DROP TABLE cards;');
  await db.executeSql('DROP TABLE card_faces;');
  await db.executeSql('DROP TABLE decks;');
  await db.executeSql('DROP TABLE deck_cards;');

  await db.executeSql(cardsTable);
  await db.executeSql(cardFacesTable);
  await db.executeSql(decksTable);
  await db.executeSql(deckCardsTable);
}
