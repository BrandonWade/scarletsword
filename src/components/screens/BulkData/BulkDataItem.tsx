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
        <Text>{name}</Text>
        <Text>{size}</Text>
        <Text>{description}</Text>
        <Text>{updatedAt}</Text>
      </View>
    </TouchableOpacity>
  );
}
