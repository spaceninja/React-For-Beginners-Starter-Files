import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDJGgKopCku6nzhBXjT9e1IE1cPDquO6WA",
  authDomain: "catch-of-the-day-svandehey.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-svandehey.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

// this is a named export
export { firebaseApp };

// this is a default export
export default base;
