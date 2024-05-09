import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/storage";

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyBSWtXSeRuoQTShVgTsaodPJ6_vKCpcZKY",
  authDomain: "kuwazawa-e021c.firebaseapp.com",
  databaseURL: "https://kuwazawa-e021c-default-rtdb.firebaseio.com",
  projectId: "kuwazawa-e021c",
  storageBucket: "kuwazawa-e021c.appspot.com",
  messagingSenderId: "130600085976",
  appId: "1:130600085976:web:0e480884d4cedaac98aaad",
  measurementId: "G-XF6TMH3EC9",
});

const kuwazawaDB = firebaseConfig.database();
export const kuwazawa_productDB = kuwazawaDB.ref("kuwazawa_products");
export const kuwazawa_cartDB = kuwazawaDB.ref("kuwazawa_carts");
export const kuwazawa_memberDB = kuwazawaDB.ref("kuwazawa_members");
export const kuwazawa_noticeDB = kuwazawaDB.ref("kuwazawa_notice");
export const kuwazawa_reviewDB = kuwazawaDB.ref("kuwazawa_review");

export const oStorage = firebaseConfig.storage();
