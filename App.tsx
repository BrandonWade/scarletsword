import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigator from './src/components/common/Navigator';
import ReduxProvider from './src/providers/redux';

export default function App() {
  return (
    <ReduxProvider>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </ReduxProvider>
  );
}
