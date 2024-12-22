import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { BulkDataEnum, Navigators, ScreenNames } from './enums';
import { Card } from '../db/types';

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
  [ScreenNames.DeckBuilder]: {
    id: string;
    name: string;
    notes: string;
  };
  [ScreenNames.DeckDetailsEditor]: Partial<{
    id: string;
    name: string;
    notes: string;
  }>;
  [ScreenNames.Home]: undefined;
  [ScreenNames.Preview]: undefined;
  [ScreenNames.Results]: {
    results: Card[];
  };
  [ScreenNames.Search]: undefined;
};

export type StackNavigation = NavigationProp<StackParamsList | ParamListBase>;
