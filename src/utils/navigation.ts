import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { BulkDataEnum, Navigators, ScreenNames } from './enums';

export type StackParamsList = {
  [Navigators.DrawerStack]: undefined;
  [ScreenNames.BookmarkList]: undefined;
  [ScreenNames.BulkDataDownload]: {
    type: BulkDataEnum;
    name: string;
    size: string;
    description: string;
    updatedAt: string;
    downloadUri: string;
  };
  [ScreenNames.BulkDataList]: undefined;
  [ScreenNames.Card]: {
    cardID: string;
    deckID?: string;
  };
  [ScreenNames.DeckList]: undefined;
  [ScreenNames.DeckBuilder]: {
    id: string;
    name: string;
    size: number;
  };
  [ScreenNames.DeckDetailsEditor]: {
    id: string;
  };
  [ScreenNames.Home]: undefined;
  [ScreenNames.CardList]: {
    deckID: string;
  };
  [ScreenNames.Search]: {
    deckID: string;
  };
};

export type StackNavigation = NavigationProp<StackParamsList | ParamListBase>;
