import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface IText {
  text: string;
}

export const AlertText: React.FC<IText> = props => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>{props.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 10,
    width: '90%',
  },
  text: {
    color: 'red',
  },
});
