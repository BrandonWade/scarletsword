import { RouteProp, useRoute } from '@react-navigation/native';
import { ScrollView, Text } from 'react-native';
import { ScreenNames } from '../../../../utils/enums';
import { StackParamsList } from '../../../../utils/navigation';

export default function Results() {
  const route = useRoute<RouteProp<StackParamsList, ScreenNames.Results>>();
  const { results } = route.params;

  return (
    <ScrollView>
      <Text>{JSON.stringify(results, null, 2)}</Text>
    </ScrollView>
  );
}
