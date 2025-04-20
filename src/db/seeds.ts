import { conditionallyUpdateDeckColors } from './decks';
import { openDatabase } from './connections';

export async function seedTables() {
  await seedDecks();
  await seedBookmarks();
}

async function seedDecks() {
  console.info('Seeding decks');
  const db = await openDatabase();

  try {
    await db.execAsync(`
        INSERT INTO decks (id, name, notes)
        VALUES
        ('f29c3c8a-c770-44da-8cb9-d0bd82552157', 'Annoying Deck', 'Contains a variety of cards with annoying properties.')
        ('967c407a-b56b-4908-a048-e2f45b6ab034', 'Zombie', 'Contains various zombie cards.');
        ON CONFLICT DO NOTHING;

        INSERT INTO deck_cards (deck_id, card_id, count, location)
        VALUES
        ('f29c3c8a-c770-44da-8cb9-d0bd82552157', '00cbe506-7332-4d29-9404-b7c6e1e791d8', 1, 'spells'),
        ('f29c3c8a-c770-44da-8cb9-d0bd82552157', 'd15c6375-2e4e-47f7-88e1-d90794e7f724', 1, 'creatures'),
        ('f29c3c8a-c770-44da-8cb9-d0bd82552157', '80fffad3-2486-4350-8dff-54a215ebfc28', 1, 'creatures'),
        ('f29c3c8a-c770-44da-8cb9-d0bd82552157', 'a5137c28-632f-40f4-bf9d-877f5f070987', 1, 'creatures'),
        ('f29c3c8a-c770-44da-8cb9-d0bd82552157', '77fe1662-7927-4909-8d25-6924e6fc27eb', 1, 'spells'),
        ('f29c3c8a-c770-44da-8cb9-d0bd82552157', 'e8241a53-8b88-474e-a46c-44b3d1f3b0df', 1, 'spells'),
        ('f29c3c8a-c770-44da-8cb9-d0bd82552157', '73636ca0-2309-4bb3-9300-8bd0c0bb5b31', 1, 'creatures'),
        ('f29c3c8a-c770-44da-8cb9-d0bd82552157', '67f4c93b-080c-4196-b095-6a120a221988', 1, 'lands'),
        ('f29c3c8a-c770-44da-8cb9-d0bd82552157', 'fea4a077-718b-44af-87be-90df61aab643', 1, 'spells'),
        ('f29c3c8a-c770-44da-8cb9-d0bd82552157', '5c1f3f52-cb9b-4b2a-bb02-6175897ae76e', 1, 'creatures'),
        ('f29c3c8a-c770-44da-8cb9-d0bd82552157', '8e259868-d29a-4c03-8ec3-49e914f849fb', 1, 'spells'),
        ('f29c3c8a-c770-44da-8cb9-d0bd82552157', 'db84415e-048a-4cfc-9121-5ae17a412198', 1, 'spells'),
        ('f29c3c8a-c770-44da-8cb9-d0bd82552157', 'c2462fdf-a594-47d0-8e10-b55901e350d9', 1, 'spells'),
        ('967c407a-b56b-4908-a048-e2f45b6ab034', '6987d609-ba0f-42bf-9b61-bdfb943c03b5', 4, 'creatures'),
        ('967c407a-b56b-4908-a048-e2f45b6ab034', '2a0d7998-2f3d-43b8-a0be-6ff7e5c83223', 4, 'creatures'),
        ('967c407a-b56b-4908-a048-e2f45b6ab034', 'f0bfdb9e-318f-4acd-9fbd-41b98a8875d6', 20, 'lands'),
        ('967c407a-b56b-4908-a048-e2f45b6ab034', '32f1f022-da7f-49a4-881d-b3a2c54c38eb', 2, 'creatures');
        ON CONFLICT DO NOTHING;
      `);

    await conditionallyUpdateDeckColors('f29c3c8a-c770-44da-8cb9-d0bd82552157');
  } catch (err) {
    console.error('Error seeding decks', err);
  }
}

async function seedBookmarks() {
  console.info('Seeding bookmarks');
  const db = await openDatabase();

  try {
    await db.execAsync(`
        INSERT INTO bookmarks (card_id)
        VALUES
        ('0b61d772-2d8b-4acf-9dd2-b2e8b03538c8'),
        ('45b090c7-f1ba-4656-8b51-915fc1876922'),
        ('5fbc6091-a161-45b0-9932-543b569caaee'),
        ('d15c6375-2e4e-47f7-88e1-d90794e7f724'),
        ('80fffad3-2486-4350-8dff-54a215ebfc28'),
        ('a5137c28-632f-40f4-bf9d-877f5f070987')
        ON CONFLICT DO NOTHING;
      `);
  } catch (err) {
    console.error('Error seeding bookmarks', err);
  }
}
