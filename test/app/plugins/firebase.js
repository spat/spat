import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyCiJjzLD4C5ueJ2wP3UVmdTa7BfiqnWu5Q",
  authDomain: "chat-rabee-jp.firebaseapp.com",
  databaseURL: "https://chat-rabee-jp.firebaseio.com",
  projectId: "chat-rabee-jp",
  storageBucket: "chat-rabee-jp.appspot.com",
  messagingSenderId: "50741122756"
};

firebase.initializeApp(config);

export default firebase;
