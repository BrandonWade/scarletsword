import { NavigationProp } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BulkDataDownload from '../components/screens/BulkDataDownload';
import BulkDataList from '../components/screens/BulkDataList';
import { Navigators, ScreenNames, ScreenTitles } from './enums';

export type StackParamsList = {
  [Navigators.RootDrawer]: undefined;
  [ScreenNames.BulkDataDownload]: {
    name: string;
    size: string;
    description: string;
    updatedAt: string;
    downloadUri: string;
  };
  [ScreenNames.BulkDataList]: undefined;
};

export type StackNavigation = NavigationProp<StackParamsList>;

const Drawer = createDrawerNavigator<StackParamsList, Navigators.RootDrawer>();
const Stack = createNativeStackNavigator<StackParamsList, Navigators.RootStack>();

function DrawerStack() {
  return (
    <Drawer.Navigator id={Navigators.RootDrawer} initialRouteName={ScreenNames.BulkDataList}>
      <Drawer.Screen
        name={ScreenNames.BulkDataList}
        options={{ title: ScreenTitles.BulkDataList }}
        component={BulkDataList}
      />
    </Drawer.Navigator>
  );
}

export function Navigator() {
  return (
    <Stack.Navigator id={Navigators.RootStack}>
      <Stack.Screen
        name={Navigators.RootDrawer}
        options={{
          headerShown: false,
          title: ScreenTitles.Back,
        }}
        component={DrawerStack}
      />
      <Stack.Screen
        name={ScreenNames.BulkDataDownload}
        options={{ title: ScreenTitles.BulkDataDownload }}
        component={BulkDataDownload}
      />
    </Stack.Navigator>
  );
}
