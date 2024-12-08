import { NavigationProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BulkDataDownload from '../components/screens/BulkDataDownload';
import BulkDataList from '../components/screens/BulkDataList';
import { ScreenNames } from './enums';

export type StackParamsList = {
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

const Stack = createNativeStackNavigator<StackParamsList, 'RootStack'>();

export function RootStack() {
  return (
    <Stack.Navigator id='RootStack' initialRouteName={ScreenNames.BulkDataList}>
      <Stack.Screen
        name={ScreenNames.BulkDataList}
        options={{ title: 'Bulk Data' }}
        component={BulkDataList}
      />
      <Stack.Screen
        name={ScreenNames.BulkDataDownload}
        options={{ title: 'Download' }}
        component={BulkDataDownload}
      />
    </Stack.Navigator>
  );
}
