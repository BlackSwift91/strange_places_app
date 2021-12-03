import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

import { DB } from '../../sglib.config';
import { THEME } from '../theme';
import { IRootState } from '../store/index';
import { useSelector } from 'react-redux';
import { IPlaceScreen } from '../interfaces/INavigation';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { NavigationButton } from '../components/NavigationButton';

const windowWidth = Dimensions.get('window').width;

export const PlaceDetailScreen: React.FC<IPlaceScreen> = ({ navigation, route }) => {
  const userData = useSelector((state: IRootState) => state.userDataReducer);

  const [postAuthorPhoto, setPostAuthorPhoto] = useState<string>('');
  const [postAuthorName, setPostAuthorName] = useState<string>('');
  const [postAuthorDocId, setPostAuthorDocId] = useState<string>('');
  const [postDocId, setPostDocId] = useState<string>('');
  const [isUserProfile, setIsUserProfile] = useState<boolean>(false);
  const [postAdress, setPostAdress] = useState();

  const [isScreenLoaded, stIsScreenLoaded] = useState<boolean>(false);

  const [isReverseGeoFetched, setIsReverseGeoFetched] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      fetch(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${route.params.params.post.location._lat}&lon=${route.params.params.post.location._long}&format=json&apiKey=ece5bc0e1ec84f0a976033b7060afc56`,
        { method: 'GET' },
      )
        .then(response => response.json())
        .then(result => {
          setPostAdress(result);
          setIsReverseGeoFetched(true);
        })
        .catch(error => console.log('error', error));
    })();
  }, [route.params.params.post]);

  useEffect(() => {
    if (route.params.params.post.user_doc_id === userData._id) {
      setIsUserProfile(true);
    }
  }, [route.params.params.post.user_doc_id, userData._id]);

  const deletePost = useCallback(() => {
    firestore()
      .collection('users')
      .doc(postAuthorDocId)
      .collection('places')
      .doc(postDocId)
      .delete();
    navigation.goBack();
  }, [navigation, postAuthorDocId, postDocId]);

  useEffect(() => {
    setPostAuthorDocId(route.params.params.post.user_doc_id);
    setPostDocId(route.params.params.post.doc_id);
  }, [route, postAuthorDocId, postDocId]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={NavigationButton}>
          {isUserProfile ? (
            <Item title="All Posts" iconName="delete" onPress={() => deletePost()} />
          ) : (
            <></>
          )}
        </HeaderButtons>
      ),
    });
  }, [deletePost, isUserProfile, navigation]);

  const submitUserInformation = async () => {
    const result = await DB.users.getUserData(route.params.params.post.user_doc_id);
    if (result.ok) {
      setPostAuthorPhoto(result.data.avatar_url);
      setPostAuthorName(result.data.user_name);
      stIsScreenLoaded(true);
    }
  };

  useEffect(() => {
    if (userData._id !== route.params.params.post.user_doc_id) {
      submitUserInformation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route, userData._id]);

  const UserAvatar = () => {
    if (isUserProfile) {
      return (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('UserProfile');
          }}
          style={styles.postAuthorAvatar}>
          <View style={styles.postAuthorAvatarContainer}>
            <Image
              source={{
                uri: userData.avatar_url,
              }}
              style={styles.postAuthorAvatarSize}
            />
          </View>
          <View>
            <Text style={styles.authorNameText}>{userData.user_name}</Text>
            <Text style={styles.postLocationAdress}>
              {postAdress?.results[0]?.country}, {postAdress?.results[0]?.city},
              {postAdress?.results[0]?.suburb}
            </Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('UserProfile', {
              params: { _id: route.params.params.post.user_doc_id },
            });
          }}
          style={styles.postAuthorAvatar}>
          <View style={styles.postAuthorAvatarContainer}>
            <Image
              source={{
                uri: postAuthorPhoto,
              }}
              style={styles.postAuthorAvatarSize}
            />
          </View>
          <View>
            <Text style={styles.authorNameText}>{postAuthorName}</Text>
            <Text style={styles.postLocationAdress}>
              {postAdress?.results[0]?.country}, {postAdress?.results[0]?.city},
              {postAdress?.results[0]?.suburb}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
  };

  if (!isScreenLoaded && !isReverseGeoFetched) {
    return (
      <View style={styles.loadingScreen}>
        <StatusBar
          animated={true}
          backgroundColor="transparent"
          translucent={true}
          hidden={false}
          barStyle="dark-content"
        />
        <ActivityIndicator size="large" color={THEME.MAIN_COLOR} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollView}>
      <StatusBar
        animated={true}
        backgroundColor="transparent"
        translucent={true}
        hidden={false}
        barStyle="dark-content"
      />
      <View style={styles.contentContainer}>
        <UserAvatar />

        <Image
          source={{
            uri: route.params.params.post.img,
          }}
          style={styles.postImage}
        />
      </View>
      <Text style={styles.text}>{route.params.params.post.description}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: THEME.WHITE_COLOR,
  },
  contentContainer: {
    alignItems: 'flex-start',
    marginTop: 10,
    paddingHorizontal: 15,
  },
  text: {
    marginTop: 20,
    marginHorizontal: 20,
    width: windowWidth - 30,
    color: THEME.BLACK_COLOR,
    fontSize: 20,
    lineHeight: 24,
  },
  postImage: {
    width: windowWidth - 30,
    height: windowWidth - 30,
  },
  postAuthorAvatar: {
    zIndex: 1000,
    marginBottom: 10,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  postAuthorAvatarSize: {
    width: 50,
    height: 50,
  },
  loadingScreen: {
    flex: 1,
    backgroundColor: THEME.WHITE_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  authorNameText: {
    color: THEME.MAIN_COLOR,
    fontSize: 15,
    lineHeight: 18,
    fontWeight: 'bold',
  },
  postLocationAdress: {
    color: THEME.MAIN_COLOR,
    fontSize: 13,
    lineHeight: 20,
    fontWeight: 'bold',
  },
  postAuthorAvatarContainer: {
    borderRadius: 50,
    overflow: 'hidden',
    marginRight: 10,
  },
});
