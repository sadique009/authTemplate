import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore/lite';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// const firebaseConfig = {
//   apiKey: 'AIzaSyDbLPtDOXUYd547AS-ypRsV2bkSRHk74FI',
//   authDomain: 'login-ashish.firebaseapp.com',
//   projectId: 'login-ashish',
//   storageBucket: 'login-ashish.appspot.com',
//   messagingSenderId: '377316602305',
//   appId: '1:377316602305:web:c4cc3a2b1f37e495e63f40',
//   measurementId: 'G-KZNM3Y8BYP',
// };

const firebaseConfig = {
  apiKey: 'AIzaSyCiUD4pHkSJBKy18by0BkIqWozeW0YooeY',
  authDomain: 'auth-template-34fc3.firebaseapp.com',
  projectId: 'auth-template-34fc3',
  storageBucket: 'auth-template-34fc3.appspot.com',
  messagingSenderId: '583717303450',
  appId: '1:583717303450:web:28abc35bfcaf6193625b23',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export {firebase};
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
export const db = getFirestore(app);
