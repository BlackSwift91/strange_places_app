import React, { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setAllUserData } from '../store/actions/actions';

import { IRootState } from '../store/index';
import { TabNavigator } from './TabNavigator';
import { AuthentificationNavigator } from './AuthentificationNavigator';

export interface IUser {
  user_id: string;
  _id: string;
  user_name: string;
  first_name: string;
  last_name: string;
  about_user: string;
  avatar_url: string;
  location: {
    city: string;
    country: string;
  };
}

export const AppNavigator: React.FC = () => {
  const dispatch = useDispatch();
  const isNewUser = useSelector((state: IRootState) => state.authDataReducer.isNewUser);
  const [user, setUser] = useState();
  const [initializing, setInitializing] = useState(true);

  function onAuthStateChanged(authData) {
    setUser(authData);
    if (initializing) {
      setInitializing(false);
    }

    const data: IUser[] = [];
    const location = {
      city: '',
      country: '',
    };
    if (!user) {
      return;
    }
    firestore()
      .collection('users')
      .where('user_id', '==', `${user.uid}`)
      .get()
      .then(response => {
        response.forEach((doc: any) => {
          data.push({ ...doc.data(), _id: doc.id });
        });
      })
      .then(() => {
        location.city = data[0].location.city;
        location.country = data[0].location.country;
        dispatch(
          setAllUserData(
            data[0].user_id,
            data[0]._id,
            data[0].user_name,
            data[0].first_name,
            data[0].last_name,
            data[0].about_user,
            data[0].avatar_url,
            location,
          ),
        );
        console.log('User data fetched!');
      });
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  if (initializing) {
    return null;
  }

  if (!user || isNewUser) {
    return <AuthentificationNavigator />;
  }
  return <TabNavigator />;
};
