const builder = require('./src/builder');

var SPALATE_OUTPUT_DIR = `${process.cwd()}/.spalate`;

// コピーする
if (!process.env.PORT) {
  builder.copy();
}

var main = async () => {
  if (!process.env.PORT) {
    var bundler = builder.bundle('node');
    await bundler.bundle();
  }

  // 全てまとめたファイルを実行
  require(`${SPALATE_OUTPUT_DIR}/modules.cjs`);
};


main();