import firebase from '@react-native-firebase/app';
const firebaseConfig = {
    apiKey: "AIzaSyCa16BlVHZhJZonJarcCicBa3l_S2yyAN0",
    projectId: "ukilvai-app",
    storageBucket: "ukilvai-app.appspot.com",
    databaseURL:"https://ukilvai-app-default-rtdb.firebaseio.com/",
    appId: "1:596818263102:android:6275dea8c7afca7843656f",
    messagingSenderId:"596818263102"
  }
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}