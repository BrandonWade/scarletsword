import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { Navigators, ScreenNames } from './enums';

export type StackParamsList = {
  [Navigators.DrawerStack]: undefined;
  [ScreenNames.BookmarkList]: undefined;
  [ScreenNames.CardData]: undefined;
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
