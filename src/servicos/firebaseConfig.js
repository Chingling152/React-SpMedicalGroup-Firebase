import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyC1MpinvwKwLDT2KFZ-eCD47o7E92eW-2Q",
    authDomain: "sp-medical-group.firebaseapp.com",
    databaseURL: "https://sp-medical-group.firebaseio.com",
    projectId: "sp-medical-group",
    storageBucket: "sp-medical-group.appspot.com",
    messagingSenderId: "868761141701",
    appId: "1:868761141701:web:0f84e69e150ef8ac"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
