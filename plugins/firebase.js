import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyALo-k3YXpFqEsyH50VGyDIUsAgwinhHC4",
    authDomain: "something-6e5f9.firebaseapp.com",
    databaseURL: "https://something-6e5f9.firebaseio.com",
    projectId: "something-6e5f9",
    storageBucket: "something-6e5f9.appspot.com",
    messagingSenderId: "1074537176625",
    appId: "1:1074537176625:web:4b7913a397087eaeec7f10"
};
// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;
export const db = firebase.firestore();
export const auth = firebase.auth();
export const storageRef = firebase.storage().ref();