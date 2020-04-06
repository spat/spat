const fs = require('fs');
const path = require('path');
const riot = require('riot');
const express = require('express');
const Bundler = require('parcel-bundler');
require(`${__dirname}/src/main.js`);

var main = async () => {
  await bundleServerModules();
  require(`${process.cwd()}/app/spalate/modules.cjs`);

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
  app.use('/spalate', express.static(`${process.cwd()}/app/spalate/public`));
  
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
  var baseDir = 'app/spalate';
  var entry = path.join(process.cwd(), 'app/index.js');
  var config;

  if (target === 'node') {
    config = {
      target: 'node',
      bundleNodeModules: false,
      outDir: `${baseDir}`,
      outFile: 'modules.cjs',
      hmr: true,
      global: 'spalate',
      cache: false,
      sourceMaps: false,  
    };
  }
  else {
    config = {
      target: 'browser',
      bundleNodeModules: true,
      outDir: `${baseDir}/public`,
      outFile: 'modules.js',
      hmr: true,
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