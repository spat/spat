
// spat は global とする
import common from './common.js'

var spat = {};
Object.assign(spat, common);

global.spat = spat;

// ここからはサーバー固有の処理

const path = require('path');
const express = require('express');
const Bundler = require('parcel-bundler');

// config
const config = require('./config');
// client 側の config を spat.config とする
spat.config = config.client;
spat.plugins = config.plugins;

// plugins を展開
require('./plugins');


var spat_OUTPUT_DIR = `${process.cwd()}/.spat`;


// setup node express
const app = express();
spat.app = app;

// setup static
app.use('/spat', express.static(`${spat_OUTPUT_DIR}/static`));
app.use(express.static(`${process.cwd()}/static`));

// setup pug
app.set('views', path.join(process.cwd(), 'app/views'));
app.set('view engine', 'pug');

// setup useragent
app.use(useragent.express());

// setup parcel
// global に bundler があるときのみ登録する
if (global.bundler) {
  app.use(global.bundler.middleware());
}

// riot build
import Ssriot from './ssriot.js'

var riot = require('riot');
var sdom = require('riot/lib/server/sdom.js');
riot.util.tmpl.errorHandler = function() {};

// setup routing
import URL from 'url'
import routes from '~/scripts/routes.js'
  
app.use((req, res, next) => {
  req.Url = URL.parse(req.url, true);
  next();
});

app.setup = function() {
  Object.keys(routes).forEach(key => {
  
    if (config.server.cache) {
      // キャッシュチェック
      app.get(key, async (req, res, next) => {
        // レンダリング済みだったらそっちを使う
        var cache = app.getCache(req.Url.pathname + (req.Url.search||''));
        if (cache) {
          res.send(cache);
        }
        else {
          next();
        }
      });
    }
  
  
    // 実際のレンダリング
    app.get(key, async (req, res, next) => {
      var route = routes[key];
  
      var ssr = new Ssriot();
      await ssr.render({
        req,
        res,
        route,
        isSsr: (route.ssr !== undefined) ? route.ssr : config.server.ssr
      });
  
      // リダイレクト時は何もしない
      if (res.statusCode === 301 || res.statusCode === 302) {
        return ;
      }
  
      // 描画
      res.render('index', {
        req,
        res,
        config: config,
        head: ssr.tag.navTag.getHead(),
        content: ssr.tagContent,
        spat: ssr,
        // methods: {
        //   head: ssr.head,
        // },
  
        pretty: true,
      }, (err, content) => {
        if (err) {
          res.send(err.toString());
        }
        else {
          if (config.server.cache) {
            app.setCache(req.Url.pathname + (req.Url.search||''), content);
          }
          res.send(content);
        }

        ssr.unmount();
      });
    });
    
  });
  
  // 404 対応
  app.use(async (req, res, next) => {
    console.error(`404: ${req.url}`);
  
    res.status(404);
  
    var ssr = new Ssriot();
    var route = {
      tag: 'page-error',
    };
    await ssr.render({
      req,
      res,
      route,
      isSsr: (route.ssr !== undefined) ? route.ssr : config.server.ssr
    });
  
    // 描画
    res.render('index', {
      config: config,
      head: ssr.tag.navTag.getHead(),
      content: ssr.tagContent,
      spat: ssr,
      pretty: true,
    });

    ssr.unmount();
  });
};

// キャッシュまわりセットアップ

app.caches = {};

app.setCache = (key, value) => {
  console.log(key);
  app.caches[key] = value;
};

app.getCache = (key) => {
  return app.caches[key];
};

app.clearCache = (key) => {
  delete app.caches[key];
};

// スタート
app.start = function() {
  this.setup();

  // Start the server
  const PORT = process.env.PORT || 3000;
  this.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
  });
};

export default app;


