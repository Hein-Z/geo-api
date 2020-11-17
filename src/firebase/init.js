import firebase from "firebase";
import firestore from "firebase/firestore";
import analytics from "firebase/analytics";



var firebaseConfig = {
  apiKey: "AIzaSyDqgLGLlHBSb-jIpJ_8SAWmjV9pA6YU3Ck",
  authDomain: "geo-app-696ab.firebaseapp.com",
  databaseURL: "https://geo-app-696ab.firebaseio.com",
  projectId: "geo-app-696ab",
  storageBucket: "geo-app-696ab.appspot.com",
  messagingSenderId: "757008814876",
  appId: "1:757008814876:web:16ee15f66e0de130efe0d9",
  measurementId: "G-DYJHR7DQE3"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
      firebaseApp.analytics();
      firebaseApp.firestore().settings({timestampsInSnapshots:true})
export default firebaseApp.firestore();
