import firebase from "firebase/app";

// const firebaseConfig = {
//   apiKey: "AIzaSyAW9JmiBuhpRe1xUOjJJPjDI86RgGh-QsY",
//   authDomain: "kingify.firebaseapp.com",
//   databaseURL: "https://kingify-default-rtdb.firebaseio.com",
//   projectId: "kingify",
//   storageBucket: "kingify.appspot.com",
//   messagingSenderId: "1022058068014",
//   appId: "1:1022058068014:web:29a378d9912e34939607bf",
//   measurementId: "G-0G48Q4PFJZ",
// };
const firebaseConfig = {
  apiKey: "AIzaSyBflF62IEtv2TgT5MDau-nJREsgi2gTLAE",
  authDomain: "kingify-330306.firebaseapp.com",
  projectId: "kingify-330306",
  storageBucket: "kingify-330306.appspot.com",
  messagingSenderId: "664891187531",
  appId: "1:664891187531:web:12465e2f82e0d787d788ce",
  measurementId: "G-5XV1FQ9BWS",
};
// Initialize Firebase

firebase.initializeApp(firebaseConfig);

export default firebase;
