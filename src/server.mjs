
// spalate は global とする
import common from './common.js'

var spalate = {};
Object.assign(spalate, common);

global.spalate = spalate;

// ここからはサーバー固有の処理

const path = require('path');
const express = require('express');
const Bundler = require('parcel-bundler');

// config
const config = require('./config');
// client 側の config を spalate.config とする
spalate.config = config.client;

var SPALATE_OUTPUT_DIR = `${process.cwd()}/.spalate`;


// setup node express
const app = express();
spalate.app = app;

// setup static
app.use('/spalate', express.static(`${SPALATE_OUTPUT_DIR}/static`));
app.use(express.static(`${process.cwd()}/static`));

// setup pug
app.set('views', path.join(process.cwd(), 'app/views'));

app.set('view engine', 'pug');

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
riot.mixin({ _ssr: true });

// setup routing
import URL from 'url'
import routes from '../../scripts/routes.js'

app.use((req, res, next) => {
  req.Url = URL.parse(req.url, true);
  next();
});

spalate.caches = {};
Object.keys(routes).forEach(key => {

  if (config.server.cache) {
    // キャッシュチェック
    app.get(key, async (req, res, next) => {
      // レンダリング済みだったらそっちを使う
      if (spalate.caches[req.url]) {
        res.send(spalate.caches[req.url]);
      }
      else {
        next();
      }
    });
  }


  // 実際のレンダリング
  app.get(key, async (req, res, next) => {
    var route = routes[key];

    var ssr = new Ssriot(route.tag);
    await ssr.render({
      req,
      res,
      isSsr: config.server.ssr
    });

    // リダイレクト時は何もせず次へ
    if (res.statusCode === 301 || res.statusCode === 302) {
      next();
      return ;
    }

    // 描画
    res.render('index', {
      head: ssr.tag.head,
      content: ssr.tagContent,
      spalate: ssr,
      // methods: {
      //   head: ssr.head,
      // },

      pretty: true,
    }, (err, content) => {
      console.log(err);
      if (err) {
        res.send(err.toString());
      }
      else {
        if (config.server.cache) {
          spalate.caches[req.url] = content;
        }
        res.send(content);
      }
    });
  });
  
});

// 404 対応
app.use(async (req, res, next) => {
  console.error(`404: ${req.url}`);

  res.status(404);

  var ssr = new Ssriot('page-error');
  await ssr.render({
    req, res
  });

  // 描画
  res.render('index', {
    head: ssr.tag.head,
    content: ssr.tagContent,
    spalate: ssr,
    pretty: true,
  });
});



export default app;


