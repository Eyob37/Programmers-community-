import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, fetchSignInMethodsForEmail } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxMSbx5OoHAav-st3h8DbCUZ9aZCcHnI8",
  authDomain: "programming-community-80d94.firebaseapp.com",
  projectId: "programming-community-80d94",
  storageBucket: "programming-community-80d94.firebasestorage.app",
  messagingSenderId: "103513211773",
  appId: "1:103513211773:web:cb90e77287f005b7870214",
  measurementId: "G-MMZD11XDNK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const themeToggle = document.getElementById('theme-toggle');

function setTheme(dark) {
    if (dark) {
        document.documentElement.classList.add('dark-mode');
        themeToggle.textContent = '☀️ White Mode';
    } else {
        document.documentElement.classList.remove('dark-mode');
        themeToggle.textContent = '🌙 Dark Mode';
    }
}
let dark = localStorage.getItem('theme') === 'dark';
setTheme(dark);
themeToggle.addEventListener('click', function() {
    dark = !dark;
    setTheme(dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
});
