import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { AboutScreen } from '../screens/AboutScreen';
import { StartScreen } from '../screens/StartScreen';
import { SignInScreen } from '../screens/SignInScreen';
import { SignUpScreen } from '../screens/SignUpScreen';
// import { HeaderButtons, Item } from 'react-navigation-header-buttons';

// import { NavigationButton } from '../components/NavigationButton';

const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();

export const AppNavigator = ({ navigtion }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="StartScreen"
        component={StartScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignInScreen"
        component={SignInScreen}
        options={{
          title: 'Sign In',
          headerTintColor: 'white',
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{
          title: 'Sign In',
          headerTintColor: 'white',
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
};
