import * as Crypto from 'expo-crypto';
import { useFormik } from 'formik';
import React, { useLayoutEffect } from 'react';
import { Button, SafeAreaView, View } from 'react-native';
import { ParamListBase, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import styles from './styles';
import TextAreaField from '../../common/TextAreaField';
import TextInputField from '../../common/TextInputField';
import { upsertDeck } from '../../../db/decks';
import { Deck } from '../../../db/types';
import { ScreenNames } from '../../../utils/enums';
import { StackParamsList } from '../../../utils/navigation';
import commonStyles from '../../../utils/styles';

export default function DeckDetailsEditor() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const route = useRoute<RouteProp<StackParamsList, ScreenNames.DeckBuilder>>();
  const { id, name, notes } = route.params || {};
  const isEditing = id !== undefined;

  useLayoutEffect(() => {
    if (!isEditing) {
      return;
    }

    navigation.setOptions({
      animationTypeForReplace: 'pop',
      headerLeft: () => (
        <Button
          title='Cancel'
          onPress={() => navigation.replace(ScreenNames.DeckBuilder, route.params)}
        />
      ),
    });
  }, [isEditing]);

  const { values, setFieldValue, handleSubmit } = useFormik({
    initialValues: {
      id: id || Crypto.randomUUID(),
      name: name || '',
      notes: notes || '',
    },
    onSubmit: async () => {
      await upsertDeck(values as Deck);
      navigation.replace(ScreenNames.DeckBuilder, { ...values });
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
        <Button title={isEditing ? 'Update' : 'Create'} onPress={() => handleSubmit()} />
      </View>
    </SafeAreaView>
  );
}
