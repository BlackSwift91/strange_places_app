import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { NavigationButton } from '../components/NavigationButton';
import { useSelector } from 'react-redux';
import { IRootState } from '../store/index';
import { IUserData } from '../interfaces/IUserData';
import { IPlaceScreen } from '../interfaces/INavigation';

const windowWidth = Dimensions.get('window').width;

export const PlaceDetailScreen: React.FC<IPlaceScreen> = ({ navigation, route }) => {
  const userId = useSelector((state: IRootState) => state.userDataReducer._id);
  const [postAuthorPhoto, setPostAuthorPhoto] = useState<string>('');
  const [postAuthorDocId, setPostAuthorDocId] = useState<string>('');
  const [postDocId, setPostDocId] = useState<string>('');

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
          <Item title="All Posts" iconName="delete" onPress={() => deletePost()} />
        </HeaderButtons>
      ),
    });
  }, [navigation, deletePost]);

  const submitUserInformation = async () => {
    const data: IUserData[] = [];

    await firestore()
      .collection('users')
      .where('user_id', '==', `${route.params.params.post.user_id}`)
      .get()
      .then(response => {
        response.forEach((doc: any) => {
          data.push(doc.data());
        });
      });
    setPostAuthorPhoto(data[0].avatar_url);
  };
  console.log(route.params.params.post.user_doc_id);

  useEffect(() => {
    if (userId !== route.params.params.post.user_doc_id) {
      submitUserInformation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route, userId]);

  const UserAvatar = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('UserProfile', {
            params: { _id: route.params.params.post.user_doc_id },
          });
        }}
        style={styles.postAuthorAvatar}>
        <Image
          source={{
            uri: postAuthorPhoto,
          }}
          style={styles.postAuthorAvatarSize}
        />
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.contentContainer}>
        {userId !== route.params.params.post.user_doc_id ? UserAvatar() : <></>}
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
    backgroundColor: '#ffffff',
  },
  contentContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  text: {
    marginTop: 20,
    marginHorizontal: 20,
    width: windowWidth - 30,
    color: 'black',
    fontSize: 20,
    lineHeight: 24,
  },
  postImage: {
    width: windowWidth - 30,
    height: windowWidth - 30,
  },
  postAuthorAvatar: {
    width: 80,
    height: 80,
    borderRadius: 80,
    overflow: 'hidden',
    position: 'absolute',
    zIndex: 1000,
    right: 30,
    top: 15,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  postAuthorAvatarSize: {
    width: 80,
    height: 80,
  },
});
