import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBscB93QiM0hhWTaOoA0dtYlzmfFYTlRzY",
  authDomain: "vue-a1b6e.firebaseapp.com",
  projectId: "vue-a1b6e",
  storageBucket: "vue-a1b6e.appspot.com",
  messagingSenderId: "615113161510",
  appId: "1:615113161510:web:2bf03ad97a4b53bbde9fe7",
  measurementId: "G-217R7KBCV2"
};
  firebase.initializeApp(firebaseConfig);
  let db=firebase.firestore();
  let auth =firebase.auth();
  let storage =firebase.storage();

  db.enablePersistence().catch((error) => {
    console.log(`Firebase persistence error ${error.code}`)
  });

  let usersCollection = db.collection('users');
  let songsCollection = db.collection("songs");
  let commentsCollection = db.collection('comments');
  // let timestamp=firebase.firestore.FieldValue.serverTimestamp;

  export {db,auth,usersCollection,storage,songsCollection,commentsCollection};


