import firebase from 'firebase';
import 'firebase/firestore';

var firebaseConfig = {
    
};

// Initialize Firebase
let Firebase = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
console.log('Cloud Firestores Loaded');

export default Firebase;