// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../spalate.config.js":[function(require,module,exports) {
module.exports = {
  // env: 'staging',
  server: {},
  client: {
    title: 'spalate with parcel'
  }
};
},{}],"node_modules/@spalate/config.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _spalateConfig = _interopRequireDefault(require("../../../spalate.config.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const config = require(`${process.cwd()}/spalate.config.js`);
// import config from './spalate.config.js'
_spalateConfig.default.env = _spalateConfig.default.env || 'temp';
var _default = _spalateConfig.default;
exports.default = _default;
},{"../../../spalate.config.js":"../spalate.config.js"}],"node_modules/@spalate/spalate.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _browserOrNode = require("browser-or-node");

console.log('isNode', _browserOrNode.isNode);
console.log('isBrowser', _browserOrNode.isBrowser);
var _default = {
  isNode: _browserOrNode.isNode,
  isBrowser: _browserOrNode.isBrowser
};
exports.default = _default;
},{}],"node_modules/@spalate/server.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _spalate = _interopRequireDefault(require("./spalate.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// config
const path = require('path');

const express = require('express');

const Bundler = require('parcel-bundler');

const config = require('./config.js'); // spalate は global とする


global.spalate = _spalate.default;

var createParcelBundler = target => {
  var config;

  if (target === 'node') {
    var entry = path.join(process.cwd(), 'app/server.js');
    config = {
      target: 'node',
      bundleNodeModules: false,
      outDir: `${SPALATE_OUTPUT_DIR}`,
      outFile: 'modules.cjs',
      hmr: false,
      global: 'spalate',
      cache: false,
      sourceMaps: false
    };
  } else {
    var entry = path.join(process.cwd(), 'app/client.js');
    config = {
      target: 'browser',
      bundleNodeModules: true,
      outDir: `${SPALATE_OUTPUT_DIR}/public`,
      outFile: 'modules.js',
      hmr: process.env.NODE_ENV !== 'production',
      // 名前がバッティングするので off に
      // global: 'spalate',
      sourceMaps: true,
      cache: false
    };
  }

  var bundler = new Bundler(entry, config);
  return bundler;
};

var SPALATE_OUTPUT_DIR = `${process.cwd()}/.spalate`; // setup node express

const app = express(); // setup static

app.use('/spalate', express.static(`${SPALATE_OUTPUT_DIR}/public`));
app.use(express.static(`${process.cwd()}/public`)); // setup pug

app.set('views', path.join(process.cwd(), 'views'));
app.set('view engine', 'pug'); // setup parcel

var bundler = createParcelBundler('browser');
app.use(bundler.middleware()); // setup routing

app.get('/', async (req, res) => {
  // var ss = await db.collection('groups').get();
  res.render('index', {});
});
var _default = app;
exports.default = _default;
},{"./config.js":"node_modules/@spalate/config.js","./spalate.js":"node_modules/@spalate/spalate.js"}],"tags/app.pug":[function(require,module,exports) {
const riot = require('riot');

riot.tag2('app', '<div class="p16"> <h1>{title}</h1> <div class="p16"> <div class="s64 bg-red"></div> </div> <div class="mb16"> <ul class="ml32"> <li>isNode: {isNode}</li> <li>isBrowser: {isBrowser}</li> <li each="{item in [1, 2, 3, 4]}">item {item}</li> </ul> </div> <div class="mb16"> <ul class="ml32"> <li each="{item in items}">{item.data.title}</li> </ul> </div> <div class="mb16"><img src="/images/kenkyo.png"></div> </div>', '', '', function (opts) {
  this.title = 'Hello, spalate with parcel!';
  this.on('mount', async () => {
    var ref = db.collection('groups');
    var ss = await ref.get();
    this.items = ss.docs.map(doc => {
      return {
        id: doc.id,
        data: doc.data()
      };
    });
    this.update();
  });
});
},{}],"tags/*.pug":[function(require,module,exports) {
module.exports = {
  "app": require("./app.pug")
};
},{"./app.pug":"tags/app.pug"}],"tags/**/*.pug":[function(require,module,exports) {
module.exports = {
  "app": require("./../app.pug")
};
},{"./../app.pug":"tags/app.pug"}],"tags/index.js":[function(require,module,exports) {
"use strict";

require("./*.pug");

require("./**/*.pug");
},{"./*.pug":"tags/*.pug","./**/*.pug":"tags/**/*.pug"}],"plugins/firebase.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _firebase = _interopRequireDefault(require("firebase"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const config = {
  apiKey: "AIzaSyCiJjzLD4C5ueJ2wP3UVmdTa7BfiqnWu5Q",
  authDomain: "chat-rabee-jp.firebaseapp.com",
  databaseURL: "https://chat-rabee-jp.firebaseio.com",
  projectId: "chat-rabee-jp",
  storageBucket: "chat-rabee-jp.appspot.com",
  messagingSenderId: "50741122756"
};

_firebase.default.initializeApp(config);

var _default = _firebase.default;
exports.default = _default;
},{}],"server.js":[function(require,module,exports) {
"use strict";

var _server = _interopRequireDefault(require("./node_modules/@spalate/server"));

require("./tags");

var _firebase = _interopRequireDefault(require("~/plugins/firebase.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var db = _firebase.default.firestore();

global.db = db; // Start the server

const PORT = process.env.PORT || 3000;

_server.default.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
},{"./node_modules/@spalate/server":"node_modules/@spalate/server.mjs","./tags":"tags/index.js","~/plugins/firebase.js":"plugins/firebase.js"}]},{},["server.js"], "spalate")