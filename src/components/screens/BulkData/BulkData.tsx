import React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { useListBulkDataQuery } from '../../../api/bulkdata';
import { BulkDataEnum, BulkDataType } from '../../../api/bulkdata/types';
import BulkDataItem from './BulkDataItem';
import styles from './styles';

const cardDataTypes = new Set([
  BulkDataEnum.OracleCards,
  BulkDataEnum.UniqueArtwork,
  BulkDataEnum.DefaultCards,
  BulkDataEnum.AllCards,
]);

export default function BulkData(): React.JSX.Element {
  const { data } = useListBulkDataQuery({});

  return (
    <SafeAreaView>
      <ScrollView
        style={styles.scrollContainer}
        contentInsetAdjustmentBehavior="automatic">
        <View style={styles.bulkDataList}>
          {(data?.data || []).map((bulkData: BulkDataType) => {
            if (!cardDataTypes.has(bulkData.type)) {
              return null;
            }

            return (
              <BulkDataItem
                key={bulkData?.id}
                name={bulkData?.name}
                size={bulkData?.size}
                description={bulkData?.description}
                updatedAt={bulkData?.updated_at}
                downloadUri={bulkData?.download_uri}
              />
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
