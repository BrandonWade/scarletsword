import React, { useLayoutEffect } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { initDB } from '../../../db';
import styles from './styles';

export default function Home() {
  useLayoutEffect(() => {
    const init = async () => {
      await initDB();
    };

    init();
  }, []);

  return (
    <SafeAreaView>
      <Text>Home</Text>
    </SafeAreaView>
  );
}
