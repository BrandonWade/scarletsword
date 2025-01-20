import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CardList from './CardList';
import Search from './Search';
import { Navigators, ScreenNames } from '../../../../utils/enums';
import { StackParamsList } from '../../../../utils/navigation';
import { Entypo } from '@expo/vector-icons';

const TabStack = createBottomTabNavigator<StackParamsList, Navigators.TabStack>();

export default function Tabs({ deckID }) {
  return (
    <TabStack.Navigator id={Navigators.TabStack} screenOptions={{ headerShown: false }}>
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
