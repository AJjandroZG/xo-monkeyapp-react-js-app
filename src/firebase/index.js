import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { firebaseConfig } from "./conection";
//iniciando firebase
firebase.initializeApp(firebaseConfig);
//instancias
export const auth = firebase.auth;
export const db = firebase.firestore;
//funcionalidades de firestore
export const firestoreFieldValue = db.FieldValue;
//funcionalidades de auth
export const firebaseAppAuth = (username, password) =>
  auth().signInWithEmailAndPassword(username, password);
export const firebaseAppCreateUser = (email, password) =>
  auth().createUserWithEmailAndPassword(email, password);
export const firebaseAuthToken = () => auth().currentUser.getIdToken(true);
export const firebaseAppSingOut = () => auth().signOut();
export const firebaseAppListener = (funct) => auth().onAuthStateChanged(funct);
export const firebaseResetPassword=(emailAddress)=> auth().sendPasswordResetEmail(emailAddress)
