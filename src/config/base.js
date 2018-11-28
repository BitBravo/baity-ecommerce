// Firebase config file
import Rebase from 're-base';
import firebase from 'firebase';
import firestore from 'firebase/firestore'; // eslint-disable-line

// process.env.REACT_APP_FIREBASE_DATABASE
const config = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  databaseURL: 'https://baity-test.firebaseio.com/',
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
};

const app = firebase.initializeApp(config);
const database = app.database();// short for firebase.database(app)
const DBBase = Rebase.createClass(app.database());
const storage = app.storage();// short for firebase.storage(app)
const db = app.firestore();
const base = Rebase.createClass(app.firestore());
const storageKey = 'BAITY_KEY_FOR_LOCAL_STORAGE';

export { app, base, database, storage, db, DBBase, storageKey };
