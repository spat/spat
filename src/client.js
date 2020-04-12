// import config from './config.js'

// spalate は global とする
import spalate from './spalate.js'
global.spalate = spalate;

// router
import Router from './internal/router'
import routes from '../../scripts/routes'

var router = new Router();

Object.keys(routes).forEach(key => {
  router.on(key, (req, res) => {
    var route = routes[key];
    var appTag = document.querySelector('[data-is=app]')._tag

    appTag.gotoPage(route.tag, req, res);
  });
});

spalate.router = router;

// ここからは client 用
import riot from 'riot'
riot.util.tmpl.errorHandler = function() {};

spalate.start = () => {
  riot.mount('app');

  // ルーティング実行
  spalate.router.exec();
};

export default spalate;