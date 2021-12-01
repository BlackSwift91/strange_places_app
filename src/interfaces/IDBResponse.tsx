import { IUserData, ISubscribeUserDate } from './IUserData';
import { IPostData } from './IPostData';

export interface IGetAuthorAvatar {
  ok: boolean;
  status: number;
  data: string;
}

export interface IGetUserData {
  ok: boolean;
  status: number;
  data: IUserData;
}

export interface IGetUserPlaces {
  ok: boolean;
  status: number;
  data: IPostData[];
}

export interface IGetUserSubscriptions {
  ok: boolean;
  status: number;
  data: ISubscribeUserDate[];
}
