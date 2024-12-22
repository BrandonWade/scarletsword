import * as SQLite from 'expo-sqlite';
import { Card as ScryfallCard } from '../utils/scryfall/types';
import { Card, Count } from './types';

export async function upsertCards(cards: ScryfallCard[] = []) {
  const db = await SQLite.openDatabaseAsync('scarletsword.db');

  await db.withExclusiveTransactionAsync(async (tx) => {
    const cardStatement = await tx.prepareAsync(`
      INSERT INTO cards (
        id,
        oracle_id,
        lang,
        released_at,
        layout,
        mana_cost,
        name,
        cmc,
        type_line,
        rarity,
        set_id,
        scryfall_uri,
        gatherer_uri,
        tcgplayer_infinite_decks_uri,
        edhrec_uri,
        tcgplayer_uri,
        cardmarket_uri,
        cardhoarder_uri
      ) VALUES (
        $id,
        $oracle_id,
        $lang,
        $released_at,
        $layout,
        $mana_cost,
        $name,
        $cmc,
        $type_line,
        $rarity,
        $set_id,
        $scryfall_uri,
        $gatherer_uri,
        $tcgplayer_infinite_decks_uri,
        $edhrec_uri,
        $tcgplayer_uri,
        $cardmarket_uri,
        $cardhoarder_uri
      ) ON CONFLICT (id) DO UPDATE SET
        oracle_id = EXCLUDED.oracle_id,
        lang = EXCLUDED.lang,
        released_at = EXCLUDED.released_at,
        layout = EXCLUDED.layout,
        mana_cost = EXCLUDED.mana_cost,
        name = EXCLUDED.name,
        cmc = EXCLUDED.cmc,
        type_line = EXCLUDED.type_line,
        rarity = EXCLUDED.rarity,
        set_id = EXCLUDED.set_id,
        scryfall_uri = EXCLUDED.scryfall_uri,
        gatherer_uri = EXCLUDED.gatherer_uri,
        tcgplayer_infinite_decks_uri = EXCLUDED.tcgplayer_infinite_decks_uri,
        edhrec_uri = EXCLUDED.edhrec_uri,
        tcgplayer_uri = EXCLUDED.tcgplayer_uri,
        cardmarket_uri = EXCLUDED.cardmarket_uri,
        cardhoarder_uri = EXCLUDED.cardhoarder_uri,
        updated_at = DATETIME('NOW')
      ;`);
    const cardFaceStatement = await tx.prepareAsync(`
      INSERT INTO card_faces (
        card_id,
        face_index,
        name,
        cmc,
        defense,
        flavor_text,
        image_uri,
        is_white,
        is_blue,
        is_black,
        is_red,
        is_green,
        layout,
        loyalty,
        mana_cost,
        oracle_id,
        oracle_text,
        power,
        toughness,
        type_line
      ) VALUES (
        $card_id,
        $face_index,
        $name,
        $cmc,
        $defense,
        $flavor_text,
        $image_uri,
        $is_white,
        $is_blue,
        $is_black,
        $is_red,
        $is_green,
        $layout,
        $loyalty,
        $mana_cost,
        $oracle_id,
        $oracle_text,
        $power,
        $toughness,
        $type_line
      ) ON CONFLICT (card_id, face_index) DO UPDATE SET
        name = EXCLUDED.name,
        cmc = EXCLUDED.cmc,
        defense = EXCLUDED.defense,
        flavor_text = EXCLUDED.flavor_text,
        image_uri = EXCLUDED.image_uri,
        is_white = EXCLUDED.is_white,
        is_blue = EXCLUDED.is_blue,
        is_black = EXCLUDED.is_black,
        is_red = EXCLUDED.is_red,
        is_green = EXCLUDED.is_green,
        layout = EXCLUDED.layout,
        loyalty = EXCLUDED.loyalty,
        mana_cost = EXCLUDED.mana_cost,
        oracle_id = EXCLUDED.oracle_id,
        oracle_text = EXCLUDED.oracle_text,
        power = EXCLUDED.power,
        toughness = EXCLUDED.toughness,
        type_line = EXCLUDED.type_line,
        updated_at = DATETIME('NOW')
      ;`);

    cards.forEach(async (card) => {
      try {
        await cardStatement.executeAsync({
          $id: card.id,
          $oracle_id: card?.oracle_id ?? null,
          $lang: card.lang,
          $released_at: card.released_at,
          $layout: card.layout,
          $mana_cost: card.mana_cost,
          $name: card.name,
          $cmc: card.cmc,
          $type_line: card.type_line,
          $rarity: card.rarity,
          $set_id: card.set_id,
          $scryfall_uri: card.scryfall_uri,
          $gatherer_uri: card?.gatherer_uri ?? null,
          $tcgplayer_infinite_decks_uri: card?.tcgplayer_infinite_decks_uri ?? null,
          $edhrec_uri: card?.edhrec_uri ?? null,
          $tcgplayer_uri: card?.tcgplayer_uri ?? null,
          $cardmarket_uri: card?.cardmarket_uri ?? null,
          $cardhoarder_uri: card?.cardhoarder_uri ?? null,
        });

        const cardFaces = getCardFaces(card);
        cardFaces.forEach(async (cardFace, faceIndex) => {
          await cardFaceStatement.executeAsync({
            $card_id: card.id,
            $face_index: faceIndex,
            $name: cardFace.name,
            $cmc: cardFace?.cmc ?? null,
            $defense: cardFace?.defense ?? null,
            $flavor_text: cardFace?.flavor_text ?? null,
            $image_uri: cardFace?.image_uris?.normal ?? null,
            $is_white: cardFace?.colors?.includes('W') ?? null,
            $is_blue: cardFace?.colors?.includes('U') ?? null,
            $is_black: cardFace?.colors?.includes('B') ?? null,
            $is_red: cardFace?.colors?.includes('R') ?? null,
            $is_green: cardFace?.colors?.includes('G') ?? null,
            $layout: cardFace?.layout ?? null,
            $loyalty: cardFace?.loyalty ?? null,
            $mana_cost: cardFace?.mana_cost ?? null,
            $oracle_id: cardFace?.oracle_id ?? null,
            $oracle_text: cardFace?.oracle_text ?? null,
            $power: cardFace?.power ?? null,
            $toughness: cardFace?.toughness ?? null,
            $type_line: cardFace?.type_line ?? null,
          });
        });
      } catch (err) {
        console.error('Error inserting card data', err);
      } finally {
        await cardStatement.finalizeAsync();
        await cardFaceStatement.finalizeAsync();
      }
    });
  });
}

export async function numberOfCards() {
  const db = await SQLite.openDatabaseAsync('scarletsword.db', {
    useNewConnection: true,
  });

  try {
    const result: Count = await db.getFirstAsync(`
      SELECT
      COUNT(id) count
      FROM cards
      ;`);

    return result?.count;
  } catch (err) {
    console.error('Error fetching number of cards', err);
  }

  return 0;
}

function getCardFaces(card: ScryfallCard) {
  if (card?.card_faces && card.card_faces.length > 0) {
    return card.card_faces;
  }

  return [
    {
      cmc: card?.cmc,
      colors: card?.colors,
      defense: card?.defense,
      flavor_text: card?.flavor_text,
      image_uris: card?.image_uris,
      layout: card?.layout,
      loyalty: card?.loyalty,
      mana_cost: card?.mana_cost,
      name: card?.name,
      oracle_id: card?.oracle_id,
      oracle_text: card?.oracle_text,
      power: card?.power,
      toughness: card?.toughness,
      type_line: card?.type_line,
    },
  ];
}

export async function searchCards(name: string): Promise<Card[]> {
  const db = await SQLite.openDatabaseAsync('scarletsword.db');

  try {
    return db.getAllAsync(
      `
      SELECT
      JSON_GROUP_ARRAY(
        JSON_OBJECT(
          'card_id', f.card_id,
          'face_index', f.face_index,
          'name', f.name,
          'mana_cost', f.mana_cost,
          'is_white', f.is_white,
          'is_blue', f.is_blue,
          'is_black', f.is_black,
          'is_red', f.is_red,
          'is_green', f.is_green,
          'type_line', f.type_line,
          'oracle_text', f.oracle_text,
          'flavor_text', f.flavor_text,
          'image_uri', f.image_uri,
          'power', f.power,
          'toughness', f.toughness,
          'loyalty', f.loyalty
        )
      ) faces,
      c.*
      FROM cards c
      INNER JOIN card_faces f ON f.card_id = c.id
      WHERE c.name LIKE $name
      GROUP BY c.id
      ;`,
      {
        $name: `%${name}%`,
      }
    );
  } catch (err) {
    console.error('Error searching cards', err);
  }
}
