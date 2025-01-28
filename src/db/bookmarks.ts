import { openDatabase } from './connections';
import { BookmarkListItem } from './types';

export async function listBookmarks() {
  const db = await openDatabase();

  try {
    const result: BookmarkListItem[] = await db.getAllAsync(`
      SELECT
      b.*,
      c.*,
      f.faces
      FROM bookmarks b
      INNER JOIN cards c ON c.id = b.card_id
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
      ;`);

    return result;
  } catch (err) {
    console.error('Error listing bookmarks', err);
  }

  return [];
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
