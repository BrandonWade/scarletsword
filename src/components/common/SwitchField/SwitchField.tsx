import { Switch, Text, View } from 'react-native';
import styles from './styles';
import { SwitchFieldProps } from './types';

export default function SwitchField({ label, value, onValueChange }: SwitchFieldProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Switch value={value} onValueChange={onValueChange} />
    </View>
  );
}
