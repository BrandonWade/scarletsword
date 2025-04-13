import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { Navigators, ScreenNames } from './enums';

export type StackParamsList = {
  [Navigators.DrawerStack]: undefined;
  [ScreenNames.BookmarkList]: undefined;
  [ScreenNames.Card]: {
    cardID: string;
    deckID?: string;
  };
  [ScreenNames.CardData]: undefined;
  [ScreenNames.CardList]: {
    deckID: string;
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
  [ScreenNames.Search]: {
    deckID: string;
  };
  [ScreenNames.ShareDeck]: {
    id: string;
    name: string;
  };
};

export type StackNavigation = NavigationProp<StackParamsList | ParamListBase>;
