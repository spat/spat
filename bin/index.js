const builder = require('./builder');


var command = process.argv[2] || 'dev';


var main = async () => {

  console.log('command:', command);

  if (command === 'start') {
    // 全てまとめたファイルを実行
    var SPALATE_OUTPUT_DIR = `${process.cwd()}/.spalate`;
    require(`${SPALATE_OUTPUT_DIR}/modules.cjs`);
  }
  else if (command === 'build') {
    builder.copy();
  
    var bundler = builder.bundle('node', {
      hmr: false,
      watch: false,
    });
    await bundler.bundle();
    await bundler.stop();

    var bundler = builder.bundle('browser', {
      hmr: false,
      watch: false,
    });
    await bundler.bundle();
    await bundler.stop();
  }
  else if (command === 'dev') {
    builder.copy();
  
    var bundler = builder.bundle('node');
    await bundler.bundle();

    var bundler = builder.bundle('browser');

    // riot タグが更新されたら再読み込みする
    bundler.on('bundled', (bundle, a, b) => {
      // console.log(Object.keys(bundle));
      // console.log(bundle.parentBundle);

      bundle.assets.forEach(item => {
        // console.log(item.id);

        if (/[^*]+\.pug$/.test(item.id)) {
          // console.log(item.constructor);

          eval(item.generated.js);
        }
      });
    });

    const notifier = require('node-notifier');
    bundler.on('buildError', error => {
      // console.log(error);
      notifier.notify({
        'title': error.name,
        'message': error.fileName,

        // 'title': error.title,
        // 'message': error.message
      });
    });

    global.bundler = bundler;

  
    // 全てまとめたファイルを実行
    var SPALATE_OUTPUT_DIR = `${process.cwd()}/.spalate`;
    require(`${SPALATE_OUTPUT_DIR}/modules.cjs`);
  }
  else if (command === 'clean') {
    builder.clean();
  }
};


main();