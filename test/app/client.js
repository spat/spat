import spalate from '.spalate/modules/client'

import firebase from '~/plugins/firebase.js'
var db = firebase.firestore();
db.settings({
  cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED
});
// db.clearPersistence();
db.enablePersistence();
// db.enablePersistence({experimentalTabSynchronization:true});
// db.disableNetwork();
global.db = db;

import './styles/main.less'

spalate.start();

