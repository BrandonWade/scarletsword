import { useLayoutEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { NumberInputFieldProps } from './types';
import withFormField from '../../../utils/hocs/withFormField';

function NumberInputField({
  value: valueProp = 0,
  min = 0,
  max = 999,
  onChange,
}: NumberInputFieldProps) {
  const [value, setValue] = useState(0);

  useLayoutEffect(() => {
    setValue(valueProp);
  }, [valueProp]);

  const onIncrement = () => {
    let updatedValue = value + 1;

    if (max !== undefined) {
      updatedValue = Math.min(updatedValue, max);
    }

    if (value !== updatedValue) {
      setValue(updatedValue);
      onChange?.(updatedValue);
    }
  };

  const onDecrement = () => {
    let updatedValue = value - 1;

    if (min !== undefined) {
      updatedValue = Math.max(updatedValue, min);
    }

    if (value !== updatedValue) {
      setValue(updatedValue);
      onChange?.(updatedValue);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onDecrement}>
        <Text style={styles.button}>-</Text>
      </TouchableOpacity>
      <TextInput style={styles.input} value={value.toString()} />
      <TouchableOpacity onPress={onIncrement}>
        <Text style={styles.button}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

export default withFormField(NumberInputField);
