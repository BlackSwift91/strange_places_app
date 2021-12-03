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
  ActivityIndicator,
} from 'react-native';

import { DB } from '../../sglib.config';
import { useSelector } from 'react-redux';
import { IRootState } from '../store/index';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { NavigationButton } from '../components/NavigationButton';
import { IPostData } from '../interfaces/IPostData';
import { THEME } from '../theme';
import { IUserProfile } from '../interfaces/INavigation';
import { IUserData, ISubscribeUserDate } from '../interfaces/IUserData';
import { CustomButton } from '../components/CustomButton';
import { ICustomButtonStyle } from '../interfaces/ICustomButtonStyle';
import { useTranslation } from 'react-i18next';

import { IGetUserData, IGetUserPlaces } from '../interfaces/IDBResponse';

export const UserProfileScreen: React.FC<IUserProfile> = ({ navigation, route }) => {
  const userData = useSelector((state: IRootState) => state.userDataReducer);
  const [profileData, setProfileData] = useState<IUserData | undefined>(undefined);
  const [posts, setPosts] = useState<IPostData[]>([]);
  const [subscriptions, setSubscriptions] = useState<ISubscribeUserDate[]>([]);
  const [subscribers, setSubscribers] = useState<ISubscribeUserDate[]>([]);
  const [isUserProfile, setIsUserProfile] = useState<boolean | null>(null);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [isScreenLoaded, setIsScreenLoaded] = useState<boolean>(false);

  const { t } = useTranslation();

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
      headerTitle: profileData?.user_name,
    });
  }, [isUserProfile, navigation, profileData?.user_name]);

  const getPosts = useCallback(async () => {
    console.log('useCallback DB posts 0');
    if (!profileData) {
      return;
    }
    if (isUserProfile) {
      const fetchResult: IGetUserPlaces = await DB.places.getUserPlaces(profileData._id);
      if (fetchResult.ok) {
        setPosts(fetchResult.data);
      }
    } else if (!isUserProfile) {
      if (route.params?.params._id) {
        const fetchResult: IGetUserPlaces = await DB.places.getUserPlaces(route.params?.params._id);
        setPosts(fetchResult.data);
      }
    }
  }, [isUserProfile, profileData, route.params?.params._id]);

  const getSubscriptions = useCallback(async () => {
    console.log('useCallback DB getMySubscriptions 0');
    if (!profileData) {
      return;
    }
    if (isUserProfile) {
      const fetchResult = await DB.subscriptions.getUserSubscriptions(profileData._id);
      if (fetchResult.ok) {
        setSubscriptions(fetchResult.data);
      }
    } else if (!isUserProfile) {
      if (route.params?.params._id) {
        const fetchResult = await DB.subscriptions.getUserSubscriptions(route.params?.params._id);
        if (fetchResult.ok) {
          setSubscriptions(fetchResult.data);
        }
      }
    }
  }, [isUserProfile, profileData, route.params?.params._id]);

  const getSubscribers = useCallback(async () => {
    console.log('useCallback DB getMySubscribers 0');
    if (!profileData) {
      return;
    }
    if (isUserProfile) {
      const fetchResult = await DB.subscriptions.getUserSubscribers(profileData._id);
      if (fetchResult.ok) {
        setSubscribers(fetchResult.data);
        setIsScreenLoaded(true);
      }
    } else if (!isUserProfile) {
      if (route.params?.params._id) {
        const fetchResult = await DB.subscriptions.getUserSubscribers(route.params?.params._id);
        if (fetchResult.ok) {
          const isSubscribedToUser = fetchResult.data.find(el => el.user_id === userData.user_id);
          if (isSubscribedToUser) {
            setIsSubscribed(true);
          }
          setSubscribers(fetchResult.data);
          await setIsScreenLoaded(true);
        }
      }
    }
  }, [isUserProfile, profileData, route.params?.params._id, userData.user_id]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      if (!route.params?.params._id || route.params?.params._id === userData._id) {
        setProfileData(userData);
        setIsUserProfile(true);
      } else {
        const fetchResult: IGetUserData = await DB.users.getUserData(route.params.params._id);
        if (fetchResult.ok) {
          setProfileData(fetchResult.data);
        }
        setIsUserProfile(false);
      }
    });

    return unsubscribe;
  }, [navigation, route, userData]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', async () => {
      setIsUserProfile(null);
      setProfileData(undefined);
      setIsScreenLoaded(false);
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  useEffect(() => {
    getSubscribers();
  }, [getSubscribers]);

  useEffect(() => {
    getSubscriptions();
  }, [getSubscriptions]);

  const SubscriptionComponent = () => {
    const subscribe = async () => {
      if (route.params?.params._id) {
        await DB.subscriptions.subscribe(route.params?.params._id, userData);
        const fetchResult = await DB.subscriptions.getUserSubscribers(route.params?.params._id);
        if (fetchResult.ok) {
          setSubscribers(fetchResult.data);
          setIsSubscribed(true);
        }
      }
    };

    const unsubscribe = async () => {
      const fetchResult = await DB.subscriptions.getUserSubscriptions(userData._id);
      if (!fetchResult.ok) {
        return;
      }
      const subscriptionData = fetchResult.data.find(el => el.user_id === profileData?.user_id);
      const followData = subscribers.find(el => el.user_id === userData.user_id);
      if (subscriptionData && route.params?.params._id && followData) {
        DB.subscriptions.unsubscribe(
          route.params.params._id,
          userData._id,
          followData.doc_id,
          subscriptionData.doc_id,
        );
        setIsSubscribed(false);
        const result = await DB.subscriptions.getUserSubscribers(route.params?.params._id);
        if (result.ok) {
          setSubscribers(result.data);
        }
      }
    };

    return (
      <View style={styles.subscriptionContainer}>
        {!isSubscribed ? (
          <View style={subscribeButtonStyle.buttonContainerStyle}>
            <CustomButton
              buttonStyle={subscribeButtonStyle.buttonStyle}
              buttonTextStyle={subscribeButtonStyle.buttonTextStyle}
              buttonText={t('profileScreen.subscribe')}
              onPressHandler={subscribe}
            />
          </View>
        ) : (
          <View style={subscribeButtonStyle.buttonContainerStyle}>
            <CustomButton
              buttonStyle={subscribeButtonStyle.buttonStyle}
              buttonTextStyle={subscribeButtonStyle.buttonTextStyle}
              buttonText={t('profileScreen.unsubscribe')}
              onPressHandler={unsubscribe}
            />
          </View>
        )}
      </View>
    );
  };

  if (!isScreenLoaded) {
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
                uri: profileData?.avatar_url,
              }}
            />
          </View>
          <View style={styles.userInfoInner}>
            <View style={styles.userInfoBlock}>
              <View>
                <Text style={styles.textInfoBold}>{posts.length}</Text>
                <Text style={styles.textInfo}>{t('profileScreen.posts')}</Text>
              </View>
              <View>
                <Text style={styles.textInfoBold}>{subscriptions.length}</Text>
                <Text style={styles.textInfo}>{t('profileScreen.subscriptions')}</Text>
              </View>
              <View>
                <Text style={styles.textInfoBold}>{subscribers.length}</Text>
                <Text style={styles.textInfo}>{t('profileScreen.subscribers')}</Text>
              </View>
            </View>
            {!isUserProfile ? SubscriptionComponent() : <></>}
          </View>
        </View>
        <View style={styles.userInfoInnerContainer}>
          <Text style={styles.textUserName}>
            {`${profileData?.first_name} ${profileData?.last_name}`}
          </Text>
          <Text style={styles.textAboutUser}>{profileData?.about_user}</Text>
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
    justifyContent: 'space-between',
  },
  userInfoInner: {
    flex: 1,
    justifyContent: 'center',
  },
  userInfoBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 20,
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
  subscriptionContainer: {
    flexDirection: 'row',
    marginLeft: 20,
  },
  loadingScreen: {
    flex: 1,
    backgroundColor: THEME.WHITE_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const subscribeButtonStyle = StyleSheet.create<ICustomButtonStyle>({
  buttonContainerStyle: {
    width: 120,

    marginTop: 20,
  },
  buttonStyle: {
    paddingVertical: 2,
    paddingHorizontal: 10,
    backgroundColor: THEME.MAIN_COLOR,
  },
  buttonTextStyle: {
    color: THEME.WHITE_COLOR,
  },
});
