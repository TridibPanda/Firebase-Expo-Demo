import firebase from 'firebase';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "apiKey",
    authDomain: "authDomain",
    databaseURL: "databaseURL",
    projectId: "projectId",
    storageBucket: "storageBucket",
    messagingSenderId: "messagingSenderId",
    appId: "appId",
    measurementId: "measurementId"
};

// Initialize Firebase
let Firebase = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
console.log('Cloud Firestores Loaded');

export default Firebase;