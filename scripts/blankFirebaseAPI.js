const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const rtdb = firebase.database();
