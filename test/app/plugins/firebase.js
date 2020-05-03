import firebase from 'firebase/app';
import 'firebase/firestore';

firebase.initializeApp(spat.config.firebase);

var db = firebase.firestore();

if (spat.isBrowser) {
  db.settings({
    cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED
  });
  // db.clearPersistence();
  // db.enablePersistence();
  db.enablePersistence({synchronizeTabs:true}); // マルチタブ対応版
  // db.disableNetwork();
}

global.db = db;

module.exports = firebase;
