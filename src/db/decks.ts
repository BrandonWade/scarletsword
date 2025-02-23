import { openDatabase } from './connections';
import { Deck, DeckCard, DeckItem } from './types';
import { getColorString } from '../utils/decks';
import { DeckCardLocation } from '../utils/enums';

export async function listDecks(limit: number) {
  const db = await openDatabase();

  try {
    const result: Deck[] = await db.getAllAsync(`
      SELECT
      d.*,
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
      ${limit ? `LIMIT ${limit}` : ''}
      ;`);

    return result;
  } catch (err) {
    console.error('Error listing decks', err);
  }

  return [];
}

export async function getDeck(deckID: string) {
  const db = await openDatabase();

  try {
    const result: Deck = await db.getFirstAsync(
      `
      SELECT
      d.*
      FROM decks d
      WHERE d.id = $deck_id
      ;`,
      {
        $deck_id: deckID,
      }
    );

    return result;
  } catch (err) {
    console.error('Error getting deck', err);
  }
}

export async function upsertDeck(deck: Deck) {
  if (deck?.id) {
    await updateDeck(deck);
  } else {
    await insertDeck(deck);
  }
}

async function insertDeck(deck: Deck) {
  const db = await openDatabase();
  let statement;

  try {
    statement = await db.prepareAsync(`
      INSERT INTO decks (
        id,
        name,
        notes,
        auto_detect_colors
      ) VALUES (
        $id,
        $name,
        $notes,
        $auto_detect_colors
      );`);
    await statement.executeAsync({
      $id: deck.id,
      $name: deck.name,
      $notes: deck.notes,
      $auto_detect_colors: deck.auto_detect_colors,
    });
  } catch (err) {
    console.error('Error creating deck', err);
  } finally {
    await statement.finalizeAsync();
  }
}

async function updateDeck(deck: Deck) {
  const db = await openDatabase();
  let statement;

  try {
    statement = await db.prepareAsync(`
      INSERT INTO decks (
        id,
        name,
        notes,
        auto_detect_colors,
        colors
      ) VALUES (
        $id,
        $name,
        $notes,
        $auto_detect_colors,
        $colors
      ) ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        notes = EXCLUDED.notes,
        auto_detect_colors = EXCLUDED.auto_detect_colors,
        colors = EXCLUDED.colors,
        updated_at = DATETIME('NOW')
      ;`);
    await statement.executeAsync({
      $id: deck.id,
      $name: deck.name,
      $notes: deck.notes,
      $auto_detect_colors: deck.auto_detect_colors,
      $colors: deck.colors,
    });
  } catch (err) {
    console.error('Error updating deck', err);
  } finally {
    await statement.finalizeAsync();
  }
}

export async function conditionallyUpdateDeckColors(deckID: string) {
  const db = await openDatabase();
  const deck: Deck = await getDeck(deckID);
  if (!deck?.auto_detect_colors) {
    return;
  }

  const deckCards: DeckItem[] = await getDeckCards(deckID);
  const colors: string = getColorString(deckCards);
  let statement;

  try {
    statement = await db.prepareAsync(`
      UPDATE decks
      SET colors = $colors,
      updated_at = DATETIME('NOW')
      WHERE id = $id
      ;`);
    await statement.executeAsync({
      $id: deckID,
      $colors: colors,
    });
  } catch (err) {
    console.error('Error updating deck colors', err);
  } finally {
    await statement.finalizeAsync();
  }
}

export async function deleteDeck(deckID: string) {
  const db = await openDatabase();

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

export async function getDeckCards(deckID: string) {
  const db = await openDatabase();

  try {
    const result: DeckItem[] = await db.getAllAsync(
      `
      SELECT
      d.*,
      f.faces
      FROM deck_cards d
      INNER JOIN cards c ON c.id = d.card_id
      INNER JOIN (
        SELECT
        f.card_id,
        JSON_GROUP_ARRAY(
          JSON_OBJECT(
            'face_index', face_index,
            'name', name,
            'mana_cost', mana_cost,
            'is_white', is_white,
            'is_blue', is_blue,
            'is_black', is_black,
            'is_red', is_red,
            'is_green', is_green,
            'type_line', type_line
          )
        ) faces
        FROM card_faces f
        GROUP BY f.card_id
      ) f ON c.id = f.card_id
      WHERE d.deck_id = $deck_id
      ORDER BY c.cmc, c.name, c.id
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

export async function getDeckCard(deckID: string, cardID: string) {
  const db = await openDatabase();

  try {
    const result: DeckCard = await db.getFirstAsync(
      `
      SELECT
      d.*
      FROM deck_cards d
      WHERE d.deck_id = $deck_id
      AND d.card_id = $card_id
      ;`,
      {
        $deck_id: deckID,
        $card_id: cardID,
      }
    );

    return result;
  } catch (err) {
    console.error('Error getting deck card', err);
  }
}

export async function updateDeckCardCount(deckID: string, cardID: string, count: number) {
  const db = await openDatabase();
  let statement;

  try {
    statement = await db.prepareAsync(`
      UPDATE deck_cards
      SET
      count = $count,
      updated_at = DATETIME('NOW')
      WHERE deck_id = $deck_id
      AND card_id = $card_id
      ;`);
    await statement.executeAsync({
      $deck_id: deckID,
      $card_id: cardID,
      $count: count,
    });

    // Update deck colors when adding one or more cards, if necessary
    await conditionallyUpdateDeckColors(deckID);
  } catch (err) {
    console.error('Error updating deck card count', err);
  } finally {
    await statement.finalizeAsync();
  }
}

export async function upsertDeckCard(
  deckID: string,
  cardID: string,
  count: number,
  location: DeckCardLocation
) {
  const db = await openDatabase();
  let statement;

  try {
    statement = await db.prepareAsync(`
      INSERT INTO deck_cards (
        deck_id,
        card_id,
        count,
        location
      ) VALUES (
        $deck_id,
        $card_id,
        $count,
        $location
      ) ON CONFLICT (deck_id, card_id) DO UPDATE SET
        count = $count,
        location = $location,
        updated_at = DATETIME('NOW')
      ;`);
    await statement.executeAsync({
      $deck_id: deckID,
      $card_id: cardID,
      $count: count,
      $location: location,
    });

    // Update deck colors when adding one or more cards, if necessary
    await conditionallyUpdateDeckColors(deckID);
  } catch (err) {
    console.error('Error upserting deck card', err);
  } finally {
    await statement.finalizeAsync();
  }
}

export async function deleteDeckCard(deckID: string, cardID: string) {
  const db = await openDatabase();

  try {
    await db.runAsync(
      `
      DELETE
      FROM deck_cards
      WHERE deck_id = $deck_id
      AND card_id = $card_id
      ;`,
      {
        $deck_id: deckID,
        $card_id: cardID,
      }
    );

    // Update deck colors when removing one or more cards, if necessary
    await conditionallyUpdateDeckColors(deckID);
  } catch (err) {
    console.error('Error getting deck cards', err);
  }
}
