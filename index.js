const builder = require('./src/builder');


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
  
    var bundler = builder.bundle('node');
    await bundler.bundle();
  
    // 全てまとめたファイルを実行
    var SPALATE_OUTPUT_DIR = `${process.cwd()}/.spalate`;
    require(`${SPALATE_OUTPUT_DIR}/modules.cjs`);
  }
  else if (command === 'dev') {
    builder.copy();
  
    var bundler = builder.bundle('node');
    await bundler.bundle();
  
    // 全てまとめたファイルを実行
    var SPALATE_OUTPUT_DIR = `${process.cwd()}/.spalate`;
    require(`${SPALATE_OUTPUT_DIR}/modules.cjs`);
  }
  

};


main();