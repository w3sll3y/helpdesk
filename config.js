// firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB1GPA3gyJJB4xtJF7PbRD8GfMdgf4GPy0",
  authDomain: "helpdesk-v2-50cf1.firebaseapp.com",
  projectId: "helpdesk-v2-50cf1",
  storageBucket: "helpdesk-v2-50cf1.appspot.com",
  messagingSenderId: "438676241244",
  appId: "1:438676241244:web:e37df89e46f4f6623e9f99",
  measurementId: "G-FSJEHTRCX2"
}

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };