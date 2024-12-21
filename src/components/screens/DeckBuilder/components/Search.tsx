import { useFormik } from 'formik';
import { useLayoutEffect } from 'react';
import { Button, ScrollView, View } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import styles from '../styles';
import TextInputField from '../../../common/TextInputField';
import { searchCards } from '../../../../db/cards';
import { ScreenNames } from '../../../../utils/enums';
import { StackNavigation } from '../../../../utils/navigation';
import commonStyles from '../../../../utils/styles';

export default function Search() {
  const navigation = useNavigation<StackNavigation>();
  const isFocused = useIsFocused();
  const { values, setFieldValue, handleSubmit } = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: async () => {
      const results = await searchCards(values.name);
      navigation.navigate(ScreenNames.Results, {
        results,
      });
    },
  });

  useLayoutEffect(() => {
    navigation.getParent().setOptions({
      headerRight: () => {
        if (!isFocused) {
          return null;
        }

        return <Button title='Search' onPress={() => handleSubmit()} />;
      },
    });
  }, [isFocused]);

  return (
    <View style={commonStyles.screenContainer}>
      <ScrollView>
        <View style={styles.searchContainer}>
          <TextInputField
            label='Name'
            value={values.name}
            description='Any words that appear in the name of the card.'
            onChangeText={(value) => setFieldValue('name', value)}
          />
        </View>
      </ScrollView>
    </View>
  );
}
