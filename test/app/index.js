import './tags/*.pug'
import './tags/**/*.pug'
import firerest from 'firerest'

// グローバル化
import _ from 'underscore'
import riot from 'riot'

global._ = _;
global.riot = riot;

import { isBrowser, isNode } from 'browser-or-node';
global.isBrowser = isBrowser;
global.isNode = isNode;
console.log('isNode', isNode);
console.log('isBrowser', isBrowser);

import './scripts/main.js'

// export default {
//   _,
// };

