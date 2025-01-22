import * as SQLite from 'expo-sqlite';

export async function openDatabase(name = 'scarletsword.db', options = {}) {
  const db = await SQLite.openDatabaseAsync(name, options);
  await db.execAsync('PRAGMA journal_mode = WAL'); // Recommended by Expo to improve performance
  await db.execAsync('PRAGMA foreign_keys = ON'); // Required for FKs to work (e.g. for cascading deletes)

  return db;
}
