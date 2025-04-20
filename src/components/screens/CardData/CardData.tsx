import byteSize from 'byte-size';
import dayjs from 'dayjs';
import { File } from 'expo-file-system/next';
import React, { useState } from 'react';
import { ActivityIndicator, Button, SafeAreaView, Text, View } from 'react-native';
import styles from './styles';
import { recordDataImport } from '../../../db/dataImports';
import { downloadFile, importFile } from '../../../utils/files';
import commonStyles from '../../../utils/styles';
import { useGetBulkDataQuery } from '../../../api/bulkdata';
import { BulkDataEnum } from '../../../utils/enums';

export default function CardData() {
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [details, setDetails] = useState<string>('');
  const { data, isLoading } = useGetBulkDataQuery(BulkDataEnum.OracleCards);
  const { name, size, description, updated_at: updatedAt, download_uri: downloadUri } = data || {};
  const formattedSize = byteSize(size).toString();
  const formattedUpdatedAt = dayjs(updatedAt).format('YYYY-MM-DD');

  const onUpdateDetails = (newDetails: string) => {
    setDetails(newDetails);
  };

  const onPressDownload = async () => {
    setIsDownloading(true);
    setDetails('');

    setDetails('Downloading file');
    await recordDataImport(BulkDataEnum.OracleCards, updatedAt);
    const downloadedFile: File = await downloadFile(downloadUri, onUpdateDetails);
    await importFile(downloadedFile, onUpdateDetails);

    setIsDownloading(false);
  };

  return (
    <SafeAreaView>
      <View style={commonStyles.screenContainer}>
        <View style={styles.content}>
          <View>
            <Text style={[commonStyles.titleLg, styles.title]}>{name}</Text>
            <Text style={styles.updatedAt}>Updated on {formattedUpdatedAt}</Text>
          </View>
          <Text style={styles.description}>{description}</Text>
          {isDownloading ? (
            <ActivityIndicator size='large' />
          ) : (
            <Button
              title={`Download (${formattedSize})`}
              disabled={isLoading || isDownloading}
              onPress={onPressDownload}
            />
          )}
          {details ? <Text style={styles.details}>{details}</Text> : null}
        </View>
      </View>
    </SafeAreaView>
  );
}
