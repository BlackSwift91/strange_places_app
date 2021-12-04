import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { THEME } from '../theme';
import { SettingsScreen } from '../screens/SettingsScreen';
import { useTranslation } from 'react-i18next';
import { PlaceDetailScreen } from '../screens/PlaceDetailScreen';
import { UserProfileScreen } from '../screens/UserProfileScreen';
import { ChangePasswordScreen } from '../screens/ChangePasswordScreen';
import { ChangeProfileScreen } from '../screens/ChangeProfileScreen';
import { ChangeAboutUserInfoModal } from '../screens/ChangeAboutUserInfoModal';
import { ChangeUserLocationModal } from '../screens/ChangeUserLocationModal';

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
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="ChangeProfile"
        component={ChangeProfileScreen}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="AboutUserModalScreen"
        component={ChangeAboutUserInfoModal}
        options={() => ({
          presentation: 'modal',
          title: 'Test',
        })}
      />
      <Stack.Screen
        name="ChangeLocationModalScreen"
        component={ChangeUserLocationModal}
        options={() => ({
          presentation: 'modal',
          title: 'Test',
        })}
      />
    </Stack.Navigator>
  );
};
