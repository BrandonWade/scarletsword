import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { useListBulkDataQuery } from '../../../api/bulkdata';
import { BulkDataType, BulkData } from '../../../api/bulkdata/types';
import BulkDataItem from './BulkDataItem';

const cardDataTypes = new Set([
  BulkDataType.OracleCards,
  BulkDataType.UniqueArtwork,
  BulkDataType.DefaultCards,
  BulkDataType.AllCards,
]);

export default function Foo(): React.JSX.Element {
  const { data } = useListBulkDataQuery({});

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        {(data?.data || []).map((bulkData: BulkData) => {
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
      </ScrollView>
    </SafeAreaView>
  );
}
