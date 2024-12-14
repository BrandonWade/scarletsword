import { NavigationProp } from '@react-navigation/native';
import { BulkDataEnum, Navigators, ScreenNames } from './enums';

export type StackParamsList = {
  [Navigators.DrawerStack]: undefined;
  [ScreenNames.BulkDataDownload]: {
    type: BulkDataEnum;
    name: string;
    size: string;
    description: string;
    updatedAt: string;
    downloadUri: string;
  };
  [ScreenNames.BulkDataList]: undefined;
  [ScreenNames.DeckList]: undefined;
  [ScreenNames.DeckDetailsEditor]: Partial<{
    id: string;
    name: string;
    notes: string;
    colors: string;
    size: number;
  }>;
  [ScreenNames.Home]: undefined;
};

export type StackNavigation = NavigationProp<StackParamsList>;
