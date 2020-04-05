import _ from 'underscore'
import riot from 'riot'
import './tags/*.tag'
import './tags/**/*.tag'

console.log('index.js: ユーザー定義のファイルが呼び出されたよ');

var isNode = (typeof process !== 'undefined' && process.versions != null && process.versions.node != null);
if (!isNode) {
  riot.mount('*');
}

// export default {
//   riot,
//   _,
// };

global.riot = riot;
global._ = _;
