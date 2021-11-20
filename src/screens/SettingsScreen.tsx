import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const SettingsScreen = () => {
  // console.log('1111');

  return (
    <View style={styles.center}>
      <Text style={styles.text}>SettingsScreen</Text>
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
