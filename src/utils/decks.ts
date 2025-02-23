import { DeckItem } from '../db/types';

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
