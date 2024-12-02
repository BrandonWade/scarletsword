export const cardsTable = `
CREATE TABLE IF NOT EXISTS cards (
    id TEXT NOT NULL,
    oracle_id TEXT DEFAULT NULL,
    lang TEXT NOT NULL,
    released_at TEXT NOT NULL,
    layout TEXT NOT NULL,
    mana_cost TEXT DEFAULT NULL,
    name TEXT NOT NULL,
    cmc REAL DEFAULT NULL,
    type_line TEXT DEFAULT NULL,
    rarity TEXT NOT NULL,
    set_id TEXT NOT NULL,
    scryfall_uri TEXT NOT NULL,
    gatherer_uri TEXT DEFAULT NULL,
    tcgplayer_infinite_decks_uri TEXT DEFAULT NULL,
    edhrec_uri TEXT DEFAULT NULL,
    tcgplayer_uri TEXT DEFAULT NULL,
    cardmarket_uri TEXT DEFAULT NULL,
    cardhoarder_uri TEXT DEFAULT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT NULL,
    PRIMARY KEY (id)
);
`;

export const cardFacesTable = `
CREATE TABLE IF NOT EXISTS card_faces (
    card_id TEXT NOT NULL,
    face_index INTEGER NOT NULL,
    name TEXT NOT NULL,
    cmc REAL DEFAULT NULL,
    defense TEXT DEFAULT NULL,
    flavor_text TEXT DEFAULT NULL,
    image_uri TEXT DEFAULT NULL,
    is_white INTEGER DEFAULT 0,
    is_blue INTEGER DEFAULT 0,
    is_black INTEGER DEFAULT 0,
    is_red INTEGER DEFAULT 0,
    is_green INTEGER DEFAULT 0,
    layout TEXT DEFAULT NULL,
    loyalty TEXT DEFAULT NULL,
    mana_cost TEXT NOT NULL,
    oracle_id TEXT DEFAULT NULL,
    oracle_text TEXT DEFAULT NULL,
    power TEXT DEFAULT NULL,
    toughness TEXT DEFAULT NULL,
    type_line TEXT DEFAULT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT NULL,
    UNIQUE (card_id, face_index),
    FOREIGN KEY (card_id) REFERENCES cards(id) ON DELETE CASCADE
);
`;

export const decksTable = `
CREATE TABLE IF NOT EXISTS decks (
    id TEXT NOT NULL,
    name TEXT NOT NULL,
    notes TEXT DEFAULT NULL,
    colors TEXT DEFAULT NULL,
    size INTEGER DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT NULL,
    PRIMARY KEY (id)
);
`;

export const deckCardsTable = `
CREATE TABLE IF NOT EXISTS deck_cards (
    id TEXT NOT NULL,
    deck_id TEXT NOT NULL,
    card_id TEXT NOT NULL,
    count TEXT NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (deck_id) REFERENCES decks(id) ON DELETE CASCADE,
    FOREIGN KEY (card_id) REFERENCES cards(id) ON DELETE CASCADE
);
`;
