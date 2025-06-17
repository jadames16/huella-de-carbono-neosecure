// Configuración de Firebase (usa tus propios valores)
const firebaseConfig = {
    apiKey: "AIzaSyDHgKJXxQf6B3aQrHOcnFqdM3UkXiuF4RA",
    authDomain: "huella-de-carbono-neo.firebaseapp.com",
    projectId: "huella-de-carbono-neo",
    storageBucket: "huella-de-carbono-neo.firebasestorage.app",
    messagingSenderId: "145000733830",
    appId: "1:145000733830:web:ef8695d898f97024c44507",
    measurementId: "G-ZMSHCN03M0"
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
