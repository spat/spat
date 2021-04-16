
// spat は global とする
import path from 'path';
import common from './common.js';
import './plugins.js';

// view 側で定義している global な spat にマージ
Object.assign(global.spat, common);

var spat = global.spat;

// router
import Router from './router'
import routes from '~/scripts/routes'

var router = new Router();

spat.router = router;

router.use((req, res, next) => {
  req.useragent = useragent.parse(navigator.userAgent);
  next();
});

// ここからは client 用
import riot from 'riot'
riot.util.tmpl.errorHandler = function() {};

// 初期化
spat.init = () => {
  var clientElement = document.createElement('div');
  clientElement.setAttribute('render', 'client');
  var appTag = riot.mount(clientElement, 'spat-app')[0];

  spat.appTag = appTag;
  spat.modal = appTag.tags['spat-modal'];
  spat.toast = appTag.tags['spat-toast'];

  // routes を登録
  Object.keys(routes).forEach(key => {
    router.on(key, (req, res) => {
      var route = routes[key];

      spat.goto(route, req, res);
    });
  });

  // 404 対応
  router.on('(.*)', (req, res) => {
    res.statusCode = 404;
    res.error = new Error('404 not found');
    spat.goto({
      tag: 'page-error',
    }, req, res);
  });
};

// スタート
spat.start = () => {
  // ルーティング実行
  if (spat.config.spa !== false) {
    spat.router.start();
  }
  spat.router.exec();
};

spat.goto = async (route, req, res) => {
  // 初回はスクロールリセットしない　
  if (spat.appTag.root.parentNode) {
      // 進む/戻る じゃなければ上部にスクロールする
    if (spat.router.isPopState !== true) {
      // 一番上にスクロール
      window.scroll(0, 0);
    }
  }

  // ページ遷移
  var result = await spat.appTag.navTag.goto({route, req, res});

  // meta の設定
  var head = spat.appTag.navTag.getHead();
  var titleElement = document.querySelector('title');
  if (titleElement) {
    titleElement.textContent = head.title;
  }

  // タイトル以外の設定
  [
    { query: 'meta[name="description"', value: head.description },
    { query: 'meta[property="og:title"]', value: head.ogp.title || head.title },
    { query: 'meta[property="og:description"]', value: head.ogp.description || head.description },
    { query: 'meta[property="og:site_name"]', value: head.ogp.site_name },
    { query: 'meta[property="og:type"]', value: head.ogp.type },
    { query: 'meta[property="og:image"]', value: head.ogp.image },
  ].forEach(item => {
    var $elm = document.querySelector(item.query);
    if ($elm) {
      $elm.setAttribute('content', item.value);
    }
  });

  // まだ client app が append されていなかったら
  var clientElement = spat.appTag.root;
  if (!clientElement.parentNode) {
    // app を server から client に入れ替える
    var serverElement = document.querySelector('[data-is=spat-app]');
    serverElement.parentElement.replaceChild(clientElement, serverElement);

    // サーバーでレンダリングしていた riot style を消す(重複するので)
    var serverElement = document.querySelector('style[render=server]');
    serverElement.parentNode.removeChild(serverElement);
  }
};

spat.showSSR = () => {
  var $serverApp = document.querySelector('[data-is=spat-app][render=server]');
  if (!$serverApp) return ;

  $serverApp.style.opacity = '';
};

spat.init();

export default spat;