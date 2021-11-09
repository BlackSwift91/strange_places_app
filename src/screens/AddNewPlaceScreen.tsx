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
} from 'react-native';
import { ProfileTextInput } from './../components/ProfileTextInput';
import { addImage } from '../images/addImage';
import { THEME } from '../theme';
import { ImageSourceModal } from '../components/ImageSourceModal';
import { pickPlaceFromGallery, pickPlaceFromCamera } from '../ImagePicker';
import { requestCameraPermission } from '../AndroidPermissions';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { useTranslation } from 'react-i18next';
import { MultilineTextInput } from './../components/MultilineTextInput';
import { CustomButton } from '../components/CustomButton';
import { ICustomButtonStyle } from '../interfaces/ICustomButtonStyle';
import { useDispatch, useSelector } from 'react-redux';
import { setUserLocation  } from '../store/actions/actions';
import { IRootState } from '../store/index';

const windowWidth = Dimensions.get('window').width;

export const AddNewPlaceScreen = ({ navigation, route }) => {
  const userCoordinates = useSelector((state: IRootState) => state.userLocationReducer);
  const [postTitle, setPostTitle] = useState<string>('');
  const [image, setImage] = useState({ uri: addImage, width: 150, height: 150 });
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [postCoord, setPostCoord] = useState({
    _lat: userCoordinates.latitude,
    _long: userCoordinates.longitude,
  });
  const [postDescription, setPostDescription] = useState<string>('');

  const dispatch = useDispatch();
  const { t } = useTranslation();
  console.log(postCoord);

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
      setImage(resImagee);
    }
  };

  const selectPhotoFromLibrary = async () => {
    await setModalVisible(!modalVisible);
    const resImagee = await pickPlaceFromGallery();
    if (resImagee) {
      setImage({ uri: resImagee.uri, width: windowWidth - 30, height: windowWidth - 30 });
    }
  };

  const changePostTitle = (text: string) => {
    setPostTitle(text);
  };

  const changePostDescription = (text: string) => {
    setPostDescription(text);
  };

  const test = () => {
    dispatch(setUserLocation(postCoord._lat, postCoord._long));
  };

  return (
    <ScrollView style={styles.wrapper}>
      <StatusBar
        animated={true}
        backgroundColor={THEME.WHITE_COLOR}
        translucent={true}
        hidden={false}
        barStyle="dark-content"
      />
      <View style={styles.container}>
        <View style={styles.textTitleWrapper}>
          <ProfileTextInput
            textLabel={t('addNewPostScreen.postTitleLabel')}
            placeholder={t('addNewPostScreen.postTitlePlaceholder')}
            onChangeTextHandler={changePostTitle}
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
          <Image
            source={{ uri: image.uri }}
            style={{
              width: image.width,
              height: image.height,
            }}
          />
        </TouchableOpacity>
        <View style={styles.textDescriptionWrapper}>
          <MultilineTextInput
            textLabel={t('addNewPostScreen.postDescriptionLabel')}
            placeholder={t('addNewPostScreen.postDescriptionPlaceholder')}
            onChangeTextHandler={changePostDescription}
          />
        </View>
        <View style={styles.textLocationWrapper}>
          <Text style={styles.textLocation}>{t('addNewPostScreen.postLocation')}</Text>
        </View>
        <View style={styles.center}>
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            mapType={'hybrid'}
            region={{
              latitude: postCoord._lat,
              longitude: postCoord._long,
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
            onPressHandler={test}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: THEME.WHITE_COLOR,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 0,
  },
  textTitleWrapper: {
    paddingHorizontal: 15,
    width: '100%',
    marginTop: 20,
  },
  textDescriptionWrapper: {
    paddingHorizontal: 15,
    width: '100%',
    marginTop: 10,
  },
  imageContainer: {
    marginTop: 20,
  },
  text: {
    color: 'black',
  },
  textLocation: {
    color: THEME.BLACK_COLOR,
  },
  center: {
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
  },
  buttonStyle: {
    backgroundColor: THEME.WHITE_COLOR,
  },
  buttonTextStyle: {
    color: THEME.MAIN_COLOR,
  },
});
