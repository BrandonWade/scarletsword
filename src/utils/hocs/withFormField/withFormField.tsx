import { Text, View } from 'react-native';
import styles from './styles';

export default function withFormField(BaseComponent) {
  return function FormField(props) {
    const { label = '', children = [], description = '', ...rest } = props;

    return (
      <View>
        {label && <Text style={styles.label}>{label}</Text>}
        <BaseComponent {...rest}>{children}</BaseComponent>
        {description && <Text style={styles.description}>{description}</Text>}
      </View>
    );
  };
}
