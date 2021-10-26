import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ViewStyle, TextStyle, Button } from 'react-native';

import { THEME } from '../theme';

interface IProfileTextInputStyle {
  wrapper: ViewStyle;
  label: ViewStyle;
  textInput: TextStyle;
  alertStyle?: ViewStyle;
}

interface IProfileTextInputProps {
  textLabel: string;
  placeholder: string;
  onChangeTextHandler: (value: string) => void;
  onFocusHandler?: () => void;
}

export const TextInputModalScreen = ({ navigation, route }) => {
  const [text, setText] = useState<string>(route.params.textValue);
  console.log('modal screen', text);
  
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => navigation.navigate('SignUpProfileScreen', { post: text, })} title="Update count" />
      ),
    });
  }, [text, navigation]);

  return (
    <View style={styles.center}>
      <View style={styles.wrapper}>
        <Text style={styles.label}>{route.params.textLabel}</Text>
        <TextInput
          placeholder={route.params.placeholder}
          style={styles.textInput}
          onChangeText={value => setText(value)}
          value={text}
        />
      </View>
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
  wrapper: {
    borderRadius: 0,
    borderColor: THEME.darkGray,
    borderBottomWidth: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 0,
  },
  label: {
    alignSelf: 'flex-start',
  },
  textInput: {
    width: '100%',
    alignSelf: 'flex-start',
    flexGrow: 1,
    flexShrink: 1,
    fontSize: 16,
  },
  alertStyle: {
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
    borderColor: 'red',
    borderWidth: 1,
  },
})
