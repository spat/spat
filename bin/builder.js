/*
 * ビルダー
 */

const fs = require('fs-extra');
const path = require('path');
const config = require(`${process.cwd()}/spat.config.js`);
const Bundler = require('parcel-bundler');

// 実行パス直下の .spat
var PARCEL_CACHE_DIR = `${process.cwd()}/.cache`;
var SPAT_OUTPUT_DIR = `${process.cwd()}/.spat`;
var SPAT_APP_OUTPUT_DIR = `${process.cwd()}/app/.spat`;

module.exports = {
  build() {

  },

  bundle(target, opts) {
    var options;

    if (target === 'node') {
      var entry = path.join(process.cwd(), 'app/server.js');
      options = {
        target: 'node',
        bundleNodeModules: false,
        outDir: `${SPAT_OUTPUT_DIR}`,
        outFile: 'modules.cjs',
        hmr: false,
        global: 'spat',
        sourceMaps: true,
        publicUrl: './',
        cache: true,
        watch: true,
      };
    }
    else {
      var entry = path.join(process.cwd(), 'app/client.js');
      options = {
        target: 'browser',
        bundleNodeModules: true,
        outDir: `${SPAT_OUTPUT_DIR}/static`,
        outFile: 'modules.js',
        hmr: true,
        // 名前がバッティングするので off に
        // global: 'spat',
        minify: process.env.NODE_ENV === 'production',
        sourceMaps: true,
        publicUrl: './',
        cache: true,
      };
    }

    Object.assign(options, opts);
  
    var bundler = new Bundler(entry, options);

    return bundler;
  },

  copy() {
    // 削除
    fs.removeSync(SPAT_APP_OUTPUT_DIR);

    // app 内の .spat を削除してコピーし直す
    var output = `${SPAT_APP_OUTPUT_DIR}/modules`;
    fs.removeSync(output);
    fs.copySync(path.join(__dirname, `../src`), output);  

    // client 甩にプラグイン読み込みのスクリプトを生成
    var plugins = config.plugins || [];
    var imports = config.plugins.map(item => {
      if (item.global) {
        return `import ${item.global} from '${item.src}';\nglobal['${item.global}'] = ${item.global}`;
      }
      else {
        return `import '${item.src}';`;
      }
    }).join('\n\n');
    var code = `${imports}
`;
    fs.writeFileSync(path.join(output, 'plugins.js'), code);
  },

  clean() {
    // app 内の .spat を削除してコピーし直す
    fs.removeSync(PARCEL_CACHE_DIR);
    fs.removeSync(SPAT_OUTPUT_DIR);
    fs.removeSync(SPAT_APP_OUTPUT_DIR);
  },

  // TODO: 失敗したらわかるように全ページレンダリングしてエラーでないかのテスト機構作る？
  test() {

  },
};
