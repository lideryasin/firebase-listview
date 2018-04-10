//const firebase = require('firebase')
//import { API_KEY } from 'react-native-dotenv'
import firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDOCuyWYV_qOzXjkYYTqIYoCTX4fA3u5Pk",
  authDomain: "deneme-e8424.firebaseapp.com",
  databaseURL: "https://deneme-e8424.firebaseio.com",
  projectId: "deneme-e8424",
  storageBucket: "deneme-e8424.appspot.com",
  messagingSenderId: "518705747661"
}

const firebaseApp = firebase.initializeApp(firebaseConfig)

export default firebaseApp;
