import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCrlCdALawFjKuYkaVbhE72aYqmdrPRs2Y",
    authDomain: "trello-2cb7b.firebaseapp.com",
    projectId: "trello-2cb7b",
    storageBucket: "trello-2cb7b.appspot.com",
    messagingSenderId: "274548651944",
    appId: "1:274548651944:web:fc47209b36c9a9c4b10f9d",
    measurementId: "G-D56FQV8RFY"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  export default firebase