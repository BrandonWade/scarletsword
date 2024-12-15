import { SafeAreaView, Text } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { ScreenNames } from '../../../utils/enums';
import { StackParamsList } from '../../../utils/navigation';

export default function DeckBuilder() {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<StackParamsList, ScreenNames.DeckBuilder>>();
  const { name } = route.params || {};

  navigation.setOptions({ title: name || ScreenNames.DeckBuilder });

  return (
    <SafeAreaView>
      <Text>Deck Builder</Text>
    </SafeAreaView>
  );
}
