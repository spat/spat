/*
 * client, server
 */

import { isBrowser, isNode } from 'browser-or-node'

console.log('isNode', isNode);
console.log('isBrowser', isBrowser);

import '../../tags/*.pug'
import '../../tags/**/*.pug'

// riot はグローバルで使えるようにする
import riot from 'riot';
global.riot = riot;

export default {
  isNode,
  isBrowser,
};
