import { BulkDataEnum } from '../utils/enums';

export type DataImport = {
  type: BulkDataEnum;
  created_at: string;
  updated_at: string;
};

export type Count = {
  count: number;
};

export type Deck = {
  id: string;
  name: string;
  notes: string;
  auto_detect_colors: boolean;
  colors: string;
  created_at?: string;
  updated_at?: string;
};

export type DeckCard = {
  deck_id: string;
  card_id: string;
  count: number;
  created_at: string;
  updated_at: string;
};

export type DeckListItem = DeckCard & {
  faces: string;
};

export type CardFace = {
  card_id: string;
  face_index: number;
  name: string;
  mana_cost: string;
  is_white: boolean;
  is_blue: boolean;
  is_black: boolean;
  is_red: boolean;
  is_green: boolean;
  type_line?: string;
  oracle_text?: string;
  flavor_text?: string;
  image_uri?: string;
  power?: string;
  toughness?: string;
  loyalty?: string;
};

export type Card = {
  faces: string;
  id: string;
  oracle_id: string;
  lang: string;
  released_at: string;
  layout: string;
  mana_cost: string;
  name: string;
  cmc: number;
  type_line: string;
  rarity: string;
  set_id: string;
  scryfall_uri: string;
  gatherer_uri: string;
  tcgplayer_infinite_decks_uri: string;
  edhrec_uri: string;
  tcgplayer_uri: string;
  cardmarket_uri: string;
  cardhoarder_uri: string;
  created_at: string;
  updated_at: string;
};
