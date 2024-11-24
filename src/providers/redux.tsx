import React from 'react';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { scryfallApi } from '../api';

type ProviderProps = {
  children: React.ReactNode;
};

export default ({ children }: ProviderProps) => {
  const store = configureStore({
    reducer: combineReducers({
      [scryfallApi.reducerPath]: scryfallApi.reducer,
    }),
    middleware: getDefaultMiddleware => {
      return getDefaultMiddleware().concat(scryfallApi.middleware);
    },
  });

  return <Provider store={store}>{children}</Provider>;
};
