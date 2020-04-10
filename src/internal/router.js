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

  run(req) {
    var index = 0;

    var next = () => {
      if (index >= this.callbacks.length) {
        return ;
      }

      var callback = this.callbacks[index++];

      // next あり
      if (callback.length >= 3) {
        callback(req, {}, next);
      }
      else {
        callback(req, {});
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
        layer.run({
          url: url.path,
          query: url.query,
          Url: url,
          params: params,
          layer: layer,
        });

        // ループを抜ける
        return true;
      }
    });

    return this;
  }

  exec() {
    this.emit(location.href);
    // this.emit(location.pathname + location.search + location.hash);
  }
}

export default Router;
