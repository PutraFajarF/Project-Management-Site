import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBp2BsztTKvg9aYZ8b1snt8xHNXCsw4kMs",
  authDomain: "thepromansite-73c3d.firebaseapp.com",
  projectId: "thepromansite-73c3d",
  storageBucket: "thepromansite-73c3d.appspot.com",
  messagingSenderId: "957630370747",
  appId: "1:957630370747:web:f1600c3a2f680cc2d9aa9e"
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init service
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();

// timestamp
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, projectStorage, timestamp };