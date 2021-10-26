export type LoginAction =
  | { type: 'SET_UNIQUE_USER_ID'; payload: string }
  | { type: 'SET_UNIQUE_USER_ID_DB_FIELD'; payload: string }
  | { type: 'SET_USER_AVATAR'; payload: string };

export function setUniqueUserId(user_id: string): LoginAction {
  return {
    type: 'SET_UNIQUE_USER_ID',
    payload: user_id,
  };
}

export function setUserAvatar(avatar_url: string): LoginAction {
  return {
    type: 'SET_USER_AVATAR',
    payload: avatar_url,
  };
}

// export function userPasswordChangeInput(password: string): LoginAction {
//   return {
//     type: 'USER_PASSWORD_INPUT_CHANGE',
//     payload: password,
//   };
// }
