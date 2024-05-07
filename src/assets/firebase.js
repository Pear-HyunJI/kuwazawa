import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/storage";

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyD7jmy_j4jjBxftLeRAlYMSJNwT3n9och8",
  authDomain: "starship-42d0b.firebaseapp.com",
  databaseURL: "https://starship-42d0b-default-rtdb.firebaseio.com",
  projectId: "starship-42d0b",
  storageBucket: "starship-42d0b.appspot.com",
  messagingSenderId: "578506708894",
  appId: "1:578506708894:web:ffbfd39632dae08d1f288f",
});

const kuwazawaDB = firebaseConfig.database();
export const kuwazawa_productDB = kuwazawaDB.ref("kuwazawa_products");
export const kuwazawa_cartDB = kuwazawaDB.ref("kuwazawa_carts");
export const kuwazawa_memberDB = kuwazawaDB.ref("kuwazawa_members");
export const kuwazawa_noticeDB = kuwazawaDB.ref("kuwazawa_notice");
export const kuwazawa_reviewDB = kuwazawaDB.ref("kuwazawa_review");

export const oStorage = firebaseConfig.storage();
