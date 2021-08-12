import firebase from 'firebase';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyAX88EV8IqV551euyU6aSv9tAFwDjKzhmQ",
    authDomain: "tridib-f96e1.firebaseapp.com",
    databaseURL: "https://tridib-f96e1-default-rtdb.firebaseio.com",
    projectId: "tridib-f96e1",
    storageBucket: "tridib-f96e1.appspot.com",
    messagingSenderId: "882665180224",
    appId: "1:882665180224:web:04af09a7a5012a47e1a3a5",
    measurementId: "G-Y0HWN5RYT3"
};

// Initialize Firebase
let Firebase = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
console.log('Cloud Firestores Loaded');

export default Firebase;