import { BulkDataEnum } from './enums';

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
