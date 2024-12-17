import { Entypo } from '@expo/vector-icons';
import { useLayoutEffect } from 'react';
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { ParamListBase, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScreenNames } from '../../../utils/enums';
import { StackParamsList } from '../../../utils/navigation';

export default function DeckBuilder() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const route = useRoute<RouteProp<StackParamsList, ScreenNames.DeckBuilder>>();
  const { id, name, notes } = route.params || {};

  const onPressEditDeckDetails = () => {
    navigation.replace(ScreenNames.DeckDetailsEditor, {
      id,
      name,
      notes,
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: name || ScreenNames.DeckBuilder,
      headerRight: () => (
        <TouchableOpacity onPress={onPressEditDeckDetails}>
          <Entypo name='edit' size={20} />
        </TouchableOpacity>
      ),
    });
  }, [route.params]);

  return (
    <SafeAreaView>
      <Text>Deck Builder</Text>
    </SafeAreaView>
  );
}
