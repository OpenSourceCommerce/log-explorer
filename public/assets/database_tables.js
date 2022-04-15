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
/******/ 		"database_tables": 0
/******/ 	}
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"database_tables": 0
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
/******/ 	deferredModules.push(["./assets/js/pages/database/tables.js","vendors~alerts_form~alerts_list~content-header~dashboard-page~dashboard_form~dashboard_list~database~ad6a277b","vendors~alerts_form~alerts_list~app~dashboard-page~dashboard_form~dashboard_list~database_form~datab~7df76b7b","vendors~alerts_form~alerts_list~dashboard-page~dashboard_form~dashboard_list~database_form~database_~a0c5edc0","alerts_form~alerts_list~dashboard-page~dashboard_form~dashboard_list~database_form~database_tables~e~96755b64"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/js/pages/database/tables.js":
/*!********************************************!*\
  !*** ./assets/js/pages/database/tables.js ***!
  \********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.function.bind.js */ "./node_modules/core-js/modules/es.function.bind.js");
/* harmony import */ var core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.map.js */ "./node_modules/core-js/modules/es.array.map.js");
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.function.name.js */ "./node_modules/core-js/modules/es.function.name.js");
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_2__);
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
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../components */ "./assets/js/components/index.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../actions */ "./assets/js/actions/index.js");
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






var DatabaseTables = /*#__PURE__*/function (_Component) {
  _inherits(DatabaseTables, _Component);

  var _super = _createSuper(DatabaseTables);

  function DatabaseTables(props) {
    var _this;

    _classCallCheck(this, DatabaseTables);

    _this = _super.call(this, props);
    _this.state = {
      tables: [],
      currentTable: '',
      columns: [],
      isLoading: false,
      showDeleteModal: false
    };
    _this.onTableChange = _this.onTableChange.bind(_assertThisInitialized(_this));
    _this.gotoUpdate = _this.gotoUpdate.bind(_assertThisInitialized(_this));
    _this.gotoLogView = _this.gotoLogView.bind(_assertThisInitialized(_this));
    _this.syncAll = _this.syncAll.bind(_assertThisInitialized(_this));
    _this.deleteTable = _this.deleteTable.bind(_assertThisInitialized(_this));
    _this.showDeleteConfirmationModal = _this.showDeleteConfirmationModal.bind(_assertThisInitialized(_this));
    _this.onDeleteConfirmationModalHidden = _this.onDeleteConfirmationModalHidden.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(DatabaseTables, [{
    key: "loadData",
    value: function loadData() {
      this.setState({
        isLoading: true
      });
      var that = this;
      _actions__WEBPACK_IMPORTED_MODULE_18__["DatabaseActions"].getAllTable().then(function (res) {
        var error = res.error,
            data = res.data;

        if (error) {
          return;
        }

        that.setState({
          tables: data,
          isLoading: false
        });
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.syncAll();
    }
  }, {
    key: "onTableChange",
    value: function onTableChange(e) {
      var that = this;
      this.setState({
        currentTable: e.target.value
      });

      if (e.target.value === '') {
        this.setState({
          columns: []
        });
      } else {
        this.setState({
          isLoading: true
        });
        _actions__WEBPACK_IMPORTED_MODULE_18__["DatabaseActions"].getTableColumns(e.target.value).then(function (res) {
          var error = res.error,
              table = res.table,
              data = res.data;

          if (error) {
            return;
          }

          that.setState({
            currentTable: table,
            columns: data,
            isLoading: false
          });
        });
      }
    }
  }, {
    key: "gotoUpdate",
    value: function gotoUpdate() {
      var currentTable = this.state.currentTable;

      if (currentTable !== '') {
        window.location.href = '/table/' + currentTable;
      }
    }
  }, {
    key: "gotoLogView",
    value: function gotoLogView() {
      var currentTable = this.state.currentTable;

      if (currentTable !== '') {
        window.location.href = '/table/' + currentTable + '/logview';
      }
    }
  }, {
    key: "syncAll",
    value: function syncAll() {
      var $this = this;
      _actions__WEBPACK_IMPORTED_MODULE_18__["DatabaseActions"].syncAll().then(function (response) {
        var error = response.error;

        if (error === 0) {
          $this.loadData();
        }
      });
    }
  }, {
    key: "showDeleteConfirmationModal",
    value: function showDeleteConfirmationModal() {
      var showDeleteModal = true;
      this.setState({
        showDeleteModal: showDeleteModal
      });
    }
  }, {
    key: "deleteTable",
    value: function deleteTable() {
      var that = this;
      var currentTable = this.state.currentTable;

      if (!currentTable) {
        return;
      }

      _actions__WEBPACK_IMPORTED_MODULE_18__["DatabaseActions"].deleteTable(currentTable).then(function (res) {
        var error = res.error;

        if (error !== 0) {
          return;
        }

        var columns = [];
        currentTable = '';
        _actions__WEBPACK_IMPORTED_MODULE_18__["Alert"].success('Remove successful');
        that.setState({
          currentTable: currentTable,
          columns: columns
        });
        that.onDeleteConfirmationModalHidden();
        that.syncAll();
      });
    }
  }, {
    key: "onDeleteConfirmationModalHidden",
    value: function onDeleteConfirmationModalHidden() {
      var showDeleteModal = false;
      this.setState({
        showDeleteModal: showDeleteModal
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          tables = _this$state.tables,
          currentTable = _this$state.currentTable,
          columns = _this$state.columns,
          isLoading = _this$state.isLoading,
          showDeleteModal = _this$state.showDeleteModal;
      var url = '';

      if (currentTable !== '') {
        url = '/table/' + currentTable;
      }

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement("div", {
        className: "database container-fluid"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_17__["Modal"], {
        size: _components__WEBPACK_IMPORTED_MODULE_17__["Size"].medium,
        id: 'delete-table',
        title: "Deleting table \"".concat(currentTable, "\""),
        showCloseButton: true,
        closeButtonTitle: "Abort",
        showSaveButton: true,
        saveButtonTitle: "OK",
        saveButtonColor: "danger",
        saveButtonAction: this.deleteTable,
        show: showDeleteModal,
        onHidden: this.onDeleteConfirmationModalHidden
      }, "Be careful - this will also delete the table in clickhouse database!"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement("div", {
        className: "card"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_17__["CardHeader"], {
        title: "Table view",
        showCollapseButton: false,
        showRemoveButton: false
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement("div", {
        className: "card-body"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement("div", {
        className: "row"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement("div", {
        className: "col-12 col-md-4"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement("select", {
        className: "form-control",
        value: currentTable,
        onChange: this.onTableChange
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement("option", {
        value: ""
      }, "Please select table"), tables.map(function (item, key) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement("option", {
          key: key,
          value: item
        }, item);
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement("div", {
        className: "col-12 col-md-8 d-flex mt-3 mt-md-0 justify-content-md-end flex-wrap ms-0 ms-md-auto"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_17__["Button"], {
        disabled: url === '',
        onClick: this.gotoUpdate,
        className: "btn btn-primary me-md-2 mb-2"
      }, "Update"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_17__["Button"], {
        disabled: url === '',
        onClick: this.gotoLogView,
        className: "btn btn-primary me-md-2 mb-2"
      }, "Log view setting"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_17__["Button"], {
        onClick: this.syncAll,
        className: 'btn btn-success me-md-2 mb-2'
      }, "Sync tables"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement("div", {
        className: "ms-auto ms-md-0"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_17__["Link"], {
        href: "/table/create",
        className: "btn btn-success me-2 text-nowrap"
      }, "Create table")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_17__["Button"], {
        disabled: url === '',
        onClick: this.showDeleteConfirmationModal,
        className: "btn btn-danger me-md-2 mb-2"
      }, "Delete"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement("div", {
        className: "row"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement("div", {
        className: "col-12 mt-3"
      }, isLoading ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_17__["Spinner"], null) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_17__["Table"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement("thead", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement("th", null, "Name"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement("th", null, "Type"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement("tbody", null, columns.map(function (item, key) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement("tr", {
          key: key
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement("td", null, item.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement("td", null, item.type));
      }))))))));
    }
  }]);

  return DatabaseTables;
}(react__WEBPACK_IMPORTED_MODULE_15__["Component"]);

react_dom__WEBPACK_IMPORTED_MODULE_16___default.a.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement(DatabaseTables, null), document.querySelector('#root'));

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3BhZ2VzL2RhdGFiYXNlL3RhYmxlcy5qcyJdLCJuYW1lcyI6WyJEYXRhYmFzZVRhYmxlcyIsInByb3BzIiwic3RhdGUiLCJ0YWJsZXMiLCJjdXJyZW50VGFibGUiLCJjb2x1bW5zIiwiaXNMb2FkaW5nIiwic2hvd0RlbGV0ZU1vZGFsIiwib25UYWJsZUNoYW5nZSIsImJpbmQiLCJnb3RvVXBkYXRlIiwiZ290b0xvZ1ZpZXciLCJzeW5jQWxsIiwiZGVsZXRlVGFibGUiLCJzaG93RGVsZXRlQ29uZmlybWF0aW9uTW9kYWwiLCJvbkRlbGV0ZUNvbmZpcm1hdGlvbk1vZGFsSGlkZGVuIiwic2V0U3RhdGUiLCJ0aGF0IiwiRGF0YWJhc2VBY3Rpb25zIiwiZ2V0QWxsVGFibGUiLCJ0aGVuIiwicmVzIiwiZXJyb3IiLCJkYXRhIiwiZSIsInRhcmdldCIsInZhbHVlIiwiZ2V0VGFibGVDb2x1bW5zIiwidGFibGUiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCIkdGhpcyIsInJlc3BvbnNlIiwibG9hZERhdGEiLCJBbGVydCIsInN1Y2Nlc3MiLCJ1cmwiLCJTaXplIiwibWVkaXVtIiwibWFwIiwiaXRlbSIsImtleSIsIm5hbWUiLCJ0eXBlIiwiQ29tcG9uZW50IiwiUmVhY3RET00iLCJyZW5kZXIiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLFFBQVEsb0JBQW9CO1FBQzVCO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsaUJBQWlCLDRCQUE0QjtRQUM3QztRQUNBO1FBQ0Esa0JBQWtCLDJCQUEyQjtR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QixPQUF2QixDQUFuQyxFIiwiZmlsZSI6ImRhdGFiYXNlX3RhYmxlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0ZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soZGF0YSkge1xuIFx0XHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuIFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuIFx0XHR2YXIgZXhlY3V0ZU1vZHVsZXMgPSBkYXRhWzJdO1xuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHRcdC8vIGFkZCBlbnRyeSBtb2R1bGVzIGZyb20gbG9hZGVkIGNodW5rIHRvIGRlZmVycmVkIGxpc3RcbiBcdFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2guYXBwbHkoZGVmZXJyZWRNb2R1bGVzLCBleGVjdXRlTW9kdWxlcyB8fCBbXSk7XG5cbiBcdFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiBhbGwgY2h1bmtzIHJlYWR5XG4gXHRcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIFx0fTtcbiBcdGZ1bmN0aW9uIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCkge1xuIFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGRlZmVycmVkTW9kdWxlID0gZGVmZXJyZWRNb2R1bGVzW2ldO1xuIFx0XHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuIFx0XHRcdGZvcih2YXIgaiA9IDE7IGogPCBkZWZlcnJlZE1vZHVsZS5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGRlcElkID0gZGVmZXJyZWRNb2R1bGVbal07XG4gXHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbZGVwSWRdICE9PSAwKSBmdWxmaWxsZWQgPSBmYWxzZTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYoZnVsZmlsbGVkKSB7XG4gXHRcdFx0XHRkZWZlcnJlZE1vZHVsZXMuc3BsaWNlKGktLSwgMSk7XG4gXHRcdFx0XHRyZXN1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IGRlZmVycmVkTW9kdWxlWzBdKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHRyZXR1cm4gcmVzdWx0O1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIENTUyBjaHVua3NcbiBcdHZhciBpbnN0YWxsZWRDc3NDaHVua3MgPSB7XG4gXHRcdFwiZGF0YWJhc2VfdGFibGVzXCI6IDBcbiBcdH1cblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuIFx0Ly8gUHJvbWlzZSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdFwiZGF0YWJhc2VfdGFibGVzXCI6IDBcbiBcdH07XG5cbiBcdHZhciBkZWZlcnJlZE1vZHVsZXMgPSBbXTtcblxuIFx0Ly8gc2NyaXB0IHBhdGggZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIGpzb25wU2NyaXB0U3JjKGNodW5rSWQpIHtcbiBcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyAoe31bY2h1bmtJZF18fGNodW5rSWQpICsgXCIuanNcIlxuIFx0fVxuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cbiBcdC8vIFRoaXMgZmlsZSBjb250YWlucyBvbmx5IHRoZSBlbnRyeSBjaHVuay5cbiBcdC8vIFRoZSBjaHVuayBsb2FkaW5nIGZ1bmN0aW9uIGZvciBhZGRpdGlvbmFsIGNodW5rc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5lID0gZnVuY3Rpb24gcmVxdWlyZUVuc3VyZShjaHVua0lkKSB7XG4gXHRcdHZhciBwcm9taXNlcyA9IFtdO1xuXG5cbiBcdFx0Ly8gbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4gQ1NTIGxvYWRpbmdcbiBcdFx0dmFyIGNzc0NodW5rcyA9IHtcIjBcIjoxfTtcbiBcdFx0aWYoaW5zdGFsbGVkQ3NzQ2h1bmtzW2NodW5rSWRdKSBwcm9taXNlcy5wdXNoKGluc3RhbGxlZENzc0NodW5rc1tjaHVua0lkXSk7XG4gXHRcdGVsc2UgaWYoaW5zdGFsbGVkQ3NzQ2h1bmtzW2NodW5rSWRdICE9PSAwICYmIGNzc0NodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ3NzQ2h1bmtzW2NodW5rSWRdID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0XHR2YXIgaHJlZiA9IFwiXCIgKyAoe31bY2h1bmtJZF18fGNodW5rSWQpICsgXCIuY3NzXCI7XG4gXHRcdFx0XHR2YXIgZnVsbGhyZWYgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBocmVmO1xuIFx0XHRcdFx0dmFyIGV4aXN0aW5nTGlua1RhZ3MgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImxpbmtcIik7XG4gXHRcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZXhpc3RpbmdMaW5rVGFncy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHR2YXIgdGFnID0gZXhpc3RpbmdMaW5rVGFnc1tpXTtcbiBcdFx0XHRcdFx0dmFyIGRhdGFIcmVmID0gdGFnLmdldEF0dHJpYnV0ZShcImRhdGEtaHJlZlwiKSB8fCB0YWcuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKTtcbiBcdFx0XHRcdFx0aWYodGFnLnJlbCA9PT0gXCJzdHlsZXNoZWV0XCIgJiYgKGRhdGFIcmVmID09PSBocmVmIHx8IGRhdGFIcmVmID09PSBmdWxsaHJlZikpIHJldHVybiByZXNvbHZlKCk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHR2YXIgZXhpc3RpbmdTdHlsZVRhZ3MgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInN0eWxlXCIpO1xuIFx0XHRcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGV4aXN0aW5nU3R5bGVUYWdzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdHZhciB0YWcgPSBleGlzdGluZ1N0eWxlVGFnc1tpXTtcbiBcdFx0XHRcdFx0dmFyIGRhdGFIcmVmID0gdGFnLmdldEF0dHJpYnV0ZShcImRhdGEtaHJlZlwiKTtcbiBcdFx0XHRcdFx0aWYoZGF0YUhyZWYgPT09IGhyZWYgfHwgZGF0YUhyZWYgPT09IGZ1bGxocmVmKSByZXR1cm4gcmVzb2x2ZSgpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0dmFyIGxpbmtUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcbiBcdFx0XHRcdGxpbmtUYWcucmVsID0gXCJzdHlsZXNoZWV0XCI7XG4gXHRcdFx0XHRsaW5rVGFnLnR5cGUgPSBcInRleHQvY3NzXCI7XG4gXHRcdFx0XHRsaW5rVGFnLm9ubG9hZCA9IHJlc29sdmU7XG4gXHRcdFx0XHRsaW5rVGFnLm9uZXJyb3IgPSBmdW5jdGlvbihldmVudCkge1xuIFx0XHRcdFx0XHR2YXIgcmVxdWVzdCA9IGV2ZW50ICYmIGV2ZW50LnRhcmdldCAmJiBldmVudC50YXJnZXQuc3JjIHx8IGZ1bGxocmVmO1xuIFx0XHRcdFx0XHR2YXIgZXJyID0gbmV3IEVycm9yKFwiTG9hZGluZyBDU1MgY2h1bmsgXCIgKyBjaHVua0lkICsgXCIgZmFpbGVkLlxcbihcIiArIHJlcXVlc3QgKyBcIilcIik7XG4gXHRcdFx0XHRcdGVyci5yZXF1ZXN0ID0gcmVxdWVzdDtcbiBcdFx0XHRcdFx0cmVqZWN0KGVycik7XG4gXHRcdFx0XHR9O1xuIFx0XHRcdFx0bGlua1RhZy5ocmVmID0gZnVsbGhyZWY7XG4gXHRcdFx0XHR2YXIgaGVhZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXTtcbiBcdFx0XHRcdGhlYWQuYXBwZW5kQ2hpbGQobGlua1RhZyk7XG4gXHRcdFx0fSkudGhlbihmdW5jdGlvbigpIHtcbiBcdFx0XHRcdGluc3RhbGxlZENzc0NodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdFx0fSkpO1xuIFx0XHR9XG5cbiBcdFx0Ly8gSlNPTlAgY2h1bmsgbG9hZGluZyBmb3IgamF2YXNjcmlwdFxuXG4gXHRcdHZhciBpbnN0YWxsZWRDaHVua0RhdGEgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSAhPT0gMCkgeyAvLyAwIG1lYW5zIFwiYWxyZWFkeSBpbnN0YWxsZWRcIi5cblxuIFx0XHRcdC8vIGEgUHJvbWlzZSBtZWFucyBcImN1cnJlbnRseSBsb2FkaW5nXCIuXG4gXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhKSB7XG4gXHRcdFx0XHRwcm9taXNlcy5wdXNoKGluc3RhbGxlZENodW5rRGF0YVsyXSk7XG4gXHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdC8vIHNldHVwIFByb21pc2UgaW4gY2h1bmsgY2FjaGVcbiBcdFx0XHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0XHRcdGluc3RhbGxlZENodW5rRGF0YSA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IFtyZXNvbHZlLCByZWplY3RdO1xuIFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRwcm9taXNlcy5wdXNoKGluc3RhbGxlZENodW5rRGF0YVsyXSA9IHByb21pc2UpO1xuXG4gXHRcdFx0XHQvLyBzdGFydCBjaHVuayBsb2FkaW5nXG4gXHRcdFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gXHRcdFx0XHR2YXIgb25TY3JpcHRDb21wbGV0ZTtcblxuIFx0XHRcdFx0c2NyaXB0LmNoYXJzZXQgPSAndXRmLTgnO1xuIFx0XHRcdFx0c2NyaXB0LnRpbWVvdXQgPSAxMjA7XG4gXHRcdFx0XHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5uYykge1xuIFx0XHRcdFx0XHRzY3JpcHQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgX193ZWJwYWNrX3JlcXVpcmVfXy5uYyk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRzY3JpcHQuc3JjID0ganNvbnBTY3JpcHRTcmMoY2h1bmtJZCk7XG5cbiBcdFx0XHRcdC8vIGNyZWF0ZSBlcnJvciBiZWZvcmUgc3RhY2sgdW53b3VuZCB0byBnZXQgdXNlZnVsIHN0YWNrdHJhY2UgbGF0ZXJcbiBcdFx0XHRcdHZhciBlcnJvciA9IG5ldyBFcnJvcigpO1xuIFx0XHRcdFx0b25TY3JpcHRDb21wbGV0ZSA9IGZ1bmN0aW9uIChldmVudCkge1xuIFx0XHRcdFx0XHQvLyBhdm9pZCBtZW0gbGVha3MgaW4gSUUuXG4gXHRcdFx0XHRcdHNjcmlwdC5vbmVycm9yID0gc2NyaXB0Lm9ubG9hZCA9IG51bGw7XG4gXHRcdFx0XHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiBcdFx0XHRcdFx0dmFyIGNodW5rID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0XHRcdFx0XHRpZihjaHVuayAhPT0gMCkge1xuIFx0XHRcdFx0XHRcdGlmKGNodW5rKSB7XG4gXHRcdFx0XHRcdFx0XHR2YXIgZXJyb3JUeXBlID0gZXZlbnQgJiYgKGV2ZW50LnR5cGUgPT09ICdsb2FkJyA/ICdtaXNzaW5nJyA6IGV2ZW50LnR5cGUpO1xuIFx0XHRcdFx0XHRcdFx0dmFyIHJlYWxTcmMgPSBldmVudCAmJiBldmVudC50YXJnZXQgJiYgZXZlbnQudGFyZ2V0LnNyYztcbiBcdFx0XHRcdFx0XHRcdGVycm9yLm1lc3NhZ2UgPSAnTG9hZGluZyBjaHVuayAnICsgY2h1bmtJZCArICcgZmFpbGVkLlxcbignICsgZXJyb3JUeXBlICsgJzogJyArIHJlYWxTcmMgKyAnKSc7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci5uYW1lID0gJ0NodW5rTG9hZEVycm9yJztcbiBcdFx0XHRcdFx0XHRcdGVycm9yLnR5cGUgPSBlcnJvclR5cGU7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci5yZXF1ZXN0ID0gcmVhbFNyYztcbiBcdFx0XHRcdFx0XHRcdGNodW5rWzFdKGVycm9yKTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gdW5kZWZpbmVkO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9O1xuIFx0XHRcdFx0dmFyIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gXHRcdFx0XHRcdG9uU2NyaXB0Q29tcGxldGUoeyB0eXBlOiAndGltZW91dCcsIHRhcmdldDogc2NyaXB0IH0pO1xuIFx0XHRcdFx0fSwgMTIwMDAwKTtcbiBcdFx0XHRcdHNjcmlwdC5vbmVycm9yID0gc2NyaXB0Lm9ubG9hZCA9IG9uU2NyaXB0Q29tcGxldGU7XG4gXHRcdFx0XHRkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gXHR9O1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Fzc2V0cy9cIjtcblxuIFx0Ly8gb24gZXJyb3IgZnVuY3Rpb24gZm9yIGFzeW5jIGxvYWRpbmdcbiBcdF9fd2VicGFja19yZXF1aXJlX18ub2UgPSBmdW5jdGlvbihlcnIpIHsgY29uc29sZS5lcnJvcihlcnIpOyB0aHJvdyBlcnI7IH07XG5cbiBcdHZhciBqc29ucEFycmF5ID0gd2luZG93W1wid2VicGFja0pzb25wXCJdID0gd2luZG93W1wid2VicGFja0pzb25wXCJdIHx8IFtdO1xuIFx0dmFyIG9sZEpzb25wRnVuY3Rpb24gPSBqc29ucEFycmF5LnB1c2guYmluZChqc29ucEFycmF5KTtcbiBcdGpzb25wQXJyYXkucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrO1xuIFx0anNvbnBBcnJheSA9IGpzb25wQXJyYXkuc2xpY2UoKTtcbiBcdGZvcih2YXIgaSA9IDA7IGkgPCBqc29ucEFycmF5Lmxlbmd0aDsgaSsrKSB3ZWJwYWNrSnNvbnBDYWxsYmFjayhqc29ucEFycmF5W2ldKTtcbiBcdHZhciBwYXJlbnRKc29ucEZ1bmN0aW9uID0gb2xkSnNvbnBGdW5jdGlvbjtcblxuXG4gXHQvLyBhZGQgZW50cnkgbW9kdWxlIHRvIGRlZmVycmVkIGxpc3RcbiBcdGRlZmVycmVkTW9kdWxlcy5wdXNoKFtcIi4vYXNzZXRzL2pzL3BhZ2VzL2RhdGFiYXNlL3RhYmxlcy5qc1wiLFwidmVuZG9yc35hbGVydHNfZm9ybX5hbGVydHNfbGlzdH5jb250ZW50LWhlYWRlcn5kYXNoYm9hcmQtcGFnZX5kYXNoYm9hcmRfZm9ybX5kYXNoYm9hcmRfbGlzdH5kYXRhYmFzZX5hZDZhMjc3YlwiLFwidmVuZG9yc35hbGVydHNfZm9ybX5hbGVydHNfbGlzdH5hcHB+ZGFzaGJvYXJkLXBhZ2V+ZGFzaGJvYXJkX2Zvcm1+ZGFzaGJvYXJkX2xpc3R+ZGF0YWJhc2VfZm9ybX5kYXRhYn43ZGY3NmI3YlwiLFwidmVuZG9yc35hbGVydHNfZm9ybX5hbGVydHNfbGlzdH5kYXNoYm9hcmQtcGFnZX5kYXNoYm9hcmRfZm9ybX5kYXNoYm9hcmRfbGlzdH5kYXRhYmFzZV9mb3JtfmRhdGFiYXNlX35hMGM1ZWRjMFwiLFwiYWxlcnRzX2Zvcm1+YWxlcnRzX2xpc3R+ZGFzaGJvYXJkLXBhZ2V+ZGFzaGJvYXJkX2Zvcm1+ZGFzaGJvYXJkX2xpc3R+ZGF0YWJhc2VfZm9ybX5kYXRhYmFzZV90YWJsZXN+ZX45Njc1NWI2NFwiXSk7XG4gXHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIHJlYWR5XG4gXHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiIsImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQge0NhcmRIZWFkZXIsIFRhYmxlLCBMaW5rLCBCdXR0b24sIFNwaW5uZXIsIFNpemUsIE1vZGFsfSBmcm9tICcuLi8uLi9jb21wb25lbnRzJztcbmltcG9ydCB7QWxlcnQsIERhdGFiYXNlQWN0aW9uc30gZnJvbSAnLi4vLi4vYWN0aW9ucyc7XG5cbmNsYXNzIERhdGFiYXNlVGFibGVzIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICB0YWJsZXM6IFtdLFxuICAgICAgICAgICAgY3VycmVudFRhYmxlOiAnJyxcbiAgICAgICAgICAgIGNvbHVtbnM6IFtdLFxuICAgICAgICAgICAgaXNMb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgICAgIHNob3dEZWxldGVNb2RhbDogZmFsc2UsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMub25UYWJsZUNoYW5nZSA9IHRoaXMub25UYWJsZUNoYW5nZS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmdvdG9VcGRhdGUgPSB0aGlzLmdvdG9VcGRhdGUuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5nb3RvTG9nVmlldyA9IHRoaXMuZ290b0xvZ1ZpZXcuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5zeW5jQWxsID0gdGhpcy5zeW5jQWxsLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuZGVsZXRlVGFibGUgPSB0aGlzLmRlbGV0ZVRhYmxlLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuc2hvd0RlbGV0ZUNvbmZpcm1hdGlvbk1vZGFsID0gdGhpcy5zaG93RGVsZXRlQ29uZmlybWF0aW9uTW9kYWwuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5vbkRlbGV0ZUNvbmZpcm1hdGlvbk1vZGFsSGlkZGVuID0gdGhpcy5vbkRlbGV0ZUNvbmZpcm1hdGlvbk1vZGFsSGlkZGVuLmJpbmQodGhpcyk7XG4gICAgfVxuXG4gICAgbG9hZERhdGEoKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgaXNMb2FkaW5nOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcbiAgICAgICAgRGF0YWJhc2VBY3Rpb25zLmdldEFsbFRhYmxlKClcbiAgICAgICAgICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qge2Vycm9yLCBkYXRhfSA9IHJlcztcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoYXQuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICB0YWJsZXM6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIGlzTG9hZGluZzogZmFsc2VcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLnN5bmNBbGwoKTtcbiAgICB9XG5cbiAgICBvblRhYmxlQ2hhbmdlKGUpIHtcbiAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgY3VycmVudFRhYmxlOiBlLnRhcmdldC52YWx1ZVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGUudGFyZ2V0LnZhbHVlID09PSAnJykge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgY29sdW1uczogW11cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgaXNMb2FkaW5nOiB0cnVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIERhdGFiYXNlQWN0aW9ucy5nZXRUYWJsZUNvbHVtbnMoZS50YXJnZXQudmFsdWUpXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qge2Vycm9yLCB0YWJsZSwgZGF0YX0gPSByZXM7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50VGFibGU6IHRhYmxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uczogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzTG9hZGluZzogZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnb3RvVXBkYXRlKCkge1xuICAgICAgICBjb25zdCB7Y3VycmVudFRhYmxlfSA9IHRoaXMuc3RhdGU7XG5cbiAgICAgICAgaWYgKGN1cnJlbnRUYWJsZSAhPT0gJycpIHtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy90YWJsZS8nICsgY3VycmVudFRhYmxlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ290b0xvZ1ZpZXcoKSB7XG4gICAgICAgIGNvbnN0IHtjdXJyZW50VGFibGV9ID0gdGhpcy5zdGF0ZTtcblxuICAgICAgICBpZiAoY3VycmVudFRhYmxlICE9PSAnJykge1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL3RhYmxlLycgKyBjdXJyZW50VGFibGUgKyAnL2xvZ3ZpZXcnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3luY0FsbCgpIHtcbiAgICAgICAgY29uc3QgJHRoaXMgPSB0aGlzO1xuICAgICAgICBEYXRhYmFzZUFjdGlvbnMuc3luY0FsbCgpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgY29uc3Qge2Vycm9yfSA9IHJlc3BvbnNlO1xuICAgICAgICAgICAgaWYgKGVycm9yID09PSAwKSB7XG4gICAgICAgICAgICAgICAgJHRoaXMubG9hZERhdGEoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzaG93RGVsZXRlQ29uZmlybWF0aW9uTW9kYWwoKSB7XG4gICAgICAgIGNvbnN0IHNob3dEZWxldGVNb2RhbCA9IHRydWU7XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c2hvd0RlbGV0ZU1vZGFsfSlcbiAgICB9XG5cbiAgICBkZWxldGVUYWJsZSgpIHtcbiAgICAgICAgY29uc3QgdGhhdCA9IHRoaXNcbiAgICAgICAgbGV0IHtjdXJyZW50VGFibGV9ID0gdGhpcy5zdGF0ZTtcblxuICAgICAgICBpZiAoIWN1cnJlbnRUYWJsZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgRGF0YWJhc2VBY3Rpb25zLmRlbGV0ZVRhYmxlKGN1cnJlbnRUYWJsZSlcbiAgICAgICAgICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qge2Vycm9yfSA9IHJlcztcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IgIT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IGNvbHVtbnMgPSBbXTtcbiAgICAgICAgICAgICAgICBjdXJyZW50VGFibGUgPSAnJztcblxuICAgICAgICAgICAgICAgIEFsZXJ0LnN1Y2Nlc3MoJ1JlbW92ZSBzdWNjZXNzZnVsJyk7XG4gICAgICAgICAgICAgICAgdGhhdC5zZXRTdGF0ZSh7Y3VycmVudFRhYmxlLCBjb2x1bW5zfSlcbiAgICAgICAgICAgICAgICB0aGF0Lm9uRGVsZXRlQ29uZmlybWF0aW9uTW9kYWxIaWRkZW4oKTtcbiAgICAgICAgICAgICAgICB0aGF0LnN5bmNBbGwoKTtcbiAgICAgICAgICAgIH0pXG4gICAgfVxuXG4gICAgb25EZWxldGVDb25maXJtYXRpb25Nb2RhbEhpZGRlbigpIHtcbiAgICAgICAgY29uc3Qgc2hvd0RlbGV0ZU1vZGFsID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c2hvd0RlbGV0ZU1vZGFsfSlcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHt0YWJsZXMsIGN1cnJlbnRUYWJsZSwgY29sdW1ucywgaXNMb2FkaW5nLCBzaG93RGVsZXRlTW9kYWx9ID0gdGhpcy5zdGF0ZTtcblxuICAgICAgICBsZXQgdXJsID0gJyc7XG4gICAgICAgIGlmIChjdXJyZW50VGFibGUgIT09ICcnKSB7XG4gICAgICAgICAgICB1cmwgPSAnL3RhYmxlLycgKyBjdXJyZW50VGFibGU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkYXRhYmFzZSBjb250YWluZXItZmx1aWRcIj5cbiAgICAgICAgICAgICAgICA8TW9kYWxcbiAgICAgICAgICAgICAgICAgICAgc2l6ZT17U2l6ZS5tZWRpdW19XG4gICAgICAgICAgICAgICAgICAgIGlkPXsnZGVsZXRlLXRhYmxlJ31cbiAgICAgICAgICAgICAgICAgICAgdGl0bGU9e2BEZWxldGluZyB0YWJsZSBcXFwiJHtjdXJyZW50VGFibGV9XFxcImB9XG4gICAgICAgICAgICAgICAgICAgIHNob3dDbG9zZUJ1dHRvbj17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgY2xvc2VCdXR0b25UaXRsZT0nQWJvcnQnXG4gICAgICAgICAgICAgICAgICAgIHNob3dTYXZlQnV0dG9uPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICBzYXZlQnV0dG9uVGl0bGU9J09LJ1xuICAgICAgICAgICAgICAgICAgICBzYXZlQnV0dG9uQ29sb3I9J2RhbmdlcidcbiAgICAgICAgICAgICAgICAgICAgc2F2ZUJ1dHRvbkFjdGlvbj17dGhpcy5kZWxldGVUYWJsZX1cbiAgICAgICAgICAgICAgICAgICAgc2hvdz17c2hvd0RlbGV0ZU1vZGFsfVxuICAgICAgICAgICAgICAgICAgICBvbkhpZGRlbj17dGhpcy5vbkRlbGV0ZUNvbmZpcm1hdGlvbk1vZGFsSGlkZGVufVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgQmUgY2FyZWZ1bCAtIHRoaXMgd2lsbCBhbHNvIGRlbGV0ZSB0aGUgdGFibGUgaW4gY2xpY2tob3VzZSBkYXRhYmFzZSFcbiAgICAgICAgICAgICAgICA8L01vZGFsPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZFwiPlxuICAgICAgICAgICAgICAgICAgICA8Q2FyZEhlYWRlciB0aXRsZT1cIlRhYmxlIHZpZXdcIiBzaG93Q29sbGFwc2VCdXR0b249e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93UmVtb3ZlQnV0dG9uPXtmYWxzZX0vPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtYm9keVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC0xMiBjb2wtbWQtNFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c2VsZWN0IGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIHZhbHVlPXtjdXJyZW50VGFibGV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25UYWJsZUNoYW5nZX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiXCI+UGxlYXNlIHNlbGVjdCB0YWJsZTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3RhYmxlcy5tYXAoKGl0ZW0sIGtleSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8b3B0aW9uIGtleT17a2V5fSB2YWx1ZT17aXRlbX0+e2l0ZW19PC9vcHRpb24+O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiY29sLTEyIGNvbC1tZC04IGQtZmxleCBtdC0zIG10LW1kLTAganVzdGlmeS1jb250ZW50LW1kLWVuZCBmbGV4LXdyYXAgbXMtMCBtcy1tZC1hdXRvXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b24gZGlzYWJsZWQ9e3VybCA9PT0gJyd9IG9uQ2xpY2s9e3RoaXMuZ290b1VwZGF0ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnkgbWUtbWQtMiBtYi0yXCI+VXBkYXRlPC9CdXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b24gZGlzYWJsZWQ9e3VybCA9PT0gJyd9IG9uQ2xpY2s9e3RoaXMuZ290b0xvZ1ZpZXd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5IG1lLW1kLTIgbWItMlwiPkxvZyB2aWV3XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5nPC9CdXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b24gb25DbGljaz17dGhpcy5zeW5jQWxsfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17J2J0biBidG4tc3VjY2VzcyBtZS1tZC0yIG1iLTInfT5TeW5jXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWJsZXM8L0J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtcy1hdXRvIG1zLW1kLTBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxMaW5rIGhyZWY9XCIvdGFibGUvY3JlYXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJ0biBidG4tc3VjY2VzcyBtZS0yIHRleHQtbm93cmFwXCI+Q3JlYXRlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFibGU8L0xpbms+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIGRpc2FibGVkPXt1cmwgPT09ICcnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuc2hvd0RlbGV0ZUNvbmZpcm1hdGlvbk1vZGFsfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJ0biBidG4tZGFuZ2VyIG1lLW1kLTIgbWItMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRGVsZXRlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTEyIG10LTNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2lzTG9hZGluZyA/ICg8U3Bpbm5lci8+KSA6IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUYWJsZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+TmFtZTwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5UeXBlPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtjb2x1bW5zLm1hcCgoaXRlbSwga2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8dHIga2V5PXtrZXl9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPntpdGVtLm5hbWV9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD57aXRlbS50eXBlfTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L1RhYmxlPil9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblJlYWN0RE9NLnJlbmRlcig8RGF0YWJhc2VUYWJsZXMvPiwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Jvb3QnKSk7XG4iXSwic291cmNlUm9vdCI6IiJ9