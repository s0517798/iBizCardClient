import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/firebase-functions';

var firebaseConfig = {
  apiKey: "AIzaSyD7Qxm_iZPh-E0Ty0ojl6q2ICm0BYLDIao",
  authDomain: "ibizcard.firebaseapp.com",
  databaseURL: "https://ibizcard.firebaseio.com",
  projectId: "ibizcard",
  storageBucket: "ibizcard.appspot.com",
  messagingSenderId: "287398807341",
  appId: "1:287398807341:web:e06f033fc9440791f1b5a4",
  measurementId: "G-QTESGEW610"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()
const db = firebase.firestore()
const storage = firebase.storage()
const functions = firebase.functions()

  export {
    auth,
    db,
    storage, 
    functions,
    firebase as default
  }