export interface IUserData {
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

interface ISubscribeUserDate extends IUserData {
  doc_id: string;
}

export interface IDSubscribers {
  ok: boolean;
  status: number;
  data: ISubscribeUserDate[];
}
