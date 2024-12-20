import { useFormik } from 'formik';
import { Button, ScrollView, View } from 'react-native';
import TextInputField from '../../../common/TextInputField';
import commonStyles from '../../../../utils/styles';
import styles from '../styles';
import { searchCards } from '../../../../db/cards';

export default function Search() {
  const { values, setFieldValue, handleSubmit } = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: async () => {
      const result = await searchCards(values.name);

      // TODO: Display results
      console.log('Results: ', JSON.stringify(result, null, 2));
    },
  });

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
          <Button title='Search' onPress={() => handleSubmit()} />
        </View>
      </ScrollView>
    </View>
  );
}
