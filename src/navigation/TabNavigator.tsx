import React, { useState, useEffect } from 'react';
import Geolocation from 'react-native-geolocation-service';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/HomeScreen';
import { AddNewPlaceScreen } from '../screens/AddNewPlaceScreen';
import { THEME } from '../theme';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Image, Text, Alert, StyleSheet } from 'react-native';

import { addPost } from '../images/addPost';
import { hasLocationPermission } from '../AndroidPermissions';
import { useDispatch, useSelector } from 'react-redux';
import { setUserLocation, setIsUserPositionLocated } from '../store/actions/actions';
import { IRootState } from '../store/index';

const Tab = createBottomTabNavigator();

const AddPostTabBarButton = () => {
  return (
    <TouchableOpacity style={styles.appPostButtonContainer}>
      <Image source={{ uri: addPost }} style={styles.appPostButtonImage} />
    </TouchableOpacity>
  );
};

export const TabNavigator = () => {
  const dispatch = useDispatch();
  const userLocation = useSelector((state: IRootState) => state.userLocationReducer);
  console.log('TAB', userLocation);
  

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
    console.log('Return gps position', userLocation);
    Geolocation.getCurrentPosition(
      async gpsPosition => {
        dispatch(setUserLocation(gpsPosition.coords.latitude, gpsPosition.coords.longitude));
        if (!userLocation.isUserPositionLocated) {
          console.log('INITIAL COORDS ');
          dispatch(setIsUserPositionLocated(true));
        }
      },
      error => {
        Alert.alert(`Code ${error.code}`, error.message);
        console.log(error);
      },
      {
        accuracy: {
          android: 'high',
        },
        enableHighAccuracy: true,
        timeout: 1000,
        maximumAge: 10000,
        distanceFilter: 0,
        forceRequestLocation: true,
        forceLocationManager: false,
        showLocationDialog: true,
      },
    );
    Geolocation.watchPosition(
      async gpsPosition => {
        dispatch(setUserLocation(gpsPosition.coords.latitude, gpsPosition.coords.longitude));
      },
      error => {
        Alert.alert(`Code ${error.code}`, error.message);
        console.log(error);
      },
      {
        accuracy: {
          android: 'high',
        },
        enableHighAccuracy: true,
        interval: 1000,
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
        tabBarStyle: { ...styles.navigator },
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'Home',
          headerTitleAlign: 'center',
          tabBarIcon: () => <Text style={styles.buttonText}>Home</Text>,
          headerTintColor: THEME.MAIN_COLOR,
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
          tabBarIcon: () => <Text style={styles.buttonText}>Profile</Text>,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  appPostButtonContainer: {
    top: -12,
    backgroundColor: '#ffffff',
    borderRadius: 70,
    borderWidth: 10,
    borderColor: '#ffffff',
  },
  appPostButtonImage: {
    width: 60,
    height: 60,
  },
  navigator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    borderRadius: 0,
    justifyContent: 'space-between',
  },
  buttonText: {
    fontSize: 20,
    marginBottom: 5,
    color: THEME.MAIN_COLOR,
    alignSelf: 'center',
    marginHorizontal: 30,
  },
});
