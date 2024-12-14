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
  colors: string;
  size: number;
  created_at: string;
  updated_at: string;
};
