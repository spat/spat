import _ from 'underscore'
import './tags/*.tag'
import './tags/**/*.tag'
import firerest from 'firerest'

import { isBrowser, isNode } from 'browser-or-node';
global.isBrowser = isBrowser;
global.isNode = isNode;
console.log('isNode', isNode);
console.log('isBrowser', isBrowser);

import './scripts/main.js'

// export default {
//   _,
// };

global._ = _;
