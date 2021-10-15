/**
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as StoreProvider } from 'react-redux';

import { store } from './src/store';
import { AppNavigator } from './src/navigation/AppNavigation';

const App = () => {
  return (
    <StoreProvider store={store}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </StoreProvider>
  );
};

export default App;
