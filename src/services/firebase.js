import firebase from "firebase";

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyCNXfZ83CCUOlJ3aRQNxVL9CBVZjWKfzHM",
  authDomain: "instagram-clone-1c042.firebaseapp.com",
  databaseURL: "https://instagram-clone-1c042.firebaseio.com",
  projectId: "instagram-clone-1c042",
  storageBucket: "instagram-clone-1c042.appspot.com",
  messagingSenderId: "1090474667452",
  appId: "1:1090474667452:web:44328a47f67cd702e00fb9",
  measurementId: "G-E7YLYN9SR0",
});

const db = firebaseConfig.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
