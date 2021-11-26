import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { UserProfileScreen } from '../screens/UserProfileScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { ChangePasswordScreen } from '../screens/ChangePasswordScreen';
import { ChangeProfileInfoScreen } from '../screens/ChangeProfileInfoScreen';

import { THEME } from '../theme';

const Stack = createStackNavigator();

export const ProfileNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="UserProfile"
      screenOptions={{
        headerTransparent: false,
        headerTintColor: THEME.MAIN_COLOR,
      }}>
      <Stack.Screen
        name="UserProfile"
        component={UserProfileScreen}
        options={{
          headerShown: true,

        }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="ChangeProfileInfo"
        component={ChangeProfileInfoScreen}
        options={{
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};
