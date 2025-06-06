import { TextInput } from 'react-native';
import styles from './styles';
import { TextInputFieldProps } from './types';
import withFormField from '../../../utils/hocs/withFormField';

function TextInputField({
  style,
  autoCapitalize,
  autoComplete,
  autoCorrect,
  keyboardType,
  placeholder,
  value,
  onBlur,
  onChangeText,
}: TextInputFieldProps) {
  return (
    <TextInput
      style={[styles.input, style]}
      autoCapitalize={autoCapitalize}
      autoComplete={autoComplete}
      autoCorrect={autoCorrect}
      keyboardType={keyboardType}
      placeholder={placeholder}
      value={value}
      onBlur={onBlur}
      onChangeText={onChangeText}
    />
  );
}

export default withFormField(TextInputField);
