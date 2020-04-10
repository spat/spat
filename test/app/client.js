import spalate from './node_modules/@spalate/client'

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


import routes from '~/scripts/routes.js'
global.routes = routes;


setTimeout(() => {
  spalate.start();
}, 1024);

