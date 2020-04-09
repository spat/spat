
// spalate は global とする
import spalate from './spalate.js'
global.spalate = spalate;


// ここからはサーバー固有の処理

const path = require('path');
const express = require('express');
const Bundler = require('parcel-bundler');
// config
const config = require('./config.js');

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
      cache: true,
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


// riot build
import Ssriot from './ssriot.js'

var riot = require('riot');
var sdom = require('riot/lib/server/sdom.js');
riot.util.tmpl.errorHandler = function() {};
riot.mixin({ _ssr: true });

// setup routing
import routes from '../../scripts/routes.js'

Object.keys(routes).forEach(key => {
  console.log(key);
  app.get(key, async (req, res) => {
    // var ss = await db.collection('groups').get();

    if (key === '/') {
      var route = routes[key];
    }
    else {
      var route = routes['/groups/:id'];
    }

    var ssr = new Ssriot(route.tag);
    await ssr.render({
      req, res
    });
  
    res.render('index', {
      content: ssr.content,
    });
  });
  
});


export default app;


