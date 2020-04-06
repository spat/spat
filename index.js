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
      // 実行を開始したワーキングディレクトリ
      working: (p) => {
        return path.join(process.cwd(), p);
      },
    }
  };
  
  // setup static
  app.use(express.static(`${process.cwd()}/public`));
  app.use(express.static(`${process.cwd()}/app/spalate/public`));
  
  // setup pug
  app.set('views', utils.path.current('views'));
  // app.set('views', path.join(process.cwd(), 'views'));
  
  app.set('view engine', 'pug');
  
  var target = `${process.cwd()}/app/index.js`;
  const bundler = new Bundler(target, {
    target: 'browser',
    bundleNodeModules: true,
    outDir: 'app/spalate/public/',
    outFile: 'modules.js',
    hmr: true,
    global: 'spalate',
    cache: false,
  });
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



var bundleServerModules = async () => {
  var target = path.join(process.cwd(), 'app/index.js');
  // for node
  var moduleBundler = new Bundler(target, {
    target: 'node',
    bundleNodeModules: false,
    outDir: 'app/spalate/',
    outFile: 'modules.cjs',
    hmr: true,
    global: 'spalate',
    cache: false,
    sourceMaps: false,
  });
  await moduleBundler.bundle();
};


main();