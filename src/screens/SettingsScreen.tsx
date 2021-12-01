import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

import firestore from '@react-native-firebase/firestore';

export const SettingsScreen = () => {
  const test = () => {
    firestore()
      .collection('users')
      .doc('uorOy9AgTRQmnJrR8YWF')
      .collection('followers')
      .doc('VazCu8BDxmSjLDsTU4ia')
      .delete();
  }

  return (
    <View style={styles.center}>
      <Text style={styles.text}>SettingsScreen</Text>
      <Button onPress={() => test()} title={'Delete'} />
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
