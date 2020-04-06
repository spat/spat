const fs = require('fs');
const path = require('path');
const riot = require('riot');
const express = require('express');
const Bundler = require('parcel-bundler');
require(`${__dirname}/src/main.js`);

var SPALATE_OUTPUT_DIR = `${process.cwd()}/.spalate`;

var main = async () => {
  await bundleServerModules();
  require(`${SPALATE_OUTPUT_DIR}/modules.cjs`);

  const app = express();

  utils = {
    path: {
      // 今実行中のファイルディレクトリ(spalate の root)
      current: (p) => {
        return path.join(__dirname, p);
      },
    }
  };
  
  // setup static
  app.use(express.static(`${process.cwd()}/public`));
  app.use('/spalate', express.static(`${SPALATE_OUTPUT_DIR}/public`));
  
  // setup pug
  app.set('views', utils.path.current('views'));
  // app.set('views', path.join(process.cwd(), 'views'));
  
  app.set('view engine', 'pug');

  // setup parcel
  var bundler = createParcelBundler('browser');
  app.use(bundler.middleware());
  
  // setup routing
  app.get('/', async (req, res) => {
    res.render('index', {
    });
  });
  
  // Start the server
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
  });
};


var createParcelBundler = (target) => {
  var entry = path.join(process.cwd(), 'app/index.js');
  var config;

  if (target === 'node') {
    config = {
      target: 'node',
      bundleNodeModules: false,
      outDir: `${SPALATE_OUTPUT_DIR}`,
      outFile: 'modules.cjs',
      hmr: false,
      global: 'spalate',
      cache: false,
      sourceMaps: false,  
    };
  }
  else {
    config = {
      target: 'browser',
      bundleNodeModules: true,
      outDir: `${SPALATE_OUTPUT_DIR}/public`,
      outFile: 'modules.js',
      hmr: process.env.NODE_ENV !== 'production',
      global: 'spalate',
      cache: false,  
    };
  }

  var bundler = new Bundler(entry, config);

  return bundler;
};


var bundleServerModules = async () => {
  var bundler = createParcelBundler('node');
  await bundler.bundle();
};


main();