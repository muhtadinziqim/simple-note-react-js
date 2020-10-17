import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyARh5Tlq1nTwrm0yWUSNf9-d7Cmos_WLtM",
    authDomain: "simple-notes-firebase-e2eff.firebaseapp.com",
    databaseURL: "https://simple-notes-firebase-e2eff.firebaseio.com",
    projectId: "simple-notes-firebase-e2eff",
    storageBucket: "simple-notes-firebase-e2eff.appspot.com",
    messagingSenderId: "229022149618",
    appId: "1:229022149618:web:1952466d79d50e3270596b",
    measurementId: "G-DZ74DSR431"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const database = firebase.database();
// firebase.analytics();

export default firebase;