import React from 'react';
import { Button, SafeAreaView, Text, View } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { resetDB } from '../../../db/utils';
import { ScreenNames } from '../../../helpers/enums';
import loadBulkDataFile from '../../../helpers/importFile';
import { StackParamsList } from '../../../helpers/navigation';
import styles from './styles';

export default function BulkDataDownload() {
  const route = useRoute<RouteProp<StackParamsList, ScreenNames.BulkDataDownload>>();
  const { name, size, description, updatedAt, downloadUri } = route.params;

  const downloadFile = async () => {
    // TODO: Remove
    await resetDB();

    await loadBulkDataFile(downloadUri);
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.updatedAt}>Updated on {updatedAt}</Text>
          <Text style={styles.description}>{description}</Text>
          <View style={styles.downloadContainer}>
            <Button title={`Download (${size})`} onPress={downloadFile} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
