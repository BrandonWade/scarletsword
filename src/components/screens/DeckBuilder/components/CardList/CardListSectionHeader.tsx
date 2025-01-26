import { Text, View } from 'react-native';
import { CardListSectionHeaderProps } from './types';
import styles from './styles';

export default function CardListSectionHeader({ title }: CardListSectionHeaderProps) {
  return (
    <View style={styles.headerContentContainer}>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
}
