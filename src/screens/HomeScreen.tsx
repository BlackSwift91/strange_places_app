import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import MapView from 'react-native-map-clustering';
import { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { DB } from '../../sglib.config';
import { THEME } from '../theme';
import { NavigationButton } from '../components/NavigationButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { IRootState } from '../store/index';
import Geolocation from 'react-native-geolocation-service';

export const HomeScreen = ({ navigation, route }) => {
  const userLocation = useSelector((state: IRootState) => state.userLocationReducer);
  const [places, setPlaces] = useState([]);
  const [isMapView, setIsMapView] = useState(true);
  console.log(userLocation);
  let mapRef = useRef<MapView>(null);

  const animateMap = () => {
    mapRef.current?.animateToRegion({ // Takes a region object as parameter
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.4,
        longitudeDelta: 0.4,
      },
      1000,
    );
  };

  useEffect(() => {
    console.log('1111');
    animateMap();
  }, [userLocation]);

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
    const result = await DB.places.getMyPlaces('IpEUywJy7ELLP1e4UDr4');
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
        <MapView
          ref={mapRef}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          mapType={'hybrid'}
          initialRegion={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          // region={{
          //   latitude: userLocation.latitude,
          //   longitude: userLocation.longitude,
          //   latitudeDelta: 0.0922,
          //   longitudeDelta: 0.0421,
          // }}
          showsMyLocationButton={true}
          // onUserLocationChange={locationChangedResult => console.log(locationChangedResult)}
          initialCamera={{
            center: {
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
            },
            pitch: 45,
            heading: 90,
            altitude: 1000,
            zoom: 10,
          }}
          // region={defaultRegion}
          clusterColor={THEME.MAIN_COLOR}
          zoomEnabled={true}
          // loadingEnabled={true}
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

});
