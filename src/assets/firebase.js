import firebase from 'firebase/compat/app'
import 'firebase/compat/database';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBK0qIGfK9v3e6IryfWr2FLOUjUoOIVnxY",
    authDomain: "junhyeok-c5930.firebaseapp.com",
    databaseURL: "https://junhyeok-c5930-default-rtdb.firebaseio.com",
    projectId: "junhyeok-c5930",
    storageBucket: "junhyeok-c5930.appspot.com",
    messagingSenderId: "412684647867",
    appId: "1:412684647867:web:221f97b5e4b7bd3ec0189e",
    measurementId: "G-SFZ84SL69X"
  };

const oDB = firebaseConfig.database()
export const productDB = oDB.ref('products')
export const cartDB = oDB.ref('carts')
export const memberDB = oDB.ref('members')

export const oStorage = firebaseConfig.storage();