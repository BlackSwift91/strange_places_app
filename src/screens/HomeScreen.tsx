import React, { useState, useEffect, useRef, useCallback } from 'react';
import MapView from 'react-native-map-clustering';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { DB } from '../../sglib.config';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import { THEME } from '../theme';
import { IPostData } from '../interfaces/IPostData';
import { IDBPlaces } from '../interfaces/IDBPlaces';
import { IRootState } from '../store/index';
import { setMapDelta } from '../store/actions/actions';
import { NavigationButton } from '../components/NavigationButton';
import { IHomeScreen } from '../interfaces/INavigation';

export const HomeScreen: React.FC<IHomeScreen> = ({ navigation }) => {
  const dispatch = useDispatch();
  const userLocation = useSelector((state: IRootState) => state.userLocationReducer);
  const userData = useSelector((state: IRootState) => state.userDataReducer);

  const [places, setPlaces] = useState<IPostData[]>([]);
  const [isMapView, setIsMapView] = useState(true);
  const [allPlaces, setAllPlaces] = useState<IPostData[]>([]);
  const [userPlaces, setUserPlaces] = useState<IPostData[]>([]);
  const [isAllPlaces, setIsAllPlaces] = useState(true);
  const [isUserTracking, setIsUserTracking] = useState(false);

  const mapRef = useRef<any>();

  const animateMap = useCallback(() => {
    console.log('call useCallback');
    if (mapRef.current) {
      mapRef.current?.animateToRegion(
        {
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: userLocation.latitudeDelta,
          longitudeDelta: userLocation.longitudeDelta,
        },
        700,
      );
    }
  }, [userLocation]);

  useEffect(() => {
    if (!userLocation.isUserPositionLocated) {
      animateMap();
    } else if (isUserTracking) {
      animateMap();
    }
  }, [userLocation, animateMap, isUserTracking]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={NavigationButton}>
          {isAllPlaces ? (
            <Item
              title="All Posts"
              iconName="account-group"
              onPress={() => setIsAllPlaces(false)}
            />
          ) : (
            <Item title="User Posts" iconName="account" onPress={() => setIsAllPlaces(true)} />
          )}
          {isMapView ? (
            <Item
              title="Show posts as List"
              iconName="format-list-bulleted"
              onPress={() => setIsMapView(false)}
            />
          ) : (
            <Item title="Show posts on map" iconName="map" onPress={() => setIsMapView(true)} />
          )}
        </HeaderButtons>
      ),
    });
  }, [navigation, isMapView, isAllPlaces]);

  const getData = useCallback(async () => {
    console.log('call useCallback DB');
    const result: IDBPlaces = await DB.places.getAllPlaces();
    if (result) {
      console.log(userData.user_id);
      console.log(result.data[0].user_id);
      setAllPlaces(result.data);
      setUserPlaces(result.data.filter(item => item.user_id === userData.user_id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isAllPlaces) {
      setPlaces(allPlaces);
    } else {
      setPlaces(userPlaces);
    }
  }, [allPlaces, isAllPlaces, userPlaces]);

  useEffect(() => {
    getData();
  }, [userData, getData, navigation]);

  if (isMapView) {
    return (
      <View style={styles.screenWrapper}>
        <StatusBar
          animated={true}
          backgroundColor={THEME.BLACK_COLOR}
          hidden={false}
          barStyle="light-content"
        />
        <View style={styles.trackUserButtonContainer}>
          <TouchableOpacity onPress={() => setIsUserTracking(!isUserTracking)}>
            <MaterialCommunityIcons
              name="navigation"
              color={isUserTracking ? THEME.MAIN_COLOR : THEME.DARK_GRAY_COLOR}
              size={24}
            />
          </TouchableOpacity>
        </View>
        <MapView
          ref={mapRef}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          mapType={'hybrid'}
          onRegionChangeComplete={e => {
            if (
              e.latitudeDelta.toFixed(6) !== userLocation.latitudeDelta.toFixed(6) &&
              e.longitudeDelta.toFixed(6) !== userLocation.longitudeDelta.toFixed(6)
            ) {
              dispatch(setMapDelta(e.latitudeDelta, e.longitudeDelta));
            }
          }}
          initialRegion={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          // loadingEnabled={true}
          onPanDrag={() => {
            setIsUserTracking(false);
          }}
          showsMyLocationButton={true}
          followsUserLocation={true}
          clusterColor={THEME.MAIN_COLOR}
          zoomEnabled={true}
          showsUserLocation={true}>
          {places.map(place => (
            <Marker
              key={place.doc_id}
              onPress={async () => {
                setTimeout(() => {
                  navigation.navigate('PlaceDetail', {
                    params: { post: place },
                  });
                }, 250);
              }}
              coordinate={{ latitude: place.location._lat, longitude: place.location._long }}>
              <View style={styles.marker}>
                <Image
                  source={{
                    width: 44,
                    height: 44,
                    uri: place.img,
                  }}
                />
              </View>
            </Marker>
          ))}
        </MapView>
      </View>
    );
  } else {
    return (
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={places}
        renderItem={place => (
          <TouchableOpacity
            key={place.item.doc_id}
            style={styles.listItemContainer}
            onPress={() => {
              navigation.navigate('PlaceDetail', {
                params: { post: place.item },
              });
            }}>
            <View style={styles.listItem}>
              <Text style={styles.listText}>{place.item.description}</Text>
              <Image
                source={{
                  width: 80,
                  height: 80,
                  uri: place.item.img,
                }}
              />
            </View>
          </TouchableOpacity>
        )}
      />
    );
  }
};

const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
    height: Dimensions.get('window').height + Number(StatusBar.currentHeight),
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  marker: {
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: THEME.WHITE_COLOR,
  },
  listItemContainer: {
    marginHorizontal: 15,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: THEME.LIGHT_GRAY_COLOR,
    borderRadius: 10,
    overflow: 'hidden',
    maxHeight: 120,
  },
  listText: {
    fontSize: 18,
    lineHeight: 22,
    color: THEME.BLACK_COLOR,
    paddingHorizontal: 20,
    width: 300,
  },
  trackUserButtonContainer: {
    position: 'absolute',
    bottom: 72,
    width: 36,
    height: 36,
    right: 13,
    zIndex: 100000,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
