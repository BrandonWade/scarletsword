import React, { useState } from 'react';
import { Button, SafeAreaView, Text, View } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { resetTables } from '../../../db';
import { ScreenNames } from '../../../utils/enums';
import { downloadFile, importFile } from '../../../utils/helpers';
import { StackParamsList } from '../../../utils/navigation';
import commonStyles from '../../../utils/styles';
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
    await resetTables();

    setDetails('Downloading file');
    const downloadedFile = await downloadFile(downloadUri, onUpdateDetails);

    await importFile(downloadedFile, onUpdateDetails);

    setLoading(false);
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.content}>
          <View>
            <Text style={[commonStyles.titleLg, styles.title]}>{name}</Text>
            <Text style={styles.updatedAt}>Updated on {updatedAt}</Text>
          </View>
          <Text style={styles.description}>{description}</Text>
          <Button title={`Download (${size})`} disabled={loading} onPress={onPressDownload} />
          {details ? <Text style={styles.details}>{details}</Text> : null}
        </View>
      </View>
    </SafeAreaView>
  );
}
