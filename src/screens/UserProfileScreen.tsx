import React, { useState, useCallback, useEffect, useLayoutEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import { DB } from '../../sglib.config';
import { useSelector } from 'react-redux';
import { IRootState } from '../store/index';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { NavigationButton } from '../components/NavigationButton';
import { IDBPlaces } from '../interfaces/IDBPlaces';
import { IDBUsers } from '../interfaces/IDBUsers';
import { IPostData } from '../interfaces/IPostData';
import { THEME } from '../theme';
import { IUserProfile } from '../interfaces/INavigation';

interface IUserData {
  _id: string;
  about_user: string;
  avatar_url: string;
  first_name: string;
  last_name: string;
  location: {
    city: string;
    country: string;
  };
  user_id: string;
  user_name: string;
}

export const UserProfileScreen: React.FC<IUserProfile> = ({ navigation, route }) => {
  const userData = useSelector((state: IRootState) => state.userDataReducer);
  const [posts, setPosts] = useState<IPostData[]>([]);
  const [subscriptions, setSubscriptions] = useState<IUserData[]>([]);
  const [subscribers, setSubscribers] = useState<IUserData[]>([]);
  const [isUserProfile, setIsUserProfile] = useState<boolean | null>(null);
  const [profileData, setProfileData] = useState<IUserData>();

  const getUserData = useCallback(async () => {
    if (isUserProfile === false && route.params?.params._id) {
      console.log('user');
      const result: IDBUsers = await DB.users.getUserData(route.params?.params._id);
      if (result) {
        setProfileData(result.data[0]);
      }
    }
  }, [isUserProfile, route.params?.params._id]);

  const getPosts = useCallback(async () => {
    console.log('useCallback DB posts 0');
    if (profileData) {
      console.log('useCallback DB posts 1');
      const result: IDBPlaces = await DB.places.getMyPlaces(profileData._id);
      if (result) {
        setPosts(result.data);
      }
    }
  }, [profileData]);

  const getSubscriptions = useCallback(async () => {
    console.log('useCallback DB getMySubscriptions 0');
    if (profileData) {
      console.log('useCallback DB getMySubscriptions 1');
      const result = await DB.subscriptions.getMySubscriptions(profileData._id);
      if (result) {
        setSubscriptions(result.data);
      }
    }
  }, [profileData]);

  const getSubscribers = useCallback(async () => {
    console.log('useCallback DB getMySubscribers 0');
    if (profileData) {
      console.log('useCallback DB getMySubscribers 1');
      const result = await DB.subscriptions.getMySubscribers(profileData._id);
      if (result) {
        setSubscribers(result.data);
      }
    }
  }, [profileData]);

  useEffect(() => {
    console.log('USER IDENTIFICATION');
    if (!route.params?.params._id || route.params?.params._id === userData._id) {
      setIsUserProfile(true);
      setProfileData(userData);
    } else {
      setIsUserProfile(false);
    }
  }, [route, userData]);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  useEffect(() => {
    getSubscribers();
  }, [getSubscribers]);

  useEffect(() => {
    getSubscriptions();
  }, [getSubscriptions]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        isUserProfile ? (
          <HeaderButtons HeaderButtonComponent={NavigationButton}>
            <Item
              title="Show posts as List"
              iconName="account-cog"
              onPress={() => navigation.navigate('Settings')}
            />
          </HeaderButtons>
        ) : (
          <></>
        ),
      headerTitle: userData.user_name,
    });
  }, [isUserProfile, navigation, route.params?.params._id, userData._id, userData.user_name]);

  return (
    <ScrollView style={styles.screenWrapper}>
      <StatusBar
        animated={true}
        backgroundColor="transparent"
        translucent={true}
        hidden={false}
        barStyle="dark-content"
      />
      <View style={styles.contentContainer}>
        <View style={styles.userInfoContainer}>
          <View style={styles.avatarContainer}>
            <Image
              source={{
                width: 100,
                height: 100,
                uri: userData.avatar_url,
              }}
            />
          </View>
          <View>
            <Text style={styles.textInfoBold}>{posts.length}</Text>
            <Text style={styles.textInfo}>Posts</Text>
          </View>
          <View>
            <Text style={styles.textInfoBold}>{subscriptions.length}</Text>
            <Text style={styles.textInfo}>Subscription</Text>
          </View>
          <View>
            <Text style={styles.textInfoBold}>{subscribers.length}</Text>
            <Text style={styles.textInfo}>Subscribers</Text>
          </View>
        </View>
        <View style={styles.userInfoInnerContainer}>
          <Text style={styles.textUserName}>{`${userData.first_name} ${userData.last_name}`}</Text>
          <Text style={styles.textAboutUser}>{userData.about_user}</Text>
        </View>
      </View>
      <View style={styles.postsContainer}>
        {posts.map(place => (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.postsItem}
            key={place.doc_id}
            onPress={async () => {
              navigation.navigate('PlaceDetail', {
                params: { post: place },
              });
            }}>
            <View>
              <Image
                source={{
                  width: Dimensions.get('window').width / 3 - 2,
                  height: Dimensions.get('window').width / 3 - 2,
                  uri: place.img,
                }}
              />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
    backgroundColor: THEME.WHITE_COLOR,
  },
  contentContainer: {
    marginTop: 15,
    paddingHorizontal: 15,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatarContainer: {
    borderRadius: 80,
    width: 100,
    height: 100,
    overflow: 'hidden',
  },
  textInfoBold: {
    color: THEME.BLACK_COLOR,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textInfo: {
    color: THEME.BLACK_COLOR,
    fontWeight: 'bold',
  },
  textUserName: {
    color: THEME.BLACK_COLOR,
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 24,
  },
  userInfoInnerContainer: {
    marginTop: 15,
  },
  textAboutUser: {
    color: THEME.BLACK_COLOR,
    fontSize: 16,
    lineHeight: 24,
  },
  postsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginTop: 15,
    marginBottom: 85,
    alignContent: 'flex-start',
  },
  postsItem: {
    marginHorizontal: 1,
  },
});
