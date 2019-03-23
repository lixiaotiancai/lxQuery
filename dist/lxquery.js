(function(global, factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = global.document ?
      factory(global, true) :
      function(w) {
        if (!w.document) {
          throw new Error('lxQuery requires a window with a document')
        }
        return factory(w)
      }
  } else if (typeof define === 'function' && define.amd) {
    // 兼容AMD规范
    define('lxQuery', [], function() {
      return factory(global)
    })
  } else {
    factory(global)
  }
})(typeof window !== 'undefined' ? window : this, function(window, noGlobal) {
  return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/ajax/fetch.js":
/*!***************************!*\
  !*** ./src/ajax/fetch.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var lxFetch = {
  /**
   * fetch (XMLHttpRequest + Promise)
   * @param  {String} url
   * @param  {Object} opts
   *
   * 仿es6 fetch
   */
  fetch: function fetch(url, opts) {
    var def = {
      method: 'GET',
      data: null
    };

    var options = _extends({}, def, opts);

    function ajax(url, opts, success, fail) {
      var xhr = new XMLHttpRequest();

      var method = opts.method,
          data = opts.data;


      xhr.open(method, url);

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            success(xhr.responseText);
          } else {
            fail(xhr.responseText);
          }
        }
      };

      if (method.toUpperCase() === 'POST') {
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      }

      xhr.send(data);
    }

    return new Promise(function (resolve, reject) {
      ajax(url, options, function (res) {
        return resolve(res);
      }, function (err) {
        return reject(err);
      });
    });
  }
};

exports.default = lxFetch;

/***/ }),

/***/ "./src/ajax/fetchJsonp.js":
/*!********************************!*\
  !*** ./src/ajax/fetchJsonp.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _util = __webpack_require__(/*! ../util */ "./src/util/index.js");

var fetchJsonp = {
  /**
   * fetchJsonp (jsonp + Promise)
   * @param  {String} url
   * @param  {Object} opts
   *
   * 仿fetchJsonp
   */
  fetchJsonp: function fetchJsonp(url, opts) {
    function jsonp(url, callback) {
      var options = _extends({
        callbackName: 'callback',
        functionName: getJsonpFunctionName(),
        data: {}
      }, opts);

      var callbackName = options.callbackName,
          functionName = options.functionName,
          data = options.data;


      data[callbackName] = functionName;

      url = parseUrl(url, (0, _util.serialize)(data));

      global[functionName] = function (res) {
        // 获取数据后就销毁该函数与script标签
        var p = new Promise(function (resolve, reject) {
          callback(res);
          resolve();
        });

        p.then(function () {
          delete global[functionName];

          var script = global.document.querySelector('script[src=\'' + url + '\']');

          script.parentNode.removeChild(script);
        });
      };

      createScript(url);

      function getJsonpFunctionName() {
        return ('jsonp' + Date.now() + Math.random()).replace('.', '');
      }

      function parseUrl(url, param) {
        return url + (url.indexOf('?') === -1 ? '?' : '&') + param;
      }

      function createScript(url) {
        var script = global.document.createElement('script');

        script.src = url;

        global.document.body.appendChild(script);
      }
    }

    return new Promise(function (resolve, reject) {
      jsonp(url, function (res) {
        return resolve(res);
      });
    });
  }
};

exports.default = fetchJsonp;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/ajax/iframe.js":
/*!****************************!*\
  !*** ./src/ajax/iframe.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _util = __webpack_require__(/*! ../util */ "./src/util/index.js");

var iframe = {
  /**
   * iframe跨域函数
   * @param  {Object}   opts
   * @param  {Function} callback
   *
   * 只提供当前页面的相关函数, 提供数据页和跳转页需另行处理
   */
  iframe: function iframe(opts, callback) {
    // callbackName
    // funcName
    // targetUrl
    // skipUrl
    // data
    var options = _extends({
      callbackName: 'callback',
      funcName: getFuncName(),
      targetUrl: '',
      skipUrl: '',
      data: {}
    }, opts);

    var callbackName = options.callbackName,
        funcName = options.funcName,
        targetUrl = options.targetUrl,
        skipUrl = options.skipUrl,
        data = options.data;


    data[callbackName] = funcName;

    targetUrl = parseUrl(targetUrl, (0, _util.serialize)(data));

    global[funcName] = function (res) {
      callback(res);
    };

    createIframe(targetUrl);

    function getFuncName() {
      return ('iframe_' + Date.now() + Math.random()).replace('.', '');
    }

    function parseUrl(url, param) {
      return url + (url.indexOf('?') === -1 ? '?' : '&') + param;
    }

    function createIframe(url) {
      var iframe = global.document.createElement('iframe');

      iframe.src = url;
      iframe.frameborder = '0';
      iframe.style.display = 'none';

      global.document.body.appendChild(iframe);
    }
  }
};

exports.default = iframe;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/ajax/index.js":
/*!***************************!*\
  !*** ./src/ajax/index.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _fetch = __webpack_require__(/*! ./fetch */ "./src/ajax/fetch.js");

var _fetch2 = _interopRequireDefault(_fetch);

var _fetchJsonp = __webpack_require__(/*! ./fetchJsonp */ "./src/ajax/fetchJsonp.js");

var _fetchJsonp2 = _interopRequireDefault(_fetchJsonp);

var _iframe = __webpack_require__(/*! ./iframe */ "./src/ajax/iframe.js");

var _iframe2 = _interopRequireDefault(_iframe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _extends({}, _fetch2.default, _fetchJsonp2.default, _iframe2.default);

/***/ }),

/***/ "./src/callbacks/callbacks.js":
/*!************************************!*\
  !*** ./src/callbacks/callbacks.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = __webpack_require__(/*! ../util */ "./src/util/index.js");

var callbacks = {
  callbacks: function callbacks() {
    var opt = {
      // 函数注册表
      callbacks: [],

      /**
       * 向注册表添加回调函数
       * @param {Function}
       */
      add: function add(fn) {
        this.callbacks.push(fn);

        return this;
      },

      /**
       * 依次执行注册表的函数
       * @param  {All} param
       */
      fire: function fire(param) {
        (0, _util.each)(this.callbacks, function (i, fn) {
          fn(param);
        });

        return this;
      },

      /**
       * 从函数注册表中移除响应函数
       * @param  {...[String]}
       */
      remove: function remove() {
        var self = this;
        var target = void 0;

        for (var _len = arguments.length, fnArr = Array(_len), _key = 0; _key < _len; _key++) {
          fnArr[_key] = arguments[_key];
        }

        (0, _util.each)(fnArr, function (i, fn) {
          target = self.callbacks.indexOf(fn);
          self.callbacks.splice(target, 1);
        });

        return this;
      },

      /**
       * 删除注册表中所有函数
       */
      empty: function empty() {
        this.callbacks = [];

        return this;
      }
    };

    return opt;
  }
};

exports.default = callbacks;

/***/ }),

/***/ "./src/callbacks/index.js":
/*!********************************!*\
  !*** ./src/callbacks/index.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _callbacks = __webpack_require__(/*! ./callbacks */ "./src/callbacks/callbacks.js");

var _callbacks2 = _interopRequireDefault(_callbacks);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _extends({}, _callbacks2.default);

/***/ }),

/***/ "./src/core/index.js":
/*!***************************!*\
  !*** ./src/core/index.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _util = __webpack_require__(/*! ../util */ "./src/util/index.js");

var _dom = __webpack_require__(/*! ../dom */ "./src/dom/index.js");

var _dom2 = _interopRequireDefault(_dom);

var _callbacks = __webpack_require__(/*! ../callbacks */ "./src/callbacks/index.js");

var _callbacks2 = _interopRequireDefault(_callbacks);

var _style = __webpack_require__(/*! ../style */ "./src/style/index.js");

var _style2 = _interopRequireDefault(_style);

var _event = __webpack_require__(/*! ../event */ "./src/event/index.js");

var _event2 = _interopRequireDefault(_event);

var _defer = __webpack_require__(/*! ../defer */ "./src/defer/index.js");

var _defer2 = _interopRequireDefault(_defer);

var _ajax = __webpack_require__(/*! ../ajax */ "./src/ajax/index.js");

var _ajax2 = _interopRequireDefault(_ajax);

var _extra = __webpack_require__(/*! ../extra */ "./src/extra/index.js");

var _extra2 = _interopRequireDefault(_extra);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var lxQuery = function lxQuery(selector, context) {
  return new lxQuery.fn.init(selector, context);
};

lxQuery.fn = lxQuery.prototype;

lxQuery.fn.constructor = lxQuery;

lxQuery.fn.version = '1.0.4';

lxQuery.fn.length = 0;

lxQuery.fn.init = function (selector, context) {
  var self = this;

  context = context || window.document;

  if (!selector) {
    return this;
  }

  this.nodeList = (0, _util.domSelector)(selector, context);

  this.prevObject = document;

  (0, _util.each)([].concat(_toConsumableArray(this.nodeList)), function (i, el) {
    self[i] = el;
  });

  return this;
};

lxQuery.extend = lxQuery.fn.extend = function (options) {
  var self = this;

  (0, _util.each)(options, function (name, opt) {
    self[name] = opt;
  });

  return this;
};

lxQuery.extend(_extends({
  each: _util.each,
  merge: _util.merge,
  eq: _util.eq,
  first: _util.first,
  last: _util.last,
  removeItemByIndex: _util.removeItemByIndex,
  serialize: _util.serialize
}, _callbacks2.default, _defer2.default, _ajax2.default, _extra2.default));

lxQuery.fn.extend(_extends({

  each: function each(callback) {
    return lxQuery.each([].concat(_toConsumableArray(this.nodeList)), callback);
  },

  pushStack: function pushStack(arr) {
    var ret = lxQuery.merge(this.constructor(), arr);

    ret.nodeList = lxQuery.merge(this.constructor(), arr);

    ret.prevObject = this;

    return ret;
  },

  eq: function eq(i) {
    return this.pushStack(lxQuery.eq([].concat(_toConsumableArray(this.nodeList)), i));
  },

  first: function first() {
    return this.eq(0);
  },

  last: function last() {
    return this.eq(-1);
  },

  end: function end() {
    return this.prevObject;
  },

  // this is a api for develope test

  // red: function () {
  //   this.each(function (i, el) {
  //     el.style.color = 'red'
  //   })

  //   return this
  // },

  removeItemByIndex: function removeItemByIndex(index) {
    return this.pushStack(lxQuery.removeItemByIndex(index, [].concat(_toConsumableArray(this.nodeList))));
  },

  serialize: function serialize() {
    if (this.nodeList.length !== 1) {
      return '';
    }

    var form = this.nodeList[0];

    if (!form || form.tagName.toUpperCase() !== 'FORM') {
      return '';
    }

    var serializeObj = {};

    var inputList = lxQuery('input', form);

    lxQuery.each([].concat(_toConsumableArray(inputList.nodeList)), function (i, el) {
      serializeObj[encodeURIComponent(el.name)] = encodeURIComponent(el.value);
    });

    return lxQuery.serialize(serializeObj);
  }
}, _dom2.default, _style2.default, _event2.default));

lxQuery.fn.init.prototype = lxQuery.fn;

// 如果global指向window则说明是浏览器环境, 则对外暴露接口
if (!noGlobal) {
  window.lx = window.lxQuery = lxQuery;
}

exports.default = lxQuery;

/***/ }),

/***/ "./src/defer/defer.js":
/*!****************************!*\
  !*** ./src/defer/defer.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = __webpack_require__(/*! ../util */ "./src/util/index.js");

/**
 * 仿Promise
 */

function LxPromise(fn) {
  var self = this;

  self.value = null;
  self.reason = null;

  self.resolveList = [];
  self.rejectList = [];

  self.status = 'PENDING';

  function resolve(value) {
    setTimeout(function () {
      self.status = 'FULFILLED';

      (0, _util.each)(self.resolveList, function (i, callback) {
        callback(value);
      });
    }, 0);
  }

  function reject(reason) {
    setTimeout(function () {
      self.status = 'REJECTED';

      (0, _util.each)(self.rejectList, function (i, callback) {
        callback(reason);
      });
    }, 0);
  }

  fn(resolve, reject);
}

LxPromise.prototype.done = function (onFulfilled, onRejected) {
  var self = this;

  return new LxPromise(function (resolve, reject) {
    function handle(value) {
      var ret = typeof onFulfilled === 'function' && onFulfilled(value) || value;

      if (ret && ret.done && ret.fail) {
        ret.done(function (value) {
          resolve(value);
        });
      } else {
        resolve(ret);
      }
    }

    function errhandle(reason) {
      reason = typeof onRejected === 'function' && onRejected(reason) || reason;

      reject(reason);
    }

    if (self.status === 'PENDING') {
      self.resolveList.push(handle);
      self.rejectList.push(errhandle);
    } else if (self.status === 'FULFILLED') {
      handle(self.value);
    } else {
      errhandle(self.reason);
    }
  });
};

LxPromise.prototype.fail = function (onRejected) {
  return this.done(undefined, onRejected);
};

var defer = {
  defer: function defer(fn) {
    return new LxPromise(fn);
  }
};

exports.default = defer;

/***/ }),

/***/ "./src/defer/index.js":
/*!****************************!*\
  !*** ./src/defer/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _defer = __webpack_require__(/*! ./defer */ "./src/defer/defer.js");

var _defer2 = _interopRequireDefault(_defer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _extends({}, _defer2.default);

/***/ }),

/***/ "./src/dom/attr.js":
/*!*************************!*\
  !*** ./src/dom/attr.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _util = __webpack_require__(/*! ../util */ "./src/util/index.js");

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var attr = {
  /**
   * 设置dom节点的attribute
   *
   * 1个参数 {String or Object}
   * 参数类型为String时, 该参数为attribute, 获取节点列表中所有节点的该attribute, 并push进数组中返回
   * 参数类型为Object时, 该参数为key为attribute value为值的对象, 按对象键值对设置节点列表的attribute
   *
   * 2个参数 {String} [attribute] {String} [value] or {String} [attribute] {Function} {callback}
   * 第一个参数为attribute
   * 当第二个参数为String时, 该参数为value, 设置该节点的attribute
   * 当第二个参数为Function时, 该参数为回调, 根据此节点的该attribute进行操作
   *
   */
  attr: function attr() {
    var self = this;

    if (!arguments.length) {
      return this;
    }

    if (arguments.length === 1) {
      var param = arguments.length <= 0 ? undefined : arguments[0];

      if (typeof param === 'string') {
        var attrList = [];

        (0, _util.each)([].concat(_toConsumableArray(this.nodeList)), function (i, el) {
          attrList.push(el.getAttribute(param));
        });

        return attrList;
      } else if ((typeof param === 'undefined' ? 'undefined' : _typeof(param)) === 'object') {
        (0, _util.each)(param, function (name, value) {
          (0, _util.each)([].concat(_toConsumableArray(self.nodeList)), function (i, el) {
            el.setAttribute(name, value);
          });
        });

        return this;
      }

      return this;
    }

    if (arguments.length >= 2) {
      var name = arguments.length <= 0 ? undefined : arguments[0];
      var value = arguments.length <= 1 ? undefined : arguments[1];

      if (typeof name !== 'string') {
        return this;
      }

      if (typeof value === 'string') {
        (0, _util.each)([].concat(_toConsumableArray(this.nodeList)), function (i, el) {
          el.setAttribute(name, value);
        });

        return this;
      }

      if (typeof value === 'function') {
        (0, _util.each)([].concat(_toConsumableArray(this.nodeList)), function (i, el) {
          el.setAttribute(name, value(i, el.getAttribute(name)));
        });

        return this;
      }

      return this;
    }
  },

  /**
   * removeAttribute
   * @param  {String} attrs
   */
  removeAttr: function removeAttr(attrs) {
    var attrList = (0, _util.spaceSplit2Arr)(attrs);

    (0, _util.each)([].concat(_toConsumableArray(this.nodeList)), function (i, el) {
      (0, _util.each)(attrList, function (i, name) {
        el.removeAttribute(name);
      });
    });

    return this;
  }
};

exports.default = attr;

/***/ }),

/***/ "./src/dom/dom.js":
/*!************************!*\
  !*** ./src/dom/dom.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = __webpack_require__(/*! ../util */ "./src/util/index.js");

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var dom = {
  /** 移除节点 **/
  removeNode: function removeNode() {
    (0, _util.each)([].concat(_toConsumableArray(this.nodeList)), function (i, el) {
      if (!el.parentNode) {
        return false;
      }

      el.parentNode.removeChild(el);

      el = null;
    });

    return this;
  },

  /** 在目标节点前插入新节点 **/
  insertBefore: function insertBefore(node) {
    (0, _util.each)([].concat(_toConsumableArray(this.nodeList)), function (i, el) {
      el.parentNode.insertBefore(node.cloneNode(true), el);
    });

    return this;
  },

  /** 在目标节点后插入新节点 **/
  insertAfter: function insertAfter(node) {
    (0, _util.each)([].concat(_toConsumableArray(this.nodeList)), function (i, el) {
      if ((0, _util.last)([].concat(_toConsumableArray(el.parentNode.children)))[0] === el) {
        el.parentNode.appendChild(node.cloneNode(true));
      } else {
        el.parentNode.insertBefore(node.cloneNode(true), el.nextSibling);
      }
    });

    return this;
  },

  /** 在最后插入 **/
  appendChild: function appendChild(node) {
    (0, _util.each)([].concat(_toConsumableArray(this.nodeList)), function (i, el) {
      el.appendChild(node.cloneNode(true));
    });

    return this;
  },

  /** 在最开始插入 **/
  prependChild: function prependChild(node) {
    (0, _util.each)([].concat(_toConsumableArray(this.nodeList)), function (i, el) {
      if (!el.children.length) {
        el.appendChild(node.cloneNode(true));
      } else {
        el.insertBefore(node.cloneNode(true), el.firstChild);
      }

      return this;
    });
  }
};

exports.default = dom;

/***/ }),

/***/ "./src/dom/index.js":
/*!**************************!*\
  !*** ./src/dom/index.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _dom = __webpack_require__(/*! ./dom */ "./src/dom/dom.js");

var _dom2 = _interopRequireDefault(_dom);

var _attr = __webpack_require__(/*! ./attr */ "./src/dom/attr.js");

var _attr2 = _interopRequireDefault(_attr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _extends({}, _attr2.default, _dom2.default);

/***/ }),

/***/ "./src/event/event.js":
/*!****************************!*\
  !*** ./src/event/event.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = __webpack_require__(/*! ../util */ "./src/util/index.js");

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function evtBindEle() {
  var opts = {
    /** 节点对应事件注册表 **/
    // e.g. evtDic: [{element1: 'elmentName', event: {click: [fn1, fn2], mouseup:[fn]} }, {element2:....}]
    evtDic: [],

    // 在注册表上注册节点与事件
    add: function add(el, type, evt) {
      var evtDic = this.evtDic;

      if (!evtDic.some(function (item, index) {
        return item.element === el;
      })) {
        evtDic.push({
          element: el,
          event: {}
        });
      }

      (0, _util.each)(evtDic, function (i, item) {
        if (item.element === el) {
          if (!item.event[type]) {
            item.event[type] = [];
          }

          item.event[type].push(evt);

          return false;
        }
      });

      // console.log(evtDic)
    },

    // 在注册表上删除节点与事件
    remove: function remove(el, type, evt) {
      var evtDic = this.evtDic;

      if (el && type && evt) {
        (0, _util.each)(evtDic, function (i, item) {
          if (item.element === el) {
            item.event[type].splice(item.event[type].indexOf(evt), 1);

            if (!item.event[type].length) {
              delete item.event[type];
            }

            return false;
          }
        });
      }

      if (el && type && !evt) {
        (0, _util.each)(evtDic, function (i, item) {
          if (item.element === el) {
            item.event[type] = [];

            return false;
          }
        });
      }

      if (el && !type && !evt) {
        (0, _util.each)(evtDic, function (i, item) {
          if (item.element === el) {
            item.event = {};

            return false;
          }
        });
      }

      // console.log(evtDic)
    },

    // 在注册表中查找节点上的事件并返回
    find: function find(el) {
      var evtDic = this.evtDic;
      var result = void 0;

      (0, _util.each)(evtDic, function (i, item) {
        if (item.element === el) {
          result = evtDic[i].event;
          return false;
        }
      });

      return result;
    }
  };

  return opts;
}

var eBE = evtBindEle();

var event = {
  /**
   * 添加事件
   * @param {String} type
   * @param {Function} callback
   *
   * 给节点添加事件
   */
  on: function on(type, callback) {
    if (!global.addEventListener) {
      return this;
    }

    if (!type || !callback) {
      return this;
    }

    if (typeof type !== 'string' || typeof callback !== 'function') {
      return this;
    }

    var typeList = (0, _util.spaceSplit2Arr)(type);

    (0, _util.each)([].concat(_toConsumableArray(this.nodeList)), function (i, el) {
      (0, _util.each)(typeList, function (i, evtType) {
        eBE.add(el, evtType, callback);

        el.addEventListener(evtType, callback, false);
      });
    });

    return this;
  },

  /**
   * 删除事件
   * @param {String} type
   * @param {Function} callback
   *
   * 输入参数为type callback时, 卸载节点对应的type事件类型上的对应事件
   *
   * 输入参数为type时, 卸载节点对应的type上的所有事件
   *
   * 无参数时, 卸载节点上绑定的所有event
   */
  off: function off(type, callback) {
    if (!global.removeEventListener) {
      return this;
    }

    var typeList = (0, _util.spaceSplit2Arr)(type);

    if (type && callback) {
      (0, _util.each)([].concat(_toConsumableArray(this.nodeList)), function (i, el) {
        (0, _util.each)(typeList, function (i, evtType) {
          eBE.remove(el, evtType, callback);

          el.removeEventListener(evtType, callback);
        });
      });
    }

    if (type && !callback) {
      (0, _util.each)([].concat(_toConsumableArray(this.nodeList)), function (i, el) {
        (0, _util.each)(typeList, function (i, evtType) {
          (0, _util.each)(eBE.find(el)[evtType], function (i, evt) {
            el.removeEventListener(evtType, evt);
          });

          eBE.remove(el, evtType);
        });
      });
    }

    if (!type && !callback) {
      (0, _util.each)([].concat(_toConsumableArray(this.nodeList)), function (i, el) {
        (0, _util.each)(eBE.find(el), function (evtType, event) {
          (0, _util.each)(event, function (i, evt) {
            el.removeEventListener(evtType, evt);
          });
        });

        eBE.remove(el);
      });
    }

    return this;
  }
};

exports.default = event;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/event/index.js":
/*!****************************!*\
  !*** ./src/event/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _event = __webpack_require__(/*! ./event */ "./src/event/event.js");

var _event2 = _interopRequireDefault(_event);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _extends({}, _event2.default);

/***/ }),

/***/ "./src/extra/cookie.js":
/*!*****************************!*\
  !*** ./src/extra/cookie.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
var cookie = {
  setCookie: function setCookie(name, value) {
    global.document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
  },

  getCookie: function getCookie(name) {
    var cookie = decodeURIComponent(global.document.cookie);

    var ret = new RegExp(name + "=(.*?)(?:;|$)");

    var result = cookie.match(ret);

    return result ? result[1] : undefined;
  },

  removeCookie: function removeCookie(name) {
    global.document.cookie = encodeURIComponent(name) + "='';Expires=" + new Date(0);
  }
};

exports.default = cookie;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/extra/debounce.js":
/*!*******************************!*\
  !*** ./src/extra/debounce.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var debounce = {
  createDebounce: function createDebounce(callback) {
    var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 200;

    var timer = void 0;

    return function () {
      clearTimeout(timer);

      timer = setTimeout(function () {
        callback();
      }, delay);
    };
  }
};

exports.default = debounce;

/***/ }),

/***/ "./src/extra/formatDate.js":
/*!*********************************!*\
  !*** ./src/extra/formatDate.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var formatDate = {
  /**
   * @日期格式化
   *
   * @param {String} pattern 日期格式 (格式化字符串的符号参考w3标准 http://www.w3.org/TR/NOTE-datetime)
   * @param {Date Object} date 待格式化的日期对象
   * @return {String} 格式化后的日期字符串
   * @example
   * formatDate("YYYY-MM-DD hh:mm:ss", (new Date()));
   */

  formatDate: function formatDate(pattern, date) {
    if (typeof date !== 'number' && !(date instanceof Date)) {
      return '';
    }

    if (typeof date === 'number') {
      date = new Date(date);
    }

    function formatNumber(format, num) {
      format = format.length;

      return format === 1 ? num : String(Math.pow(10, format) + num).slice(-format);
    }

    var result = pattern.replace(/([YMDhms])\1*/g, function (format) {
      switch (format.charAt()) {
        case 'Y':
          return formatNumber(format, date.getFullYear());
        case 'M':
          return formatNumber(format, date.getMonth() + 1);
        case 'D':
          return formatNumber(format, date.getDate());
        case 'h':
          return formatNumber(format, date.getHours());
        case 'm':
          return formatNumber(format, date.getMinutes());
        case 's':
          return formatNumber(format, date.getSeconds());
      }
    });

    return result;
  }

};

exports.default = formatDate;

/***/ }),

/***/ "./src/extra/getAbsoluteUrl.js":
/*!*************************************!*\
  !*** ./src/extra/getAbsoluteUrl.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
var getAbsoluteUrl = {
  getAbsoluteUrl: function getAbsoluteUrl(url) {
    var a = global.document.createElement('a');

    a.href = encodeURIComponent(url);

    return a.href;
  }
};

exports.default = getAbsoluteUrl;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/extra/index.js":
/*!****************************!*\
  !*** ./src/extra/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _query = __webpack_require__(/*! ./query */ "./src/extra/query.js");

var _query2 = _interopRequireDefault(_query);

var _getAbsoluteUrl = __webpack_require__(/*! ./getAbsoluteUrl */ "./src/extra/getAbsoluteUrl.js");

var _getAbsoluteUrl2 = _interopRequireDefault(_getAbsoluteUrl);

var _debounce = __webpack_require__(/*! ./debounce */ "./src/extra/debounce.js");

var _debounce2 = _interopRequireDefault(_debounce);

var _throttle = __webpack_require__(/*! ./throttle */ "./src/extra/throttle.js");

var _throttle2 = _interopRequireDefault(_throttle);

var _sleep = __webpack_require__(/*! ./sleep */ "./src/extra/sleep.js");

var _sleep2 = _interopRequireDefault(_sleep);

var _cookie = __webpack_require__(/*! ./cookie */ "./src/extra/cookie.js");

var _cookie2 = _interopRequireDefault(_cookie);

var _localStorage = __webpack_require__(/*! ./localStorage */ "./src/extra/localStorage.js");

var _localStorage2 = _interopRequireDefault(_localStorage);

var _sessionStorage = __webpack_require__(/*! ./sessionStorage */ "./src/extra/sessionStorage.js");

var _sessionStorage2 = _interopRequireDefault(_sessionStorage);

var _formatDate = __webpack_require__(/*! ./formatDate */ "./src/extra/formatDate.js");

var _formatDate2 = _interopRequireDefault(_formatDate);

var _xss = __webpack_require__(/*! ./xss */ "./src/extra/xss.js");

var _xss2 = _interopRequireDefault(_xss);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _extends({}, _query2.default, _getAbsoluteUrl2.default, _debounce2.default, _throttle2.default, _sleep2.default, _cookie2.default, _localStorage2.default, _sessionStorage2.default, _formatDate2.default, _xss2.default);

/***/ }),

/***/ "./src/extra/localStorage.js":
/*!***********************************!*\
  !*** ./src/extra/localStorage.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
var localStorage = {
  setLocalStorage: function setLocalStorage(name, value) {
    var storage = global.localStorage;

    storage.setItem(name, value);
  },

  getLocalStorage: function getLocalStorage(name) {
    var storage = global.localStorage;

    var res = storage.getItem(name);

    return res || undefined;
  },

  removeLocalStorage: function removeLocalStorage(name) {
    var storage = global.localStorage;

    if (name) {
      storage.removeItem(name);
    } else {
      storage.clear();
    }
  }
};

exports.default = localStorage;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/extra/query.js":
/*!****************************!*\
  !*** ./src/extra/query.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var query = {
    /**
     * 获取指定的 querystring 中指定 name 的 value
     * @param {String} name
     * @param {String} querystring
     * @return {String|undefined}
     *
     * query('hello', '?hello=js') 结果是 js
     *
     */
    query: function query(name, querystring) {
        var result = void 0;

        name = encodeURIComponent(name);

        var reg = new RegExp("(?:(?=^)|\\?|&|#)" + name + "=(.*?)(?:&|$|#)");

        result = querystring.match(reg);

        return result ? result[1] : undefined;
    }
};

exports.default = query;

/***/ }),

/***/ "./src/extra/sessionStorage.js":
/*!*************************************!*\
  !*** ./src/extra/sessionStorage.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
var sessionStorage = {
  setSessionStorage: function setSessionStorage(name, value) {
    var storage = global.sessionStorage;

    storage.setItem(name, value);
  },

  getSessionStorage: function getSessionStorage(name) {
    var storage = global.sessionStorage;

    var res = storage.getItem(name);

    return res || undefined;
  },

  removeSessionStorage: function removeSessionStorage(name) {
    var storage = global.sessionStorage;

    if (name) {
      storage.removeItem(name);
    } else {
      storage.clear();
    }
  }
};

exports.default = sessionStorage;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/extra/sleep.js":
/*!****************************!*\
  !*** ./src/extra/sleep.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var sleep = {
  sleep: function sleep(time) {
    return new Promise(function (resolve) {
      return setTimeout(resolve, time);
    });
  }
};

exports.default = sleep;

/***/ }),

/***/ "./src/extra/throttle.js":
/*!*******************************!*\
  !*** ./src/extra/throttle.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var throttle = {
  createThrottle: function createThrottle(callback) {
    var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;

    var timer = void 0;

    return function () {
      if (!timer) {
        timer = setTimeout(function () {
          callback();

          clearTimeout(timer);

          timer = null;
        }, delay);
      }
    };
  }
};

exports.default = throttle;

/***/ }),

/***/ "./src/extra/xss.js":
/*!**************************!*\
  !*** ./src/extra/xss.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var xss = {
  /**
   * 去掉所有的html标签, 只保留标签中的文本
   *
   * 标签有4类情况
   * 1.双标签 <div></div>
   * 2.单标签 <input />、<input>、</input>(这种标签虽然不会被编译, 但还是要和谐一下, 若不为英文, 则会被编译为注释)、</ input>(会被编译为注释)
   * 3.空标签 <></>、<>、</>
   * 4.会被直接编译为文本的标签 < div>、<中文>, <123 /> 这类标签可以开绿灯
   *
   * test:
   *
   * input：
   * delHtmlTag('<h1>这是h1的内容!<a href="a.com">详情可点击</a></><img src="a.jpg" />')
   * output:
   * 这是h1的内容!详情可点击
   *
   * input:
   * delHtmlTag('<啦啦啦 />123456<123></input aaa>')
   * output:
   * <啦啦啦 />123456<123>
   */
  delHtmlTag: function delHtmlTag(text) {
    var REG_Tab_Double = /<([a-z]*?)[^<>]*?>(.*?)<\/\1>/ig;
    var REG_Tab_Single = /<(?:[a-z]+?.*?\/?|\/.+?)>/ig;
    var REG_Tab_Null = /<\s*?\/*?\s*?>/ig;

    return text.replace(REG_Tab_Double, function ($0, $1, $2) {
      return $2;
    }).replace(REG_Tab_Single, '').replace(REG_Tab_Null);
  },

  /**
   * 转义 HTML 特殊字符
   * @param {String} str
   */
  htmlEncode: function htmlEncode(str) {
    return String(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
};

exports.default = xss;

/***/ }),

/***/ "./src/lxquery.js":
/*!************************!*\
  !*** ./src/lxquery.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _core = __webpack_require__(/*! ./core */ "./src/core/index.js");

var _core2 = _interopRequireDefault(_core);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = _core2.default; /*!
                                  * lxQuery JavaScript Library v1.0.0
                                  *
                                  * author: 李骁
                                  *
                                  * Date: 2018-08-20T17:24Z
                                  */

/***/ }),

/***/ "./src/style/class.js":
/*!****************************!*\
  !*** ./src/style/class.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = __webpack_require__(/*! ../util */ "./src/util/index.js");

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var Class = {
  /** 添加class **/
  addClass: function addClass(cls) {
    var styleList = (0, _util.spaceSplit2Arr)(cls);

    (0, _util.each)([].concat(_toConsumableArray(this.nodeList)), function (i, el) {
      (0, _util.each)(styleList, function (i, value) {
        el.classList.add(value);
      });
    });

    return this;
  },

  /** 移除class **/
  removeClass: function removeClass(cls) {
    var styleList = (0, _util.spaceSplit2Arr)(cls);

    (0, _util.each)([].concat(_toConsumableArray(this.nodeList)), function (i, el) {
      (0, _util.each)(styleList, function (i, value) {
        el.classList.remove(value);
      });
    });

    return this;
  },

  /** 切换样式 **/
  toggleClass: function toggleClass(cls) {
    var styleList = (0, _util.spaceSplit2Arr)(cls);

    (0, _util.each)([].concat(_toConsumableArray(this.nodeList)), function (i, el) {
      (0, _util.each)(styleList, function (i, value) {
        if (el.classList.contains(value)) {
          el.classList.remove(value);
        } else {
          el.classList.add(value);
        }
      });
    });

    return this;
  }
};

exports.default = Class;

/***/ }),

/***/ "./src/style/css.js":
/*!**************************!*\
  !*** ./src/style/css.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _util = __webpack_require__(/*! ../util */ "./src/util/index.js");

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var css = {
  /**
   * css 控制
   *
   * 1个参数 {String or Object}
   * 参数类型为String时, 该参数为css样式, 获取节点列表中所有节点的该css样式, 并push进数组中返回
   * 参数类型为Object时, 该参数为key为css value为值的对象, 按对象键值对设置节点列表的css样式
   *
   * 2个参数 {String} [css] {String} [value] or {String} [css] {Function} {callback}
   * 第一个参数为css样式
   * 当第二个参数为String时, 该参数为value, 设置该节点的css
   * 当第二个参数为Function时, 该参数为回调, 根据此节点的该css样式进行操作
   *
   */
  css: function css() {
    var self = this;

    if (!arguments.length) {
      return this;
    }

    if (arguments.length === 1) {
      var param = arguments.length <= 0 ? undefined : arguments[0];

      if (typeof param === 'string') {
        var styleList = [];

        (0, _util.each)([].concat(_toConsumableArray(this.nodeList)), function (i, el) {
          styleList.push(global.getComputedStyle(el)[param]);
        });

        return styleList;
      } else if ((typeof param === 'undefined' ? 'undefined' : _typeof(param)) === 'object') {
        (0, _util.each)(param, function (name, value) {
          (0, _util.each)([].concat(_toConsumableArray(self.nodeList)), function (i, el) {
            el.style[name] = value;
          });
        });

        return this;
      }

      return this;
    }

    if (arguments.length >= 2) {
      var name = arguments.length <= 0 ? undefined : arguments[0];
      var value = arguments.length <= 1 ? undefined : arguments[1];

      if (typeof name !== 'string') {
        return this;
      }

      if (typeof value === 'string') {
        (0, _util.each)([].concat(_toConsumableArray(this.nodeList)), function (i, el) {
          el.style[name] = value;
        });

        return this;
      }

      if (typeof value === 'function') {
        (0, _util.each)([].concat(_toConsumableArray(this.nodeList)), function (i, el) {
          el.style[name] = value(i, global.getComputedStyle(el)[name]);
        });

        return this;
      }

      return this;
    }
  }
};

exports.default = css;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/style/index.js":
/*!****************************!*\
  !*** ./src/style/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class = __webpack_require__(/*! ./class */ "./src/style/class.js");

var _class2 = _interopRequireDefault(_class);

var _css = __webpack_require__(/*! ./css */ "./src/style/css.js");

var _css2 = _interopRequireDefault(_css);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _extends({}, _class2.default, _css2.default);

/***/ }),

/***/ "./src/util/index.js":
/*!***************************!*\
  !*** ./src/util/index.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// 一些常用的工具函数

/**
 * 元素选择器 暂只支持querySelectorAll
 * @param  {String}   selector
 * @param  {Obj}      context   required
 * @return {Arr or LikeArr}
 *
 * domSelector('.className', document) 等价于 document.querySelectorAll('.className')
 * 无context, context不支持querySelectorAll, 无相关元素均返回一个空数组 []
 */
var domSelector = exports.domSelector = function domSelector(selector, context) {
  if (!context) {
    return [];
  }

  if (!context.querySelectorAll) {
    return [];
  }

  return context.querySelectorAll(selector);
};

/**
 * 循环
 * @param  {Array or Obj}   obj
 * @param  {Function}       callback
 * @return {Array or Obj}
 *
 * 接收一个对象或数组, 并循环执行回调函数
 * 若回调函数返回false, 则终止循环
 */
var each = exports.each = function each(obj, callback) {
  var i = 0;
  var len = void 0;

  if (Array.isArray(obj)) {
    len = obj.length;
    for (; i < len; i++) {
      if (callback.call(obj[i], i, obj[i]) === false) {
        break;
      }
    }
  } else if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object') {
    for (i in obj) {
      if (callback.call(obj[i], i, obj[i]) === false) {
        break;
      }
    }
  }

  return obj;
};

/**
 * 合并
 * @param  {Array or like Array} first
 * @param  {Array} second
 * @return {Array or like Array}
 *
 * 将第二个数组合并至第一个数组或类数组中, 并返回第一个数组或类数组
 */
var merge = exports.merge = function merge(first, second) {
  var i = first.length;
  var len = second.length;
  var j = 0;

  for (; j < len; j++) {
    first[i++] = second[j];
  }

  first.length = i;

  return first;
};

/**
 * index 数组选择器
 * @param  {Array}  arr
 * @param  {Number} i
 * @return {Array}
 *
 * 根据index返回数组的其中一项
 */
var eq = exports.eq = function eq(arr, i) {
  var len = arr.length;
  var j = void 0;

  j = i + (i < 0 ? len : 0);

  return j >= 0 && j < len ? [arr[j]] : [];
};

/** 选择数组的第一项并返回 **/
var first = exports.first = function first(arr) {
  return eq(arr, 0);
};

/** 选择数组的最后一项并返回 **/
var last = exports.last = function last(arr) {
  return eq(arr, -1);
};

/**
 * 处理被空格分隔的字符串并转为数组
 * @param  {String} str
 * @return {Sting}
 *
 * spaceSplit2Arr('a b c') 返回 ['a', 'b', 'c']
 */
var spaceSplit2Arr = exports.spaceSplit2Arr = function spaceSplit2Arr(str) {
  if (typeof str !== 'string') {
    return [];
  }

  return str.split(' ');
};

/**
 * 根据索引移出数组的某一项
 * @param {Number} index
 * @param {Array} arr
 * @return {Array}
 *
 * removeItemByIndex(-1, [1,2,3]) => [1, 2]
 */
var removeItemByIndex = exports.removeItemByIndex = function removeItemByIndex(index, arr) {
  var len = arr.length;

  index += index < 0 ? len : 0;

  if (index >= 0 && index < len) {
    arr.splice(index, 1);
  }

  return arr;
};

/**
 * 序列化对象，就是把对象转成 url 字符串
 * @param {Obj} data
 * @return {String}
 *
 * serialize({hello: 'js', hi: 'test'}) 结果是 ''
 */
var serialize = exports.serialize = function serialize(data) {
  if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) !== 'object') {
    return '';
  }

  var serializeStr = '';
  var serializeArr = [];

  each(data, function (key, value) {
    key = encodeURIComponent(key);
    value = encodeURIComponent(value);

    serializeArr.push(key + '=' + value);
  });

  serializeStr = serializeArr.join('&');

  return serializeStr;
};

exports.default = {
  domSelector: domSelector,
  each: each,
  merge: merge,
  eq: eq,
  first: first,
  last: last,
  spaceSplit2Arr: spaceSplit2Arr,
  removeItemByIndex: removeItemByIndex,
  serialize: serialize
};

/***/ }),

/***/ 0:
/*!******************************!*\
  !*** multi ./src/lxquery.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/lxquery.js */"./src/lxquery.js");


/***/ })

/******/ });
})