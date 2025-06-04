import Entypo from '@expo/vector-icons/Entypo';
import { TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import BookmarkList from '../../screens/BookmarkList';
import CardData from '../../screens/CardData';
import DeckList from '../../screens/DeckList';
import Home from '../../screens/Home';
import ScanDeck from '../../screens/ScanDeck';
import { Navigators, ScreenNames } from '../../../utils/enums';
import { StackNavigation, StackParamsList } from '../../../utils/navigation';

const DrawerStack = createDrawerNavigator<StackParamsList, Navigators.DrawerStack>();

export default function Drawer() {
  const navigation = useNavigation<StackNavigation>();

  const onPressNewDeck = () => {
    navigation.navigate(ScreenNames.DeckDetailsEditor);
  };

  return (
    <DrawerStack.Navigator id={Navigators.DrawerStack} initialRouteName={ScreenNames.Home}>
      <DrawerStack.Screen name={ScreenNames.Home} component={Home} />
      <DrawerStack.Screen
        name={ScreenNames.DeckList}
        options={{
          headerRight: () => (
            <TouchableOpacity style={styles.newDeck} onPress={onPressNewDeck}>
              <Entypo name='new-message' size={20} />
            </TouchableOpacity>
          ),
        }}
        component={DeckList}
      />
      <DrawerStack.Screen name={ScreenNames.BookmarkList} component={BookmarkList} />
      <DrawerStack.Screen name={ScreenNames.CardData} component={CardData} />
      {/* <DrawerStack.Screen name={ScreenNames.ScanDeck} component={ScanDeck} /> */}
    </DrawerStack.Navigator>
  );
}
