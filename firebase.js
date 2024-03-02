const firebaseConfig = {
    apiKey: "AIzaSyD9vbGj1szjrmU2IsM0AOR3tSxsJGc0b6k",
    authDomain: "to-do-live-f27cf.firebaseapp.com",
    databaseURL: "https://to-do-live-f27cf-default-rtdb.firebaseio.com",
    projectId: "to-do-live-f27cf",
    storageBucket: "to-do-live-f27cf.appspot.com",
    messagingSenderId: "628737633081",
    appId: "1:628737633081:web:283b72395afed0ef8456e8",
    measurementId: "G-EB37X4RKMQ"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
var db = firebase.firestore();