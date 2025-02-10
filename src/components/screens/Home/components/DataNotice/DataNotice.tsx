import dayjs from 'dayjs';
import { useLayoutEffect, useState } from 'react';
import { Button, Text } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import styles from '../../styles';
import Box from '../../../../common/Box';
import { getMostRecentDataImport } from '../../../../../db/dataImports';
import { DataImport } from '../../../../../db/types';
import { ScreenNames } from '../../../../../utils/enums';
import { StackNavigation } from '../../../../../utils/navigation';

export default function DataNotice() {
  const [mostRecentImport, setMostRecentImport] = useState<DataImport>(null);
  const navigation = useNavigation<StackNavigation>();
  const isFocused = useIsFocused();

  useLayoutEffect(() => {
    const fetchMostRecentDataImport = async () => {
      const result: DataImport = await getMostRecentDataImport();
      setMostRecentImport(result);
    };

    fetchMostRecentDataImport();
  }, [isFocused]);

  const onPressViewDataFilePress = () => {
    navigation.navigate(ScreenNames.BulkDataList);
  };

  if (!mostRecentImport) {
    return (
      <Box style={styles.dataNotice}>
        <Text style={styles.message}>
          To get started, you'll need to download a data file with card data.
        </Text>
        <Button title='View Options' onPress={onPressViewDataFilePress} />
      </Box>
    );
  }

  const createdAt = dayjs(mostRecentImport.created_at);
  const daysSinceLastImport = dayjs().diff(createdAt, 'days');
  if (daysSinceLastImport > 30) {
    return (
      <Box style={styles.dataNotice}>
        <Text style={styles.message}>
          {`It's been ${daysSinceLastImport} days since your last data file import. Consider downloading a recent file and updating your data.`}
        </Text>
        <Button title='View Data Files' onPress={onPressViewDataFilePress} />
      </Box>
    );
  }

  return null;
}
