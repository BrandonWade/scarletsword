import * as Crypto from 'expo-crypto';
import { useFormik } from 'formik';
import uniq from 'lodash/uniq';
import React, { useLayoutEffect } from 'react';
import { Alert, Button, ScrollView, Text, View } from 'react-native';
import { ParamListBase, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { validationSchema } from './validation';
import styles from './styles';
import SymbolBox from './SymbolBox';
import SwitchField from '../../common/SwitchField';
import TextAreaField from '../../common/TextAreaField';
import TextInputField from '../../common/TextInputField';
import { upsertDeck, deleteDeck, getDeck, getDeckCards } from '../../../db/decks';
import { Deck, DeckListItem } from '../../../db/types';
import { getColorString } from '../../../utils/decks';
import { ColorSymbol, Navigators, ScreenNames } from '../../../utils/enums';
import { StackParamsList } from '../../../utils/navigation';
import commonStyles from '../../../utils/styles';
import { parseSymbolText } from '../../../utils/symbols';

export default function DeckDetailsEditor() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const route = useRoute<RouteProp<StackParamsList, ScreenNames.DeckDetailsEditor>>();
  const { id } = route.params || {};
  const { values, errors, setFieldValue, handleSubmit, isValid } = useFormik({
    initialValues: {
      id: Crypto.randomUUID(),
      name: 'Untitled Deck',
      notes: '',
      autoDetectColors: true,
      colors: [],
    },
    validationSchema,
    onSubmit: async () => {
      let colors = '';
      if (values.autoDetectColors) {
        const deckCards: DeckListItem[] = await getDeckCards(id);
        colors = getColorString(deckCards);
      } else {
        colors = values.colors.join('');
      }

      await upsertDeck({
        id: values.id,
        name: values.name,
        notes: values.notes,
        auto_detect_colors: values.autoDetectColors,
        colors,
      });
      navigation.goBack();
    },
  });
  const isEditing = id !== undefined;

  useLayoutEffect(() => {
    const fetchDeck = async () => {
      const result: Deck = await getDeck(id);
      if (!result?.id) {
        return;
      }

      setFieldValue('id', result?.id);
      setFieldValue('name', result?.name);
      setFieldValue('notes', result?.notes);
      setFieldValue('autoDetectColors', !!result?.auto_detect_colors);
      setFieldValue('colors', parseSymbolText(result?.colors));
    };

    if (id) {
      fetchDeck();
    }
  }, [id]);

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

  const onPressSymbol = (symbol: ColorSymbol) => {
    if (values.colors.includes(symbol)) {
      setFieldValue(
        'colors',
        values.colors.filter((color: ColorSymbol) => color !== symbol)
      );
    } else {
      setFieldValue('colors', uniq([...values.colors, symbol]));
    }
  };

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
    <ScrollView>
      <View style={[commonStyles.screenContainer, styles.form]}>
        <TextInputField
          label='Name'
          value={values.name}
          description={errors.name}
          onChangeText={(value: string) => setFieldValue('name', value)}
        />
        <TextAreaField
          label='Notes'
          value={values.notes}
          description={errors.notes}
          onChangeText={(value: string) => setFieldValue('notes', value)}
        />
        <SwitchField
          label='Automatically detect deck colors'
          value={values.autoDetectColors}
          onValueChange={(value: boolean) => setFieldValue('autoDetectColors', value)}
        />
        {!values.autoDetectColors ? (
          <View>
            <Text style={styles.symbolBoxLabel}>Select colors:</Text>
            <View style={styles.symbolBoxContainer}>
              {Object.values(ColorSymbol).map((symbol: ColorSymbol) => (
                <SymbolBox
                  key={symbol}
                  symbol={symbol}
                  isActive={values.colors.includes(symbol)}
                  onPressSymbol={onPressSymbol}
                />
              ))}
            </View>
          </View>
        ) : null}
      </View>
      {isEditing ? <Button title='Delete' onPress={onPressDelete} /> : null}
    </ScrollView>
  );
}
