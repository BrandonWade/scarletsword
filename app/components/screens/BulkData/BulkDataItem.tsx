import byteSize from 'byte-size';
import dayjs from 'dayjs';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { BulkDataItemProps } from './types';
import loadBulkDataFile from '../../../helpers/importFile';
import { resetDB } from '../../../db/utils';

export default function BulkDataItem({
  name,
  size,
  description,
  updatedAt,
  downloadUri,
}: BulkDataItemProps) {
  const downloadFile = async () => {
    // TODO: Remove
    await resetDB();

    await loadBulkDataFile(downloadUri);
  };

  return (
    <TouchableOpacity onPress={downloadFile}>
      <View style={styles.bulkDataItem}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{name}</Text>
          <Text>{byteSize(size).toString()}</Text>
        </View>
        <Text>{description}</Text>
        <Text>Updated on {dayjs(updatedAt).format('YYYY-MM-DD')}</Text>
      </View>
    </TouchableOpacity>
  );
}
