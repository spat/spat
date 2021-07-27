
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
  // user agent を付与
  req.useragent = useragent.parse(navigator.userAgent);

  // back/forward 情報を付与
  req.isBack = router.isBack;
  req.isForward = router.isForward;

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

  // 戻るを押した際の挙動
  // TODO: 進むのときは何もしないようにする
  router.addListener('popstate', (e) => {
    var modalTag = spat.modal.getCurrentModalTag();
    if (modalTag) {
      // モーダルを閉じる
      modalTag.close();
      // router 側でチェック
      e.preventBack = true;
    }
  });

  // 画面遷移対応
  window.addEventListener('beforeunload', (e) => {
    const modalTag = spat.modal.getCurrentModalTag();
    if (modalTag) {
      modalTag.trigger('beforeunload', e);
    }
    // modal があってもページの処理をする
    const { currentPageTag } = spat.appTag.navTag;
    if (currentPageTag) {
      currentPageTag.trigger('beforeunload', e);
    }

    // 一応 preventDefault しておく
    if (e.returnValue) {
      e.preventDefault();
    }
  });

  router.addListener('beforeunload', (e) => {
    const modalTag = spat.modal.getCurrentModalTag();
    // modal は popstate でやってるのでやらない
    if (modalTag) return ;
    const { currentPageTag } = spat.appTag.navTag;
    if (currentPageTag) {
      currentPageTag.trigger('beforeunload', e);
    }
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
    if (!req.isBack && !req.isForward) {
      // 一番上にスクロール
      window.scroll(0, 0);
    }
  }

  // ページ遷移
  var result = await spat.appTag.navTag.goto({route, req, res});

  // メタ情報を更新
  spat.updateMeta();

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

spat.updateMeta = () => {
  // meta の設定
  var head = spat.appTag.navTag.getHead();
  var titleElement = document.querySelector('title');
  if (titleElement) {
    titleElement.textContent = head.title;
  }

  // タイトル以外の設定
  [
    { query: 'meta[name="description"]', value: head.description },
    { query: 'meta[name="keywords"]', value: head.keywords },
    { query: 'meta[property="og:title"]', value: head.ogp.title || head.title },
    { query: 'meta[property="og:description"]', value: head.ogp.description || head.description },
    { query: 'meta[property="og:site_name"]', value: head.ogp.site_name },
    { query: 'meta[property="og:type"]', value: head.ogp.type },
    { query: 'meta[property="og:image"]', value: head.ogp.image },
    { query: 'link[rel="canonical"]', value: head.canonical },
  ].forEach(item => {
    var $elm = document.querySelector(item.query);
    if ($elm) {
      if ($elm.tagName === 'LINK') {
        $elm.setAttribute('href', item.value);
      }
      else {
        $elm.setAttribute('content', item.value);
      }
    }
  });
};

spat.showSSR = () => {
  var $serverApp = document.querySelector('[data-is=spat-app][render=server]');
  if (!$serverApp) return ;

  $serverApp.style.opacity = '';
};

spat.init();


export default spat;