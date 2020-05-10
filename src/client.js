
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

spat.start = () => {
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
    spat.goto({
      tag: 'page-error',
    }, req, res);
  });

  // ルーティング実行
  if (spat.config.spa !== false) {
    spat.router.start();
  }
  spat.router.exec();
};

spat.goto = async (route, req, res) => {
  await spat.appTag.gotoPage(route, req, res);

  spat.appTag.triggerWithChildren(spat.appTag.pageTag, 'client', {
    req, res
  });

  spat.appTag.pageTag.trigger('show');
  spat.appTag.pageTag.update();

  // meta の設定
  var titleElement = document.querySelector('title');
  if (titleElement) {
    document.querySelector('title').textContent = spat.appTag.head.title;
  }

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
  // 初回以外
  else {
    // 一番上にスクロール
    window.scroll(0, 0);
  }
};

export default spat;