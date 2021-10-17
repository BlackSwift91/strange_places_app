import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export const CustomButton = props => {
  return (
    <TouchableOpacity
      style={{ ...styles.button, ...props.buttonStyle }}
      onPress={() => props.onPressHandler(props.onPressButtonValue)}>
      <Text style={{ ...styles.text, ...props.buttonTextStyle }}>
        {props.buttonText}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: '#0071bc',
    width: '90%',
    borderColor: '#0071bc',
    borderWidth: 3,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
