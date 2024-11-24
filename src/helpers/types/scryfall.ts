type ImageURIs = {
  small?: string;
  normal?: string;
  large?: string;
  png?: string;
  art_crop?: string;
  border_crop?: string;
};

export type CardFace = {
  cmc?: number;
  colors?: string[];
  defense?: string;
  flavor_text?: string;
  image_uris?: ImageURIs;
  layout?: string;
  loyalty?: string;
  mana_cost: string;
  name: string;
  oracle_id?: string;
  oracle_text?: string;
  power?: string;
  toughness?: string;
  type_line?: string;
};

export type Card = {
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
  card_faces?: CardFace[];
};
