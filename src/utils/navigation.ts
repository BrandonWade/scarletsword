import { NavigationProp } from '@react-navigation/native';
import { Navigators, ScreenNames } from './enums';

export type StackParamsList = {
  [Navigators.DrawerStack]: undefined;
  [ScreenNames.BulkDataDownload]: {
    name: string;
    size: string;
    description: string;
    updatedAt: string;
    downloadUri: string;
  };
  [ScreenNames.BulkDataList]: undefined;
  [ScreenNames.DeckList]: undefined;
  [ScreenNames.DeckDetailsEditor]: {
    id?: string;
    name?: string;
    notes?: string;
    colors?: string;
    size?: number;
  };
  [ScreenNames.Home]: undefined;
};

export type StackNavigation = NavigationProp<StackParamsList>;
