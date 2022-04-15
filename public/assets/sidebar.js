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
/******/ 		"sidebar": 0
/******/ 	}
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"sidebar": 0
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
/******/ 	deferredModules.push(["./assets/js/components/_sidebar.js","vendors~alerts_form~alerts_list~content-header~dashboard-page~dashboard_form~dashboard_list~database~ad6a277b","vendors~alerts_form~alerts_list~app~dashboard-page~dashboard_form~dashboard_list~database_form~datab~7df76b7b","vendors~alerts_form~alerts_list~dashboard-page~dashboard_form~dashboard_list~database_form~database_~a0c5edc0","alerts_form~alerts_list~dashboard-page~dashboard_form~dashboard_list~database_form~database_tables~e~96755b64"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/images/logo.svg":
/*!********************************!*\
  !*** ./assets/images/logo.svg ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("/assets/images/logo.849cd68e.svg");

/***/ }),

/***/ "./assets/js/components/_sidebar.js":
/*!******************************************!*\
  !*** ./assets/js/components/_sidebar.js ***!
  \******************************************/
/*! exports provided: Sidebar */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Sidebar", function() { return Sidebar; });
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_string_split_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.string.split.js */ "./node_modules/core-js/modules/es.string.split.js");
/* harmony import */ var core_js_modules_es_string_split_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_split_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.map.js */ "./node_modules/core-js/modules/es.array.map.js");
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.object.set-prototype-of.js */ "./node_modules/core-js/modules/es.object.set-prototype-of.js");
/* harmony import */ var core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.object.get-prototype-of.js */ "./node_modules/core-js/modules/es.object.get-prototype-of.js");
/* harmony import */ var core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.reflect.construct.js */ "./node_modules/core-js/modules/es.reflect.construct.js");
/* harmony import */ var core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.object.create.js */ "./node_modules/core-js/modules/es.object.create.js");
/* harmony import */ var core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.object.define-property.js */ "./node_modules/core-js/modules/es.object.define-property.js");
/* harmony import */ var core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.symbol.description.js */ "./node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ "./node_modules/core-js/modules/es.symbol.iterator.js");
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! . */ "./assets/js/components/index.js");
/* harmony import */ var _images_logo_svg__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../images/logo.svg */ "./assets/images/logo.svg");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_19__);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

















function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }






var Sidebar = /*#__PURE__*/function (_Component) {
  _inherits(Sidebar, _Component);

  var _super = _createSuper(Sidebar);

  function Sidebar() {
    _classCallCheck(this, Sidebar);

    return _super.apply(this, arguments);
  }

  _createClass(Sidebar, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          username = _this$props.username,
          userimage = _this$props.userimage,
          role = _this$props.role;
      var featureName = window.location.pathname.split('/');
      var navList;

      if (role === 'guest') {
        navList = [];
      } else if (role === 'user') {
        navList = [{
          href: 'log-view',
          type: 'regular',
          iconName: 'circle',
          label: 'Explore'
        }, {
          href: 'profile',
          type: 'solid',
          iconName: 'user',
          label: 'Profile'
        }];
      } else {
        navList = [{
          href: 'log-view',
          type: 'regular',
          iconName: 'circle',
          label: 'Explore'
        }, {
          href: 'profile',
          type: 'solid',
          iconName: 'user',
          label: 'Profile'
        }, {
          href: 'table',
          type: 'solid',
          iconName: 'database',
          label: 'Database'
        }, {
          href: 'user',
          type: 'solid',
          iconName: 'users',
          label: 'Users'
        }, {
          href: 'dashboard/list',
          type: 'solid',
          iconName: 'money-check',
          label: 'Dashboards'
        }, {
          href: 'widget',
          type: 'solid',
          iconName: 'chart-pie',
          label: 'Widgets'
        }, {
          href: 'alert',
          type: 'solid',
          iconName: 'exclamation-triangle',
          label: 'Alerts'
        }, {
          href: 'export',
          type: 'solid',
          iconName: 'download',
          label: 'Exports'
        }];
      }

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement("aside", {
        className: "main-sidebar sidebar-dark-primary elevation-4"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement(___WEBPACK_IMPORTED_MODULE_17__["Link"], {
        className: "brand-link",
        href: '/'
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement(___WEBPACK_IMPORTED_MODULE_17__["Image"], {
        src: _images_logo_svg__WEBPACK_IMPORTED_MODULE_18__["default"],
        alt: "AdminLTE Logo",
        className: "brand-image"
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement("div", {
        className: "sidebar"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement("div", {
        className: "user-panel mt-3 pb-3 mb-3 d-flex"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement("div", {
        className: "image"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement(___WEBPACK_IMPORTED_MODULE_17__["Image"], {
        src: userimage,
        className: "img-circle elevation-2",
        alt: username
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement("div", {
        className: "info"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement(___WEBPACK_IMPORTED_MODULE_17__["Link"], {
        className: 'd-block'
      }, " ", username))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement("nav", {
        className: "mt-2"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement("ul", {
        className: "nav nav-pills nav-sidebar flex-column",
        "data-widget": "treeview",
        role: "menu",
        "data-accordion": "false"
      }, navList.map(function (item, index) {
        var href = item.href,
            type = item.type,
            iconName = item.iconName,
            label = item.label;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement("li", {
          className: "nav-item",
          key: index
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement(___WEBPACK_IMPORTED_MODULE_17__["Link"], {
          href: "/".concat(href),
          className: "nav-link ".concat(href === featureName[1] ? 'active' : '')
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement(___WEBPACK_IMPORTED_MODULE_17__["Icon"], {
          name: iconName,
          type: type,
          className: "nav-icon"
        }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement("p", null, label)));
      })))));
    }
  }]);

  return Sidebar;
}(react__WEBPACK_IMPORTED_MODULE_15__["Component"]);
Sidebar.propTypes = {
  userimage: prop_types__WEBPACK_IMPORTED_MODULE_19___default.a.string,
  username: prop_types__WEBPACK_IMPORTED_MODULE_19___default.a.string,
  role: prop_types__WEBPACK_IMPORTED_MODULE_19___default.a.string
};
var root = document.querySelector('#sidebar');
react_dom__WEBPACK_IMPORTED_MODULE_16___default.a.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement(Sidebar, root.dataset), root);

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2ltYWdlcy9sb2dvLnN2ZyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvY29tcG9uZW50cy9fc2lkZWJhci5qcyJdLCJuYW1lcyI6WyJTaWRlYmFyIiwicHJvcHMiLCJ1c2VybmFtZSIsInVzZXJpbWFnZSIsInJvbGUiLCJmZWF0dXJlTmFtZSIsIndpbmRvdyIsImxvY2F0aW9uIiwicGF0aG5hbWUiLCJzcGxpdCIsIm5hdkxpc3QiLCJocmVmIiwidHlwZSIsImljb25OYW1lIiwibGFiZWwiLCJMb2dvIiwibWFwIiwiaXRlbSIsImluZGV4IiwiQ29tcG9uZW50IiwicHJvcFR5cGVzIiwiUHJvcFR5cGVzIiwic3RyaW5nIiwicm9vdCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsIlJlYWN0RE9NIiwicmVuZGVyIiwiZGF0YXNldCJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsUUFBUSxvQkFBb0I7UUFDNUI7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxpQkFBaUIsNEJBQTRCO1FBQzdDO1FBQ0E7UUFDQSxrQkFBa0IsMkJBQTJCO1FBQzdDO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTs7UUFFQTtRQUNBO1FBQ0EsMENBQTBDO1FBQzFDOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNB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QkFDSSw0REFBQyx1Q0FBRDtBQUFNLGNBQUksRUFBRVEsUUFBWjtBQUFzQixjQUFJLEVBQUVELElBQTVCO0FBQ0ksbUJBQVMsRUFBQztBQURkLFVBREosZUFHSSx1RUFBSUUsS0FBSixDQUhKLENBREksQ0FBUjtBQVFILE9BVkEsQ0FGTCxDQURKLENBWEosQ0FOSixDQURKO0FBc0NIO0FBL0RMOztBQUFBO0FBQUEsRUFBNkJLLGdEQUE3QjtBQWlFQW5CLE9BQU8sQ0FBQ29CLFNBQVIsR0FBb0I7QUFDaEJqQixXQUFTLEVBQUVrQixrREFBUyxDQUFDQyxNQURMO0FBRWhCcEIsVUFBUSxFQUFFbUIsa0RBQVMsQ0FBQ0MsTUFGSjtBQUdoQmxCLE1BQUksRUFBRWlCLGtEQUFTLENBQUNDO0FBSEEsQ0FBcEI7QUFNQSxJQUFNQyxJQUFJLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixVQUF2QixDQUFiO0FBQ0FDLGlEQUFRLENBQUNDLE1BQVQsZUFBZ0IsNERBQUMsT0FBRCxFQUFjSixJQUFJLENBQUNLLE9BQW5CLENBQWhCLEVBQWdETCxJQUFoRCxFIiwiZmlsZSI6InNpZGViYXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcbiBcdFx0dmFyIGV4ZWN1dGVNb2R1bGVzID0gZGF0YVsyXTtcblxuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcblxuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0XHQvLyBhZGQgZW50cnkgbW9kdWxlcyBmcm9tIGxvYWRlZCBjaHVuayB0byBkZWZlcnJlZCBsaXN0XG4gXHRcdGRlZmVycmVkTW9kdWxlcy5wdXNoLmFwcGx5KGRlZmVycmVkTW9kdWxlcywgZXhlY3V0ZU1vZHVsZXMgfHwgW10pO1xuXG4gXHRcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gYWxsIGNodW5rcyByZWFkeVxuIFx0XHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiBcdH07XG4gXHRmdW5jdGlvbiBjaGVja0RlZmVycmVkTW9kdWxlcygpIHtcbiBcdFx0dmFyIHJlc3VsdDtcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlZmVycmVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBkZWZlcnJlZE1vZHVsZSA9IGRlZmVycmVkTW9kdWxlc1tpXTtcbiBcdFx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcbiBcdFx0XHRmb3IodmFyIGogPSAxOyBqIDwgZGVmZXJyZWRNb2R1bGUubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBkZXBJZCA9IGRlZmVycmVkTW9kdWxlW2pdO1xuIFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2RlcElkXSAhPT0gMCkgZnVsZmlsbGVkID0gZmFsc2U7XG4gXHRcdFx0fVxuIFx0XHRcdGlmKGZ1bGZpbGxlZCkge1xuIFx0XHRcdFx0ZGVmZXJyZWRNb2R1bGVzLnNwbGljZShpLS0sIDEpO1xuIFx0XHRcdFx0cmVzdWx0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBkZWZlcnJlZE1vZHVsZVswXSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0cmV0dXJuIHJlc3VsdDtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBDU1MgY2h1bmtzXG4gXHR2YXIgaW5zdGFsbGVkQ3NzQ2h1bmtzID0ge1xuIFx0XHRcInNpZGViYXJcIjogMFxuIFx0fVxuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJzaWRlYmFyXCI6IDBcbiBcdH07XG5cbiBcdHZhciBkZWZlcnJlZE1vZHVsZXMgPSBbXTtcblxuIFx0Ly8gc2NyaXB0IHBhdGggZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIGpzb25wU2NyaXB0U3JjKGNodW5rSWQpIHtcbiBcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyAoe31bY2h1bmtJZF18fGNodW5rSWQpICsgXCIuanNcIlxuIFx0fVxuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cbiBcdC8vIFRoaXMgZmlsZSBjb250YWlucyBvbmx5IHRoZSBlbnRyeSBjaHVuay5cbiBcdC8vIFRoZSBjaHVuayBsb2FkaW5nIGZ1bmN0aW9uIGZvciBhZGRpdGlvbmFsIGNodW5rc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5lID0gZnVuY3Rpb24gcmVxdWlyZUVuc3VyZShjaHVua0lkKSB7XG4gXHRcdHZhciBwcm9taXNlcyA9IFtdO1xuXG5cbiBcdFx0Ly8gbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4gQ1NTIGxvYWRpbmdcbiBcdFx0dmFyIGNzc0NodW5rcyA9IHtcIjBcIjoxfTtcbiBcdFx0aWYoaW5zdGFsbGVkQ3NzQ2h1bmtzW2NodW5rSWRdKSBwcm9taXNlcy5wdXNoKGluc3RhbGxlZENzc0NodW5rc1tjaHVua0lkXSk7XG4gXHRcdGVsc2UgaWYoaW5zdGFsbGVkQ3NzQ2h1bmtzW2NodW5rSWRdICE9PSAwICYmIGNzc0NodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ3NzQ2h1bmtzW2NodW5rSWRdID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0XHR2YXIgaHJlZiA9IFwiXCIgKyAoe31bY2h1bmtJZF18fGNodW5rSWQpICsgXCIuY3NzXCI7XG4gXHRcdFx0XHR2YXIgZnVsbGhyZWYgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBocmVmO1xuIFx0XHRcdFx0dmFyIGV4aXN0aW5nTGlua1RhZ3MgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImxpbmtcIik7XG4gXHRcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZXhpc3RpbmdMaW5rVGFncy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHR2YXIgdGFnID0gZXhpc3RpbmdMaW5rVGFnc1tpXTtcbiBcdFx0XHRcdFx0dmFyIGRhdGFIcmVmID0gdGFnLmdldEF0dHJpYnV0ZShcImRhdGEtaHJlZlwiKSB8fCB0YWcuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKTtcbiBcdFx0XHRcdFx0aWYodGFnLnJlbCA9PT0gXCJzdHlsZXNoZWV0XCIgJiYgKGRhdGFIcmVmID09PSBocmVmIHx8IGRhdGFIcmVmID09PSBmdWxsaHJlZikpIHJldHVybiByZXNvbHZlKCk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHR2YXIgZXhpc3RpbmdTdHlsZVRhZ3MgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInN0eWxlXCIpO1xuIFx0XHRcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGV4aXN0aW5nU3R5bGVUYWdzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdHZhciB0YWcgPSBleGlzdGluZ1N0eWxlVGFnc1tpXTtcbiBcdFx0XHRcdFx0dmFyIGRhdGFIcmVmID0gdGFnLmdldEF0dHJpYnV0ZShcImRhdGEtaHJlZlwiKTtcbiBcdFx0XHRcdFx0aWYoZGF0YUhyZWYgPT09IGhyZWYgfHwgZGF0YUhyZWYgPT09IGZ1bGxocmVmKSByZXR1cm4gcmVzb2x2ZSgpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0dmFyIGxpbmtUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcbiBcdFx0XHRcdGxpbmtUYWcucmVsID0gXCJzdHlsZXNoZWV0XCI7XG4gXHRcdFx0XHRsaW5rVGFnLnR5cGUgPSBcInRleHQvY3NzXCI7XG4gXHRcdFx0XHRsaW5rVGFnLm9ubG9hZCA9IHJlc29sdmU7XG4gXHRcdFx0XHRsaW5rVGFnLm9uZXJyb3IgPSBmdW5jdGlvbihldmVudCkge1xuIFx0XHRcdFx0XHR2YXIgcmVxdWVzdCA9IGV2ZW50ICYmIGV2ZW50LnRhcmdldCAmJiBldmVudC50YXJnZXQuc3JjIHx8IGZ1bGxocmVmO1xuIFx0XHRcdFx0XHR2YXIgZXJyID0gbmV3IEVycm9yKFwiTG9hZGluZyBDU1MgY2h1bmsgXCIgKyBjaHVua0lkICsgXCIgZmFpbGVkLlxcbihcIiArIHJlcXVlc3QgKyBcIilcIik7XG4gXHRcdFx0XHRcdGVyci5yZXF1ZXN0ID0gcmVxdWVzdDtcbiBcdFx0XHRcdFx0cmVqZWN0KGVycik7XG4gXHRcdFx0XHR9O1xuIFx0XHRcdFx0bGlua1RhZy5ocmVmID0gZnVsbGhyZWY7XG4gXHRcdFx0XHR2YXIgaGVhZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXTtcbiBcdFx0XHRcdGhlYWQuYXBwZW5kQ2hpbGQobGlua1RhZyk7XG4gXHRcdFx0fSkudGhlbihmdW5jdGlvbigpIHtcbiBcdFx0XHRcdGluc3RhbGxlZENzc0NodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdFx0fSkpO1xuIFx0XHR9XG5cbiBcdFx0Ly8gSlNPTlAgY2h1bmsgbG9hZGluZyBmb3IgamF2YXNjcmlwdFxuXG4gXHRcdHZhciBpbnN0YWxsZWRDaHVua0RhdGEgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSAhPT0gMCkgeyAvLyAwIG1lYW5zIFwiYWxyZWFkeSBpbnN0YWxsZWRcIi5cblxuIFx0XHRcdC8vIGEgUHJvbWlzZSBtZWFucyBcImN1cnJlbnRseSBsb2FkaW5nXCIuXG4gXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhKSB7XG4gXHRcdFx0XHRwcm9taXNlcy5wdXNoKGluc3RhbGxlZENodW5rRGF0YVsyXSk7XG4gXHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdC8vIHNldHVwIFByb21pc2UgaW4gY2h1bmsgY2FjaGVcbiBcdFx0XHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0XHRcdGluc3RhbGxlZENodW5rRGF0YSA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IFtyZXNvbHZlLCByZWplY3RdO1xuIFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRwcm9taXNlcy5wdXNoKGluc3RhbGxlZENodW5rRGF0YVsyXSA9IHByb21pc2UpO1xuXG4gXHRcdFx0XHQvLyBzdGFydCBjaHVuayBsb2FkaW5nXG4gXHRcdFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gXHRcdFx0XHR2YXIgb25TY3JpcHRDb21wbGV0ZTtcblxuIFx0XHRcdFx0c2NyaXB0LmNoYXJzZXQgPSAndXRmLTgnO1xuIFx0XHRcdFx0c2NyaXB0LnRpbWVvdXQgPSAxMjA7XG4gXHRcdFx0XHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5uYykge1xuIFx0XHRcdFx0XHRzY3JpcHQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgX193ZWJwYWNrX3JlcXVpcmVfXy5uYyk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRzY3JpcHQuc3JjID0ganNvbnBTY3JpcHRTcmMoY2h1bmtJZCk7XG5cbiBcdFx0XHRcdC8vIGNyZWF0ZSBlcnJvciBiZWZvcmUgc3RhY2sgdW53b3VuZCB0byBnZXQgdXNlZnVsIHN0YWNrdHJhY2UgbGF0ZXJcbiBcdFx0XHRcdHZhciBlcnJvciA9IG5ldyBFcnJvcigpO1xuIFx0XHRcdFx0b25TY3JpcHRDb21wbGV0ZSA9IGZ1bmN0aW9uIChldmVudCkge1xuIFx0XHRcdFx0XHQvLyBhdm9pZCBtZW0gbGVha3MgaW4gSUUuXG4gXHRcdFx0XHRcdHNjcmlwdC5vbmVycm9yID0gc2NyaXB0Lm9ubG9hZCA9IG51bGw7XG4gXHRcdFx0XHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiBcdFx0XHRcdFx0dmFyIGNodW5rID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0XHRcdFx0XHRpZihjaHVuayAhPT0gMCkge1xuIFx0XHRcdFx0XHRcdGlmKGNodW5rKSB7XG4gXHRcdFx0XHRcdFx0XHR2YXIgZXJyb3JUeXBlID0gZXZlbnQgJiYgKGV2ZW50LnR5cGUgPT09ICdsb2FkJyA/ICdtaXNzaW5nJyA6IGV2ZW50LnR5cGUpO1xuIFx0XHRcdFx0XHRcdFx0dmFyIHJlYWxTcmMgPSBldmVudCAmJiBldmVudC50YXJnZXQgJiYgZXZlbnQudGFyZ2V0LnNyYztcbiBcdFx0XHRcdFx0XHRcdGVycm9yLm1lc3NhZ2UgPSAnTG9hZGluZyBjaHVuayAnICsgY2h1bmtJZCArICcgZmFpbGVkLlxcbignICsgZXJyb3JUeXBlICsgJzogJyArIHJlYWxTcmMgKyAnKSc7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci5uYW1lID0gJ0NodW5rTG9hZEVycm9yJztcbiBcdFx0XHRcdFx0XHRcdGVycm9yLnR5cGUgPSBlcnJvclR5cGU7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci5yZXF1ZXN0ID0gcmVhbFNyYztcbiBcdFx0XHRcdFx0XHRcdGNodW5rWzFdKGVycm9yKTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gdW5kZWZpbmVkO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9O1xuIFx0XHRcdFx0dmFyIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gXHRcdFx0XHRcdG9uU2NyaXB0Q29tcGxldGUoeyB0eXBlOiAndGltZW91dCcsIHRhcmdldDogc2NyaXB0IH0pO1xuIFx0XHRcdFx0fSwgMTIwMDAwKTtcbiBcdFx0XHRcdHNjcmlwdC5vbmVycm9yID0gc2NyaXB0Lm9ubG9hZCA9IG9uU2NyaXB0Q29tcGxldGU7XG4gXHRcdFx0XHRkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gXHR9O1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Fzc2V0cy9cIjtcblxuIFx0Ly8gb24gZXJyb3IgZnVuY3Rpb24gZm9yIGFzeW5jIGxvYWRpbmdcbiBcdF9fd2VicGFja19yZXF1aXJlX18ub2UgPSBmdW5jdGlvbihlcnIpIHsgY29uc29sZS5lcnJvcihlcnIpOyB0aHJvdyBlcnI7IH07XG5cbiBcdHZhciBqc29ucEFycmF5ID0gd2luZG93W1wid2VicGFja0pzb25wXCJdID0gd2luZG93W1wid2VicGFja0pzb25wXCJdIHx8IFtdO1xuIFx0dmFyIG9sZEpzb25wRnVuY3Rpb24gPSBqc29ucEFycmF5LnB1c2guYmluZChqc29ucEFycmF5KTtcbiBcdGpzb25wQXJyYXkucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrO1xuIFx0anNvbnBBcnJheSA9IGpzb25wQXJyYXkuc2xpY2UoKTtcbiBcdGZvcih2YXIgaSA9IDA7IGkgPCBqc29ucEFycmF5Lmxlbmd0aDsgaSsrKSB3ZWJwYWNrSnNvbnBDYWxsYmFjayhqc29ucEFycmF5W2ldKTtcbiBcdHZhciBwYXJlbnRKc29ucEZ1bmN0aW9uID0gb2xkSnNvbnBGdW5jdGlvbjtcblxuXG4gXHQvLyBhZGQgZW50cnkgbW9kdWxlIHRvIGRlZmVycmVkIGxpc3RcbiBcdGRlZmVycmVkTW9kdWxlcy5wdXNoKFtcIi4vYXNzZXRzL2pzL2NvbXBvbmVudHMvX3NpZGViYXIuanNcIixcInZlbmRvcnN+YWxlcnRzX2Zvcm1+YWxlcnRzX2xpc3R+Y29udGVudC1oZWFkZXJ+ZGFzaGJvYXJkLXBhZ2V+ZGFzaGJvYXJkX2Zvcm1+ZGFzaGJvYXJkX2xpc3R+ZGF0YWJhc2V+YWQ2YTI3N2JcIixcInZlbmRvcnN+YWxlcnRzX2Zvcm1+YWxlcnRzX2xpc3R+YXBwfmRhc2hib2FyZC1wYWdlfmRhc2hib2FyZF9mb3JtfmRhc2hib2FyZF9saXN0fmRhdGFiYXNlX2Zvcm1+ZGF0YWJ+N2RmNzZiN2JcIixcInZlbmRvcnN+YWxlcnRzX2Zvcm1+YWxlcnRzX2xpc3R+ZGFzaGJvYXJkLXBhZ2V+ZGFzaGJvYXJkX2Zvcm1+ZGFzaGJvYXJkX2xpc3R+ZGF0YWJhc2VfZm9ybX5kYXRhYmFzZV9+YTBjNWVkYzBcIixcImFsZXJ0c19mb3JtfmFsZXJ0c19saXN0fmRhc2hib2FyZC1wYWdlfmRhc2hib2FyZF9mb3JtfmRhc2hib2FyZF9saXN0fmRhdGFiYXNlX2Zvcm1+ZGF0YWJhc2VfdGFibGVzfmV+OTY3NTViNjRcIl0pO1xuIFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiByZWFkeVxuIFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4iLCJleHBvcnQgZGVmYXVsdCBcIi9hc3NldHMvaW1hZ2VzL2xvZ28uODQ5Y2Q2OGUuc3ZnXCI7IiwiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCB7VGV4dCwgTGluaywgSW1hZ2UsIEljb259IGZyb20gJy4nO1xuaW1wb3J0IExvZ28gZnJvbSAnLi4vLi4vaW1hZ2VzL2xvZ28uc3ZnJztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmV4cG9ydCBjbGFzcyBTaWRlYmFyIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHt1c2VybmFtZSwgdXNlcmltYWdlLCByb2xlfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIGNvbnN0IGZlYXR1cmVOYW1lID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KCcvJyk7XG4gICAgICAgIGxldCBuYXZMaXN0O1xuICAgICAgICBpZiAocm9sZSA9PT0gJ2d1ZXN0Jykge1xuICAgICAgICAgICAgbmF2TGlzdCA9IFtdO1xuICAgICAgICB9IGVsc2UgaWYgKHJvbGUgPT09ICd1c2VyJykge1xuICAgICAgICAgICAgbmF2TGlzdCA9IFtcbiAgICAgICAgICAgICAgICB7aHJlZjogJ2xvZy12aWV3JywgdHlwZTogJ3JlZ3VsYXInLCBpY29uTmFtZTogJ2NpcmNsZScsIGxhYmVsOiAnRXhwbG9yZSd9LFxuICAgICAgICAgICAgICAgIHtocmVmOiAncHJvZmlsZScsIHR5cGU6ICdzb2xpZCcsIGljb25OYW1lOiAndXNlcicsIGxhYmVsOiAnUHJvZmlsZSd9XG4gICAgICAgICAgICBdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmF2TGlzdCA9IFtcbiAgICAgICAgICAgICAgICB7aHJlZjogJ2xvZy12aWV3JywgdHlwZTogJ3JlZ3VsYXInLCBpY29uTmFtZTogJ2NpcmNsZScsIGxhYmVsOiAnRXhwbG9yZSd9LFxuICAgICAgICAgICAgICAgIHtocmVmOiAncHJvZmlsZScsIHR5cGU6ICdzb2xpZCcsIGljb25OYW1lOiAndXNlcicsIGxhYmVsOiAnUHJvZmlsZSd9LFxuICAgICAgICAgICAgICAgIHtocmVmOiAndGFibGUnLCB0eXBlOiAnc29saWQnLCBpY29uTmFtZTogJ2RhdGFiYXNlJywgbGFiZWw6ICdEYXRhYmFzZSd9LFxuICAgICAgICAgICAgICAgIHtocmVmOiAndXNlcicsIHR5cGU6ICdzb2xpZCcsIGljb25OYW1lOiAndXNlcnMnLCBsYWJlbDogJ1VzZXJzJ30sXG4gICAgICAgICAgICAgICAge2hyZWY6ICdkYXNoYm9hcmQvbGlzdCcsIHR5cGU6ICdzb2xpZCcsIGljb25OYW1lOiAnbW9uZXktY2hlY2snLCBsYWJlbDogJ0Rhc2hib2FyZHMnfSxcbiAgICAgICAgICAgICAgICB7aHJlZjogJ3dpZGdldCcsIHR5cGU6ICdzb2xpZCcsIGljb25OYW1lOiAnY2hhcnQtcGllJywgbGFiZWw6ICdXaWRnZXRzJ30sXG4gICAgICAgICAgICAgICAge2hyZWY6ICdhbGVydCcsIHR5cGU6ICdzb2xpZCcsIGljb25OYW1lOiAnZXhjbGFtYXRpb24tdHJpYW5nbGUnLCBsYWJlbDogJ0FsZXJ0cyd9LFxuICAgICAgICAgICAgICAgIHtocmVmOiAnZXhwb3J0JywgdHlwZTogJ3NvbGlkJywgaWNvbk5hbWU6ICdkb3dubG9hZCcsIGxhYmVsOiAnRXhwb3J0cyd9LFxuICAgICAgICAgICAgXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8YXNpZGUgY2xhc3NOYW1lPVwibWFpbi1zaWRlYmFyIHNpZGViYXItZGFyay1wcmltYXJ5IGVsZXZhdGlvbi00XCI+XG4gICAgICAgICAgICAgICAgPExpbmsgY2xhc3NOYW1lPVwiYnJhbmQtbGlua1wiIGhyZWY9eycvJ30+XG4gICAgICAgICAgICAgICAgICAgIDxJbWFnZSBzcmM9e0xvZ299IGFsdD1cIkFkbWluTFRFIExvZ29cIlxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYnJhbmQtaW1hZ2VcIi8+XG4gICAgICAgICAgICAgICAgPC9MaW5rPlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzaWRlYmFyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidXNlci1wYW5lbCBtdC0zIHBiLTMgbWItMyBkLWZsZXhcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW1hZ2VcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8SW1hZ2Ugc3JjPXt1c2VyaW1hZ2V9IGNsYXNzTmFtZT1cImltZy1jaXJjbGUgZWxldmF0aW9uLTJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbHQ9e3VzZXJuYW1lfS8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5mb1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxMaW5rIGNsYXNzTmFtZT17J2QtYmxvY2snfT4geyB1c2VybmFtZSB9PC9MaW5rPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgIDxuYXYgY2xhc3NOYW1lPVwibXQtMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cIm5hdiBuYXYtcGlsbHMgbmF2LXNpZGViYXIgZmxleC1jb2x1bW5cIiBkYXRhLXdpZGdldD1cInRyZWV2aWV3XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2xlPVwibWVudVwiIGRhdGEtYWNjb3JkaW9uPVwiZmFsc2VcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bmF2TGlzdC5tYXAoKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHtocmVmLCB0eXBlLCBpY29uTmFtZSwgbGFiZWx9ID0gaXRlbTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICg8bGkgY2xhc3NOYW1lPVwibmF2LWl0ZW1cIiBrZXk9e2luZGV4fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxMaW5rIGhyZWY9e2AvJHtocmVmfWB9IGNsYXNzTmFtZT17YG5hdi1saW5rICR7aHJlZiA9PT0gZmVhdHVyZU5hbWVbMV0gPyAnYWN0aXZlJyA6ICcnfWB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxJY29uIG5hbWU9e2ljb25OYW1lfSB0eXBlPXt0eXBlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJuYXYtaWNvblwiLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD57bGFiZWx9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9MaW5rPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgPC9uYXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2FzaWRlPlxuXG4gICAgICAgICk7XG4gICAgfVxufVxuU2lkZWJhci5wcm9wVHlwZXMgPSB7XG4gICAgdXNlcmltYWdlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHVzZXJuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHJvbGU6IFByb3BUeXBlcy5zdHJpbmdcbn07XG5cbmNvbnN0IHJvb3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2lkZWJhcicpO1xuUmVhY3RET00ucmVuZGVyKDxTaWRlYmFyIHsuLi4ocm9vdC5kYXRhc2V0KX0vPiwgcm9vdCk7XG4iXSwic291cmNlUm9vdCI6IiJ9