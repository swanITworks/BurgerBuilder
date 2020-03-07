import "firebase/auth";
import * as firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyDAzPILxgp5kGu9jmos0qjtLxuqAftYD_w",
    authDomain: "burger-builder-89c84.firebaseapp.com",
    databaseURL: "https://burger-builder-89c84.firebaseio.com",
    projectId: "burger-builder-89c84",
    storageBucket: "burger-builder-89c84.appspot.com",
    messagingSenderId: "874196500112",
    appId: "1:874196500112:web:9f7204b7f09d9103172215"
};

const firebaseInit = firebase.initializeApp(firebaseConfig);

export default firebaseInit;