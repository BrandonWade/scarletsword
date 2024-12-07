import React from 'react';
import BulkData from './components/screens/BulkData';
import ReduxProvider from './providers/redux';

export default function App(): React.JSX.Element {
  return (
    <ReduxProvider>
      <BulkData />
    </ReduxProvider>
  );
}
