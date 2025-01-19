import { Entypo } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { ActionButtonProps } from './types';

export default function ActionButton({
  iconName,
  iconSize,
  text,
  isCompact = false,
  onPress,
}: ActionButtonProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.actionButton}>
        <Entypo name={iconName} size={iconSize} />
        {!isCompact ? <Text>{text}</Text> : null}
      </View>
    </TouchableOpacity>
  );
}
