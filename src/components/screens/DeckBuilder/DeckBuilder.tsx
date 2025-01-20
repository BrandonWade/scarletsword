import { useLayoutEffect } from 'react';
import { ParamListBase, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Tabs from './components/Tabs';
import { ScreenNames } from '../../../utils/enums';
import { StackParamsList } from '../../../utils/navigation';

export default function DeckBuilder() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const route = useRoute<RouteProp<StackParamsList, ScreenNames.DeckBuilder>>();
  const { id, name, size } = route.params || {};

  useLayoutEffect(() => {
    navigation.setOptions({
      title: name,
    });
  }, [name]);

  return <Tabs deckID={id} deckSize={size} />;
}
