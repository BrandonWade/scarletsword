import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Navigator } from './src/utils/navigation';
import ReduxProvider from './src/providers/redux';

export default function App(): React.JSX.Element {
  return (
    <ReduxProvider>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </ReduxProvider>
  );
}
