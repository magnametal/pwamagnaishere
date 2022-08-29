import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyC7xJoh_DBsz99FVvXlwZjZWijdrqPFkYU",
    authDomain: "magnadk-4afdf.firebaseapp.com",
    projectId: "magnadk-4afdf",
    storageBucket: "magnadk-4afdf.appspot.com",
    messagingSenderId: "405682971723",
    appId: "1:405682971723:web:848bb0a79acd719aee59ce"
}
if (!firebase.apps.length) {
    firebase.initializeApp(config);
} else {
    firebase.app(); // if already initialized, use that one
}

export const db = firebase.firestore();
export const storage = firebase.storage().ref();

export function loginByEmail(username, password) {
    return new Promise((resolve, reject) => {
        firebase
          .auth()
          .signInWithEmailAndPassword(username, password)
          .then(() => resolve())
          .catch(error => reject(error));
      });
}
export function logout() {
    firebase.auth().signOut();
}
export const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider()
export const signInWithGoogle = () => {
  auth.signInWithPopup(googleProvider).then((res) => {
    // console.log(res.user)
  }).catch((error) => {
    console.log(error.message)
  })
}