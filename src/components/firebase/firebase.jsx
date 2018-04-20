import firebase from 'firebase';
import 'firebase/firestore';
import Rebase from 're-base';

const firebaseConfig = JSON.parse(process.env.REACT_APP_FIREBASE);

let app = ''

if (!firebase.apps.length) {
    app = firebase.initializeApp(firebaseConfig);
}

export const db = firebase.firestore(app);

export const auth = firebase.auth(); //Authentication

export const base = Rebase.createClass(app.firestore()); //Rebase for Firestore

export const storage = firebase.storage();

export const storageRef = firebase.storage().ref();

// export const db = firebase.database();