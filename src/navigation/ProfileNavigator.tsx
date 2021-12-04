import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { THEME } from '../theme';
import { SettingsScreen } from '../screens/SettingsScreen';
import { useTranslation } from 'react-i18next';
import { PlaceDetailScreen } from '../screens/PlaceDetailScreen';
import { UserProfileScreen } from '../screens/UserProfileScreen';
import { ChangePasswordScreen } from '../screens/ChangePasswordScreen';
import { ChangeProfileInfoScreen } from '../screens/ChangeProfileInfoScreen';


const Stack = createStackNavigator();

export const ProfileNavigator = () => {
  const { t } = useTranslation();
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
        name="PlaceDetail"
        component={PlaceDetailScreen}
        options={{
          // headerTitle: t('homeNavigator.placeDetailScreen'),
          presentation: 'modal',
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
          headerTitle: t('changePasswordScreen.changePassword'),
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
