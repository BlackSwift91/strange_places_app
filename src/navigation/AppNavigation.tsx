import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AboutScreen } from '../screens/AboutScreen';
import { StartScreen } from '../screens/StartScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export const AppNavigator = () => {

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="StartScreen"
        component={StartScreen}
        options={{
          headerShown: false,
        }}

      />
    </Stack.Navigator>
  )
}
