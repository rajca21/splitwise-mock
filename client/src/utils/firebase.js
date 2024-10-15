import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE,
  authDomain: 'splitwise-iteh.firebaseapp.com',
  projectId: 'splitwise-iteh',
  storageBucket: 'splitwise-iteh.appspot.com',
  messagingSenderId: '103329415625',
  appId: '1:103329415625:web:484345d750f15fc470e818',
};

export const app = initializeApp(firebaseConfig);
