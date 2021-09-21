
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

// 複数スラッシュを単一スラッシュに置換する
app.use((req, res, next) => {
  var pathname = req.Url.pathname;
  var normalizedPathname = pathname.replace(/\/\/+/g, '/');
  if (pathname !== normalizedPathname) {
    res.redirect(301, normalizedPathname + (req.Url.search || ''));
  }
  else {
    next();
  }
});

app.setup = function() {
  Object.keys(routes).forEach(key => {
    app.get(key, async (req, res, next) => {
      var route = routes[key];
      var cacheKey = route.cacheKey ? route.cacheKey({ route, req, res }) : req.Url.pathname;
      var cacheFlag = route.cache;
      if (typeof cacheFlag === 'function') {
        cacheFlag = cacheFlag({ route, req, res });
      }
      cacheFlag = config.server.cache && (cacheFlag !== false);
      if (!cacheFlag) {
        app.clearCache(cacheKey);
      }
      var revalidate = false;
      // キャッシュチェック
      if (cacheFlag) {
        // キャッシュがあればそっちを使う
        var cache = app.getCache(cacheKey);
        if (cache instanceof Promise) {
          try {
            cache = await cache;
          }
          catch (e) {
            res.status(500).send(e.toString());
          }
        }

        if (cache) {
          if (cache.error) {
            app.clearCache(cacheKey);
          }
          else {
            app.setCache(cacheKey, cache);
          }
          // リダイレクト
          if (cache.redirected) {
            // キャッシュを更新するかどうかチェック
            if (!cache.revalidated && Date.now() - cache.timestamp > route.revalidate * 1000) {
              cache.revalidated = true;
              revalidate = true;
            }
            else {
              res.redirect(cache.statusCode, cache.address);
            }
          }
          else {
            res.status(cache.statusCode).send(cache.content);
          }
          // キャッシュを更新するかどうかチェック
          if (!cache.revalidated && Date.now() - cache.timestamp > route.revalidate * 1000) {
            cache.revalidated = true;
            // キャッシュの中身だけ更新するフラグ
            revalidate = true;
          }
          // キャッシュ更新するフラグがない場合は return
          if (!revalidate) return;
        }
      }


      // 実際のレンダリング
      var promise = new Promise(async (resolve, reject) => {
        var ssr = new Ssriot();
        res.status(200);
        await ssr.render({
          req,
          res,
          route,
          isSsr: (route.ssr !== undefined) ? route.ssr : config.server.ssr
        });

        // リダイレクト時は何もせず次へ
        if (res.statusCode === 301 || res.statusCode === 302) {
          // unmount はしておく
          try {
            ssr.unmount();
          }
          catch (e) {
            console.error('--- redirect unmount error ---');
            console.error(e);
          }
          resolve({
            redirected: true,
            statusCode: res.statusCode,
            address: res.get('Location'),
            timestamp: Date.now(),
          });
          return;
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
            reject(err);
          }
          else {
            resolve({
              content,
              error: res.error,
              statusCode: res.statusCode,
              timestamp: Date.now(),
            });
          }
          try {
            ssr.unmount();
          }
          catch (e) {
            console.error('--- rendered unmount error ---');
            console.error(e);
          }
        });
      });

      // キャッシュする
      if (!revalidate && cacheFlag) {
        app.setCache(cacheKey, promise);
      }

      try {
        var result = await promise;
        // エラー時はキャッシュを削除
        if (res.error) {
          app.clearCache(cacheKey);
        }
        // キャッシュする
        else if (cacheFlag) {
          app.setCache(cacheKey, result);
        }
        // リダイレクトの時
        if (result.redirected) {
          // 何もしない
          return ;
        }
        if (!revalidate) {
          res.send(result.content);
        }
      }
      catch (e) {
        if (!revalidate) {
          res.status(500).send(e.toString());
        }
      }
    });
    
  });
  
  // 404 対応
  app.use(async (req, res, next) => {
    console.error(`404: ${req.url}`);
    var cacheKey = '404';
    // キャッシュがあればそっちを使う
    var cache = app.getCache(cacheKey);
    if (cache instanceof Promise) {
      try {
        cache = await cache;
      }
      catch (e) {
        res.status(500).send(e.toString());
      }
    }

    res.status(404);

    if (cache) {
      app.setCache(cacheKey, cache);
      res.send(cache.content);
    }
    else {
      res.error = new Error('404 not found');
      var promise = new Promise(async (resolve, reject) => {
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
          req,
          res,
          config: config,
          head: ssr.tag.navTag.getHead(),
          content: ssr.tagContent,
          spat: ssr,
          pretty: true,
        }, (err, content) => {
          if (err) {
            reject(err);
          }
          else {
            resolve({ content });
          }
          try {
            ssr.unmount();
          }
          catch (e) {
            console.error('--- rendered unmount error ---');
            console.error(e);
          }
        });
      });

      try {
        var result = await promise;
        // キャッシュする
        if (config.server.cache) {
          app.setCache(cacheKey, result);
        }
        res.send(result.content);
      }
      catch (e) {
        res.status(500).send(e.toString());
      }
    }  
  });
};

// キャッシュまわりセットアップ

app.caches = {};

app.setCache = (key, value) => {
  console.log('set cache', key);
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


