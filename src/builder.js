/*
 * ビルダー
 */

const fs = require('fs-extra');
const path = require('path');
const Bundler = require('parcel-bundler');

// 実行パス直下の .spalate
var SPALATE_OUTPUT_DIR = `${process.cwd()}/.spalate`;
var SPALATE_APP_DIR = `${process.cwd()}/app`;

module.exports = {
  build() {

  },

  bundle(target) {
    if (target === 'node') {
      var entry = path.join(process.cwd(), 'app/server.js');
      config = {
        target: 'node',
        bundleNodeModules: false,
        outDir: `${SPALATE_OUTPUT_DIR}`,
        outFile: 'modules.cjs',
        hmr: false,
        global: 'spalate',
        cache: false,
        sourceMaps: false,
        watch: true,
      };
    }
    else {
      var entry = path.join(process.cwd(), 'app/client.js');
      config = {
        target: 'browser',
        bundleNodeModules: true,
        outDir: `${SPALATE_OUTPUT_DIR}/static`,
        outFile: 'modules.js',
        hmr: process.env.NODE_ENV !== 'production',
        // 名前がバッティングするので off に
        // global: 'spalate',
        sourceMaps: true,
        cache: true,
      };
    }
  
    var bundler = new Bundler(entry, config);

    return bundler;
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

  // TODO: 失敗したらわかるように全ページレンダリングしてエラーでないかのテスト機構作る？
  test() {

  },
};
