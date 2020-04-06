import _ from 'underscore'
import riot from 'riot'
import firerest from 'firerest'
import './tags/*.tag'
import './tags/**/*.tag'

console.log('index.js: ユーザー定義のファイルが呼び出されたよ');

import { isBrowser, isNode } from 'browser-or-node';

console.log('isNode', isNode);
console.log('isBrowser', isBrowser);

console.log('--------------------');

if (!isNode) {
  riot.mount('*');
}

// export default {
//   riot,
//   _,
// };

global.riot = riot;
global._ = _;



