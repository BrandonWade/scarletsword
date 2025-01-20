import { Entypo } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CardList from './CardList';
import Search from './Search';
import { TabsProps } from './types';
import { Navigators, ScreenNames } from '../../../../utils/enums';
import { StackParamsList } from '../../../../utils/navigation';

const TabStack = createBottomTabNavigator<StackParamsList, Navigators.TabStack>();

export default function Tabs({ deckID, deckSize }: TabsProps) {
  return (
    <TabStack.Navigator
      id={Navigators.TabStack}
      initialRouteName={deckSize ? ScreenNames.CardList : ScreenNames.Search}
      screenOptions={{ headerShown: false }}
    >
      <TabStack.Screen
        name={ScreenNames.Search}
        options={{ tabBarIcon: () => <Entypo name='magnifying-glass' size={24} /> }}
        initialParams={{ deckID }}
        component={Search}
      />
      <TabStack.Screen
        name={ScreenNames.CardList}
        options={{ tabBarIcon: () => <Entypo name='list' size={24} /> }}
        initialParams={{ deckID }}
        component={CardList}
      />
    </TabStack.Navigator>
  );
}
