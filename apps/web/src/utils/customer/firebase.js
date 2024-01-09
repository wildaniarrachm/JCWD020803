import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDZpe9akiKczQEyTW2yAi7O-Tm2gG9UKDQ',
  authDomain: 'ez-mart-656b1.firebaseapp.com',
  projectId: 'ez-mart-656b1',
  storageBucket: 'ez-mart-656b1.appspot.com',
  messagingSenderId: '1026309124935',
  appId: '1:1026309124935:web:330c7dd6ff7a326634d262',
  measurementId: 'G-SM27PPNYF3',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
