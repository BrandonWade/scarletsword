import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Preview from './Preview';
import Results from './Results';
import Search from './Search';
import { Navigators, ScreenNames } from '../../../../utils/enums';
import { StackParamsList } from '../../../../utils/navigation';

const TabStack = createBottomTabNavigator<StackParamsList, Navigators.TabStack>();

export default function Tabs() {
  return (
    <TabStack.Navigator id={Navigators.TabStack} screenOptions={{ headerShown: false }}>
      <TabStack.Screen name={ScreenNames.Search} component={Search} />
      <TabStack.Screen name={ScreenNames.Results} component={Results} />
      <TabStack.Screen name={ScreenNames.Preview} component={Preview} />
    </TabStack.Navigator>
  );
}
