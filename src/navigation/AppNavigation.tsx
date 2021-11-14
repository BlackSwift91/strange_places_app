import React, { useState, useEffect } from 'react';

import {
  createStackNavigator,
  HeaderStyleInterpolators,
  TransitionSpecs,
} from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useDispatch } from 'react-redux';

// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { AboutScreen } from '../screens/AboutScreen';
import { StartScreen } from '../screens/StartScreen';
import { SignInScreen } from '../screens/SignInScreen';
import { SignUpScreen } from '../screens/SignUpScreen';
import { AboutScreen } from '../screens/AboutScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { SignUpProfileScreen } from '../screens/SignUpProfileScreen';
import { TextInputModalScreen } from '../screens/TextInputModalScreen';
import { SetUserLocationModalScreen } from '../screens/SetUserLocationModalScreen';
import { AddNewPlaceScreen } from '../screens/AddNewPlaceScreen';
import { THEME } from '../theme';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Image, Text } from 'react-native';
import { addPost } from '../images/addPost';
import { setAllUserData } from '../store/actions/actions';
import firestore from '@react-native-firebase/firestore';
import { NavigationButton } from '../components/NavigationButton';
import {
  HeaderButtons,
  Item,
} from 'react-navigation-header-buttons';
// import { HeaderButtons, Item } from 'react-navigation-header-buttons';

// import { NavigationButton } from '../components/NavigationButton';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
// const Tab = createBottomTabNavigator();

const AddPostTabBarButton = () => {
  return (
    <TouchableOpacity
      style={{ top: -12, backgroundColor: '#ffffff', borderRadius: 70, borderWidth: 10, borderColor: '#ffffff' }}
    >
      <Image
        source={{ uri: addPost }}
        style={{
          width: 60,
          height: 60,
        }}
      />
    </TouchableOpacity>
  )
}

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
  const dispatch = useDispatch();
  const isNewUser = useSelector(state => state.authDataReducer.isNewUser);
  const date = useSelector(state => state);
  const [user, setUser] = useState();
  const [initializing, setInitializing] = useState(true);
  console.log('state', date);
  console.log('userdata', user);





  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);

    const data: IUser[] = [];
    const location = {
      city: '',
      country: '',
    };
    if (!user) return;
    firestore()
      .collection('users')
      .where('user_id', '==', `${user.uid}`)
      .get()
      .then(response => {
        response.forEach((doc: any) => {
          data.push({ ...doc.data(), _id: doc.id });
        });
      })
      .then(() => {
        location.city = data[0].location.city;
        location.country = data[0].location.country;
        console.log('1111111', data[0]);
        dispatch(
          setAllUserData(
            data[0].user_id,
            data[0]._id,
            data[0].user_name,
            data[0].first_name,
            data[0].last_name,
            data[0].about_user,
            data[0].avatar_url,
            location,
          ),
        );
        console.log('User data fetched!');
      });
  }

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
            headerTintColor: THEME.MAIN_COLOR,
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
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 60, borderRadius: 0, justifyContent: 'space-between' },
      }}>
      <Tab.Screen
        // tabBarShowLabel​={false}
        name="HomeScreen"
        component={HomeScreen}
        options={({ navigation, route }) => ({
          title: 'Home',
          headerTitleAlign: 'center',
          tabBarIcon: () => (
            <Text
              style={{ fontSize: 20, marginBottom: 5, color: THEME.MAIN_COLOR, alignSelf: 'center', marginHorizontal: 30, }}>
              Home
            </Text>),
          headerTintColor: THEME.MAIN_COLOR,
          // headerRight: () => (
          //   <HeaderButtons HeaderButtonComponent={NavigationButton}>
          //     <Item title="Add City" iconName="format-list-bulleted" onPress={() => console.log('111')} />
          //     {/* <Item title="Add City" iconName="map" onPress={() => console.log('111')} /> */}
          //   </HeaderButtons>
          // ),
          headerTransparent: false,
        })}
      />
      <Tab.Screen
        name="AddNewPlaceScreen"
        component={AddNewPlaceScreen}
        options={{
          tabBarIcon: () => <AddPostTabBarButton />,
          title: 'Add new post',
          headerTintColor: THEME.MAIN_COLOR,
          headerTransparent: false,
        }}
      />
      <Tab.Screen
        name="AddNewPlaceScreen1"
        component={AddNewPlaceScreen}
        options={{
          title: 'Add New Place',
          headerTintColor: THEME.MAIN_COLOR,
          headerTransparent: true,
          headerShown: false,
          tabBarIcon: () => <Text style={{ fontSize: 20, marginBottom: 5, color: THEME.MAIN_COLOR, alignSelf: 'center', marginHorizontal: 30, }}>Profile</Text>,
        }}
      />
    </Tab.Navigator>
  );
};
