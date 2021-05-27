import URL from 'url';
import EventEmitter from 'events';
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
class Router extends EventEmitter {
  constructor(routes) {
    super();
    this._stack = [];
    this._callbacks = [];

    this._base = '/';
    this.normalizeHistoryState();
    this.pageIndex = history.state.pageIndex;
    this.isBack = false;
    this.isForward = false;

    this.DEFAULT_BEFOREUNLOAD_MESSAGE = 'このサイトを離れますか？\n行った変更が保存されない可能性があります。';
  }

  // history.state を安全な形に設定
  normalizeHistoryState() {
    if (!_.isObject(history.state) || !Number.isInteger(history.state.pageIndex)) {
      history.replaceState({
        ...history.state,
        pageIndex: 0,
      }, '');
    }
  }

  // パスの登録
  on(path, ...callbacks) {
    var layer = new Layer(path, callbacks);
    this._stack.push(layer);
  }

  // 共通処理を登録
  use(callback) {
    this._callbacks.push(callback);
    return this;
  }

  // emit がオーバーライドされているので別名で実装
  dispatch(...args) {
    return super.emit(...args);
  }

  // 発火
  emit(path) {
    var url = URL.parse(path, true);
    this.currentPath = path;
    // ヒットする Layer を検索して実行
    this._stack.some((layer) => {
      var params = layer.match(url);

      if (params) {
        // ルーティング実行
        this._run(url, layer, params);

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

  // キャンセルで true
  dispatchBeforeunload() {
    const event = { type: 'beforeunload' };
    this.dispatch(event.type, event);
    // returnValue がある場合は confirm を表示する
    if (event.returnValue) {
      let message = this.DEFAULT_BEFOREUNLOAD_MESSAGE;
      if (typeof event.returnValue === 'string') {
        message = event.returnValue;
      }
      // キャンセル時に true を返す
      if (!confirm(message)) {
        return true;
      }
    }
  }

  // 参考: https://router.vuejs.org/ja/guide/essentials/navigation.html
  push(path) {
    // beforeunload
    const canceled = this.dispatchBeforeunload();
    if (canceled) return;
    
    this.pageIndex++;

    history.pushState({
      ...history.state,
      pageIndex: this.pageIndex,
    }, '', path);

    // 進む/戻る 以外の遷移なので false に戻す
    this.isBack = false;
    this.isForward = false;

    this.emit(path);
  }

  replace(path) {
    // beforeunload
    const canceled = this.dispatchBeforeunload();
    if (canceled) return;

    history.replaceState({
      ...history.state,
      pageIndex: this.pageIndex,
    }, '', path);

    // 進む/戻る 以外の遷移なので false に戻す
    this.isBack = false;
    this.isForward = false;

    this.emit(path);
  }

  back() {
    history.back();
    return this;
  }

  forward() {
    history.forward();
    return this;
  }

  start() {
    var TOUCH_EVENT = ('undefined' !== typeof document) && document.ontouchstart ? 'touchstart' : 'click';

    window.addEventListener('popstate', this._onpopstate.bind(this));
    window.addEventListener('hashchange', this._onpopstate.bind(this));
    document.addEventListener(TOUCH_EVENT, this._onclick.bind(this));
  }

  async _run(url, layer, params) {
    // request オブジェクトを作成
    var req = {
      url: url.path,
      query: url.query,
      Url: url,
      params: params,
      layer: layer,
    };
    // レスポンスオブジェクトを作成
    var res = {
      status: (status) => {
        res.statusCode = status;
      },
      redirect: (status, url) => {
        if (typeof status === 'string') {
          url = status;
          status = 302;
        }
        res.status(status);
        this.replace(url);
      }
    };

    var index = 0;
    var next = () => {
      var callback = this._callbacks[index++];

      if (!callback) {
        // use を実行し終わったら layer を実行
        layer.run(req, res);
      }
      else {
        // next あり
        if (callback.length >= 3) {
          callback(req, res, next);
        }
        else {
          callback(req, res);
          next();
        }
      }
    }

    next();
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

    // target がある場合はデフォルト処理にする
    if (elm.target) {
      return ;
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
    // preventBack で再度実行されたときは skip フラグが立っているので何もしない
    if (this._skip) {
      this._skip = false;
      return ;
    }

    // beforeunload
    const canceled = this.dispatchBeforeunload();
    if (canceled) {
      this.normalizeHistoryState();
      this.pageIndex = history.state.pageIndex + 1;
      // URL をもとに戻す
      history.pushState({
        ...history.state,
        pageIndex: this.pageIndex,
      }, '', this.currentPath);
      return ;
    }

    // バックをキャンセル(modal 時を考慮)
    if (e.preventBack) {
      this._skip = true;
      // URL を元に戻す
      history.forward();
      return ;
    }

    // state に pageIndex がなかった場合追加する
    this.normalizeHistoryState();

    // 戻る/進む 判定
    this.isBack = this.pageIndex > history.state.pageIndex;
    this.isForward = this.pageIndex < history.state.pageIndex;
    this.pageIndex = history.state.pageIndex;

    this.exec();
  }
}

export default Router;
