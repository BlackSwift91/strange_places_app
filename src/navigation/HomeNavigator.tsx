import React from 'react';
import { useTranslation } from 'react-i18next';
import { createStackNavigator } from '@react-navigation/stack';

import { THEME } from '../theme';
import { HomeScreen } from '../screens/HomeScreen';
import { PlaceDetailScreen } from '../screens/PlaceDetailScreen';
import { UserProfileScreen } from '../screens/UserProfileScreen';

const Stack = createStackNavigator();

export const HomeNavigator = () => {
  const { t } = useTranslation();
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerTransparent: false,
        headerTintColor: THEME.MAIN_COLOR,
      }}>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerTitleAlign: 'center',
          headerTitle: t('homeNavigator.homeScreen'),
          headerShown: true,
        }}
      />
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
          headerTitle: t('homeNavigator.placeDetailScreen'),
          presentation: 'modal',
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};
