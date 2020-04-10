/*
 * client, server
 */

import { isBrowser, isNode } from 'browser-or-node'

console.log('isNode', isNode);
console.log('isBrowser', isBrowser);

import '../../tags/*.pug'
import '../../tags/**/*.pug'

export default {
  isNode,
  isBrowser,
};
