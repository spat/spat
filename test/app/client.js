import client from '.spalate/modules/client'

import firebase from '~/plugins/firebase.js'
var db = firebase.firestore();
db.settings({
  cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED
});
// db.clearPersistence();
// db.enablePersistence();
db.enablePersistence({synchronizeTabs:true}); // マルチタブ対応版
// db.disableNetwork();
global.db = db;

import './styles/main.less'

client.start();

