import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAZdok32QfDCiA32ouzuJPgjNIFl7iWL8w",
    authDomain: "cooking-world-site.firebaseapp.com",
    projectId: "cooking-world-site",
    storageBucket: "cooking-world-site.appspot.com",
    messagingSenderId: "711455330954",
    appId: "1:711455330954:web:d03bc1527044e9feb79373"
  };

  // init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore = firebase.firestore()

export { projectFirestore }