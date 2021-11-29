export interface IPostData {
  description: string;
  img: string;
  location: {
    _lat: number;
    _long: number;
  };
  user_doc_id: string;
  user_id: string;
  doc_id: string;
}
