import React from 'react';
import { Button, Text } from 'react-native';
import { createStackNavigator, HeaderStyleInterpolators, TransitionSpecs } from '@react-navigation/stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { AboutScreen } from '../screens/AboutScreen';
import { StartScreen } from '../screens/StartScreen';
import { SignInScreen } from '../screens/SignInScreen';
import { SignUpScreen } from '../screens/SignUpScreen';
import { SignUpProfileScreen } from '../screens/SignUpProfileScreen';
import { TextInputModalScreen } from '../screens/TextInputModalScreen';
// import { HeaderButtons, Item } from 'react-navigation-header-buttons';

// import { NavigationButton } from '../components/NavigationButton';

const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();

const horizontalAnimation = {
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.RevealFromBottomAndroidSpec,
  },
  headerStyleInterpolator: HeaderStyleInterpolators.forFade,
  cardStyleInterpolator: ({ current, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
};

export const AppNavigator: React.FC = () => {
  return (
    // <Stack.Navigator screenOptions={horizontalAnimation}>
    <Stack.Navigator>
      <Stack.Screen
        name="StartScreen"
        component={StartScreen}
        options={{
          headerShown: false,
          presentation: 'card',
        }}
      />
      <Stack.Screen
        name="SignInScreen"
        component={SignInScreen}
        options={{
          title: 'Sign In',
          headerMode: 'screen',
          headerTintColor: 'white',
          headerTransparent: true,

          // presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{
          title: 'Sign Up',
          headerTintColor: 'white',
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="SignUpProfileScreen"
        component={SignUpProfileScreen}
        options={{
          title: 'Edit your profile',
          headerTintColor: 'white',
          headerTransparent: true,
          headerLeft: () => null,
        }}
      />
      <Stack.Screen
        name="TextInputModalScreen"
        component={TextInputModalScreen}
        options={({ navigation, route }) => ({
          presentation: 'modal',
          title: 'Test',
          headerTintColor: 'blue',
          headerTransparent: true,
        })}
      />
    </Stack.Navigator>
  );
};
