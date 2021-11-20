import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const PlaceDetailScreen = ({ navigation, route }) => {
  return (
    <View style={styles.center}>
      <Text style={styles.text}>PlaceDetailScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'black',
  },
});
