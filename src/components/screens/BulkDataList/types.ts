import { BulkDataEnum } from '../../../utils/enums';

export type BulkDataItemProps = {
  type: BulkDataEnum;
  name: string;
  size: number;
  description: string;
  updatedAt: string;
  downloadUri: string;
};
