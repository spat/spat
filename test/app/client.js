import spalate from './node_modules/@spalate/client'

import firebase from "~/plugins/firebase.js"
var db = firebase.firestore();
global.db = db;


spalate.start();

// import './scripts/main.js'import spalate from '../../src/spalate';

