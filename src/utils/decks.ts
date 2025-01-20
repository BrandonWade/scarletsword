import { DeckListItem } from '../db/types';

export function getColorString(cards: DeckListItem[] = []) {
  const colors = new Set();

  cards.forEach((card) => {
    if (!card?.faces) {
      return;
    }

    try {
      const faces = typeof card.faces === 'string' ? JSON.parse(card.faces) : card.faces;

      faces.forEach((face) => {
        if (face.mana_cost.indexOf('{W}') !== -1) {
          colors.add('{W}');
        }

        if (face.mana_cost.indexOf('{U}') !== -1) {
          colors.add('{U}');
        }

        if (face.mana_cost.indexOf('{B}') !== -1) {
          colors.add('{B}');
        }

        if (face.mana_cost.indexOf('{R}') !== -1) {
          colors.add('{R}');
        }

        if (face.mana_cost.indexOf('{G}') !== -1) {
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
