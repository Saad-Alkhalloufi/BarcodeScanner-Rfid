// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCo3G2We2mWJ6OM2aYuf9cnDt8HY8etqWQ",
  authDomain: "casaevents-f7b18.firebaseapp.com",
  projectId: "casaevents-f7b18",
  storageBucket: "casaevents-f7b18.appspot.com",
  messagingSenderId: "823029554029",
  appId: "1:823029554029:web:8384ebf86c886e52d31864",
  measurementId: "G-13PT7BVBE5"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
export {auth}