import { IPostData } from './src/interfaces/IPostData';
import { IDBPlaces } from './src/interfaces/IDBPlaces';
import {
  IGetAuthorAvatar,
  IGetUserData,
  IGetUserPlaces,
  IGetUserSubscriptions,
} from './src/interfaces/IDBResponse';
import { ISubscribeUserDate } from './src/interfaces/IUserData';

interface IUser {
  [key: string]: string;
}

interface IPlace {
  [key: string]: string;
}

export default class StuffyGranny {
  DB: any;
  constructor(firestore: any, type = 'RN') {
    this.DB = type === 'RN' ? firestore() : firestore;
  }

  users = {
    getAllUsers: () => {
      return new Promise((resolve, reject) => {
        this.DB.collection('users')
          .get()
          .then((response: any) => {
            const data: IUser[] = [];
            response.forEach((doc: any) => {
              data.push({ ...doc.data(), _id: doc.id });
            });
            console.log('data fetched');
            return resolve({ ok: true, status: 200, data: data });
          })
          .catch((e: any) => {
            return reject({
              ok: false,
              status: 300,
              data: `Error while fetching all users ${e}`,
            });
          });
      });
    },

    getAuthorAvatar: (doc_id: string) => {
      return new Promise<IGetAuthorAvatar>((resolve, reject) => {
        this.DB.collection('users')
          .doc(doc_id)
          .get()
          .then((res: any) => {
            return resolve({ ok: true, status: 200, data: res._data.avatar_url });
          })
          .catch((e: any) => {
            return reject({
              ok: false,
              status: 300,
              data: `Error while fetching user avatar ${e}`,
            });
          });
      });
    },

    getUserData: (doc_id: string) => {
      return new Promise<IGetUserData>((resolve, reject) => {
        this.DB.collection('users')
          .doc(doc_id)
          .get()
          .then((res: any) => {
            return resolve({ ok: true, status: 200, data: res._data });
          })
          .catch((e: any) => {
            return reject({ ok: false, status: 300, data: `Error while fetching user data ${e}` });
          });
      });
    },
  };

  places = {
    deletePlace: (item_doc_id: string, my_doc_id: string) => {
      console.log('delete place');
      return new Promise((resolve, reject) => {
        this.DB.collection('users')
          .doc(my_doc_id)
          .collection('places')
          .doc(item_doc_id)
          .delete()
          .then(() => {
            const response = { ok: true, status: 202, data: 'Place was deleted!' };
            return resolve(response);
          })
          .catch((e: any) => {
            return reject({
              ok: false,
              status: 300,
              data: `Error while deleting place ${e}`,
            });
          });
      });
    },
    createPlace: (place: IPlace, my_doc_id: string) => {
      return new Promise((resolve, reject) => {
        this.DB.collection('users')
          .doc(my_doc_id)
          .collection('places')
          .add(place)
          .then(() => {
            const response = { ok: true, status: 201, data: 'Place was created!' };
            return resolve(response);
          })
          .catch((e: any) => {
            return reject({
              ok: false,
              status: 300,
              data: `Error while creating place ${e}`,
            });
          });
      });
    },

    getUserPlaces: (doc_id: string) => {
      return new Promise<IGetUserPlaces>((resolve, reject) => {
        this.DB.collection('users')
          .doc(doc_id)
          .collection('places')
          .get()
          .then((response: any) => {
            const data: IPostData[] = [];
            response.forEach((doc: any) => {
              data.push({ ...doc.data(), doc_id: doc.id });
            });
            return resolve({ ok: true, status: 200, data: data });
          })
          .catch((e: any) => {
            return reject({
              ok: false,
              status: 300,
              data: `Error while fetching user posts ${e}`,
            });
          });
      });
    },

    getMyPlaces: (my_doc_id: string) => {
      return new Promise<IPostData[]>((resolve, reject) => {
        this.DB.collectionGroup('places')
          .where('user_doc_id', '==', my_doc_id)
          .onSnapshot((snapshot: any) => {
            const changes = snapshot.docChanges();
            let data: any = [];
            changes.forEach((change: any) => {
              if (change.type === 'removed') {
                const idToRemove = change.doc.id;
                data = change.doc.data().filter((item: any) => item.id !== idToRemove);
              } else if (change.type === 'added') {
                data.push({ ...change.doc.data(), doc_id: change.doc.id });
              }
            });
            return resolve(data);
          })
          .catch((e: any) => {
            return reject({
              ok: false,
              status: 300,
              data: `Error while fetching my places ${e}`,
            });
          });
      });
    },

    getAllPlaces: () => {
      return new Promise<IDBPlaces>((resolve, reject) => {
        this.DB.collectionGroup('places')
          .get()
          .then((response: any) => {
            const data: IPostData[] = [];
            response.forEach((doc: any) => {
              data.push({ ...doc.data(), doc_id: doc.id });
            });
            console.log('data fetched');
            return resolve({ ok: true, status: 200, data: data });
          })
          .catch((e: any) => {
            return reject({
              ok: false,
              status: 300,
              data: `Error while fetching all places ${e}`,
            });
          });
      });
    },
  };

  subscriptions = {
    getMySubscriptions: (my_doc_id: string) => {
      return new Promise((resolve, reject) => {
        this.DB.collection('users')
          .doc(my_doc_id)
          .collection('subscriptions')
          .onSnapshot((snapshot: any) => {
            const changes = snapshot.docChanges();
            let data: any = [];
            changes.forEach((change: any) => {
              if (change.type === 'removed') {
                const idToRemove = change.doc.data().user_id;
                data = change.doc.data().filter((item: any) => item.id !== idToRemove);
              } else if (change.type === 'added') {
                data.push({ ...change.doc.data(), doc_id: change.doc.id });
              }
            });
            return resolve({ ok: true, status: 200, data: data });
          })
          .catch((e: any) => {
            return reject({
              ok: false,
              status: 300,
              data: `Error while fetching my subscriptions ${e}`,
            });
          });
      });
    },

    getUserSubscriptions: (doc_id: string) => {
      return new Promise<IGetUserSubscriptions>((resolve, reject) => {
        this.DB.collection('users')
          .doc(doc_id)
          .collection('subscriptions')
          .get()
          .then((response: any) => {
            const data: ISubscribeUserDate[] = [];
            response.forEach((doc: any) => {
              data.push({ ...doc.data(), doc_id: doc.id });
            });
            return resolve({ ok: true, status: 200, data: data });
          })
          .catch((e: any) => {
            return reject({
              ok: false,
              status: 300,
              data: `Error while fetching user subscriptions ${e}`,
            });
          });
      });
    },

    getMySubscribers: (my_doc_id: string) => {
      return new Promise((resolve, reject) => {
        this.DB.collection('users')
          .doc(my_doc_id)
          .collection('followers')
          .onSnapshot((snapshot: any) => {
            const changes = snapshot.docChanges();
            let data: any = [];
            changes.forEach((change: any) => {
              if (change.type === 'removed') {
                const idToRemove = change.doc.data().user_id;
                data = change.doc.data().filter((item: any) => item.id !== idToRemove);
              } else if (change.type === 'added') {
                data.push({ ...change.doc.data(), doc_id: change.doc.id });
              }
            });
            return resolve({ ok: true, status: 200, data: data });
          })
          .catch((e: any) => {
            return reject({
              ok: false,
              status: 300,
              data: `Error while fetching my subscribers ${e}`,
            });
          });
      });
    },

    getUserSubscribers: (doc_id: string) => {
      return new Promise<IGetUserSubscriptions>((resolve, reject) => {
        this.DB.collection('users')
          .doc(doc_id)
          .collection('followers')
          .get()
          .then((response: any) => {
            const data: any[] = [];
            response.forEach((doc: any) => {
              data.push({ ...doc.data(), doc_id: doc.id });
            });
            return resolve({ ok: true, status: 200, data: data });
          })
          .catch((e: any) => {
            return reject({
              ok: false,
              status: 300,
              data: `Error while fetching user followers ${e}`,
            });
          });
      });
    },

    subscribe: (user_doc_id: string, me: any) => {
      return new Promise((resolve, reject) => {
        this.DB.collection('users')
          .doc(user_doc_id)
          .collection('followers')
          .add(me)
          .then(() => {
            this.DB.collection('users')
              .doc(user_doc_id)
              .get()
              .then((res: any) => res.data())
              .then((data: any) => {
                if (data) {
                  this.DB.collection('users').doc(me._id).collection('subscriptions').add(data);
                }
              });
            return resolve({ ok: true, status: 200, data: 'Subscribed!' });
          })
          .catch((e: any) => {
            return reject({
              ok: false,
              status: 300,
              data: `Error while subscribing ${e}`,
            });
          });
      });
    },

    unsubscribe: (
      user_doc_id: string,
      my_doc_id: string,
      followersDocId: string,
      subscriptionsDocId: string,
    ) => {
      return new Promise((resolve, reject) => {
        subscriptionsDocId &&
          this.DB.collection('users')
            .doc(user_doc_id)
            .collection('followers')
            .doc(followersDocId)
            .delete()
            .then(() => {
              this.DB.collection('users')
                .doc(my_doc_id)
                .collection('subscriptions')
                .doc(subscriptionsDocId)
                .delete();
              return resolve({ ok: true, status: 204, data: 'Unsubscribed!' });
            })
            .catch((e: any) => {
              return reject({
                ok: false,
                status: 300,
                data: `Error while unsibscribing ${e}`,
              });
            });
      });
    },
  };
}
