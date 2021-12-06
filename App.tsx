/**
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';

import 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import { NavigationContainer, DefaultTheme as NavigationTheme } from '@react-navigation/native';
import { OverflowMenuProvider } from 'react-navigation-header-buttons';

import { AppNavigator } from './src/navigation/AppNavigation';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import './src/localization/i18n';

import { IRootState } from './src/store/index';

const MyTheme = {
  ...NavigationTheme,
  colors: {
    ...NavigationTheme.colors,
    background: 'rgba(255,255,255,0)',
  },
};

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    accent: 'yellow',
  },
};

const App = () => {
  const notifications = useSelector((state: IRootState) => state.userSettingsReducer.notifications);

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  useEffect(() => {
    if (notifications) {
      (async () => {
        requestUserPermission();
      })();
    }
  }, []);

  useEffect(() => {
    if (notifications) {
      messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification,
        );
      });

      // Check whether an initial notification is available
      messaging()
        .getInitialNotification()
        .then(remoteMessage => {
          if (remoteMessage) {
            console.log(
              'Notification caused app to open from quit state:',
              remoteMessage.notification,
            );
          }
        });

      messaging().onMessage(async remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification,
        );
      });
    }
  }, []);

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={MyTheme}>
        <OverflowMenuProvider>
          <AppNavigator />
        </OverflowMenuProvider>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
