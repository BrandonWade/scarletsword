export enum BulkDataEnum {
  OracleCards = 'oracle_cards',
  UniqueArtwork = 'unique_artwork',
  DefaultCards = 'default_cards',
  AllCards = 'all_cards',
  Rulings = 'rulings',
}

export type BulkDataType = {
  id: string;
  type: BulkDataEnum;
  updated_at: string;
  name: string;
  description: string;
  size: number;
  download_uri: string;
};

export type ListBulkDataResponse = {
  data: BulkDataType[];
};
