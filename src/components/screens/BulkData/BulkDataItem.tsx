import byteSize from 'byte-size';
import dayjs from 'dayjs';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { BulkDataItemProps } from './types';

export default function BulkDataItem({
  name,
  size,
  description,
  updatedAt,
  downloadUri,
}: BulkDataItemProps) {
  return (
    <TouchableOpacity onPress={() => console.log(downloadUri)}>
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
