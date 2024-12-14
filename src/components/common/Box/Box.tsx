import { View } from 'react-native';
import styles from './styles';

export default function Box({ style, children }) {
  return <View style={[styles.box, style]}>{children}</View>;
}
