import { TextInput } from 'react-native';
import withFormField from '../../../utils/hocs/withFormField';
import styles from './styles';

function TextInputField({ style, keyboardType, placeholder, value, onBlur, onChangeText }) {
  return (
    <TextInput
      style={[styles.input, style]}
      keyboardType={keyboardType}
      placeholder={placeholder}
      value={value}
      onBlur={onBlur}
      onChangeText={onChangeText}
    />
  );
}

export default withFormField(TextInputField);
