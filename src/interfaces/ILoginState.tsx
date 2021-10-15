export interface ILoginState {
  isLoading: boolean;
  isSignout: boolean;
  userToken: null | string;
  error: null | string;
}
