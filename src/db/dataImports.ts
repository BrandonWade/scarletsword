import { openDatabase } from './connections';
import { DataImport } from './types';
import { BulkDataEnum } from '../utils/enums';

export async function getMostRecentDataImport() {
  const db = await openDatabase();

  try {
    const result: DataImport = await db.getFirstAsync(`
      SELECT *
      FROM data_imports
      ORDER BY updated_at DESC, created_at DESC
      LIMIT 1
      ;`);

    return result;
  } catch (err) {
    console.error('Error fetching data imports', err);
  }

  return null;
}

export async function recordDataImport(type: BulkDataEnum) {
  const db = await openDatabase();
  let statement;

  try {
    statement = await db.prepareAsync(`
      INSERT INTO data_imports (
        type
      ) VALUES (
        $type
      );`);
    await statement.executeAsync({
      $type: type,
    });
  } catch (err) {
    console.error('Error recording data import', err);
  } finally {
    await statement.finalizeAsync();
  }
}
