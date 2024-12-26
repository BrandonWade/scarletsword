import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Drawer from './Drawer';
import BulkDataDownload from '../../screens/BulkDataDownload';
import DeckBuilder from '../../screens/DeckBuilder';
import Card from '../../screens/Card';
import DeckDetailsEditor from '../../screens/DeckDetailsEditor';
import { Navigators, ScreenNames } from '../../../utils/enums';
import { StackParamsList } from '../../../utils/navigation';

const RootStack = createNativeStackNavigator<StackParamsList, Navigators.RootStack>();

export default function Navigator() {
  return (
    <RootStack.Navigator id={Navigators.RootStack}>
      <RootStack.Screen
        name={Navigators.DrawerStack}
        options={({ route }) => ({
          headerShown: false,
          // Display the name of the previous screen on the back button, otherwise fallback to the first screen visible after the app launches
          title: getFocusedRouteNameFromRoute(route) ?? ScreenNames.Home,
        })}
        component={Drawer}
      />
      <RootStack.Screen name={ScreenNames.BulkDataDownload} component={BulkDataDownload} />
      <RootStack.Screen
        name={ScreenNames.Card}
        options={{ presentation: 'modal' }}
        component={Card}
      />
      <RootStack.Screen name={ScreenNames.DeckDetailsEditor} component={DeckDetailsEditor} />
      <RootStack.Screen name={ScreenNames.DeckBuilder} component={DeckBuilder} />
    </RootStack.Navigator>
  );
}
