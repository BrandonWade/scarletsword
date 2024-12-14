import * as SQLite from 'expo-sqlite';
import { BulkDataEnum } from '../utils/enums';
import { DataImport } from './types';

export async function getMostRecentDataImport() {
  const db = await SQLite.openDatabaseAsync('scarletsword.db');

  try {
    const result: DataImport = await db.getFirstAsync(`
      SELECT *
      FROM data_imports
      ORDER BY updated_at DESC, created_at DESC
      LIMIT 1
      ;`);

    return result;
  } catch (err) {
    console.error('Error fetching number of cards', err);
  }

  return null;
}

export async function recordDataImport(type: BulkDataEnum) {
  const db = await SQLite.openDatabaseAsync('scarletsword.db');
  const statement = await db.prepareAsync(`
    INSERT INTO data_imports (
      type
    ) VALUES (
      $type
    );`);

  try {
    await statement.executeAsync({
      $type: type,
    });
  } catch (err) {
    console.error('Error recording data import', err);
  } finally {
    await statement.finalizeAsync();
  }
}
