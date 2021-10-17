export type LoginAction =
  | { type: 'USER_NAME_INPUT_CHANGE'; payload: string }
  | { type: 'USER_PASSWORD_INPUT_CHANGE'; payload: string };

export function userNameChangeInput(userName: string): LoginAction {
  return {
    type: 'USER_NAME_INPUT_CHANGE',
    payload: userName,
  };
}

export function userPasswordChangeInput(password: string): LoginAction {
  return {
    type: 'USER_PASSWORD_INPUT_CHANGE',
    payload: password,
  };
}
