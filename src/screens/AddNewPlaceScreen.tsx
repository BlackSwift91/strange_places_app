import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, Image, Dimensions, TouchableOpacity } from 'react-native';
import { ProfileTextInput } from './../components/ProfileTextInput';
import { UserIcon } from '../images/UserIcon';
import { THEME } from '../theme';
import ImagePicker from 'react-native-image-crop-picker';

export const AddNewPlaceScreen = ({ navigation, route }) => {
  const windowWidth = Dimensions.get('window').width;
  const [postTitle, setPostTitle] = useState<string>('');
  const [image, setImage] = useState({ uri: UserIcon, width: 140, height: 140 });


  const onButtonPress = () => {
    pickSingleBase64(true);
  }


  function pickSingleBase64(cropit: boolean) {
    ImagePicker.openPicker({
      width: 140,
      height: 140,
      cropping: cropit,
      includeBase64: true,
      includeExif: true,
      mediaType: 'photo',
    })
      .then(img => {
        console.log('received base64 image');
        setImage({
          uri: `data:${img.mime};base64,` + img.data,
          width: img.width,
          height: img.height,
        });
      })
      .catch(e => console.log(e));
  }

  const changeUserFirstName = (text: string) => {
    setPostTitle(text);
  };
  return (
    <ScrollView style={styles.wrapper}>
      <StatusBar
        animated={true}
        backgroundColor={THEME.MAIN_COLOR}
        translucent={true}
        hidden={false}
      />
      <View style={styles.container}>
        <View style={styles.textInputWrapper}>
          <ProfileTextInput
            textLabel={'Post Title'}
            placeholder={'Add your post title'}
            onChangeTextHandler={changeUserFirstName}
          />
        </View>
        <TouchableOpacity style={styles.imageContainer} onPress={onButtonPress}>
          <Image
            source={{ uri: image.uri }}
            style={{
              width: windowWidth - 30,
              height: windowWidth - 30,
            }}
          />
        </TouchableOpacity>
      </View>
    </ScrollView >
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 60,
  },
  textInputWrapper: {
    width: '90%',
    marginTop: 50,
  },
  imageContainer: {
    marginTop: 20,
  },
  text: {
    color: 'black',
  },
});
