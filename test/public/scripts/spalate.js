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
})({"../../node_modules/underscore/modules/index.js":[function(require,module,exports) {
var global = arguments[3];
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _;
exports.iteratee = iteratee;
exports.restArguments = restArguments;
exports.forEach = exports.each = each;
exports.collect = exports.map = map;
exports.detect = exports.find = find;
exports.select = exports.filter = filter;
exports.reject = reject;
exports.all = exports.every = every;
exports.any = exports.some = some;
exports.include = exports.includes = exports.contains = contains;
exports.pluck = pluck;
exports.where = where;
exports.findWhere = findWhere;
exports.max = max;
exports.min = min;
exports.shuffle = shuffle;
exports.sample = sample;
exports.sortBy = sortBy;
exports.toArray = toArray;
exports.size = size;
exports.take = exports.head = exports.first = first;
exports.initial = initial;
exports.last = last;
exports.drop = exports.tail = exports.rest = rest;
exports.compact = compact;
exports.flatten = flatten;
exports.unique = exports.uniq = uniq;
exports.intersection = intersection;
exports.unzip = unzip;
exports.object = object;
exports.sortedIndex = sortedIndex;
exports.range = range;
exports.chunk = chunk;
exports.memoize = memoize;
exports.throttle = throttle;
exports.debounce = debounce;
exports.wrap = wrap;
exports.negate = negate;
exports.compose = compose;
exports.after = after;
exports.before = before;
exports.keys = keys;
exports.allKeys = allKeys;
exports.values = values;
exports.mapObject = mapObject;
exports.pairs = pairs;
exports.invert = invert;
exports.methods = exports.functions = functions;
exports.findKey = findKey;
exports.create = create;
exports.clone = clone;
exports.tap = tap;
exports.isMatch = isMatch;
exports.isEqual = isEqual;
exports.isEmpty = isEmpty;
exports.isElement = isElement;
exports.isObject = isObject;
exports.isFinite = isFinite;
exports.isNaN = isNaN;
exports.isBoolean = isBoolean;
exports.isNull = isNull;
exports.isUndefined = isUndefined;
exports.has = has;
exports.identity = identity;
exports.constant = constant;
exports.noop = noop;
exports.property = property;
exports.propertyOf = propertyOf;
exports.matches = exports.matcher = matcher;
exports.times = times;
exports.random = random;
exports.result = result;
exports.uniqueId = uniqueId;
exports.template = template;
exports.chain = chain;
exports.mixin = mixin;
exports.templateSettings = exports.unescape = exports.escape = exports.now = exports.isWeakSet = exports.isSet = exports.isWeakMap = exports.isMap = exports.isSymbol = exports.isError = exports.isRegExp = exports.isDate = exports.isNumber = exports.isString = exports.isFunction = exports.isArguments = exports.isArray = exports.defaults = exports.omit = exports.pick = exports.assign = exports.extendOwn = exports.extend = exports.once = exports.defer = exports.delay = exports.bindAll = exports.partial = exports.bind = exports.lastIndexOf = exports.indexOf = exports.findLastIndex = exports.findIndex = exports.zip = exports.difference = exports.union = exports.without = exports.partition = exports.countBy = exports.indexBy = exports.groupBy = exports.invoke = exports.foldr = exports.reduceRight = exports.inject = exports.foldl = exports.reduce = exports.VERSION = void 0;
//     Underscore.js 1.10.2
//     https://underscorejs.org
//     (c) 2009-2020 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
// Baseline setup
// --------------
// Establish the root object, `window` (`self`) in the browser, `global`
// on the server, or `this` in some virtual machines. We use `self`
// instead of `window` for `WebWorker` support.
var root = typeof self == 'object' && self.self === self && self || typeof global == 'object' && global.global === global && global || Function('return this')() || {}; // Save bytes in the minified (but not gzipped) version:

var ArrayProto = Array.prototype,
    ObjProto = Object.prototype;
var SymbolProto = typeof Symbol !== 'undefined' ? Symbol.prototype : null; // Create quick reference variables for speed access to core prototypes.

var push = ArrayProto.push,
    slice = ArrayProto.slice,
    toString = ObjProto.toString,
    hasOwnProperty = ObjProto.hasOwnProperty; // All **ECMAScript 5** native function implementations that we hope to use
// are declared here.

var nativeIsArray = Array.isArray,
    nativeKeys = Object.keys,
    nativeCreate = Object.create; // Create references to these builtin functions because we override them.

var _isNaN = root.isNaN,
    _isFinite = root.isFinite; // Naked function reference for surrogate-prototype-swapping.

var Ctor = function () {}; // The Underscore object. All exported functions below are added to it in the
// modules/index-all.js using the mixin function.


function _(obj) {
  if (obj instanceof _) return obj;
  if (!(this instanceof _)) return new _(obj);
  this._wrapped = obj;
} // Current version.


var VERSION = _.VERSION = '1.10.2'; // Internal function that returns an efficient (for current engines) version
// of the passed-in callback, to be repeatedly applied in other Underscore
// functions.

exports.VERSION = VERSION;

function optimizeCb(func, context, argCount) {
  if (context === void 0) return func;

  switch (argCount == null ? 3 : argCount) {
    case 1:
      return function (value) {
        return func.call(context, value);
      };
    // The 2-argument case is omitted because we’re not using it.

    case 3:
      return function (value, index, collection) {
        return func.call(context, value, index, collection);
      };

    case 4:
      return function (accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
  }

  return function () {
    return func.apply(context, arguments);
  };
} // An internal function to generate callbacks that can be applied to each
// element in a collection, returning the desired result — either `identity`,
// an arbitrary callback, a property matcher, or a property accessor.


function baseIteratee(value, context, argCount) {
  if (value == null) return identity;
  if (isFunction(value)) return optimizeCb(value, context, argCount);
  if (isObject(value) && !isArray(value)) return matcher(value);
  return property(value);
} // External wrapper for our callback generator. Users may customize
// `_.iteratee` if they want additional predicate/iteratee shorthand styles.
// This abstraction hides the internal-only argCount argument.


_.iteratee = iteratee;

function iteratee(value, context) {
  return baseIteratee(value, context, Infinity);
} // The function we actually call internally. It invokes _.iteratee if
// overridden, otherwise baseIteratee.


function cb(value, context, argCount) {
  if (_.iteratee !== iteratee) return _.iteratee(value, context);
  return baseIteratee(value, context, argCount);
} // Some functions take a variable number of arguments, or a few expected
// arguments at the beginning and then a variable number of values to operate
// on. This helper accumulates all remaining arguments past the function’s
// argument length (or an explicit `startIndex`), into an array that becomes
// the last argument. Similar to ES6’s "rest parameter".


function restArguments(func, startIndex) {
  startIndex = startIndex == null ? func.length - 1 : +startIndex;
  return function () {
    var length = Math.max(arguments.length - startIndex, 0),
        rest = Array(length),
        index = 0;

    for (; index < length; index++) {
      rest[index] = arguments[index + startIndex];
    }

    switch (startIndex) {
      case 0:
        return func.call(this, rest);

      case 1:
        return func.call(this, arguments[0], rest);

      case 2:
        return func.call(this, arguments[0], arguments[1], rest);
    }

    var args = Array(startIndex + 1);

    for (index = 0; index < startIndex; index++) {
      args[index] = arguments[index];
    }

    args[startIndex] = rest;
    return func.apply(this, args);
  };
} // An internal function for creating a new object that inherits from another.


function baseCreate(prototype) {
  if (!isObject(prototype)) return {};
  if (nativeCreate) return nativeCreate(prototype);
  Ctor.prototype = prototype;
  var result = new Ctor();
  Ctor.prototype = null;
  return result;
}

function shallowProperty(key) {
  return function (obj) {
    return obj == null ? void 0 : obj[key];
  };
}

function _has(obj, path) {
  return obj != null && hasOwnProperty.call(obj, path);
}

function deepGet(obj, path) {
  var length = path.length;

  for (var i = 0; i < length; i++) {
    if (obj == null) return void 0;
    obj = obj[path[i]];
  }

  return length ? obj : void 0;
} // Helper for collection methods to determine whether a collection
// should be iterated as an array or as an object.
// Related: https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
// Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094


var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
var getLength = shallowProperty('length');

function isArrayLike(collection) {
  var length = getLength(collection);
  return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
} // Collection Functions
// --------------------
// The cornerstone, an `each` implementation, aka `forEach`.
// Handles raw objects in addition to array-likes. Treats all
// sparse array-likes as if they were dense.


function each(obj, iteratee, context) {
  iteratee = optimizeCb(iteratee, context);
  var i, length;

  if (isArrayLike(obj)) {
    for (i = 0, length = obj.length; i < length; i++) {
      iteratee(obj[i], i, obj);
    }
  } else {
    var _keys = keys(obj);

    for (i = 0, length = _keys.length; i < length; i++) {
      iteratee(obj[_keys[i]], _keys[i], obj);
    }
  }

  return obj;
}

// Return the results of applying the iteratee to each element.
function map(obj, iteratee, context) {
  iteratee = cb(iteratee, context);

  var _keys = !isArrayLike(obj) && keys(obj),
      length = (_keys || obj).length,
      results = Array(length);

  for (var index = 0; index < length; index++) {
    var currentKey = _keys ? _keys[index] : index;
    results[index] = iteratee(obj[currentKey], currentKey, obj);
  }

  return results;
}

// Create a reducing function iterating left or right.
function createReduce(dir) {
  // Wrap code that reassigns argument variables in a separate function than
  // the one that accesses `arguments.length` to avoid a perf hit. (#1991)
  var reducer = function (obj, iteratee, memo, initial) {
    var _keys = !isArrayLike(obj) && keys(obj),
        length = (_keys || obj).length,
        index = dir > 0 ? 0 : length - 1;

    if (!initial) {
      memo = obj[_keys ? _keys[index] : index];
      index += dir;
    }

    for (; index >= 0 && index < length; index += dir) {
      var currentKey = _keys ? _keys[index] : index;
      memo = iteratee(memo, obj[currentKey], currentKey, obj);
    }

    return memo;
  };

  return function (obj, iteratee, memo, context) {
    var initial = arguments.length >= 3;
    return reducer(obj, optimizeCb(iteratee, context, 4), memo, initial);
  };
} // **Reduce** builds up a single result from a list of values, aka `inject`,
// or `foldl`.


var reduce = createReduce(1);
exports.inject = exports.foldl = exports.reduce = reduce;
// The right-associative version of reduce, also known as `foldr`.
var reduceRight = createReduce(-1);
exports.foldr = exports.reduceRight = reduceRight;

// Return the first value which passes a truth test.
function find(obj, predicate, context) {
  var keyFinder = isArrayLike(obj) ? findIndex : findKey;
  var key = keyFinder(obj, predicate, context);
  if (key !== void 0 && key !== -1) return obj[key];
}

// Return all the elements that pass a truth test.
function filter(obj, predicate, context) {
  var results = [];
  predicate = cb(predicate, context);
  each(obj, function (value, index, list) {
    if (predicate(value, index, list)) results.push(value);
  });
  return results;
}

// Return all the elements for which a truth test fails.
function reject(obj, predicate, context) {
  return filter(obj, negate(cb(predicate)), context);
} // Determine whether all of the elements match a truth test.


function every(obj, predicate, context) {
  predicate = cb(predicate, context);

  var _keys = !isArrayLike(obj) && keys(obj),
      length = (_keys || obj).length;

  for (var index = 0; index < length; index++) {
    var currentKey = _keys ? _keys[index] : index;
    if (!predicate(obj[currentKey], currentKey, obj)) return false;
  }

  return true;
}

// Determine if at least one element in the object matches a truth test.
function some(obj, predicate, context) {
  predicate = cb(predicate, context);

  var _keys = !isArrayLike(obj) && keys(obj),
      length = (_keys || obj).length;

  for (var index = 0; index < length; index++) {
    var currentKey = _keys ? _keys[index] : index;
    if (predicate(obj[currentKey], currentKey, obj)) return true;
  }

  return false;
}

// Determine if the array or object contains a given item (using `===`).
function contains(obj, item, fromIndex, guard) {
  if (!isArrayLike(obj)) obj = values(obj);
  if (typeof fromIndex != 'number' || guard) fromIndex = 0;
  return indexOf(obj, item, fromIndex) >= 0;
}

// Invoke a method (with arguments) on every item in a collection.
var invoke = restArguments(function (obj, path, args) {
  var contextPath, func;

  if (isFunction(path)) {
    func = path;
  } else if (isArray(path)) {
    contextPath = path.slice(0, -1);
    path = path[path.length - 1];
  }

  return map(obj, function (context) {
    var method = func;

    if (!method) {
      if (contextPath && contextPath.length) {
        context = deepGet(context, contextPath);
      }

      if (context == null) return void 0;
      method = context[path];
    }

    return method == null ? method : method.apply(context, args);
  });
}); // Convenience version of a common use case of `map`: fetching a property.

exports.invoke = invoke;

function pluck(obj, key) {
  return map(obj, property(key));
} // Convenience version of a common use case of `filter`: selecting only objects
// containing specific `key:value` pairs.


function where(obj, attrs) {
  return filter(obj, matcher(attrs));
} // Convenience version of a common use case of `find`: getting the first object
// containing specific `key:value` pairs.


function findWhere(obj, attrs) {
  return find(obj, matcher(attrs));
} // Return the maximum element (or element-based computation).


function max(obj, iteratee, context) {
  var result = -Infinity,
      lastComputed = -Infinity,
      value,
      computed;

  if (iteratee == null || typeof iteratee == 'number' && typeof obj[0] != 'object' && obj != null) {
    obj = isArrayLike(obj) ? obj : values(obj);

    for (var i = 0, length = obj.length; i < length; i++) {
      value = obj[i];

      if (value != null && value > result) {
        result = value;
      }
    }
  } else {
    iteratee = cb(iteratee, context);
    each(obj, function (v, index, list) {
      computed = iteratee(v, index, list);

      if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
        result = v;
        lastComputed = computed;
      }
    });
  }

  return result;
} // Return the minimum element (or element-based computation).


function min(obj, iteratee, context) {
  var result = Infinity,
      lastComputed = Infinity,
      value,
      computed;

  if (iteratee == null || typeof iteratee == 'number' && typeof obj[0] != 'object' && obj != null) {
    obj = isArrayLike(obj) ? obj : values(obj);

    for (var i = 0, length = obj.length; i < length; i++) {
      value = obj[i];

      if (value != null && value < result) {
        result = value;
      }
    }
  } else {
    iteratee = cb(iteratee, context);
    each(obj, function (v, index, list) {
      computed = iteratee(v, index, list);

      if (computed < lastComputed || computed === Infinity && result === Infinity) {
        result = v;
        lastComputed = computed;
      }
    });
  }

  return result;
} // Shuffle a collection.


function shuffle(obj) {
  return sample(obj, Infinity);
} // Sample **n** random values from a collection using the modern version of the
// [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
// If **n** is not specified, returns a single random element.
// The internal `guard` argument allows it to work with `map`.


function sample(obj, n, guard) {
  if (n == null || guard) {
    if (!isArrayLike(obj)) obj = values(obj);
    return obj[random(obj.length - 1)];
  }

  var sample = isArrayLike(obj) ? clone(obj) : values(obj);
  var length = getLength(sample);
  n = Math.max(Math.min(n, length), 0);
  var last = length - 1;

  for (var index = 0; index < n; index++) {
    var rand = random(index, last);
    var temp = sample[index];
    sample[index] = sample[rand];
    sample[rand] = temp;
  }

  return sample.slice(0, n);
} // Sort the object's values by a criterion produced by an iteratee.


function sortBy(obj, iteratee, context) {
  var index = 0;
  iteratee = cb(iteratee, context);
  return pluck(map(obj, function (value, key, list) {
    return {
      value: value,
      index: index++,
      criteria: iteratee(value, key, list)
    };
  }).sort(function (left, right) {
    var a = left.criteria;
    var b = right.criteria;

    if (a !== b) {
      if (a > b || a === void 0) return 1;
      if (a < b || b === void 0) return -1;
    }

    return left.index - right.index;
  }), 'value');
} // An internal function used for aggregate "group by" operations.


function group(behavior, partition) {
  return function (obj, iteratee, context) {
    var result = partition ? [[], []] : {};
    iteratee = cb(iteratee, context);
    each(obj, function (value, index) {
      var key = iteratee(value, index, obj);
      behavior(result, value, key);
    });
    return result;
  };
} // Groups the object's values by a criterion. Pass either a string attribute
// to group by, or a function that returns the criterion.


var groupBy = group(function (result, value, key) {
  if (_has(result, key)) result[key].push(value);else result[key] = [value];
}); // Indexes the object's values by a criterion, similar to `groupBy`, but for
// when you know that your index values will be unique.

exports.groupBy = groupBy;
var indexBy = group(function (result, value, key) {
  result[key] = value;
}); // Counts instances of an object that group by a certain criterion. Pass
// either a string attribute to count by, or a function that returns the
// criterion.

exports.indexBy = indexBy;
var countBy = group(function (result, value, key) {
  if (_has(result, key)) result[key]++;else result[key] = 1;
});
exports.countBy = countBy;
var reStrSymbol = /[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g; // Safely create a real, live array from anything iterable.

function toArray(obj) {
  if (!obj) return [];
  if (isArray(obj)) return slice.call(obj);

  if (isString(obj)) {
    // Keep surrogate pair characters together
    return obj.match(reStrSymbol);
  }

  if (isArrayLike(obj)) return map(obj, identity);
  return values(obj);
} // Return the number of elements in an object.


function size(obj) {
  if (obj == null) return 0;
  return isArrayLike(obj) ? obj.length : keys(obj).length;
} // Split a collection into two arrays: one whose elements all satisfy the given
// predicate, and one whose elements all do not satisfy the predicate.


var partition = group(function (result, value, pass) {
  result[pass ? 0 : 1].push(value);
}, true); // Array Functions
// ---------------
// Get the first element of an array. Passing **n** will return the first N
// values in the array. The **guard** check allows it to work with `map`.

exports.partition = partition;

function first(array, n, guard) {
  if (array == null || array.length < 1) return n == null ? void 0 : [];
  if (n == null || guard) return array[0];
  return initial(array, array.length - n);
}

// Returns everything but the last entry of the array. Especially useful on
// the arguments object. Passing **n** will return all the values in
// the array, excluding the last N.
function initial(array, n, guard) {
  return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
} // Get the last element of an array. Passing **n** will return the last N
// values in the array.


function last(array, n, guard) {
  if (array == null || array.length < 1) return n == null ? void 0 : [];
  if (n == null || guard) return array[array.length - 1];
  return rest(array, Math.max(0, array.length - n));
} // Returns everything but the first entry of the array. Especially useful on
// the arguments object. Passing an **n** will return the rest N values in the
// array.


function rest(array, n, guard) {
  return slice.call(array, n == null || guard ? 1 : n);
}

// Trim out all falsy values from an array.
function compact(array) {
  return filter(array, Boolean);
} // Internal implementation of a recursive `flatten` function.


function _flatten(input, shallow, strict, output) {
  output = output || [];
  var idx = output.length;

  for (var i = 0, length = getLength(input); i < length; i++) {
    var value = input[i];

    if (isArrayLike(value) && (isArray(value) || isArguments(value))) {
      // Flatten current level of array or arguments object.
      if (shallow) {
        var j = 0,
            len = value.length;

        while (j < len) output[idx++] = value[j++];
      } else {
        _flatten(value, shallow, strict, output);

        idx = output.length;
      }
    } else if (!strict) {
      output[idx++] = value;
    }
  }

  return output;
} // Flatten out an array, either recursively (by default), or just one level.


function flatten(array, shallow) {
  return _flatten(array, shallow, false);
} // Return a version of the array that does not contain the specified value(s).


var without = restArguments(function (array, otherArrays) {
  return difference(array, otherArrays);
}); // Produce a duplicate-free version of the array. If the array has already
// been sorted, you have the option of using a faster algorithm.
// The faster algorithm will not work with an iteratee if the iteratee
// is not a one-to-one function, so providing an iteratee will disable
// the faster algorithm.

exports.without = without;

function uniq(array, isSorted, iteratee, context) {
  if (!isBoolean(isSorted)) {
    context = iteratee;
    iteratee = isSorted;
    isSorted = false;
  }

  if (iteratee != null) iteratee = cb(iteratee, context);
  var result = [];
  var seen = [];

  for (var i = 0, length = getLength(array); i < length; i++) {
    var value = array[i],
        computed = iteratee ? iteratee(value, i, array) : value;

    if (isSorted && !iteratee) {
      if (!i || seen !== computed) result.push(value);
      seen = computed;
    } else if (iteratee) {
      if (!contains(seen, computed)) {
        seen.push(computed);
        result.push(value);
      }
    } else if (!contains(result, value)) {
      result.push(value);
    }
  }

  return result;
}

// Produce an array that contains the union: each distinct element from all of
// the passed-in arrays.
var union = restArguments(function (arrays) {
  return uniq(_flatten(arrays, true, true));
}); // Produce an array that contains every item shared between all the
// passed-in arrays.

exports.union = union;

function intersection(array) {
  var result = [];
  var argsLength = arguments.length;

  for (var i = 0, length = getLength(array); i < length; i++) {
    var item = array[i];
    if (contains(result, item)) continue;
    var j;

    for (j = 1; j < argsLength; j++) {
      if (!contains(arguments[j], item)) break;
    }

    if (j === argsLength) result.push(item);
  }

  return result;
} // Take the difference between one array and a number of other arrays.
// Only the elements present in just the first array will remain.


var difference = restArguments(function (array, rest) {
  rest = _flatten(rest, true, true);
  return filter(array, function (value) {
    return !contains(rest, value);
  });
}); // Complement of zip. Unzip accepts an array of arrays and groups
// each array's elements on shared indices.

exports.difference = difference;

function unzip(array) {
  var length = array && max(array, getLength).length || 0;
  var result = Array(length);

  for (var index = 0; index < length; index++) {
    result[index] = pluck(array, index);
  }

  return result;
} // Zip together multiple lists into a single array -- elements that share
// an index go together.


var zip = restArguments(unzip); // Converts lists into objects. Pass either a single array of `[key, value]`
// pairs, or two parallel arrays of the same length -- one of keys, and one of
// the corresponding values. Passing by pairs is the reverse of pairs.

exports.zip = zip;

function object(list, values) {
  var result = {};

  for (var i = 0, length = getLength(list); i < length; i++) {
    if (values) {
      result[list[i]] = values[i];
    } else {
      result[list[i][0]] = list[i][1];
    }
  }

  return result;
} // Generator function to create the findIndex and findLastIndex functions.


function createPredicateIndexFinder(dir) {
  return function (array, predicate, context) {
    predicate = cb(predicate, context);
    var length = getLength(array);
    var index = dir > 0 ? 0 : length - 1;

    for (; index >= 0 && index < length; index += dir) {
      if (predicate(array[index], index, array)) return index;
    }

    return -1;
  };
} // Returns the first index on an array-like that passes a predicate test.


var findIndex = createPredicateIndexFinder(1);
exports.findIndex = findIndex;
var findLastIndex = createPredicateIndexFinder(-1); // Use a comparator function to figure out the smallest index at which
// an object should be inserted so as to maintain order. Uses binary search.

exports.findLastIndex = findLastIndex;

function sortedIndex(array, obj, iteratee, context) {
  iteratee = cb(iteratee, context, 1);
  var value = iteratee(obj);
  var low = 0,
      high = getLength(array);

  while (low < high) {
    var mid = Math.floor((low + high) / 2);
    if (iteratee(array[mid]) < value) low = mid + 1;else high = mid;
  }

  return low;
} // Generator function to create the indexOf and lastIndexOf functions.


function createIndexFinder(dir, predicateFind, sortedIndex) {
  return function (array, item, idx) {
    var i = 0,
        length = getLength(array);

    if (typeof idx == 'number') {
      if (dir > 0) {
        i = idx >= 0 ? idx : Math.max(idx + length, i);
      } else {
        length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
      }
    } else if (sortedIndex && idx && length) {
      idx = sortedIndex(array, item);
      return array[idx] === item ? idx : -1;
    }

    if (item !== item) {
      idx = predicateFind(slice.call(array, i, length), isNaN);
      return idx >= 0 ? idx + i : -1;
    }

    for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
      if (array[idx] === item) return idx;
    }

    return -1;
  };
} // Return the position of the first occurrence of an item in an array,
// or -1 if the item is not included in the array.
// If the array is large and already in sort order, pass `true`
// for **isSorted** to use binary search.


var indexOf = createIndexFinder(1, findIndex, sortedIndex);
exports.indexOf = indexOf;
var lastIndexOf = createIndexFinder(-1, findLastIndex); // Generate an integer Array containing an arithmetic progression. A port of
// the native Python `range()` function. See
// [the Python documentation](https://docs.python.org/library/functions.html#range).

exports.lastIndexOf = lastIndexOf;

function range(start, stop, step) {
  if (stop == null) {
    stop = start || 0;
    start = 0;
  }

  if (!step) {
    step = stop < start ? -1 : 1;
  }

  var length = Math.max(Math.ceil((stop - start) / step), 0);
  var range = Array(length);

  for (var idx = 0; idx < length; idx++, start += step) {
    range[idx] = start;
  }

  return range;
} // Chunk a single array into multiple arrays, each containing `count` or fewer
// items.


function chunk(array, count) {
  if (count == null || count < 1) return [];
  var result = [];
  var i = 0,
      length = array.length;

  while (i < length) {
    result.push(slice.call(array, i, i += count));
  }

  return result;
} // Function (ahem) Functions
// ------------------
// Determines whether to execute a function as a constructor
// or a normal function with the provided arguments.


function executeBound(sourceFunc, boundFunc, context, callingContext, args) {
  if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
  var self = baseCreate(sourceFunc.prototype);
  var result = sourceFunc.apply(self, args);
  if (isObject(result)) return result;
  return self;
} // Create a function bound to a given object (assigning `this`, and arguments,
// optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
// available.


var bind = restArguments(function (func, context, args) {
  if (!isFunction(func)) throw new TypeError('Bind must be called on a function');
  var bound = restArguments(function (callArgs) {
    return executeBound(func, bound, context, this, args.concat(callArgs));
  });
  return bound;
}); // Partially apply a function by creating a version that has had some of its
// arguments pre-filled, without changing its dynamic `this` context. _ acts
// as a placeholder by default, allowing any combination of arguments to be
// pre-filled. Set `partial.placeholder` for a custom placeholder argument.

exports.bind = bind;
var partial = restArguments(function (func, boundArgs) {
  var placeholder = partial.placeholder;

  var bound = function () {
    var position = 0,
        length = boundArgs.length;
    var args = Array(length);

    for (var i = 0; i < length; i++) {
      args[i] = boundArgs[i] === placeholder ? arguments[position++] : boundArgs[i];
    }

    while (position < arguments.length) args.push(arguments[position++]);

    return executeBound(func, bound, this, this, args);
  };

  return bound;
});
exports.partial = partial;
partial.placeholder = _; // Bind a number of an object's methods to that object. Remaining arguments
// are the method names to be bound. Useful for ensuring that all callbacks
// defined on an object belong to it.

var bindAll = restArguments(function (obj, _keys) {
  _keys = _flatten(_keys, false, false);
  var index = _keys.length;
  if (index < 1) throw new Error('bindAll must be passed function names');

  while (index--) {
    var key = _keys[index];
    obj[key] = bind(obj[key], obj);
  }
}); // Memoize an expensive function by storing its results.

exports.bindAll = bindAll;

function memoize(func, hasher) {
  var memoize = function (key) {
    var cache = memoize.cache;
    var address = '' + (hasher ? hasher.apply(this, arguments) : key);
    if (!_has(cache, address)) cache[address] = func.apply(this, arguments);
    return cache[address];
  };

  memoize.cache = {};
  return memoize;
} // Delays a function for the given number of milliseconds, and then calls
// it with the arguments supplied.


var delay = restArguments(function (func, wait, args) {
  return setTimeout(function () {
    return func.apply(null, args);
  }, wait);
}); // Defers a function, scheduling it to run after the current call stack has
// cleared.

exports.delay = delay;
var defer = partial(delay, _, 1); // Returns a function, that, when invoked, will only be triggered at most once
// during a given window of time. Normally, the throttled function will run
// as much as it can, without ever going more than once per `wait` duration;
// but if you'd like to disable the execution on the leading edge, pass
// `{leading: false}`. To disable execution on the trailing edge, ditto.

exports.defer = defer;

function throttle(func, wait, options) {
  var timeout, context, args, result;
  var previous = 0;
  if (!options) options = {};

  var later = function () {
    previous = options.leading === false ? 0 : now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };

  var throttled = function () {
    var _now = now();

    if (!previous && options.leading === false) previous = _now;
    var remaining = wait - (_now - previous);
    context = this;
    args = arguments;

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }

      previous = _now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }

    return result;
  };

  throttled.cancel = function () {
    clearTimeout(timeout);
    previous = 0;
    timeout = context = args = null;
  };

  return throttled;
} // Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.


function debounce(func, wait, immediate) {
  var timeout, result;

  var later = function (context, args) {
    timeout = null;
    if (args) result = func.apply(context, args);
  };

  var debounced = restArguments(function (args) {
    if (timeout) clearTimeout(timeout);

    if (immediate) {
      var callNow = !timeout;
      timeout = setTimeout(later, wait);
      if (callNow) result = func.apply(this, args);
    } else {
      timeout = delay(later, wait, this, args);
    }

    return result;
  });

  debounced.cancel = function () {
    clearTimeout(timeout);
    timeout = null;
  };

  return debounced;
} // Returns the first function passed as an argument to the second,
// allowing you to adjust arguments, run code before and after, and
// conditionally execute the original function.


function wrap(func, wrapper) {
  return partial(wrapper, func);
} // Returns a negated version of the passed-in predicate.


function negate(predicate) {
  return function () {
    return !predicate.apply(this, arguments);
  };
} // Returns a function that is the composition of a list of functions, each
// consuming the return value of the function that follows.


function compose() {
  var args = arguments;
  var start = args.length - 1;
  return function () {
    var i = start;
    var result = args[start].apply(this, arguments);

    while (i--) result = args[i].call(this, result);

    return result;
  };
} // Returns a function that will only be executed on and after the Nth call.


function after(times, func) {
  return function () {
    if (--times < 1) {
      return func.apply(this, arguments);
    }
  };
} // Returns a function that will only be executed up to (but not including) the Nth call.


function before(times, func) {
  var memo;
  return function () {
    if (--times > 0) {
      memo = func.apply(this, arguments);
    }

    if (times <= 1) func = null;
    return memo;
  };
} // Returns a function that will be executed at most one time, no matter how
// often you call it. Useful for lazy initialization.


var once = partial(before, 2); // Object Functions
// ----------------
// Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.

exports.once = once;
var hasEnumBug = !{
  toString: null
}.propertyIsEnumerable('toString');
var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString', 'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

function collectNonEnumProps(obj, _keys) {
  var nonEnumIdx = nonEnumerableProps.length;
  var constructor = obj.constructor;
  var proto = isFunction(constructor) && constructor.prototype || ObjProto; // Constructor is a special case.

  var prop = 'constructor';
  if (_has(obj, prop) && !contains(_keys, prop)) _keys.push(prop);

  while (nonEnumIdx--) {
    prop = nonEnumerableProps[nonEnumIdx];

    if (prop in obj && obj[prop] !== proto[prop] && !contains(_keys, prop)) {
      _keys.push(prop);
    }
  }
} // Retrieve the names of an object's own properties.
// Delegates to **ECMAScript 5**'s native `Object.keys`.


function keys(obj) {
  if (!isObject(obj)) return [];
  if (nativeKeys) return nativeKeys(obj);
  var _keys = [];

  for (var key in obj) if (_has(obj, key)) _keys.push(key); // Ahem, IE < 9.


  if (hasEnumBug) collectNonEnumProps(obj, _keys);
  return _keys;
} // Retrieve all the property names of an object.


function allKeys(obj) {
  if (!isObject(obj)) return [];
  var _keys = [];

  for (var key in obj) _keys.push(key); // Ahem, IE < 9.


  if (hasEnumBug) collectNonEnumProps(obj, _keys);
  return _keys;
} // Retrieve the values of an object's properties.


function values(obj) {
  var _keys = keys(obj);

  var length = _keys.length;
  var values = Array(length);

  for (var i = 0; i < length; i++) {
    values[i] = obj[_keys[i]];
  }

  return values;
} // Returns the results of applying the iteratee to each element of the object.
// In contrast to map it returns an object.


function mapObject(obj, iteratee, context) {
  iteratee = cb(iteratee, context);

  var _keys = keys(obj),
      length = _keys.length,
      results = {};

  for (var index = 0; index < length; index++) {
    var currentKey = _keys[index];
    results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
  }

  return results;
} // Convert an object into a list of `[key, value]` pairs.
// The opposite of object.


function pairs(obj) {
  var _keys = keys(obj);

  var length = _keys.length;
  var pairs = Array(length);

  for (var i = 0; i < length; i++) {
    pairs[i] = [_keys[i], obj[_keys[i]]];
  }

  return pairs;
} // Invert the keys and values of an object. The values must be serializable.


function invert(obj) {
  var result = {};

  var _keys = keys(obj);

  for (var i = 0, length = _keys.length; i < length; i++) {
    result[obj[_keys[i]]] = _keys[i];
  }

  return result;
} // Return a sorted list of the function names available on the object.


function functions(obj) {
  var names = [];

  for (var key in obj) {
    if (isFunction(obj[key])) names.push(key);
  }

  return names.sort();
}

// An internal function for creating assigner functions.
function createAssigner(keysFunc, defaults) {
  return function (obj) {
    var length = arguments.length;
    if (defaults) obj = Object(obj);
    if (length < 2 || obj == null) return obj;

    for (var index = 1; index < length; index++) {
      var source = arguments[index],
          _keys = keysFunc(source),
          l = _keys.length;

      for (var i = 0; i < l; i++) {
        var key = _keys[i];
        if (!defaults || obj[key] === void 0) obj[key] = source[key];
      }
    }

    return obj;
  };
} // Extend a given object with all the properties in passed-in object(s).


var extend = createAssigner(allKeys); // Assigns a given object with all the own properties in the passed-in object(s).
// (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)

exports.extend = extend;
var extendOwn = createAssigner(keys);
exports.assign = exports.extendOwn = extendOwn;

// Returns the first key on an object that passes a predicate test.
function findKey(obj, predicate, context) {
  predicate = cb(predicate, context);

  var _keys = keys(obj),
      key;

  for (var i = 0, length = _keys.length; i < length; i++) {
    key = _keys[i];
    if (predicate(obj[key], key, obj)) return key;
  }
} // Internal pick helper function to determine if `obj` has key `key`.


function keyInObj(value, key, obj) {
  return key in obj;
} // Return a copy of the object only containing the whitelisted properties.


var pick = restArguments(function (obj, _keys) {
  var result = {},
      iteratee = _keys[0];
  if (obj == null) return result;

  if (isFunction(iteratee)) {
    if (_keys.length > 1) iteratee = optimizeCb(iteratee, _keys[1]);
    _keys = allKeys(obj);
  } else {
    iteratee = keyInObj;
    _keys = _flatten(_keys, false, false);
    obj = Object(obj);
  }

  for (var i = 0, length = _keys.length; i < length; i++) {
    var key = _keys[i];
    var value = obj[key];
    if (iteratee(value, key, obj)) result[key] = value;
  }

  return result;
}); // Return a copy of the object without the blacklisted properties.

exports.pick = pick;
var omit = restArguments(function (obj, _keys) {
  var iteratee = _keys[0],
      context;

  if (isFunction(iteratee)) {
    iteratee = negate(iteratee);
    if (_keys.length > 1) context = _keys[1];
  } else {
    _keys = map(_flatten(_keys, false, false), String);

    iteratee = function (value, key) {
      return !contains(_keys, key);
    };
  }

  return pick(obj, iteratee, context);
}); // Fill in a given object with default properties.

exports.omit = omit;
var defaults = createAssigner(allKeys, true); // Creates an object that inherits from the given prototype object.
// If additional properties are provided then they will be added to the
// created object.

exports.defaults = defaults;

function create(prototype, props) {
  var result = baseCreate(prototype);
  if (props) extendOwn(result, props);
  return result;
} // Create a (shallow-cloned) duplicate of an object.


function clone(obj) {
  if (!isObject(obj)) return obj;
  return isArray(obj) ? obj.slice() : extend({}, obj);
} // Invokes interceptor with the obj, and then returns obj.
// The primary purpose of this method is to "tap into" a method chain, in
// order to perform operations on intermediate results within the chain.


function tap(obj, interceptor) {
  interceptor(obj);
  return obj;
} // Returns whether an object has a given set of `key:value` pairs.


function isMatch(object, attrs) {
  var _keys = keys(attrs),
      length = _keys.length;

  if (object == null) return !length;
  var obj = Object(object);

  for (var i = 0; i < length; i++) {
    var key = _keys[i];
    if (attrs[key] !== obj[key] || !(key in obj)) return false;
  }

  return true;
} // Internal recursive comparison function for `isEqual`.


function eq(a, b, aStack, bStack) {
  // Identical objects are equal. `0 === -0`, but they aren't identical.
  // See the [Harmony `egal` proposal](https://wiki.ecmascript.org/doku.php?id=harmony:egal).
  if (a === b) return a !== 0 || 1 / a === 1 / b; // `null` or `undefined` only equal to itself (strict comparison).

  if (a == null || b == null) return false; // `NaN`s are equivalent, but non-reflexive.

  if (a !== a) return b !== b; // Exhaust primitive checks

  var type = typeof a;
  if (type !== 'function' && type !== 'object' && typeof b != 'object') return false;
  return deepEq(a, b, aStack, bStack);
} // Internal recursive comparison function for `isEqual`.


function deepEq(a, b, aStack, bStack) {
  // Unwrap any wrapped objects.
  if (a instanceof _) a = a._wrapped;
  if (b instanceof _) b = b._wrapped; // Compare `[[Class]]` names.

  var className = toString.call(a);
  if (className !== toString.call(b)) return false;

  switch (className) {
    // Strings, numbers, regular expressions, dates, and booleans are compared by value.
    case '[object RegExp]': // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')

    case '[object String]':
      // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
      // equivalent to `new String("5")`.
      return '' + a === '' + b;

    case '[object Number]':
      // `NaN`s are equivalent, but non-reflexive.
      // Object(NaN) is equivalent to NaN.
      if (+a !== +a) return +b !== +b; // An `egal` comparison is performed for other numeric values.

      return +a === 0 ? 1 / +a === 1 / b : +a === +b;

    case '[object Date]':
    case '[object Boolean]':
      // Coerce dates and booleans to numeric primitive values. Dates are compared by their
      // millisecond representations. Note that invalid dates with millisecond representations
      // of `NaN` are not equivalent.
      return +a === +b;

    case '[object Symbol]':
      return SymbolProto.valueOf.call(a) === SymbolProto.valueOf.call(b);
  }

  var areArrays = className === '[object Array]';

  if (!areArrays) {
    if (typeof a != 'object' || typeof b != 'object') return false; // Objects with different constructors are not equivalent, but `Object`s or `Array`s
    // from different frames are.

    var aCtor = a.constructor,
        bCtor = b.constructor;

    if (aCtor !== bCtor && !(isFunction(aCtor) && aCtor instanceof aCtor && isFunction(bCtor) && bCtor instanceof bCtor) && 'constructor' in a && 'constructor' in b) {
      return false;
    }
  } // Assume equality for cyclic structures. The algorithm for detecting cyclic
  // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
  // Initializing stack of traversed objects.
  // It's done here since we only need them for objects and arrays comparison.


  aStack = aStack || [];
  bStack = bStack || [];
  var length = aStack.length;

  while (length--) {
    // Linear search. Performance is inversely proportional to the number of
    // unique nested structures.
    if (aStack[length] === a) return bStack[length] === b;
  } // Add the first object to the stack of traversed objects.


  aStack.push(a);
  bStack.push(b); // Recursively compare objects and arrays.

  if (areArrays) {
    // Compare array lengths to determine if a deep comparison is necessary.
    length = a.length;
    if (length !== b.length) return false; // Deep compare the contents, ignoring non-numeric properties.

    while (length--) {
      if (!eq(a[length], b[length], aStack, bStack)) return false;
    }
  } else {
    // Deep compare objects.
    var _keys = keys(a),
        key;

    length = _keys.length; // Ensure that both objects contain the same number of properties before comparing deep equality.

    if (keys(b).length !== length) return false;

    while (length--) {
      // Deep compare each member
      key = _keys[length];
      if (!(_has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
    }
  } // Remove the first object from the stack of traversed objects.


  aStack.pop();
  bStack.pop();
  return true;
} // Perform a deep comparison to check if two objects are equal.


function isEqual(a, b) {
  return eq(a, b);
} // Is a given array, string, or object empty?
// An "empty" object has no enumerable own-properties.


function isEmpty(obj) {
  if (obj == null) return true;
  if (isArrayLike(obj) && (isArray(obj) || isString(obj) || isArguments(obj))) return obj.length === 0;
  return keys(obj).length === 0;
} // Is a given value a DOM element?


function isElement(obj) {
  return !!(obj && obj.nodeType === 1);
} // Internal function for creating a toString-based type tester.


function tagTester(name) {
  return function (obj) {
    return toString.call(obj) === '[object ' + name + ']';
  };
} // Is a given value an array?
// Delegates to ECMA5's native Array.isArray


var isArray = nativeIsArray || tagTester('Array'); // Is a given variable an object?

exports.isArray = isArray;

function isObject(obj) {
  var type = typeof obj;
  return type === 'function' || type === 'object' && !!obj;
} // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError, isMap, isWeakMap, isSet, isWeakSet.


var isArguments = tagTester('Arguments');
exports.isArguments = isArguments;
var isFunction = tagTester('Function');
exports.isFunction = isFunction;
var isString = tagTester('String');
exports.isString = isString;
var isNumber = tagTester('Number');
exports.isNumber = isNumber;
var isDate = tagTester('Date');
exports.isDate = isDate;
var isRegExp = tagTester('RegExp');
exports.isRegExp = isRegExp;
var isError = tagTester('Error');
exports.isError = isError;
var isSymbol = tagTester('Symbol');
exports.isSymbol = isSymbol;
var isMap = tagTester('Map');
exports.isMap = isMap;
var isWeakMap = tagTester('WeakMap');
exports.isWeakMap = isWeakMap;
var isSet = tagTester('Set');
exports.isSet = isSet;
var isWeakSet = tagTester('WeakSet'); // Define a fallback version of the method in browsers (ahem, IE < 9), where
// there isn't any inspectable "Arguments" type.

exports.isWeakSet = isWeakSet;

(function () {
  if (!isArguments(arguments)) {
    exports.isArguments = isArguments = function (obj) {
      return _has(obj, 'callee');
    };
  }
})(); // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
// IE 11 (#1621), Safari 8 (#1929), and PhantomJS (#2236).


var nodelist = root.document && root.document.childNodes;

if (typeof /./ != 'function' && typeof Int8Array != 'object' && typeof nodelist != 'function') {
  exports.isFunction = isFunction = function (obj) {
    return typeof obj == 'function' || false;
  };
} // Is a given object a finite number?


function isFinite(obj) {
  return !isSymbol(obj) && _isFinite(obj) && !_isNaN(parseFloat(obj));
} // Is the given value `NaN`?


function isNaN(obj) {
  return isNumber(obj) && _isNaN(obj);
} // Is a given value a boolean?


function isBoolean(obj) {
  return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
} // Is a given value equal to null?


function isNull(obj) {
  return obj === null;
} // Is a given variable undefined?


function isUndefined(obj) {
  return obj === void 0;
} // Shortcut function for checking if an object has a given property directly
// on itself (in other words, not on a prototype).


function has(obj, path) {
  if (!isArray(path)) {
    return _has(obj, path);
  }

  var length = path.length;

  for (var i = 0; i < length; i++) {
    var key = path[i];

    if (obj == null || !hasOwnProperty.call(obj, key)) {
      return false;
    }

    obj = obj[key];
  }

  return !!length;
} // Utility Functions
// -----------------
// Keep the identity function around for default iteratees.


function identity(value) {
  return value;
} // Predicate-generating functions. Often useful outside of Underscore.


function constant(value) {
  return function () {
    return value;
  };
}

function noop() {} // Creates a function that, when passed an object, will traverse that object’s
// properties down the given `path`, specified as an array of keys or indexes.


function property(path) {
  if (!isArray(path)) {
    return shallowProperty(path);
  }

  return function (obj) {
    return deepGet(obj, path);
  };
} // Generates a function for a given object that returns a given property.


function propertyOf(obj) {
  if (obj == null) {
    return function () {};
  }

  return function (path) {
    return !isArray(path) ? obj[path] : deepGet(obj, path);
  };
} // Returns a predicate for checking whether an object has a given set of
// `key:value` pairs.


function matcher(attrs) {
  attrs = extendOwn({}, attrs);
  return function (obj) {
    return isMatch(obj, attrs);
  };
}

// Run a function **n** times.
function times(n, iteratee, context) {
  var accum = Array(Math.max(0, n));
  iteratee = optimizeCb(iteratee, context, 1);

  for (var i = 0; i < n; i++) accum[i] = iteratee(i);

  return accum;
} // Return a random integer between min and max (inclusive).


function random(min, max) {
  if (max == null) {
    max = min;
    min = 0;
  }

  return min + Math.floor(Math.random() * (max - min + 1));
} // A (possibly faster) way to get the current timestamp as an integer.


var now = Date.now || function () {
  return new Date().getTime();
}; // List of HTML entities for escaping.


exports.now = now;
var escapeMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '`': '&#x60;'
};
var unescapeMap = invert(escapeMap); // Functions for escaping and unescaping strings to/from HTML interpolation.

function createEscaper(map) {
  var escaper = function (match) {
    return map[match];
  }; // Regexes for identifying a key that needs to be escaped.


  var source = '(?:' + keys(map).join('|') + ')';
  var testRegexp = RegExp(source);
  var replaceRegexp = RegExp(source, 'g');
  return function (string) {
    string = string == null ? '' : '' + string;
    return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
  };
}

var escape = createEscaper(escapeMap);
exports.escape = escape;
var unescape = createEscaper(unescapeMap); // Traverses the children of `obj` along `path`. If a child is a function, it
// is invoked with its parent as context. Returns the value of the final
// child, or `fallback` if any child is undefined.

exports.unescape = unescape;

function result(obj, path, fallback) {
  if (!isArray(path)) path = [path];
  var length = path.length;

  if (!length) {
    return isFunction(fallback) ? fallback.call(obj) : fallback;
  }

  for (var i = 0; i < length; i++) {
    var prop = obj == null ? void 0 : obj[path[i]];

    if (prop === void 0) {
      prop = fallback;
      i = length; // Ensure we don't continue iterating.
    }

    obj = isFunction(prop) ? prop.call(obj) : prop;
  }

  return obj;
} // Generate a unique integer id (unique within the entire client session).
// Useful for temporary DOM ids.


var idCounter = 0;

function uniqueId(prefix) {
  var id = ++idCounter + '';
  return prefix ? prefix + id : id;
} // By default, Underscore uses ERB-style template delimiters, change the
// following template settings to use alternative delimiters.


var templateSettings = _.templateSettings = {
  evaluate: /<%([\s\S]+?)%>/g,
  interpolate: /<%=([\s\S]+?)%>/g,
  escape: /<%-([\s\S]+?)%>/g
}; // When customizing `templateSettings`, if you don't want to define an
// interpolation, evaluation or escaping regex, we need one that is
// guaranteed not to match.

exports.templateSettings = templateSettings;
var noMatch = /(.)^/; // Certain characters need to be escaped so that they can be put into a
// string literal.

var escapes = {
  "'": "'",
  '\\': '\\',
  '\r': 'r',
  '\n': 'n',
  '\u2028': 'u2028',
  '\u2029': 'u2029'
};
var escapeRegExp = /\\|'|\r|\n|\u2028|\u2029/g;

var escapeChar = function (match) {
  return '\\' + escapes[match];
}; // JavaScript micro-templating, similar to John Resig's implementation.
// Underscore templating handles arbitrary delimiters, preserves whitespace,
// and correctly escapes quotes within interpolated code.
// NB: `oldSettings` only exists for backwards compatibility.


function template(text, settings, oldSettings) {
  if (!settings && oldSettings) settings = oldSettings;
  settings = defaults({}, settings, _.templateSettings); // Combine delimiters into one regular expression via alternation.

  var matcher = RegExp([(settings.escape || noMatch).source, (settings.interpolate || noMatch).source, (settings.evaluate || noMatch).source].join('|') + '|$', 'g'); // Compile the template source, escaping string literals appropriately.

  var index = 0;
  var source = "__p+='";
  text.replace(matcher, function (match, escape, interpolate, evaluate, offset) {
    source += text.slice(index, offset).replace(escapeRegExp, escapeChar);
    index = offset + match.length;

    if (escape) {
      source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
    } else if (interpolate) {
      source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
    } else if (evaluate) {
      source += "';\n" + evaluate + "\n__p+='";
    } // Adobe VMs need the match returned to produce the correct offset.


    return match;
  });
  source += "';\n"; // If a variable is not specified, place data values in local scope.

  if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';
  source = "var __t,__p='',__j=Array.prototype.join," + "print=function(){__p+=__j.call(arguments,'');};\n" + source + 'return __p;\n';
  var render;

  try {
    render = new Function(settings.variable || 'obj', '_', source);
  } catch (e) {
    e.source = source;
    throw e;
  }

  var template = function (data) {
    return render.call(this, data, _);
  }; // Provide the compiled source as a convenience for precompilation.


  var argument = settings.variable || 'obj';
  template.source = 'function(' + argument + '){\n' + source + '}';
  return template;
} // Add a "chain" function. Start chaining a wrapped Underscore object.


function chain(obj) {
  var instance = _(obj);

  instance._chain = true;
  return instance;
} // OOP
// ---------------
// If Underscore is called as a function, it returns a wrapped object that
// can be used OO-style. This wrapper holds altered versions of all the
// underscore functions. Wrapped objects may be chained.
// Helper function to continue chaining intermediate results.


function chainResult(instance, obj) {
  return instance._chain ? _(obj).chain() : obj;
} // Add your own custom functions to the Underscore object.


function mixin(obj) {
  each(functions(obj), function (name) {
    var func = _[name] = obj[name];

    _.prototype[name] = function () {
      var args = [this._wrapped];
      push.apply(args, arguments);
      return chainResult(this, func.apply(_, args));
    };
  });
  return _;
} // Add all mutator Array functions to the wrapper.


each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function (name) {
  var method = ArrayProto[name];

  _.prototype[name] = function () {
    var obj = this._wrapped;
    method.apply(obj, arguments);
    if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
    return chainResult(this, obj);
  };
}); // Add all accessor Array functions to the wrapper.

each(['concat', 'join', 'slice'], function (name) {
  var method = ArrayProto[name];

  _.prototype[name] = function () {
    return chainResult(this, method.apply(this._wrapped, arguments));
  };
}); // Extracts the result from a wrapped and chained object.

_.prototype.value = function () {
  return this._wrapped;
}; // Provide unwrapping proxy for some methods used in engine operations
// such as arithmetic and JSON stringification.


_.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

_.prototype.toString = function () {
  return String(this._wrapped);
};
},{}],"../../node_modules/underscore/modules/index-default.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var allExports = _interopRequireWildcard(require("./index.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Add all of the Underscore functions to the wrapper object.
var _ = (0, allExports.mixin)(allExports); // Legacy Node.js API


_._ = _; // Export the Underscore API.

var _default = _;
exports.default = _default;
},{"./index.js":"../../node_modules/underscore/modules/index.js"}],"../../node_modules/underscore/modules/index-all.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _indexDefault.default;
  }
});

var _indexDefault = _interopRequireDefault(require("./index-default.js"));

var _index = require("./index.js");

Object.keys(_index).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index[key];
    }
  });
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./index-default.js":"../../node_modules/underscore/modules/index-default.js","./index.js":"../../node_modules/underscore/modules/index.js"}],"../node_modules/riot/riot.js":[function(require,module,exports) {
var define;
var global = arguments[3];
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function (obj) { return typeof obj; }; } else { _typeof = function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* Riot v3.13.2, @license MIT */
(function (global, factory) {
  (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? factory(exports) : typeof define === 'function' && define.amd ? define(['exports'], factory) : factory(global.riot = {});
})(this, function (exports) {
  'use strict';
  /**
   * Shorter and fast way to select a single node in the DOM
   * @param   { String } selector - unique dom selector
   * @param   { Object } ctx - DOM node where the target of our search will is located
   * @returns { Object } dom node found
   */

  function $(selector, ctx) {
    return (ctx || document).querySelector(selector);
  }

  var // be aware, internal usage
  // ATTENTION: prefix the global dynamic variables with `__`
  // tags instances cache
  __TAGS_CACHE = [],
      // tags implementation cache
  __TAG_IMPL = {},
      YIELD_TAG = 'yield',

  /**
   * Const
   */
  GLOBAL_MIXIN = '__global_mixin',
      // riot specific prefixes or attributes
  ATTRS_PREFIX = 'riot-',
      // Riot Directives
  REF_DIRECTIVES = ['ref', 'data-ref'],
      IS_DIRECTIVE = 'data-is',
      CONDITIONAL_DIRECTIVE = 'if',
      LOOP_DIRECTIVE = 'each',
      LOOP_NO_REORDER_DIRECTIVE = 'no-reorder',
      SHOW_DIRECTIVE = 'show',
      HIDE_DIRECTIVE = 'hide',
      KEY_DIRECTIVE = 'key',
      RIOT_EVENTS_KEY = '__riot-events__',
      // for typeof == '' comparisons
  T_STRING = 'string',
      T_OBJECT = 'object',
      T_UNDEF = 'undefined',
      T_FUNCTION = 'function',
      XLINK_NS = 'http://www.w3.org/1999/xlink',
      SVG_NS = 'http://www.w3.org/2000/svg',
      XLINK_REGEX = /^xlink:(\w+)/,
      WIN = (typeof window === "undefined" ? "undefined" : _typeof(window)) === T_UNDEF ?
  /* istanbul ignore next */
  undefined : window,
      // special native tags that cannot be treated like the others
  RE_SPECIAL_TAGS = /^(?:t(?:body|head|foot|[rhd])|caption|col(?:group)?|opt(?:ion|group))$/,
      RE_SPECIAL_TAGS_NO_OPTION = /^(?:t(?:body|head|foot|[rhd])|caption|col(?:group)?)$/,
      RE_EVENTS_PREFIX = /^on/,
      RE_HTML_ATTRS = /([-\w]+) ?= ?(?:"([^"]*)|'([^']*)|({[^}]*}))/g,
      // some DOM attributes must be normalized
  CASE_SENSITIVE_ATTRIBUTES = {
    'viewbox': 'viewBox',
    'preserveaspectratio': 'preserveAspectRatio'
  },

  /**
   * Matches boolean HTML attributes in the riot tag definition.
   * With a long list like this, a regex is faster than `[].indexOf` in most browsers.
   * @const {RegExp}
   * @see [attributes.md](https://github.com/riot/compiler/blob/dev/doc/attributes.md)
   */
  RE_BOOL_ATTRS = /^(?:disabled|checked|readonly|required|allowfullscreen|auto(?:focus|play)|compact|controls|default|formnovalidate|hidden|ismap|itemscope|loop|multiple|muted|no(?:resize|shade|validate|wrap)?|open|reversed|seamless|selected|sortable|truespeed|typemustmatch)$/,
      // version# for IE 8-11, 0 for others
  IE_VERSION = (WIN && WIN.document ||
  /* istanbul ignore next */
  {}).documentMode | 0;
  /**
   * Create a generic DOM node
   * @param   { String } name - name of the DOM node we want to create
   * @returns { Object } DOM node just created
   */

  function makeElement(name) {
    return name === 'svg' ? document.createElementNS(SVG_NS, name) : document.createElement(name);
  }
  /**
   * Set any DOM attribute
   * @param { Object } dom - DOM node we want to update
   * @param { String } name - name of the property we want to set
   * @param { String } val - value of the property we want to set
   */


  function setAttribute(dom, name, val) {
    var xlink = XLINK_REGEX.exec(name);

    if (xlink && xlink[1]) {
      dom.setAttributeNS(XLINK_NS, xlink[1], val);
    } else {
      dom.setAttribute(name, val);
    }
  }

  var styleNode; // Create cache and shortcut to the correct property

  var cssTextProp;
  var byName = {};
  var needsInject = false; // skip the following code on the server

  if (WIN) {
    styleNode = function () {
      // create a new style element with the correct type
      var newNode = makeElement('style'); // replace any user node or insert the new one into the head

      var userNode = $('style[type=riot]');
      setAttribute(newNode, 'type', 'text/css');
      /* istanbul ignore next */

      if (userNode) {
        if (userNode.id) {
          newNode.id = userNode.id;
        }

        userNode.parentNode.replaceChild(newNode, userNode);
      } else {
        document.head.appendChild(newNode);
      }

      return newNode;
    }();

    cssTextProp = styleNode.styleSheet;
  }
  /**
   * Object that will be used to inject and manage the css of every tag instance
   */


  var styleManager = {
    styleNode: styleNode,

    /**
     * Save a tag style to be later injected into DOM
     * @param { String } css - css string
     * @param { String } name - if it's passed we will map the css to a tagname
     */
    add: function add(css, name) {
      byName[name] = css;
      needsInject = true;
    },

    /**
     * Inject all previously saved tag styles into DOM
     * innerHTML seems slow: http://jsperf.com/riot-insert-style
     */
    inject: function inject() {
      if (!WIN || !needsInject) {
        return;
      }

      needsInject = false;
      var style = Object.keys(byName).map(function (k) {
        return byName[k];
      }).join('\n');
      /* istanbul ignore next */

      if (cssTextProp) {
        cssTextProp.cssText = style;
      } else {
        styleNode.innerHTML = style;
      }
    },

    /**
     * Remove a tag style of injected DOM later.
     * @param {String} name a registered tagname
     */
    remove: function remove(name) {
      delete byName[name];
      needsInject = true;
    }
  };
  /**
   * The riot template engine
   * @version v3.0.8
   */

  /* istanbul ignore next */

  var skipRegex = function () {
    //eslint-disable-line no-unused-vars
    var beforeReChars = '[{(,;:?=|&!^~>%*/';
    var beforeReWords = ['case', 'default', 'do', 'else', 'in', 'instanceof', 'prefix', 'return', 'typeof', 'void', 'yield'];
    var wordsLastChar = beforeReWords.reduce(function (s, w) {
      return s + w.slice(-1);
    }, '');
    var RE_REGEX = /^\/(?=[^*>/])[^[/\\]*(?:(?:\\.|\[(?:\\.|[^\]\\]*)*\])[^[\\/]*)*?\/[gimuy]*/;
    var RE_VN_CHAR = /[$\w]/;

    function prev(code, pos) {
      while (--pos >= 0 && /\s/.test(code[pos])) {}

      return pos;
    }

    function _skipRegex(code, start) {
      var re = /.*/g;
      var pos = re.lastIndex = start++;
      var match = re.exec(code)[0].match(RE_REGEX);

      if (match) {
        var next = pos + match[0].length;
        pos = prev(code, pos);
        var c = code[pos];

        if (pos < 0 || ~beforeReChars.indexOf(c)) {
          return next;
        }

        if (c === '.') {
          if (code[pos - 1] === '.') {
            start = next;
          }
        } else if (c === '+' || c === '-') {
          if (code[--pos] !== c || (pos = prev(code, pos)) < 0 || !RE_VN_CHAR.test(code[pos])) {
            start = next;
          }
        } else if (~wordsLastChar.indexOf(c)) {
          var end = pos + 1;

          while (--pos >= 0 && RE_VN_CHAR.test(code[pos])) {}

          if (~beforeReWords.indexOf(code.slice(pos + 1, end))) {
            start = next;
          }
        }
      }

      return start;
    }

    return _skipRegex;
  }();
  /**
   * riot.util.brackets
   *
   * - `brackets    ` - Returns a string or regex based on its parameter
   * - `brackets.set` - Change the current riot brackets
   *
   * @module
   */

  /* global riot */

  /* istanbul ignore next */


  var brackets = function (UNDEF) {
    var REGLOB = 'g',
        R_MLCOMMS = /\/\*[^*]*\*+(?:[^*\/][^*]*\*+)*\//g,
        R_STRINGS = /"[^"\\]*(?:\\[\S\s][^"\\]*)*"|'[^'\\]*(?:\\[\S\s][^'\\]*)*'|`[^`\\]*(?:\\[\S\s][^`\\]*)*`/g,
        S_QBLOCKS = R_STRINGS.source + '|' + /(?:\breturn\s+|(?:[$\w\)\]]|\+\+|--)\s*(\/)(?![*\/]))/.source + '|' + /\/(?=[^*\/])[^[\/\\]*(?:(?:\[(?:\\.|[^\]\\]*)*\]|\\.)[^[\/\\]*)*?([^<]\/)[gim]*/.source,
        UNSUPPORTED = RegExp('[\\' + 'x00-\\x1F<>a-zA-Z0-9\'",;\\\\]'),
        NEED_ESCAPE = /(?=[[\]()*+?.^$|])/g,
        S_QBLOCK2 = R_STRINGS.source + '|' + /(\/)(?![*\/])/.source,
        FINDBRACES = {
      '(': RegExp('([()])|' + S_QBLOCK2, REGLOB),
      '[': RegExp('([[\\]])|' + S_QBLOCK2, REGLOB),
      '{': RegExp('([{}])|' + S_QBLOCK2, REGLOB)
    },
        DEFAULT = '{ }';
    var _pairs = ['{', '}', '{', '}', /{[^}]*}/, /\\([{}])/g, /\\({)|{/g, RegExp('\\\\(})|([[({])|(})|' + S_QBLOCK2, REGLOB), DEFAULT, /^\s*{\^?\s*([$\w]+)(?:\s*,\s*(\S+))?\s+in\s+(\S.*)\s*}/, /(^|[^\\]){=[\S\s]*?}/];

    var cachedBrackets = UNDEF,
        _regex,
        _cache = [],
        _settings;

    function _loopback(re) {
      return re;
    }

    function _rewrite(re, bp) {
      if (!bp) {
        bp = _cache;
      }

      return new RegExp(re.source.replace(/{/g, bp[2]).replace(/}/g, bp[3]), re.global ? REGLOB : '');
    }

    function _create(pair) {
      if (pair === DEFAULT) {
        return _pairs;
      }

      var arr = pair.split(' ');

      if (arr.length !== 2 || UNSUPPORTED.test(pair)) {
        throw new Error('Unsupported brackets "' + pair + '"');
      }

      arr = arr.concat(pair.replace(NEED_ESCAPE, '\\').split(' '));
      arr[4] = _rewrite(arr[1].length > 1 ? /{[\S\s]*?}/ : _pairs[4], arr);
      arr[5] = _rewrite(pair.length > 3 ? /\\({|})/g : _pairs[5], arr);
      arr[6] = _rewrite(_pairs[6], arr);
      arr[7] = RegExp('\\\\(' + arr[3] + ')|([[({])|(' + arr[3] + ')|' + S_QBLOCK2, REGLOB);
      arr[8] = pair;
      return arr;
    }

    function _brackets(reOrIdx) {
      return reOrIdx instanceof RegExp ? _regex(reOrIdx) : _cache[reOrIdx];
    }

    _brackets.split = function split(str, tmpl, _bp) {
      // istanbul ignore next: _bp is for the compiler
      if (!_bp) {
        _bp = _cache;
      }

      var parts = [],
          match,
          isexpr,
          start,
          pos,
          re = _bp[6];
      var qblocks = [];
      var prevStr = '';
      var mark, lastIndex;
      isexpr = start = re.lastIndex = 0;

      while (match = re.exec(str)) {
        lastIndex = re.lastIndex;
        pos = match.index;

        if (isexpr) {
          if (match[2]) {
            var ch = match[2];
            var rech = FINDBRACES[ch];
            var ix = 1;
            rech.lastIndex = lastIndex;

            while (match = rech.exec(str)) {
              if (match[1]) {
                if (match[1] === ch) {
                  ++ix;
                } else if (! --ix) {
                  break;
                }
              } else {
                rech.lastIndex = pushQBlock(match.index, rech.lastIndex, match[2]);
              }
            }

            re.lastIndex = ix ? str.length : rech.lastIndex;
            continue;
          }

          if (!match[3]) {
            re.lastIndex = pushQBlock(pos, lastIndex, match[4]);
            continue;
          }
        }

        if (!match[1]) {
          unescapeStr(str.slice(start, pos));
          start = re.lastIndex;
          re = _bp[6 + (isexpr ^= 1)];
          re.lastIndex = start;
        }
      }

      if (str && start < str.length) {
        unescapeStr(str.slice(start));
      }

      parts.qblocks = qblocks;
      return parts;

      function unescapeStr(s) {
        if (prevStr) {
          s = prevStr + s;
          prevStr = '';
        }

        if (tmpl || isexpr) {
          parts.push(s && s.replace(_bp[5], '$1'));
        } else {
          parts.push(s);
        }
      }

      function pushQBlock(_pos, _lastIndex, slash) {
        //eslint-disable-line
        if (slash) {
          _lastIndex = skipRegex(str, _pos);
        }

        if (tmpl && _lastIndex > _pos + 2) {
          mark = "\u2057" + qblocks.length + '~';
          qblocks.push(str.slice(_pos, _lastIndex));
          prevStr += str.slice(start, _pos) + mark;
          start = _lastIndex;
        }

        return _lastIndex;
      }
    };

    _brackets.hasExpr = function hasExpr(str) {
      return _cache[4].test(str);
    };

    _brackets.loopKeys = function loopKeys(expr) {
      var m = expr.match(_cache[9]);
      return m ? {
        key: m[1],
        pos: m[2],
        val: _cache[0] + m[3].trim() + _cache[1]
      } : {
        val: expr.trim()
      };
    };

    _brackets.array = function array(pair) {
      return pair ? _create(pair) : _cache;
    };

    function _reset(pair) {
      if ((pair || (pair = DEFAULT)) !== _cache[8]) {
        _cache = _create(pair);
        _regex = pair === DEFAULT ? _loopback : _rewrite;
        _cache[9] = _regex(_pairs[9]);
      }

      cachedBrackets = pair;
    }

    function _setSettings(o) {
      var b;
      o = o || {};
      b = o.brackets;
      Object.defineProperty(o, 'brackets', {
        set: _reset,
        get: function () {
          return cachedBrackets;
        },
        enumerable: true
      });
      _settings = o;

      _reset(b);
    }

    Object.defineProperty(_brackets, 'settings', {
      set: _setSettings,
      get: function () {
        return _settings;
      }
    });
    /* istanbul ignore next: in the browser riot is always in the scope */

    _brackets.settings = typeof riot !== 'undefined' && riot.settings || {};
    _brackets.set = _reset;
    _brackets.skipRegex = skipRegex;
    _brackets.R_STRINGS = R_STRINGS;
    _brackets.R_MLCOMMS = R_MLCOMMS;
    _brackets.S_QBLOCKS = S_QBLOCKS;
    _brackets.S_QBLOCK2 = S_QBLOCK2;
    return _brackets;
  }();
  /**
   * @module tmpl
   *
   * tmpl          - Root function, returns the template value, render with data
   * tmpl.hasExpr  - Test the existence of a expression inside a string
   * tmpl.loopKeys - Get the keys for an 'each' loop (used by `_each`)
   */

  /* istanbul ignore next */


  var tmpl = function () {
    var _cache = {};

    function _tmpl(str, data) {
      if (!str) {
        return str;
      }

      return (_cache[str] || (_cache[str] = _create(str))).call(data, _logErr.bind({
        data: data,
        tmpl: str
      }));
    }

    _tmpl.hasExpr = brackets.hasExpr;
    _tmpl.loopKeys = brackets.loopKeys; // istanbul ignore next

    _tmpl.clearCache = function () {
      _cache = {};
    };

    _tmpl.errorHandler = null;

    function _logErr(err, ctx) {
      err.riotData = {
        tagName: ctx && ctx.__ && ctx.__.tagName,
        _riot_id: ctx && ctx._riot_id //eslint-disable-line camelcase

      };

      if (_tmpl.errorHandler) {
        _tmpl.errorHandler(err);
      } else if (typeof console !== 'undefined' && typeof console.error === 'function') {
        console.error(err.message);
        console.log('<%s> %s', err.riotData.tagName || 'Unknown tag', this.tmpl); // eslint-disable-line

        console.log(this.data); // eslint-disable-line
      }
    }

    function _create(str) {
      var expr = _getTmpl(str);

      if (expr.slice(0, 11) !== 'try{return ') {
        expr = 'return ' + expr;
      }

      return new Function('E', expr + ';'); // eslint-disable-line no-new-func
    }

    var RE_DQUOTE = /\u2057/g;
    var RE_QBMARK = /\u2057(\d+)~/g;

    function _getTmpl(str) {
      var parts = brackets.split(str.replace(RE_DQUOTE, '"'), 1);
      var qstr = parts.qblocks;
      var expr;

      if (parts.length > 2 || parts[0]) {
        var i,
            j,
            list = [];

        for (i = j = 0; i < parts.length; ++i) {
          expr = parts[i];

          if (expr && (expr = i & 1 ? _parseExpr(expr, 1, qstr) : '"' + expr.replace(/\\/g, '\\\\').replace(/\r\n?|\n/g, '\\n').replace(/"/g, '\\"') + '"')) {
            list[j++] = expr;
          }
        }

        expr = j < 2 ? list[0] : '[' + list.join(',') + '].join("")';
      } else {
        expr = _parseExpr(parts[1], 0, qstr);
      }

      if (qstr.length) {
        expr = expr.replace(RE_QBMARK, function (_, pos) {
          return qstr[pos].replace(/\r/g, '\\r').replace(/\n/g, '\\n');
        });
      }

      return expr;
    }

    var RE_CSNAME = /^(?:(-?[_A-Za-z\xA0-\xFF][-\w\xA0-\xFF]*)|\u2057(\d+)~):/;
    var RE_BREND = {
      '(': /[()]/g,
      '[': /[[\]]/g,
      '{': /[{}]/g
    };

    function _parseExpr(expr, asText, qstr) {
      expr = expr.replace(/\s+/g, ' ').trim().replace(/\ ?([[\({},?\.:])\ ?/g, '$1');

      if (expr) {
        var list = [],
            cnt = 0,
            match;

        while (expr && (match = expr.match(RE_CSNAME)) && !match.index) {
          var key,
              jsb,
              re = /,|([[{(])|$/g;
          expr = RegExp.rightContext;
          key = match[2] ? qstr[match[2]].slice(1, -1).trim().replace(/\s+/g, ' ') : match[1];

          while (jsb = (match = re.exec(expr))[1]) {
            skipBraces(jsb, re);
          }

          jsb = expr.slice(0, match.index);
          expr = RegExp.rightContext;
          list[cnt++] = _wrapExpr(jsb, 1, key);
        }

        expr = !cnt ? _wrapExpr(expr, asText) : cnt > 1 ? '[' + list.join(',') + '].join(" ").trim()' : list[0];
      }

      return expr;

      function skipBraces(ch, re) {
        var mm,
            lv = 1,
            ir = RE_BREND[ch];
        ir.lastIndex = re.lastIndex;

        while (mm = ir.exec(expr)) {
          if (mm[0] === ch) {
            ++lv;
          } else if (! --lv) {
            break;
          }
        }

        re.lastIndex = lv ? expr.length : ir.lastIndex;
      }
    } // istanbul ignore next: not both


    var // eslint-disable-next-line max-len
    JS_CONTEXT = '"in this?this:' + ((typeof window === "undefined" ? "undefined" : _typeof(window)) !== 'object' ? 'global' : 'window') + ').',
        JS_VARNAME = /[,{][\$\w]+(?=:)|(^ *|[^$\w\.{])(?!(?:typeof|true|false|null|undefined|in|instanceof|is(?:Finite|NaN)|void|NaN|new|Date|RegExp|Math)(?![$\w]))([$_A-Za-z][$\w]*)/g,
        JS_NOPROPS = /^(?=(\.[$\w]+))\1(?:[^.[(]|$)/;

    function _wrapExpr(expr, asText, key) {
      var tb;
      expr = expr.replace(JS_VARNAME, function (match, p, mvar, pos, s) {
        if (mvar) {
          pos = tb ? 0 : pos + match.length;

          if (mvar !== 'this' && mvar !== 'global' && mvar !== 'window') {
            match = p + '("' + mvar + JS_CONTEXT + mvar;

            if (pos) {
              tb = (s = s[pos]) === '.' || s === '(' || s === '[';
            }
          } else if (pos) {
            tb = !JS_NOPROPS.test(s.slice(pos));
          }
        }

        return match;
      });

      if (tb) {
        expr = 'try{return ' + expr + '}catch(e){E(e,this)}';
      }

      if (key) {
        expr = (tb ? 'function(){' + expr + '}.call(this)' : '(' + expr + ')') + '?"' + key + '":""';
      } else if (asText) {
        expr = 'function(v){' + (tb ? expr.replace('return ', 'v=') : 'v=(' + expr + ')') + ';return v||v===0?v:""}.call(this)';
      }

      return expr;
    }

    _tmpl.version = brackets.version = 'v3.0.8';
    return _tmpl;
  }();
  /* istanbul ignore next */


  var observable = function (el) {
    /**
     * Extend the original object or create a new empty one
     * @type { Object }
     */
    el = el || {};
    /**
     * Private variables
     */

    var callbacks = {},
        slice = Array.prototype.slice;
    /**
     * Public Api
     */
    // extend the el object adding the observable methods

    Object.defineProperties(el, {
      /**
       * Listen to the given `event` ands
       * execute the `callback` each time an event is triggered.
       * @param  { String } event - event id
       * @param  { Function } fn - callback function
       * @returns { Object } el
       */
      on: {
        value: function (event, fn) {
          if (typeof fn == 'function') {
            (callbacks[event] = callbacks[event] || []).push(fn);
          }

          return el;
        },
        enumerable: false,
        writable: false,
        configurable: false
      },

      /**
       * Removes the given `event` listeners
       * @param   { String } event - event id
       * @param   { Function } fn - callback function
       * @returns { Object } el
       */
      off: {
        value: function (event, fn) {
          if (event == '*' && !fn) {
            callbacks = {};
          } else {
            if (fn) {
              var arr = callbacks[event];

              for (var i = 0, cb; cb = arr && arr[i]; ++i) {
                if (cb == fn) {
                  arr.splice(i--, 1);
                }
              }
            } else {
              delete callbacks[event];
            }
          }

          return el;
        },
        enumerable: false,
        writable: false,
        configurable: false
      },

      /**
       * Listen to the given `event` and
       * execute the `callback` at most once
       * @param   { String } event - event id
       * @param   { Function } fn - callback function
       * @returns { Object } el
       */
      one: {
        value: function (event, fn) {
          function on() {
            el.off(event, on);
            fn.apply(el, arguments);
          }

          return el.on(event, on);
        },
        enumerable: false,
        writable: false,
        configurable: false
      },

      /**
       * Execute all callback functions that listen to
       * the given `event`
       * @param   { String } event - event id
       * @returns { Object } el
       */
      trigger: {
        value: function (event) {
          var arguments$1 = arguments; // getting the arguments

          var arglen = arguments.length - 1,
              args = new Array(arglen),
              fns,
              fn,
              i;

          for (i = 0; i < arglen; i++) {
            args[i] = arguments$1[i + 1]; // skip first argument
          }

          fns = slice.call(callbacks[event] || [], 0);

          for (i = 0; fn = fns[i]; ++i) {
            fn.apply(el, args);
          }

          if (callbacks['*'] && event != '*') {
            el.trigger.apply(el, ['*', event].concat(args));
          }

          return el;
        },
        enumerable: false,
        writable: false,
        configurable: false
      }
    });
    return el;
  };
  /**
   * Short alias for Object.getOwnPropertyDescriptor
   */


  function getPropDescriptor(o, k) {
    return Object.getOwnPropertyDescriptor(o, k);
  }
  /**
   * Check if passed argument is undefined
   * @param   { * } value -
   * @returns { Boolean } -
   */


  function isUndefined(value) {
    return _typeof(value) === T_UNDEF;
  }
  /**
   * Check whether object's property could be overridden
   * @param   { Object }  obj - source object
   * @param   { String }  key - object property
   * @returns { Boolean } true if writable
   */


  function isWritable(obj, key) {
    var descriptor = getPropDescriptor(obj, key);
    return isUndefined(obj[key]) || descriptor && descriptor.writable;
  }
  /**
   * Extend any object with other properties
   * @param   { Object } src - source object
   * @returns { Object } the resulting extended object
   *
   * var obj = { foo: 'baz' }
   * extend(obj, {bar: 'bar', foo: 'bar'})
   * console.log(obj) => {bar: 'bar', foo: 'bar'}
   *
   */


  function extend(src) {
    var obj;
    var i = 1;
    var args = arguments;
    var l = args.length;

    for (; i < l; i++) {
      if (obj = args[i]) {
        for (var key in obj) {
          // check if this property of the source object could be overridden
          if (isWritable(src, key)) {
            src[key] = obj[key];
          }
        }
      }
    }

    return src;
  }
  /**
   * Alias for Object.create
   */


  function create(src) {
    return Object.create(src);
  }

  var settings = extend(create(brackets.settings), {
    skipAnonymousTags: true,
    // the "value" attributes will be preserved
    keepValueAttributes: false,
    // handle the auto updates on any DOM event
    autoUpdate: true
  });
  /**
   * Shorter and fast way to select multiple nodes in the DOM
   * @param   { String } selector - DOM selector
   * @param   { Object } ctx - DOM node where the targets of our search will is located
   * @returns { Object } dom nodes found
   */

  function $$(selector, ctx) {
    return [].slice.call((ctx || document).querySelectorAll(selector));
  }
  /**
   * Create a document text node
   * @returns { Object } create a text node to use as placeholder
   */


  function createDOMPlaceholder() {
    return document.createTextNode('');
  }
  /**
   * Toggle the visibility of any DOM node
   * @param   { Object }  dom - DOM node we want to hide
   * @param   { Boolean } show - do we want to show it?
   */


  function toggleVisibility(dom, show) {
    dom.style.display = show ? '' : 'none';
    dom.hidden = show ? false : true;
  }
  /**
   * Get the value of any DOM attribute on a node
   * @param   { Object } dom - DOM node we want to parse
   * @param   { String } name - name of the attribute we want to get
   * @returns { String | undefined } name of the node attribute whether it exists
   */


  function getAttribute(dom, name) {
    return dom.getAttribute(name);
  }
  /**
   * Remove any DOM attribute from a node
   * @param   { Object } dom - DOM node we want to update
   * @param   { String } name - name of the property we want to remove
   */


  function removeAttribute(dom, name) {
    dom.removeAttribute(name);
  }
  /**
   * Set the inner html of any DOM node SVGs included
   * @param { Object } container - DOM node where we'll inject new html
   * @param { String } html - html to inject
   * @param { Boolean } isSvg - svg tags should be treated a bit differently
   */

  /* istanbul ignore next */


  function setInnerHTML(container, html, isSvg) {
    // innerHTML is not supported on svg tags so we neet to treat them differently
    if (isSvg) {
      var node = container.ownerDocument.importNode(new DOMParser().parseFromString("<svg xmlns=\"" + SVG_NS + "\">" + html + "</svg>", 'application/xml').documentElement, true);
      container.appendChild(node);
    } else {
      container.innerHTML = html;
    }
  }
  /**
   * Minimize risk: only zero or one _space_ between attr & value
   * @param   { String }   html - html string we want to parse
   * @param   { Function } fn - callback function to apply on any attribute found
   */


  function walkAttributes(html, fn) {
    if (!html) {
      return;
    }

    var m;

    while (m = RE_HTML_ATTRS.exec(html)) {
      fn(m[1].toLowerCase(), m[2] || m[3] || m[4]);
    }
  }
  /**
   * Create a document fragment
   * @returns { Object } document fragment
   */


  function createFragment() {
    return document.createDocumentFragment();
  }
  /**
   * Insert safely a tag to fix #1962 #1649
   * @param   { HTMLElement } root - children container
   * @param   { HTMLElement } curr - node to insert
   * @param   { HTMLElement } next - node that should preceed the current node inserted
   */


  function safeInsert(root, curr, next) {
    root.insertBefore(curr, next.parentNode && next);
  }
  /**
   * Convert a style object to a string
   * @param   { Object } style - style object we need to parse
   * @returns { String } resulting css string
   * @example
   * styleObjectToString({ color: 'red', height: '10px'}) // => 'color: red; height: 10px'
   */


  function styleObjectToString(style) {
    return Object.keys(style).reduce(function (acc, prop) {
      return acc + " " + prop + ": " + style[prop] + ";";
    }, '');
  }
  /**
   * Walk down recursively all the children tags starting dom node
   * @param   { Object }   dom - starting node where we will start the recursion
   * @param   { Function } fn - callback to transform the child node just found
   * @param   { Object }   context - fn can optionally return an object, which is passed to children
   */


  function walkNodes(dom, fn, context) {
    if (dom) {
      var res = fn(dom, context);
      var next; // stop the recursion

      if (res === false) {
        return;
      }

      dom = dom.firstChild;

      while (dom) {
        next = dom.nextSibling;
        walkNodes(dom, fn, res);
        dom = next;
      }
    }
  }

  var dom = /*#__PURE__*/Object.freeze({
    $$: $$,
    $: $,
    createDOMPlaceholder: createDOMPlaceholder,
    mkEl: makeElement,
    setAttr: setAttribute,
    toggleVisibility: toggleVisibility,
    getAttr: getAttribute,
    remAttr: removeAttribute,
    setInnerHTML: setInnerHTML,
    walkAttrs: walkAttributes,
    createFrag: createFragment,
    safeInsert: safeInsert,
    styleObjectToString: styleObjectToString,
    walkNodes: walkNodes
  });
  /**
   * Check against the null and undefined values
   * @param   { * }  value -
   * @returns {Boolean} -
   */

  function isNil(value) {
    return isUndefined(value) || value === null;
  }
  /**
   * Check if passed argument is empty. Different from falsy, because we dont consider 0 or false to be blank
   * @param { * } value -
   * @returns { Boolean } -
   */


  function isBlank(value) {
    return isNil(value) || value === '';
  }
  /**
   * Check if passed argument is a function
   * @param   { * } value -
   * @returns { Boolean } -
   */


  function isFunction(value) {
    return _typeof(value) === T_FUNCTION;
  }
  /**
   * Check if passed argument is an object, exclude null
   * NOTE: use isObject(x) && !isArray(x) to excludes arrays.
   * @param   { * } value -
   * @returns { Boolean } -
   */


  function isObject(value) {
    return value && _typeof(value) === T_OBJECT; // typeof null is 'object'
  }
  /**
   * Check if a DOM node is an svg tag or part of an svg
   * @param   { HTMLElement }  el - node we want to test
   * @returns {Boolean} true if it's an svg node
   */


  function isSvg(el) {
    var owner = el.ownerSVGElement;
    return !!owner || owner === null;
  }
  /**
   * Check if passed argument is a kind of array
   * @param   { * } value -
   * @returns { Boolean } -
   */


  function isArray(value) {
    return Array.isArray(value) || value instanceof Array;
  }
  /**
   * Check if the passed argument is a boolean attribute
   * @param   { String } value -
   * @returns { Boolean } -
   */


  function isBoolAttr(value) {
    return RE_BOOL_ATTRS.test(value);
  }
  /**
   * Check if passed argument is a string
   * @param   { * } value -
   * @returns { Boolean } -
   */


  function isString(value) {
    return _typeof(value) === T_STRING;
  }

  var check = /*#__PURE__*/Object.freeze({
    isBlank: isBlank,
    isFunction: isFunction,
    isObject: isObject,
    isSvg: isSvg,
    isWritable: isWritable,
    isArray: isArray,
    isBoolAttr: isBoolAttr,
    isNil: isNil,
    isString: isString,
    isUndefined: isUndefined
  });
  /**
   * Check whether an array contains an item
   * @param   { Array } array - target array
   * @param   { * } item - item to test
   * @returns { Boolean } -
   */

  function contains(array, item) {
    return array.indexOf(item) !== -1;
  }
  /**
   * Specialized function for looping an array-like collection with `each={}`
   * @param   { Array } list - collection of items
   * @param   {Function} fn - callback function
   * @returns { Array } the array looped
   */


  function each(list, fn) {
    var len = list ? list.length : 0;
    var i = 0;

    for (; i < len; i++) {
      fn(list[i], i);
    }

    return list;
  }
  /**
   * Faster String startsWith alternative
   * @param   { String } str - source string
   * @param   { String } value - test string
   * @returns { Boolean } -
   */


  function startsWith(str, value) {
    return str.slice(0, value.length) === value;
  }
  /**
   * Function returning always a unique identifier
   * @returns { Number } - number from 0...n
   */


  var uid = function uid() {
    var i = -1;
    return function () {
      return ++i;
    };
  }();
  /**
   * Helper function to set an immutable property
   * @param   { Object } el - object where the new property will be set
   * @param   { String } key - object key where the new property will be stored
   * @param   { * } value - value of the new property
   * @param   { Object } options - set the propery overriding the default options
   * @returns { Object } - the initial object
   */


  function define(el, key, value, options) {
    Object.defineProperty(el, key, extend({
      value: value,
      enumerable: false,
      writable: false,
      configurable: true
    }, options));
    return el;
  }
  /**
   * Convert a string containing dashes to camel case
   * @param   { String } str - input string
   * @returns { String } my-string -> myString
   */


  function toCamel(str) {
    return str.replace(/-(\w)/g, function (_, c) {
      return c.toUpperCase();
    });
  }
  /**
   * Warn a message via console
   * @param   {String} message - warning message
   */


  function warn(message) {
    if (console && console.warn) {
      console.warn(message);
    }
  }

  var misc = /*#__PURE__*/Object.freeze({
    contains: contains,
    each: each,
    getPropDescriptor: getPropDescriptor,
    startsWith: startsWith,
    uid: uid,
    defineProperty: define,
    objectCreate: create,
    extend: extend,
    toCamel: toCamel,
    warn: warn
  });
  /**
   * Set the property of an object for a given key. If something already
   * exists there, then it becomes an array containing both the old and new value.
   * @param { Object } obj - object on which to set the property
   * @param { String } key - property name
   * @param { Object } value - the value of the property to be set
   * @param { Boolean } ensureArray - ensure that the property remains an array
   * @param { Number } index - add the new item in a certain array position
   */

  function arrayishAdd(obj, key, value, ensureArray, index) {
    var dest = obj[key];
    var isArr = isArray(dest);
    var hasIndex = !isUndefined(index);

    if (dest && dest === value) {
      return;
    } // if the key was never set, set it once


    if (!dest && ensureArray) {
      obj[key] = [value];
    } else if (!dest) {
      obj[key] = value;
    } // if it was an array and not yet set
    else {
        if (isArr) {
          var oldIndex = dest.indexOf(value); // this item never changed its position

          if (oldIndex === index) {
            return;
          } // remove the item from its old position


          if (oldIndex !== -1) {
            dest.splice(oldIndex, 1);
          } // move or add the item


          if (hasIndex) {
            dest.splice(index, 0, value);
          } else {
            dest.push(value);
          }
        } else {
          obj[key] = [dest, value];
        }
      }
  }
  /**
   * Detect the tag implementation by a DOM node
   * @param   { Object } dom - DOM node we need to parse to get its tag implementation
   * @returns { Object } it returns an object containing the implementation of a custom tag (template and boot function)
   */


  function get(dom) {
    return dom.tagName && __TAG_IMPL[getAttribute(dom, IS_DIRECTIVE) || getAttribute(dom, IS_DIRECTIVE) || dom.tagName.toLowerCase()];
  }
  /**
   * Get the tag name of any DOM node
   * @param   { Object } dom - DOM node we want to parse
   * @param   { Boolean } skipDataIs - hack to ignore the data-is attribute when attaching to parent
   * @returns { String } name to identify this dom node in riot
   */


  function getName(dom, skipDataIs) {
    var child = get(dom);
    var namedTag = !skipDataIs && getAttribute(dom, IS_DIRECTIVE);
    return namedTag && !tmpl.hasExpr(namedTag) ? namedTag : child ? child.name : dom.tagName.toLowerCase();
  }
  /**
   * Return a temporary context containing also the parent properties
   * @this Tag
   * @param { Tag } - temporary tag context containing all the parent properties
   */


  function inheritParentProps() {
    if (this.parent) {
      return extend(create(this), this.parent);
    }

    return this;
  }
  /*
    Includes hacks needed for the Internet Explorer version 9 and below
    See: http://kangax.github.io/compat-table/es5/#ie8
         http://codeplanet.io/dropping-ie8/
  */


  var reHasYield = /<yield\b/i,
      reYieldAll = /<yield\s*(?:\/>|>([\S\s]*?)<\/yield\s*>|>)/ig,
      reYieldSrc = /<yield\s+to=['"]([^'">]*)['"]\s*>([\S\s]*?)<\/yield\s*>/ig,
      reYieldDest = /<yield\s+from=['"]?([-\w]+)['"]?\s*(?:\/>|>([\S\s]*?)<\/yield\s*>)/ig,
      rootEls = {
    tr: 'tbody',
    th: 'tr',
    td: 'tr',
    col: 'colgroup'
  },
      tblTags = IE_VERSION && IE_VERSION < 10 ? RE_SPECIAL_TAGS : RE_SPECIAL_TAGS_NO_OPTION,
      GENERIC = 'div',
      SVG = 'svg';
  /*
    Creates the root element for table or select child elements:
    tr/th/td/thead/tfoot/tbody/caption/col/colgroup/option/optgroup
  */

  function specialTags(el, tmpl, tagName) {
    var select = tagName[0] === 'o',
        parent = select ? 'select>' : 'table>'; // trim() is important here, this ensures we don't have artifacts,
    // so we can check if we have only one element inside the parent

    el.innerHTML = '<' + parent + tmpl.trim() + '</' + parent;
    parent = el.firstChild; // returns the immediate parent if tr/th/td/col is the only element, if not
    // returns the whole tree, as this can include additional elements

    /* istanbul ignore next */

    if (select) {
      parent.selectedIndex = -1; // for IE9, compatible w/current riot behavior
    } else {
      // avoids insertion of cointainer inside container (ex: tbody inside tbody)
      var tname = rootEls[tagName];

      if (tname && parent.childElementCount === 1) {
        parent = $(tname, parent);
      }
    }

    return parent;
  }
  /*
    Replace the yield tag from any tag template with the innerHTML of the
    original tag in the page
  */


  function replaceYield(tmpl, html) {
    // do nothing if no yield
    if (!reHasYield.test(tmpl)) {
      return tmpl;
    } // be careful with #1343 - string on the source having `$1`


    var src = {};
    html = html && html.replace(reYieldSrc, function (_, ref, text) {
      src[ref] = src[ref] || text; // preserve first definition

      return '';
    }).trim();
    return tmpl.replace(reYieldDest, function (_, ref, def) {
      // yield with from - to attrs
      return src[ref] || def || '';
    }).replace(reYieldAll, function (_, def) {
      // yield without any "from"
      return html || def || '';
    });
  }
  /**
   * Creates a DOM element to wrap the given content. Normally an `DIV`, but can be
   * also a `TABLE`, `SELECT`, `TBODY`, `TR`, or `COLGROUP` element.
   *
   * @param   { String } tmpl  - The template coming from the custom tag definition
   * @param   { String } html - HTML content that comes from the DOM element where you
   *           will mount the tag, mostly the original tag in the page
   * @param   { Boolean } isSvg - true if the root node is an svg
   * @returns { HTMLElement } DOM element with _tmpl_ merged through `YIELD` with the _html_.
   */


  function mkdom(tmpl, html, isSvg) {
    var match = tmpl && tmpl.match(/^\s*<([-\w]+)/);
    var tagName = match && match[1].toLowerCase();
    var el = makeElement(isSvg ? SVG : GENERIC); // replace all the yield tags with the tag inner html

    tmpl = replaceYield(tmpl, html);
    /* istanbul ignore next */

    if (tblTags.test(tagName)) {
      el = specialTags(el, tmpl, tagName);
    } else {
      setInnerHTML(el, tmpl, isSvg);
    }

    return el;
  }

  var EVENT_ATTR_RE = /^on/;
  /**
   * True if the event attribute starts with 'on'
   * @param   { String } attribute - event attribute
   * @returns { Boolean }
   */

  function isEventAttribute(attribute) {
    return EVENT_ATTR_RE.test(attribute);
  }
  /**
   * Loop backward all the parents tree to detect the first custom parent tag
   * @param   { Object } tag - a Tag instance
   * @returns { Object } the instance of the first custom parent tag found
   */


  function getImmediateCustomParent(tag) {
    var ptag = tag;

    while (ptag.__.isAnonymous) {
      if (!ptag.parent) {
        break;
      }

      ptag = ptag.parent;
    }

    return ptag;
  }
  /**
   * Trigger DOM events
   * @param   { HTMLElement } dom - dom element target of the event
   * @param   { Function } handler - user function
   * @param   { Object } e - event object
   */


  function handleEvent(dom, handler, e) {
    var ptag = this.__.parent;
    var item = this.__.item;

    if (!item) {
      while (ptag && !item) {
        item = ptag.__.item;
        ptag = ptag.__.parent;
      }
    } // override the event properties

    /* istanbul ignore next */


    if (isWritable(e, 'currentTarget')) {
      e.currentTarget = dom;
    }
    /* istanbul ignore next */


    if (isWritable(e, 'target')) {
      e.target = e.srcElement;
    }
    /* istanbul ignore next */


    if (isWritable(e, 'which')) {
      e.which = e.charCode || e.keyCode;
    }

    e.item = item;
    handler.call(this, e); // avoid auto updates

    if (!settings.autoUpdate) {
      return;
    }

    if (!e.preventUpdate) {
      var p = getImmediateCustomParent(this); // fixes #2083

      if (p.isMounted) {
        p.update();
      }
    }
  }
  /**
   * Attach an event to a DOM node
   * @param { String } name - event name
   * @param { Function } handler - event callback
   * @param { Object } dom - dom node
   * @param { Tag } tag - tag instance
   */


  function setEventHandler(name, handler, dom, tag) {
    var eventName;
    var cb = handleEvent.bind(tag, dom, handler); // avoid to bind twice the same event
    // possible fix for #2332

    dom[name] = null; // normalize event name

    eventName = name.replace(RE_EVENTS_PREFIX, ''); // cache the listener into the listeners array

    if (!contains(tag.__.listeners, dom)) {
      tag.__.listeners.push(dom);
    }

    if (!dom[RIOT_EVENTS_KEY]) {
      dom[RIOT_EVENTS_KEY] = {};
    }

    if (dom[RIOT_EVENTS_KEY][name]) {
      dom.removeEventListener(eventName, dom[RIOT_EVENTS_KEY][name]);
    }

    dom[RIOT_EVENTS_KEY][name] = cb;
    dom.addEventListener(eventName, cb, false);
  }
  /**
   * Create a new child tag including it correctly into its parent
   * @param   { Object } child - child tag implementation
   * @param   { Object } opts - tag options containing the DOM node where the tag will be mounted
   * @param   { String } innerHTML - inner html of the child node
   * @param   { Object } parent - instance of the parent tag including the child custom tag
   * @returns { Object } instance of the new child tag just created
   */


  function initChild(child, opts, innerHTML, parent) {
    var tag = createTag(child, opts, innerHTML);
    var tagName = opts.tagName || getName(opts.root, true);
    var ptag = getImmediateCustomParent(parent); // fix for the parent attribute in the looped elements

    define(tag, 'parent', ptag); // store the real parent tag
    // in some cases this could be different from the custom parent tag
    // for example in nested loops

    tag.__.parent = parent; // add this tag to the custom parent tag

    arrayishAdd(ptag.tags, tagName, tag); // and also to the real parent tag

    if (ptag !== parent) {
      arrayishAdd(parent.tags, tagName, tag);
    }

    return tag;
  }
  /**
   * Removes an item from an object at a given key. If the key points to an array,
   * then the item is just removed from the array.
   * @param { Object } obj - object on which to remove the property
   * @param { String } key - property name
   * @param { Object } value - the value of the property to be removed
   * @param { Boolean } ensureArray - ensure that the property remains an array
  */


  function arrayishRemove(obj, key, value, ensureArray) {
    if (isArray(obj[key])) {
      var index = obj[key].indexOf(value);

      if (index !== -1) {
        obj[key].splice(index, 1);
      }

      if (!obj[key].length) {
        delete obj[key];
      } else if (obj[key].length === 1 && !ensureArray) {
        obj[key] = obj[key][0];
      }
    } else if (obj[key] === value) {
      delete obj[key];
    } // otherwise just delete the key

  }
  /**
   * Adds the elements for a virtual tag
   * @this Tag
   * @param { Node } src - the node that will do the inserting or appending
   * @param { Tag } target - only if inserting, insert before this tag's first child
   */


  function makeVirtual(src, target) {
    var this$1 = this;
    var head = createDOMPlaceholder();
    var tail = createDOMPlaceholder();
    var frag = createFragment();
    var sib;
    var el;
    this.root.insertBefore(head, this.root.firstChild);
    this.root.appendChild(tail);
    this.__.head = el = head;
    this.__.tail = tail;

    while (el) {
      sib = el.nextSibling;
      frag.appendChild(el);

      this$1.__.virts.push(el); // hold for unmounting


      el = sib;
    }

    if (target) {
      src.insertBefore(frag, target.__.head);
    } else {
      src.appendChild(frag);
    }
  }
  /**
   * makes a tag virtual and replaces a reference in the dom
   * @this Tag
   * @param { tag } the tag to make virtual
   * @param { ref } the dom reference location
   */


  function makeReplaceVirtual(tag, ref) {
    if (!ref.parentNode) {
      return;
    }

    var frag = createFragment();
    makeVirtual.call(tag, frag);
    ref.parentNode.replaceChild(frag, ref);
  }
  /**
   * Update dynamically created data-is tags with changing expressions
   * @param { Object } expr - expression tag and expression info
   * @param { Tag }    parent - parent for tag creation
   * @param { String } tagName - tag implementation we want to use
   */


  function updateDataIs(expr, parent, tagName) {
    var tag = expr.tag || expr.dom._tag;
    var ref;
    var ref$1 = tag ? tag.__ : {};
    var head = ref$1.head;
    var isVirtual = expr.dom.tagName === 'VIRTUAL';

    if (tag && expr.tagName === tagName) {
      tag.update();
      return;
    } // sync _parent to accommodate changing tagnames


    if (tag) {
      // need placeholder before unmount
      if (isVirtual) {
        ref = createDOMPlaceholder();
        head.parentNode.insertBefore(ref, head);
      }

      tag.unmount(true);
    } // unable to get the tag name


    if (!isString(tagName)) {
      return;
    }

    expr.impl = __TAG_IMPL[tagName]; // unknown implementation

    if (!expr.impl) {
      return;
    }

    expr.tag = tag = initChild(expr.impl, {
      root: expr.dom,
      parent: parent,
      tagName: tagName
    }, expr.dom.innerHTML, parent);
    each(expr.attrs, function (a) {
      return setAttribute(tag.root, a.name, a.value);
    });
    expr.tagName = tagName;
    tag.mount(); // root exist first time, after use placeholder

    if (isVirtual) {
      makeReplaceVirtual(tag, ref || tag.root);
    } // parent is the placeholder tag, not the dynamic tag so clean up


    parent.__.onUnmount = function () {
      var delName = tag.opts.dataIs;
      arrayishRemove(tag.parent.tags, delName, tag);
      arrayishRemove(tag.__.parent.tags, delName, tag);
      tag.unmount();
    };
  }
  /**
   * Nomalize any attribute removing the "riot-" prefix
   * @param   { String } attrName - original attribute name
   * @returns { String } valid html attribute name
   */


  function normalizeAttrName(attrName) {
    if (!attrName) {
      return null;
    }

    attrName = attrName.replace(ATTRS_PREFIX, '');

    if (CASE_SENSITIVE_ATTRIBUTES[attrName]) {
      attrName = CASE_SENSITIVE_ATTRIBUTES[attrName];
    }

    return attrName;
  }
  /**
   * Update on single tag expression
   * @this Tag
   * @param { Object } expr - expression logic
   * @returns { undefined }
   */


  function updateExpression(expr) {
    if (this.root && getAttribute(this.root, 'virtualized')) {
      return;
    }

    var dom = expr.dom; // remove the riot- prefix

    var attrName = normalizeAttrName(expr.attr);
    var isToggle = contains([SHOW_DIRECTIVE, HIDE_DIRECTIVE], attrName);
    var isVirtual = expr.root && expr.root.tagName === 'VIRTUAL';
    var ref = this.__;
    var isAnonymous = ref.isAnonymous;
    var parent = dom && (expr.parent || dom.parentNode);
    var keepValueAttributes = settings.keepValueAttributes; // detect the style attributes

    var isStyleAttr = attrName === 'style';
    var isClassAttr = attrName === 'class';
    var isValueAttr = attrName === 'value';
    var value; // if it's a tag we could totally skip the rest

    if (expr._riot_id) {
      if (expr.__.wasCreated) {
        expr.update(); // if it hasn't been mounted yet, do that now.
      } else {
        expr.mount();

        if (isVirtual) {
          makeReplaceVirtual(expr, expr.root);
        }
      }

      return;
    } // if this expression has the update method it means it can handle the DOM changes by itself


    if (expr.update) {
      return expr.update();
    }

    var context = isToggle && !isAnonymous ? inheritParentProps.call(this) : this; // ...it seems to be a simple expression so we try to calculate its value

    value = tmpl(expr.expr, context);
    var hasValue = !isBlank(value);
    var isObj = isObject(value); // convert the style/class objects to strings

    if (isObj) {
      if (isClassAttr) {
        value = tmpl(JSON.stringify(value), this);
      } else if (isStyleAttr) {
        value = styleObjectToString(value);
      }
    } // remove original attribute


    if (expr.attr && ( // the original attribute can be removed only if we are parsing the original expression
    !expr.wasParsedOnce || // or its value is false
    value === false || // or if its value is currently falsy...
    // We will keep the "value" attributes if the "keepValueAttributes"
    // is enabled though
    !hasValue && (!isValueAttr || isValueAttr && !keepValueAttributes))) {
      // remove either riot-* attributes or just the attribute name
      removeAttribute(dom, getAttribute(dom, expr.attr) ? expr.attr : attrName);
    } // for the boolean attributes we don't need the value
    // we can convert it to checked=true to checked=checked


    if (expr.bool) {
      value = value ? attrName : false;
    }

    if (expr.isRtag) {
      return updateDataIs(expr, this, value);
    }

    if (expr.wasParsedOnce && expr.value === value) {
      return;
    } // update the expression value


    expr.value = value;
    expr.wasParsedOnce = true; // if the value is an object (and it's not a style or class attribute) we can not do much more with it

    if (isObj && !isClassAttr && !isStyleAttr && !isToggle) {
      return;
    } // avoid to render undefined/null values


    if (!hasValue) {
      value = '';
    } // textarea and text nodes have no attribute name


    if (!attrName) {
      // about #815 w/o replace: the browser converts the value to a string,
      // the comparison by "==" does too, but not in the server
      value += ''; // test for parent avoids error with invalid assignment to nodeValue

      if (parent) {
        // cache the parent node because somehow it will become null on IE
        // on the next iteration
        expr.parent = parent;

        if (parent.tagName === 'TEXTAREA') {
          parent.value = value; // #1113

          if (!IE_VERSION) {
            dom.nodeValue = value;
          } // #1625 IE throws here, nodeValue

        } // will be available on 'updated'
        else {
            dom.nodeValue = value;
          }
      }

      return;
    }

    switch (true) {
      // handle events binding
      case isFunction(value):
        if (isEventAttribute(attrName)) {
          setEventHandler(attrName, value, dom, this);
        }

        break;
      // show / hide

      case isToggle:
        toggleVisibility(dom, attrName === HIDE_DIRECTIVE ? !value : value);
        break;
      // handle attributes

      default:
        if (expr.bool) {
          dom[attrName] = value;
        }

        if (isValueAttr && dom.value !== value) {
          dom.value = value;
        } else if (hasValue && value !== false) {
          setAttribute(dom, attrName, value);
        } // make sure that in case of style changes
        // the element stays hidden


        if (isStyleAttr && dom.hidden) {
          toggleVisibility(dom, false);
        }

    }
  }
  /**
   * Update all the expressions in a Tag instance
   * @this Tag
   * @param { Array } expressions - expression that must be re evaluated
   */


  function update(expressions) {
    each(expressions, updateExpression.bind(this));
  }
  /**
   * We need to update opts for this tag. That requires updating the expressions
   * in any attributes on the tag, and then copying the result onto opts.
   * @this Tag
   * @param   {Boolean} isLoop - is it a loop tag?
   * @param   { Tag }  parent - parent tag node
   * @param   { Boolean }  isAnonymous - is it a tag without any impl? (a tag not registered)
   * @param   { Object }  opts - tag options
   * @param   { Array }  instAttrs - tag attributes array
   */


  function updateOpts(isLoop, parent, isAnonymous, opts, instAttrs) {
    // isAnonymous `each` tags treat `dom` and `root` differently. In this case
    // (and only this case) we don't need to do updateOpts, because the regular parse
    // will update those attrs. Plus, isAnonymous tags don't need opts anyway
    if (isLoop && isAnonymous) {
      return;
    }

    var ctx = isLoop ? inheritParentProps.call(this) : parent || this;
    each(instAttrs, function (attr) {
      if (attr.expr) {
        updateExpression.call(ctx, attr.expr);
      } // normalize the attribute names


      opts[toCamel(attr.name).replace(ATTRS_PREFIX, '')] = attr.expr ? attr.expr.value : attr.value;
    });
  }
  /**
   * Update the tag expressions and options
   * @param { Tag } tag - tag object
   * @param { * } data - data we want to use to extend the tag properties
   * @param { Array } expressions - component expressions array
   * @returns { Tag } the current tag instance
   */


  function componentUpdate(tag, data, expressions) {
    var __ = tag.__;
    var nextOpts = {};
    var canTrigger = tag.isMounted && !__.skipAnonymous; // inherit properties from the parent tag

    if (__.isAnonymous && __.parent) {
      extend(tag, __.parent);
    }

    extend(tag, data);
    updateOpts.apply(tag, [__.isLoop, __.parent, __.isAnonymous, nextOpts, __.instAttrs]);

    if (canTrigger && tag.isMounted && isFunction(tag.shouldUpdate) && !tag.shouldUpdate(data, nextOpts)) {
      return tag;
    }

    extend(tag.opts, nextOpts);

    if (canTrigger) {
      tag.trigger('update', data);
    }

    update.call(tag, expressions);

    if (canTrigger) {
      tag.trigger('updated');
    }

    return tag;
  }
  /**
   * Get selectors for tags
   * @param   { Array } tags - tag names to select
   * @returns { String } selector
   */


  function query(tags) {
    // select all tags
    if (!tags) {
      var keys = Object.keys(__TAG_IMPL);
      return keys + query(keys);
    }

    return tags.filter(function (t) {
      return !/[^-\w]/.test(t);
    }).reduce(function (list, t) {
      var name = t.trim().toLowerCase();
      return list + ",[" + IS_DIRECTIVE + "=\"" + name + "\"]";
    }, '');
  }
  /**
   * Another way to create a riot tag a bit more es6 friendly
   * @param { HTMLElement } el - tag DOM selector or DOM node/s
   * @param { Object } opts - tag logic
   * @returns { Tag } new riot tag instance
   */


  function Tag(el, opts) {
    // get the tag properties from the class constructor
    var ref = this;
    var name = ref.name;
    var tmpl = ref.tmpl;
    var css = ref.css;
    var attrs = ref.attrs;
    var onCreate = ref.onCreate; // register a new tag and cache the class prototype

    if (!__TAG_IMPL[name]) {
      tag(name, tmpl, css, attrs, onCreate); // cache the class constructor

      __TAG_IMPL[name].class = this.constructor;
    } // mount the tag using the class instance


    mount$1(el, name, opts, this); // inject the component css

    if (css) {
      styleManager.inject();
    }

    return this;
  }
  /**
   * Create a new riot tag implementation
   * @param   { String }   name - name/id of the new riot tag
   * @param   { String }   tmpl - tag template
   * @param   { String }   css - custom tag css
   * @param   { String }   attrs - root tag attributes
   * @param   { Function } fn - user function
   * @returns { String } name/id of the tag just created
   */


  function tag(name, tmpl, css, attrs, fn) {
    if (isFunction(attrs)) {
      fn = attrs;

      if (/^[\w-]+\s?=/.test(css)) {
        attrs = css;
        css = '';
      } else {
        attrs = '';
      }
    }

    if (css) {
      if (isFunction(css)) {
        fn = css;
      } else {
        styleManager.add(css, name);
      }
    }

    name = name.toLowerCase();
    __TAG_IMPL[name] = {
      name: name,
      tmpl: tmpl,
      attrs: attrs,
      fn: fn
    };
    return name;
  }
  /**
   * Create a new riot tag implementation (for use by the compiler)
   * @param   { String }   name - name/id of the new riot tag
   * @param   { String }   tmpl - tag template
   * @param   { String }   css - custom tag css
   * @param   { String }   attrs - root tag attributes
   * @param   { Function } fn - user function
   * @returns { String } name/id of the tag just created
   */


  function tag2(name, tmpl, css, attrs, fn) {
    if (css) {
      styleManager.add(css, name);
    }

    __TAG_IMPL[name] = {
      name: name,
      tmpl: tmpl,
      attrs: attrs,
      fn: fn
    };
    return name;
  }
  /**
   * Mount a tag using a specific tag implementation
   * @param   { * } selector - tag DOM selector or DOM node/s
   * @param   { String } tagName - tag implementation name
   * @param   { Object } opts - tag logic
   * @returns { Array } new tags instances
   */


  function mount(selector, tagName, opts) {
    var tags = [];
    var elem, allTags;

    function pushTagsTo(root) {
      if (root.tagName) {
        var riotTag = getAttribute(root, IS_DIRECTIVE),
            tag; // have tagName? force riot-tag to be the same

        if (tagName && riotTag !== tagName) {
          riotTag = tagName;
          setAttribute(root, IS_DIRECTIVE, tagName);
        }

        tag = mount$1(root, riotTag || root.tagName.toLowerCase(), isFunction(opts) ? opts() : opts);

        if (tag) {
          tags.push(tag);
        }
      } else if (root.length) {
        each(root, pushTagsTo);
      } // assume nodeList

    } // inject styles into DOM


    styleManager.inject();

    if (isObject(tagName) || isFunction(tagName)) {
      opts = tagName;
      tagName = 0;
    } // crawl the DOM to find the tag


    if (isString(selector)) {
      selector = selector === '*' ? // select all registered tags
      // & tags found with the riot-tag attribute set
      allTags = query() : // or just the ones named like the selector
      selector + query(selector.split(/, */)); // make sure to pass always a selector
      // to the querySelectorAll function

      elem = selector ? $$(selector) : [];
    } else // probably you have passed already a tag or a NodeList
      {
        elem = selector;
      } // select all the registered and mount them inside their root elements


    if (tagName === '*') {
      // get all custom tags
      tagName = allTags || query(); // if the root els it's just a single tag

      if (elem.tagName) {
        elem = $$(tagName, elem);
      } else {
        // select all the children for all the different root elements
        var nodeList = [];
        each(elem, function (_el) {
          return nodeList.push($$(tagName, _el));
        });
        elem = nodeList;
      } // get rid of the tagName


      tagName = 0;
    }

    pushTagsTo(elem);
    return tags;
  } // Create a mixin that could be globally shared across all the tags


  var mixins = {};
  var globals = mixins[GLOBAL_MIXIN] = {};
  var mixins_id = 0;
  /**
   * Create/Return a mixin by its name
   * @param   { String }  name - mixin name (global mixin if object)
   * @param   { Object }  mix - mixin logic
   * @param   { Boolean } g - is global?
   * @returns { Object }  the mixin logic
   */

  function mixin(name, mix, g) {
    // Unnamed global
    if (isObject(name)) {
      mixin("__" + mixins_id++ + "__", name, true);
      return;
    }

    var store = g ? globals : mixins; // Getter

    if (!mix) {
      if (isUndefined(store[name])) {
        throw new Error("Unregistered mixin: " + name);
      }

      return store[name];
    } // Setter


    store[name] = isFunction(mix) ? extend(mix.prototype, store[name] || {}) && mix : extend(store[name] || {}, mix);
  }
  /**
   * Update all the tags instances created
   * @returns { Array } all the tags instances
   */


  function update$1() {
    return each(__TAGS_CACHE, function (tag) {
      return tag.update();
    });
  }

  function unregister(name) {
    styleManager.remove(name);
    return delete __TAG_IMPL[name];
  }

  var version = 'v3.13.2';
  var core = /*#__PURE__*/Object.freeze({
    Tag: Tag,
    tag: tag,
    tag2: tag2,
    mount: mount,
    mixin: mixin,
    update: update$1,
    unregister: unregister,
    version: version
  });
  /**
   * Add a mixin to this tag
   * @returns { Tag } the current tag instance
   */

  function componentMixin(tag$$1) {
    var mixins = [],
        len = arguments.length - 1;

    while (len-- > 0) mixins[len] = arguments[len + 1];

    each(mixins, function (mix) {
      var instance;
      var obj;
      var props = []; // properties blacklisted and will not be bound to the tag instance

      var propsBlacklist = ['init', '__proto__'];
      mix = isString(mix) ? mixin(mix) : mix; // check if the mixin is a function

      if (isFunction(mix)) {
        // create the new mixin instance
        instance = new mix();
      } else {
        instance = mix;
      }

      var proto = Object.getPrototypeOf(instance); // build multilevel prototype inheritance chain property list

      do {
        props = props.concat(Object.getOwnPropertyNames(obj || instance));
      } while (obj = Object.getPrototypeOf(obj || instance)); // loop the keys in the function prototype or the all object keys


      each(props, function (key) {
        // bind methods to tag
        // allow mixins to override other properties/parent mixins
        if (!contains(propsBlacklist, key)) {
          // check for getters/setters
          var descriptor = getPropDescriptor(instance, key) || getPropDescriptor(proto, key);
          var hasGetterSetter = descriptor && (descriptor.get || descriptor.set); // apply method only if it does not already exist on the instance

          if (!tag$$1.hasOwnProperty(key) && hasGetterSetter) {
            Object.defineProperty(tag$$1, key, descriptor);
          } else {
            tag$$1[key] = isFunction(instance[key]) ? instance[key].bind(tag$$1) : instance[key];
          }
        }
      }); // init method will be called automatically

      if (instance.init) {
        instance.init.bind(tag$$1)(tag$$1.opts);
      }
    });
    return tag$$1;
  }
  /**
   * Move the position of a custom tag in its parent tag
   * @this Tag
   * @param   { String } tagName - key where the tag was stored
   * @param   { Number } newPos - index where the new tag will be stored
   */


  function moveChild(tagName, newPos) {
    var parent = this.parent;
    var tags; // no parent no move

    if (!parent) {
      return;
    }

    tags = parent.tags[tagName];

    if (isArray(tags)) {
      tags.splice(newPos, 0, tags.splice(tags.indexOf(this), 1)[0]);
    } else {
      arrayishAdd(parent.tags, tagName, this);
    }
  }
  /**
   * Move virtual tag and all child nodes
   * @this Tag
   * @param { Node } src  - the node that will do the inserting
   * @param { Tag } target - insert before this tag's first child
   */


  function moveVirtual(src, target) {
    var this$1 = this;
    var el = this.__.head;
    var sib;
    var frag = createFragment();

    while (el) {
      sib = el.nextSibling;
      frag.appendChild(el);
      el = sib;

      if (el === this$1.__.tail) {
        frag.appendChild(el);
        src.insertBefore(frag, target.__.head);
        break;
      }
    }
  }
  /**
   * Convert the item looped into an object used to extend the child tag properties
   * @param   { Object } expr - object containing the keys used to extend the children tags
   * @param   { * } key - value to assign to the new object returned
   * @param   { * } val - value containing the position of the item in the array
   * @returns { Object } - new object containing the values of the original item
   *
   * The variables 'key' and 'val' are arbitrary.
   * They depend on the collection type looped (Array, Object)
   * and on the expression used on the each tag
   *
   */


  function mkitem(expr, key, val) {
    var item = {};
    item[expr.key] = key;

    if (expr.pos) {
      item[expr.pos] = val;
    }

    return item;
  }
  /**
   * Unmount the redundant tags
   * @param   { Array } items - array containing the current items to loop
   * @param   { Array } tags - array containing all the children tags
   */


  function unmountRedundant(items, tags, filteredItemsCount) {
    var i = tags.length;
    var j = items.length - filteredItemsCount;

    while (i > j) {
      i--;
      remove.apply(tags[i], [tags, i]);
    }
  }
  /**
   * Remove a child tag
   * @this Tag
   * @param   { Array } tags - tags collection
   * @param   { Number } i - index of the tag to remove
   */


  function remove(tags, i) {
    tags.splice(i, 1);
    this.unmount();
    arrayishRemove(this.parent, this, this.__.tagName, true);
  }
  /**
   * Move the nested custom tags in non custom loop tags
   * @this Tag
   * @param   { Number } i - current position of the loop tag
   */


  function moveNestedTags(i) {
    var this$1 = this;
    each(Object.keys(this.tags), function (tagName) {
      moveChild.apply(this$1.tags[tagName], [tagName, i]);
    });
  }
  /**
   * Move a child tag
   * @this Tag
   * @param   { HTMLElement } root - dom node containing all the loop children
   * @param   { Tag } nextTag - instance of the next tag preceding the one we want to move
   * @param   { Boolean } isVirtual - is it a virtual tag?
   */


  function move(root, nextTag, isVirtual) {
    if (isVirtual) {
      moveVirtual.apply(this, [root, nextTag]);
    } else {
      safeInsert(root, this.root, nextTag.root);
    }
  }
  /**
   * Insert and mount a child tag
   * @this Tag
   * @param   { HTMLElement } root - dom node containing all the loop children
   * @param   { Tag } nextTag - instance of the next tag preceding the one we want to insert
   * @param   { Boolean } isVirtual - is it a virtual tag?
   */


  function insert(root, nextTag, isVirtual) {
    if (isVirtual) {
      makeVirtual.apply(this, [root, nextTag]);
    } else {
      safeInsert(root, this.root, nextTag.root);
    }
  }
  /**
   * Append a new tag into the DOM
   * @this Tag
   * @param   { HTMLElement } root - dom node containing all the loop children
   * @param   { Boolean } isVirtual - is it a virtual tag?
   */


  function append(root, isVirtual) {
    if (isVirtual) {
      makeVirtual.call(this, root);
    } else {
      root.appendChild(this.root);
    }
  }
  /**
   * Return the value we want to use to lookup the postion of our items in the collection
   * @param   { String }  keyAttr         - lookup string or expression
   * @param   { * }       originalItem    - original item from the collection
   * @param   { Object }  keyedItem       - object created by riot via { item, i in collection }
   * @param   { Boolean } hasKeyAttrExpr  - flag to check whether the key is an expression
   * @returns { * } value that we will use to figure out the item position via collection.indexOf
   */


  function getItemId(keyAttr, originalItem, keyedItem, hasKeyAttrExpr) {
    if (keyAttr) {
      return hasKeyAttrExpr ? tmpl(keyAttr, keyedItem) : originalItem[keyAttr];
    }

    return originalItem;
  }
  /**
   * Manage tags having the 'each'
   * @param   { HTMLElement } dom - DOM node we need to loop
   * @param   { Tag } parent - parent tag instance where the dom node is contained
   * @param   { String } expr - string contained in the 'each' attribute
   * @returns { Object } expression object for this each loop
   */


  function _each(dom, parent, expr) {
    var mustReorder = _typeof(getAttribute(dom, LOOP_NO_REORDER_DIRECTIVE)) !== T_STRING || removeAttribute(dom, LOOP_NO_REORDER_DIRECTIVE);
    var keyAttr = getAttribute(dom, KEY_DIRECTIVE);
    var hasKeyAttrExpr = keyAttr ? tmpl.hasExpr(keyAttr) : false;
    var tagName = getName(dom);
    var impl = __TAG_IMPL[tagName];
    var parentNode = dom.parentNode;
    var placeholder = createDOMPlaceholder();
    var child = get(dom);
    var ifExpr = getAttribute(dom, CONDITIONAL_DIRECTIVE);
    var tags = [];
    var isLoop = true;
    var innerHTML = dom.innerHTML;
    var isAnonymous = !__TAG_IMPL[tagName];
    var isVirtual = dom.tagName === 'VIRTUAL';
    var oldItems = []; // remove the each property from the original tag

    removeAttribute(dom, LOOP_DIRECTIVE);
    removeAttribute(dom, KEY_DIRECTIVE); // parse the each expression

    expr = tmpl.loopKeys(expr);
    expr.isLoop = true;

    if (ifExpr) {
      removeAttribute(dom, CONDITIONAL_DIRECTIVE);
    } // insert a marked where the loop tags will be injected


    parentNode.insertBefore(placeholder, dom);
    parentNode.removeChild(dom);

    expr.update = function updateEach() {
      // get the new items collection
      expr.value = tmpl(expr.val, parent);
      var items = expr.value;
      var frag = createFragment();
      var isObject = !isArray(items) && !isString(items);
      var root = placeholder.parentNode;
      var tmpItems = [];
      var hasKeys = isObject && !!items; // if this DOM was removed the update here is useless
      // this condition fixes also a weird async issue on IE in our unit test

      if (!root) {
        return;
      } // object loop. any changes cause full redraw


      if (isObject) {
        items = items ? Object.keys(items).map(function (key) {
          return mkitem(expr, items[key], key);
        }) : [];
      } // store the amount of filtered items


      var filteredItemsCount = 0; // loop all the new items

      each(items, function (_item, index) {
        var i = index - filteredItemsCount;
        var item = !hasKeys && expr.key ? mkitem(expr, _item, index) : _item; // skip this item because it must be filtered

        if (ifExpr && !tmpl(ifExpr, extend(create(parent), item))) {
          filteredItemsCount++;
          return;
        }

        var itemId = getItemId(keyAttr, _item, item, hasKeyAttrExpr); // reorder only if the items are not objects
        // or a key attribute has been provided

        var doReorder = !isObject && mustReorder && _typeof(_item) === T_OBJECT || keyAttr;
        var oldPos = oldItems.indexOf(itemId);
        var isNew = oldPos === -1;
        var pos = !isNew && doReorder ? oldPos : i; // does a tag exist in this position?

        var tag = tags[pos];
        var mustAppend = i >= oldItems.length;
        var mustCreate = doReorder && isNew || !doReorder && !tag || !tags[i]; // new tag

        if (mustCreate) {
          tag = createTag(impl, {
            parent: parent,
            isLoop: isLoop,
            isAnonymous: isAnonymous,
            tagName: tagName,
            root: dom.cloneNode(isAnonymous),
            item: item,
            index: i
          }, innerHTML); // mount the tag

          tag.mount();

          if (mustAppend) {
            append.apply(tag, [frag || root, isVirtual]);
          } else {
            insert.apply(tag, [root, tags[i], isVirtual]);
          }

          if (!mustAppend) {
            oldItems.splice(i, 0, item);
          }

          tags.splice(i, 0, tag);

          if (child) {
            arrayishAdd(parent.tags, tagName, tag, true);
          }
        } else if (pos !== i && doReorder) {
          // move
          if (keyAttr || contains(items, oldItems[pos])) {
            move.apply(tag, [root, tags[i], isVirtual]); // move the old tag instance

            tags.splice(i, 0, tags.splice(pos, 1)[0]); // move the old item

            oldItems.splice(i, 0, oldItems.splice(pos, 1)[0]);
          } // update the position attribute if it exists


          if (expr.pos) {
            tag[expr.pos] = i;
          } // if the loop tags are not custom
          // we need to move all their custom tags into the right position


          if (!child && tag.tags) {
            moveNestedTags.call(tag, i);
          }
        } // cache the original item to use it in the events bound to this node
        // and its children


        extend(tag.__, {
          item: item,
          index: i,
          parent: parent
        });
        tmpItems[i] = itemId;

        if (!mustCreate) {
          tag.update(item);
        }
      }); // remove the redundant tags

      unmountRedundant(items, tags, filteredItemsCount); // clone the items array

      oldItems = tmpItems.slice();
      root.insertBefore(frag, placeholder);
    };

    expr.unmount = function () {
      each(tags, function (t) {
        t.unmount();
      });
    };

    return expr;
  }

  var RefExpr = {
    init: function init(dom, parent, attrName, attrValue) {
      this.dom = dom;
      this.attr = attrName;
      this.rawValue = attrValue;
      this.parent = parent;
      this.hasExp = tmpl.hasExpr(attrValue);
      return this;
    },
    update: function update() {
      var old = this.value;
      var customParent = this.parent && getImmediateCustomParent(this.parent); // if the referenced element is a custom tag, then we set the tag itself, rather than DOM

      var tagOrDom = this.dom.__ref || this.tag || this.dom;
      this.value = this.hasExp ? tmpl(this.rawValue, this.parent) : this.rawValue; // the name changed, so we need to remove it from the old key (if present)

      if (!isBlank(old) && customParent) {
        arrayishRemove(customParent.refs, old, tagOrDom);
      }

      if (!isBlank(this.value) && isString(this.value)) {
        // add it to the refs of parent tag (this behavior was changed >=3.0)
        if (customParent) {
          arrayishAdd(customParent.refs, this.value, tagOrDom, // use an array if it's a looped node and the ref is not an expression
          null, this.parent.__.index);
        }

        if (this.value !== old) {
          setAttribute(this.dom, this.attr, this.value);
        }
      } else {
        removeAttribute(this.dom, this.attr);
      } // cache the ref bound to this dom node
      // to reuse it in future (see also #2329)


      if (!this.dom.__ref) {
        this.dom.__ref = tagOrDom;
      }
    },
    unmount: function unmount() {
      var tagOrDom = this.tag || this.dom;
      var customParent = this.parent && getImmediateCustomParent(this.parent);

      if (!isBlank(this.value) && customParent) {
        arrayishRemove(customParent.refs, this.value, tagOrDom);
      }
    }
  };
  /**
   * Create a new ref directive
   * @param   { HTMLElement } dom - dom node having the ref attribute
   * @param   { Tag } context - tag instance where the DOM node is located
   * @param   { String } attrName - either 'ref' or 'data-ref'
   * @param   { String } attrValue - value of the ref attribute
   * @returns { RefExpr } a new RefExpr object
   */

  function createRefDirective(dom, tag, attrName, attrValue) {
    return create(RefExpr).init(dom, tag, attrName, attrValue);
  }
  /**
   * Trigger the unmount method on all the expressions
   * @param   { Array } expressions - DOM expressions
   */


  function unmountAll(expressions) {
    each(expressions, function (expr) {
      if (expr.unmount) {
        expr.unmount(true);
      } else if (expr.tagName) {
        expr.tag.unmount(true);
      } else if (expr.unmount) {
        expr.unmount();
      }
    });
  }

  var IfExpr = {
    init: function init(dom, tag, expr) {
      removeAttribute(dom, CONDITIONAL_DIRECTIVE);
      extend(this, {
        tag: tag,
        expr: expr,
        stub: createDOMPlaceholder(),
        pristine: dom
      });
      var p = dom.parentNode;
      p.insertBefore(this.stub, dom);
      p.removeChild(dom);
      return this;
    },
    update: function update$$1() {
      this.value = tmpl(this.expr, this.tag);

      if (!this.stub.parentNode) {
        return;
      }

      if (this.value && !this.current) {
        // insert
        this.current = this.pristine.cloneNode(true);
        this.stub.parentNode.insertBefore(this.current, this.stub);
        this.expressions = parseExpressions.apply(this.tag, [this.current, true]);
      } else if (!this.value && this.current) {
        // remove
        this.unmount();
        this.current = null;
        this.expressions = [];
      }

      if (this.value) {
        update.call(this.tag, this.expressions);
      }
    },
    unmount: function unmount() {
      if (this.current) {
        if (this.current._tag) {
          this.current._tag.unmount();
        } else if (this.current.parentNode) {
          this.current.parentNode.removeChild(this.current);
        }
      }

      unmountAll(this.expressions || []);
    }
  };
  /**
   * Create a new if directive
   * @param   { HTMLElement } dom - if root dom node
   * @param   { Tag } context - tag instance where the DOM node is located
   * @param   { String } attr - if expression
   * @returns { IFExpr } a new IfExpr object
   */

  function createIfDirective(dom, tag, attr) {
    return create(IfExpr).init(dom, tag, attr);
  }
  /**
   * Walk the tag DOM to detect the expressions to evaluate
   * @this Tag
   * @param   { HTMLElement } root - root tag where we will start digging the expressions
   * @param   { Boolean } mustIncludeRoot - flag to decide whether the root must be parsed as well
   * @returns { Array } all the expressions found
   */


  function parseExpressions(root, mustIncludeRoot) {
    var this$1 = this;
    var expressions = [];
    walkNodes(root, function (dom) {
      var type = dom.nodeType;
      var attr;
      var tagImpl;

      if (!mustIncludeRoot && dom === root) {
        return;
      } // text node


      if (type === 3 && dom.parentNode.tagName !== 'STYLE' && tmpl.hasExpr(dom.nodeValue)) {
        expressions.push({
          dom: dom,
          expr: dom.nodeValue
        });
      }

      if (type !== 1) {
        return;
      }

      var isVirtual = dom.tagName === 'VIRTUAL'; // loop. each does it's own thing (for now)

      if (attr = getAttribute(dom, LOOP_DIRECTIVE)) {
        if (isVirtual) {
          setAttribute(dom, 'loopVirtual', true);
        } // ignore here, handled in _each


        expressions.push(_each(dom, this$1, attr));
        return false;
      } // if-attrs become the new parent. Any following expressions (either on the current
      // element, or below it) become children of this expression.


      if (attr = getAttribute(dom, CONDITIONAL_DIRECTIVE)) {
        expressions.push(createIfDirective(dom, this$1, attr));
        return false;
      }

      if (attr = getAttribute(dom, IS_DIRECTIVE)) {
        if (tmpl.hasExpr(attr)) {
          expressions.push({
            isRtag: true,
            expr: attr,
            dom: dom,
            attrs: [].slice.call(dom.attributes)
          });
          return false;
        }
      } // if this is a tag, stop traversing here.
      // we ignore the root, since parseExpressions is called while we're mounting that root


      tagImpl = get(dom);

      if (isVirtual) {
        if (getAttribute(dom, 'virtualized')) {
          dom.parentElement.removeChild(dom);
        } // tag created, remove from dom


        if (!tagImpl && !getAttribute(dom, 'virtualized') && !getAttribute(dom, 'loopVirtual')) // ok to create virtual tag
          {
            tagImpl = {
              tmpl: dom.outerHTML
            };
          }
      }

      if (tagImpl && (dom !== root || mustIncludeRoot)) {
        var hasIsDirective = getAttribute(dom, IS_DIRECTIVE);

        if (isVirtual && !hasIsDirective) {
          // handled in update
          // can not remove attribute like directives
          // so flag for removal after creation to prevent maximum stack error
          setAttribute(dom, 'virtualized', true);
          var tag = createTag({
            tmpl: dom.outerHTML
          }, {
            root: dom,
            parent: this$1
          }, dom.innerHTML);
          expressions.push(tag); // no return, anonymous tag, keep parsing
        } else {
          if (hasIsDirective && isVirtual) {
            warn("Virtual tags shouldn't be used together with the \"" + IS_DIRECTIVE + "\" attribute - https://github.com/riot/riot/issues/2511");
          }

          expressions.push(initChild(tagImpl, {
            root: dom,
            parent: this$1
          }, dom.innerHTML, this$1));
          return false;
        }
      } // attribute expressions


      parseAttributes.apply(this$1, [dom, dom.attributes, function (attr, expr) {
        if (!expr) {
          return;
        }

        expressions.push(expr);
      }]);
    });
    return expressions;
  }
  /**
   * Calls `fn` for every attribute on an element. If that attr has an expression,
   * it is also passed to fn.
   * @this Tag
   * @param   { HTMLElement } dom - dom node to parse
   * @param   { Array } attrs - array of attributes
   * @param   { Function } fn - callback to exec on any iteration
   */


  function parseAttributes(dom, attrs, fn) {
    var this$1 = this;
    each(attrs, function (attr) {
      if (!attr) {
        return false;
      }

      var name = attr.name;
      var bool = isBoolAttr(name);
      var expr;

      if (contains(REF_DIRECTIVES, name) && dom.tagName.toLowerCase() !== YIELD_TAG) {
        expr = createRefDirective(dom, this$1, name, attr.value);
      } else if (tmpl.hasExpr(attr.value)) {
        expr = {
          dom: dom,
          expr: attr.value,
          attr: name,
          bool: bool
        };
      }

      fn(attr, expr);
    });
  }
  /**
   * Manage the mount state of a tag triggering also the observable events
   * @this Tag
   * @param { Boolean } value - ..of the isMounted flag
   */


  function setMountState(value) {
    var ref = this.__;
    var isAnonymous = ref.isAnonymous;
    var skipAnonymous = ref.skipAnonymous;
    define(this, 'isMounted', value);

    if (!isAnonymous || !skipAnonymous) {
      if (value) {
        this.trigger('mount');
      } else {
        this.trigger('unmount');
        this.off('*');
        this.__.wasCreated = false;
      }
    }
  }
  /**
   * Mount the current tag instance
   * @returns { Tag } the current tag instance
   */


  function componentMount(tag$$1, dom, expressions, opts) {
    var __ = tag$$1.__;
    var root = __.root;
    root._tag = tag$$1; // keep a reference to the tag just created
    // Read all the attrs on this instance. This give us the info we need for updateOpts

    parseAttributes.apply(__.parent, [root, root.attributes, function (attr, expr) {
      if (!__.isAnonymous && RefExpr.isPrototypeOf(expr)) {
        expr.tag = tag$$1;
      }

      attr.expr = expr;

      __.instAttrs.push(attr);
    }]); // update the root adding custom attributes coming from the compiler

    walkAttributes(__.impl.attrs, function (k, v) {
      __.implAttrs.push({
        name: k,
        value: v
      });
    });
    parseAttributes.apply(tag$$1, [root, __.implAttrs, function (attr, expr) {
      if (expr) {
        expressions.push(expr);
      } else {
        setAttribute(root, attr.name, attr.value);
      }
    }]); // initialiation

    updateOpts.apply(tag$$1, [__.isLoop, __.parent, __.isAnonymous, opts, __.instAttrs]); // add global mixins

    var globalMixin = mixin(GLOBAL_MIXIN);

    if (globalMixin && !__.skipAnonymous) {
      for (var i in globalMixin) {
        if (globalMixin.hasOwnProperty(i)) {
          tag$$1.mixin(globalMixin[i]);
        }
      }
    }

    if (__.impl.fn) {
      __.impl.fn.call(tag$$1, opts);
    }

    if (!__.skipAnonymous) {
      tag$$1.trigger('before-mount');
    } // parse layout after init. fn may calculate args for nested custom tags


    each(parseExpressions.apply(tag$$1, [dom, __.isAnonymous]), function (e) {
      return expressions.push(e);
    });
    tag$$1.update(__.item);

    if (!__.isAnonymous && !__.isInline) {
      while (dom.firstChild) {
        root.appendChild(dom.firstChild);
      }
    }

    define(tag$$1, 'root', root); // if we need to wait that the parent "mount" or "updated" event gets triggered

    if (!__.skipAnonymous && tag$$1.parent) {
      var p = getImmediateCustomParent(tag$$1.parent);
      p.one(!p.isMounted ? 'mount' : 'updated', function () {
        setMountState.call(tag$$1, true);
      });
    } else {
      // otherwise it's not a child tag we can trigger its mount event
      setMountState.call(tag$$1, true);
    }

    tag$$1.__.wasCreated = true;
    return tag$$1;
  }
  /**
   * Unmount the tag instance
   * @param { Boolean } mustKeepRoot - if it's true the root node will not be removed
   * @returns { Tag } the current tag instance
   */


  function tagUnmount(tag, mustKeepRoot, expressions) {
    var __ = tag.__;
    var root = __.root;

    var tagIndex = __TAGS_CACHE.indexOf(tag);

    var p = root.parentNode;

    if (!__.skipAnonymous) {
      tag.trigger('before-unmount');
    } // clear all attributes coming from the mounted tag


    walkAttributes(__.impl.attrs, function (name) {
      if (startsWith(name, ATTRS_PREFIX)) {
        name = name.slice(ATTRS_PREFIX.length);
      }

      removeAttribute(root, name);
    }); // remove all the event listeners

    tag.__.listeners.forEach(function (dom) {
      Object.keys(dom[RIOT_EVENTS_KEY]).forEach(function (eventName) {
        dom.removeEventListener(eventName, dom[RIOT_EVENTS_KEY][eventName]);
      });
    }); // remove tag instance from the global tags cache collection


    if (tagIndex !== -1) {
      __TAGS_CACHE.splice(tagIndex, 1);
    } // clean up the parent tags object


    if (__.parent && !__.isAnonymous) {
      var ptag = getImmediateCustomParent(__.parent);

      if (__.isVirtual) {
        Object.keys(tag.tags).forEach(function (tagName) {
          return arrayishRemove(ptag.tags, tagName, tag.tags[tagName]);
        });
      } else {
        arrayishRemove(ptag.tags, __.tagName, tag);
      }
    } // unmount all the virtual directives


    if (tag.__.virts) {
      each(tag.__.virts, function (v) {
        if (v.parentNode) {
          v.parentNode.removeChild(v);
        }
      });
    } // allow expressions to unmount themselves


    unmountAll(expressions);
    each(__.instAttrs, function (a) {
      return a.expr && a.expr.unmount && a.expr.unmount();
    }); // clear the tag html if it's necessary

    if (mustKeepRoot) {
      setInnerHTML(root, '');
    } // otherwise detach the root tag from the DOM
    else if (p) {
        p.removeChild(root);
      } // custom internal unmount function to avoid relying on the observable


    if (__.onUnmount) {
      __.onUnmount();
    } // weird fix for a weird edge case #2409 and #2436
    // some users might use your software not as you've expected
    // so I need to add these dirty hacks to mitigate unexpected issues


    if (!tag.isMounted) {
      setMountState.call(tag, true);
    }

    setMountState.call(tag, false);
    delete root._tag;
    return tag;
  }
  /**
   * Tag creation factory function
   * @constructor
   * @param { Object } impl - it contains the tag template, and logic
   * @param { Object } conf - tag options
   * @param { String } innerHTML - html that eventually we need to inject in the tag
   */


  function createTag(impl, conf, innerHTML) {
    if (impl === void 0) impl = {};
    if (conf === void 0) conf = {};
    var tag = conf.context || {};
    var opts = conf.opts || {};
    var parent = conf.parent;
    var isLoop = conf.isLoop;
    var isAnonymous = !!conf.isAnonymous;
    var skipAnonymous = settings.skipAnonymousTags && isAnonymous;
    var item = conf.item; // available only for the looped nodes

    var index = conf.index; // All attributes on the Tag when it's first parsed

    var instAttrs = []; // expressions on this type of Tag

    var implAttrs = [];
    var tmpl = impl.tmpl;
    var expressions = [];
    var root = conf.root;
    var tagName = conf.tagName || getName(root);
    var isVirtual = tagName === 'virtual';
    var isInline = !isVirtual && !tmpl;
    var dom;

    if (isInline || isLoop && isAnonymous) {
      dom = root;
    } else {
      if (!isVirtual) {
        root.innerHTML = '';
      }

      dom = mkdom(tmpl, innerHTML, isSvg(root));
    } // make this tag observable


    if (!skipAnonymous) {
      observable(tag);
    } // only call unmount if we have a valid __TAG_IMPL (has name property)


    if (impl.name && root._tag) {
      root._tag.unmount(true);
    }

    define(tag, '__', {
      impl: impl,
      root: root,
      skipAnonymous: skipAnonymous,
      implAttrs: implAttrs,
      isAnonymous: isAnonymous,
      instAttrs: instAttrs,
      innerHTML: innerHTML,
      tagName: tagName,
      index: index,
      isLoop: isLoop,
      isInline: isInline,
      item: item,
      parent: parent,
      // tags having event listeners
      // it would be better to use weak maps here but we can not introduce breaking changes now
      listeners: [],
      // these vars will be needed only for the virtual tags
      virts: [],
      wasCreated: false,
      tail: null,
      head: null
    }); // tag protected properties

    return [['isMounted', false], // create a unique id to this tag
    // it could be handy to use it also to improve the virtual dom rendering speed
    ['_riot_id', uid()], ['root', root], ['opts', opts, {
      writable: true,
      enumerable: true
    }], ['parent', parent || null], // protect the "tags" and "refs" property from being overridden
    ['tags', {}], ['refs', {}], ['update', function (data) {
      return componentUpdate(tag, data, expressions);
    }], ['mixin', function () {
      var mixins = [],
          len = arguments.length;

      while (len--) mixins[len] = arguments[len];

      return componentMixin.apply(void 0, [tag].concat(mixins));
    }], ['mount', function () {
      return componentMount(tag, dom, expressions, opts);
    }], ['unmount', function (mustKeepRoot) {
      return tagUnmount(tag, mustKeepRoot, expressions);
    }]].reduce(function (acc, ref) {
      var key = ref[0];
      var value = ref[1];
      var opts = ref[2];
      define(tag, key, value, opts);
      return acc;
    }, extend(tag, item));
  }
  /**
   * Mount a tag creating new Tag instance
   * @param   { Object } root - dom node where the tag will be mounted
   * @param   { String } tagName - name of the riot tag we want to mount
   * @param   { Object } opts - options to pass to the Tag instance
   * @param   { Object } ctx - optional context that will be used to extend an existing class ( used in riot.Tag )
   * @returns { Tag } a new Tag instance
   */


  function mount$1(root, tagName, opts, ctx) {
    var impl = __TAG_IMPL[tagName];
    var implClass = __TAG_IMPL[tagName].class;
    var context = ctx || (implClass ? create(implClass.prototype) : {}); // cache the inner HTML to fix #855

    var innerHTML = root._innerHTML = root._innerHTML || root.innerHTML;
    var conf = extend({
      root: root,
      opts: opts,
      context: context
    }, {
      parent: opts ? opts.parent : null
    });
    var tag;

    if (impl && root) {
      tag = createTag(impl, conf, innerHTML);
    }

    if (tag && tag.mount) {
      tag.mount(true); // add this tag to the virtualDom variable

      if (!contains(__TAGS_CACHE, tag)) {
        __TAGS_CACHE.push(tag);
      }
    }

    return tag;
  }

  var tags = /*#__PURE__*/Object.freeze({
    arrayishAdd: arrayishAdd,
    getTagName: getName,
    inheritParentProps: inheritParentProps,
    mountTo: mount$1,
    selectTags: query,
    arrayishRemove: arrayishRemove,
    getTag: get,
    initChildTag: initChild,
    moveChildTag: moveChild,
    makeReplaceVirtual: makeReplaceVirtual,
    getImmediateCustomParentTag: getImmediateCustomParent,
    makeVirtual: makeVirtual,
    moveVirtual: moveVirtual,
    unmountAll: unmountAll,
    createIfDirective: createIfDirective,
    createRefDirective: createRefDirective
  });
  /**
   * Riot public api
   */

  var settings$1 = settings;
  var util = {
    tmpl: tmpl,
    brackets: brackets,
    styleManager: styleManager,
    vdom: __TAGS_CACHE,
    styleNode: styleManager.styleNode,
    // export the riot internal utils as well
    dom: dom,
    check: check,
    misc: misc,
    tags: tags
  }; // export the core props/methods

  var Tag$1 = Tag;
  var tag$1 = tag;
  var tag2$1 = tag2;
  var mount$2 = mount;
  var mixin$1 = mixin;
  var update$2 = update$1;
  var unregister$1 = unregister;
  var version$1 = version;
  var observable$1 = observable;
  var riot$1 = extend({}, core, {
    observable: observable,
    settings: settings$1,
    util: util
  });
  exports.settings = settings$1;
  exports.util = util;
  exports.Tag = Tag$1;
  exports.tag = tag$1;
  exports.tag2 = tag2$1;
  exports.mount = mount$2;
  exports.mixin = mixin$1;
  exports.update = update$2;
  exports.unregister = unregister$1;
  exports.version = version$1;
  exports.observable = observable$1;
  exports.default = riot$1;
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
});
},{}],"../../node_modules/node-fetch/browser.js":[function(require,module,exports) {

"use strict"; // ref: https://github.com/tc39/proposal-global

var getGlobal = function () {
  // the only reliable means to get the global object is
  // `Function('return this')()`
  // However, this causes CSP violations in Chrome apps.
  if (typeof self !== 'undefined') {
    return self;
  }

  if (typeof window !== 'undefined') {
    return window;
  }

  if (typeof global !== 'undefined') {
    return global;
  }

  throw new Error('unable to locate global object');
};

var global = getGlobal();
module.exports = exports = global.fetch; // Needed for TypeScript and Webpack.

exports.default = global.fetch.bind(global);
exports.Headers = global.Headers;
exports.Request = global.Request;
exports.Response = global.Response;
},{}],"../../node_modules/firerest/firerest.js":[function(require,module,exports) {
var global = arguments[3];
;(function(exports, global) {
  var isNode = (typeof module === "object" && typeof module.exports === "object" );

  if (isNode) {
    fetch = require('node-fetch');
    localStorage = {
      setItem: function() {},
      getItem: function() {},
      removeItem: function() {},
    };
  }

  var extend = function(a, b) {
    for (var key in b) {
      var v = b[key];
      a[key] = v;
    }
    return a;
  };

  var qs = {
    parse: function(text, sep, eq, isDecode) {
      text = text || location.search.substr(1);
      sep = sep || '&';
      eq = eq || '=';
      var decode = (isDecode) ? decodeURIComponent : function(a) { return a; };
      return text.split(sep).reduce(function(obj, v) {
        var pair = v.split(eq);
        obj[pair[0]] = decode(pair[1]);
        return obj;
      }, {});
    },
    stringify: function(value, sep, eq, isEncode) {
      sep = sep || '&';
      eq = eq || '=';
      var encode = (isEncode) ? encodeURIComponent : function(a) { return a; };

      var params = [];
      Object.keys(value).forEach(function(key) {
        var v = value[key];

        if (typeof v === 'string') {
          params.push([key, v]);
        }
        else if (typeof v === 'number') {
          params.push([key, v]);
        }
        else if (typeof v === 'boolean') {
          params.push([key, v]);
        }
        else if (v instanceof Array) {
          v.forEach(function(vv) {
            params.push([key+'[]', vv]);
          });
        }
        else if (v === null) {
          params.push([key, "null"]);
        }
        else if (typeof v === 'object') {
          Object.keys(v).forEach(function(kk) {
            var vv = v[kk];
            params.push([key + '[' + kk + ']', vv]);
          })
        }
      });

      return params.map(function(p){
        return encode(p[0]) + eq + encode(p[1]);
      }).join(sep);
    },
  };

  var setFromPath = function(obj, key, value) {
    key.split('/').reduce(function(t, v, i, arr) {
      if (i === (arr.length-1)) {
        t[v] = value;
      }
      else {
        if (!t[v]) t[v] = {};
        return t[v];
      }
    }, obj);
  };

  var getFromPath = function(obj, key) {
    return key.split('/').reduce(function(t, v) {
      return t && t[v];
    }, obj);
  };

  var Child = function(options) {
    this.init(options);
  };

  Child.prototype = {
    init: function(options) {
      this.api = options.api;
      this.local = options.local || false;
      this.debug = options.debug || false;
      this._data = {};
      this._headers = {};
    },

    headers: function(headers) {
      if (headers) {
        if (typeof headers === 'object') {
          extend(this._headers, headers);
        }
        else {
          this._headers[arguments[0]] = arguments[1];
        }
        return this;
      }
      else {
        headers = {};

        if (this.parent) {
          extend(headers, this.parent.headers());
        }
        extend(headers, this._headers);

        return headers;
      }
    },
    data: function(data) {
      if (data) {
        extend(this._data, data);
        return this;
      }
      else {
        data = {};

        if (this.parent) {
          extend(data, this.parent.data());
        }
        extend(data, this._data);

        return data;
      }
    },

    _fetch: function(options) {
      var self = this;
      var root = this.root;
      var headers = this.headers();
      var api = this.api;
      var query = '';
      var data = null;

      if (options.type === 'GET') {
        if (options.data) {
          var temp = extend(this.data(), options.data);
          query = qs.stringify(temp, null, null, true);
          api += '?';
        }
      }
      else {
        if (options.data && options.data.constructor !== global.FormData) {
          var temp = extend(this.data(), options.data);
          headers['Content-Type'] = 'application/json; charset=utf-8';
          data = JSON.stringify( temp );
        }
        else {
          data = options.data;	
        }
      }


      var p = fetch(api + query, {
        method: options.type,
        headers: headers,
        body: data || undefined,
      }).then(function(res) {
        // fire always
        root.fire('always', self, res);

        var json = res.json();
        if (!res.ok) {
          // http://stackoverflow.com/questions/29473426/fetch-reject-promise-with-json-error-object
          return json.then(Promise.reject.bind(Promise));
        }
        else {
          return json;
        }
      });
      p.then(function(res) {
        if (self.debug) {
          console.log(options.type, api, res);
        }

        root.fire('success', self, res);
        return res;
      });
      p.catch(function(res) {
        root.fire('fail', self, res);
        return res;
      });

      return p;
    },
    _fetchFromLocal: function(options) {
      var self = this;
      var api = this.api;
      var root = this.root;
      var localData = this.root.localData;

      if(!localData) {
        return Promise.reject('not found local items');
      }

      var func = null;

      switch(options.type) {
        case 'GET':
          func = function(resolve) {
            var data = getFromPath(localData, api);
            resolve(data);
          };
          break;
        case 'PUT':
          func = function(resolve) {
            var data = getFromPath(localData, api);
            extend(r.data, options.data);
            resolve(data);
          };
          break;
        case 'POST':
          func = function(resolve) {
            id = options.data.id;
            setFromPath(localData, api+'/'+id, options.data);
            resolve(options.data);
          };
          break;
        case 'DELETE':
          func = function(resolve) {
            var pathes = api.split('/');
            var key = pathes.pop();
            var path = pathes.join('/');
            var obj = getFromPath(localData, path);

            delete obj[key];

            resolve(null);
          };
          break;
      }

      var p = new Promise(func);

      p.then(function(res) {
        root.fire('always', self, res);
        if (self.debug) {
          console.log(options.type, self.api, res);
        }

        root.fire('success', self, res);
        return res;
      });
      p.catch(function(res) {
        root.fire('fail', self, res);
        return res;
      });

      return p;
    },

    get: function(data) {
      return this.fetch({
        type: 'GET',
        data: data,
      });
    },
    put: function(data) {
      return this.fetch({
        type: 'PUT',
        data: data,
      });
    },
    post: function(data) {
      return this.fetch({
        type: 'POST',
        data: data,
      });
    },
    del: function(data) {
      return this.fetch({
        type: 'DELETE',
        data: data,
      });
    },

    child: function(api) {
      // normalize
      api = (api+'').replace(/^\//, '').replace(/\/$/, '');

      var child = new Child({
        api: this.api + '/' + api,
        local: this.local,
        debug: this.debug,
      });
      child.root = this.root;
      child.parent = this;

      return child;
    },

    log: function() {
      console.log(this.api);
    },

    migrate: function(data) {
      var key = this.api;
      setFromPath(this.root.localData, key, data);
      return this;
    },

    fetch: async function(options) {
      await this.root.fire('prefetch', this);

      var p = null;

      if (this.local) {
        p = this._fetchFromLocal(options);
      } else {
        p = this._fetch(options);
      }

      await this.root.fire('postfetch', this);
      
      return p;
    }
  };


  /*
   * Auth
   */
  var Auth = function(firerest) {
    this.firerest = firerest;
    this._token = null;
    this._user = null;
  };

  Object.defineProperty(Auth.prototype, 'token', {
    set: function(v) {
      this._token = v;
      localStorage.setItem(this.firerest.cacheKey + '.token', this._token);
      this.firerest.headers(this.firerest.tokenKey, this._token);
    },
    get: function() {
      return this._token;
    },
  });

  Object.defineProperty(Auth.prototype, 'user', {
    set: function(v) {
      this._user = v;
      localStorage.setItem(this.firerest.cacheKey + '.user', JSON.stringify(this._user));
    },
    get: function() {
      return this._user;
    },
  });

  Auth.prototype.login = function(token, user) {
    this.token = token;
    this.user = user;
  };

  Auth.prototype.logout = function() {
    this._token = null;
    this._user = null;
    localStorage.removeItem(this.firerest.cacheKey + '.token');
    localStorage.removeItem(this.firerest.cacheKey + '.user');
    this.firerest.headers(this.firerest.tokenKey, undefined);
  };

  Auth.prototype.isLogin = function() {
    return !!this._token;
  };

  Auth.prototype._sync = function() {
    var token = localStorage.getItem(this.firerest.cacheKey + '.token');
    var user = localStorage.getItem(this.firerest.cacheKey + '.user');

    if (token) {
      this.token = token;
    }
    if (user) {
      this.user = JSON.parse(user);
    }

    return this;
  };


  /*
   * Firerest
   */
  var Firerest = function(options) {
    this.init(options);
  };

  Firerest.prototype = Object.create(Child.prototype);

  Firerest.prototype.init = function(options) {
    Child.prototype.init.call(this, options);

    this.root = this;
    this.cacheKey = options.cacheKey;
    this.tokenKey = options.tokenKey;
    this.debug = options.debug;
    this.local = options.local;
    this.localData = {};
    this._listeners = [];

    this.auth = new Auth(this);
    this.auth._sync();
  };

  // events
  Firerest.prototype.on = function(type, func) {
    if (!this._listeners[type]) this._listeners[type] = [];
    this._listeners[type].push(func);

    return this;
  };
  Firerest.prototype.off = function(type, func) {
    if (!this._listeners[type]) this._listeners[type] = [];

    var i = this._listeners[type].indexOf(func);
    if (i !== -1) {
      this._listeners[type].splice(i, 1);
    }

    return this;
  };
  Firerest.prototype.once = function(type, func) {
    var temp = function() {
      func.apply(this, arguments);
      this.off(type, temp);
    }.bind(this);
    this.on(type, temp);

    return this;
  };
  Firerest.prototype.fire = async function(type, req, res) {
    if (!this._listeners[type]) return ;

    // イベントの実行結果を取得
    var results = this._listeners[type].map(function(func) {
      return func.call(this, req, res);
    }.bind(this));

    // Promise だった場合すべて終わるまで待つ
    var promises = results.filter(r => r && r.constructor === Promise);
    if (promises.length) {
      await Promise.all(promises);
    }

    return this;
  };

  exports.create = function(options) {
    return new Firerest(options);
  };

})(typeof exports === 'undefined' ? this.Firerest = {} : exports, this);

// test
;(function() {
  return ;
  var ref = new Firerest({
    api: 'http://jsonplaceholder.typicode.com',
    cacheKey: 'hoge.foo.bar', // localstorage に保存するためのキー
    tokenKey: 'abcdefg', // header に付与して送るキー
    debug: true,
  });
  ref.log();
  ref.child('posts').log();
  ref.child('posts').get().done();
  ref.child('posts').child(10).get().done();
  ref.child('posts').child(10).child('comments').get().done();
})();



},{"node-fetch":"../../node_modules/node-fetch/browser.js"}],"tags/app.tag":[function(require,module,exports) {
var riot = require('riot');

riot.tag2('app', '<h1>{title}</h1> <div class="p16"> <div class="s64 bg-red"></div> </div> <ul> <li>aaaaaaaaaaaaa bbbbbbbb cccc dddd</li> <item each="{item in [1, 2, 3, 4]}" item="{item}"></item> </ul>', '', 'class="p16"', function (opts) {
  this.title = 'Hello, spalate with parcel!';
});
},{"riot":"../node_modules/riot/riot.js"}],"tags/*.tag":[function(require,module,exports) {
module.exports = {
  "app": require("./app.tag")
};
},{"./app.tag":"tags/app.tag"}],"tags/**/*.tag":[function(require,module,exports) {
module.exports = {
  "app": require("./../app.tag")
};
},{"./../app.tag":"tags/app.tag"}],"../../node_modules/process/browser.js":[function(require,module,exports) {

// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }

  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}; // v8 likes predictible objects


function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

process.title = 'browser';
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
  return [];
};

process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

process.cwd = function () {
  return '/';
};

process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

process.umask = function () {
  return 0;
};
},{}],"index.js":[function(require,module,exports) {
var process = require("process");
var global = arguments[3];
"use strict";

var _underscore = _interopRequireDefault(require("underscore"));

var _riot = _interopRequireDefault(require("riot"));

var _firerest = _interopRequireDefault(require("firerest"));

require("./tags/*.tag");

require("./tags/**/*.tag");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log('index.js: ユーザー定義のファイルが呼び出されたよ');
var isNode = typeof process !== 'undefined' && process.versions != null && process.versions.node != null;

if (!isNode) {
  _riot.default.mount('*');
} // export default {
//   riot,
//   _,
// };


global.riot = _riot.default;
global._ = _underscore.default;
},{"underscore":"../../node_modules/underscore/modules/index-all.js","riot":"../node_modules/riot/riot.js","firerest":"../../node_modules/firerest/firerest.js","./tags/*.tag":"tags/*.tag","./tags/**/*.tag":"tags/**/*.tag","process":"../../node_modules/process/browser.js"}],"../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56480" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], "spalate")
//# sourceMappingURL=/spalate.js.map