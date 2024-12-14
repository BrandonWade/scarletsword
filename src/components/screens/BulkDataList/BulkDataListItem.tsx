import byteSize from 'byte-size';
import dayjs from 'dayjs';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { BulkDataItemProps } from './types';
import Box from '../../common/Box';
import { ScreenNames } from '../../../utils/enums';
import { StackNavigation } from '../../../utils/navigation';
import commonStyles from '../../../utils/styles';

export default function BulkDataListItem({
  type,
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
      type,
      name,
      size: formattedSize,
      description,
      updatedAt: formattedUpdatedAt,
      downloadUri,
    });
  };

  return (
    <TouchableOpacity onPress={onPressItem}>
      <Box style={styles.listItem}>
        <View style={styles.nameRow}>
          <Text style={commonStyles.titleMd}>{name}</Text>
          <Text>{formattedSize}</Text>
        </View>
        <Text>{description}</Text>
        <Text>Updated on {formattedUpdatedAt}</Text>
      </Box>
    </TouchableOpacity>
  );
}
