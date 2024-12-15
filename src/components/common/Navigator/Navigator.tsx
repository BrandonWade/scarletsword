import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Navigators, ScreenNames } from '../../../utils/enums';
import { StackParamsList } from '../../../utils/navigation';
import BulkDataDownload from '../../screens/BulkDataDownload';
import DeckBuilder from '../../screens/DeckBuilder';
import DeckDetailsEditor from '../../screens/DeckDetailsEditor';
import Drawer from './Drawer';

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
      <RootStack.Screen name={ScreenNames.DeckDetailsEditor} component={DeckDetailsEditor} />
      <RootStack.Screen name={ScreenNames.DeckBuilder} component={DeckBuilder} />
    </RootStack.Navigator>
  );
}
