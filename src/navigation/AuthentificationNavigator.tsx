import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { StartScreen } from '../screens/StartScreen';
import { SignInScreen } from '../screens/SignInScreen';
import { SignUpScreen } from '../screens/SignUpScreen';
import { SignUpProfileScreen } from '../screens/SignUpProfileScreen';
import { TextInputModalScreen } from '../screens/TextInputModalScreen';
import { SetUserLocationModalScreen } from '../screens/SetUserLocationModalScreen';
// import { HeaderStyleInterpolators, TransitionSpecs } from '@react-navigation/stack';
import { THEME } from '../theme';

const Stack = createStackNavigator();

// const horizontalAnimation = {
//   gestureDirection: 'horizontal',
//   transitionSpec: {
//     open: TransitionSpecs.TransitionIOSSpec,
//     close: TransitionSpecs.RevealFromBottomAndroidSpec,
//   },
//   headerStyleInterpolator: HeaderStyleInterpolators.forFade,
//   cardStyleInterpolator: ({ current, layouts }) => {
//     return {
//       cardStyle: {
//         transform: [
//           {
//             translateX: current.progress.interpolate({
//               inputRange: [0, 1],
//               outputRange: [layouts.screen.width, 0],
//             }),
//           },
//         ],
//       },
//     };
//   },
// };

export const AuthentificationNavigator = () => {
  return (
    // <Stack.Navigator screenOptions={horizontalAnimation}>
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerTintColor: THEME.MAIN_COLOR,
      }}>
      <Stack.Screen
        name="StartScreen"
        component={StartScreen}
        options={{
          headerShown: false,
          presentation: 'card',
          headerTransparent: false,
        }}
      />
      <Stack.Screen
        name="SignInScreen"
        component={SignInScreen}
        options={{
          title: 'Sign In',
          headerTintColor: THEME.WHITE_COLOR,
        }}
      />
      <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{
          title: 'Sign Up',
          headerTintColor: THEME.WHITE_COLOR,
        }}
      />
      <Stack.Screen
        name="SignUpProfileScreen"
        component={SignUpProfileScreen}
        options={{
          title: 'Edit your profile',
          headerLeft: () => null,
        }}
      />
      <Stack.Screen
        name="TextInputModalScreen"
        component={TextInputModalScreen}
        options={() => ({
          presentation: 'modal',
          title: 'Test',
        })}
      />
      <Stack.Screen
        name="SetUserLocationModalScreen"
        component={SetUserLocationModalScreen}
        options={() => ({
          presentation: 'modal',
          title: 'Test',
        })}
      />
    </Stack.Navigator>
  );
};
