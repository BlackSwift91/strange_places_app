import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { THEME } from '../theme';

export const PasswordInputField = ({ inputValue, onChangeUserPassword }) => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(true);

  return (
    <View style={styles.inputContainer}>
      <View style={styles.leftIconContainer}>
        <MaterialCommunityIcons name="lock" color={THEME.darkGray} size={24} />
      </View>
      <TextInput
        autoCapitalize="none"
        secureTextEntry={passwordVisible}
        placeholder="Password"
        style={styles.inputStyle}
        onChangeText={val => onChangeUserPassword(val)}
        value={inputValue}
      />
      <TouchableOpacity
        style={styles.leftIconContainer}
        onPress={() => setPasswordVisible(prev => !prev)}>
        <MaterialCommunityIcons name="eye" color={'#8e8d8d'} size={24} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    position: 'relative',
    borderRadius: 10,
    borderColor: THEME.lightGray,
    borderWidth: 3,
    backgroundColor: THEME.lightGray,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  leftIconContainer: {
    paddingHorizontal: 5,
  },
  inputStyle: {
    flex: 1,
    flexGrow: 1,
  },
});
