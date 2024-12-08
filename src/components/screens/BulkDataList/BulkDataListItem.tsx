import byteSize from 'byte-size';
import dayjs from 'dayjs';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { BulkDataItemProps } from './types';
import { ScreenNames } from '../../../helpers/enums';
import { StackNavigation } from '../../../helpers/navigation';

export default function BulkDataListItem({
  name,
  size,
  description,
  updatedAt,
  downloadUri,
}: BulkDataItemProps) {
  const navigation = useNavigation<StackNavigation>();
  const formattedSize = byteSize(size).toString();
  const formattedUpdatedAt = dayjs(updatedAt).format('YYYY-MM-DD');

  const onPressItem = () => {
    navigation.navigate(ScreenNames.BulkDataDownload, {
      name,
      size: formattedSize,
      description,
      updatedAt: formattedUpdatedAt,
      downloadUri,
    });
  };

  return (
    <TouchableOpacity onPress={onPressItem}>
      <View style={styles.bulkDataListItem}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{name}</Text>
          <Text>{formattedSize}</Text>
        </View>
        <Text>{description}</Text>
        <Text>Updated on {formattedUpdatedAt}</Text>
      </View>
    </TouchableOpacity>
  );
}
