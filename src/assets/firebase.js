import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/storage";

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyDrX4-ok49Iq3keId02eHwny0aW81Hvz-s",
  authDomain: "kuwazawa-8e440.firebaseapp.com",
  databaseURL: "https://kuwazawa-8e440-default-rtdb.firebaseio.com",
  projectId: "kuwazawa-8e440",
  storageBucket: "kuwazawa-8e440.appspot.com",
  messagingSenderId: "746739462010",
  appId: "1:746739462010:web:c378a6853b7cfe767e30c3",
  measurementId: "G-H1DQNGCPC2"
});

const kuwazawaDB = firebaseConfig.database();
export const kuwazawa_productDB = kuwazawaDB.ref("kuwazawa_products");
export const kuwazawa_cartDB = kuwazawaDB.ref("kuwazawa_carts");
export const kuwazawa_memberDB = kuwazawaDB.ref("kuwazawa_members");

export const oStorage = firebaseConfig.storage();
