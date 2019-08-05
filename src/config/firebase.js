import * as firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const database = firebase.firestore();
export const dbTimestamp = firebase.firestore.FieldValue.serverTimestamp();
export const dbIncrement = firebase.firestore.FieldValue.increment(1);
export const dbDecrement = firebase.firestore.FieldValue.increment(-1);
