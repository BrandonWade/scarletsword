import React, { useLayoutEffect } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { createTables } from '../../../db';

export default function Home() {
  useLayoutEffect(() => {
    const initDB = async () => {
      await createTables();
    };

    initDB();
  }, []);

  return (
    <SafeAreaView>
      <Text>Home</Text>
    </SafeAreaView>
  );
}
