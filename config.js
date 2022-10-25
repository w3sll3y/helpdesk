// firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCI56aZlIE8zjMqIzWvtmih79ZFT7EKrf0",
  authDomain: "helpdesk-90e51.firebaseapp.com",
  projectId: "helpdesk-90e51",
  storageBucket: "helpdesk-90e51.appspot.com",
  messagingSenderId: "898735093560",
  appId: "1:898735093560:web:98cb603c2e750cb581b3cd",
  measurementId: "G-2D42TMG13L"
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