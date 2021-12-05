import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { THEME } from '../theme';

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
    fontSize: 15,
    color: THEME.RED_COLOR,
  },
});
