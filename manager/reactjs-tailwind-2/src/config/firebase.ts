import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBa8ij5fOw6bz2LL4ZEylbsqXVWOoSAbic",
  authDomain: "ktv-app-karaoke.firebaseapp.com",
  databaseURL: "https://ktv-app-karaoke.firebaseio.com",
  projectId: "ktv-app-karaoke",
  storageBucket: "ktv-app-karaoke.appspot.com",
  messagingSenderId: "565371217997",
  appId: "1:565371217997:web:8afa84df543c1d0f5dd404",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
