// config
const path = require('path');
const express = require('express');
const Bundler = require('parcel-bundler');
const config = require('./config.js');

// spalate は global とする
import spalate from './spalate.js'
global.spalate = spalate;

var createParcelBundler = (target) => {
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
    };
  }
  else {
    var entry = path.join(process.cwd(), 'app/client.js');
    config = {
      target: 'browser',
      bundleNodeModules: true,
      outDir: `${SPALATE_OUTPUT_DIR}/public`,
      outFile: 'modules.js',
      hmr: process.env.NODE_ENV !== 'production',
      // 名前がバッティングするので off に
      // global: 'spalate',
      sourceMaps: true,
      cache: false,  
    };
  }

  var bundler = new Bundler(entry, config);

  return bundler;
};

var SPALATE_OUTPUT_DIR = `${process.cwd()}/.spalate`;


// setup node express
const app = express();

// setup static
app.use('/spalate', express.static(`${SPALATE_OUTPUT_DIR}/public`));
app.use(express.static(`${process.cwd()}/public`));

// setup pug
app.set('views', path.join(process.cwd(), 'views'));

app.set('view engine', 'pug');

// setup parcel
var bundler = createParcelBundler('browser');
app.use(bundler.middleware());

// setup routing
app.get('/', async (req, res) => {
  // var ss = await db.collection('groups').get();

  res.render('index', {
  });
});

export default app;


