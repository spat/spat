
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
riot.mixin({ _ssr: true });

// setup routing
import URL from 'url'
import routes from '../../scripts/routes.js'

app.use((req, res, next) => {
  req.Url = URL.parse(req.url, true);
  next();
});

spat.caches = {};
Object.keys(routes).forEach(key => {

  if (config.server.cache) {
    // キャッシュチェック
    app.get(key, async (req, res, next) => {
      // レンダリング済みだったらそっちを使う
      if (spat.caches[req.url]) {
        res.send(spat.caches[req.url]);
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

    // リダイレクト時は何もせず次へ
    if (res.statusCode === 301 || res.statusCode === 302) {
      next();
      return ;
    }

    // 描画
    res.render('index', {
      head: ssr.tag.head,
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
          spat.caches[req.url] = content;
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
    head: ssr.tag.head,
    content: ssr.tagContent,
    spat: ssr,
    pretty: true,
  });
});



export default app;


