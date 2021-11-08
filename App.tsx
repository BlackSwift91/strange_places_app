/**
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import 'react-native-gesture-handler';
import { NavigationContainer, DefaultTheme as NavigationTheme } from '@react-navigation/native';
import { OverflowMenuProvider } from 'react-navigation-header-buttons';
import { Provider as StoreProvider } from 'react-redux';

import { store } from './src/store';
import { AppNavigator } from './src/navigation/AppNavigation';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import './src/localization/i18n';

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
  return (
    <StoreProvider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={MyTheme}>
          <OverflowMenuProvider>
            <AppNavigator />
          </OverflowMenuProvider>
        </NavigationContainer>
      </PaperProvider>
    </StoreProvider>
  );
};

export default App;
