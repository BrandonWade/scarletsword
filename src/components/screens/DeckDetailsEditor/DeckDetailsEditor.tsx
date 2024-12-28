import * as Crypto from 'expo-crypto';
import { useFormik } from 'formik';
import React, { useLayoutEffect } from 'react';
import { Alert, Button, SafeAreaView, View } from 'react-native';
import { ParamListBase, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { validationSchema } from './validation';
import styles from './styles';
import TextAreaField from '../../common/TextAreaField';
import TextInputField from '../../common/TextInputField';
import { upsertDeck, deleteDeck } from '../../../db/decks';
import { Deck } from '../../../db/types';
import { Navigators, ScreenNames } from '../../../utils/enums';
import { StackParamsList } from '../../../utils/navigation';
import commonStyles from '../../../utils/styles';

export default function DeckDetailsEditor() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const route = useRoute<RouteProp<StackParamsList, ScreenNames.DeckDetailsEditor>>();
  const { id, name, notes } = route.params || {};
  const { values, errors, setFieldValue, handleSubmit, isValid } = useFormik({
    initialValues: {
      id: id || Crypto.randomUUID(),
      name: name || 'Untitled Deck',
      notes: notes || '',
    },
    validationSchema,
    onSubmit: async () => {
      await upsertDeck(values as Deck);
      navigation.goBack();
    },
  });
  const isEditing = id !== undefined;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title={isEditing ? 'Save' : 'Create'}
          disabled={!isValid}
          onPress={() => handleSubmit()}
        />
      ),
    });
  }, [isValid]);

  const onPressDelete = async () => {
    Alert.alert('Delete Deck', 'Are you sure you want to delete this deck?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: async () => {
          await deleteDeck(values.id);
          navigation.replace(Navigators.DrawerStack, { screen: ScreenNames.DeckList });
        },
        style: 'destructive',
      },
    ]);
  };

  return (
    <SafeAreaView>
      <View style={[commonStyles.screenContainer, styles.form]}>
        <TextInputField
          label='Name'
          value={values.name}
          description={errors.name}
          onChangeText={(value) => setFieldValue('name', value)}
        />
        <TextAreaField
          label='Notes'
          value={values.notes}
          description={errors.notes}
          onChangeText={(value) => setFieldValue('notes', value)}
        />
      </View>
      {isEditing ? <Button title='Delete' onPress={onPressDelete} /> : null}
    </SafeAreaView>
  );
}
