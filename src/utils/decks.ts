import { DeckItem, ScannedCard, ScannedDeck } from '../db/types';
import { DeckCardLocation } from './enums';

export function getColorString(cards: DeckItem[] = []) {
  const colors = new Set<string>();

  cards.forEach((card: DeckItem) => {
    if (!card?.faces) {
      return;
    }

    try {
      const faces = typeof card.faces === 'string' ? JSON.parse(card.faces) : card.faces;

      faces.forEach((face) => {
        if (face.is_white) {
          colors.add('{W}');
        }

        if (face.is_blue) {
          colors.add('{U}');
        }

        if (face.is_black) {
          colors.add('{B}');
        }

        if (face.is_red) {
          colors.add('{R}');
        }

        if (face.is_green) {
          colors.add('{G}');
        }

        if (face.mana_cost.indexOf('{C}') !== -1) {
          colors.add('{C}');
        }

        if (face.mana_cost.indexOf('{S}') !== -1) {
          colors.add('{S}');
        }
      });
    } catch (err) {
      console.error('Error retrieving color string', err);
    }
  });

  // Ensure the symbols appear in a consistent order in the string
  const sortOrder = {
    '{W}': 1,
    '{U}': 2,
    '{B}': 3,
    '{R}': 4,
    '{G}': 5,
    '{C}': 6,
    '{S}': 7,
  };

  return Array.from(colors)
    .sort((a: string, b: string) => sortOrder[a] - sortOrder[b])
    .join('');
}

export function parseExportedDeck(deckData: string): ScannedDeck {
  const deck = {};

  const locationMap = {
    c: DeckCardLocation.Creatures,
    s: DeckCardLocation.Spells,
    l: DeckCardLocation.Lands,
  };

  try {
    const parsedDeck = JSON.parse(deckData);
    deck['name'] = parsedDeck?.['name'];

    const versionTokens = parsedDeck['version'].split(':');
    deck['data_file'] = versionTokens?.[0];
    deck['data_file_updated_at'] = versionTokens?.[1] ? Number.parseInt(versionTokens?.[1]) : -1;

    deck['cards'] = parsedDeck?.['cards']?.split(',')?.map((card) => {
      const [count, card_id, locToken] = card?.split(':');
      return {
        count: Number.parseInt(count),
        card_id,
        location: locationMap[locToken],
      };
    });
  } catch {
    // TODO: Handle
    return;
  }

  return deck;
}

export function lookupScannedDeckCards(scannedDeckCards: ScannedCard[]) {
  const cardIDCountMap = new Map();

  scannedDeckCards.forEach((scannedDeckCard: ScannedCard) => {
    cardIDCountMap.set(scannedDeckCard.card_id, scannedDeckCard.count);
  });
}
