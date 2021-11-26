import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';

import { DB } from '../../sglib.config';
import { useSelector } from 'react-redux';
import { IRootState } from '../store/index';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { NavigationButton } from '../components/NavigationButton';
import { IDBPlaces } from '../interfaces/IDBPlaces';
import { IPostData } from '../interfaces/IPostData';

export const UserProfileScreen = ({ navigation }) => {
  const userData = useSelector((state: IRootState) => state.userDataReducer);
  const [userPosts, setUserPosts] = useState<IPostData[]>([]);

  const getUserPosts = useCallback(async () => {
    console.log('call useCallback DB');
    const result: IDBPlaces = await DB.places.getMyPlaces(userData._id);
    if (result) {
      setUserPosts(result.data);
    }
    console.log('response', userPosts[0].doc_id);
  }, []);

  useEffect(() => {
    getUserPosts();
  }, [getUserPosts]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={NavigationButton}>
          <Item
            title="Show posts as List"
            iconName="account-cog"
            onPress={() => navigation.navigate('Settings')}
          />
        </HeaderButtons>
      ),
      headerTitle: userData.user_name,
    });
  }, [navigation, userData.user_name]);

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
            <Text style={styles.textInfoBold}>{userPosts.length}</Text>
            <Text style={styles.textInfo}>Posts</Text>
          </View>
          <View>
            <Text style={styles.textInfoBold}>0</Text>
            <Text style={styles.textInfo}>Subscription</Text>
          </View>
          <View>
            <Text style={styles.textInfoBold}>0</Text>
            <Text style={styles.textInfo}>Subscribers</Text>
          </View>
        </View>
        <View style={{ marginTop: 15, }}>
          <Text style={styles.textUserName}>{`${userData.first_name} ${userData.last_name}`}</Text>
          <Text style={styles.textAboutUser}>{userData.about_user}</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', marginTop: 15, marginBottom: 85, alignContent: 'flex-start' }}>
        {userPosts.map(place => (
          <TouchableOpacity
            style={styles.p}
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
    backgroundColor: '#ffffff',
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
  textInfoContainer: {
  },
  textInfoBold: {
    color: '#000000',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textInfo: {
    color: '#000000',
    fontWeight: 'bold',
  },
  textUserName: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 24,
  },
  textAboutUser: {
    color: '#000000',
    fontSize: 16,
    lineHeight: 24,
  },
  p: {
    borderColor: '#ffffff',
    borderWidth: 1,
  },


});
