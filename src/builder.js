/*
 * ビルダー
 */

const fs = require('fs-extra');

// 実行パス直下の .spalate
var SPALATE_OUTPUT_DIR = `${process.cwd()}/.spalate`;
var SPALATE_APP_DIR = `${process.cwd()}/app`;

var options = {
  target: 'node',
  outDir: `${SPALATE_OUTPUT_DIR}`,
  outFile: 'modules.cjs',
  bundleNodeModules: false,
  hmr: false,
  global: 'spalate',
  cache: false,
  sourceMaps: false,  
  watch: true,
};

module.exports = {
  build() {

  },

  bundle() {

  },

  copy() {
    // app 内の .spalate を削除してコピーし直す
    var output = `${SPALATE_APP_DIR}/.spalate/modules`;
    fs.removeSync(output);
    fs.copySync(`${__dirname}`, output);  
  },

  clean() {
    // app 内の .spalate を削除してコピーし直す
    var output = `${SPALATE_APP_DIR}/.spalate/modules`;
    fs.removeSync(output);
  },
};
