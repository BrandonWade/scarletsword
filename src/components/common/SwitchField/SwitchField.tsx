import { Switch, Text, View } from 'react-native';
import styles from './styles';

export default function SwitchField({ label, value, onValueChange }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Switch value={value} onValueChange={onValueChange} />
    </View>
  );
}
