import { connectToDatabase } from '.';
import { Card } from '../src/helpers/types/scryfall';

export async function insertCards(cards: Card[] = []) {
  const db = await connectToDatabase();

  // TODO: Handle card faces

  const parameters = cards.map(card => {
    return [
      card.id,
      card?.oracle_id ?? null,
      card.lang,
      card.released_at,
      card.layout,
      card.mana_cost,
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
  });

  let result;

  try {
    result = await db.executeSql(
      `
INSERT INTO cards (
    id,
    oracle_id,
    lang,
    released_at,
    layout,
    mana_cost,
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
    cardhoarder_uri,
) VALUES ${1}
    `,
      parameters,
    );
  } catch (error) {
    console.error('Error inserting cards', error, cards);
  }

  return result;
}
