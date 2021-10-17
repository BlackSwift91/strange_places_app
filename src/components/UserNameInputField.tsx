import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { THEME } from '../theme';

export const UserNameInputField = ({ inputValue, onChangeUserName, onChangeFocus }) => {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.leftIconContainer}>
        <MaterialCommunityIcons
          name="account"
          color={THEME.darkGray}
          size={24}
        />
      </View>
      <TextInput
        returnKeyType="next"
        maxLength={30}
        autoCapitalize="none"
        placeholder="User Name"
        style={styles.inputStyle}
        onChangeText={val => onChangeUserName(val)}
        onSubmitEditing={() => onChangeFocus(lastNameRef.current.focus())}
        value={inputValue}
      />
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
    flexGrow: 1,
  },
});
