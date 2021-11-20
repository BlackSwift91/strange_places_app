import { IPostData } from './IPostData';

export interface IDBPlaces {
  ok: boolean;
  status: number;
  data: IPostData[];
}
