//Firebase config file
import Rebase from 're-base'
import firebase from 'firebase'

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID
}

const app = firebase.initializeApp(config)
const database = app.database()// short for firebase.database(app)
const base = Rebase.createClass(app.database())
const storage = app.storage()//short for firebase.storage(app)

export { app, base, database, storage }