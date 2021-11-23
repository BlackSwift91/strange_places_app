import React, { useEffect, useCallback } from 'react';
import Geolocation from 'react-native-geolocation-service';

import { useTranslation } from 'react-i18next';
import { AddNewPlaceScreen } from '../screens/AddNewPlaceScreen';
import { Text, Alert, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { THEME } from '../theme';
import { IRootState } from '../store/index';
import { ProfileNavigator } from './ProfileNavigator';
import { HomeNavigator } from './HomeNavigator';
import { AddPostTabBarButton } from '../components/AddPostTabBarButton';
import { hasLocationPermission } from '../AndroidPermissions';
import { useDispatch, useSelector } from 'react-redux';
import { setUserLocation, setIsUserPositionLocated } from '../store/actions/actions';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const userLocation = useSelector((state: IRootState) => state.userLocationReducer);

  const getLocation = useCallback(async () => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      try {
        getLocation();
      } catch (e) {
        console.log('ERROR WHILE FIRST INIT', e);
      }
    })();
  }, [getLocation]);

  return (
    <Tab.Navigator
      backBehavior={'initialRoute'}
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: { ...styles.navigator },
        headerShown: false,
      }}>
      <Tab.Screen
        name="HomeScreenNavigator"
        component={HomeNavigator}
        options={{
          tabBarIcon: () => <Text style={styles.buttonText}>{t('tabNavigator.homeButton')}</Text>,
          headerTintColor: THEME.MAIN_COLOR,
        }}
      />
      <Tab.Screen
        name="AddNewPlaceScreen"
        component={AddNewPlaceScreen}
        options={{
          headerShown: true,
          tabBarIcon: () => <AddPostTabBarButton />,
          headerTintColor: THEME.MAIN_COLOR,
        }}
      />
      <Tab.Screen
        name="ProfileNavigator"
        component={ProfileNavigator}
        options={{
          headerTintColor: THEME.MAIN_COLOR,
          headerShown: false,
          tabBarIcon: () => (
            <Text style={styles.buttonText}>{t('tabNavigator.profileButton')}</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
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
