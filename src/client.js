// import config from './config.js'

// spalate は global とする
import spalate from './spalate.js'

// router
import Router from './internal/router'
import routes from '../../scripts/routes'

var router = new Router();

spalate.router = router;

// ここからは client 用
import riot from 'riot'
riot.util.tmpl.errorHandler = function() {};

spalate.start = () => {
  // var appTag = document.querySelector('[data-is=app]');
  // appTag.innerHTML = '';

  var appTag = riot.mount('app')[0];

  // routes を登録
  Object.keys(routes).forEach(key => {
    router.on(key, (req, res) => {
      var route = routes[key];
      appTag.gotoPage(route.tag, req, res);
    });
  });

  // ルーティング実行
  spalate.router.start();
  spalate.router.exec();
};

// global 化
if (global.spalate) {
  Object.assign(global.spalate, spalate)
}
else {
  global.spalate = spalate;
}

export default spalate;