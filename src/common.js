/*
 * client, server 共通の処理
 */

import { isBrowser, isNode } from 'browser-or-node'

// console.log('isNode', isNode);
// console.log('isBrowser', isBrowser);

var extendDeep = require('extend-deep');

// spat で定義しているタグ
import './tags/*.pug';
// サービス側
import '../../tags/*.pug';
import '../../tags/**/*.pug';

// riot はグローバルで使えるようにする
import riot from 'riot';
global.riot = riot;
// underscore はグローバルで使えるようにする
import _ from 'underscore';
global._ = _;

// 
import useragent from 'express-useragent';
global.useragent = useragent;

export default {
  isNode,
  isBrowser,
  utils: {
    extendDeep
  },
};
