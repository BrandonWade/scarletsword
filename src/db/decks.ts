import * as SQLite from 'expo-sqlite';
import { Card, Deck } from './types';

export async function listDecks() {
  const db = await SQLite.openDatabaseAsync('scarletsword.db');

  try {
    const result: Deck[] = await db.getAllAsync(`
      SELECT
      d.id,
      d.name,
      d.colors,
      COALESCE(c.size, 0) size
      FROM decks d
      LEFT JOIN (
        SELECT
        c.deck_id,
        SUM(c.count) size
        FROM deck_cards c
        GROUP BY c.deck_id
      ) c ON d.id = c.deck_id
      ORDER BY d.updated_at DESC, d.created_at DESC
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

async function insertDeck(deck: Deck) {
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
      colors
    ) VALUES (
      $id,
      $name,
      $notes,
      $colors
    ) ON CONFLICT (id) DO UPDATE SET
      name = EXCLUDED.name,
      notes = EXCLUDED.notes,
      colors = EXCLUDED.colors,
      updated_at = DATETIME('NOW')
    ;`);

  try {
    await statement.executeAsync({
      $id: deck.id,
      $name: deck.name,
      $notes: deck.notes ?? null,
      $colors: deck.colors ?? null,
    });
  } catch (err) {
    console.error('Error creating deck', err);
  } finally {
    await statement.finalizeAsync();
  }
}

export async function deleteDeck(deckID: string) {
  const db = await SQLite.openDatabaseAsync('scarletsword.db');

  try {
    await db.runAsync(
      `
      DELETE
      FROM decks
      WHERE id = $id
      ;`,
      {
        $id: deckID,
      }
    );
  } catch (err) {
    console.error('Error deleting deck', err);
  }
}

export async function upsertDeckCards(deckID: string, cardID: string) {
  const db = await SQLite.openDatabaseAsync('scarletsword.db');
  const statement = await db.prepareAsync(`
    INSERT INTO deck_cards (
      deck_id,
      card_id,
      count
    ) VALUES (
      $deck_id,
      $card_id,
      $count
    ) ON CONFLICT (deck_id, card_id) DO UPDATE SET
      count = count + 1,
      updated_at = DATETIME('NOW')
    ;`);

  try {
    await statement.executeAsync({
      $deck_id: deckID,
      $card_id: cardID,
      $count: 1,
    });
  } catch (err) {
    console.error('Error upserting deck cards', err);
  } finally {
    await statement.finalizeAsync();
  }
}

export async function getDeckCards(deckID: string) {
  const db = await SQLite.openDatabaseAsync('scarletsword.db');

  try {
    const result: Card[] = await db.getAllAsync(
      `
      SELECT
      d.*,
      c.name,
      c.mana_cost,
      c.cmc
      FROM deck_cards d
      INNER JOIN cards c ON c.id = d.card_id
      WHERE d.deck_id = $deck_id
      ;`,
      {
        $deck_id: deckID,
      }
    );

    return result;
  } catch (err) {
    console.error('Error getting deck cards', err);
  }

  return [];
}
