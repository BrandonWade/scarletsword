import { KeyboardTypeOptions, StyleProp, TextStyle } from 'react-native';

export type TextInputFieldProps = {
  style?: StyleProp<TextStyle>;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoComplete?;
  autoCorrect?: boolean;
  keyboardType?: KeyboardTypeOptions;
  placeholder?: string;
  value: string;
  onBlur?: () => void;
  onChangeText?: (value: string) => void;
};
