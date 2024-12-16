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
      ORDER BY updated_at DESC, created_at DESC
      ;`);

    return result;
  } catch (err) {
    console.error('Error listing decks', err);
  }

  return [];
}

export async function upsertDeck(deck: Deck) {
  if (deck?.id) {
    await updateDeck(deck);
  } else {
    await insertDeck(deck);
  }
}

async function insertDeck(deck: Partial<Deck>) {
  const db = await SQLite.openDatabaseAsync('scarletsword.db');
  const statement = await db.prepareAsync(`
    INSERT INTO decks (
      id,
      name,
      notes
    ) VALUES (
      $id,
      $name,
      $notes
    );`);

  try {
    await statement.executeAsync({
      $id: deck.id,
      $name: deck.name,
      $notes: deck.notes,
    });
  } catch (err) {
    console.error('Error creating deck', err);
  } finally {
    await statement.finalizeAsync();
  }
}

async function updateDeck(deck: Deck) {
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
      $id: deck.id,
      $name: deck.name,
      $notes: deck.notes ?? null,
      $colors: deck.colors ?? null,
      $size: deck.size ?? 0,
    });
  } catch (err) {
    console.error('Error creating deck', err);
  } finally {
    await statement.finalizeAsync();
  }
}
