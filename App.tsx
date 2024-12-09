import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootStack } from './src/utils/navigation';
import ReduxProvider from './src/providers/redux';

export default function App(): React.JSX.Element {
  return (
    <ReduxProvider>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </ReduxProvider>
  );
}
