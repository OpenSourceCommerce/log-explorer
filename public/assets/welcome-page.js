/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded CSS chunks
/******/ 	var installedCssChunks = {
/******/ 		"welcome-page": 0
/******/ 	}
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"welcome-page": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + ({}[chunkId]||chunkId) + ".js"
/******/ 	}
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
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// mini-css-extract-plugin CSS loading
/******/ 		var cssChunks = {"0":1};
/******/ 		if(installedCssChunks[chunkId]) promises.push(installedCssChunks[chunkId]);
/******/ 		else if(installedCssChunks[chunkId] !== 0 && cssChunks[chunkId]) {
/******/ 			promises.push(installedCssChunks[chunkId] = new Promise(function(resolve, reject) {
/******/ 				var href = "" + ({}[chunkId]||chunkId) + ".css";
/******/ 				var fullhref = __webpack_require__.p + href;
/******/ 				var existingLinkTags = document.getElementsByTagName("link");
/******/ 				for(var i = 0; i < existingLinkTags.length; i++) {
/******/ 					var tag = existingLinkTags[i];
/******/ 					var dataHref = tag.getAttribute("data-href") || tag.getAttribute("href");
/******/ 					if(tag.rel === "stylesheet" && (dataHref === href || dataHref === fullhref)) return resolve();
/******/ 				}
/******/ 				var existingStyleTags = document.getElementsByTagName("style");
/******/ 				for(var i = 0; i < existingStyleTags.length; i++) {
/******/ 					var tag = existingStyleTags[i];
/******/ 					var dataHref = tag.getAttribute("data-href");
/******/ 					if(dataHref === href || dataHref === fullhref) return resolve();
/******/ 				}
/******/ 				var linkTag = document.createElement("link");
/******/ 				linkTag.rel = "stylesheet";
/******/ 				linkTag.type = "text/css";
/******/ 				linkTag.onload = resolve;
/******/ 				linkTag.onerror = function(event) {
/******/ 					var request = event && event.target && event.target.src || fullhref;
/******/ 					var err = new Error("Loading CSS chunk " + chunkId + " failed.\n(" + request + ")");
/******/ 					err.request = request;
/******/ 					reject(err);
/******/ 				};
/******/ 				linkTag.href = fullhref;
/******/ 				var head = document.getElementsByTagName("head")[0];
/******/ 				head.appendChild(linkTag);
/******/ 			}).then(function() {
/******/ 				installedCssChunks[chunkId] = 0;
/******/ 			}));
/******/ 		}
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
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
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./assets/js/pages/index/welcome.js","vendors~alerts_list~app~dashboard-page~dashboard_empty~dashboard_form~export_list~flot_chart~graph_f~fed29054","vendors~alerts_list~dashboard-page~dashboard_empty~dashboard_form~export_list~flot_chart~graph_form~~fe102de6","alerts_list~dashboard-page~dashboard_empty~dashboard_form~export_list~flot_chart~graph_form~graph_li~f320c34b"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/js/pages/index/welcome.js":
/*!******************************************!*\
  !*** ./assets/js/pages/index/welcome.js ***!
  \******************************************/
/*! exports provided: WelcomePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WelcomePage", function() { return WelcomePage; });
/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.symbol */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.symbol.description */ "./node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator */ "./node_modules/core-js/modules/es.symbol.iterator.js");
/* harmony import */ var core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.concat */ "./node_modules/core-js/modules/es.array.concat.js");
/* harmony import */ var core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.array.iterator */ "./node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_array_map__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.array.map */ "./node_modules/core-js/modules/es.array.map.js");
/* harmony import */ var core_js_modules_es_array_map__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_date_to_string__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.date.to-string */ "./node_modules/core-js/modules/es.date.to-string.js");
/* harmony import */ var core_js_modules_es_date_to_string__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_date_to_string__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_object_create__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.object.create */ "./node_modules/core-js/modules/es.object.create.js");
/* harmony import */ var core_js_modules_es_object_create__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_create__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_object_define_property__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.object.define-property */ "./node_modules/core-js/modules/es.object.define-property.js");
/* harmony import */ var core_js_modules_es_object_define_property__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_define_property__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_object_get_prototype_of__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.object.get-prototype-of */ "./node_modules/core-js/modules/es.object.get-prototype-of.js");
/* harmony import */ var core_js_modules_es_object_get_prototype_of__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_prototype_of__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.object.set-prototype-of */ "./node_modules/core-js/modules/es.object.set-prototype-of.js");
/* harmony import */ var core_js_modules_es_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_es_reflect_construct__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! core-js/modules/es.reflect.construct */ "./node_modules/core-js/modules/es.reflect.construct.js");
/* harmony import */ var core_js_modules_es_reflect_construct__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_reflect_construct__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! core-js/modules/es.regexp.to-string */ "./node_modules/core-js/modules/es.regexp.to-string.js");
/* harmony import */ var core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! core-js/modules/es.string.iterator */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var core_js_modules_web_timers__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! core-js/modules/web.timers */ "./node_modules/core-js/modules/web.timers.js");
/* harmony import */ var core_js_modules_web_timers__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_timers__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var _styles_pages_welcome_scss__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../../styles/pages/welcome.scss */ "./assets/styles/pages/welcome.scss");
/* harmony import */ var _styles_pages_welcome_scss__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(_styles_pages_welcome_scss__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../components */ "./assets/js/components/index.js");


















function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }





var WelcomePage = /*#__PURE__*/function (_Component) {
  _inherits(WelcomePage, _Component);

  var _super = _createSuper(WelcomePage);

  function WelcomePage(props) {
    var _this;

    _classCallCheck(this, WelcomePage);

    _this = _super.call(this, props);
    _this.state = {
      createSampleDatabase: false,
      createSampleData: false
    };
    return _this;
  }

  _createClass(WelcomePage, [{
    key: "copyToClipboard",
    value: function copyToClipboard(e, str, id) {
      var _this2 = this;

      e.preventDefault();
      var el = document.createElement('textarea');
      el.value = str;
      el.setAttribute('readonly', '');
      el.style.position = 'absolute';
      el.style.left = '-9999px';
      document.body.append(el);
      el.select();
      document.execCommand('copy');
      el.remove();
      this.setState(_defineProperty({}, id, true), function () {
        setTimeout(function () {
          _this2.setState(_defineProperty({}, id, false));
        }, 2000);
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {}
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var userCommandList = [{
        id: 'createUser',
        command: 'php bin/console app:createuser',
        description: 'Description:\n' + '  This command used to create system user\n' + '\n' + 'Usage:\n' + '  app:createuser [options] [--] <email>\n' + '\n' + 'Arguments:\n' + '  email                      User email\n' + '\n' + 'Options:\n' + '  -p, --password=PASSWORD    User password\n' + '  -f, --firstname=FIRSTNAME  User first name\n' + '  -l, --lastname=LASTNAME    User last name\n' + '      --user                 Create normal user, default is ADMIN\n' + '  -h, --help                 Display this help message\n' + '  -q, --quiet                Do not output any message\n' + '  -V, --version              Display this application version\n' + '      --ansi                 Force ANSI output\n' + '      --no-ansi              Disable ANSI output\n' + '  -n, --no-interaction       Do not ask any interactive question\n' + '  -e, --env=ENV              The Environment name. [default: "dev"]\n' + '      --no-debug             Switches off debug mode.\n' + '  -v|vv|vvv, --verbose       Increase the verbosity of messages: 1 for normal output, 2 for more verbose output and 3 for debug'
      }];
      var dataCommandList = [{
        id: 'createSampleDatabase',
        command: 'php bin/console app:createsampledatabase',
        description: 'Description:\n' + '  This command used to create the sample database at ClickHouse\n' + '\n' + 'Usage:\n' + '  app:createsampledatabase\n' + '\n' + 'Options:\n' + '  -h, --help            Display this help message\n' + '  -q, --quiet           Do not output any message\n' + '  -V, --version         Display this application version\n' + '      --ansi            Force ANSI output\n' + '      --no-ansi         Disable ANSI output\n' + '  -n, --no-interaction  Do not ask any interactive question\n' + '  -e, --env=ENV         The Environment name. [default: "dev"]\n' + '      --no-debug        Switches off debug mode.\n' + '  -v|vv|vvv, --verbose  Increase the verbosity of messages: 1 for normal output, 2 for more verbose output and 3 for debug'
      }, {
        id: 'createSampleData',
        command: 'php bin/console app:createsampledata',
        description: 'Description:\n' + '  Create sample data\n' + '\n' + 'Usage:\n' + '  app:createsampledata [options] [--] <number>\n' + '\n' + 'Arguments:\n' + '  number                Number of row in database\n' + '\n' + 'Options:\n' + '      --date=DATE       At date [default: "2020-12-22"]\n' + '      --time=TIME       At special time\n' + '  -h, --help            Display this help message\n' + '  -q, --quiet           Do not output any message\n' + '  -V, --version         Display this application version\n' + '      --ansi            Force ANSI output\n' + '      --no-ansi         Disable ANSI output\n' + '  -n, --no-interaction  Do not ask any interactive question\n' + '  -e, --env=ENV         The Environment name. [default: "dev"]\n' + '      --no-debug        Switches off debug mode.\n' + '  -v|vv|vvv, --verbose  Increase the verbosity of messages: 1 for normal output, 2 for more verbose output and 3 for debug'
      }, {
        id: 'streamSampleData',
        command: 'php bin/console app:streamsampledata',
        description: 'Description:\n' + '  Add sample data\n' + '\n' + 'Usage:\n' + '  app:streamsampledata <number>\n' + '\n' + 'Arguments:\n' + '  number                Number of request per-minute\n' + '\n' + 'Options:\n' + '  -h, --help            Display this help message\n' + '  -q, --quiet           Do not output any message\n' + '  -V, --version         Display this application version\n' + '      --ansi            Force ANSI output\n' + '      --no-ansi         Disable ANSI output\n' + '  -n, --no-interaction  Do not ask any interactive question\n' + '  -e, --env=ENV         The Environment name. [default: "dev"]\n' + '      --no-debug        Switches off debug mode.\n' + '  -v|vv|vvv, --verbose  Increase the verbosity of messages: 1 for normal output, 2 for more verbose output and 3 for debug'
      }];

      var CodeBlock = function CodeBlock(_ref) {
        var item = _ref.item,
            index = _ref.index,
            isUserCommand = _ref.isUserCommand;
        var dataTarget = "collapse".concat(index).concat(isUserCommand ? 'user' : '');
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_17___default.a.createElement("div", {
          key: index,
          className: "mb-2"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_17___default.a.createElement("pre", {
          className: "mb-0"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_17___default.a.createElement("code", {
          id: item.id,
          className: "d-flex justify-content-between"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_17___default.a.createElement("a", {
          className: "command me-5 me-md-0",
          "data-toggle": "collapse",
          "aria-expanded": "false",
          "data-target": "#".concat(dataTarget),
          role: "buttons",
          href: "#",
          "aria-controls": dataTarget
        }, item.command), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_17___default.a.createElement("a", {
          className: "copy-icon float-end tooltipContent",
          onClick: function onClick(e) {
            return _this3.copyToClipboard(e, item.command, item.id);
          },
          href: "#"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_17___default.a.createElement("span", {
          className: "tooltiptext p-2 text-center position-absolute"
        }, _this3.state[item.id] ? 'Copy Success' : 'Copy to Clipboard!'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_17___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_20__["Icon"], {
          name: "copy",
          type: "regular",
          className: "pe-3 pe-md-0"
        })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_17___default.a.createElement("pre", {
          className: "description pt-0 collapse",
          id: dataTarget
        }, item.description));
      };

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_17___default.a.createElement("div", {
        className: "welcome-page row"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_17___default.a.createElement("div", {
        className: "col-12"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_17___default.a.createElement("div", {
        className: "card"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_17___default.a.createElement("div", {
        className: "card-body text-left col-md-8 offset-md-2 mt-5 mb-5"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_17___default.a.createElement("h1", {
        className: "text-center"
      }, "Manage your data easily!"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_17___default.a.createElement("p", {
        className: "mt-3 mb-3"
      }, "Welcome to Log-Explore. It look you does not setup your system. To start you can follow by"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_17___default.a.createElement("h4", null, "Command to create user"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_17___default.a.createElement("p", null, "First, to create your account please use this command"), userCommandList.map(function (item, index) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_17___default.a.createElement(CodeBlock, {
          item: item,
          key: index,
          index: index,
          isUserCommand: "true"
        });
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_17___default.a.createElement("h4", null, "Command console"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_17___default.a.createElement("p", null, "To quickly create sample table and sample data just run there commands:"), dataCommandList.map(function (item, index) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_17___default.a.createElement(CodeBlock, {
          item: item,
          key: index,
          index: index
        });
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_17___default.a.createElement("h4", null, "Application"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_17___default.a.createElement("p", null, "Or if you want to create table by yourself just click ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_17___default.a.createElement("a", {
        href: "/table"
      }, "here"))))));
    }
  }]);

  return WelcomePage;
}(react__WEBPACK_IMPORTED_MODULE_17__["Component"]);
react_dom__WEBPACK_IMPORTED_MODULE_18___default.a.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_17___default.a.createElement(WelcomePage, null), document.querySelector('#welcome-page'));

/***/ }),

/***/ "./assets/styles/pages/welcome.scss":
/*!******************************************!*\
  !*** ./assets/styles/pages/welcome.scss ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3BhZ2VzL2luZGV4L3dlbGNvbWUuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3N0eWxlcy9wYWdlcy93ZWxjb21lLnNjc3MiXSwibmFtZXMiOlsiV2VsY29tZVBhZ2UiLCJwcm9wcyIsInN0YXRlIiwiY3JlYXRlU2FtcGxlRGF0YWJhc2UiLCJjcmVhdGVTYW1wbGVEYXRhIiwiZSIsInN0ciIsImlkIiwicHJldmVudERlZmF1bHQiLCJlbCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInZhbHVlIiwic2V0QXR0cmlidXRlIiwic3R5bGUiLCJwb3NpdGlvbiIsImxlZnQiLCJib2R5IiwiYXBwZW5kIiwic2VsZWN0IiwiZXhlY0NvbW1hbmQiLCJyZW1vdmUiLCJzZXRTdGF0ZSIsInNldFRpbWVvdXQiLCJ1c2VyQ29tbWFuZExpc3QiLCJjb21tYW5kIiwiZGVzY3JpcHRpb24iLCJkYXRhQ29tbWFuZExpc3QiLCJDb2RlQmxvY2siLCJpdGVtIiwiaW5kZXgiLCJpc1VzZXJDb21tYW5kIiwiZGF0YVRhcmdldCIsImNvcHlUb0NsaXBib2FyZCIsIm1hcCIsIkNvbXBvbmVudCIsIlJlYWN0RE9NIiwicmVuZGVyIiwicXVlcnlTZWxlY3RvciJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsUUFBUSxvQkFBb0I7UUFDNUI7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxpQkFBaUIsNEJBQTRCO1FBQzdDO1FBQ0E7UUFDQSxrQkFBa0IsMkJBQTJCO1FBQzdDO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtR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YixzR0FGSixlQUtJLGlHQUxKLGVBTUksK0hBTkosRUFPS0YsZUFBZSxDQUFDVSxHQUFoQixDQUFvQixVQUFDTCxJQUFELEVBQU9DLEtBQVA7QUFBQSw0QkFBaUIsNERBQUMsU0FBRDtBQUFXLGNBQUksRUFBRUQsSUFBakI7QUFDbEMsYUFBRyxFQUFFQyxLQUQ2QjtBQUVsQyxlQUFLLEVBQUVBLEtBRjJCO0FBR2xDLHVCQUFhLEVBQUM7QUFIb0IsVUFBakI7QUFBQSxPQUFwQixDQVBMLGVBYUksMEZBYkosZUFjSSxpSkFkSixFQWdCS0gsZUFBZSxDQUFDTyxHQUFoQixDQUFvQixVQUFDTCxJQUFELEVBQU9DLEtBQVA7QUFBQSw0QkFBaUIsNERBQUMsU0FBRDtBQUFXLGNBQUksRUFBRUQsSUFBakI7QUFDbEMsYUFBRyxFQUFFQyxLQUQ2QjtBQUVsQyxlQUFLLEVBQUVBO0FBRjJCLFVBQWpCO0FBQUEsT0FBcEIsQ0FoQkwsZUFvQkksc0ZBcEJKLGVBcUJJLDhJQUF5RDtBQUNyRCxZQUFJLEVBQUM7QUFEZ0QsZ0JBQXpELENBckJKLENBREosQ0FESixDQURKLENBREo7QUFnQ0g7QUFuTUw7O0FBQUE7QUFBQSxFQUFpQ0ssZ0RBQWpDO0FBc01BQyxpREFBUSxDQUFDQyxNQUFULGVBQWdCLDREQUFDLFdBQUQsT0FBaEIsRUFBZ0MzQixRQUFRLENBQUM0QixhQUFULENBQXVCLGVBQXZCLENBQWhDLEU7Ozs7Ozs7Ozs7O0FDM01BLHVDIiwiZmlsZSI6IndlbGNvbWUtcGFnZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0ZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soZGF0YSkge1xuIFx0XHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuIFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuIFx0XHR2YXIgZXhlY3V0ZU1vZHVsZXMgPSBkYXRhWzJdO1xuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHRcdC8vIGFkZCBlbnRyeSBtb2R1bGVzIGZyb20gbG9hZGVkIGNodW5rIHRvIGRlZmVycmVkIGxpc3RcbiBcdFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2guYXBwbHkoZGVmZXJyZWRNb2R1bGVzLCBleGVjdXRlTW9kdWxlcyB8fCBbXSk7XG5cbiBcdFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiBhbGwgY2h1bmtzIHJlYWR5XG4gXHRcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIFx0fTtcbiBcdGZ1bmN0aW9uIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCkge1xuIFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGRlZmVycmVkTW9kdWxlID0gZGVmZXJyZWRNb2R1bGVzW2ldO1xuIFx0XHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuIFx0XHRcdGZvcih2YXIgaiA9IDE7IGogPCBkZWZlcnJlZE1vZHVsZS5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGRlcElkID0gZGVmZXJyZWRNb2R1bGVbal07XG4gXHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbZGVwSWRdICE9PSAwKSBmdWxmaWxsZWQgPSBmYWxzZTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYoZnVsZmlsbGVkKSB7XG4gXHRcdFx0XHRkZWZlcnJlZE1vZHVsZXMuc3BsaWNlKGktLSwgMSk7XG4gXHRcdFx0XHRyZXN1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IGRlZmVycmVkTW9kdWxlWzBdKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHRyZXR1cm4gcmVzdWx0O1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIENTUyBjaHVua3NcbiBcdHZhciBpbnN0YWxsZWRDc3NDaHVua3MgPSB7XG4gXHRcdFwid2VsY29tZS1wYWdlXCI6IDBcbiBcdH1cblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuIFx0Ly8gUHJvbWlzZSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdFwid2VsY29tZS1wYWdlXCI6IDBcbiBcdH07XG5cbiBcdHZhciBkZWZlcnJlZE1vZHVsZXMgPSBbXTtcblxuIFx0Ly8gc2NyaXB0IHBhdGggZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIGpzb25wU2NyaXB0U3JjKGNodW5rSWQpIHtcbiBcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyAoe31bY2h1bmtJZF18fGNodW5rSWQpICsgXCIuanNcIlxuIFx0fVxuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cbiBcdC8vIFRoaXMgZmlsZSBjb250YWlucyBvbmx5IHRoZSBlbnRyeSBjaHVuay5cbiBcdC8vIFRoZSBjaHVuayBsb2FkaW5nIGZ1bmN0aW9uIGZvciBhZGRpdGlvbmFsIGNodW5rc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5lID0gZnVuY3Rpb24gcmVxdWlyZUVuc3VyZShjaHVua0lkKSB7XG4gXHRcdHZhciBwcm9taXNlcyA9IFtdO1xuXG5cbiBcdFx0Ly8gbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4gQ1NTIGxvYWRpbmdcbiBcdFx0dmFyIGNzc0NodW5rcyA9IHtcIjBcIjoxfTtcbiBcdFx0aWYoaW5zdGFsbGVkQ3NzQ2h1bmtzW2NodW5rSWRdKSBwcm9taXNlcy5wdXNoKGluc3RhbGxlZENzc0NodW5rc1tjaHVua0lkXSk7XG4gXHRcdGVsc2UgaWYoaW5zdGFsbGVkQ3NzQ2h1bmtzW2NodW5rSWRdICE9PSAwICYmIGNzc0NodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ3NzQ2h1bmtzW2NodW5rSWRdID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0XHR2YXIgaHJlZiA9IFwiXCIgKyAoe31bY2h1bmtJZF18fGNodW5rSWQpICsgXCIuY3NzXCI7XG4gXHRcdFx0XHR2YXIgZnVsbGhyZWYgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBocmVmO1xuIFx0XHRcdFx0dmFyIGV4aXN0aW5nTGlua1RhZ3MgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImxpbmtcIik7XG4gXHRcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZXhpc3RpbmdMaW5rVGFncy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHR2YXIgdGFnID0gZXhpc3RpbmdMaW5rVGFnc1tpXTtcbiBcdFx0XHRcdFx0dmFyIGRhdGFIcmVmID0gdGFnLmdldEF0dHJpYnV0ZShcImRhdGEtaHJlZlwiKSB8fCB0YWcuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKTtcbiBcdFx0XHRcdFx0aWYodGFnLnJlbCA9PT0gXCJzdHlsZXNoZWV0XCIgJiYgKGRhdGFIcmVmID09PSBocmVmIHx8IGRhdGFIcmVmID09PSBmdWxsaHJlZikpIHJldHVybiByZXNvbHZlKCk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHR2YXIgZXhpc3RpbmdTdHlsZVRhZ3MgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInN0eWxlXCIpO1xuIFx0XHRcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGV4aXN0aW5nU3R5bGVUYWdzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdHZhciB0YWcgPSBleGlzdGluZ1N0eWxlVGFnc1tpXTtcbiBcdFx0XHRcdFx0dmFyIGRhdGFIcmVmID0gdGFnLmdldEF0dHJpYnV0ZShcImRhdGEtaHJlZlwiKTtcbiBcdFx0XHRcdFx0aWYoZGF0YUhyZWYgPT09IGhyZWYgfHwgZGF0YUhyZWYgPT09IGZ1bGxocmVmKSByZXR1cm4gcmVzb2x2ZSgpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0dmFyIGxpbmtUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcbiBcdFx0XHRcdGxpbmtUYWcucmVsID0gXCJzdHlsZXNoZWV0XCI7XG4gXHRcdFx0XHRsaW5rVGFnLnR5cGUgPSBcInRleHQvY3NzXCI7XG4gXHRcdFx0XHRsaW5rVGFnLm9ubG9hZCA9IHJlc29sdmU7XG4gXHRcdFx0XHRsaW5rVGFnLm9uZXJyb3IgPSBmdW5jdGlvbihldmVudCkge1xuIFx0XHRcdFx0XHR2YXIgcmVxdWVzdCA9IGV2ZW50ICYmIGV2ZW50LnRhcmdldCAmJiBldmVudC50YXJnZXQuc3JjIHx8IGZ1bGxocmVmO1xuIFx0XHRcdFx0XHR2YXIgZXJyID0gbmV3IEVycm9yKFwiTG9hZGluZyBDU1MgY2h1bmsgXCIgKyBjaHVua0lkICsgXCIgZmFpbGVkLlxcbihcIiArIHJlcXVlc3QgKyBcIilcIik7XG4gXHRcdFx0XHRcdGVyci5yZXF1ZXN0ID0gcmVxdWVzdDtcbiBcdFx0XHRcdFx0cmVqZWN0KGVycik7XG4gXHRcdFx0XHR9O1xuIFx0XHRcdFx0bGlua1RhZy5ocmVmID0gZnVsbGhyZWY7XG4gXHRcdFx0XHR2YXIgaGVhZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXTtcbiBcdFx0XHRcdGhlYWQuYXBwZW5kQ2hpbGQobGlua1RhZyk7XG4gXHRcdFx0fSkudGhlbihmdW5jdGlvbigpIHtcbiBcdFx0XHRcdGluc3RhbGxlZENzc0NodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdFx0fSkpO1xuIFx0XHR9XG5cbiBcdFx0Ly8gSlNPTlAgY2h1bmsgbG9hZGluZyBmb3IgamF2YXNjcmlwdFxuXG4gXHRcdHZhciBpbnN0YWxsZWRDaHVua0RhdGEgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSAhPT0gMCkgeyAvLyAwIG1lYW5zIFwiYWxyZWFkeSBpbnN0YWxsZWRcIi5cblxuIFx0XHRcdC8vIGEgUHJvbWlzZSBtZWFucyBcImN1cnJlbnRseSBsb2FkaW5nXCIuXG4gXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhKSB7XG4gXHRcdFx0XHRwcm9taXNlcy5wdXNoKGluc3RhbGxlZENodW5rRGF0YVsyXSk7XG4gXHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdC8vIHNldHVwIFByb21pc2UgaW4gY2h1bmsgY2FjaGVcbiBcdFx0XHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0XHRcdGluc3RhbGxlZENodW5rRGF0YSA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IFtyZXNvbHZlLCByZWplY3RdO1xuIFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRwcm9taXNlcy5wdXNoKGluc3RhbGxlZENodW5rRGF0YVsyXSA9IHByb21pc2UpO1xuXG4gXHRcdFx0XHQvLyBzdGFydCBjaHVuayBsb2FkaW5nXG4gXHRcdFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gXHRcdFx0XHR2YXIgb25TY3JpcHRDb21wbGV0ZTtcblxuIFx0XHRcdFx0c2NyaXB0LmNoYXJzZXQgPSAndXRmLTgnO1xuIFx0XHRcdFx0c2NyaXB0LnRpbWVvdXQgPSAxMjA7XG4gXHRcdFx0XHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5uYykge1xuIFx0XHRcdFx0XHRzY3JpcHQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgX193ZWJwYWNrX3JlcXVpcmVfXy5uYyk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRzY3JpcHQuc3JjID0ganNvbnBTY3JpcHRTcmMoY2h1bmtJZCk7XG5cbiBcdFx0XHRcdC8vIGNyZWF0ZSBlcnJvciBiZWZvcmUgc3RhY2sgdW53b3VuZCB0byBnZXQgdXNlZnVsIHN0YWNrdHJhY2UgbGF0ZXJcbiBcdFx0XHRcdHZhciBlcnJvciA9IG5ldyBFcnJvcigpO1xuIFx0XHRcdFx0b25TY3JpcHRDb21wbGV0ZSA9IGZ1bmN0aW9uIChldmVudCkge1xuIFx0XHRcdFx0XHQvLyBhdm9pZCBtZW0gbGVha3MgaW4gSUUuXG4gXHRcdFx0XHRcdHNjcmlwdC5vbmVycm9yID0gc2NyaXB0Lm9ubG9hZCA9IG51bGw7XG4gXHRcdFx0XHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiBcdFx0XHRcdFx0dmFyIGNodW5rID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0XHRcdFx0XHRpZihjaHVuayAhPT0gMCkge1xuIFx0XHRcdFx0XHRcdGlmKGNodW5rKSB7XG4gXHRcdFx0XHRcdFx0XHR2YXIgZXJyb3JUeXBlID0gZXZlbnQgJiYgKGV2ZW50LnR5cGUgPT09ICdsb2FkJyA/ICdtaXNzaW5nJyA6IGV2ZW50LnR5cGUpO1xuIFx0XHRcdFx0XHRcdFx0dmFyIHJlYWxTcmMgPSBldmVudCAmJiBldmVudC50YXJnZXQgJiYgZXZlbnQudGFyZ2V0LnNyYztcbiBcdFx0XHRcdFx0XHRcdGVycm9yLm1lc3NhZ2UgPSAnTG9hZGluZyBjaHVuayAnICsgY2h1bmtJZCArICcgZmFpbGVkLlxcbignICsgZXJyb3JUeXBlICsgJzogJyArIHJlYWxTcmMgKyAnKSc7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci5uYW1lID0gJ0NodW5rTG9hZEVycm9yJztcbiBcdFx0XHRcdFx0XHRcdGVycm9yLnR5cGUgPSBlcnJvclR5cGU7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci5yZXF1ZXN0ID0gcmVhbFNyYztcbiBcdFx0XHRcdFx0XHRcdGNodW5rWzFdKGVycm9yKTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gdW5kZWZpbmVkO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9O1xuIFx0XHRcdFx0dmFyIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gXHRcdFx0XHRcdG9uU2NyaXB0Q29tcGxldGUoeyB0eXBlOiAndGltZW91dCcsIHRhcmdldDogc2NyaXB0IH0pO1xuIFx0XHRcdFx0fSwgMTIwMDAwKTtcbiBcdFx0XHRcdHNjcmlwdC5vbmVycm9yID0gc2NyaXB0Lm9ubG9hZCA9IG9uU2NyaXB0Q29tcGxldGU7XG4gXHRcdFx0XHRkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gXHR9O1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Fzc2V0cy9cIjtcblxuIFx0Ly8gb24gZXJyb3IgZnVuY3Rpb24gZm9yIGFzeW5jIGxvYWRpbmdcbiBcdF9fd2VicGFja19yZXF1aXJlX18ub2UgPSBmdW5jdGlvbihlcnIpIHsgY29uc29sZS5lcnJvcihlcnIpOyB0aHJvdyBlcnI7IH07XG5cbiBcdHZhciBqc29ucEFycmF5ID0gd2luZG93W1wid2VicGFja0pzb25wXCJdID0gd2luZG93W1wid2VicGFja0pzb25wXCJdIHx8IFtdO1xuIFx0dmFyIG9sZEpzb25wRnVuY3Rpb24gPSBqc29ucEFycmF5LnB1c2guYmluZChqc29ucEFycmF5KTtcbiBcdGpzb25wQXJyYXkucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrO1xuIFx0anNvbnBBcnJheSA9IGpzb25wQXJyYXkuc2xpY2UoKTtcbiBcdGZvcih2YXIgaSA9IDA7IGkgPCBqc29ucEFycmF5Lmxlbmd0aDsgaSsrKSB3ZWJwYWNrSnNvbnBDYWxsYmFjayhqc29ucEFycmF5W2ldKTtcbiBcdHZhciBwYXJlbnRKc29ucEZ1bmN0aW9uID0gb2xkSnNvbnBGdW5jdGlvbjtcblxuXG4gXHQvLyBhZGQgZW50cnkgbW9kdWxlIHRvIGRlZmVycmVkIGxpc3RcbiBcdGRlZmVycmVkTW9kdWxlcy5wdXNoKFtcIi4vYXNzZXRzL2pzL3BhZ2VzL2luZGV4L3dlbGNvbWUuanNcIixcInZlbmRvcnN+YWxlcnRzX2xpc3R+YXBwfmRhc2hib2FyZC1wYWdlfmRhc2hib2FyZF9lbXB0eX5kYXNoYm9hcmRfZm9ybX5leHBvcnRfbGlzdH5mbG90X2NoYXJ0fmdyYXBoX2Z+ZmVkMjkwNTRcIixcInZlbmRvcnN+YWxlcnRzX2xpc3R+ZGFzaGJvYXJkLXBhZ2V+ZGFzaGJvYXJkX2VtcHR5fmRhc2hib2FyZF9mb3JtfmV4cG9ydF9saXN0fmZsb3RfY2hhcnR+Z3JhcGhfZm9ybX5+ZmUxMDJkZTZcIixcImFsZXJ0c19saXN0fmRhc2hib2FyZC1wYWdlfmRhc2hib2FyZF9lbXB0eX5kYXNoYm9hcmRfZm9ybX5leHBvcnRfbGlzdH5mbG90X2NoYXJ0fmdyYXBoX2Zvcm1+Z3JhcGhfbGl+ZjMyMGMzNGJcIl0pO1xuIFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiByZWFkeVxuIFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4iLCJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0ICcuLi8uLi8uLi9zdHlsZXMvcGFnZXMvd2VsY29tZS5zY3NzJztcbmltcG9ydCB7SWNvbn0gZnJvbSAnLi4vLi4vY29tcG9uZW50cyc7XG5cbmV4cG9ydCBjbGFzcyBXZWxjb21lUGFnZSBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgY3JlYXRlU2FtcGxlRGF0YWJhc2U6IGZhbHNlLFxuICAgICAgICAgICAgY3JlYXRlU2FtcGxlRGF0YTogZmFsc2VcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBjb3B5VG9DbGlwYm9hcmQoZSwgc3RyLCBpZCkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGV4dGFyZWEnKTtcbiAgICAgICAgZWwudmFsdWUgPSBzdHI7XG4gICAgICAgIGVsLnNldEF0dHJpYnV0ZSgncmVhZG9ubHknLCAnJyk7XG4gICAgICAgIGVsLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgICAgZWwuc3R5bGUubGVmdCA9ICctOTk5OXB4JztcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmQoZWwpO1xuICAgICAgICBlbC5zZWxlY3QoKTtcbiAgICAgICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2NvcHknKTtcbiAgICAgICAgZWwucmVtb3ZlKCk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgW2lkXTogdHJ1ZVxuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgW2lkXTogZmFsc2VcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sIDIwMDApO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHVzZXJDb21tYW5kTGlzdCA9IFt7XG4gICAgICAgICAgICBpZDogJ2NyZWF0ZVVzZXInLFxuICAgICAgICAgICAgY29tbWFuZDogJ3BocCBiaW4vY29uc29sZSBhcHA6Y3JlYXRldXNlcicsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ0Rlc2NyaXB0aW9uOlxcbicgK1xuICAgICAgICAgICAgICAgICcgIFRoaXMgY29tbWFuZCB1c2VkIHRvIGNyZWF0ZSBzeXN0ZW0gdXNlclxcbicgK1xuICAgICAgICAgICAgICAgICdcXG4nICtcbiAgICAgICAgICAgICAgICAnVXNhZ2U6XFxuJyArXG4gICAgICAgICAgICAgICAgJyAgYXBwOmNyZWF0ZXVzZXIgW29wdGlvbnNdIFstLV0gPGVtYWlsPlxcbicgK1xuICAgICAgICAgICAgICAgICdcXG4nICtcbiAgICAgICAgICAgICAgICAnQXJndW1lbnRzOlxcbicgK1xuICAgICAgICAgICAgICAgICcgIGVtYWlsICAgICAgICAgICAgICAgICAgICAgIFVzZXIgZW1haWxcXG4nICtcbiAgICAgICAgICAgICAgICAnXFxuJyArXG4gICAgICAgICAgICAgICAgJ09wdGlvbnM6XFxuJyArXG4gICAgICAgICAgICAgICAgJyAgLXAsIC0tcGFzc3dvcmQ9UEFTU1dPUkQgICAgVXNlciBwYXNzd29yZFxcbicgK1xuICAgICAgICAgICAgICAgICcgIC1mLCAtLWZpcnN0bmFtZT1GSVJTVE5BTUUgIFVzZXIgZmlyc3QgbmFtZVxcbicgK1xuICAgICAgICAgICAgICAgICcgIC1sLCAtLWxhc3RuYW1lPUxBU1ROQU1FICAgIFVzZXIgbGFzdCBuYW1lXFxuJyArXG4gICAgICAgICAgICAgICAgJyAgICAgIC0tdXNlciAgICAgICAgICAgICAgICAgQ3JlYXRlIG5vcm1hbCB1c2VyLCBkZWZhdWx0IGlzIEFETUlOXFxuJyArXG4gICAgICAgICAgICAgICAgJyAgLWgsIC0taGVscCAgICAgICAgICAgICAgICAgRGlzcGxheSB0aGlzIGhlbHAgbWVzc2FnZVxcbicgK1xuICAgICAgICAgICAgICAgICcgIC1xLCAtLXF1aWV0ICAgICAgICAgICAgICAgIERvIG5vdCBvdXRwdXQgYW55IG1lc3NhZ2VcXG4nICtcbiAgICAgICAgICAgICAgICAnICAtViwgLS12ZXJzaW9uICAgICAgICAgICAgICBEaXNwbGF5IHRoaXMgYXBwbGljYXRpb24gdmVyc2lvblxcbicgK1xuICAgICAgICAgICAgICAgICcgICAgICAtLWFuc2kgICAgICAgICAgICAgICAgIEZvcmNlIEFOU0kgb3V0cHV0XFxuJyArXG4gICAgICAgICAgICAgICAgJyAgICAgIC0tbm8tYW5zaSAgICAgICAgICAgICAgRGlzYWJsZSBBTlNJIG91dHB1dFxcbicgK1xuICAgICAgICAgICAgICAgICcgIC1uLCAtLW5vLWludGVyYWN0aW9uICAgICAgIERvIG5vdCBhc2sgYW55IGludGVyYWN0aXZlIHF1ZXN0aW9uXFxuJyArXG4gICAgICAgICAgICAgICAgJyAgLWUsIC0tZW52PUVOViAgICAgICAgICAgICAgVGhlIEVudmlyb25tZW50IG5hbWUuIFtkZWZhdWx0OiBcImRldlwiXVxcbicgK1xuICAgICAgICAgICAgICAgICcgICAgICAtLW5vLWRlYnVnICAgICAgICAgICAgIFN3aXRjaGVzIG9mZiBkZWJ1ZyBtb2RlLlxcbicgK1xuICAgICAgICAgICAgICAgICcgIC12fHZ2fHZ2diwgLS12ZXJib3NlICAgICAgIEluY3JlYXNlIHRoZSB2ZXJib3NpdHkgb2YgbWVzc2FnZXM6IDEgZm9yIG5vcm1hbCBvdXRwdXQsIDIgZm9yIG1vcmUgdmVyYm9zZSBvdXRwdXQgYW5kIDMgZm9yIGRlYnVnJ1xuICAgICAgICB9XTtcbiAgICAgICAgY29uc3QgZGF0YUNvbW1hbmRMaXN0ID0gW3tcbiAgICAgICAgICAgIGlkOiAnY3JlYXRlU2FtcGxlRGF0YWJhc2UnLFxuICAgICAgICAgICAgY29tbWFuZDogJ3BocCBiaW4vY29uc29sZSBhcHA6Y3JlYXRlc2FtcGxlZGF0YWJhc2UnLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdEZXNjcmlwdGlvbjpcXG4nICtcbiAgICAgICAgICAgICAgICAnICBUaGlzIGNvbW1hbmQgdXNlZCB0byBjcmVhdGUgdGhlIHNhbXBsZSBkYXRhYmFzZSBhdCBDbGlja0hvdXNlXFxuJyArXG4gICAgICAgICAgICAgICAgJ1xcbicgK1xuICAgICAgICAgICAgICAgICdVc2FnZTpcXG4nICtcbiAgICAgICAgICAgICAgICAnICBhcHA6Y3JlYXRlc2FtcGxlZGF0YWJhc2VcXG4nICtcbiAgICAgICAgICAgICAgICAnXFxuJyArXG4gICAgICAgICAgICAgICAgJ09wdGlvbnM6XFxuJyArXG4gICAgICAgICAgICAgICAgJyAgLWgsIC0taGVscCAgICAgICAgICAgIERpc3BsYXkgdGhpcyBoZWxwIG1lc3NhZ2VcXG4nICtcbiAgICAgICAgICAgICAgICAnICAtcSwgLS1xdWlldCAgICAgICAgICAgRG8gbm90IG91dHB1dCBhbnkgbWVzc2FnZVxcbicgK1xuICAgICAgICAgICAgICAgICcgIC1WLCAtLXZlcnNpb24gICAgICAgICBEaXNwbGF5IHRoaXMgYXBwbGljYXRpb24gdmVyc2lvblxcbicgK1xuICAgICAgICAgICAgICAgICcgICAgICAtLWFuc2kgICAgICAgICAgICBGb3JjZSBBTlNJIG91dHB1dFxcbicgK1xuICAgICAgICAgICAgICAgICcgICAgICAtLW5vLWFuc2kgICAgICAgICBEaXNhYmxlIEFOU0kgb3V0cHV0XFxuJyArXG4gICAgICAgICAgICAgICAgJyAgLW4sIC0tbm8taW50ZXJhY3Rpb24gIERvIG5vdCBhc2sgYW55IGludGVyYWN0aXZlIHF1ZXN0aW9uXFxuJyArXG4gICAgICAgICAgICAgICAgJyAgLWUsIC0tZW52PUVOViAgICAgICAgIFRoZSBFbnZpcm9ubWVudCBuYW1lLiBbZGVmYXVsdDogXCJkZXZcIl1cXG4nICtcbiAgICAgICAgICAgICAgICAnICAgICAgLS1uby1kZWJ1ZyAgICAgICAgU3dpdGNoZXMgb2ZmIGRlYnVnIG1vZGUuXFxuJyArXG4gICAgICAgICAgICAgICAgJyAgLXZ8dnZ8dnZ2LCAtLXZlcmJvc2UgIEluY3JlYXNlIHRoZSB2ZXJib3NpdHkgb2YgbWVzc2FnZXM6IDEgZm9yIG5vcm1hbCBvdXRwdXQsIDIgZm9yIG1vcmUgdmVyYm9zZSBvdXRwdXQgYW5kIDMgZm9yIGRlYnVnJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpZDogJ2NyZWF0ZVNhbXBsZURhdGEnLFxuICAgICAgICAgICAgY29tbWFuZDogJ3BocCBiaW4vY29uc29sZSBhcHA6Y3JlYXRlc2FtcGxlZGF0YScsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ0Rlc2NyaXB0aW9uOlxcbicgK1xuICAgICAgICAgICAgICAgICcgIENyZWF0ZSBzYW1wbGUgZGF0YVxcbicgK1xuICAgICAgICAgICAgICAgICdcXG4nICtcbiAgICAgICAgICAgICAgICAnVXNhZ2U6XFxuJyArXG4gICAgICAgICAgICAgICAgJyAgYXBwOmNyZWF0ZXNhbXBsZWRhdGEgW29wdGlvbnNdIFstLV0gPG51bWJlcj5cXG4nICtcbiAgICAgICAgICAgICAgICAnXFxuJyArXG4gICAgICAgICAgICAgICAgJ0FyZ3VtZW50czpcXG4nICtcbiAgICAgICAgICAgICAgICAnICBudW1iZXIgICAgICAgICAgICAgICAgTnVtYmVyIG9mIHJvdyBpbiBkYXRhYmFzZVxcbicgK1xuICAgICAgICAgICAgICAgICdcXG4nICtcbiAgICAgICAgICAgICAgICAnT3B0aW9uczpcXG4nICtcbiAgICAgICAgICAgICAgICAnICAgICAgLS1kYXRlPURBVEUgICAgICAgQXQgZGF0ZSBbZGVmYXVsdDogXCIyMDIwLTEyLTIyXCJdXFxuJyArXG4gICAgICAgICAgICAgICAgJyAgICAgIC0tdGltZT1USU1FICAgICAgIEF0IHNwZWNpYWwgdGltZVxcbicgK1xuICAgICAgICAgICAgICAgICcgIC1oLCAtLWhlbHAgICAgICAgICAgICBEaXNwbGF5IHRoaXMgaGVscCBtZXNzYWdlXFxuJyArXG4gICAgICAgICAgICAgICAgJyAgLXEsIC0tcXVpZXQgICAgICAgICAgIERvIG5vdCBvdXRwdXQgYW55IG1lc3NhZ2VcXG4nICtcbiAgICAgICAgICAgICAgICAnICAtViwgLS12ZXJzaW9uICAgICAgICAgRGlzcGxheSB0aGlzIGFwcGxpY2F0aW9uIHZlcnNpb25cXG4nICtcbiAgICAgICAgICAgICAgICAnICAgICAgLS1hbnNpICAgICAgICAgICAgRm9yY2UgQU5TSSBvdXRwdXRcXG4nICtcbiAgICAgICAgICAgICAgICAnICAgICAgLS1uby1hbnNpICAgICAgICAgRGlzYWJsZSBBTlNJIG91dHB1dFxcbicgK1xuICAgICAgICAgICAgICAgICcgIC1uLCAtLW5vLWludGVyYWN0aW9uICBEbyBub3QgYXNrIGFueSBpbnRlcmFjdGl2ZSBxdWVzdGlvblxcbicgK1xuICAgICAgICAgICAgICAgICcgIC1lLCAtLWVudj1FTlYgICAgICAgICBUaGUgRW52aXJvbm1lbnQgbmFtZS4gW2RlZmF1bHQ6IFwiZGV2XCJdXFxuJyArXG4gICAgICAgICAgICAgICAgJyAgICAgIC0tbm8tZGVidWcgICAgICAgIFN3aXRjaGVzIG9mZiBkZWJ1ZyBtb2RlLlxcbicgK1xuICAgICAgICAgICAgICAgICcgIC12fHZ2fHZ2diwgLS12ZXJib3NlICBJbmNyZWFzZSB0aGUgdmVyYm9zaXR5IG9mIG1lc3NhZ2VzOiAxIGZvciBub3JtYWwgb3V0cHV0LCAyIGZvciBtb3JlIHZlcmJvc2Ugb3V0cHV0IGFuZCAzIGZvciBkZWJ1ZydcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaWQ6ICdzdHJlYW1TYW1wbGVEYXRhJyxcbiAgICAgICAgICAgIGNvbW1hbmQ6ICdwaHAgYmluL2NvbnNvbGUgYXBwOnN0cmVhbXNhbXBsZWRhdGEnLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdEZXNjcmlwdGlvbjpcXG4nICtcbiAgICAgICAgICAgICAgICAnICBBZGQgc2FtcGxlIGRhdGFcXG4nICtcbiAgICAgICAgICAgICAgICAnXFxuJyArXG4gICAgICAgICAgICAgICAgJ1VzYWdlOlxcbicgK1xuICAgICAgICAgICAgICAgICcgIGFwcDpzdHJlYW1zYW1wbGVkYXRhIDxudW1iZXI+XFxuJyArXG4gICAgICAgICAgICAgICAgJ1xcbicgK1xuICAgICAgICAgICAgICAgICdBcmd1bWVudHM6XFxuJyArXG4gICAgICAgICAgICAgICAgJyAgbnVtYmVyICAgICAgICAgICAgICAgIE51bWJlciBvZiByZXF1ZXN0IHBlci1taW51dGVcXG4nICtcbiAgICAgICAgICAgICAgICAnXFxuJyArXG4gICAgICAgICAgICAgICAgJ09wdGlvbnM6XFxuJyArXG4gICAgICAgICAgICAgICAgJyAgLWgsIC0taGVscCAgICAgICAgICAgIERpc3BsYXkgdGhpcyBoZWxwIG1lc3NhZ2VcXG4nICtcbiAgICAgICAgICAgICAgICAnICAtcSwgLS1xdWlldCAgICAgICAgICAgRG8gbm90IG91dHB1dCBhbnkgbWVzc2FnZVxcbicgK1xuICAgICAgICAgICAgICAgICcgIC1WLCAtLXZlcnNpb24gICAgICAgICBEaXNwbGF5IHRoaXMgYXBwbGljYXRpb24gdmVyc2lvblxcbicgK1xuICAgICAgICAgICAgICAgICcgICAgICAtLWFuc2kgICAgICAgICAgICBGb3JjZSBBTlNJIG91dHB1dFxcbicgK1xuICAgICAgICAgICAgICAgICcgICAgICAtLW5vLWFuc2kgICAgICAgICBEaXNhYmxlIEFOU0kgb3V0cHV0XFxuJyArXG4gICAgICAgICAgICAgICAgJyAgLW4sIC0tbm8taW50ZXJhY3Rpb24gIERvIG5vdCBhc2sgYW55IGludGVyYWN0aXZlIHF1ZXN0aW9uXFxuJyArXG4gICAgICAgICAgICAgICAgJyAgLWUsIC0tZW52PUVOViAgICAgICAgIFRoZSBFbnZpcm9ubWVudCBuYW1lLiBbZGVmYXVsdDogXCJkZXZcIl1cXG4nICtcbiAgICAgICAgICAgICAgICAnICAgICAgLS1uby1kZWJ1ZyAgICAgICAgU3dpdGNoZXMgb2ZmIGRlYnVnIG1vZGUuXFxuJyArXG4gICAgICAgICAgICAgICAgJyAgLXZ8dnZ8dnZ2LCAtLXZlcmJvc2UgIEluY3JlYXNlIHRoZSB2ZXJib3NpdHkgb2YgbWVzc2FnZXM6IDEgZm9yIG5vcm1hbCBvdXRwdXQsIDIgZm9yIG1vcmUgdmVyYm9zZSBvdXRwdXQgYW5kIDMgZm9yIGRlYnVnJ1xuICAgICAgICB9XTtcblxuICAgICAgICBjb25zdCBDb2RlQmxvY2sgPSAoe2l0ZW0sIGluZGV4LCBpc1VzZXJDb21tYW5kfSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZGF0YVRhcmdldCA9IGBjb2xsYXBzZSR7aW5kZXh9JHtpc1VzZXJDb21tYW5kID8gJ3VzZXInIDogJyd9YDtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiBrZXk9e2luZGV4fSBjbGFzc05hbWU9XCJtYi0yXCI+XG4gICAgICAgICAgICAgICAgICAgIDxwcmUgY2xhc3NOYW1lPVwibWItMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGUgaWQ9e2l0ZW0uaWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZC1mbGV4IGp1c3RpZnktY29udGVudC1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPVwiY29tbWFuZCBtZS01IG1lLW1kLTBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLXRvZ2dsZT1cImNvbGxhcHNlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJpYS1leHBhbmRlZD1cImZhbHNlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS10YXJnZXQ9e2AjJHtkYXRhVGFyZ2V0fWB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvbGU9XCJidXR0b25zXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaHJlZj1cIiNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmlhLWNvbnRyb2xzPXtkYXRhVGFyZ2V0fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID57aXRlbS5jb21tYW5kfTwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9XCJjb3B5LWljb24gZmxvYXQtZW5kIHRvb2x0aXBDb250ZW50XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17ZSA9PiB0aGlzLmNvcHlUb0NsaXBib2FyZChlLCBpdGVtLmNvbW1hbmQsIGl0ZW0uaWQpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBocmVmPVwiI1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidG9vbHRpcHRleHQgcC0yIHRleHQtY2VudGVyIHBvc2l0aW9uLWFic29sdXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZVtpdGVtLmlkXSA/ICdDb3B5IFN1Y2Nlc3MnIDogJ0NvcHkgdG8gQ2xpcGJvYXJkISd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEljb24gbmFtZT1cImNvcHlcIiB0eXBlPVwicmVndWxhclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwZS0zIHBlLW1kLTBcIi8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9jb2RlPlxuICAgICAgICAgICAgICAgICAgICA8L3ByZT5cbiAgICAgICAgICAgICAgICAgICAgPHByZSBjbGFzc05hbWU9XCJkZXNjcmlwdGlvbiBwdC0wIGNvbGxhcHNlXCIgaWQ9e2RhdGFUYXJnZXR9PlxuICAgICAgICAgICAgICAgICAgICAgICAge2l0ZW0uZGVzY3JpcHRpb259XG4gICAgICAgICAgICAgICAgICAgIDwvcHJlPlxuICAgICAgICAgICAgICAgIDwvZGl2Pik7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2VsY29tZS1wYWdlIHJvd1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTEyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLWJvZHkgdGV4dC1sZWZ0IGNvbC1tZC04IG9mZnNldC1tZC0yIG10LTUgbWItNVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoMSBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPk1hbmFnZSB5b3VyIGRhdGEgZWFzaWx5ITwvaDE+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwibXQtMyBtYi0zXCI+V2VsY29tZSB0byBMb2ctRXhwbG9yZS4gSXQgbG9vayB5b3UgZG9lcyBub3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0dXAgeW91ciBzeXN0ZW0uIFRvIHN0YXJ0IHlvdSBjYW4gZm9sbG93XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ5PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoND5Db21tYW5kIHRvIGNyZWF0ZSB1c2VyPC9oND5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5GaXJzdCwgdG8gY3JlYXRlIHlvdXIgYWNjb3VudCBwbGVhc2UgdXNlIHRoaXMgY29tbWFuZDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dXNlckNvbW1hbmRMaXN0Lm1hcCgoaXRlbSwgaW5kZXgpID0+IDxDb2RlQmxvY2sgaXRlbT17aXRlbX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtpbmRleH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg9e2luZGV4fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1VzZXJDb21tYW5kPVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz4pfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0PkNvbW1hbmQgY29uc29sZTwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+VG8gcXVpY2tseSBjcmVhdGUgc2FtcGxlIHRhYmxlIGFuZCBzYW1wbGUgZGF0YSBqdXN0IHJ1biB0aGVyZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21tYW5kczo8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2RhdGFDb21tYW5kTGlzdC5tYXAoKGl0ZW0sIGluZGV4KSA9PiA8Q29kZUJsb2NrIGl0ZW09e2l0ZW19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17aW5kZXh9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4PXtpbmRleH0vPil9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDQ+QXBwbGljYXRpb248L2g0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPk9yIGlmIHlvdSB3YW50IHRvIGNyZWF0ZSB0YWJsZSBieSB5b3Vyc2VsZiBqdXN0IGNsaWNrIDxhXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhyZWY9XCIvdGFibGVcIj5oZXJlPC9hPjwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuUmVhY3RET00ucmVuZGVyKDxXZWxjb21lUGFnZS8+LCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjd2VsY29tZS1wYWdlJykpO1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIl0sInNvdXJjZVJvb3QiOiIifQ==