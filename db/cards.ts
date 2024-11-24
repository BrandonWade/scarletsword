import { connectToDatabase } from '.';
import { Card } from '../src/helpers/types/scryfall';

export async function insertCards(cards: Card[] = []) {
  const db = await connectToDatabase();

  await db.transaction(async tx => {
    cards.forEach(async card => {
      const [cardID, ...remainingCardParams] = [
        card.id,
        card?.oracle_id ?? null,
        card.lang,
        card.released_at,
        card.layout,
        card.mana_cost,
        card.name,
        card.cmc,
        card.type_line,
        card.rarity,
        card.set_id,
        card.scryfall_uri,
        card?.gatherer_uri ?? null,
        card?.tcgplayer_infinite_decks_uri ?? null,
        card?.edhrec_uri ?? null,
        card?.tcgplayer_uri ?? null,
        card?.cardmarket_uri ?? null,
        card?.cardhoarder_uri ?? null,
      ];
      try {
        await tx.executeSql(
          `
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
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?
            ) ON CONFLICT (id) DO UPDATE SET
                oracle_id = ?,
                lang = ?,
                released_at = ?,
                layout = ?,
                mana_cost = ?,
                name = ?,
                cmc = ?,
                type_line = ?,
                rarity = ?,
                set_id = ?,
                scryfall_uri = ?,
                gatherer_uri = ?,
                tcgplayer_infinite_decks_uri = ?,
                edhrec_uri = ?,
                tcgplayer_uri = ?,
                cardmarket_uri = ?,
                cardhoarder_uri = ?,
                updated_at = DATETIME('NOW')
          `,
          [cardID, ...remainingCardParams, ...remainingCardParams],
        );

        // TODO: Handle card faces
      } catch (error) {
        console.error('Error inserting cards', error, cards);
      }
    });
  });
}

export async function numberOfCards() {
  const db = await connectToDatabase();

  const result = await db.executeSql(`
    SELECT
    COUNT(id) count
    FROM cards
    ;
    `);

  return result[0].rows.item(0)?.count;
}
