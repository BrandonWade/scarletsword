import { TextInput } from 'react-native';
import withFormField from '../../../utils/hocs/withFormField';
import styles from './styles';
import { TextAreaFieldProps } from './types';

function TextAreaField({
  style,
  keyboardType,
  placeholder,
  value,
  onBlur,
  onChangeText,
}: TextAreaFieldProps) {
  return (
    <TextInput
      style={[styles.input, style]}
      keyboardType={keyboardType}
      placeholder={placeholder}
      multiline={true}
      numberOfLines={4}
      value={value}
      onBlur={onBlur}
      onChangeText={onChangeText}
    />
  );
}

export default withFormField(TextAreaField);
