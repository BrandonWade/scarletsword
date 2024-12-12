import { useFormik } from 'formik';
import React from 'react';
import { Button, SafeAreaView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TextAreaField from '../../common/TextAreaField';
import TextInputField from '../../common/TextInputField';
import { upsertDeck } from '../../../db/decks';
import { StackNavigation } from '../../../utils/navigation';
import styles from './styles';

export default function DeckDetailsEditor() {
  const navigation = useNavigation<StackNavigation>();
  const { values, setFieldValue, handleSubmit } = useFormik({
    initialValues: {
      name: '',
      notes: '',
    },
    enableReinitialize: true,
    onSubmit: async () => {
      await upsertDeck(values);

      // TODO: Navigate to DeckBuilder instead of going back to the DeckList
      navigation.goBack();
    },
  });

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TextInputField
          label='Name'
          value={values.name}
          onChangeText={(value) => setFieldValue('name', value)}
        />
        <TextAreaField
          label='Notes'
          value={values.notes}
          onChangeText={(value) => setFieldValue('notes', value)}
        />
        <Button title='Create' onPress={() => handleSubmit()} />
      </View>
    </SafeAreaView>
  );
}
