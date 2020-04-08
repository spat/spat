import client from './node_modules/@spalate/client'
import './tags'

import './scripts/main.js'

import firebase from "~/plugins/firebase.js"
var db = firebase.firestore();
global.db = db;
