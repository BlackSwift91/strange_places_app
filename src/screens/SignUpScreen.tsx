import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const SignUpScreen = () => {
  console.log('1111');
  
  return (
    <View style={styles.center}>
      <Text style={{color: 'black'}}>SignUpScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

});
