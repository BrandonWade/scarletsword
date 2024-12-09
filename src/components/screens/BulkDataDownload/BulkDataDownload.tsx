import React, { useState } from 'react';
import { Button, SafeAreaView, Text, View } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { resetDB } from '../../../db/utils';
import { ScreenNames } from '../../../utils/enums';
import { downloadFile, importFile } from '../../../utils/helpers';
import { StackParamsList } from '../../../utils/navigation';
import styles from './styles';

export default function BulkDataDownload() {
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState('');
  const route = useRoute<RouteProp<StackParamsList, ScreenNames.BulkDataDownload>>();
  const { name, size, description, updatedAt, downloadUri } = route.params;

  const onUpdateDetails = (newDetails) => {
    setDetails(newDetails);
  };

  const onPressDownload = async () => {
    setLoading(true);
    setDetails('');

    // TODO: Remove
    await resetDB();

    setDetails('Downloading file');
    const downloadedFile = await downloadFile(downloadUri, onUpdateDetails);

    await importFile(downloadedFile, onUpdateDetails);

    setLoading(false);
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.updatedAt}>Updated on {updatedAt}</Text>
          <Text style={styles.description}>{description}</Text>
          <View style={styles.footer}>
            <Button title={`Download (${size})`} disabled={loading} onPress={onPressDownload} />
            {details ? <Text style={styles.details}>{details}</Text> : null}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
