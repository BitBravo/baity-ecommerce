//Firebase config file
import Rebase from 're-base'
import firebase from 'firebase'
import firestore from 'firebase/firestore'

//process.env.REACT_APP_FIREBASE_DATABASE
const config = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  databaseURL: "https://bayty-246cc.firebaseio.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID
}
console.log(process.env.REACT_APP_FIREBASE_DATABASE)
const app = firebase.initializeApp(config)
const database = app.database()// short for firebase.database(app)
const base2 = Rebase.createClass(app.database())
const storage = app.storage()//short for firebase.storage(app)
const db = app.firestore()
const base = Rebase.createClass(app.firestore());


export { app, base, database, storage, db }
