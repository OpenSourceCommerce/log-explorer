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
/******/ 		"user_form": 0
/******/ 	}
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"user_form": 0
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
/******/ 	deferredModules.push(["./assets/js/pages/user/form.js","vendors~alerts_form~alerts_list~content-header~dashboard-page~dashboard_form~dashboard_list~database~ad6a277b","vendors~alerts_form~alerts_list~app~dashboard-page~dashboard_form~dashboard_list~database_form~datab~7df76b7b","vendors~alerts_form~alerts_list~dashboard-page~dashboard_form~dashboard_list~database_form~database_~a0c5edc0","alerts_form~alerts_list~dashboard-page~dashboard_form~dashboard_list~database_form~database_tables~e~96755b64"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/js/pages/user/form.js":
/*!**************************************!*\
  !*** ./assets/js/pages/user/form.js ***!
  \**************************************/
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






var UserForm = /*#__PURE__*/function (_Component) {
  _inherits(UserForm, _Component);

  var _super = _createSuper(UserForm);

  function UserForm(props) {
    var _this;

    _classCallCheck(this, UserForm);

    _this = _super.call(this, props);
    _this.state = {
      id: window.user ? window.user : '',
      firstName: '',
      lastName: '',
      email: '',
      isAdmin: false
    };
    _this.onTextChange = _this.onTextChange.bind(_assertThisInitialized(_this));
    _this.onCheckboxChange = _this.onCheckboxChange.bind(_assertThisInitialized(_this));
    _this.onSubmit = _this.onSubmit.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(UserForm, [{
    key: "loadUser",
    value: function loadUser(id) {
      var that = this;
      this.setState({
        isLoading: true
      });
      _actions__WEBPACK_IMPORTED_MODULE_20__["UserActions"].getUser(id).then(function (res) {
        var error = res.error,
            data = res.data;

        if (error) {
          return;
        }

        var first_name = data.first_name,
            last_name = data.last_name,
            email = data.email,
            is_admin = data.is_admin;
        that.setState({
          firstName: first_name,
          lastName: last_name,
          email: email,
          isAdmin: is_admin == 1,
          isLoading: false,
          firstNameError: false,
          lastNameError: false,
          emailError: false
        });
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var id = this.state.id;

      if (id) {
        this.loadUser(id);
      }
    }
  }, {
    key: "onTextChange",
    value: function onTextChange(e) {
      var state = {};
      state[e.target.name] = e.target.value;
      state[e.target.name + 'Error'] = false;
      this.setState(state);
    }
  }, {
    key: "onCheckboxChange",
    value: function onCheckboxChange(e) {
      this.setState({
        isAdmin: e.target.checked
      });
    }
  }, {
    key: "onSubmit",
    value: function onSubmit() {
      var hasError = false;
      var _this$state = this.state,
          id = _this$state.id,
          firstName = _this$state.firstName,
          lastName = _this$state.lastName,
          email = _this$state.email,
          isAdmin = _this$state.isAdmin;
      firstName = $.trim(firstName);
      lastName = $.trim(lastName);
      email = $.trim(email);

      if (firstName === '') {
        this.setState({
          firstNameError: true
        });
        hasError = true;
      }

      if (lastName === '') {
        this.setState({
          lastNameError: true
        });
        hasError = true;
      }

      if (email === '') {
        this.setState({
          emailError: true
        });
        hasError = true;
      }

      if (!hasError) {
        this.setState({
          isLoading: true
        });
        var that = this;
        _actions__WEBPACK_IMPORTED_MODULE_20__["UserActions"].createOrUpdate(id, {
          first_name: firstName,
          last_name: lastName,
          email: email,
          is_admin: isAdmin ? 1 : 0
        }).then(function (res) {
          var error = res.error,
              redirect = res.redirect;

          if (error) {
            return;
          }

          if (redirect) {
            localStorage.setItem('newUser', JSON.stringify({
              email: email
            }));
            window.location.href = '/user';
          } else {
            _actions__WEBPACK_IMPORTED_MODULE_20__["Alert"].success('Update successful');
          }
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
          id = _this$state2.id,
          firstName = _this$state2.firstName,
          lastName = _this$state2.lastName,
          email = _this$state2.email,
          isAdmin = _this$state2.isAdmin,
          isLoading = _this$state2.isLoading,
          firstNameError = _this$state2.firstNameError,
          lastNameError = _this$state2.lastNameError,
          emailError = _this$state2.emailError;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_17___default.a.createElement("div", {
        className: "user container-fluid"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_17___default.a.createElement("div", {
        className: "card"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_17___default.a.createElement("div", {
        className: "card-header"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_17___default.a.createElement("h3", {
        className: "card-title align-items-center p-2"
      }, id === '' ? 'Create new user' : 'Update user'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_17___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_19__["Button"], {
        className: "float-end",
        color: 'success',
        onClick: this.onSubmit,
        isLoading: isLoading
      }, id === '' ? 'Create user' : 'Update user')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_17___default.a.createElement("div", {
        className: "card-body"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_17___default.a.createElement("form", {
        role: "form"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_17___default.a.createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_17___default.a.createElement("label", null, "First name"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_17___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_19__["Input"], {
        className: firstNameError ? 'is-invalid' : '',
        required: true,
        name: 'firstName',
        placeholder: "First name",
        value: firstName,
        onChange: this.onTextChange
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_17___default.a.createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_17___default.a.createElement("label", null, "Last name"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_17___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_19__["Input"], {
        className: lastNameError ? 'is-invalid' : '',
        required: true,
        name: 'lastName',
        placeholder: "Last name",
        value: lastName,
        onChange: this.onTextChange
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_17___default.a.createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_17___default.a.createElement("label", null, "Email"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_17___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_19__["Input"], {
        className: emailError ? 'is-invalid' : '',
        required: true,
        type: 'email',
        name: 'email',
        placeholder: "Email",
        value: email,
        onChange: this.onTextChange
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_17___default.a.createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_17___default.a.createElement("label", null, "Role"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_17___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_19__["Checkbox"], {
        id: 'isAdmin',
        name: 'isAdmin',
        value: '1',
        checked: isAdmin,
        onChange: this.onCheckboxChange,
        label: 'Is Admin'
      }))))));
    }
  }]);

  return UserForm;
}(react__WEBPACK_IMPORTED_MODULE_17__["Component"]);

react_dom__WEBPACK_IMPORTED_MODULE_18___default.a.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_17___default.a.createElement(UserForm, null), document.querySelector('#root'));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3BhZ2VzL3VzZXIvZm9ybS5qcyJdLCJuYW1lcyI6WyJVc2VyRm9ybSIsInByb3BzIiwic3RhdGUiLCJpZCIsIndpbmRvdyIsInVzZXIiLCJmaXJzdE5hbWUiLCJsYXN0TmFtZSIsImVtYWlsIiwiaXNBZG1pbiIsIm9uVGV4dENoYW5nZSIsImJpbmQiLCJvbkNoZWNrYm94Q2hhbmdlIiwib25TdWJtaXQiLCJ0aGF0Iiwic2V0U3RhdGUiLCJpc0xvYWRpbmciLCJVc2VyQWN0aW9ucyIsImdldFVzZXIiLCJ0aGVuIiwicmVzIiwiZXJyb3IiLCJkYXRhIiwiZmlyc3RfbmFtZSIsImxhc3RfbmFtZSIsImlzX2FkbWluIiwiZmlyc3ROYW1lRXJyb3IiLCJsYXN0TmFtZUVycm9yIiwiZW1haWxFcnJvciIsImxvYWRVc2VyIiwiZSIsInRhcmdldCIsIm5hbWUiLCJ2YWx1ZSIsImNoZWNrZWQiLCJoYXNFcnJvciIsIiQiLCJ0cmltIiwiY3JlYXRlT3JVcGRhdGUiLCJyZWRpcmVjdCIsImxvY2FsU3RvcmFnZSIsInNldEl0ZW0iLCJKU09OIiwic3RyaW5naWZ5IiwibG9jYXRpb24iLCJocmVmIiwiQWxlcnQiLCJzdWNjZXNzIiwiQ29tcG9uZW50IiwiUmVhY3RET00iLCJyZW5kZXIiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLFFBQVEsb0JBQW9CO1FBQzVCO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsaUJBQWlCLDRCQUE0QjtRQUM3QztRQUNBO1FBQ0Esa0JBQWtCLDJCQUEyQjtRQUM3QztRQUNBO1FB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QWtCLEVBQWpEO0FBQXFELGdCQUFRLEVBQUUsSUFBL0Q7QUFBcUUsWUFBSSxFQUFFLFVBQTNFO0FBQXVGLG1CQUFXLEVBQUMsV0FBbkc7QUFBK0csYUFBSyxFQUFFcEIsUUFBdEg7QUFBZ0ksZ0JBQVEsRUFBRSxLQUFLRztBQUEvSSxRQUZKLENBTEosZUFTSTtBQUFLLGlCQUFTLEVBQUM7QUFBZixzQkFDSSxtRkFESixlQUVJLDREQUFDLGtEQUFEO0FBQU8saUJBQVMsRUFBRWtCLFVBQVUsR0FBRyxZQUFILEdBQWtCLEVBQTlDO0FBQWtELGdCQUFRLEVBQUUsSUFBNUQ7QUFBa0UsWUFBSSxFQUFFLE9BQXhFO0FBQWlGLFlBQUksRUFBRSxPQUF2RjtBQUFnRyxtQkFBVyxFQUFDLE9BQTVHO0FBQW9ILGFBQUssRUFBRXBCLEtBQTNIO0FBQWtJLGdCQUFRLEVBQUUsS0FBS0U7QUFBakosUUFGSixDQVRKLGVBYUk7QUFBSyxpQkFBUyxFQUFDO0FBQWYsc0JBQ0ksa0ZBREosZUFFSSw0REFBQyxxREFBRDtBQUFVLFVBQUUsRUFBRSxTQUFkO0FBQXlCLFlBQUksRUFBRSxTQUEvQjtBQUEwQyxhQUFLLEVBQUUsR0FBakQ7QUFBc0QsZUFBTyxFQUFFRCxPQUEvRDtBQUF3RSxnQkFBUSxFQUFFLEtBQUtHLGdCQUF2RjtBQUF5RyxhQUFLLEVBQUU7QUFBaEgsUUFGSixDQWJKLENBREosQ0FUSixDQURKLENBREo7QUFrQ0g7Ozs7RUE3SmtCb0MsZ0Q7O0FBZ0t2QkMsaURBQVEsQ0FBQ0MsTUFBVCxlQUFnQiw0REFBQyxRQUFELE9BQWhCLEVBQTZCQyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBN0IsRSIsImZpbGUiOiJ1c2VyX2Zvcm0uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcbiBcdFx0dmFyIGV4ZWN1dGVNb2R1bGVzID0gZGF0YVsyXTtcblxuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcblxuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0XHQvLyBhZGQgZW50cnkgbW9kdWxlcyBmcm9tIGxvYWRlZCBjaHVuayB0byBkZWZlcnJlZCBsaXN0XG4gXHRcdGRlZmVycmVkTW9kdWxlcy5wdXNoLmFwcGx5KGRlZmVycmVkTW9kdWxlcywgZXhlY3V0ZU1vZHVsZXMgfHwgW10pO1xuXG4gXHRcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gYWxsIGNodW5rcyByZWFkeVxuIFx0XHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiBcdH07XG4gXHRmdW5jdGlvbiBjaGVja0RlZmVycmVkTW9kdWxlcygpIHtcbiBcdFx0dmFyIHJlc3VsdDtcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlZmVycmVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBkZWZlcnJlZE1vZHVsZSA9IGRlZmVycmVkTW9kdWxlc1tpXTtcbiBcdFx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcbiBcdFx0XHRmb3IodmFyIGogPSAxOyBqIDwgZGVmZXJyZWRNb2R1bGUubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBkZXBJZCA9IGRlZmVycmVkTW9kdWxlW2pdO1xuIFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2RlcElkXSAhPT0gMCkgZnVsZmlsbGVkID0gZmFsc2U7XG4gXHRcdFx0fVxuIFx0XHRcdGlmKGZ1bGZpbGxlZCkge1xuIFx0XHRcdFx0ZGVmZXJyZWRNb2R1bGVzLnNwbGljZShpLS0sIDEpO1xuIFx0XHRcdFx0cmVzdWx0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBkZWZlcnJlZE1vZHVsZVswXSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0cmV0dXJuIHJlc3VsdDtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBDU1MgY2h1bmtzXG4gXHR2YXIgaW5zdGFsbGVkQ3NzQ2h1bmtzID0ge1xuIFx0XHRcInVzZXJfZm9ybVwiOiAwXG4gXHR9XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHQvLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbiBcdC8vIFByb21pc2UgPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHRcInVzZXJfZm9ybVwiOiAwXG4gXHR9O1xuXG4gXHR2YXIgZGVmZXJyZWRNb2R1bGVzID0gW107XG5cbiBcdC8vIHNjcmlwdCBwYXRoIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBqc29ucFNjcmlwdFNyYyhjaHVua0lkKSB7XG4gXHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgKHt9W2NodW5rSWRdfHxjaHVua0lkKSArIFwiLmpzXCJcbiBcdH1cblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG4gXHQvLyBUaGlzIGZpbGUgY29udGFpbnMgb25seSB0aGUgZW50cnkgY2h1bmsuXG4gXHQvLyBUaGUgY2h1bmsgbG9hZGluZyBmdW5jdGlvbiBmb3IgYWRkaXRpb25hbCBjaHVua3NcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZSA9IGZ1bmN0aW9uIHJlcXVpcmVFbnN1cmUoY2h1bmtJZCkge1xuIFx0XHR2YXIgcHJvbWlzZXMgPSBbXTtcblxuXG4gXHRcdC8vIG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIENTUyBsb2FkaW5nXG4gXHRcdHZhciBjc3NDaHVua3MgPSB7XCIwXCI6MX07XG4gXHRcdGlmKGluc3RhbGxlZENzc0NodW5rc1tjaHVua0lkXSkgcHJvbWlzZXMucHVzaChpbnN0YWxsZWRDc3NDaHVua3NbY2h1bmtJZF0pO1xuIFx0XHRlbHNlIGlmKGluc3RhbGxlZENzc0NodW5rc1tjaHVua0lkXSAhPT0gMCAmJiBjc3NDaHVua3NbY2h1bmtJZF0pIHtcbiBcdFx0XHRwcm9taXNlcy5wdXNoKGluc3RhbGxlZENzc0NodW5rc1tjaHVua0lkXSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdFx0dmFyIGhyZWYgPSBcIlwiICsgKHt9W2NodW5rSWRdfHxjaHVua0lkKSArIFwiLmNzc1wiO1xuIFx0XHRcdFx0dmFyIGZ1bGxocmVmID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgaHJlZjtcbiBcdFx0XHRcdHZhciBleGlzdGluZ0xpbmtUYWdzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJsaW5rXCIpO1xuIFx0XHRcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGV4aXN0aW5nTGlua1RhZ3MubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0dmFyIHRhZyA9IGV4aXN0aW5nTGlua1RhZ3NbaV07XG4gXHRcdFx0XHRcdHZhciBkYXRhSHJlZiA9IHRhZy5nZXRBdHRyaWJ1dGUoXCJkYXRhLWhyZWZcIikgfHwgdGFnLmdldEF0dHJpYnV0ZShcImhyZWZcIik7XG4gXHRcdFx0XHRcdGlmKHRhZy5yZWwgPT09IFwic3R5bGVzaGVldFwiICYmIChkYXRhSHJlZiA9PT0gaHJlZiB8fCBkYXRhSHJlZiA9PT0gZnVsbGhyZWYpKSByZXR1cm4gcmVzb2x2ZSgpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0dmFyIGV4aXN0aW5nU3R5bGVUYWdzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzdHlsZVwiKTtcbiBcdFx0XHRcdGZvcih2YXIgaSA9IDA7IGkgPCBleGlzdGluZ1N0eWxlVGFncy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHR2YXIgdGFnID0gZXhpc3RpbmdTdHlsZVRhZ3NbaV07XG4gXHRcdFx0XHRcdHZhciBkYXRhSHJlZiA9IHRhZy5nZXRBdHRyaWJ1dGUoXCJkYXRhLWhyZWZcIik7XG4gXHRcdFx0XHRcdGlmKGRhdGFIcmVmID09PSBocmVmIHx8IGRhdGFIcmVmID09PSBmdWxsaHJlZikgcmV0dXJuIHJlc29sdmUoKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdHZhciBsaW5rVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XG4gXHRcdFx0XHRsaW5rVGFnLnJlbCA9IFwic3R5bGVzaGVldFwiO1xuIFx0XHRcdFx0bGlua1RhZy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuIFx0XHRcdFx0bGlua1RhZy5vbmxvYWQgPSByZXNvbHZlO1xuIFx0XHRcdFx0bGlua1RhZy5vbmVycm9yID0gZnVuY3Rpb24oZXZlbnQpIHtcbiBcdFx0XHRcdFx0dmFyIHJlcXVlc3QgPSBldmVudCAmJiBldmVudC50YXJnZXQgJiYgZXZlbnQudGFyZ2V0LnNyYyB8fCBmdWxsaHJlZjtcbiBcdFx0XHRcdFx0dmFyIGVyciA9IG5ldyBFcnJvcihcIkxvYWRpbmcgQ1NTIGNodW5rIFwiICsgY2h1bmtJZCArIFwiIGZhaWxlZC5cXG4oXCIgKyByZXF1ZXN0ICsgXCIpXCIpO1xuIFx0XHRcdFx0XHRlcnIucmVxdWVzdCA9IHJlcXVlc3Q7XG4gXHRcdFx0XHRcdHJlamVjdChlcnIpO1xuIFx0XHRcdFx0fTtcbiBcdFx0XHRcdGxpbmtUYWcuaHJlZiA9IGZ1bGxocmVmO1xuIFx0XHRcdFx0dmFyIGhlYWQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF07XG4gXHRcdFx0XHRoZWFkLmFwcGVuZENoaWxkKGxpbmtUYWcpO1xuIFx0XHRcdH0pLnRoZW4oZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRpbnN0YWxsZWRDc3NDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHRcdH0pKTtcbiBcdFx0fVxuXG4gXHRcdC8vIEpTT05QIGNodW5rIGxvYWRpbmcgZm9yIGphdmFzY3JpcHRcblxuIFx0XHR2YXIgaW5zdGFsbGVkQ2h1bmtEYXRhID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEgIT09IDApIHsgLy8gMCBtZWFucyBcImFscmVhZHkgaW5zdGFsbGVkXCIuXG5cbiBcdFx0XHQvLyBhIFByb21pc2UgbWVhbnMgXCJjdXJyZW50bHkgbG9hZGluZ1wiLlxuIFx0XHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSkge1xuIFx0XHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDaHVua0RhdGFbMl0pO1xuIFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHQvLyBzZXR1cCBQcm9taXNlIGluIGNodW5rIGNhY2hlXG4gXHRcdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdFx0XHRpbnN0YWxsZWRDaHVua0RhdGEgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSBbcmVzb2x2ZSwgcmVqZWN0XTtcbiBcdFx0XHRcdH0pO1xuIFx0XHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDaHVua0RhdGFbMl0gPSBwcm9taXNlKTtcblxuIFx0XHRcdFx0Ly8gc3RhcnQgY2h1bmsgbG9hZGluZ1xuIFx0XHRcdFx0dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuIFx0XHRcdFx0dmFyIG9uU2NyaXB0Q29tcGxldGU7XG5cbiBcdFx0XHRcdHNjcmlwdC5jaGFyc2V0ID0gJ3V0Zi04JztcbiBcdFx0XHRcdHNjcmlwdC50aW1lb3V0ID0gMTIwO1xuIFx0XHRcdFx0aWYgKF9fd2VicGFja19yZXF1aXJlX18ubmMpIHtcbiBcdFx0XHRcdFx0c2NyaXB0LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIF9fd2VicGFja19yZXF1aXJlX18ubmMpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0c2NyaXB0LnNyYyA9IGpzb25wU2NyaXB0U3JjKGNodW5rSWQpO1xuXG4gXHRcdFx0XHQvLyBjcmVhdGUgZXJyb3IgYmVmb3JlIHN0YWNrIHVud291bmQgdG8gZ2V0IHVzZWZ1bCBzdGFja3RyYWNlIGxhdGVyXG4gXHRcdFx0XHR2YXIgZXJyb3IgPSBuZXcgRXJyb3IoKTtcbiBcdFx0XHRcdG9uU2NyaXB0Q29tcGxldGUgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiBcdFx0XHRcdFx0Ly8gYXZvaWQgbWVtIGxlYWtzIGluIElFLlxuIFx0XHRcdFx0XHRzY3JpcHQub25lcnJvciA9IHNjcmlwdC5vbmxvYWQgPSBudWxsO1xuIFx0XHRcdFx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG4gXHRcdFx0XHRcdHZhciBjaHVuayA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdFx0XHRcdFx0aWYoY2h1bmsgIT09IDApIHtcbiBcdFx0XHRcdFx0XHRpZihjaHVuaykge1xuIFx0XHRcdFx0XHRcdFx0dmFyIGVycm9yVHlwZSA9IGV2ZW50ICYmIChldmVudC50eXBlID09PSAnbG9hZCcgPyAnbWlzc2luZycgOiBldmVudC50eXBlKTtcbiBcdFx0XHRcdFx0XHRcdHZhciByZWFsU3JjID0gZXZlbnQgJiYgZXZlbnQudGFyZ2V0ICYmIGV2ZW50LnRhcmdldC5zcmM7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci5tZXNzYWdlID0gJ0xvYWRpbmcgY2h1bmsgJyArIGNodW5rSWQgKyAnIGZhaWxlZC5cXG4oJyArIGVycm9yVHlwZSArICc6ICcgKyByZWFsU3JjICsgJyknO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IubmFtZSA9ICdDaHVua0xvYWRFcnJvcic7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci50eXBlID0gZXJyb3JUeXBlO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IucmVxdWVzdCA9IHJlYWxTcmM7XG4gXHRcdFx0XHRcdFx0XHRjaHVua1sxXShlcnJvcik7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IHVuZGVmaW5lZDtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fTtcbiBcdFx0XHRcdHZhciB0aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpe1xuIFx0XHRcdFx0XHRvblNjcmlwdENvbXBsZXRlKHsgdHlwZTogJ3RpbWVvdXQnLCB0YXJnZXQ6IHNjcmlwdCB9KTtcbiBcdFx0XHRcdH0sIDEyMDAwMCk7XG4gXHRcdFx0XHRzY3JpcHQub25lcnJvciA9IHNjcmlwdC5vbmxvYWQgPSBvblNjcmlwdENvbXBsZXRlO1xuIFx0XHRcdFx0ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRyZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuIFx0fTtcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9hc3NldHMvXCI7XG5cbiBcdC8vIG9uIGVycm9yIGZ1bmN0aW9uIGZvciBhc3luYyBsb2FkaW5nXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm9lID0gZnVuY3Rpb24oZXJyKSB7IGNvbnNvbGUuZXJyb3IoZXJyKTsgdGhyb3cgZXJyOyB9O1xuXG4gXHR2YXIganNvbnBBcnJheSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSB8fCBbXTtcbiBcdHZhciBvbGRKc29ucEZ1bmN0aW9uID0ganNvbnBBcnJheS5wdXNoLmJpbmQoanNvbnBBcnJheSk7XG4gXHRqc29ucEFycmF5LnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjaztcbiBcdGpzb25wQXJyYXkgPSBqc29ucEFycmF5LnNsaWNlKCk7XG4gXHRmb3IodmFyIGkgPSAwOyBpIDwganNvbnBBcnJheS5sZW5ndGg7IGkrKykgd2VicGFja0pzb25wQ2FsbGJhY2soanNvbnBBcnJheVtpXSk7XG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IG9sZEpzb25wRnVuY3Rpb247XG5cblxuIFx0Ly8gYWRkIGVudHJ5IG1vZHVsZSB0byBkZWZlcnJlZCBsaXN0XG4gXHRkZWZlcnJlZE1vZHVsZXMucHVzaChbXCIuL2Fzc2V0cy9qcy9wYWdlcy91c2VyL2Zvcm0uanNcIixcInZlbmRvcnN+YWxlcnRzX2Zvcm1+YWxlcnRzX2xpc3R+Y29udGVudC1oZWFkZXJ+ZGFzaGJvYXJkLXBhZ2V+ZGFzaGJvYXJkX2Zvcm1+ZGFzaGJvYXJkX2xpc3R+ZGF0YWJhc2V+YWQ2YTI3N2JcIixcInZlbmRvcnN+YWxlcnRzX2Zvcm1+YWxlcnRzX2xpc3R+YXBwfmRhc2hib2FyZC1wYWdlfmRhc2hib2FyZF9mb3JtfmRhc2hib2FyZF9saXN0fmRhdGFiYXNlX2Zvcm1+ZGF0YWJ+N2RmNzZiN2JcIixcInZlbmRvcnN+YWxlcnRzX2Zvcm1+YWxlcnRzX2xpc3R+ZGFzaGJvYXJkLXBhZ2V+ZGFzaGJvYXJkX2Zvcm1+ZGFzaGJvYXJkX2xpc3R+ZGF0YWJhc2VfZm9ybX5kYXRhYmFzZV9+YTBjNWVkYzBcIixcImFsZXJ0c19mb3JtfmFsZXJ0c19saXN0fmRhc2hib2FyZC1wYWdlfmRhc2hib2FyZF9mb3JtfmRhc2hib2FyZF9saXN0fmRhdGFiYXNlX2Zvcm1+ZGF0YWJhc2VfdGFibGVzfmV+OTY3NTViNjRcIl0pO1xuIFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiByZWFkeVxuIFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4iLCJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IHtJbnB1dCwgQnV0dG9uLCBDaGVja2JveH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cyc7XG5pbXBvcnQge0FsZXJ0LCBVc2VyQWN0aW9uc30gZnJvbSAnLi4vLi4vYWN0aW9ucyc7XG5cbmNsYXNzIFVzZXJGb3JtIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGlkOiB3aW5kb3cudXNlciA/IHdpbmRvdy51c2VyIDogJycsXG4gICAgICAgICAgICBmaXJzdE5hbWU6ICcnLFxuICAgICAgICAgICAgbGFzdE5hbWU6ICcnLFxuICAgICAgICAgICAgZW1haWw6ICcnLFxuICAgICAgICAgICAgaXNBZG1pbjogZmFsc2VcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5vblRleHRDaGFuZ2UgPSB0aGlzLm9uVGV4dENoYW5nZS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLm9uQ2hlY2tib3hDaGFuZ2UgPSB0aGlzLm9uQ2hlY2tib3hDaGFuZ2UuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5vblN1Ym1pdCA9IHRoaXMub25TdWJtaXQuYmluZCh0aGlzKTtcbiAgICB9XG5cbiAgICBsb2FkVXNlcihpZCkge1xuICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBpc0xvYWRpbmc6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIFVzZXJBY3Rpb25zLmdldFVzZXIoaWQpXG4gICAgICAgICAgICAudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHtlcnJvciwgZGF0YX0gPSByZXM7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCB7Zmlyc3RfbmFtZSwgbGFzdF9uYW1lLCBlbWFpbCwgaXNfYWRtaW59ID0gZGF0YTtcblxuICAgICAgICAgICAgICAgIHRoYXQuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICBmaXJzdE5hbWU6IGZpcnN0X25hbWUsXG4gICAgICAgICAgICAgICAgICAgIGxhc3ROYW1lOiBsYXN0X25hbWUsXG4gICAgICAgICAgICAgICAgICAgIGVtYWlsLFxuICAgICAgICAgICAgICAgICAgICBpc0FkbWluOiBpc19hZG1pbiA9PSAxLFxuICAgICAgICAgICAgICAgICAgICBpc0xvYWRpbmc6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBmaXJzdE5hbWVFcnJvcjogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGxhc3ROYW1lRXJyb3I6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBlbWFpbEVycm9yOiBmYWxzZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIGNvbnN0IHtpZH0gPSB0aGlzLnN0YXRlO1xuICAgICAgICBpZiAoaWQpIHtcbiAgICAgICAgICAgIHRoaXMubG9hZFVzZXIoaWQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25UZXh0Q2hhbmdlKGUpIHtcbiAgICAgICAgY29uc3Qgc3RhdGUgPSB7fTtcbiAgICAgICAgc3RhdGVbZS50YXJnZXQubmFtZV0gPSBlLnRhcmdldC52YWx1ZTtcbiAgICAgICAgc3RhdGVbZS50YXJnZXQubmFtZSArICdFcnJvciddID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoc3RhdGUpO1xuICAgIH1cblxuICAgIG9uQ2hlY2tib3hDaGFuZ2UoZSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGlzQWRtaW46IGUudGFyZ2V0LmNoZWNrZWRcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25TdWJtaXQoKSB7XG4gICAgICAgIGxldCBoYXNFcnJvciA9IGZhbHNlO1xuICAgICAgICBsZXQge2lkLCBmaXJzdE5hbWUsIGxhc3ROYW1lLCBlbWFpbCwgaXNBZG1pbn0gPSB0aGlzLnN0YXRlO1xuICAgICAgICBmaXJzdE5hbWUgPSAkLnRyaW0oZmlyc3ROYW1lKTtcbiAgICAgICAgbGFzdE5hbWUgPSAkLnRyaW0obGFzdE5hbWUpO1xuICAgICAgICBlbWFpbCA9ICQudHJpbShlbWFpbCk7XG4gICAgICAgIGlmIChmaXJzdE5hbWUgPT09ICcnKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBmaXJzdE5hbWVFcnJvcjogdHJ1ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBoYXNFcnJvciA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobGFzdE5hbWUgPT09ICcnKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBsYXN0TmFtZUVycm9yOiB0cnVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGhhc0Vycm9yID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbWFpbCA9PT0gJycpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIGVtYWlsRXJyb3I6IHRydWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaGFzRXJyb3IgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFoYXNFcnJvcikge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgaXNMb2FkaW5nOiB0cnVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xuICAgICAgICAgICAgVXNlckFjdGlvbnMuY3JlYXRlT3JVcGRhdGUoaWQsIHtcbiAgICAgICAgICAgICAgICBmaXJzdF9uYW1lOiBmaXJzdE5hbWUsXG4gICAgICAgICAgICAgICAgbGFzdF9uYW1lOiBsYXN0TmFtZSxcbiAgICAgICAgICAgICAgICBlbWFpbCxcbiAgICAgICAgICAgICAgICBpc19hZG1pbjogaXNBZG1pbiA/IDEgOiAwXG4gICAgICAgICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qge2Vycm9yLCByZWRpcmVjdH0gPSByZXM7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAocmVkaXJlY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ25ld1VzZXInLCBKU09OLnN0cmluZ2lmeSh7ZW1haWx9KSk7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy91c2VyJztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBBbGVydC5zdWNjZXNzKCdVcGRhdGUgc3VjY2Vzc2Z1bCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoYXQuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICBpc0xvYWRpbmc6IGZhbHNlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3Qge2lkLCBmaXJzdE5hbWUsIGxhc3ROYW1lLCBlbWFpbCwgaXNBZG1pbiwgaXNMb2FkaW5nLCBmaXJzdE5hbWVFcnJvciwgbGFzdE5hbWVFcnJvciwgZW1haWxFcnJvcn0gPSB0aGlzLnN0YXRlO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInVzZXIgY29udGFpbmVyLWZsdWlkXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJjYXJkLXRpdGxlIGFsaWduLWl0ZW1zLWNlbnRlciBwLTJcIj57aWQgPT09ICcnID8gJ0NyZWF0ZSBuZXcgdXNlcicgOiAnVXBkYXRlIHVzZXInfTwvaDM+XG4gICAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIGNsYXNzTmFtZT1cImZsb2F0LWVuZFwiIGNvbG9yPXsnc3VjY2Vzcyd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5vblN1Ym1pdH0gaXNMb2FkaW5nPXtpc0xvYWRpbmd9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtpZCA9PT0gJycgPyAnQ3JlYXRlIHVzZXInIDogJ1VwZGF0ZSB1c2VyJ31cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxuXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtYm9keVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGZvcm0gcm9sZT1cImZvcm1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPkZpcnN0IG5hbWU8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8SW5wdXQgY2xhc3NOYW1lPXtmaXJzdE5hbWVFcnJvciA/ICdpcy1pbnZhbGlkJyA6ICcnfSByZXF1aXJlZD17dHJ1ZX0gbmFtZT17J2ZpcnN0TmFtZSd9IHBsYWNlaG9sZGVyPVwiRmlyc3QgbmFtZVwiIHZhbHVlPXtmaXJzdE5hbWV9IG9uQ2hhbmdlPXt0aGlzLm9uVGV4dENoYW5nZX0vPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWw+TGFzdCBuYW1lPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPElucHV0IGNsYXNzTmFtZT17bGFzdE5hbWVFcnJvciA/ICdpcy1pbnZhbGlkJyA6ICcnfSByZXF1aXJlZD17dHJ1ZX0gbmFtZT17J2xhc3ROYW1lJ30gcGxhY2Vob2xkZXI9XCJMYXN0IG5hbWVcIiB2YWx1ZT17bGFzdE5hbWV9IG9uQ2hhbmdlPXt0aGlzLm9uVGV4dENoYW5nZX0vPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWw+RW1haWw8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8SW5wdXQgY2xhc3NOYW1lPXtlbWFpbEVycm9yID8gJ2lzLWludmFsaWQnIDogJyd9IHJlcXVpcmVkPXt0cnVlfSB0eXBlPXsnZW1haWwnfSBuYW1lPXsnZW1haWwnfSBwbGFjZWhvbGRlcj1cIkVtYWlsXCIgdmFsdWU9e2VtYWlsfSBvbkNoYW5nZT17dGhpcy5vblRleHRDaGFuZ2V9Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPlJvbGU8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q2hlY2tib3ggaWQ9eydpc0FkbWluJ30gbmFtZT17J2lzQWRtaW4nfSB2YWx1ZT17JzEnfSBjaGVja2VkPXtpc0FkbWlufSBvbkNoYW5nZT17dGhpcy5vbkNoZWNrYm94Q2hhbmdlfSBsYWJlbD17J0lzIEFkbWluJ30gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblJlYWN0RE9NLnJlbmRlcig8VXNlckZvcm0vPiwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Jvb3QnKSk7XG4iXSwic291cmNlUm9vdCI6IiJ9