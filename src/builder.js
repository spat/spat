/*
 * ビルダー
 */

const fs = require('fs-extra');
const path = require('path');
const Bundler = require('parcel-bundler');

// 実行パス直下の .spalate
var SPALATE_OUTPUT_DIR = `${process.cwd()}/.spalate`;
var SPALATE_APP_OUTPUT_DIR = `${process.cwd()}/app/.spalate`;

module.exports = {
  build() {

  },

  bundle(target, opts) {
    var config;

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
        hmr: true,
        // 名前がバッティングするので off に
        // global: 'spalate',
        sourceMaps: true,
        publicUrl: './',
        cache: true,
      };
    }

    Object.assign(config, opts);
  
    var bundler = new Bundler(entry, config);

    return bundler;
  },

  copy() {
    // 削除
    fs.removeSync(SPALATE_APP_OUTPUT_DIR);

    // app 内の .spalate を削除してコピーし直す
    var output = `${SPALATE_APP_OUTPUT_DIR}/modules`;
    fs.removeSync(output);
    fs.copySync(`${__dirname}`, output);  
  },

  clean() {
    // app 内の .spalate を削除してコピーし直す
    fs.removeSync(SPALATE_OUTPUT_DIR);
    fs.removeSync(SPALATE_APP_OUTPUT_DIR);
  },

  // TODO: 失敗したらわかるように全ページレンダリングしてエラーでないかのテスト機構作る？
  test() {

  },
};
