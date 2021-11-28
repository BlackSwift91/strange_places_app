import { IPostData } from './src/interfaces/IPostData';
import { IDBPlaces } from './src/interfaces/IDBPlaces';
import { IDBUsers } from './src/interfaces/IDBUsers';

interface IUser {
  [key: string]: string;
}

interface IPlace {
  [key: string]: string;
}

interface IUserData {
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

export default class StuffyGranny {
  DB: any;
  constructor(firestore, type = 'RN') {
    this.DB = type === 'RN' ? firestore() : firestore;
  }

  users = {
    getAllUsers: () => {
      return new Promise((resolve, reject) => {
        this.DB.collection('users')
          .get()
          .then(response => {
            const data: IUser[] = [];
            response.forEach((doc: any) => {
              data.push({ ...doc.data(), _id: doc.id });
            });

            return resolve({ ok: true, status: 200, data: data });
          });
      });
    },
    getUserData: (user_doc_id: string) => {
      return new Promise<IDBUsers>((resolve, reject) => {
        this.DB.collection('users')
          .where('user_id', '==', user_doc_id)
          .get()
          .then((response: any) => {
            const data: IUserData[] = [];
            response.forEach((doc: any) => {
              data.push({ ...doc.data(), _id: doc.id });
            });
            return resolve({ ok: true, status: 200, data: data });
          });
      });
    },
  };


  places = {
    deletePlace: (item_doc_id: string, my_doc_id: string) => {
      return new Promise((resolve, reject) => {
        this.DB.collection('users')
          .doc(my_doc_id)
          .collection('places')
          .doc(item_doc_id)
          .delete()
          .then(() => {
            const response = { ok: true, status: 202, data: `Place was deleted!` };
            return resolve(response);
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
          });
      });
    },
    getMyPlaces: (my_doc_id: string) => {
      return new Promise<IDBPlaces>((resolve, reject) => {
        this.DB.collectionGroup('places')
          .where('user_doc_id', '==', my_doc_id)
          .onSnapshot((snapshot => {
            const changes = snapshot.docChanges();
            let data: IPostData[] = [];
            changes.forEach(change => {
              if (change.type === 'removed') {
                const idToRemove = change.doc.id;
                data = change.doc.data().filter(item => item.id !== idToRemove);
              } else if (change.type === 'added') {
                data.push({ ...change.doc.data(), doc_id: change.doc.id });
              }
            });
            return resolve({ ok: true, status: 200, data: data });
          }))
      });
    },

    getAllPlaces: () => {
      return new Promise<IDBPlaces>((resolve, reject) => {
        this.DB.collectionGroup('places')
          .get()
          .then(response => {
            const data: IPostData[] = [];
            response.forEach((doc: any) => {
              data.push({ ...doc.data(), doc_id: doc.id });
            });
            return resolve({ ok: true, status: 200, data: data });
          });
      });
    },
  };

  subscriptions = {
    getMySubscriptions: (my_doc_id: string) => {
      return new Promise<IDBUsers>((resolve, reject) => {
        this.DB.collection('users')
          .doc(my_doc_id)
          .collection('subscriptions')
          .onSnapshot(snapshot => {
            const changes = snapshot.docChanges();
            let data: any = [];
            changes.forEach(change => {
              if (change.type === 'removed') {
                const idToRemove = change.doc.data().user_id;
                data = change.doc.data().filter(item => item.id !== idToRemove);
              } else if (change.type === 'added') {
                data.push({ ...change.doc.data(), doc_id: change.doc.id });
              }
            });
            return resolve({ ok: true, status: 200, data: data });
          });
      });
    },
    getMySubscribers: (my_doc_id: string) => {
      return new Promise<IDBUsers>((resolve, reject) => {
        this.DB.collection('users')
          .doc(my_doc_id)
          .collection('followers')
          .onSnapshot(snapshot => {
            const changes = snapshot.docChanges();
            let data: any = [];
            changes.forEach(change => {
              if (change.type === 'removed') {
                const idToRemove = change.doc.data().user_id;
                data = change.doc.data().filter(item => item.id !== idToRemove);
              } else if (change.type === 'added') {
                data.push({ ...change.doc.data(), doc_id: change.doc.id });
              }
            });
            return resolve({ ok: true, status: 200, data: data });
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
              .then((res) => res.data())
              .then((data: any) => {
                if (data) {
                  this.DB.collection('users').doc(me._id).collection('subscriptions').add(data);
                }
              });
            return resolve({ ok: true, status: 200, data: 'Subscribed!' });
          });
      });
    },
    unsubscribe: (user_doc_id: string, me: any, subscibeDocId: string, docToRemove: any) => {
      return new Promise((resolve, reject) => {
        docToRemove && this.DB.collection('users')
          .doc(user_doc_id)
          .collection('followers')
          .doc(subscibeDocId)
          .delete()
          .then(() => {
            this.DB.collection('users')
              .doc(me._id)
              .collection('subscriptions')
              .doc(docToRemove[0].doc_id)
              .delete();
            return resolve({ ok: true, status: 204, data: 'Unsubscribed!' });
          });
      });
    },
  };
}

// export { IPlace, IUser };
