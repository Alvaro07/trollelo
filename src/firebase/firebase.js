import firebase from "firebase/app";
import "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
import "firebase/functions";
import { firebaseData } from "./config";

// Initialize Firebase
export const firebaseConfig = {
  apiKey: firebaseData.apiKey,
  authDomain: firebaseData.authDomain,
  databaseURL: firebaseData.databaseURL,
  projectId: firebaseData.projectId,
  storageBucket: firebaseData.storageBucket,
  messagingSenderId: firebaseData.messagingSenderId
};

firebase.initializeApp(firebaseConfig);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const databaseRefUsers = firebase.database().ref("/users/");
export const storage = firebase.storage();
export const functions = firebase.functions();

export default firebase;