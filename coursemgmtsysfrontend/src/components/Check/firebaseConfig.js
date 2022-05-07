// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_pd_xt8robTGEgWHvlDwa0r_00il-Yhk",
  authDomain: "coursematerial-78be2.firebaseapp.com",
  projectId: "coursematerial-78be2",
  storageBucket: "coursematerial-78be2.appspot.com",
  messagingSenderId: "806361967308",
  appId: "1:806361967308:web:c11f24d0180cc6e22bf069"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);