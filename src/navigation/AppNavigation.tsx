import React, { useState, useEffect } from 'react';

import {
  createStackNavigator,
  HeaderStyleInterpolators,
  TransitionSpecs,
} from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth';

// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { AboutScreen } from '../screens/AboutScreen';
import { StartScreen } from '../screens/StartScreen';
import { SignInScreen } from '../screens/SignInScreen';
import { SignUpScreen } from '../screens/SignUpScreen';
import { AboutScreen } from '../screens/AboutScreen';
import { MainScreen } from '../screens/MainScreen';
import { SignUpProfileScreen } from '../screens/SignUpProfileScreen';
import { TextInputModalScreen } from '../screens/TextInputModalScreen';
import { SetUserLocationModalScreen } from '../screens/SetUserLocationModalScreen';
import { AddNewPlaceScreen } from '../screens/AddNewPlaceScreen';
import { THEME } from '../theme';
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
  const isNewUser = useSelector(state => state.authDataReducer.isNewUser);
  const [user, setUser] = useState();
  const [initializing, setInitializing] = useState(true);

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  console.log('isNewUser', isNewUser);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user || isNewUser) {
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
          options={() => ({
            presentation: 'modal',
            title: 'Test',
            headerTintColor: 'blue',
            headerTransparent: true,
          })}
        />
        <Stack.Screen
          name="SetUserLocationModalScreen"
          component={SetUserLocationModalScreen}
          options={() => ({
            presentation: 'modal',
            title: 'Test',
            headerTintColor: 'blue',
            headerTransparent: true,
          })}
        />
      </Stack.Navigator>
    );
  }
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AddNewPlaceScreen"
        component={AddNewPlaceScreen}
        options={{
          title: 'Add New Place',
          headerMode: 'screen',
          headerTintColor: THEME.MAIN_COLOR,
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="MainScreen"
        component={MainScreen}
        options={{
          title: 'Sign In',
          headerMode: 'screen',
          headerTintColor: 'white',
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
};
