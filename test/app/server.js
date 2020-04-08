import server from './node_modules/@spalate/server'
import './tags'

import firebase from "~/plugins/firebase.js"
var db = firebase.firestore();
global.db = db;

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});