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
/******/ 		"user_list": 0
/******/ 	}
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"user_list": 0
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
/******/ 	deferredModules.push(["./assets/js/pages/user/list.js","vendors~alerts_form~alerts_list~content-header~dashboard-page~dashboard_form~dashboard_list~database~ad6a277b","vendors~alerts_form~alerts_list~app~dashboard-page~dashboard_form~dashboard_list~database_form~datab~7df76b7b","vendors~alerts_form~alerts_list~dashboard-page~dashboard_form~dashboard_list~database_form~database_~a0c5edc0","alerts_form~alerts_list~dashboard-page~dashboard_form~dashboard_list~database_form~database_tables~e~96755b64"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/js/pages/user/list.js":
/*!**************************************!*\
  !*** ./assets/js/pages/user/list.js ***!
  \**************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.function.bind.js */ "./node_modules/core-js/modules/es.function.bind.js");
/* harmony import */ var core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_web_timers_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/web.timers.js */ "./node_modules/core-js/modules/web.timers.js");
/* harmony import */ var core_js_modules_web_timers_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_timers_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.promise.js */ "./node_modules/core-js/modules/es.promise.js");
/* harmony import */ var core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_promise_finally_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.promise.finally.js */ "./node_modules/core-js/modules/es.promise.finally.js");
/* harmony import */ var core_js_modules_es_promise_finally_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise_finally_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.array.map.js */ "./node_modules/core-js/modules/es.array.map.js");
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.array.splice.js */ "./node_modules/core-js/modules/es.array.splice.js");
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.object.define-property.js */ "./node_modules/core-js/modules/es.object.define-property.js");
/* harmony import */ var core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.object.set-prototype-of.js */ "./node_modules/core-js/modules/es.object.set-prototype-of.js");
/* harmony import */ var core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.object.get-prototype-of.js */ "./node_modules/core-js/modules/es.object.get-prototype-of.js");
/* harmony import */ var core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.reflect.construct.js */ "./node_modules/core-js/modules/es.reflect.construct.js");
/* harmony import */ var core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/es.object.create.js */ "./node_modules/core-js/modules/es.object.create.js");
/* harmony import */ var core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! core-js/modules/es.symbol.description.js */ "./node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ "./node_modules/core-js/modules/es.symbol.iterator.js");
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../components */ "./assets/js/components/index.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../actions */ "./assets/js/actions/index.js");
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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






var UserList = /*#__PURE__*/function (_Component) {
  _inherits(UserList, _Component);

  var _super = _createSuper(UserList);

  function UserList(props) {
    var _this;

    _classCallCheck(this, UserList);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "onDelete", function (key) {
      if (key !== 0) {
        _this.setState({
          userSelected: key
        });

        return;
      }

      _actions__WEBPACK_IMPORTED_MODULE_21__["Alert"].error('Can not delete your account by yourself');
    });

    _this.state = {
      users: [],
      isLoading: false,
      newUser: null,
      userSelected: null
    };
    _this.onChangeStatus = _this.onChangeStatus.bind(_assertThisInitialized(_this));
    _this.onDelete = _this.onDelete.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(UserList, [{
    key: "loadData",
    value: function loadData() {
      this.setState({
        isLoading: true
      });
      var that = this;
      _actions__WEBPACK_IMPORTED_MODULE_21__["UserActions"].getAllUser().then(function (res) {
        var error = res.error,
            data = res.data;

        if (error) {
          return;
        }

        that.setState({
          users: data,
          isLoading: false
        });
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.loadData();
      var newUser = localStorage.getItem('newUser') && JSON.parse(localStorage.getItem('newUser')).email ? JSON.parse(localStorage.getItem('newUser')).email : null;

      if (newUser) {
        this.setState({
          newUser: newUser
        }, function () {
          setTimeout(function () {
            localStorage.removeItem('newUser');

            _this2.setState({
              newUser: null
            });
          }, 5000);
        });
      }
    }
  }, {
    key: "onChangeStatus",
    value: function onChangeStatus(key) {
      var users = this.state.users;
      var user = users[key];
      var newStatus = user.is_active ? 0 : 1;
      var that = this;
      that.setState({
        isLoading: true
      });
      _actions__WEBPACK_IMPORTED_MODULE_21__["UserActions"].setStatus(user.id, {
        is_active: newStatus
      }).then(function (res) {
        var error = res.error;
        var strMessage = newStatus ? 'Enable' : 'Disable';

        if (error) {
          _actions__WEBPACK_IMPORTED_MODULE_21__["Alert"].error("You can not ".concat(strMessage, " this user"));
          return;
        }

        users[key].is_active = newStatus;
        _actions__WEBPACK_IMPORTED_MODULE_21__["Alert"].success("".concat(strMessage, " successful"));
        that.setState({
          users: users
        });
      })["finally"](function () {
        that.setState({
          isLoading: false
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$state = this.state,
          users = _this$state.users,
          newUser = _this$state.newUser,
          userSelected = _this$state.userSelected;

      var _users = users.map(function (user, key) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_18___default.a.createElement("tr", {
          key: key
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_18___default.a.createElement("td", null, user.first_name, " ", user.last_name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_18___default.a.createElement("td", null, user.email), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_18___default.a.createElement("td", null, user.is_admin ? 'Admin' : 'user'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_18___default.a.createElement("td", null, user.status), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_18___default.a.createElement("td", null, user.last_updated), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_18___default.a.createElement("td", {
          className: 'text-right'
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_18___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_20__["Link"], {
          href: '/user/' + user.id,
          className: 'btn btn-sm me-3 btn-success',
          title: 'Edit'
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_18___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_20__["Icon"], {
          name: 'edit'
        })), user.is_active == 1 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_18___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_20__["Button"], {
          onClick: function onClick(_) {
            return _this3.onChangeStatus(key);
          },
          className: 'btn btn-sm btn-warning',
          title: 'Disable'
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_18___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_20__["Icon"], {
          name: 'user-times'
        })), user.is_active != 1 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_18___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_20__["Button"], {
          onClick: function onClick(_) {
            return _this3.onChangeStatus(key);
          },
          className: 'btn btn-sm btn-primary',
          title: 'Enable'
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_18___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_20__["Icon"], {
          name: 'user-plus'
        })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_18___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_20__["Button"], {
          onClick: function onClick(_) {
            return _this3.onDelete(key);
          },
          className: 'btn ms-3 btn-sm btn-danger',
          title: 'Delete'
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_18___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_20__["Icon"], {
          name: 'trash'
        }))));
      });

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_18___default.a.createElement("div", {
        className: "users container-fluid"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_18___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_20__["DeleteModal"], {
        data: users,
        indexSelected: userSelected,
        objectName: "user",
        displayField: "email",
        closeButtonAction: function closeButtonAction() {
          _this3.setState({
            userSelected: false
          });
        },
        saveButtonAction: function saveButtonAction() {
          _this3.setState({
            isLoading: true
          });

          _actions__WEBPACK_IMPORTED_MODULE_21__["UserActions"]["delete"](users[userSelected].id).then(function (res) {
            var error = res.error;

            if (error) {
              _actions__WEBPACK_IMPORTED_MODULE_21__["Alert"].error('You can not delete this account');
              return;
            }

            users.splice(userSelected, 1);

            _this3.setState({
              users: users
            });

            _actions__WEBPACK_IMPORTED_MODULE_21__["Alert"].success('Delete successful');
          })["finally"](function () {
            _this3.setState({
              isLoading: false,
              userSelected: false
            });
          });
        }
      }), newUser && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_18___default.a.createElement("div", {
        className: "alert alert-success",
        role: "alert"
      }, "The account ".concat(newUser, " has been created.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_18___default.a.createElement("div", {
        className: "card"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_18___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_20__["CardHeader"], {
        title: "User management",
        showCollapseButton: false,
        showRemoveButton: false
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_18___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_20__["Link"], {
        className: 'btn btn-success',
        href: '/user/create'
      }, "Create user")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_18___default.a.createElement("div", {
        className: "card-body"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_18___default.a.createElement("div", {
        className: "row"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_18___default.a.createElement("div", {
        className: "col-12"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_18___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_20__["Table"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_18___default.a.createElement("thead", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_18___default.a.createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_18___default.a.createElement("th", null, "Name"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_18___default.a.createElement("th", null, "Email"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_18___default.a.createElement("th", null, "Role"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_18___default.a.createElement("th", null, "Status"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_18___default.a.createElement("th", null, "Last updated"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_18___default.a.createElement("th", null, "\xA0"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_18___default.a.createElement("tbody", null, _users)))))));
    }
  }]);

  return UserList;
}(react__WEBPACK_IMPORTED_MODULE_18__["Component"]);

react_dom__WEBPACK_IMPORTED_MODULE_19___default.a.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_18___default.a.createElement(UserList, null), document.querySelector('#root'));

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3BhZ2VzL3VzZXIvbGlzdC5qcyJdLCJuYW1lcyI6WyJVc2VyTGlzdCIsInByb3BzIiwia2V5Iiwic2V0U3RhdGUiLCJ1c2VyU2VsZWN0ZWQiLCJBbGVydCIsImVycm9yIiwic3RhdGUiLCJ1c2VycyIsImlzTG9hZGluZyIsIm5ld1VzZXIiLCJvbkNoYW5nZVN0YXR1cyIsImJpbmQiLCJvbkRlbGV0ZSIsInRoYXQiLCJVc2VyQWN0aW9ucyIsImdldEFsbFVzZXIiLCJ0aGVuIiwicmVzIiwiZGF0YSIsImxvYWREYXRhIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsIkpTT04iLCJwYXJzZSIsImVtYWlsIiwic2V0VGltZW91dCIsInJlbW92ZUl0ZW0iLCJ1c2VyIiwibmV3U3RhdHVzIiwiaXNfYWN0aXZlIiwic2V0U3RhdHVzIiwiaWQiLCJzdHJNZXNzYWdlIiwic3VjY2VzcyIsIl91c2VycyIsIm1hcCIsImZpcnN0X25hbWUiLCJsYXN0X25hbWUiLCJpc19hZG1pbiIsInN0YXR1cyIsImxhc3RfdXBkYXRlZCIsIl8iLCJzcGxpY2UiLCJDb21wb25lbnQiLCJSZWFjdERPTSIsInJlbmRlciIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsUUFBUSxvQkFBb0I7UUFDNUI7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxpQkFBaUIsNEJBQTRCO1FBQzdDO1FBQ0E7UUFDQSxrQkFBa0IsMkJBQTJCO1FBQzdDO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtR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QWM7QUFDVk0sdUJBQVMsRUFBRSxLQUREO0FBRVZMLDBCQUFZLEVBQUU7QUFGSixhQUFkO0FBSUgsV0FqQkQ7QUFrQkg7QUFoQ0wsUUFESixFQW1DS00sT0FBTyxpQkFDSjtBQUFLLGlCQUFTLEVBQUMscUJBQWY7QUFBcUMsWUFBSSxFQUFDO0FBQTFDLCtCQUNvQkEsT0FEcEIsd0JBcENSLGVBdUNJO0FBQUssaUJBQVMsRUFBQztBQUFmLHNCQUNJLDREQUFDLHVEQUFEO0FBQVksYUFBSyxFQUFDLGlCQUFsQjtBQUFvQywwQkFBa0IsRUFBRSxLQUF4RDtBQUErRCx3QkFBZ0IsRUFBRTtBQUFqRixzQkFDSSw0REFBQyxpREFBRDtBQUFNLGlCQUFTLEVBQUUsaUJBQWpCO0FBQW9DLFlBQUksRUFBRTtBQUExQyx1QkFESixDQURKLGVBSUk7QUFBSyxpQkFBUyxFQUFDO0FBQWYsc0JBQ0k7QUFBSyxpQkFBUyxFQUFDO0FBQWYsc0JBQ0k7QUFBSyxpQkFBUyxFQUFDO0FBQWYsc0JBQ0ksNERBQUMsa0RBQUQscUJBQ0ksd0ZBQ0kscUZBQ0ksK0VBREosZUFFSSxnRkFGSixlQUdJLCtFQUhKLGVBSUksaUZBSkosZUFLSSx1RkFMSixlQU1JLCtFQU5KLENBREosQ0FESixlQVdJLDJFQUNLeUIsTUFETCxDQVhKLENBREosQ0FESixDQURKLENBSkosQ0F2Q0osQ0FESjtBQW9FSDs7OztFQS9La0JTLGdEOztBQWtMdkJDLGlEQUFRLENBQUNDLE1BQVQsZUFBZ0IsNERBQUMsUUFBRCxPQUFoQixFQUE2QkMsUUFBUSxDQUFDQyxhQUFULENBQXVCLE9BQXZCLENBQTdCLEUiLCJmaWxlIjoidXNlcl9saXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSnNvbnBDYWxsYmFjayhkYXRhKSB7XG4gXHRcdHZhciBjaHVua0lkcyA9IGRhdGFbMF07XG4gXHRcdHZhciBtb3JlTW9kdWxlcyA9IGRhdGFbMV07XG4gXHRcdHZhciBleGVjdXRlTW9kdWxlcyA9IGRhdGFbMl07XG5cbiBcdFx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG4gXHRcdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuIFx0XHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwLCByZXNvbHZlcyA9IFtdO1xuIFx0XHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdHJlc29sdmVzLnB1c2goaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKTtcbiBcdFx0XHR9XG4gXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcbiBcdFx0fVxuIFx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmKHBhcmVudEpzb25wRnVuY3Rpb24pIHBhcmVudEpzb25wRnVuY3Rpb24oZGF0YSk7XG5cbiBcdFx0d2hpbGUocmVzb2x2ZXMubGVuZ3RoKSB7XG4gXHRcdFx0cmVzb2x2ZXMuc2hpZnQoKSgpO1xuIFx0XHR9XG5cbiBcdFx0Ly8gYWRkIGVudHJ5IG1vZHVsZXMgZnJvbSBsb2FkZWQgY2h1bmsgdG8gZGVmZXJyZWQgbGlzdFxuIFx0XHRkZWZlcnJlZE1vZHVsZXMucHVzaC5hcHBseShkZWZlcnJlZE1vZHVsZXMsIGV4ZWN1dGVNb2R1bGVzIHx8IFtdKTtcblxuIFx0XHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIGFsbCBjaHVua3MgcmVhZHlcbiBcdFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4gXHR9O1xuIFx0ZnVuY3Rpb24gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKSB7XG4gXHRcdHZhciByZXN1bHQ7XG4gXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgZGVmZXJyZWRNb2R1bGUgPSBkZWZlcnJlZE1vZHVsZXNbaV07XG4gXHRcdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG4gXHRcdFx0Zm9yKHZhciBqID0gMTsgaiA8IGRlZmVycmVkTW9kdWxlLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgZGVwSWQgPSBkZWZlcnJlZE1vZHVsZVtqXTtcbiBcdFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tkZXBJZF0gIT09IDApIGZ1bGZpbGxlZCA9IGZhbHNlO1xuIFx0XHRcdH1cbiBcdFx0XHRpZihmdWxmaWxsZWQpIHtcbiBcdFx0XHRcdGRlZmVycmVkTW9kdWxlcy5zcGxpY2UoaS0tLCAxKTtcbiBcdFx0XHRcdHJlc3VsdCA9IF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gZGVmZXJyZWRNb2R1bGVbMF0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdHJldHVybiByZXN1bHQ7XG4gXHR9XG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgQ1NTIGNodW5rc1xuIFx0dmFyIGluc3RhbGxlZENzc0NodW5rcyA9IHtcbiBcdFx0XCJ1c2VyX2xpc3RcIjogMFxuIFx0fVxuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJ1c2VyX2xpc3RcIjogMFxuIFx0fTtcblxuIFx0dmFyIGRlZmVycmVkTW9kdWxlcyA9IFtdO1xuXG4gXHQvLyBzY3JpcHQgcGF0aCBmdW5jdGlvblxuIFx0ZnVuY3Rpb24ganNvbnBTY3JpcHRTcmMoY2h1bmtJZCkge1xuIFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArICh7fVtjaHVua0lkXXx8Y2h1bmtJZCkgKyBcIi5qc1wiXG4gXHR9XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuIFx0Ly8gVGhpcyBmaWxlIGNvbnRhaW5zIG9ubHkgdGhlIGVudHJ5IGNodW5rLlxuIFx0Ly8gVGhlIGNodW5rIGxvYWRpbmcgZnVuY3Rpb24gZm9yIGFkZGl0aW9uYWwgY2h1bmtzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmUgPSBmdW5jdGlvbiByZXF1aXJlRW5zdXJlKGNodW5rSWQpIHtcbiBcdFx0dmFyIHByb21pc2VzID0gW107XG5cblxuIFx0XHQvLyBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiBDU1MgbG9hZGluZ1xuIFx0XHR2YXIgY3NzQ2h1bmtzID0ge1wiMFwiOjF9O1xuIFx0XHRpZihpbnN0YWxsZWRDc3NDaHVua3NbY2h1bmtJZF0pIHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ3NzQ2h1bmtzW2NodW5rSWRdKTtcbiBcdFx0ZWxzZSBpZihpbnN0YWxsZWRDc3NDaHVua3NbY2h1bmtJZF0gIT09IDAgJiYgY3NzQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDc3NDaHVua3NbY2h1bmtJZF0gPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRcdHZhciBocmVmID0gXCJcIiArICh7fVtjaHVua0lkXXx8Y2h1bmtJZCkgKyBcIi5jc3NcIjtcbiBcdFx0XHRcdHZhciBmdWxsaHJlZiA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIGhyZWY7XG4gXHRcdFx0XHR2YXIgZXhpc3RpbmdMaW5rVGFncyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwibGlua1wiKTtcbiBcdFx0XHRcdGZvcih2YXIgaSA9IDA7IGkgPCBleGlzdGluZ0xpbmtUYWdzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdHZhciB0YWcgPSBleGlzdGluZ0xpbmtUYWdzW2ldO1xuIFx0XHRcdFx0XHR2YXIgZGF0YUhyZWYgPSB0YWcuZ2V0QXR0cmlidXRlKFwiZGF0YS1ocmVmXCIpIHx8IHRhZy5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpO1xuIFx0XHRcdFx0XHRpZih0YWcucmVsID09PSBcInN0eWxlc2hlZXRcIiAmJiAoZGF0YUhyZWYgPT09IGhyZWYgfHwgZGF0YUhyZWYgPT09IGZ1bGxocmVmKSkgcmV0dXJuIHJlc29sdmUoKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdHZhciBleGlzdGluZ1N0eWxlVGFncyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic3R5bGVcIik7XG4gXHRcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZXhpc3RpbmdTdHlsZVRhZ3MubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0dmFyIHRhZyA9IGV4aXN0aW5nU3R5bGVUYWdzW2ldO1xuIFx0XHRcdFx0XHR2YXIgZGF0YUhyZWYgPSB0YWcuZ2V0QXR0cmlidXRlKFwiZGF0YS1ocmVmXCIpO1xuIFx0XHRcdFx0XHRpZihkYXRhSHJlZiA9PT0gaHJlZiB8fCBkYXRhSHJlZiA9PT0gZnVsbGhyZWYpIHJldHVybiByZXNvbHZlKCk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHR2YXIgbGlua1RhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xuIFx0XHRcdFx0bGlua1RhZy5yZWwgPSBcInN0eWxlc2hlZXRcIjtcbiBcdFx0XHRcdGxpbmtUYWcudHlwZSA9IFwidGV4dC9jc3NcIjtcbiBcdFx0XHRcdGxpbmtUYWcub25sb2FkID0gcmVzb2x2ZTtcbiBcdFx0XHRcdGxpbmtUYWcub25lcnJvciA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gXHRcdFx0XHRcdHZhciByZXF1ZXN0ID0gZXZlbnQgJiYgZXZlbnQudGFyZ2V0ICYmIGV2ZW50LnRhcmdldC5zcmMgfHwgZnVsbGhyZWY7XG4gXHRcdFx0XHRcdHZhciBlcnIgPSBuZXcgRXJyb3IoXCJMb2FkaW5nIENTUyBjaHVuayBcIiArIGNodW5rSWQgKyBcIiBmYWlsZWQuXFxuKFwiICsgcmVxdWVzdCArIFwiKVwiKTtcbiBcdFx0XHRcdFx0ZXJyLnJlcXVlc3QgPSByZXF1ZXN0O1xuIFx0XHRcdFx0XHRyZWplY3QoZXJyKTtcbiBcdFx0XHRcdH07XG4gXHRcdFx0XHRsaW5rVGFnLmhyZWYgPSBmdWxsaHJlZjtcbiBcdFx0XHRcdHZhciBoZWFkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdO1xuIFx0XHRcdFx0aGVhZC5hcHBlbmRDaGlsZChsaW5rVGFnKTtcbiBcdFx0XHR9KS50aGVuKGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0aW5zdGFsbGVkQ3NzQ2h1bmtzW2NodW5rSWRdID0gMDtcbiBcdFx0XHR9KSk7XG4gXHRcdH1cblxuIFx0XHQvLyBKU09OUCBjaHVuayBsb2FkaW5nIGZvciBqYXZhc2NyaXB0XG5cbiBcdFx0dmFyIGluc3RhbGxlZENodW5rRGF0YSA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhICE9PSAwKSB7IC8vIDAgbWVhbnMgXCJhbHJlYWR5IGluc3RhbGxlZFwiLlxuXG4gXHRcdFx0Ly8gYSBQcm9taXNlIG1lYW5zIFwiY3VycmVudGx5IGxvYWRpbmdcIi5cbiBcdFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEpIHtcbiBcdFx0XHRcdHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ2h1bmtEYXRhWzJdKTtcbiBcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0Ly8gc2V0dXAgUHJvbWlzZSBpbiBjaHVuayBjYWNoZVxuIFx0XHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRcdFx0aW5zdGFsbGVkQ2h1bmtEYXRhID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gW3Jlc29sdmUsIHJlamVjdF07XG4gXHRcdFx0XHR9KTtcbiBcdFx0XHRcdHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ2h1bmtEYXRhWzJdID0gcHJvbWlzZSk7XG5cbiBcdFx0XHRcdC8vIHN0YXJ0IGNodW5rIGxvYWRpbmdcbiBcdFx0XHRcdHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiBcdFx0XHRcdHZhciBvblNjcmlwdENvbXBsZXRlO1xuXG4gXHRcdFx0XHRzY3JpcHQuY2hhcnNldCA9ICd1dGYtOCc7XG4gXHRcdFx0XHRzY3JpcHQudGltZW91dCA9IDEyMDtcbiBcdFx0XHRcdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKSB7XG4gXHRcdFx0XHRcdHNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdHNjcmlwdC5zcmMgPSBqc29ucFNjcmlwdFNyYyhjaHVua0lkKTtcblxuIFx0XHRcdFx0Ly8gY3JlYXRlIGVycm9yIGJlZm9yZSBzdGFjayB1bndvdW5kIHRvIGdldCB1c2VmdWwgc3RhY2t0cmFjZSBsYXRlclxuIFx0XHRcdFx0dmFyIGVycm9yID0gbmV3IEVycm9yKCk7XG4gXHRcdFx0XHRvblNjcmlwdENvbXBsZXRlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gXHRcdFx0XHRcdC8vIGF2b2lkIG1lbSBsZWFrcyBpbiBJRS5cbiBcdFx0XHRcdFx0c2NyaXB0Lm9uZXJyb3IgPSBzY3JpcHQub25sb2FkID0gbnVsbDtcbiBcdFx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuIFx0XHRcdFx0XHR2YXIgY2h1bmsgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHRcdFx0XHRcdGlmKGNodW5rICE9PSAwKSB7XG4gXHRcdFx0XHRcdFx0aWYoY2h1bmspIHtcbiBcdFx0XHRcdFx0XHRcdHZhciBlcnJvclR5cGUgPSBldmVudCAmJiAoZXZlbnQudHlwZSA9PT0gJ2xvYWQnID8gJ21pc3NpbmcnIDogZXZlbnQudHlwZSk7XG4gXHRcdFx0XHRcdFx0XHR2YXIgcmVhbFNyYyA9IGV2ZW50ICYmIGV2ZW50LnRhcmdldCAmJiBldmVudC50YXJnZXQuc3JjO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IubWVzc2FnZSA9ICdMb2FkaW5nIGNodW5rICcgKyBjaHVua0lkICsgJyBmYWlsZWQuXFxuKCcgKyBlcnJvclR5cGUgKyAnOiAnICsgcmVhbFNyYyArICcpJztcbiBcdFx0XHRcdFx0XHRcdGVycm9yLm5hbWUgPSAnQ2h1bmtMb2FkRXJyb3InO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IudHlwZSA9IGVycm9yVHlwZTtcbiBcdFx0XHRcdFx0XHRcdGVycm9yLnJlcXVlc3QgPSByZWFsU3JjO1xuIFx0XHRcdFx0XHRcdFx0Y2h1bmtbMV0oZXJyb3IpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSB1bmRlZmluZWQ7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH07XG4gXHRcdFx0XHR2YXIgdGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiBcdFx0XHRcdFx0b25TY3JpcHRDb21wbGV0ZSh7IHR5cGU6ICd0aW1lb3V0JywgdGFyZ2V0OiBzY3JpcHQgfSk7XG4gXHRcdFx0XHR9LCAxMjAwMDApO1xuIFx0XHRcdFx0c2NyaXB0Lm9uZXJyb3IgPSBzY3JpcHQub25sb2FkID0gb25TY3JpcHRDb21wbGV0ZTtcbiBcdFx0XHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0cmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbiBcdH07XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvYXNzZXRzL1wiO1xuXG4gXHQvLyBvbiBlcnJvciBmdW5jdGlvbiBmb3IgYXN5bmMgbG9hZGluZ1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vZSA9IGZ1bmN0aW9uKGVycikgeyBjb25zb2xlLmVycm9yKGVycik7IHRocm93IGVycjsgfTtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIGFkZCBlbnRyeSBtb2R1bGUgdG8gZGVmZXJyZWQgbGlzdFxuIFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2goW1wiLi9hc3NldHMvanMvcGFnZXMvdXNlci9saXN0LmpzXCIsXCJ2ZW5kb3JzfmFsZXJ0c19mb3JtfmFsZXJ0c19saXN0fmNvbnRlbnQtaGVhZGVyfmRhc2hib2FyZC1wYWdlfmRhc2hib2FyZF9mb3JtfmRhc2hib2FyZF9saXN0fmRhdGFiYXNlfmFkNmEyNzdiXCIsXCJ2ZW5kb3JzfmFsZXJ0c19mb3JtfmFsZXJ0c19saXN0fmFwcH5kYXNoYm9hcmQtcGFnZX5kYXNoYm9hcmRfZm9ybX5kYXNoYm9hcmRfbGlzdH5kYXRhYmFzZV9mb3JtfmRhdGFifjdkZjc2YjdiXCIsXCJ2ZW5kb3JzfmFsZXJ0c19mb3JtfmFsZXJ0c19saXN0fmRhc2hib2FyZC1wYWdlfmRhc2hib2FyZF9mb3JtfmRhc2hib2FyZF9saXN0fmRhdGFiYXNlX2Zvcm1+ZGF0YWJhc2VffmEwYzVlZGMwXCIsXCJhbGVydHNfZm9ybX5hbGVydHNfbGlzdH5kYXNoYm9hcmQtcGFnZX5kYXNoYm9hcmRfZm9ybX5kYXNoYm9hcmRfbGlzdH5kYXRhYmFzZV9mb3JtfmRhdGFiYXNlX3RhYmxlc35lfjk2NzU1YjY0XCJdKTtcbiBcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gcmVhZHlcbiBcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIiwiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCB7Q2FyZEhlYWRlciwgVGFibGUsIExpbmssIEljb24sIEJ1dHRvbiwgRGVsZXRlTW9kYWx9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMnO1xuaW1wb3J0IHtBbGVydCwgVXNlckFjdGlvbnN9IGZyb20gJy4uLy4uL2FjdGlvbnMnO1xuXG5jbGFzcyBVc2VyTGlzdCBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgdXNlcnM6IFtdLFxuICAgICAgICAgICAgaXNMb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgICAgIG5ld1VzZXI6IG51bGwsXG4gICAgICAgICAgICB1c2VyU2VsZWN0ZWQ6IG51bGwsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMub25DaGFuZ2VTdGF0dXMgPSB0aGlzLm9uQ2hhbmdlU3RhdHVzLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub25EZWxldGUgPSB0aGlzLm9uRGVsZXRlLmJpbmQodGhpcyk7XG4gICAgfVxuXG4gICAgbG9hZERhdGEoKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgaXNMb2FkaW5nOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcbiAgICAgICAgVXNlckFjdGlvbnMuZ2V0QWxsVXNlcigpXG4gICAgICAgICAgICAudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHtlcnJvciwgZGF0YX0gPSByZXM7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGF0LnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgdXNlcnM6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIGlzTG9hZGluZzogZmFsc2VcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLmxvYWREYXRhKCk7XG4gICAgICAgIGNvbnN0IG5ld1VzZXIgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbmV3VXNlcicpICYmIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ25ld1VzZXInKSkuZW1haWwgPyBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCduZXdVc2VyJykpLmVtYWlsIDogbnVsbDtcbiAgICAgICAgaWYgKG5ld1VzZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIG5ld1VzZXIsXG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCduZXdVc2VyJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe25ld1VzZXI6IG51bGx9KTtcbiAgICAgICAgICAgICAgICB9LCA1MDAwKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQ2hhbmdlU3RhdHVzKGtleSkge1xuICAgICAgICBjb25zdCB7dXNlcnN9ID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgY29uc3QgdXNlciA9IHVzZXJzW2tleV07XG4gICAgICAgIGNvbnN0IG5ld1N0YXR1cyA9IHVzZXIuaXNfYWN0aXZlID8gMCA6IDE7XG4gICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xuICAgICAgICB0aGF0LnNldFN0YXRlKHtcbiAgICAgICAgICAgIGlzTG9hZGluZzogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgVXNlckFjdGlvbnMuc2V0U3RhdHVzKHVzZXIuaWQsIHtpc19hY3RpdmU6IG5ld1N0YXR1c30pXG4gICAgICAgICAgICAudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHtlcnJvcn0gPSByZXM7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RyTWVzc2FnZSA9IG5ld1N0YXR1cyA/ICdFbmFibGUnIDogJ0Rpc2FibGUnO1xuICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICBBbGVydC5lcnJvcihgWW91IGNhbiBub3QgJHtzdHJNZXNzYWdlfSB0aGlzIHVzZXJgKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHVzZXJzW2tleV0uaXNfYWN0aXZlID0gbmV3U3RhdHVzO1xuICAgICAgICAgICAgICAgIEFsZXJ0LnN1Y2Nlc3MoYCR7c3RyTWVzc2FnZX0gc3VjY2Vzc2Z1bGApO1xuICAgICAgICAgICAgICAgIHRoYXQuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICB1c2Vyc1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSkuZmluYWxseSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhhdC5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIGlzTG9hZGluZzogZmFsc2VcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uRGVsZXRlID0gKGtleSkgPT4ge1xuICAgICAgICBpZiAoa2V5ICE9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICB1c2VyU2VsZWN0ZWQ6IGtleVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBBbGVydC5lcnJvcignQ2FuIG5vdCBkZWxldGUgeW91ciBhY2NvdW50IGJ5IHlvdXJzZWxmJylcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHt1c2VycywgbmV3VXNlciwgdXNlclNlbGVjdGVkfSA9IHRoaXMuc3RhdGU7XG5cbiAgICAgICAgY29uc3QgX3VzZXJzID0gdXNlcnMubWFwKCh1c2VyLCBrZXkpID0+IHtcbiAgICAgICAgICAgIHJldHVybiA8dHIga2V5PXtrZXl9PlxuICAgICAgICAgICAgICAgIDx0ZD57dXNlci5maXJzdF9uYW1lfSB7dXNlci5sYXN0X25hbWV9PC90ZD5cbiAgICAgICAgICAgICAgICA8dGQ+e3VzZXIuZW1haWx9PC90ZD5cbiAgICAgICAgICAgICAgICA8dGQ+e3VzZXIuaXNfYWRtaW4gPyAnQWRtaW4nIDogJ3VzZXInfTwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkPnt1c2VyLnN0YXR1c308L3RkPlxuICAgICAgICAgICAgICAgIDx0ZD57dXNlci5sYXN0X3VwZGF0ZWR9PC90ZD5cbiAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPXsndGV4dC1yaWdodCd9PlxuICAgICAgICAgICAgICAgICAgICA8TGluayBocmVmPXsnL3VzZXIvJyArIHVzZXIuaWR9IGNsYXNzTmFtZT17J2J0biBidG4tc20gbWUtMyBidG4tc3VjY2Vzcyd9IHRpdGxlPXsnRWRpdCd9PjxJY29uIG5hbWU9eydlZGl0J30vPjwvTGluaz5cbiAgICAgICAgICAgICAgICAgICAge3VzZXIuaXNfYWN0aXZlID09IDEgJiZcbiAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXtfID0+IHRoaXMub25DaGFuZ2VTdGF0dXMoa2V5KX0gY2xhc3NOYW1lPXsnYnRuIGJ0bi1zbSBidG4td2FybmluZyd9IHRpdGxlPXsnRGlzYWJsZSd9PjxJY29uIG5hbWU9eyd1c2VyLXRpbWVzJ30vPjwvQnV0dG9uPn1cbiAgICAgICAgICAgICAgICAgICAge3VzZXIuaXNfYWN0aXZlICE9IDEgJiZcbiAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXtfID0+IHRoaXMub25DaGFuZ2VTdGF0dXMoa2V5KX0gY2xhc3NOYW1lPXsnYnRuIGJ0bi1zbSBidG4tcHJpbWFyeSd9IHRpdGxlPXsnRW5hYmxlJ30+PEljb24gbmFtZT17J3VzZXItcGx1cyd9Lz48L0J1dHRvbj59XG4gICAgICAgICAgICAgICAgICAgIDxCdXR0b24gb25DbGljaz17XyA9PiB0aGlzLm9uRGVsZXRlKGtleSl9IGNsYXNzTmFtZT17J2J0biBtcy0zIGJ0bi1zbSBidG4tZGFuZ2VyJ30gdGl0bGU9eydEZWxldGUnfT48SWNvbiBuYW1lPXsndHJhc2gnfS8+PC9CdXR0b24+XG4gICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgIDwvdHI+O1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ1c2VycyBjb250YWluZXItZmx1aWRcIj5cbiAgICAgICAgICAgICAgICA8RGVsZXRlTW9kYWxcbiAgICAgICAgICAgICAgICAgICAgZGF0YT17dXNlcnN9XG4gICAgICAgICAgICAgICAgICAgIGluZGV4U2VsZWN0ZWQ9e3VzZXJTZWxlY3RlZH1cbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0TmFtZT1cInVzZXJcIlxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RmllbGQ9XCJlbWFpbFwiXG4gICAgICAgICAgICAgICAgICAgIGNsb3NlQnV0dG9uQWN0aW9uPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyU2VsZWN0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgc2F2ZUJ1dHRvbkFjdGlvbj17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNMb2FkaW5nOiB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIFVzZXJBY3Rpb25zLmRlbGV0ZSh1c2Vyc1t1c2VyU2VsZWN0ZWRdLmlkKS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qge2Vycm9yfSA9IHJlcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQWxlcnQuZXJyb3IoJ1lvdSBjYW4gbm90IGRlbGV0ZSB0aGlzIGFjY291bnQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJzLnNwbGljZSh1c2VyU2VsZWN0ZWQsIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VycyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBBbGVydC5zdWNjZXNzKCdEZWxldGUgc3VjY2Vzc2Z1bCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSkuZmluYWxseSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzTG9hZGluZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJTZWxlY3RlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIHtuZXdVc2VyICYmIChcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhbGVydCBhbGVydC1zdWNjZXNzXCIgcm9sZT1cImFsZXJ0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7YFRoZSBhY2NvdW50ICR7bmV3VXNlcn0gaGFzIGJlZW4gY3JlYXRlZC5gfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj4pfVxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZFwiPlxuICAgICAgICAgICAgICAgICAgICA8Q2FyZEhlYWRlciB0aXRsZT1cIlVzZXIgbWFuYWdlbWVudFwiIHNob3dDb2xsYXBzZUJ1dHRvbj17ZmFsc2V9IHNob3dSZW1vdmVCdXR0b249e2ZhbHNlfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxMaW5rIGNsYXNzTmFtZT17J2J0biBidG4tc3VjY2Vzcyd9IGhyZWY9eycvdXNlci9jcmVhdGUnfT5DcmVhdGUgdXNlcjwvTGluaz5cbiAgICAgICAgICAgICAgICAgICAgPC9DYXJkSGVhZGVyPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtYm9keVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC0xMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGFibGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+TmFtZTwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5FbWFpbDwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5Sb2xlPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPlN0YXR1czwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5MYXN0IHVwZGF0ZWQ8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+Jm5ic3A7PC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7X3VzZXJzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9UYWJsZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuUmVhY3RET00ucmVuZGVyKDxVc2VyTGlzdC8+LCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcm9vdCcpKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=