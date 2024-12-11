import * as Crypto from 'expo-crypto';
import * as SQLite from 'expo-sqlite';
import { Deck } from './types';

export async function listDecks() {
  const db = await SQLite.openDatabaseAsync('scarletsword.db');

  try {
    const result: Deck[] = await db.getAllAsync(`
      SELECT
      id,
      name,
      notes,
      colors,
      size
      FROM decks
      ;`);

    return result;
  } catch (err) {
    console.error('Error listing decks', err);
  }

  return [];
}

export async function upsertDeck(deck: Deck) {
  const db = await SQLite.openDatabaseAsync('scarletsword.db');

  const statement = await db.prepareAsync(`
    INSERT INTO decks (
      id,
      name,
      notes,
      colors,
      size
    ) VALUES (
      $id,
      $name,
      $notes,
      $colors,
      $size
    ) ON CONFLICT (id) DO UPDATE SET
      name = EXCLUDED.name,
      notes = EXCLUDED.notes,
      colors = EXCLUDED.colors,
      size = EXCLUDED.size,
      updated_at = DATETIME('NOW')
    ;`);

  try {
    await statement.executeAsync({
      $id: deck?.id ?? Crypto.randomUUID(),
      $name: deck.name,
      $notes: deck.notes,
      $colors: deck.colors,
      $size: deck.size,
    });
  } catch (err) {
    console.error('Error creating deck', err);
  }
}
