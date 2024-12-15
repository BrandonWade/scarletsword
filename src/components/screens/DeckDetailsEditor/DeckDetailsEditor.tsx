import { useFormik } from 'formik';
import React from 'react';
import { Button, SafeAreaView, View } from 'react-native';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import styles from './styles';
import TextAreaField from '../../common/TextAreaField';
import TextInputField from '../../common/TextInputField';
import { upsertDeck } from '../../../db/decks';
import { Deck } from '../../../db/types';
import { ScreenNames } from '../../../utils/enums';
import commonStyles from '../../../utils/styles';

export default function DeckDetailsEditor() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { values, setFieldValue, handleSubmit } = useFormik({
    initialValues: {
      name: '',
      notes: '',
    },
    enableReinitialize: true,
    onSubmit: async () => {
      await upsertDeck(values as Deck);
      navigation.replace(ScreenNames.DeckBuilder, { name: values.name });
    },
  });

  return (
    <SafeAreaView>
      <View style={[commonStyles.screenContainer, styles.form]}>
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
