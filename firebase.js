
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCPLtoJyTXQqCduyD_Qbs3EgY72PUzaK5o",
  authDomain: "assamese-corpora.firebaseapp.com",
  projectId: "assamese-corpora",
  storageBucket: "assamese-corpora.firebasestorage.app",
  messagingSenderId: "999400229736",
  appId: "1:999400229736:web:fe085617d207b4c6e324dd",
  measurementId: "G-2B37GFBLQ9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth, onAuthStateChanged, signOut };
