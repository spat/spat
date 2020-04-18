/*
 * client, server 共通の処理
 */

import { isBrowser, isNode } from 'browser-or-node'

// console.log('isNode', isNode);
// console.log('isBrowser', isBrowser);

var extendDeep = require('extend-deep');

import './tags/*.pug'
import '../../tags/*.pug'
import '../../tags/**/*.pug'

// riot はグローバルで使えるようにする
import riot from 'riot'
global.riot = riot;
// underscore はグローバルで使えるようにする
import _ from 'underscore'
global._ = _;


export default {
  isNode,
  isBrowser,
  utils: {
    extendDeep
  },
};
