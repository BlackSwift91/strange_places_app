/**
 * @format
 */

import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import { Provider as StoreProvider } from 'react-redux';

import { store } from './src/store';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Notification caused app to open from background state:', remoteMessage.notification);
});

const AppRedux = () => {
  return (
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  );
};

AppRegistry.registerComponent(appName, () => AppRedux);
