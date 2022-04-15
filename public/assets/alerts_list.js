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
/******/ 		"alerts_list": 0
/******/ 	}
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"alerts_list": 0
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
/******/ 	deferredModules.push(["./assets/js/pages/alerts/list.js","vendors~alerts_form~alerts_list~content-header~dashboard-page~dashboard_form~dashboard_list~database~ad6a277b","vendors~alerts_form~alerts_list~app~dashboard-page~dashboard_form~dashboard_list~database_form~datab~7df76b7b","vendors~alerts_form~alerts_list~dashboard-page~dashboard_form~dashboard_list~database_form~database_~a0c5edc0","alerts_form~alerts_list~dashboard-page~dashboard_form~dashboard_list~database_form~database_tables~e~96755b64"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/js/pages/alerts/list.js":
/*!****************************************!*\
  !*** ./assets/js/pages/alerts/list.js ***!
  \****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.function.bind.js */ "./node_modules/core-js/modules/es.function.bind.js");
/* harmony import */ var core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.map.js */ "./node_modules/core-js/modules/es.array.map.js");
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.object.set-prototype-of.js */ "./node_modules/core-js/modules/es.object.set-prototype-of.js");
/* harmony import */ var core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.object.get-prototype-of.js */ "./node_modules/core-js/modules/es.object.get-prototype-of.js");
/* harmony import */ var core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.reflect.construct.js */ "./node_modules/core-js/modules/es.reflect.construct.js");
/* harmony import */ var core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.object.create.js */ "./node_modules/core-js/modules/es.object.create.js");
/* harmony import */ var core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.object.define-property.js */ "./node_modules/core-js/modules/es.object.define-property.js");
/* harmony import */ var core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.symbol.description.js */ "./node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ "./node_modules/core-js/modules/es.symbol.iterator.js");
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../components */ "./assets/js/components/index.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../actions */ "./assets/js/actions/index.js");
/* harmony import */ var _components_table__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../components/_table */ "./assets/js/components/_table.js");
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







var AlertList = /*#__PURE__*/function (_Component) {
  _inherits(AlertList, _Component);

  var _super = _createSuper(AlertList);

  function AlertList(props) {
    var _this;

    _classCallCheck(this, AlertList);

    _this = _super.call(this, props);
    _this.state = {
      data: [],
      deletingAlert: null
    };
    _this.getData = _this.getData.bind(_assertThisInitialized(_this));
    _this.updateStatus = _this.updateStatus.bind(_assertThisInitialized(_this));
    _this.deleteAlert = _this.deleteAlert.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(AlertList, [{
    key: "getData",
    value: function getData() {
      var _this2 = this;

      _actions__WEBPACK_IMPORTED_MODULE_17__["AlertActions"].listAlert().then(function (response) {
        var error = response.error,
            data = response.data;
        var deletingAlert = null;

        if (error === 0) {
          _this2.setState({
            data: data,
            deletingAlert: deletingAlert
          });
        }
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.getData();
    }
  }, {
    key: "deleteAlert",
    value: function deleteAlert() {
      var $this = this;
      var deletingAlert = this.state.deletingAlert;

      if (!deletingAlert) {
        return;
      }

      _actions__WEBPACK_IMPORTED_MODULE_17__["AlertActions"].deleteAlert(deletingAlert.id).then(function (res) {
        var error = res.error;

        if (error) {
          return;
        }

        $this.getData();
        _actions__WEBPACK_IMPORTED_MODULE_17__["Alert"].success('Delete successful');
      });
    }
  }, {
    key: "updateStatus",
    value: function updateStatus(event) {
      var $this = this;
      var id = event.target.dataset.id;
      _actions__WEBPACK_IMPORTED_MODULE_17__["AlertActions"].updateStatus(id).then(function () {
        $this.getData();
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$state = this.state,
          data = _this$state.data,
          deletingAlert = _this$state.deletingAlert;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_14___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_16__["Modal"], {
        size: _components__WEBPACK_IMPORTED_MODULE_16__["Size"].medium,
        id: 'delete-alert',
        title: "Deleting Alert",
        showCloseButton: true,
        closeButtonTitle: "Abort",
        showSaveButton: true,
        saveButtonTitle: "OK",
        saveButtonColor: "danger",
        saveButtonAction: this.deleteAlert,
        show: deletingAlert != null,
        onHidden: function onHidden() {
          _this3.setState({
            deletingAlert: null
          });
        }
      }, "Do you want to delete this alert \"", deletingAlert === null || deletingAlert === void 0 ? void 0 : deletingAlert.title, "\"?"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement("div", {
        className: "card"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_16__["CardHeader"], {
        title: "Alert List",
        showCollapseButton: false,
        showRemoveButton: false
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_16__["Link"], {
        href: '/alert/create',
        className: 'btn btn-success'
      }, "Create Alert")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement("div", {
        className: "card-body"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(_components_table__WEBPACK_IMPORTED_MODULE_18__["Table"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement("thead", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement("th", null, "Title"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement("th", null, "Table"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement("th", null, "Threshold"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement("th", null, "Interval"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement("th", null, "Is Active"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement("th", null, "\xA0"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement("tbody", null, data && data.map(function (item, key) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement("tr", {
          key: key
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement("td", null, item.title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement("td", null, item.from_table), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement("td", null, item.threshold), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement("td", null, item.interval_time), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement("a", {
          href: "#",
          onClick: _this3.updateStatus
        }, item.isActive === '1' ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_16__["Icon"], {
          className: "text-success",
          "data-id": item.id,
          name: "check-circle"
        }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_16__["Icon"], {
          className: "text-danger",
          "data-id": item.id,
          name: "times-circle"
        }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_16__["Link"], {
          href: "/alert/".concat(item.id),
          className: 'btn btn-success btn-sm me-2'
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_16__["Icon"], {
          name: 'edit'
        })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_16__["Link"], {
          onClick: _this3.updateStatus,
          className: "btn btn-sm me-2 ".concat(item.isActive === '1' ? 'btn-primary' : 'btn-warning'),
          "data-id": item.id
        }, item.isActive === '1' ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_16__["Icon"], {
          "data-id": item.id,
          name: "check-circle"
        }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_16__["Icon"], {
          "data-id": item.id,
          name: "times-circle"
        })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_16__["Button"], {
          onClick: function onClick(e) {
            return _this3.setState({
              deletingAlert: item
            });
          },
          className: "btn-sm",
          color: 'danger'
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_16__["Icon"], {
          name: 'trash'
        }))));
      }), data.length < 1 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement("td", {
        colSpan: 6
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement("p", null, "No Alert found"))))))));
    }
  }]);

  return AlertList;
}(react__WEBPACK_IMPORTED_MODULE_14__["Component"]);

react_dom__WEBPACK_IMPORTED_MODULE_15___default.a.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(AlertList, null), document.querySelector('#root'));

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3BhZ2VzL2FsZXJ0cy9saXN0LmpzIl0sIm5hbWVzIjpbIkFsZXJ0TGlzdCIsInByb3BzIiwic3RhdGUiLCJkYXRhIiwiZGVsZXRpbmdBbGVydCIsImdldERhdGEiLCJiaW5kIiwidXBkYXRlU3RhdHVzIiwiZGVsZXRlQWxlcnQiLCJBbGVydEFjdGlvbnMiLCJsaXN0QWxlcnQiLCJ0aGVuIiwicmVzcG9uc2UiLCJlcnJvciIsInNldFN0YXRlIiwiJHRoaXMiLCJpZCIsInJlcyIsIkFsZXJ0Iiwic3VjY2VzcyIsImV2ZW50IiwidGFyZ2V0IiwiZGF0YXNldCIsIlNpemUiLCJtZWRpdW0iLCJ0aXRsZSIsIm1hcCIsIml0ZW0iLCJrZXkiLCJmcm9tX3RhYmxlIiwidGhyZXNob2xkIiwiaW50ZXJ2YWxfdGltZSIsImlzQWN0aXZlIiwiZSIsImxlbmd0aCIsIkNvbXBvbmVudCIsIlJlYWN0RE9NIiwicmVuZGVyIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSxRQUFRLG9CQUFvQjtRQUM1QjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLGlCQUFpQiw0QkFBNEI7UUFDN0M7UUFDQTtRQUNBLGtCQUFrQiwyQkFBMkI7UUFDN0M7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBOztRQUVBO1FBQ0E7UUFDQSwwQ0FBMEM7UUFDMUM7O1FBRUE7UUFDQTs7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K0NDeEIsSUFBSSxDQUFDK0IsTUFBTCxHQUFjLENBQWQsaUJBQW1CLHFGQUNoQjtBQUFJLGVBQU8sRUFBRTtBQUFiLHNCQUNJLHdGQURKLENBRGdCLENBL0NwQixDQVhKLENBREosQ0FQSixDQWxCSixDQURKO0FBa0dIOzs7O0VBOUptQkMsZ0Q7O0FBaUt4QkMsaURBQVEsQ0FBQ0MsTUFBVCxlQUFnQiw0REFBQyxTQUFELE9BQWhCLEVBQThCQyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBOUIsRSIsImZpbGUiOiJhbGVydHNfbGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0ZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soZGF0YSkge1xuIFx0XHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuIFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuIFx0XHR2YXIgZXhlY3V0ZU1vZHVsZXMgPSBkYXRhWzJdO1xuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHRcdC8vIGFkZCBlbnRyeSBtb2R1bGVzIGZyb20gbG9hZGVkIGNodW5rIHRvIGRlZmVycmVkIGxpc3RcbiBcdFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2guYXBwbHkoZGVmZXJyZWRNb2R1bGVzLCBleGVjdXRlTW9kdWxlcyB8fCBbXSk7XG5cbiBcdFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiBhbGwgY2h1bmtzIHJlYWR5XG4gXHRcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIFx0fTtcbiBcdGZ1bmN0aW9uIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCkge1xuIFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGRlZmVycmVkTW9kdWxlID0gZGVmZXJyZWRNb2R1bGVzW2ldO1xuIFx0XHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuIFx0XHRcdGZvcih2YXIgaiA9IDE7IGogPCBkZWZlcnJlZE1vZHVsZS5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGRlcElkID0gZGVmZXJyZWRNb2R1bGVbal07XG4gXHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbZGVwSWRdICE9PSAwKSBmdWxmaWxsZWQgPSBmYWxzZTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYoZnVsZmlsbGVkKSB7XG4gXHRcdFx0XHRkZWZlcnJlZE1vZHVsZXMuc3BsaWNlKGktLSwgMSk7XG4gXHRcdFx0XHRyZXN1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IGRlZmVycmVkTW9kdWxlWzBdKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHRyZXR1cm4gcmVzdWx0O1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIENTUyBjaHVua3NcbiBcdHZhciBpbnN0YWxsZWRDc3NDaHVua3MgPSB7XG4gXHRcdFwiYWxlcnRzX2xpc3RcIjogMFxuIFx0fVxuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJhbGVydHNfbGlzdFwiOiAwXG4gXHR9O1xuXG4gXHR2YXIgZGVmZXJyZWRNb2R1bGVzID0gW107XG5cbiBcdC8vIHNjcmlwdCBwYXRoIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBqc29ucFNjcmlwdFNyYyhjaHVua0lkKSB7XG4gXHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgKHt9W2NodW5rSWRdfHxjaHVua0lkKSArIFwiLmpzXCJcbiBcdH1cblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG4gXHQvLyBUaGlzIGZpbGUgY29udGFpbnMgb25seSB0aGUgZW50cnkgY2h1bmsuXG4gXHQvLyBUaGUgY2h1bmsgbG9hZGluZyBmdW5jdGlvbiBmb3IgYWRkaXRpb25hbCBjaHVua3NcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZSA9IGZ1bmN0aW9uIHJlcXVpcmVFbnN1cmUoY2h1bmtJZCkge1xuIFx0XHR2YXIgcHJvbWlzZXMgPSBbXTtcblxuXG4gXHRcdC8vIG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIENTUyBsb2FkaW5nXG4gXHRcdHZhciBjc3NDaHVua3MgPSB7XCIwXCI6MX07XG4gXHRcdGlmKGluc3RhbGxlZENzc0NodW5rc1tjaHVua0lkXSkgcHJvbWlzZXMucHVzaChpbnN0YWxsZWRDc3NDaHVua3NbY2h1bmtJZF0pO1xuIFx0XHRlbHNlIGlmKGluc3RhbGxlZENzc0NodW5rc1tjaHVua0lkXSAhPT0gMCAmJiBjc3NDaHVua3NbY2h1bmtJZF0pIHtcbiBcdFx0XHRwcm9taXNlcy5wdXNoKGluc3RhbGxlZENzc0NodW5rc1tjaHVua0lkXSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdFx0dmFyIGhyZWYgPSBcIlwiICsgKHt9W2NodW5rSWRdfHxjaHVua0lkKSArIFwiLmNzc1wiO1xuIFx0XHRcdFx0dmFyIGZ1bGxocmVmID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgaHJlZjtcbiBcdFx0XHRcdHZhciBleGlzdGluZ0xpbmtUYWdzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJsaW5rXCIpO1xuIFx0XHRcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGV4aXN0aW5nTGlua1RhZ3MubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0dmFyIHRhZyA9IGV4aXN0aW5nTGlua1RhZ3NbaV07XG4gXHRcdFx0XHRcdHZhciBkYXRhSHJlZiA9IHRhZy5nZXRBdHRyaWJ1dGUoXCJkYXRhLWhyZWZcIikgfHwgdGFnLmdldEF0dHJpYnV0ZShcImhyZWZcIik7XG4gXHRcdFx0XHRcdGlmKHRhZy5yZWwgPT09IFwic3R5bGVzaGVldFwiICYmIChkYXRhSHJlZiA9PT0gaHJlZiB8fCBkYXRhSHJlZiA9PT0gZnVsbGhyZWYpKSByZXR1cm4gcmVzb2x2ZSgpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0dmFyIGV4aXN0aW5nU3R5bGVUYWdzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzdHlsZVwiKTtcbiBcdFx0XHRcdGZvcih2YXIgaSA9IDA7IGkgPCBleGlzdGluZ1N0eWxlVGFncy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHR2YXIgdGFnID0gZXhpc3RpbmdTdHlsZVRhZ3NbaV07XG4gXHRcdFx0XHRcdHZhciBkYXRhSHJlZiA9IHRhZy5nZXRBdHRyaWJ1dGUoXCJkYXRhLWhyZWZcIik7XG4gXHRcdFx0XHRcdGlmKGRhdGFIcmVmID09PSBocmVmIHx8IGRhdGFIcmVmID09PSBmdWxsaHJlZikgcmV0dXJuIHJlc29sdmUoKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdHZhciBsaW5rVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XG4gXHRcdFx0XHRsaW5rVGFnLnJlbCA9IFwic3R5bGVzaGVldFwiO1xuIFx0XHRcdFx0bGlua1RhZy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuIFx0XHRcdFx0bGlua1RhZy5vbmxvYWQgPSByZXNvbHZlO1xuIFx0XHRcdFx0bGlua1RhZy5vbmVycm9yID0gZnVuY3Rpb24oZXZlbnQpIHtcbiBcdFx0XHRcdFx0dmFyIHJlcXVlc3QgPSBldmVudCAmJiBldmVudC50YXJnZXQgJiYgZXZlbnQudGFyZ2V0LnNyYyB8fCBmdWxsaHJlZjtcbiBcdFx0XHRcdFx0dmFyIGVyciA9IG5ldyBFcnJvcihcIkxvYWRpbmcgQ1NTIGNodW5rIFwiICsgY2h1bmtJZCArIFwiIGZhaWxlZC5cXG4oXCIgKyByZXF1ZXN0ICsgXCIpXCIpO1xuIFx0XHRcdFx0XHRlcnIucmVxdWVzdCA9IHJlcXVlc3Q7XG4gXHRcdFx0XHRcdHJlamVjdChlcnIpO1xuIFx0XHRcdFx0fTtcbiBcdFx0XHRcdGxpbmtUYWcuaHJlZiA9IGZ1bGxocmVmO1xuIFx0XHRcdFx0dmFyIGhlYWQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF07XG4gXHRcdFx0XHRoZWFkLmFwcGVuZENoaWxkKGxpbmtUYWcpO1xuIFx0XHRcdH0pLnRoZW4oZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRpbnN0YWxsZWRDc3NDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHRcdH0pKTtcbiBcdFx0fVxuXG4gXHRcdC8vIEpTT05QIGNodW5rIGxvYWRpbmcgZm9yIGphdmFzY3JpcHRcblxuIFx0XHR2YXIgaW5zdGFsbGVkQ2h1bmtEYXRhID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEgIT09IDApIHsgLy8gMCBtZWFucyBcImFscmVhZHkgaW5zdGFsbGVkXCIuXG5cbiBcdFx0XHQvLyBhIFByb21pc2UgbWVhbnMgXCJjdXJyZW50bHkgbG9hZGluZ1wiLlxuIFx0XHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSkge1xuIFx0XHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDaHVua0RhdGFbMl0pO1xuIFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHQvLyBzZXR1cCBQcm9taXNlIGluIGNodW5rIGNhY2hlXG4gXHRcdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdFx0XHRpbnN0YWxsZWRDaHVua0RhdGEgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSBbcmVzb2x2ZSwgcmVqZWN0XTtcbiBcdFx0XHRcdH0pO1xuIFx0XHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDaHVua0RhdGFbMl0gPSBwcm9taXNlKTtcblxuIFx0XHRcdFx0Ly8gc3RhcnQgY2h1bmsgbG9hZGluZ1xuIFx0XHRcdFx0dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuIFx0XHRcdFx0dmFyIG9uU2NyaXB0Q29tcGxldGU7XG5cbiBcdFx0XHRcdHNjcmlwdC5jaGFyc2V0ID0gJ3V0Zi04JztcbiBcdFx0XHRcdHNjcmlwdC50aW1lb3V0ID0gMTIwO1xuIFx0XHRcdFx0aWYgKF9fd2VicGFja19yZXF1aXJlX18ubmMpIHtcbiBcdFx0XHRcdFx0c2NyaXB0LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIF9fd2VicGFja19yZXF1aXJlX18ubmMpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0c2NyaXB0LnNyYyA9IGpzb25wU2NyaXB0U3JjKGNodW5rSWQpO1xuXG4gXHRcdFx0XHQvLyBjcmVhdGUgZXJyb3IgYmVmb3JlIHN0YWNrIHVud291bmQgdG8gZ2V0IHVzZWZ1bCBzdGFja3RyYWNlIGxhdGVyXG4gXHRcdFx0XHR2YXIgZXJyb3IgPSBuZXcgRXJyb3IoKTtcbiBcdFx0XHRcdG9uU2NyaXB0Q29tcGxldGUgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiBcdFx0XHRcdFx0Ly8gYXZvaWQgbWVtIGxlYWtzIGluIElFLlxuIFx0XHRcdFx0XHRzY3JpcHQub25lcnJvciA9IHNjcmlwdC5vbmxvYWQgPSBudWxsO1xuIFx0XHRcdFx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG4gXHRcdFx0XHRcdHZhciBjaHVuayA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdFx0XHRcdFx0aWYoY2h1bmsgIT09IDApIHtcbiBcdFx0XHRcdFx0XHRpZihjaHVuaykge1xuIFx0XHRcdFx0XHRcdFx0dmFyIGVycm9yVHlwZSA9IGV2ZW50ICYmIChldmVudC50eXBlID09PSAnbG9hZCcgPyAnbWlzc2luZycgOiBldmVudC50eXBlKTtcbiBcdFx0XHRcdFx0XHRcdHZhciByZWFsU3JjID0gZXZlbnQgJiYgZXZlbnQudGFyZ2V0ICYmIGV2ZW50LnRhcmdldC5zcmM7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci5tZXNzYWdlID0gJ0xvYWRpbmcgY2h1bmsgJyArIGNodW5rSWQgKyAnIGZhaWxlZC5cXG4oJyArIGVycm9yVHlwZSArICc6ICcgKyByZWFsU3JjICsgJyknO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IubmFtZSA9ICdDaHVua0xvYWRFcnJvcic7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci50eXBlID0gZXJyb3JUeXBlO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IucmVxdWVzdCA9IHJlYWxTcmM7XG4gXHRcdFx0XHRcdFx0XHRjaHVua1sxXShlcnJvcik7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IHVuZGVmaW5lZDtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fTtcbiBcdFx0XHRcdHZhciB0aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpe1xuIFx0XHRcdFx0XHRvblNjcmlwdENvbXBsZXRlKHsgdHlwZTogJ3RpbWVvdXQnLCB0YXJnZXQ6IHNjcmlwdCB9KTtcbiBcdFx0XHRcdH0sIDEyMDAwMCk7XG4gXHRcdFx0XHRzY3JpcHQub25lcnJvciA9IHNjcmlwdC5vbmxvYWQgPSBvblNjcmlwdENvbXBsZXRlO1xuIFx0XHRcdFx0ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRyZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuIFx0fTtcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9hc3NldHMvXCI7XG5cbiBcdC8vIG9uIGVycm9yIGZ1bmN0aW9uIGZvciBhc3luYyBsb2FkaW5nXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm9lID0gZnVuY3Rpb24oZXJyKSB7IGNvbnNvbGUuZXJyb3IoZXJyKTsgdGhyb3cgZXJyOyB9O1xuXG4gXHR2YXIganNvbnBBcnJheSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSB8fCBbXTtcbiBcdHZhciBvbGRKc29ucEZ1bmN0aW9uID0ganNvbnBBcnJheS5wdXNoLmJpbmQoanNvbnBBcnJheSk7XG4gXHRqc29ucEFycmF5LnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjaztcbiBcdGpzb25wQXJyYXkgPSBqc29ucEFycmF5LnNsaWNlKCk7XG4gXHRmb3IodmFyIGkgPSAwOyBpIDwganNvbnBBcnJheS5sZW5ndGg7IGkrKykgd2VicGFja0pzb25wQ2FsbGJhY2soanNvbnBBcnJheVtpXSk7XG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IG9sZEpzb25wRnVuY3Rpb247XG5cblxuIFx0Ly8gYWRkIGVudHJ5IG1vZHVsZSB0byBkZWZlcnJlZCBsaXN0XG4gXHRkZWZlcnJlZE1vZHVsZXMucHVzaChbXCIuL2Fzc2V0cy9qcy9wYWdlcy9hbGVydHMvbGlzdC5qc1wiLFwidmVuZG9yc35hbGVydHNfZm9ybX5hbGVydHNfbGlzdH5jb250ZW50LWhlYWRlcn5kYXNoYm9hcmQtcGFnZX5kYXNoYm9hcmRfZm9ybX5kYXNoYm9hcmRfbGlzdH5kYXRhYmFzZX5hZDZhMjc3YlwiLFwidmVuZG9yc35hbGVydHNfZm9ybX5hbGVydHNfbGlzdH5hcHB+ZGFzaGJvYXJkLXBhZ2V+ZGFzaGJvYXJkX2Zvcm1+ZGFzaGJvYXJkX2xpc3R+ZGF0YWJhc2VfZm9ybX5kYXRhYn43ZGY3NmI3YlwiLFwidmVuZG9yc35hbGVydHNfZm9ybX5hbGVydHNfbGlzdH5kYXNoYm9hcmQtcGFnZX5kYXNoYm9hcmRfZm9ybX5kYXNoYm9hcmRfbGlzdH5kYXRhYmFzZV9mb3JtfmRhdGFiYXNlX35hMGM1ZWRjMFwiLFwiYWxlcnRzX2Zvcm1+YWxlcnRzX2xpc3R+ZGFzaGJvYXJkLXBhZ2V+ZGFzaGJvYXJkX2Zvcm1+ZGFzaGJvYXJkX2xpc3R+ZGF0YWJhc2VfZm9ybX5kYXRhYmFzZV90YWJsZXN+ZX45Njc1NWI2NFwiXSk7XG4gXHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIHJlYWR5XG4gXHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiIsImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUmVhY3RET00gZnJvbSBcInJlYWN0LWRvbVwiO1xuaW1wb3J0IHtCdXR0b24sIENhcmRIZWFkZXIsIEljb24sIExpbmssIE1vZGFsLCBTaXplfSBmcm9tIFwiLi4vLi4vY29tcG9uZW50c1wiO1xuaW1wb3J0IHtBbGVydCwgQWxlcnRBY3Rpb25zLCBHcmFwaEFjdGlvbnN9IGZyb20gXCIuLi8uLi9hY3Rpb25zXCI7XG5pbXBvcnQge1RhYmxlfSBmcm9tIFwiLi4vLi4vY29tcG9uZW50cy9fdGFibGVcIjtcblxuY2xhc3MgQWxlcnRMaXN0IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBkYXRhOiBbXSxcbiAgICAgICAgICAgIGRlbGV0aW5nQWxlcnQ6IG51bGwsXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5nZXREYXRhID0gdGhpcy5nZXREYXRhLmJpbmQodGhpcylcbiAgICAgICAgdGhpcy51cGRhdGVTdGF0dXMgPSB0aGlzLnVwZGF0ZVN0YXR1cy5iaW5kKHRoaXMpXG4gICAgICAgIHRoaXMuZGVsZXRlQWxlcnQgPSB0aGlzLmRlbGV0ZUFsZXJ0LmJpbmQodGhpcylcbiAgICB9XG5cbiAgICBnZXREYXRhKCkge1xuICAgICAgICBBbGVydEFjdGlvbnMubGlzdEFsZXJ0KCkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHtlcnJvciwgZGF0YX0gPSByZXNwb25zZVxuICAgICAgICAgICAgY29uc3QgZGVsZXRpbmdBbGVydCA9IG51bGxcblxuICAgICAgICAgICAgaWYgKGVycm9yID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZGF0YSwgZGVsZXRpbmdBbGVydH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMuZ2V0RGF0YSgpXG4gICAgfVxuXG4gICAgZGVsZXRlQWxlcnQoKSB7XG4gICAgICAgIGNvbnN0ICR0aGlzID0gdGhpcztcbiAgICAgICAgY29uc3Qge2RlbGV0aW5nQWxlcnR9ID0gdGhpcy5zdGF0ZTtcblxuICAgICAgICBpZiAoIWRlbGV0aW5nQWxlcnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIEFsZXJ0QWN0aW9ucy5kZWxldGVBbGVydChkZWxldGluZ0FsZXJ0LmlkKVxuICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB7ZXJyb3J9ID0gcmVzO1xuICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgJHRoaXMuZ2V0RGF0YSgpXG4gICAgICAgICAgICAgICAgQWxlcnQuc3VjY2VzcygnRGVsZXRlIHN1Y2Nlc3NmdWwnKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIHVwZGF0ZVN0YXR1cyhldmVudCkge1xuICAgICAgICBjb25zdCAkdGhpcyA9IHRoaXNcbiAgICAgICAgY29uc3Qge2lkfSA9IGV2ZW50LnRhcmdldC5kYXRhc2V0XG5cbiAgICAgICAgQWxlcnRBY3Rpb25zLnVwZGF0ZVN0YXR1cyhpZCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAkdGhpcy5nZXREYXRhKClcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHtkYXRhLCBkZWxldGluZ0FsZXJ0fSA9IHRoaXMuc3RhdGVcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICA8TW9kYWxcbiAgICAgICAgICAgICAgICAgICAgc2l6ZT17U2l6ZS5tZWRpdW19XG4gICAgICAgICAgICAgICAgICAgIGlkPXsnZGVsZXRlLWFsZXJ0J31cbiAgICAgICAgICAgICAgICAgICAgdGl0bGU9e2BEZWxldGluZyBBbGVydGB9XG4gICAgICAgICAgICAgICAgICAgIHNob3dDbG9zZUJ1dHRvbj17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgY2xvc2VCdXR0b25UaXRsZT0nQWJvcnQnXG4gICAgICAgICAgICAgICAgICAgIHNob3dTYXZlQnV0dG9uPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICBzYXZlQnV0dG9uVGl0bGU9J09LJ1xuICAgICAgICAgICAgICAgICAgICBzYXZlQnV0dG9uQ29sb3I9J2RhbmdlcidcbiAgICAgICAgICAgICAgICAgICAgc2F2ZUJ1dHRvbkFjdGlvbj17dGhpcy5kZWxldGVBbGVydH1cbiAgICAgICAgICAgICAgICAgICAgc2hvdz17ZGVsZXRpbmdBbGVydCAhPSBudWxsfVxuICAgICAgICAgICAgICAgICAgICBvbkhpZGRlbj17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZGVsZXRpbmdBbGVydDogbnVsbH0pXG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICBEbyB5b3Ugd2FudCB0byBkZWxldGUgdGhpcyBhbGVydCBcIntkZWxldGluZ0FsZXJ0Py50aXRsZX1cIj9cbiAgICAgICAgICAgICAgICA8L01vZGFsPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZFwiPlxuICAgICAgICAgICAgICAgICAgICA8Q2FyZEhlYWRlciB0aXRsZT1cIkFsZXJ0IExpc3RcIiBzaG93Q29sbGFwc2VCdXR0b249e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93UmVtb3ZlQnV0dG9uPXtmYWxzZX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8TGluayBocmVmPXsnL2FsZXJ0L2NyZWF0ZSd9IGNsYXNzTmFtZT17J2J0biBidG4tc3VjY2Vzcyd9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIENyZWF0ZSBBbGVydFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9MaW5rPlxuICAgICAgICAgICAgICAgICAgICA8L0NhcmRIZWFkZXI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1ib2R5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8VGFibGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPlRpdGxlPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPlRhYmxlPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPlRocmVzaG9sZDwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5JbnRlcnZhbDwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5JcyBBY3RpdmU8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+Jm5ic3A7PC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtkYXRhICYmIGRhdGEubWFwKChpdGVtLCBrZXkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ciBrZXk9e2tleX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPntpdGVtLnRpdGxlfTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPntpdGVtLmZyb21fdGFibGV9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+e2l0ZW0udGhyZXNob2xkfTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPntpdGVtLmludGVydmFsX3RpbWV9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9JyMnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMudXBkYXRlU3RhdHVzfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoaXRlbS5pc0FjdGl2ZSA9PT0gJzEnKSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxJY29uIGNsYXNzTmFtZT1cInRleHQtc3VjY2Vzc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEtaWQ9e2l0ZW0uaWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU9J2NoZWNrLWNpcmNsZScvPiA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxJY29uIGNsYXNzTmFtZT1cInRleHQtZGFuZ2VyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS1pZD17aXRlbS5pZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZT0ndGltZXMtY2lyY2xlJy8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPExpbmsgaHJlZj17YC9hbGVydC8ke2l0ZW0uaWR9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsnYnRuIGJ0bi1zdWNjZXNzIGJ0bi1zbSBtZS0yJ30+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8SWNvbiBuYW1lPXsnZWRpdCd9Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9MaW5rPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TGlua1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy51cGRhdGVTdGF0dXN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BidG4gYnRuLXNtIG1lLTIgJHsoaXRlbS5pc0FjdGl2ZSA9PT0gJzEnPyAnYnRuLXByaW1hcnknIDogJ2J0bi13YXJuaW5nJyl9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEtaWQ9e2l0ZW0uaWR9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyhpdGVtLmlzQWN0aXZlID09PSAnMScpID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8SWNvbiBkYXRhLWlkPXtpdGVtLmlkfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU9J2NoZWNrLWNpcmNsZScvPiA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEljb24gZGF0YS1pZD17aXRlbS5pZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lPSd0aW1lcy1jaXJjbGUnLz59XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17ZSA9PiB0aGlzLnNldFN0YXRlKHtkZWxldGluZ0FsZXJ0OiBpdGVtfSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJidG4tc21cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I9eydkYW5nZXInfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxJY29uIG5hbWU9eyd0cmFzaCd9Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ZGF0YS5sZW5ndGggPCAxICYmIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNvbFNwYW49ezZ9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTm8gQWxlcnQgZm91bmRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9UYWJsZT5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8Lz5cbiAgICAgICAgKVxuICAgIH1cbn1cblxuUmVhY3RET00ucmVuZGVyKDxBbGVydExpc3QvPiwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Jvb3QnKSk7XG5cbiJdLCJzb3VyY2VSb290IjoiIn0=