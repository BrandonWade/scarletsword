import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';
import {
  cardsTable,
  cardFacesTable,
  decksTable,
  deckCardsTable,
} from './schema';

enablePromise(true);

export async function connectToDatabase() {
  return openDatabase(
    { name: 'scarletsword.db', location: 'default' },
    () => {},
    error => {
      console.error(error);
      throw Error('Could not connect to database');
    },
  );
}

async function createTables(db: SQLiteDatabase) {
  try {
    await db.executeSql(cardsTable);
    await db.executeSql(cardFacesTable);
    await db.executeSql(decksTable);
    await db.executeSql(deckCardsTable);
    console.log('Successfully created tables');
  } catch (error) {
    console.error(error);
    throw Error('Failed to create tables');
  }
}

async function init() {
  try {
    const db = await connectToDatabase();
    await createTables(db);
    console.log('Database initialized successfully');
  } catch (error) {
    console.error(error);
  }
}

init();
