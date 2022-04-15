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
/******/ 		"user_confirmation": 0
/******/ 	}
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"user_confirmation": 0
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
/******/ 	deferredModules.push(["./assets/js/pages/user/confirmation.js","vendors~alerts_form~alerts_list~content-header~dashboard-page~dashboard_form~dashboard_list~database~ad6a277b","vendors~alerts_form~alerts_list~app~dashboard-page~dashboard_form~dashboard_list~database_form~datab~7df76b7b","vendors~alerts_form~alerts_list~dashboard-page~dashboard_form~dashboard_list~database_form~database_~a0c5edc0","alerts_form~alerts_list~dashboard-page~dashboard_form~dashboard_list~database_form~database_tables~e~96755b64"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/js/pages/user/confirmation.js":
/*!**********************************************!*\
  !*** ./assets/js/pages/user/confirmation.js ***!
  \**********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.function.bind.js */ "./node_modules/core-js/modules/es.function.bind.js");
/* harmony import */ var core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.function.name.js */ "./node_modules/core-js/modules/es.function.name.js");
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_string_trim_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.string.trim.js */ "./node_modules/core-js/modules/es.string.trim.js");
/* harmony import */ var core_js_modules_es_string_trim_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_trim_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.promise.js */ "./node_modules/core-js/modules/es.promise.js");
/* harmony import */ var core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_promise_finally_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.promise.finally.js */ "./node_modules/core-js/modules/es.promise.finally.js");
/* harmony import */ var core_js_modules_es_promise_finally_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise_finally_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.object.set-prototype-of.js */ "./node_modules/core-js/modules/es.object.set-prototype-of.js");
/* harmony import */ var core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.object.get-prototype-of.js */ "./node_modules/core-js/modules/es.object.get-prototype-of.js");
/* harmony import */ var core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.reflect.construct.js */ "./node_modules/core-js/modules/es.reflect.construct.js");
/* harmony import */ var core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.object.create.js */ "./node_modules/core-js/modules/es.object.create.js");
/* harmony import */ var core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.object.define-property.js */ "./node_modules/core-js/modules/es.object.define-property.js");
/* harmony import */ var core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! core-js/modules/es.symbol.description.js */ "./node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ "./node_modules/core-js/modules/es.symbol.iterator.js");
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../components */ "./assets/js/components/index.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../actions */ "./assets/js/actions/index.js");
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






var UserConfirmationForm = /*#__PURE__*/function (_Component) {
  _inherits(UserConfirmationForm, _Component);

  var _super = _createSuper(UserConfirmationForm);

  function UserConfirmationForm(props) {
    var _this;

    _classCallCheck(this, UserConfirmationForm);

    _this = _super.call(this, props);
    _this.state = {
      token: window.token ? window.token : '',
      password: '',
      rePassword: '',
      isLoading: false
    };
    _this.onTextChange = _this.onTextChange.bind(_assertThisInitialized(_this));
    _this.onSubmit = _this.onSubmit.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(UserConfirmationForm, [{
    key: "onTextChange",
    value: function onTextChange(e) {
      var state = {};
      state[e.target.name] = e.target.value;
      state[e.target.name + 'Error'] = false;
      this.setState(state);
    }
  }, {
    key: "onSubmit",
    value: function onSubmit() {
      var hasError = false;
      var _this$state = this.state,
          token = _this$state.token,
          password = _this$state.password,
          rePassword = _this$state.rePassword;
      password = $.trim(password);
      rePassword = $.trim(rePassword);

      if (password === '') {
        this.setState({
          passwordError: true
        });
        hasError = true;
      }

      if (rePassword !== password) {
        this.setState({
          rePasswordError: true
        });
        hasError = true;
      }

      if (!hasError) {
        this.setState({
          isLoading: true
        });
        var that = this;
        _actions__WEBPACK_IMPORTED_MODULE_20__["UserActions"].confirm(token, {
          password: password
        }).then(function (res) {
          var error = res.error,
              redirect = res.redirect;

          if (error) {
            return;
          }

          window.location.href = redirect;
        })["finally"](function () {
          that.setState({
            isLoading: false
          });
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state2 = this.state,
          password = _this$state2.password,
          rePassword = _this$state2.rePassword,
          passwordError = _this$state2.passwordError,
          rePasswordError = _this$state2.rePasswordError,
          isLoading = _this$state2.isLoading;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_17___default.a.createElement("div", {
        className: "user container-fluid"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_17___default.a.createElement("div", {
        className: "card"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_17___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_19__["CardHeader"], {
        title: 'Confirmation',
        showCollapseButton: false,
        showRemoveButton: false
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_17___default.a.createElement("div", {
        className: "card-body"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_17___default.a.createElement("form", {
        role: "form"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_17___default.a.createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_17___default.a.createElement("p", null, "To complete activation your account, please create your password")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_17___default.a.createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_17___default.a.createElement("label", null, "Password"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_17___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_19__["Input"], {
        type: 'password',
        className: passwordError ? 'is-invalid' : '',
        required: true,
        name: 'password',
        placeholder: "Password",
        value: password,
        onChange: this.onTextChange
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_17___default.a.createElement("small", {
        className: "form-text text-muted"
      }, "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_17___default.a.createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_17___default.a.createElement("label", null, "Repeat your password"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_17___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_19__["Input"], {
        type: 'password',
        className: rePasswordError ? 'is-invalid' : '',
        required: true,
        name: 'rePassword',
        placeholder: "Repeat your password",
        value: rePassword,
        onChange: this.onTextChange
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_17___default.a.createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_17___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_19__["Button"], {
        onClick: this.onSubmit,
        isLoading: isLoading
      }, "Set password"))))));
    }
  }]);

  return UserConfirmationForm;
}(react__WEBPACK_IMPORTED_MODULE_17__["Component"]);

react_dom__WEBPACK_IMPORTED_MODULE_18___default.a.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_17___default.a.createElement(UserConfirmationForm, null), document.querySelector('#root'));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3BhZ2VzL3VzZXIvY29uZmlybWF0aW9uLmpzIl0sIm5hbWVzIjpbIlVzZXJDb25maXJtYXRpb25Gb3JtIiwicHJvcHMiLCJzdGF0ZSIsInRva2VuIiwid2luZG93IiwicGFzc3dvcmQiLCJyZVBhc3N3b3JkIiwiaXNMb2FkaW5nIiwib25UZXh0Q2hhbmdlIiwiYmluZCIsIm9uU3VibWl0IiwiZSIsInRhcmdldCIsIm5hbWUiLCJ2YWx1ZSIsInNldFN0YXRlIiwiaGFzRXJyb3IiLCIkIiwidHJpbSIsInBhc3N3b3JkRXJyb3IiLCJyZVBhc3N3b3JkRXJyb3IiLCJ0aGF0IiwiVXNlckFjdGlvbnMiLCJjb25maXJtIiwidGhlbiIsInJlcyIsImVycm9yIiwicmVkaXJlY3QiLCJsb2NhdGlvbiIsImhyZWYiLCJDb21wb25lbnQiLCJSZWFjdERPTSIsInJlbmRlciIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsUUFBUSxvQkFBb0I7UUFDNUI7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxpQkFBaUIsNEJBQTRCO1FBQzdDO1FBQ0E7UUFDQSxrQkFBa0IsMkJBQTJCO1FBQzdDO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTs7UUFFQTtRQUNBO1FBQ0EsMENBQTBDO1FBQzFDOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtR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LHNCQUF6SDtBQUFnSixhQUFLLEVBQUVkLFVBQXZKO0FBQW1LLGdCQUFRLEVBQUUsS0FBS0U7QUFBbEwsUUFGSixDQVhKLGVBZUk7QUFBSyxpQkFBUyxFQUFDO0FBQWYsc0JBQ0ksNERBQUMsbURBQUQ7QUFBUSxlQUFPLEVBQUUsS0FBS0UsUUFBdEI7QUFBZ0MsaUJBQVMsRUFBRUg7QUFBM0Msd0JBREosQ0FmSixDQURKLENBRkosQ0FESixDQURKO0FBNEJIOzs7O0VBN0Y4QnVCLGdEOztBQWdHbkNDLGlEQUFRLENBQUNDLE1BQVQsZUFBZ0IsNERBQUMsb0JBQUQsT0FBaEIsRUFBeUNDLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixPQUF2QixDQUF6QyxFIiwiZmlsZSI6InVzZXJfY29uZmlybWF0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSnNvbnBDYWxsYmFjayhkYXRhKSB7XG4gXHRcdHZhciBjaHVua0lkcyA9IGRhdGFbMF07XG4gXHRcdHZhciBtb3JlTW9kdWxlcyA9IGRhdGFbMV07XG4gXHRcdHZhciBleGVjdXRlTW9kdWxlcyA9IGRhdGFbMl07XG5cbiBcdFx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG4gXHRcdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuIFx0XHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwLCByZXNvbHZlcyA9IFtdO1xuIFx0XHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdHJlc29sdmVzLnB1c2goaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKTtcbiBcdFx0XHR9XG4gXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcbiBcdFx0fVxuIFx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmKHBhcmVudEpzb25wRnVuY3Rpb24pIHBhcmVudEpzb25wRnVuY3Rpb24oZGF0YSk7XG5cbiBcdFx0d2hpbGUocmVzb2x2ZXMubGVuZ3RoKSB7XG4gXHRcdFx0cmVzb2x2ZXMuc2hpZnQoKSgpO1xuIFx0XHR9XG5cbiBcdFx0Ly8gYWRkIGVudHJ5IG1vZHVsZXMgZnJvbSBsb2FkZWQgY2h1bmsgdG8gZGVmZXJyZWQgbGlzdFxuIFx0XHRkZWZlcnJlZE1vZHVsZXMucHVzaC5hcHBseShkZWZlcnJlZE1vZHVsZXMsIGV4ZWN1dGVNb2R1bGVzIHx8IFtdKTtcblxuIFx0XHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIGFsbCBjaHVua3MgcmVhZHlcbiBcdFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4gXHR9O1xuIFx0ZnVuY3Rpb24gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKSB7XG4gXHRcdHZhciByZXN1bHQ7XG4gXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgZGVmZXJyZWRNb2R1bGUgPSBkZWZlcnJlZE1vZHVsZXNbaV07XG4gXHRcdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG4gXHRcdFx0Zm9yKHZhciBqID0gMTsgaiA8IGRlZmVycmVkTW9kdWxlLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgZGVwSWQgPSBkZWZlcnJlZE1vZHVsZVtqXTtcbiBcdFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tkZXBJZF0gIT09IDApIGZ1bGZpbGxlZCA9IGZhbHNlO1xuIFx0XHRcdH1cbiBcdFx0XHRpZihmdWxmaWxsZWQpIHtcbiBcdFx0XHRcdGRlZmVycmVkTW9kdWxlcy5zcGxpY2UoaS0tLCAxKTtcbiBcdFx0XHRcdHJlc3VsdCA9IF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gZGVmZXJyZWRNb2R1bGVbMF0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdHJldHVybiByZXN1bHQ7XG4gXHR9XG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgQ1NTIGNodW5rc1xuIFx0dmFyIGluc3RhbGxlZENzc0NodW5rcyA9IHtcbiBcdFx0XCJ1c2VyX2NvbmZpcm1hdGlvblwiOiAwXG4gXHR9XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHQvLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbiBcdC8vIFByb21pc2UgPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHRcInVzZXJfY29uZmlybWF0aW9uXCI6IDBcbiBcdH07XG5cbiBcdHZhciBkZWZlcnJlZE1vZHVsZXMgPSBbXTtcblxuIFx0Ly8gc2NyaXB0IHBhdGggZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIGpzb25wU2NyaXB0U3JjKGNodW5rSWQpIHtcbiBcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyAoe31bY2h1bmtJZF18fGNodW5rSWQpICsgXCIuanNcIlxuIFx0fVxuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cbiBcdC8vIFRoaXMgZmlsZSBjb250YWlucyBvbmx5IHRoZSBlbnRyeSBjaHVuay5cbiBcdC8vIFRoZSBjaHVuayBsb2FkaW5nIGZ1bmN0aW9uIGZvciBhZGRpdGlvbmFsIGNodW5rc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5lID0gZnVuY3Rpb24gcmVxdWlyZUVuc3VyZShjaHVua0lkKSB7XG4gXHRcdHZhciBwcm9taXNlcyA9IFtdO1xuXG5cbiBcdFx0Ly8gbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4gQ1NTIGxvYWRpbmdcbiBcdFx0dmFyIGNzc0NodW5rcyA9IHtcIjBcIjoxfTtcbiBcdFx0aWYoaW5zdGFsbGVkQ3NzQ2h1bmtzW2NodW5rSWRdKSBwcm9taXNlcy5wdXNoKGluc3RhbGxlZENzc0NodW5rc1tjaHVua0lkXSk7XG4gXHRcdGVsc2UgaWYoaW5zdGFsbGVkQ3NzQ2h1bmtzW2NodW5rSWRdICE9PSAwICYmIGNzc0NodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ3NzQ2h1bmtzW2NodW5rSWRdID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0XHR2YXIgaHJlZiA9IFwiXCIgKyAoe31bY2h1bmtJZF18fGNodW5rSWQpICsgXCIuY3NzXCI7XG4gXHRcdFx0XHR2YXIgZnVsbGhyZWYgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBocmVmO1xuIFx0XHRcdFx0dmFyIGV4aXN0aW5nTGlua1RhZ3MgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImxpbmtcIik7XG4gXHRcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZXhpc3RpbmdMaW5rVGFncy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHR2YXIgdGFnID0gZXhpc3RpbmdMaW5rVGFnc1tpXTtcbiBcdFx0XHRcdFx0dmFyIGRhdGFIcmVmID0gdGFnLmdldEF0dHJpYnV0ZShcImRhdGEtaHJlZlwiKSB8fCB0YWcuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKTtcbiBcdFx0XHRcdFx0aWYodGFnLnJlbCA9PT0gXCJzdHlsZXNoZWV0XCIgJiYgKGRhdGFIcmVmID09PSBocmVmIHx8IGRhdGFIcmVmID09PSBmdWxsaHJlZikpIHJldHVybiByZXNvbHZlKCk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHR2YXIgZXhpc3RpbmdTdHlsZVRhZ3MgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInN0eWxlXCIpO1xuIFx0XHRcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGV4aXN0aW5nU3R5bGVUYWdzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdHZhciB0YWcgPSBleGlzdGluZ1N0eWxlVGFnc1tpXTtcbiBcdFx0XHRcdFx0dmFyIGRhdGFIcmVmID0gdGFnLmdldEF0dHJpYnV0ZShcImRhdGEtaHJlZlwiKTtcbiBcdFx0XHRcdFx0aWYoZGF0YUhyZWYgPT09IGhyZWYgfHwgZGF0YUhyZWYgPT09IGZ1bGxocmVmKSByZXR1cm4gcmVzb2x2ZSgpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0dmFyIGxpbmtUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcbiBcdFx0XHRcdGxpbmtUYWcucmVsID0gXCJzdHlsZXNoZWV0XCI7XG4gXHRcdFx0XHRsaW5rVGFnLnR5cGUgPSBcInRleHQvY3NzXCI7XG4gXHRcdFx0XHRsaW5rVGFnLm9ubG9hZCA9IHJlc29sdmU7XG4gXHRcdFx0XHRsaW5rVGFnLm9uZXJyb3IgPSBmdW5jdGlvbihldmVudCkge1xuIFx0XHRcdFx0XHR2YXIgcmVxdWVzdCA9IGV2ZW50ICYmIGV2ZW50LnRhcmdldCAmJiBldmVudC50YXJnZXQuc3JjIHx8IGZ1bGxocmVmO1xuIFx0XHRcdFx0XHR2YXIgZXJyID0gbmV3IEVycm9yKFwiTG9hZGluZyBDU1MgY2h1bmsgXCIgKyBjaHVua0lkICsgXCIgZmFpbGVkLlxcbihcIiArIHJlcXVlc3QgKyBcIilcIik7XG4gXHRcdFx0XHRcdGVyci5yZXF1ZXN0ID0gcmVxdWVzdDtcbiBcdFx0XHRcdFx0cmVqZWN0KGVycik7XG4gXHRcdFx0XHR9O1xuIFx0XHRcdFx0bGlua1RhZy5ocmVmID0gZnVsbGhyZWY7XG4gXHRcdFx0XHR2YXIgaGVhZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXTtcbiBcdFx0XHRcdGhlYWQuYXBwZW5kQ2hpbGQobGlua1RhZyk7XG4gXHRcdFx0fSkudGhlbihmdW5jdGlvbigpIHtcbiBcdFx0XHRcdGluc3RhbGxlZENzc0NodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdFx0fSkpO1xuIFx0XHR9XG5cbiBcdFx0Ly8gSlNPTlAgY2h1bmsgbG9hZGluZyBmb3IgamF2YXNjcmlwdFxuXG4gXHRcdHZhciBpbnN0YWxsZWRDaHVua0RhdGEgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSAhPT0gMCkgeyAvLyAwIG1lYW5zIFwiYWxyZWFkeSBpbnN0YWxsZWRcIi5cblxuIFx0XHRcdC8vIGEgUHJvbWlzZSBtZWFucyBcImN1cnJlbnRseSBsb2FkaW5nXCIuXG4gXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhKSB7XG4gXHRcdFx0XHRwcm9taXNlcy5wdXNoKGluc3RhbGxlZENodW5rRGF0YVsyXSk7XG4gXHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdC8vIHNldHVwIFByb21pc2UgaW4gY2h1bmsgY2FjaGVcbiBcdFx0XHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0XHRcdGluc3RhbGxlZENodW5rRGF0YSA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IFtyZXNvbHZlLCByZWplY3RdO1xuIFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRwcm9taXNlcy5wdXNoKGluc3RhbGxlZENodW5rRGF0YVsyXSA9IHByb21pc2UpO1xuXG4gXHRcdFx0XHQvLyBzdGFydCBjaHVuayBsb2FkaW5nXG4gXHRcdFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gXHRcdFx0XHR2YXIgb25TY3JpcHRDb21wbGV0ZTtcblxuIFx0XHRcdFx0c2NyaXB0LmNoYXJzZXQgPSAndXRmLTgnO1xuIFx0XHRcdFx0c2NyaXB0LnRpbWVvdXQgPSAxMjA7XG4gXHRcdFx0XHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5uYykge1xuIFx0XHRcdFx0XHRzY3JpcHQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgX193ZWJwYWNrX3JlcXVpcmVfXy5uYyk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRzY3JpcHQuc3JjID0ganNvbnBTY3JpcHRTcmMoY2h1bmtJZCk7XG5cbiBcdFx0XHRcdC8vIGNyZWF0ZSBlcnJvciBiZWZvcmUgc3RhY2sgdW53b3VuZCB0byBnZXQgdXNlZnVsIHN0YWNrdHJhY2UgbGF0ZXJcbiBcdFx0XHRcdHZhciBlcnJvciA9IG5ldyBFcnJvcigpO1xuIFx0XHRcdFx0b25TY3JpcHRDb21wbGV0ZSA9IGZ1bmN0aW9uIChldmVudCkge1xuIFx0XHRcdFx0XHQvLyBhdm9pZCBtZW0gbGVha3MgaW4gSUUuXG4gXHRcdFx0XHRcdHNjcmlwdC5vbmVycm9yID0gc2NyaXB0Lm9ubG9hZCA9IG51bGw7XG4gXHRcdFx0XHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiBcdFx0XHRcdFx0dmFyIGNodW5rID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0XHRcdFx0XHRpZihjaHVuayAhPT0gMCkge1xuIFx0XHRcdFx0XHRcdGlmKGNodW5rKSB7XG4gXHRcdFx0XHRcdFx0XHR2YXIgZXJyb3JUeXBlID0gZXZlbnQgJiYgKGV2ZW50LnR5cGUgPT09ICdsb2FkJyA/ICdtaXNzaW5nJyA6IGV2ZW50LnR5cGUpO1xuIFx0XHRcdFx0XHRcdFx0dmFyIHJlYWxTcmMgPSBldmVudCAmJiBldmVudC50YXJnZXQgJiYgZXZlbnQudGFyZ2V0LnNyYztcbiBcdFx0XHRcdFx0XHRcdGVycm9yLm1lc3NhZ2UgPSAnTG9hZGluZyBjaHVuayAnICsgY2h1bmtJZCArICcgZmFpbGVkLlxcbignICsgZXJyb3JUeXBlICsgJzogJyArIHJlYWxTcmMgKyAnKSc7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci5uYW1lID0gJ0NodW5rTG9hZEVycm9yJztcbiBcdFx0XHRcdFx0XHRcdGVycm9yLnR5cGUgPSBlcnJvclR5cGU7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci5yZXF1ZXN0ID0gcmVhbFNyYztcbiBcdFx0XHRcdFx0XHRcdGNodW5rWzFdKGVycm9yKTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gdW5kZWZpbmVkO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9O1xuIFx0XHRcdFx0dmFyIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gXHRcdFx0XHRcdG9uU2NyaXB0Q29tcGxldGUoeyB0eXBlOiAndGltZW91dCcsIHRhcmdldDogc2NyaXB0IH0pO1xuIFx0XHRcdFx0fSwgMTIwMDAwKTtcbiBcdFx0XHRcdHNjcmlwdC5vbmVycm9yID0gc2NyaXB0Lm9ubG9hZCA9IG9uU2NyaXB0Q29tcGxldGU7XG4gXHRcdFx0XHRkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gXHR9O1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Fzc2V0cy9cIjtcblxuIFx0Ly8gb24gZXJyb3IgZnVuY3Rpb24gZm9yIGFzeW5jIGxvYWRpbmdcbiBcdF9fd2VicGFja19yZXF1aXJlX18ub2UgPSBmdW5jdGlvbihlcnIpIHsgY29uc29sZS5lcnJvcihlcnIpOyB0aHJvdyBlcnI7IH07XG5cbiBcdHZhciBqc29ucEFycmF5ID0gd2luZG93W1wid2VicGFja0pzb25wXCJdID0gd2luZG93W1wid2VicGFja0pzb25wXCJdIHx8IFtdO1xuIFx0dmFyIG9sZEpzb25wRnVuY3Rpb24gPSBqc29ucEFycmF5LnB1c2guYmluZChqc29ucEFycmF5KTtcbiBcdGpzb25wQXJyYXkucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrO1xuIFx0anNvbnBBcnJheSA9IGpzb25wQXJyYXkuc2xpY2UoKTtcbiBcdGZvcih2YXIgaSA9IDA7IGkgPCBqc29ucEFycmF5Lmxlbmd0aDsgaSsrKSB3ZWJwYWNrSnNvbnBDYWxsYmFjayhqc29ucEFycmF5W2ldKTtcbiBcdHZhciBwYXJlbnRKc29ucEZ1bmN0aW9uID0gb2xkSnNvbnBGdW5jdGlvbjtcblxuXG4gXHQvLyBhZGQgZW50cnkgbW9kdWxlIHRvIGRlZmVycmVkIGxpc3RcbiBcdGRlZmVycmVkTW9kdWxlcy5wdXNoKFtcIi4vYXNzZXRzL2pzL3BhZ2VzL3VzZXIvY29uZmlybWF0aW9uLmpzXCIsXCJ2ZW5kb3JzfmFsZXJ0c19mb3JtfmFsZXJ0c19saXN0fmNvbnRlbnQtaGVhZGVyfmRhc2hib2FyZC1wYWdlfmRhc2hib2FyZF9mb3JtfmRhc2hib2FyZF9saXN0fmRhdGFiYXNlfmFkNmEyNzdiXCIsXCJ2ZW5kb3JzfmFsZXJ0c19mb3JtfmFsZXJ0c19saXN0fmFwcH5kYXNoYm9hcmQtcGFnZX5kYXNoYm9hcmRfZm9ybX5kYXNoYm9hcmRfbGlzdH5kYXRhYmFzZV9mb3JtfmRhdGFifjdkZjc2YjdiXCIsXCJ2ZW5kb3JzfmFsZXJ0c19mb3JtfmFsZXJ0c19saXN0fmRhc2hib2FyZC1wYWdlfmRhc2hib2FyZF9mb3JtfmRhc2hib2FyZF9saXN0fmRhdGFiYXNlX2Zvcm1+ZGF0YWJhc2VffmEwYzVlZGMwXCIsXCJhbGVydHNfZm9ybX5hbGVydHNfbGlzdH5kYXNoYm9hcmQtcGFnZX5kYXNoYm9hcmRfZm9ybX5kYXNoYm9hcmRfbGlzdH5kYXRhYmFzZV9mb3JtfmRhdGFiYXNlX3RhYmxlc35lfjk2NzU1YjY0XCJdKTtcbiBcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gcmVhZHlcbiBcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIiwiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCB7SW5wdXQsIEJ1dHRvbiwgQ2FyZEhlYWRlcn0gZnJvbSAnLi4vLi4vY29tcG9uZW50cyc7XG5pbXBvcnQge1VzZXJBY3Rpb25zfSBmcm9tICcuLi8uLi9hY3Rpb25zJztcblxuY2xhc3MgVXNlckNvbmZpcm1hdGlvbkZvcm0gZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcblxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgdG9rZW46IHdpbmRvdy50b2tlbiA/IHdpbmRvdy50b2tlbiA6ICcnLFxuICAgICAgICAgICAgcGFzc3dvcmQ6ICcnLFxuICAgICAgICAgICAgcmVQYXNzd29yZDogJycsXG4gICAgICAgICAgICBpc0xvYWRpbmc6IGZhbHNlXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMub25UZXh0Q2hhbmdlID0gdGhpcy5vblRleHRDaGFuZ2UuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5vblN1Ym1pdCA9IHRoaXMub25TdWJtaXQuYmluZCh0aGlzKTtcbiAgICB9XG5cbiAgICBvblRleHRDaGFuZ2UoZSkge1xuICAgICAgICBjb25zdCBzdGF0ZSA9IHt9O1xuICAgICAgICBzdGF0ZVtlLnRhcmdldC5uYW1lXSA9IGUudGFyZ2V0LnZhbHVlO1xuICAgICAgICBzdGF0ZVtlLnRhcmdldC5uYW1lICsgJ0Vycm9yJ10gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZShzdGF0ZSk7XG4gICAgfVxuXG4gICAgb25TdWJtaXQoKSB7XG4gICAgICAgIGxldCBoYXNFcnJvciA9IGZhbHNlO1xuICAgICAgICBsZXQge3Rva2VuLCBwYXNzd29yZCwgcmVQYXNzd29yZH0gPSB0aGlzLnN0YXRlO1xuICAgICAgICBwYXNzd29yZCA9ICQudHJpbShwYXNzd29yZCk7XG4gICAgICAgIHJlUGFzc3dvcmQgPSAkLnRyaW0ocmVQYXNzd29yZCk7XG4gICAgICAgIGlmIChwYXNzd29yZCA9PT0gJycpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIHBhc3N3b3JkRXJyb3I6IHRydWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaGFzRXJyb3IgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJlUGFzc3dvcmQgIT09IHBhc3N3b3JkKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICByZVBhc3N3b3JkRXJyb3I6IHRydWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaGFzRXJyb3IgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFoYXNFcnJvcikge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgaXNMb2FkaW5nOiB0cnVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xuICAgICAgICAgICAgVXNlckFjdGlvbnMuY29uZmlybSh0b2tlbiwge1xuICAgICAgICAgICAgICAgIHBhc3N3b3JkXG4gICAgICAgICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qge2Vycm9yLCByZWRpcmVjdH0gPSByZXM7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHJlZGlyZWN0O1xuICAgICAgICAgICAgfSkuZmluYWxseSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhhdC5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIGlzTG9hZGluZzogZmFsc2VcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7cGFzc3dvcmQsIHJlUGFzc3dvcmQsIHBhc3N3b3JkRXJyb3IsIHJlUGFzc3dvcmRFcnJvciwgaXNMb2FkaW5nfSA9IHRoaXMuc3RhdGU7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidXNlciBjb250YWluZXItZmx1aWRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmRcIj5cbiAgICAgICAgICAgICAgICAgICAgPENhcmRIZWFkZXIgdGl0bGU9eydDb25maXJtYXRpb24nfSBzaG93Q29sbGFwc2VCdXR0b249e2ZhbHNlfSBzaG93UmVtb3ZlQnV0dG9uPXtmYWxzZX0gLz5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLWJvZHlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxmb3JtIHJvbGU9XCJmb3JtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPlRvIGNvbXBsZXRlIGFjdGl2YXRpb24geW91ciBhY2NvdW50LCBwbGVhc2UgY3JlYXRlIHlvdXIgcGFzc3dvcmQ8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD5QYXNzd29yZDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxJbnB1dCB0eXBlPXsncGFzc3dvcmQnfSBjbGFzc05hbWU9e3Bhc3N3b3JkRXJyb3IgPyAnaXMtaW52YWxpZCcgOiAnJ30gcmVxdWlyZWQ9e3RydWV9IG5hbWU9eydwYXNzd29yZCd9IHBsYWNlaG9sZGVyPVwiUGFzc3dvcmRcIiB2YWx1ZT17cGFzc3dvcmR9IG9uQ2hhbmdlPXt0aGlzLm9uVGV4dENoYW5nZX0vPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c21hbGwgY2xhc3NOYW1lPVwiZm9ybS10ZXh0IHRleHQtbXV0ZWRcIj5NaW5pbXVtIGVpZ2h0IGNoYXJhY3RlcnMsIGF0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWFzdCBvbmUgdXBwZXJjYXNlIGxldHRlciwgb25lIGxvd2VyY2FzZSBsZXR0ZXIsIG9uZSBudW1iZXIgYW5kXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbmUgc3BlY2lhbCBjaGFyYWN0ZXIuPC9zbWFsbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPlJlcGVhdCB5b3VyIHBhc3N3b3JkPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPElucHV0IHR5cGU9eydwYXNzd29yZCd9IGNsYXNzTmFtZT17cmVQYXNzd29yZEVycm9yID8gJ2lzLWludmFsaWQnIDogJyd9IHJlcXVpcmVkPXt0cnVlfSBuYW1lPXsncmVQYXNzd29yZCd9IHBsYWNlaG9sZGVyPVwiUmVwZWF0IHlvdXIgcGFzc3dvcmRcIiB2YWx1ZT17cmVQYXNzd29yZH0gb25DaGFuZ2U9e3RoaXMub25UZXh0Q2hhbmdlfS8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b24gb25DbGljaz17dGhpcy5vblN1Ym1pdH0gaXNMb2FkaW5nPXtpc0xvYWRpbmd9PlNldCBwYXNzd29yZDwvQnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuUmVhY3RET00ucmVuZGVyKDxVc2VyQ29uZmlybWF0aW9uRm9ybS8+LCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcm9vdCcpKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=