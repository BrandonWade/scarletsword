import { KeyboardTypeOptions, StyleProp, TextStyle } from 'react-native';

export type TextAreaFieldProps = {
  style?: StyleProp<TextStyle>;
  keyboardType?: KeyboardTypeOptions;
  placeholder?: string;
  value: string;
  onBlur?: () => void;
  onChangeText?: (value: string) => void;
};
