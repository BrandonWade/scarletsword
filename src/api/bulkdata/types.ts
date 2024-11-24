export enum BulkDataType {
  OracleCards = 'oracle_cards',
  UniqueArtwork = 'unique_artwork',
  DefaultCards = 'default_cards',
  AllCards = 'all_cards',
  Rulings = 'rulings',
}

export type BulkData = {
  id: string;
  type: BulkDataType;
  updated_at: string;
  name: string;
  description: string;
  size: number;
  download_uri: string;
};

export type ListBulkDataResponse = {
  data: BulkData[];
};
