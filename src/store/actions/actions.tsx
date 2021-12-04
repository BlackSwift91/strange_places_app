export type UserActions =
  | { type: 'SET_UNIQUE_USER_ID'; payload: string }
  | { type: 'SET_UNIQUE_USER_ID_DB_FIELD'; payload: string }
  | {
      type: 'SET_ALL_USER_DATA';
      payload: {
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
      };
    };

export type LocationActions =
  | {
      type: 'SET_USER_LOCATION';
      payload: {
        latitude: number;
        longitude: number;
      };
    }
  | {
      type: 'SET_IS_USER_POSITION_LOCATED';
      payload: {
        isUserPositionLocated: boolean;
      };
    }
  | {
      type: 'SET_MAP_DELTA';
      payload: {
        latitudeDelta: number;
        longitudeDelta: number;
      };
    };

export type LoginActions =
  | { type: 'IS_NEW_USER'; payload: boolean }
  | { type: 'TEST'; payload: string };

export type LanguageActions = { type: 'SET_LANGUAGE'; payload: string };

export function setAllUserData(
  user_id: string,
  _id: string,
  user_name: string,
  first_name: string,
  last_name: string,
  about_user: string,
  avatar_url: string,
  location: {
    city: string;
    country: string;
  },
): UserActions {
  return {
    type: 'SET_ALL_USER_DATA',
    payload: {
      _id,
      about_user,
      avatar_url,
      first_name,
      last_name,
      location,
      user_id,
      user_name,
    },
  };
}

export function setLanguage(language: string): LanguageActions {
  return {
    type: 'SET_LANGUAGE',
    payload: language,
  };
}

export function setIsNewUser(user_id: boolean): LoginActions {
  return {
    type: 'IS_NEW_USER',
    payload: user_id,
  };
}

export function setUserLocation(latitude: number, longitude: number): LocationActions {
  return {
    type: 'SET_USER_LOCATION',
    payload: {
      latitude,
      longitude,
    },
  };
}

export function setIsUserPositionLocated(isUserPositionLocated: boolean): LocationActions {
  return {
    type: 'SET_IS_USER_POSITION_LOCATED',
    payload: {
      isUserPositionLocated,
    },
  };
}

export function setMapDelta(latitudeDelta: number, longitudeDelta: number): LocationActions {
  return {
    type: 'SET_MAP_DELTA',
    payload: {
      latitudeDelta,
      longitudeDelta,
    },
  };
}

// export function userPasswordChangeInput(password: string): LoginAction {
//   return {
//     type: 'USER_PASSWORD_INPUT_CHANGE',
//     payload: password,
//   };
// }
