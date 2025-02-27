import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigator from './src/components/common/Navigator';
import ReduxProvider from './src/providers/redux';

export default function App() {
  return (
    <ReduxProvider>
      <NavigationContainer>
        <ActionSheetProvider>
          <Navigator />
        </ActionSheetProvider>
      </NavigationContainer>
    </ReduxProvider>
  );
}
