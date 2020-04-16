// import config from './config.js'

// spalate は global とする
import spalate from './spalate.js'

// router
import Router from './router'
import routes from '../../scripts/routes'

var router = new Router();

spalate.router = router;

// ここからは client 用
import riot from 'riot'
riot.util.tmpl.errorHandler = function() {};

spalate.start = () => {
  var clientElement = document.createElement('div');
  clientElement.setAttribute('render', 'client');
  var appTag = riot.mount(clientElement, 'spalate-app')[0];

  spalate.appTag = appTag;

  // routes を登録
  Object.keys(routes).forEach(key => {
    router.on(key, (req, res) => {
      var route = routes[key];

      spalate.goto(route, req, res);
    });
  });

  // 404 対応
  router.on('(.*)', (req, res) => {
    res.statusCode = 404;
    spalate.goto({
      tag: 'page-error',
    }, req, res);
  });

  // ルーティング実行
  spalate.router.start();
  spalate.router.exec();
  
  // スクロールのリセット対策
  var serverElement = document.querySelector('[data-is=spalate-app]');
  clientElement.style.height = serverElement.clientHeight;
  setTimeout(() => {
    clientElement.style.height = '';
  }, 512);

  // server でレンダリングした要素を client でレンダリングした要素に入れ替える
  serverElement.parentElement.replaceChild(clientElement, serverElement);

  // サーバーでレンダリングしていた riot style を消す(重複するので)
  var serverElement = document.querySelector('style[render=server]');
  serverElement.parentNode.removeChild(serverElement);
};

spalate.goto = async (route, req, res) => {
  await spalate.appTag.gotoPage(route.tag, req, res);

  // meta の設定
  var titleElement = document.querySelector('title');
  if (titleElement) {
    document.querySelector('title').textContent = spalate.appTag.head.title;
  }
};

// global 化
if (global.spalate) {
  Object.assign(global.spalate, spalate)
}
else {
  global.spalate = spalate;
}

export default spalate;