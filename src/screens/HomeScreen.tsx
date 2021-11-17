import React, { useState, useEffect, useRef } from 'react';
import MapView from 'react-native-map-clustering';
import { DB } from '../../sglib.config';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { View, Text, StyleSheet, Image, FlatList, Dimensions, StatusBar, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { setMapDelta } from '../store/actions/actions';

import { THEME } from '../theme';
import { IRootState } from '../store/index';
import { NavigationButton } from '../components/NavigationButton';
import { IHomeScreen } from '../interfaces/INavigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


setMapDelta

interface IPostData {
  description: string;
  img: string;
  location: {
    _lat: number;
    _long: number;
  };
  user_doc_id: string;
  user_id: string;
}

interface IMapDelta {
  latitudeDelta: number;
  longitudeDelta: number;
}

interface IMapCoordinates {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export const HomeScreen: React.FC<IHomeScreen> = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const userLocation = useSelector((state: IRootState) => state.userLocationReducer);
  const userData = useSelector((state: IRootState) => state.userDataReducer);
  const [places, setPlaces] = useState<IPostData[]>([]);
  const [isMapView, setIsMapView] = useState(true);
  const [isUserTracking, setIsUserTracking] = useState(false);

  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    if (!userLocation.isUserPositionLocated) {
      animateMap();
    }
  }, [userLocation]);

  useEffect(() => {
    if (isUserTracking) {
      animateMap();
    }
  }, [userLocation, isUserTracking]);

  const animateMap = () => {
    mapRef.current?.animateToRegion(
      {
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: userLocation.latitudeDelta,
        longitudeDelta: userLocation.longitudeDelta,
      },
      700,
    );
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={NavigationButton}>
          {isMapView ? (
            <Item
              title="Add City"
              iconName="format-list-bulleted"
              onPress={() => setIsMapView(false)}
            />
          ) : (
            <Item title="Add City" iconName="map" onPress={() => setIsMapView(true)} />
          )}
        </HeaderButtons>
      ),
    });
  }, [navigation, isMapView]);

  const getData = async () => {
    const result: any = await DB.places.getMyPlaces(userData._id);
    if (result) {
      setPlaces(result);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [navigation, route]);

  if (isMapView) {
    return (
      <View style={styles.center}>
        <StatusBar
          animated={true}
          backgroundColor="transparent"
          translucent={true}
          hidden={false}
          barStyle="dark-content"
        />
        <View style={styles.text1}>
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
            if ((e.latitudeDelta.toFixed(6) !== userLocation.latitudeDelta.toFixed(6)) && (e.longitudeDelta.toFixed(6) !== userLocation.longitudeDelta.toFixed(6))) {
              dispatch(setMapDelta(e.latitudeDelta, e.longitudeDelta));
            }
          }}
          initialRegion={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          loadingEnabled={true}
          onPanDrag={e => {
            setIsUserTracking(false);
          }}
          showsMyLocationButton={true}
          followsUserLocation={true}
          clusterColor={THEME.MAIN_COLOR}
          zoomEnabled={true}
          showsUserLocation={true}>
          {places.map((marker, index) => (
            <Marker
              key={index}
              coordinate={{ latitude: marker.location._lat, longitude: marker.location._long }}
              title={marker.description}
              description={marker.description}>
              <View style={{}}>
                <View style={styles.marker}>
                  <Image
                    source={{
                      width: 44,
                      height: 44,
                      uri: marker.img,
                    }}
                  />
                </View>
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
        renderItem={({ item, index }) => (
          <TouchableOpacity key={index} style={styles.container}>
            <View style={styles.list}>
              <Text style={styles.listText}>{item.description}</Text>
              <Image
                source={{
                  width: 80,
                  height: 80,
                  uri: item.img,
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
  center: {
    flex: 1,
    height: Dimensions.get('window').height + Number(StatusBar.currentHeight),
  },
  text: {
    color: 'black',
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
    borderColor: '#ffffff',
  },
  list: {
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
  container: {
    marginHorizontal: 15,
  },
  text1: {
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
