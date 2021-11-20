import React from 'react';
import { Image, StyleSheet, ViewStyle, ImageStyle, View } from 'react-native';
import { addPost } from '../images/addPost';

export interface IStyle {
  appPostButtonContainer: ViewStyle;
  appPostButtonImage: ImageStyle;
}

export const AddPostTabBarButton = () => {
  return (
    <View style={styles.appPostButtonContainer}>
      <Image source={{ uri: addPost }} style={styles.appPostButtonImage} />
    </View>
  );
};

const styles = StyleSheet.create<IStyle>({
  appPostButtonContainer: {
    top: -12,
    backgroundColor: '#ffffff',
    borderRadius: 70,
    borderWidth: 10,
    borderColor: '#ffffff',
  },
  appPostButtonImage: {
    width: 60,
    height: 60,
  },
});
