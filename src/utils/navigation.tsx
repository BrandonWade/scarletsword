import Entypo from '@expo/vector-icons/Entypo';
import { TouchableOpacity } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BulkDataDownload from '../components/screens/BulkDataDownload';
import BulkDataList from '../components/screens/BulkDataList';
import DeckDetails from '../components/screens/DeckDetailsEditor';
import DeckList from '../components/screens/DeckList';
import { Navigators, ScreenNames, ScreenTitles } from './enums';
import styles from './styles';

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
  [ScreenNames.DeckList]: undefined;
  [ScreenNames.DeckDetailsEditor]: {
    id?: string;
    name?: string;
    notes?: string;
    colors?: string;
    size?: number;
  };
};

export type StackNavigation = NavigationProp<StackParamsList>;

const Drawer = createDrawerNavigator<StackParamsList, Navigators.RootDrawer>();
const Stack = createNativeStackNavigator<StackParamsList, Navigators.RootStack>();

function DrawerStack() {
  const navigation = useNavigation<StackNavigation>();

  const onPressItem = () => {
    navigation.navigate(ScreenNames.DeckDetailsEditor);
  };

  return (
    <Drawer.Navigator id={Navigators.RootDrawer} initialRouteName={ScreenNames.BulkDataList}>
      <Drawer.Screen
        name={ScreenNames.DeckList}
        options={{
          title: ScreenTitles.DeckList,
          headerRight: () => (
            <TouchableOpacity style={styles.headerButton} onPress={onPressItem}>
              <Entypo name='new-message' size={20} />
            </TouchableOpacity>
          ),
        }}
        component={DeckList}
      />
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
        options={{ headerShown: false, title: ScreenTitles.Back }}
        component={DrawerStack}
      />
      <Stack.Screen
        name={ScreenNames.BulkDataDownload}
        options={{ title: ScreenTitles.BulkDataDownload }}
        component={BulkDataDownload}
      />
      <Stack.Screen
        name={ScreenNames.DeckDetailsEditor}
        options={{ title: ScreenTitles.DeckDetailsEditor }}
        component={DeckDetails}
      />
    </Stack.Navigator>
  );
}
