import URL from 'url'
// import { pathToRegexp } from 'path-to-regexp'
const { pathToRegexp, match, parse, compile } = require("path-to-regexp");

class Layer {
  constructor(path, callbacks) {
    this.path = path;
    this.keys = [];
    this.regexp = pathToRegexp(this.path, this.keys);
    this.callbacks = callbacks;
  }

  match(url) {
    var match = this.regexp.exec(url.pathname);

    if (!match) return false;

    var params = {};
    for (var i=1; i<match.length; ++i) {
      var val = match[i];
      var key = this.keys[i-1].name;
      params[key] = val;
    }
  
    return params;
  }

  run(req, res) {
    var index = 0;

    var next = () => {
      if (index >= this.callbacks.length) {
        return ;
      }

      var callback = this.callbacks[index++];

      // next あり
      if (callback.length >= 3) {
        callback(req, res, next);
      }
      else {
        callback(req, res);
        next();
      }
    }

    next();
  }
}

/*
 * ルーター本体
 */
class Router {
  constructor(routes) {
    this._stack = [];

    this._base = '/';
  }

  // パスの登録
  on(path, ...callbacks) {
    var layer = new Layer(path, callbacks);
    this._stack.push(layer);
  }

  // 発火
  emit(path) {
    var url = URL.parse(path, true);

    // ヒットする Layer を検索して実行
    this._stack.some((layer) => {
      var params = layer.match(url);

      if (params) {
        var req = {
          url: url.path,
          query: url.query,
          Url: url,
          params: params,
          layer: layer,
        };
        var res = {
          redirect: (status, url) => {
            if (typeof status === 'string') {
              url = status;
              status = 302;
            }
            this.replace(url);
          }
        };
        layer.run(req, res);

        // ループを抜ける
        return true;
      }
    });

    return this;
  }

  exec() {
    this.emit(location.pathname + location.search + location.hash);
  }

  go() {

  }

  // 参考: https://router.vuejs.org/ja/guide/essentials/navigation.html
  push(path) {
    history.pushState(history.state, null, path);
    this.emit(path);
  }

  replace(path) {
    history.replaceState(history.state, null, path);
    this.emit(path);
  }

  back() {

  }

  start() {
    var TOUCH_EVENT = ('undefined' !== typeof document) && document.ontouchstart ? 'touchstart' : 'click';

    window.addEventListener('popstate', this._onpopstate.bind(this));
    window.addEventListener('hashchange', this._onpopstate.bind(this));
    document.addEventListener(TOUCH_EVENT, this._onclick.bind(this));
  }

  // a タグクリックした際のイベント
  _onclick(e) {
    // 他にキーを押していた場合は無視
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.defaultPrevented) return;

    var elm = e.target;
    while(elm) {
      if (elm.nodeName === 'A') break;
      elm = elm.parentNode;
    }

    // check anchor
    if (!elm || elm.nodeName !== 'A') {
      return;
    }

    // check cross origin
    if (elm.hostname !== location.hostname) {
      return ;
    }

    // href があり, かつ今の href と違うときのみ
    if (elm.getAttribute('href') && elm.href !== location.href) {
      // var link = elm.getAttribute('href');
      var link = elm.pathname + elm.search + elm.hash;
      this.push(link);
    }

    e.preventDefault();
  }

  _onpopstate(e) {
    this.exec();
  }
}

export default Router;
