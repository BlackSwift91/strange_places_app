import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/HomeScreen';
import { AddNewPlaceScreen } from '../screens/AddNewPlaceScreen';
import { THEME } from '../theme';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Image, Text } from 'react-native';
import { addPost } from '../images/addPost';
import Geolocation from 'react-native-geolocation-service';
import { hasLocationPermission } from '../AndroidPermissions';
import { useDispatch } from 'react-redux';
import { setUserLocation } from '../store/actions/actions';

const Tab = createBottomTabNavigator();

const AddPostTabBarButton = () => {
  return (
    <TouchableOpacity
      style={{ top: -12, backgroundColor: '#ffffff', borderRadius: 70, borderWidth: 10, borderColor: '#ffffff' }}>
      <Image
        source={{ uri: addPost }}
        style={{
          width: 60,
          height: 60,
        }}
      />
    </TouchableOpacity>
  );
};

export const TabNavigator = () => {
  const dispatch = useDispatch();
  const [location, setLocation] = useState('');
  console.log('tab navigator', location);

  useEffect(() => {
    (async () => {
      try {
        getLocation();
      } catch (e) {
        console.log('ERROR WHILE FIRST INIT', e);
      }
    })();
  }, []);

  const getLocation = async () => {
    const hasPermission: boolean = await hasLocationPermission();
    console.log('Start locating gps position');
    if (!hasPermission) {
      return;
    }
    Geolocation.watchPosition(
      async gpsPosition => {
        console.log('Return gps position');
        dispatch(setUserLocation(gpsPosition.coords.latitude, gpsPosition.coords.longitude));
        // setLocation(gpsPosition.coords.latitude);
      },
      error => {
        Alert.alert(`Code ${error.code}`, error.message);
        setLocation({});
        console.log(error);
      },
      {
        accuracy: {
          android: 'high',
        },
        enableHighAccuracy: true,
        interval: 1000,
        timeout: 15000,
        maximumAge: 10000,
        distanceFilter: 0,
        forceRequestLocation: true,
        forceLocationManager: false,
        showLocationDialog: true,
      },
    );
  };

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
        options={{
          title: 'Home',
          headerTitleAlign: 'center',
          tabBarIcon: () => (
            <Text
              style={{ fontSize: 20, marginBottom: 5, color: THEME.MAIN_COLOR, alignSelf: 'center', marginHorizontal: 30, }}>
              Home
            </Text>
          ),
          headerTintColor: THEME.MAIN_COLOR,
          headerTransparent: false,
        }}
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
}