  import firebase from 'firebase/app'
  import 'firebase/firestore'
  
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDSuhY5yk3UKd1-4wRZbKopyMPX3I15uyQ",
    authDomain: "mk-website-b4dd2.firebaseapp.com",
    databaseURL: "https://mk-website-b4dd2.firebaseio.com",
    projectId: "mk-website-b4dd2",
    storageBucket: "mk-website-b4dd2.appspot.com",
    messagingSenderId: "953867849264",
    appId: "1:953867849264:web:d34bc166329532c3"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  export default db;