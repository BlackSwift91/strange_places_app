import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import firestore from '@react-native-firebase/firestore';
import { addImage } from '../images/addImage';
import { THEME } from '../theme';
import { ImageSourceModal } from '../components/ImageSourceModal';
import { pickPlaceFromGallery, pickPlaceFromCamera } from '../ImagePicker';
import { requestCameraPermission } from '../AndroidPermissions';
import { useTranslation } from 'react-i18next';
import { MultilineTextInput } from './../components/MultilineTextInput';
import { CustomButton } from '../components/CustomButton';
import { ICustomButtonStyle } from '../interfaces/ICustomButtonStyle';
import { useSelector } from 'react-redux';
import { IRootState } from '../store/index';
import { IAddNewPlaceScreen } from '../interfaces/INavigation';

const windowWidth = Dimensions.get('window').width;

interface IImage {
  uri: string;
  width: number;
  height: number;
}

interface IProps {
  scrollView: ViewStyle;
  insideWrapper: ViewStyle;
  textLocationWrapper: ViewStyle;
  map: ViewStyle;
  mapWrapper: ViewStyle;
  textLocation: ViewStyle;
  imageContainer: ViewStyle;
  textDescriptionWrapper: ViewStyle;
}

export const AddNewPlaceScreen: React.FC<IAddNewPlaceScreen> = ({ navigation }) => {
  const userCoordinates = useSelector((state: IRootState) => state.userLocationReducer);
  const userData = useSelector((state: IRootState) => state.userDataReducer);
  const [isDefaultImage, setIsDefaultImage] = useState<boolean>(true);
  const [postDescription, setPostDescription] = useState<string>('');
  const [image, setImage] = useState<IImage>({ uri: addImage, width: 150, height: 150 });
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [postCoord, setPostCoord] = useState({
    _lat: userCoordinates.latitude,
    _long: userCoordinates.longitude,
  });

  const { t } = useTranslation();

  const showImageSelectionModal = async () => {
    await requestCameraPermission();
    await setModalVisible(!modalVisible);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const makeNewPhoto = async () => {
    await setModalVisible(false);
    const resImagee = await pickPlaceFromCamera();
    if (resImagee) {
      setImage({ uri: resImagee.uri, width: windowWidth - 30, height: windowWidth - 30 });
      setIsDefaultImage(false);
    }
  };

  const selectPhotoFromLibrary = async () => {
    await setModalVisible(!modalVisible);
    const resImagee = await pickPlaceFromGallery();
    if (resImagee) {
      setImage({ uri: resImagee.uri, width: windowWidth - 30, height: windowWidth - 30 });
      setIsDefaultImage(false);
    }
  };

  const changePostDescription = (text: string) => {
    setPostDescription(text);
  };

  const addPost = async () => {
    await firestore()
      .collection('users')
      .doc(userData._id)
      .collection('places')
      .add({
        description: postDescription,
        img: image.uri,
        location: {
          _lat: postCoord._lat,
          _long: postCoord._long,
        },
        user_doc_id: userData._id,
        user_id: userData.user_id,
      });
    navigation.reset({
      index: 0,
      routes: [{ name: 'AddNewPlaceScreen' }],
    });
    navigation.navigate('HomeScreenNavigator');
  };

  const defaultImage = () => {
    return (
      <Image
        source={{ uri: image.uri }}
        style={{
          width: image.width,
          height: image.height,
        }}
      />
    );
  };

  const userImage = () => {
    return (
      <Image
        source={{ uri: image.uri }}
        style={{
          width: windowWidth - 30,
          height: windowWidth - 30,
        }}
      />
    );
  };

  return (
    <ScrollView style={styles.scrollView}>
      <StatusBar
        animated={true}
        backgroundColor={THEME.BLACK_COLOR}
        hidden={false}
        barStyle="light-content"
      />
      <View style={styles.insideWrapper}>
        <View style={styles.textDescriptionWrapper}>
          <MultilineTextInput
            textLabel={t('addNewPostScreen.postDescriptionLabel')}
            placeholder={t('addNewPostScreen.postDescriptionPlaceholder')}
            onChangeTextHandler={changePostDescription}
          />
        </View>
        <ImageSourceModal
          visibility={modalVisible}
          closeModal={closeModal}
          makePhoto={makeNewPhoto}
          selectFromLibrary={selectPhotoFromLibrary}
        />
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={showImageSelectionModal}
          activeOpacity={0.7}>
          {isDefaultImage ? defaultImage() : userImage()}
        </TouchableOpacity>
        <View style={styles.textLocationWrapper}>
          <Text style={styles.textLocation}>{t('addNewPostScreen.postLocation')}</Text>
        </View>
        <View style={styles.mapWrapper}>
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            mapType={'hybrid'}
            initialRegion={{
              latitude: userCoordinates.latitude,
              longitude: userCoordinates.longitude,
              latitudeDelta: 0.008,
              longitudeDelta: 0.008,
            }}
            zoomEnabled={true}
            showsUserLocation={true}>
            <Marker
              draggable
              coordinate={{ latitude: postCoord._lat, longitude: postCoord._long }}
              onDragEnd={e =>
                setPostCoord({
                  _lat: e.nativeEvent.coordinate.latitude,
                  _long: e.nativeEvent.coordinate.longitude,
                })
              }
            />
          </MapView>
        </View>
        <View style={restorePasswordButtonStyle.buttonContainerStyle}>
          <CustomButton
            buttonStyle={restorePasswordButtonStyle.buttonStyle}
            buttonTextStyle={restorePasswordButtonStyle.buttonTextStyle}
            buttonText={t('addNewPostScreen.submitButton')}
            onPressHandler={addPost}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create<IProps>({
  scrollView: {
    flex: 1,
    backgroundColor: THEME.WHITE_COLOR,
  },
  insideWrapper: {
    flex: 1,
    alignItems: 'center',
    marginTop: 0,
  },
  textDescriptionWrapper: {
    paddingHorizontal: 15,
    width: '100%',
    marginTop: 10,
  },
  imageContainer: {
    marginTop: 20,
  },
  textLocation: {
    color: THEME.BLACK_COLOR,
  },
  mapWrapper: {
    marginTop: 10,
    marginBottom: 0,
    width: windowWidth - 30,
    height: 250,
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  textLocationWrapper: {
    paddingHorizontal: 15,
    width: '100%',
    paddingTop: 20,
  },
});

const restorePasswordButtonStyle = StyleSheet.create<ICustomButtonStyle>({
  buttonContainerStyle: {
    width: '90%',
    marginVertical: 40,
    marginBottom: 120,
  },
  buttonStyle: {
    backgroundColor: THEME.WHITE_COLOR,
  },
  buttonTextStyle: {
    color: THEME.MAIN_COLOR,
  },
});
