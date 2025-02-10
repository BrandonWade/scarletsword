import { openDatabase } from './connections';
import { Card } from './types';

export async function listBookmarks() {
  const db = await openDatabase();

  try {
    const result: Card[] = await db.getAllAsync(`
      SELECT
      c.*,
      f.faces
      FROM cards c
      INNER JOIN (
        SELECT
        f.card_id,
        JSON_GROUP_ARRAY(
          JSON_OBJECT(
            'card_id', card_id,
            'face_index', face_index,
            'name', name,
            'mana_cost', mana_cost,
            'is_white', is_white,
            'is_blue', is_blue,
            'is_black', is_black,
            'is_red', is_red,
            'is_green', is_green,
            'type_line', type_line,
            'oracle_text', f.oracle_text,
            'flavor_text', f.flavor_text,
            'image_uri', f.image_uri,
            'power', f.power,
            'toughness', f.toughness,
            'loyalty', f.loyalty
          )
        ) faces
        FROM card_faces f
        GROUP BY f.card_id
      ) f ON c.id = f.card_id
      WHERE c.id IN (
        SELECT
        b.card_id
        FROM bookmarks b
      );`);

    return result;
  } catch (err) {
    console.error('Error listing bookmarks', err);
  }

  return [];
}

export async function getBookmark(cardID: string) {
  const db = await openDatabase();

  try {
    const result: Card = await db.getFirstAsync(
      `
      SELECT
      c.*
      FROM cards c
      INNER JOIN bookmarks b ON b.card_id = c.id AND b.card_id = $card_id
      ;`,
      {
        $card_id: cardID,
      }
    );

    return result;
  } catch (err) {
    console.error('Error getting bookmark', err);
  }
}

export async function createBookmark(cardID: string) {
  const db = await openDatabase();
  let statement;

  try {
    statement = await db.prepareAsync(`
      INSERT INTO bookmarks (
        card_id
      ) VALUES (
        $card_id
      ) ON CONFLICT DO NOTHING
      ;`);
    await statement.executeAsync({
      $card_id: cardID,
    });
  } catch (err) {
    console.error('Error creating bookmark', err);
  }
}

export async function deleteBookmark(cardID: string) {
  const db = await openDatabase();

  try {
    await db.runAsync(
      `
      DELETE
      FROM bookmarks
      WHERE card_id = $card_id
      ;`,
      {
        $card_id: cardID,
      }
    );
  } catch (err) {
    console.error('Error deleting bookmark', err);
  }
}
