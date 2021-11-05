import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { DB } from '../../sglib.config';
import { UserIcon } from '../images/UserIcon';

export const MainScreen = ({ navigation, route }) => {
  const getData = async () => {
    const result = await DB.places.getAllPlaces();
    console.log(result);
  };

  getData();
  const places = [
    {
      description: "Hello!",
      img: "test",
      location: {
        _lat: 10,
        _long: 12,
      },
      user_doc_id: "gqaaGS2uYWsqYOM7NV2L",
      user_id: "k9WNuW7pbXPOodhPxLmLGXvKTsn2",
    },
  ];

  //  const markers = [{
  //     coordinate: {
  //       latitude: 42.882004,
  //       longitude: 74.582748,
  //     },
  //     title: 'first',
  //     description: 'first marker',
  //   }]
  // const markers = () => {
  //   return places.map((place, index) => {
  //     <Marker
  //       coordinate={{ latitude: place.location._lat, longitude: place.location._long }}
  //       pinColor={'red'}
  //     />
  //   });
  // };

  return (
    <View style={styles.center}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        mapType={'hybrid'}
        region={{
          latitude: 10,
          longitude: 12,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        zoomEnabled={true}
        showsUserLocation={true}>
        {places.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: marker.location._lat, longitude: marker.location._long }}
            title={marker.description}
            description={marker.description}>
            <View style={{  }}>
              <View style={{ padding: 0, borderRadius: 0, justifyContent: 'center', alignItems: 'center', borderRadius: 30, overflow: 'hidden',  borderWidth: 1, borderColor: '#ffffff',}}>
                <Image
                  source={{
                    width: 44,
                    height: 44,
                    uri: UserIcon,
                  }}
                />
              </View>
            </View>
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    backgroundColor: 'red',
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
});
