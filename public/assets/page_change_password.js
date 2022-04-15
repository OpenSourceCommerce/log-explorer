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
/******/ 		"page_change_password": 0
/******/ 	}
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"page_change_password": 0
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
/******/ 	deferredModules.push(["./assets/js/pages/user/change-password.js","vendors~alerts_form~alerts_list~content-header~dashboard-page~dashboard_form~dashboard_list~database~ad6a277b","vendors~alerts_form~alerts_list~app~dashboard-page~dashboard_form~dashboard_list~database_form~datab~7df76b7b","vendors~alerts_form~alerts_list~dashboard-page~dashboard_form~dashboard_list~database_form~database_~a0c5edc0","alerts_form~alerts_list~dashboard-page~dashboard_form~dashboard_list~database_form~database_tables~e~96755b64"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/js/pages/user/change-password.js":
/*!*************************************************!*\
  !*** ./assets/js/pages/user/change-password.js ***!
  \*************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.function.bind.js */ "./node_modules/core-js/modules/es.function.bind.js");
/* harmony import */ var core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.function.name.js */ "./node_modules/core-js/modules/es.function.name.js");
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.promise.js */ "./node_modules/core-js/modules/es.promise.js");
/* harmony import */ var core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_promise_finally_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.promise.finally.js */ "./node_modules/core-js/modules/es.promise.finally.js");
/* harmony import */ var core_js_modules_es_promise_finally_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise_finally_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.object.set-prototype-of.js */ "./node_modules/core-js/modules/es.object.set-prototype-of.js");
/* harmony import */ var core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.object.get-prototype-of.js */ "./node_modules/core-js/modules/es.object.get-prototype-of.js");
/* harmony import */ var core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.reflect.construct.js */ "./node_modules/core-js/modules/es.reflect.construct.js");
/* harmony import */ var core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.object.create.js */ "./node_modules/core-js/modules/es.object.create.js");
/* harmony import */ var core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.object.define-property.js */ "./node_modules/core-js/modules/es.object.define-property.js");
/* harmony import */ var core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/es.symbol.description.js */ "./node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ "./node_modules/core-js/modules/es.symbol.iterator.js");
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../components */ "./assets/js/components/index.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../actions */ "./assets/js/actions/index.js");
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






var ChangePasswordForm = /*#__PURE__*/function (_Component) {
  _inherits(ChangePasswordForm, _Component);

  var _super = _createSuper(ChangePasswordForm);

  function ChangePasswordForm(props) {
    var _this;

    _classCallCheck(this, ChangePasswordForm);

    _this = _super.call(this, props);
    _this.state = {
      current_password: '',
      password: '',
      confirm_password: ''
    };
    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_this));
    _this.onSubmit = _this.onSubmit.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ChangePasswordForm, [{
    key: "loadUser",
    value: function loadUser() {
      var that = this;
      this.setState({
        isLoading: true
      });
      _actions__WEBPACK_IMPORTED_MODULE_19__["UserActions"].getProfile().then(function (res) {
        var error = res.error,
            data = res.data;

        if (error) {
          return;
        }

        var first_name = data.first_name,
            last_name = data.last_name,
            email = data.email;
        that.setState({
          firstName: first_name,
          lastName: last_name,
          email: email,
          isLoading: false,
          firstNameError: false,
          lastNameError: false
        });
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      // This.loadUser();
      this.initValidator();
    }
  }, {
    key: "handleChange",
    value: function handleChange(e) {
      var state = {};
      state[e.target.name] = e.target.value;
      this.setState(state);
    }
  }, {
    key: "onSubmit",
    value: function onSubmit(e) {
      e.preventDefault();
      var hasError = false;
      var _this$state = this.state,
          current_password = _this$state.current_password,
          password = _this$state.password;

      if (!hasError) {
        this.setState({
          isLoading: true
        });
        var that = this;
        _actions__WEBPACK_IMPORTED_MODULE_19__["UserActions"].changePassword(current_password, password).then(function (res) {
          var error = res.error;

          if (error) {
            return;
          }

          _actions__WEBPACK_IMPORTED_MODULE_19__["Alert"].success('Update successful');
        })["finally"](function () {
          that.setState({
            isLoading: false,
            current_password: '',
            password: '',
            confirm_password: ''
          });
        });
      }
    }
  }, {
    key: "initValidator",
    value: function initValidator() {
      var rules = $.extend({}, this.getRules());
      var messages = $.extend({}, this.getMessages());
      _actions__WEBPACK_IMPORTED_MODULE_19__["ValidatorHelper"].init('#change-password', rules, messages);
    }
  }, {
    key: "getRules",
    value: function getRules() {
      return {
        current_password: {
          required: true,
          passwordCapitalCharacters: true,
          minlength: 8
        },
        password: {
          required: true,
          passwordCapitalCharacters: true,
          minlength: 8
        },
        confirm_password: {
          required: true,
          equalTo: '#password'
        }
      };
    }
  }, {
    key: "getMessages",
    value: function getMessages() {
      return {};
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state2 = this.state,
          isLoading = _this$state2.isLoading,
          current_password = _this$state2.current_password,
          password = _this$state2.password,
          confirm_password = _this$state2.confirm_password;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement("div", {
        className: "user container-fluid"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement("div", {
        className: "card"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement("div", {
        className: "card-header"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement("h3", {
        className: "card-title align-items-center p-2"
      }, "Change Password")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement("div", {
        className: "card-body"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement("form", {
        id: 'change-password',
        onSubmit: this.onSubmit
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement("label", null, "Current Password"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_18__["Input"], {
        type: 'password',
        required: true,
        name: 'current_password',
        id: 'current_password',
        value: current_password,
        placeholder: "Current Password",
        onChange: this.handleChange
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement("label", null, "New Password"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_18__["Input"], {
        type: 'password',
        required: true,
        name: 'password',
        id: 'password',
        value: password,
        placeholder: "Current Password",
        onChange: this.handleChange
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement("small", {
        className: "form-text text-muted"
      }, "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement("label", null, "Confirm New Password"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_18__["Input"], {
        type: 'password',
        name: 'confirm_password',
        id: 'confirm_password',
        value: confirm_password,
        placeholder: "Current Password",
        onChange: this.handleChange
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_18__["Button"], {
        type: 'submit',
        className: "float-end",
        color: 'success',
        isLoading: isLoading
      }, "Update")))));
    }
  }]);

  return ChangePasswordForm;
}(react__WEBPACK_IMPORTED_MODULE_16__["Component"]);

var root = document.querySelector('#root');
react_dom__WEBPACK_IMPORTED_MODULE_17___default.a.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement(ChangePasswordForm, root.dataset), root);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3BhZ2VzL3VzZXIvY2hhbmdlLXBhc3N3b3JkLmpzIl0sIm5hbWVzIjpbIkNoYW5nZVBhc3N3b3JkRm9ybSIsInByb3BzIiwic3RhdGUiLCJjdXJyZW50X3Bhc3N3b3JkIiwicGFzc3dvcmQiLCJjb25maXJtX3Bhc3N3b3JkIiwiaGFuZGxlQ2hhbmdlIiwiYmluZCIsIm9uU3VibWl0IiwidGhhdCIsInNldFN0YXRlIiwiaXNMb2FkaW5nIiwiVXNlckFjdGlvbnMiLCJnZXRQcm9maWxlIiwidGhlbiIsInJlcyIsImVycm9yIiwiZGF0YSIsImZpcnN0X25hbWUiLCJsYXN0X25hbWUiLCJlbWFpbCIsImZpcnN0TmFtZSIsImxhc3ROYW1lIiwiZmlyc3ROYW1lRXJyb3IiLCJsYXN0TmFtZUVycm9yIiwiaW5pdFZhbGlkYXRvciIsImUiLCJ0YXJnZXQiLCJuYW1lIiwidmFsdWUiLCJwcmV2ZW50RGVmYXVsdCIsImhhc0Vycm9yIiwiY2hhbmdlUGFzc3dvcmQiLCJBbGVydCIsInN1Y2Nlc3MiLCJydWxlcyIsIiQiLCJleHRlbmQiLCJnZXRSdWxlcyIsIm1lc3NhZ2VzIiwiZ2V0TWVzc2FnZXMiLCJWYWxpZGF0b3JIZWxwZXIiLCJpbml0IiwicmVxdWlyZWQiLCJwYXNzd29yZENhcGl0YWxDaGFyYWN0ZXJzIiwibWlubGVuZ3RoIiwiZXF1YWxUbyIsIkNvbXBvbmVudCIsInJvb3QiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJSZWFjdERPTSIsInJlbmRlciIsImRhdGFzZXQiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLFFBQVEsb0JBQW9CO1FBQzVCO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7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QUFqQixnSUFSSixDQVhKLGVBdUJJO0FBQUssaUJBQVMsRUFBQztBQUFmLHNCQUNJLGtHQURKLGVBRUksNERBQUMsa0RBQUQ7QUFBTyxZQUFJLEVBQUUsVUFBYjtBQUNJLFlBQUksRUFBRSxrQkFEVjtBQUVJLFVBQUUsRUFBRSxrQkFGUjtBQUdJLGFBQUssRUFBRUQsZ0JBSFg7QUFJSSxtQkFBVyxFQUFDLGtCQUpoQjtBQUtJLGdCQUFRLEVBQUUsS0FBS0M7QUFMbkIsUUFGSixDQXZCSixlQWdDSSw0REFBQyxtREFBRDtBQUFRLFlBQUksRUFBRSxRQUFkO0FBQXdCLGlCQUFTLEVBQUMsV0FBbEM7QUFBOEMsYUFBSyxFQUFFLFNBQXJEO0FBQ0ksaUJBQVMsRUFBRUs7QUFEZixrQkFoQ0osQ0FESixDQUpKLENBREosQ0FESjtBQWdESDs7OztFQTVKNEJvQyxnRDs7QUErSmpDLElBQU1DLElBQUksR0FBR0MsUUFBUSxDQUFDQyxhQUFULENBQXVCLE9BQXZCLENBQWI7QUFDQUMsaURBQVEsQ0FBQ0MsTUFBVCxlQUFnQiw0REFBQyxrQkFBRCxFQUF3QkosSUFBSSxDQUFDSyxPQUE3QixDQUFoQixFQUF5REwsSUFBekQsRSIsImZpbGUiOiJwYWdlX2NoYW5nZV9wYXNzd29yZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0ZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soZGF0YSkge1xuIFx0XHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuIFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuIFx0XHR2YXIgZXhlY3V0ZU1vZHVsZXMgPSBkYXRhWzJdO1xuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHRcdC8vIGFkZCBlbnRyeSBtb2R1bGVzIGZyb20gbG9hZGVkIGNodW5rIHRvIGRlZmVycmVkIGxpc3RcbiBcdFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2guYXBwbHkoZGVmZXJyZWRNb2R1bGVzLCBleGVjdXRlTW9kdWxlcyB8fCBbXSk7XG5cbiBcdFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiBhbGwgY2h1bmtzIHJlYWR5XG4gXHRcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIFx0fTtcbiBcdGZ1bmN0aW9uIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCkge1xuIFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGRlZmVycmVkTW9kdWxlID0gZGVmZXJyZWRNb2R1bGVzW2ldO1xuIFx0XHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuIFx0XHRcdGZvcih2YXIgaiA9IDE7IGogPCBkZWZlcnJlZE1vZHVsZS5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGRlcElkID0gZGVmZXJyZWRNb2R1bGVbal07XG4gXHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbZGVwSWRdICE9PSAwKSBmdWxmaWxsZWQgPSBmYWxzZTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYoZnVsZmlsbGVkKSB7XG4gXHRcdFx0XHRkZWZlcnJlZE1vZHVsZXMuc3BsaWNlKGktLSwgMSk7XG4gXHRcdFx0XHRyZXN1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IGRlZmVycmVkTW9kdWxlWzBdKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHRyZXR1cm4gcmVzdWx0O1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIENTUyBjaHVua3NcbiBcdHZhciBpbnN0YWxsZWRDc3NDaHVua3MgPSB7XG4gXHRcdFwicGFnZV9jaGFuZ2VfcGFzc3dvcmRcIjogMFxuIFx0fVxuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJwYWdlX2NoYW5nZV9wYXNzd29yZFwiOiAwXG4gXHR9O1xuXG4gXHR2YXIgZGVmZXJyZWRNb2R1bGVzID0gW107XG5cbiBcdC8vIHNjcmlwdCBwYXRoIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBqc29ucFNjcmlwdFNyYyhjaHVua0lkKSB7XG4gXHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgKHt9W2NodW5rSWRdfHxjaHVua0lkKSArIFwiLmpzXCJcbiBcdH1cblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG4gXHQvLyBUaGlzIGZpbGUgY29udGFpbnMgb25seSB0aGUgZW50cnkgY2h1bmsuXG4gXHQvLyBUaGUgY2h1bmsgbG9hZGluZyBmdW5jdGlvbiBmb3IgYWRkaXRpb25hbCBjaHVua3NcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZSA9IGZ1bmN0aW9uIHJlcXVpcmVFbnN1cmUoY2h1bmtJZCkge1xuIFx0XHR2YXIgcHJvbWlzZXMgPSBbXTtcblxuXG4gXHRcdC8vIG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIENTUyBsb2FkaW5nXG4gXHRcdHZhciBjc3NDaHVua3MgPSB7XCIwXCI6MX07XG4gXHRcdGlmKGluc3RhbGxlZENzc0NodW5rc1tjaHVua0lkXSkgcHJvbWlzZXMucHVzaChpbnN0YWxsZWRDc3NDaHVua3NbY2h1bmtJZF0pO1xuIFx0XHRlbHNlIGlmKGluc3RhbGxlZENzc0NodW5rc1tjaHVua0lkXSAhPT0gMCAmJiBjc3NDaHVua3NbY2h1bmtJZF0pIHtcbiBcdFx0XHRwcm9taXNlcy5wdXNoKGluc3RhbGxlZENzc0NodW5rc1tjaHVua0lkXSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdFx0dmFyIGhyZWYgPSBcIlwiICsgKHt9W2NodW5rSWRdfHxjaHVua0lkKSArIFwiLmNzc1wiO1xuIFx0XHRcdFx0dmFyIGZ1bGxocmVmID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgaHJlZjtcbiBcdFx0XHRcdHZhciBleGlzdGluZ0xpbmtUYWdzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJsaW5rXCIpO1xuIFx0XHRcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGV4aXN0aW5nTGlua1RhZ3MubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0dmFyIHRhZyA9IGV4aXN0aW5nTGlua1RhZ3NbaV07XG4gXHRcdFx0XHRcdHZhciBkYXRhSHJlZiA9IHRhZy5nZXRBdHRyaWJ1dGUoXCJkYXRhLWhyZWZcIikgfHwgdGFnLmdldEF0dHJpYnV0ZShcImhyZWZcIik7XG4gXHRcdFx0XHRcdGlmKHRhZy5yZWwgPT09IFwic3R5bGVzaGVldFwiICYmIChkYXRhSHJlZiA9PT0gaHJlZiB8fCBkYXRhSHJlZiA9PT0gZnVsbGhyZWYpKSByZXR1cm4gcmVzb2x2ZSgpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0dmFyIGV4aXN0aW5nU3R5bGVUYWdzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzdHlsZVwiKTtcbiBcdFx0XHRcdGZvcih2YXIgaSA9IDA7IGkgPCBleGlzdGluZ1N0eWxlVGFncy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHR2YXIgdGFnID0gZXhpc3RpbmdTdHlsZVRhZ3NbaV07XG4gXHRcdFx0XHRcdHZhciBkYXRhSHJlZiA9IHRhZy5nZXRBdHRyaWJ1dGUoXCJkYXRhLWhyZWZcIik7XG4gXHRcdFx0XHRcdGlmKGRhdGFIcmVmID09PSBocmVmIHx8IGRhdGFIcmVmID09PSBmdWxsaHJlZikgcmV0dXJuIHJlc29sdmUoKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdHZhciBsaW5rVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XG4gXHRcdFx0XHRsaW5rVGFnLnJlbCA9IFwic3R5bGVzaGVldFwiO1xuIFx0XHRcdFx0bGlua1RhZy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuIFx0XHRcdFx0bGlua1RhZy5vbmxvYWQgPSByZXNvbHZlO1xuIFx0XHRcdFx0bGlua1RhZy5vbmVycm9yID0gZnVuY3Rpb24oZXZlbnQpIHtcbiBcdFx0XHRcdFx0dmFyIHJlcXVlc3QgPSBldmVudCAmJiBldmVudC50YXJnZXQgJiYgZXZlbnQudGFyZ2V0LnNyYyB8fCBmdWxsaHJlZjtcbiBcdFx0XHRcdFx0dmFyIGVyciA9IG5ldyBFcnJvcihcIkxvYWRpbmcgQ1NTIGNodW5rIFwiICsgY2h1bmtJZCArIFwiIGZhaWxlZC5cXG4oXCIgKyByZXF1ZXN0ICsgXCIpXCIpO1xuIFx0XHRcdFx0XHRlcnIucmVxdWVzdCA9IHJlcXVlc3Q7XG4gXHRcdFx0XHRcdHJlamVjdChlcnIpO1xuIFx0XHRcdFx0fTtcbiBcdFx0XHRcdGxpbmtUYWcuaHJlZiA9IGZ1bGxocmVmO1xuIFx0XHRcdFx0dmFyIGhlYWQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF07XG4gXHRcdFx0XHRoZWFkLmFwcGVuZENoaWxkKGxpbmtUYWcpO1xuIFx0XHRcdH0pLnRoZW4oZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRpbnN0YWxsZWRDc3NDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHRcdH0pKTtcbiBcdFx0fVxuXG4gXHRcdC8vIEpTT05QIGNodW5rIGxvYWRpbmcgZm9yIGphdmFzY3JpcHRcblxuIFx0XHR2YXIgaW5zdGFsbGVkQ2h1bmtEYXRhID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEgIT09IDApIHsgLy8gMCBtZWFucyBcImFscmVhZHkgaW5zdGFsbGVkXCIuXG5cbiBcdFx0XHQvLyBhIFByb21pc2UgbWVhbnMgXCJjdXJyZW50bHkgbG9hZGluZ1wiLlxuIFx0XHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSkge1xuIFx0XHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDaHVua0RhdGFbMl0pO1xuIFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHQvLyBzZXR1cCBQcm9taXNlIGluIGNodW5rIGNhY2hlXG4gXHRcdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdFx0XHRpbnN0YWxsZWRDaHVua0RhdGEgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSBbcmVzb2x2ZSwgcmVqZWN0XTtcbiBcdFx0XHRcdH0pO1xuIFx0XHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDaHVua0RhdGFbMl0gPSBwcm9taXNlKTtcblxuIFx0XHRcdFx0Ly8gc3RhcnQgY2h1bmsgbG9hZGluZ1xuIFx0XHRcdFx0dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuIFx0XHRcdFx0dmFyIG9uU2NyaXB0Q29tcGxldGU7XG5cbiBcdFx0XHRcdHNjcmlwdC5jaGFyc2V0ID0gJ3V0Zi04JztcbiBcdFx0XHRcdHNjcmlwdC50aW1lb3V0ID0gMTIwO1xuIFx0XHRcdFx0aWYgKF9fd2VicGFja19yZXF1aXJlX18ubmMpIHtcbiBcdFx0XHRcdFx0c2NyaXB0LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIF9fd2VicGFja19yZXF1aXJlX18ubmMpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0c2NyaXB0LnNyYyA9IGpzb25wU2NyaXB0U3JjKGNodW5rSWQpO1xuXG4gXHRcdFx0XHQvLyBjcmVhdGUgZXJyb3IgYmVmb3JlIHN0YWNrIHVud291bmQgdG8gZ2V0IHVzZWZ1bCBzdGFja3RyYWNlIGxhdGVyXG4gXHRcdFx0XHR2YXIgZXJyb3IgPSBuZXcgRXJyb3IoKTtcbiBcdFx0XHRcdG9uU2NyaXB0Q29tcGxldGUgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiBcdFx0XHRcdFx0Ly8gYXZvaWQgbWVtIGxlYWtzIGluIElFLlxuIFx0XHRcdFx0XHRzY3JpcHQub25lcnJvciA9IHNjcmlwdC5vbmxvYWQgPSBudWxsO1xuIFx0XHRcdFx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG4gXHRcdFx0XHRcdHZhciBjaHVuayA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdFx0XHRcdFx0aWYoY2h1bmsgIT09IDApIHtcbiBcdFx0XHRcdFx0XHRpZihjaHVuaykge1xuIFx0XHRcdFx0XHRcdFx0dmFyIGVycm9yVHlwZSA9IGV2ZW50ICYmIChldmVudC50eXBlID09PSAnbG9hZCcgPyAnbWlzc2luZycgOiBldmVudC50eXBlKTtcbiBcdFx0XHRcdFx0XHRcdHZhciByZWFsU3JjID0gZXZlbnQgJiYgZXZlbnQudGFyZ2V0ICYmIGV2ZW50LnRhcmdldC5zcmM7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci5tZXNzYWdlID0gJ0xvYWRpbmcgY2h1bmsgJyArIGNodW5rSWQgKyAnIGZhaWxlZC5cXG4oJyArIGVycm9yVHlwZSArICc6ICcgKyByZWFsU3JjICsgJyknO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IubmFtZSA9ICdDaHVua0xvYWRFcnJvcic7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci50eXBlID0gZXJyb3JUeXBlO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IucmVxdWVzdCA9IHJlYWxTcmM7XG4gXHRcdFx0XHRcdFx0XHRjaHVua1sxXShlcnJvcik7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IHVuZGVmaW5lZDtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fTtcbiBcdFx0XHRcdHZhciB0aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpe1xuIFx0XHRcdFx0XHRvblNjcmlwdENvbXBsZXRlKHsgdHlwZTogJ3RpbWVvdXQnLCB0YXJnZXQ6IHNjcmlwdCB9KTtcbiBcdFx0XHRcdH0sIDEyMDAwMCk7XG4gXHRcdFx0XHRzY3JpcHQub25lcnJvciA9IHNjcmlwdC5vbmxvYWQgPSBvblNjcmlwdENvbXBsZXRlO1xuIFx0XHRcdFx0ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRyZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuIFx0fTtcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9hc3NldHMvXCI7XG5cbiBcdC8vIG9uIGVycm9yIGZ1bmN0aW9uIGZvciBhc3luYyBsb2FkaW5nXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm9lID0gZnVuY3Rpb24oZXJyKSB7IGNvbnNvbGUuZXJyb3IoZXJyKTsgdGhyb3cgZXJyOyB9O1xuXG4gXHR2YXIganNvbnBBcnJheSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSB8fCBbXTtcbiBcdHZhciBvbGRKc29ucEZ1bmN0aW9uID0ganNvbnBBcnJheS5wdXNoLmJpbmQoanNvbnBBcnJheSk7XG4gXHRqc29ucEFycmF5LnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjaztcbiBcdGpzb25wQXJyYXkgPSBqc29ucEFycmF5LnNsaWNlKCk7XG4gXHRmb3IodmFyIGkgPSAwOyBpIDwganNvbnBBcnJheS5sZW5ndGg7IGkrKykgd2VicGFja0pzb25wQ2FsbGJhY2soanNvbnBBcnJheVtpXSk7XG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IG9sZEpzb25wRnVuY3Rpb247XG5cblxuIFx0Ly8gYWRkIGVudHJ5IG1vZHVsZSB0byBkZWZlcnJlZCBsaXN0XG4gXHRkZWZlcnJlZE1vZHVsZXMucHVzaChbXCIuL2Fzc2V0cy9qcy9wYWdlcy91c2VyL2NoYW5nZS1wYXNzd29yZC5qc1wiLFwidmVuZG9yc35hbGVydHNfZm9ybX5hbGVydHNfbGlzdH5jb250ZW50LWhlYWRlcn5kYXNoYm9hcmQtcGFnZX5kYXNoYm9hcmRfZm9ybX5kYXNoYm9hcmRfbGlzdH5kYXRhYmFzZX5hZDZhMjc3YlwiLFwidmVuZG9yc35hbGVydHNfZm9ybX5hbGVydHNfbGlzdH5hcHB+ZGFzaGJvYXJkLXBhZ2V+ZGFzaGJvYXJkX2Zvcm1+ZGFzaGJvYXJkX2xpc3R+ZGF0YWJhc2VfZm9ybX5kYXRhYn43ZGY3NmI3YlwiLFwidmVuZG9yc35hbGVydHNfZm9ybX5hbGVydHNfbGlzdH5kYXNoYm9hcmQtcGFnZX5kYXNoYm9hcmRfZm9ybX5kYXNoYm9hcmRfbGlzdH5kYXRhYmFzZV9mb3JtfmRhdGFiYXNlX35hMGM1ZWRjMFwiLFwiYWxlcnRzX2Zvcm1+YWxlcnRzX2xpc3R+ZGFzaGJvYXJkLXBhZ2V+ZGFzaGJvYXJkX2Zvcm1+ZGFzaGJvYXJkX2xpc3R+ZGF0YWJhc2VfZm9ybX5kYXRhYmFzZV90YWJsZXN+ZX45Njc1NWI2NFwiXSk7XG4gXHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIHJlYWR5XG4gXHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiIsImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQge0lucHV0LCBCdXR0b24sIFRleHR9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMnO1xuaW1wb3J0IHtBbGVydCwgVXNlckFjdGlvbnMsIFZhbGlkYXRvckhlbHBlcn0gZnJvbSAnLi4vLi4vYWN0aW9ucyc7XG5cbmNsYXNzIENoYW5nZVBhc3N3b3JkRm9ybSBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBjdXJyZW50X3Bhc3N3b3JkOiAnJyxcbiAgICAgICAgICAgIHBhc3N3b3JkOiAnJyxcbiAgICAgICAgICAgIGNvbmZpcm1fcGFzc3dvcmQ6ICcnXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuaGFuZGxlQ2hhbmdlID0gdGhpcy5oYW5kbGVDaGFuZ2UuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5vblN1Ym1pdCA9IHRoaXMub25TdWJtaXQuYmluZCh0aGlzKTtcbiAgICB9XG5cbiAgICBsb2FkVXNlcigpIHtcbiAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgaXNMb2FkaW5nOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICBVc2VyQWN0aW9ucy5nZXRQcm9maWxlKCkudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgY29uc3Qge2Vycm9yLCBkYXRhfSA9IHJlcztcbiAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3Qge2ZpcnN0X25hbWUsIGxhc3RfbmFtZSwgZW1haWx9ID0gZGF0YTtcblxuICAgICAgICAgICAgdGhhdC5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgZmlyc3ROYW1lOiBmaXJzdF9uYW1lLFxuICAgICAgICAgICAgICAgIGxhc3ROYW1lOiBsYXN0X25hbWUsXG4gICAgICAgICAgICAgICAgZW1haWwsXG4gICAgICAgICAgICAgICAgaXNMb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBmaXJzdE5hbWVFcnJvcjogZmFsc2UsXG4gICAgICAgICAgICAgICAgbGFzdE5hbWVFcnJvcjogZmFsc2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgLy8gVGhpcy5sb2FkVXNlcigpO1xuICAgICAgICB0aGlzLmluaXRWYWxpZGF0b3IoKTtcbiAgICB9XG5cbiAgICBoYW5kbGVDaGFuZ2UoZSkge1xuICAgICAgICBjb25zdCBzdGF0ZSA9IHt9O1xuICAgICAgICBzdGF0ZVtlLnRhcmdldC5uYW1lXSA9IGUudGFyZ2V0LnZhbHVlO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHN0YXRlKTtcbiAgICB9XG5cbiAgICBvblN1Ym1pdChlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY29uc3QgaGFzRXJyb3IgPSBmYWxzZTtcbiAgICAgICAgY29uc3Qge2N1cnJlbnRfcGFzc3dvcmQsIHBhc3N3b3JkfSA9IHRoaXMuc3RhdGU7XG5cbiAgICAgICAgaWYgKCFoYXNFcnJvcikge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgaXNMb2FkaW5nOiB0cnVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xuICAgICAgICAgICAgVXNlckFjdGlvbnMuY2hhbmdlUGFzc3dvcmQoY3VycmVudF9wYXNzd29yZCwgcGFzc3dvcmQpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB7ZXJyb3J9ID0gcmVzO1xuICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgQWxlcnQuc3VjY2VzcygnVXBkYXRlIHN1Y2Nlc3NmdWwnKTtcbiAgICAgICAgICAgIH0pLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoYXQuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICBpc0xvYWRpbmc6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50X3Bhc3N3b3JkOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmQ6ICcnLFxuICAgICAgICAgICAgICAgICAgICBjb25maXJtX3Bhc3N3b3JkOiAnJ1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbml0VmFsaWRhdG9yKCkge1xuICAgICAgICBjb25zdCBydWxlcyA9ICQuZXh0ZW5kKHt9LCB0aGlzLmdldFJ1bGVzKCkpO1xuICAgICAgICBjb25zdCBtZXNzYWdlcyA9ICQuZXh0ZW5kKHt9LCB0aGlzLmdldE1lc3NhZ2VzKCkpO1xuICAgICAgICBWYWxpZGF0b3JIZWxwZXIuaW5pdCgnI2NoYW5nZS1wYXNzd29yZCcsIHJ1bGVzLCBtZXNzYWdlcyk7XG4gICAgfVxuXG4gICAgZ2V0UnVsZXMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjdXJyZW50X3Bhc3N3b3JkOiB7XG4gICAgICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgcGFzc3dvcmRDYXBpdGFsQ2hhcmFjdGVyczogdHJ1ZSxcbiAgICAgICAgICAgICAgICBtaW5sZW5ndGg6IDhcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwYXNzd29yZDoge1xuICAgICAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIHBhc3N3b3JkQ2FwaXRhbENoYXJhY3RlcnM6IHRydWUsXG4gICAgICAgICAgICAgICAgbWlubGVuZ3RoOiA4XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29uZmlybV9wYXNzd29yZDoge1xuICAgICAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIGVxdWFsVG86ICcjcGFzc3dvcmQnXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZ2V0TWVzc2FnZXMoKSB7XG4gICAgICAgIHJldHVybiB7fTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHtpc0xvYWRpbmcsIGN1cnJlbnRfcGFzc3dvcmQsIHBhc3N3b3JkLCBjb25maXJtX3Bhc3N3b3JkfSA9IHRoaXMuc3RhdGU7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidXNlciBjb250YWluZXItZmx1aWRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLWhlYWRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cImNhcmQtdGl0bGUgYWxpZ24taXRlbXMtY2VudGVyIHAtMlwiPkNoYW5nZSBQYXNzd29yZDwvaDM+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtYm9keVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGZvcm0gaWQ9eydjaGFuZ2UtcGFzc3dvcmQnfSBvblN1Ym1pdD17dGhpcy5vblN1Ym1pdH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD5DdXJyZW50IFBhc3N3b3JkPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPElucHV0IHR5cGU9eydwYXNzd29yZCd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1aXJlZD17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU9eydjdXJyZW50X3Bhc3N3b3JkJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkPXsnY3VycmVudF9wYXNzd29yZCd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17Y3VycmVudF9wYXNzd29yZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiQ3VycmVudCBQYXNzd29yZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2V9Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPk5ldyBQYXNzd29yZDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxJbnB1dCB0eXBlPXsncGFzc3dvcmQnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWQ9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lPXsncGFzc3dvcmQnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ9eydwYXNzd29yZCd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17cGFzc3dvcmR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkN1cnJlbnQgUGFzc3dvcmRcIiBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2V9Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNtYWxsIGNsYXNzTmFtZT1cImZvcm0tdGV4dCB0ZXh0LW11dGVkXCI+TWluaW11bSBlaWdodCBjaGFyYWN0ZXJzLCBhdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVhc3Qgb25lIHVwcGVyY2FzZSBsZXR0ZXIsIG9uZSBsb3dlcmNhc2UgbGV0dGVyLCBvbmUgbnVtYmVyIGFuZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25lIHNwZWNpYWwgY2hhcmFjdGVyLjwvc21hbGw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD5Db25maXJtIE5ldyBQYXNzd29yZDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxJbnB1dCB0eXBlPXsncGFzc3dvcmQnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZT17J2NvbmZpcm1fcGFzc3dvcmQnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ9eydjb25maXJtX3Bhc3N3b3JkJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtjb25maXJtX3Bhc3N3b3JkfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJDdXJyZW50IFBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZX0vPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b24gdHlwZT17J3N1Ym1pdCd9IGNsYXNzTmFtZT1cImZsb2F0LWVuZFwiIGNvbG9yPXsnc3VjY2Vzcyd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzTG9hZGluZz17aXNMb2FkaW5nfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVXBkYXRlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jb25zdCByb290ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Jvb3QnKTtcblJlYWN0RE9NLnJlbmRlcig8Q2hhbmdlUGFzc3dvcmRGb3JtIHsuLi5yb290LmRhdGFzZXR9Lz4sIHJvb3QpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==