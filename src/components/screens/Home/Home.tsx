import React, { useLayoutEffect } from 'react';
import { SafeAreaView, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import DataNotice from './components/DataNotice';
import RecentBookmarks from './components/RecentBookmarks';
import styles from './styles';
import { createTables } from '../../../db/tables';
import commonStyles from '../../../utils/styles';

export default function Home() {
  const isFocused = useIsFocused();

  useLayoutEffect(() => {
    const init = async () => {
      // await resetTables();
      await createTables();
      // await seedTables();
    };

    init();
  }, [isFocused]);

  return (
    <SafeAreaView>
      <View style={[commonStyles.screenContainer, styles.container]}>
        <DataNotice />
        <RecentBookmarks />
      </View>
    </SafeAreaView>
  );
}
