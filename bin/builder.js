/*
 * ビルダー
 */

const fs = require('fs-extra');
const path = require('path');
const Bundler = require('parcel-bundler');

// 実行パス直下の .spat
var SPAT_OUTPUT_DIR = `${process.cwd()}/.spat`;
var SPAT_APP_OUTPUT_DIR = `${process.cwd()}/app/.spat`;

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
        outDir: `${SPAT_OUTPUT_DIR}`,
        outFile: 'modules.cjs',
        hmr: false,
        global: 'spat',
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
        outDir: `${SPAT_OUTPUT_DIR}/static`,
        outFile: 'modules.js',
        hmr: true,
        // 名前がバッティングするので off に
        // global: 'spat',
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
    fs.removeSync(SPAT_APP_OUTPUT_DIR);

    // app 内の .spat を削除してコピーし直す
    var output = `${SPAT_APP_OUTPUT_DIR}/modules`;
    fs.removeSync(output);
    fs.copySync(path.join(__dirname, `../src`), output);  
  },

  clean() {
    // app 内の .spat を削除してコピーし直す
    fs.removeSync(SPAT_OUTPUT_DIR);
    fs.removeSync(SPAT_APP_OUTPUT_DIR);
  },

  // TODO: 失敗したらわかるように全ページレンダリングしてエラーでないかのテスト機構作る？
  test() {

  },
};
