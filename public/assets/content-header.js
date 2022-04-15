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
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"content-header": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 	__webpack_require__.p = "/assets/";
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
/******/ 	deferredModules.push(["./assets/js/components/_content-header.js","vendors~alerts_form~alerts_list~content-header~dashboard-page~dashboard_form~dashboard_list~database~ad6a277b"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/js/components/_content-header.js":
/*!*************************************************!*\
  !*** ./assets/js/components/_content-header.js ***!
  \*************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_string_split_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.string.split.js */ "./node_modules/core-js/modules/es.string.split.js");
/* harmony import */ var core_js_modules_es_string_split_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_split_js__WEBPACK_IMPORTED_MODULE_1__);
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
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../utils */ "./assets/js/utils.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_16__);
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





var ContentHeader = /*#__PURE__*/function (_Component) {
  _inherits(ContentHeader, _Component);

  var _super = _createSuper(ContentHeader);

  function ContentHeader() {
    _classCallCheck(this, ContentHeader);

    return _super.apply(this, arguments);
  }

  _createClass(ContentHeader, [{
    key: "render",
    value: function render() {
      var splitUrl = window.location.pathname.split('/');
      var title = '';

      if (splitUrl[1] !== 'welcome') {
        title = _utils__WEBPACK_IMPORTED_MODULE_15__["PAGE_NAME"][splitUrl[1]] || _utils__WEBPACK_IMPORTED_MODULE_15__["PAGE_NAME"].dashboard;
      }

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement("div", {
        className: "content-header p-0 pt-1"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement("div", {
        className: "container-fluid d-none"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement("div", {
        className: "row mb-2"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement("div", {
        className: "col-sm-6"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement("h1", {
        className: "m-0 text-dark"
      }, title)))));
    }
  }]);

  return ContentHeader;
}(react__WEBPACK_IMPORTED_MODULE_14__["Component"]);

react_dom__WEBPACK_IMPORTED_MODULE_16___default.a.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(ContentHeader, null), document.querySelector('#content-header'));

/***/ }),

/***/ "./assets/js/utils.js":
/*!****************************!*\
  !*** ./assets/js/utils.js ***!
  \****************************/
/*! exports provided: PAGE_NAME, WIDGET_TYPE, setDataToCookies, getDataFromCookies, DATE_RANGE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PAGE_NAME", function() { return PAGE_NAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WIDGET_TYPE", function() { return WIDGET_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setDataToCookies", function() { return setDataToCookies; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDataFromCookies", function() { return getDataFromCookies; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DATE_RANGE", function() { return DATE_RANGE; });
/* harmony import */ var core_js_modules_es_date_to_string_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.date.to-string.js */ "./node_modules/core-js/modules/es.date.to-string.js");
/* harmony import */ var core_js_modules_es_date_to_string_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_date_to_string_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_string_split_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.string.split.js */ "./node_modules/core-js/modules/es.string.split.js");
/* harmony import */ var core_js_modules_es_string_split_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_split_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.for-each.js */ "./node_modules/core-js/modules/es.array.for-each.js");
/* harmony import */ var core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_string_trim_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.string.trim.js */ "./node_modules/core-js/modules/es.string.trim.js");
/* harmony import */ var core_js_modules_es_string_trim_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_trim_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_array_index_of_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.array.index-of.js */ "./node_modules/core-js/modules/es.array.index-of.js");
/* harmony import */ var core_js_modules_es_array_index_of_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_index_of_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.string.replace.js */ "./node_modules/core-js/modules/es.string.replace.js");
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_9__);










var PAGE_NAME = {
  dashboard: 'Dashboard',
  table: 'Table'
};
var WIDGET_TYPE = {
  doughnut: '4',
  pie: '2',
  counterSum: '1',
  table: '3',
  line: '5',
  bar: '6'
};
var setDataToCookies = function setDataToCookies(cName, cValue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cName + "=" + cValue + ";" + expires + ";path=/";
};
var getDataFromCookies = function getDataFromCookies(cName) {
  var name = "".concat(cName, "=");
  var cookieData = document.cookie.split(';');
  var data = null;
  cookieData.forEach(function (el) {
    var item = el.trim();

    if (item.indexOf(name) === 0) {
      data = item.replace(name, '');
    }
  });
  return data;
};
var DATE_RANGE = [{
  label: '1 hour',
  from: moment__WEBPACK_IMPORTED_MODULE_9___default()().subtract(1, 'hour'),
  to: moment__WEBPACK_IMPORTED_MODULE_9___default()(),
  fromValue: 60
}, {
  label: '12 hours',
  from: moment__WEBPACK_IMPORTED_MODULE_9___default()().subtract(12, 'hour'),
  to: moment__WEBPACK_IMPORTED_MODULE_9___default()(),
  fromValue: 720
}, {
  label: '1 day',
  from: moment__WEBPACK_IMPORTED_MODULE_9___default()().subtract(24, 'hour'),
  to: moment__WEBPACK_IMPORTED_MODULE_9___default()(),
  fromValue: 1440
}, {
  label: '7 days',
  from: moment__WEBPACK_IMPORTED_MODULE_9___default()().subtract(7, 'days'),
  to: moment__WEBPACK_IMPORTED_MODULE_9___default()(),
  fromValue: 10080
}, {
  label: 'Today',
  from: moment__WEBPACK_IMPORTED_MODULE_9___default()(),
  to: moment__WEBPACK_IMPORTED_MODULE_9___default()()
}, {
  label: 'Yesterday',
  from: moment__WEBPACK_IMPORTED_MODULE_9___default()().subtract(1, 'days'),
  to: moment__WEBPACK_IMPORTED_MODULE_9___default()().subtract(1, 'days')
}, {
  label: 'This Month',
  from: moment__WEBPACK_IMPORTED_MODULE_9___default()().startOf('month'),
  to: moment__WEBPACK_IMPORTED_MODULE_9___default()().endOf('month')
}, {
  label: 'Last Month',
  from: moment__WEBPACK_IMPORTED_MODULE_9___default()().subtract(1, 'month').startOf('month'),
  to: moment__WEBPACK_IMPORTED_MODULE_9___default()().subtract(1, 'month').endOf('month')
}];

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL2NvbXBvbmVudHMvX2NvbnRlbnQtaGVhZGVyLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy91dGlscy5qcyJdLCJuYW1lcyI6WyJDb250ZW50SGVhZGVyIiwic3BsaXRVcmwiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsInBhdGhuYW1lIiwic3BsaXQiLCJ0aXRsZSIsIlBBR0VfTkFNRSIsImRhc2hib2FyZCIsIkNvbXBvbmVudCIsIlJlYWN0RE9NIiwicmVuZGVyIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwidGFibGUiLCJXSURHRVRfVFlQRSIsImRvdWdobnV0IiwicGllIiwiY291bnRlclN1bSIsImxpbmUiLCJiYXIiLCJzZXREYXRhVG9Db29raWVzIiwiY05hbWUiLCJjVmFsdWUiLCJleGRheXMiLCJkIiwiRGF0ZSIsInNldFRpbWUiLCJnZXRUaW1lIiwiZXhwaXJlcyIsInRvVVRDU3RyaW5nIiwiY29va2llIiwiZ2V0RGF0YUZyb21Db29raWVzIiwibmFtZSIsImNvb2tpZURhdGEiLCJkYXRhIiwiZm9yRWFjaCIsImVsIiwiaXRlbSIsInRyaW0iLCJpbmRleE9mIiwicmVwbGFjZSIsIkRBVEVfUkFOR0UiLCJsYWJlbCIsImZyb20iLCJtb21lbnQiLCJzdWJ0cmFjdCIsInRvIiwiZnJvbVZhbHVlIiwic3RhcnRPZiIsImVuZE9mIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSxRQUFRLG9CQUFvQjtRQUM1QjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLGlCQUFpQiw0QkFBNEI7UUFDN0M7UUFDQTtRQUNBLGtCQUFrQiwyQkFBMkI7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Q0FSc0IsQ0FBbkIsQyIsImZpbGUiOiJjb250ZW50LWhlYWRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0ZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soZGF0YSkge1xuIFx0XHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuIFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuIFx0XHR2YXIgZXhlY3V0ZU1vZHVsZXMgPSBkYXRhWzJdO1xuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHRcdC8vIGFkZCBlbnRyeSBtb2R1bGVzIGZyb20gbG9hZGVkIGNodW5rIHRvIGRlZmVycmVkIGxpc3RcbiBcdFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2guYXBwbHkoZGVmZXJyZWRNb2R1bGVzLCBleGVjdXRlTW9kdWxlcyB8fCBbXSk7XG5cbiBcdFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiBhbGwgY2h1bmtzIHJlYWR5XG4gXHRcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIFx0fTtcbiBcdGZ1bmN0aW9uIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCkge1xuIFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGRlZmVycmVkTW9kdWxlID0gZGVmZXJyZWRNb2R1bGVzW2ldO1xuIFx0XHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuIFx0XHRcdGZvcih2YXIgaiA9IDE7IGogPCBkZWZlcnJlZE1vZHVsZS5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGRlcElkID0gZGVmZXJyZWRNb2R1bGVbal07XG4gXHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbZGVwSWRdICE9PSAwKSBmdWxmaWxsZWQgPSBmYWxzZTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYoZnVsZmlsbGVkKSB7XG4gXHRcdFx0XHRkZWZlcnJlZE1vZHVsZXMuc3BsaWNlKGktLSwgMSk7XG4gXHRcdFx0XHRyZXN1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IGRlZmVycmVkTW9kdWxlWzBdKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHRyZXR1cm4gcmVzdWx0O1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJjb250ZW50LWhlYWRlclwiOiAwXG4gXHR9O1xuXG4gXHR2YXIgZGVmZXJyZWRNb2R1bGVzID0gW107XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Fzc2V0cy9cIjtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIGFkZCBlbnRyeSBtb2R1bGUgdG8gZGVmZXJyZWQgbGlzdFxuIFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2goW1wiLi9hc3NldHMvanMvY29tcG9uZW50cy9fY29udGVudC1oZWFkZXIuanNcIixcInZlbmRvcnN+YWxlcnRzX2Zvcm1+YWxlcnRzX2xpc3R+Y29udGVudC1oZWFkZXJ+ZGFzaGJvYXJkLXBhZ2V+ZGFzaGJvYXJkX2Zvcm1+ZGFzaGJvYXJkX2xpc3R+ZGF0YWJhc2V+YWQ2YTI3N2JcIl0pO1xuIFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiByZWFkeVxuIFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4iLCJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7UEFHRV9OQU1FfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcblxuY2xhc3MgQ29udGVudEhlYWRlciBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCBzcGxpdFVybCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5zcGxpdCgnLycpO1xuXG4gICAgICAgIGxldCB0aXRsZSA9ICcnO1xuXG4gICAgICAgIGlmIChzcGxpdFVybFsxXSAhPT0gJ3dlbGNvbWUnKSB7XG4gICAgICAgICAgICB0aXRsZSA9IFBBR0VfTkFNRVtzcGxpdFVybFsxXV0gfHwgUEFHRV9OQU1FLmRhc2hib2FyZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnQtaGVhZGVyIHAtMCBwdC0xXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXItZmx1aWQgZC1ub25lXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93IG1iLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXNtLTZcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDEgY2xhc3NOYW1lPVwibS0wIHRleHQtZGFya1wiPnt0aXRsZX08L2gxPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblJlYWN0RE9NLnJlbmRlcig8Q29udGVudEhlYWRlci8+LCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY29udGVudC1oZWFkZXInKSk7XG4iLCJpbXBvcnQgbW9tZW50IGZyb20gXCJtb21lbnRcIjtcblxuZXhwb3J0IGNvbnN0IFBBR0VfTkFNRSA9IHtcbiAgICBkYXNoYm9hcmQ6ICdEYXNoYm9hcmQnLFxuICAgIHRhYmxlOiAnVGFibGUnXG59O1xuXG5leHBvcnQgY29uc3QgV0lER0VUX1RZUEUgPSB7XG4gICAgZG91Z2hudXQ6ICc0JyxcbiAgICBwaWU6ICcyJyxcbiAgICBjb3VudGVyU3VtOiAnMScsXG4gICAgdGFibGU6ICczJyxcbiAgICBsaW5lOiAnNScsXG4gICAgYmFyOiAnNicsXG59XG5cbmV4cG9ydCBjb25zdCBzZXREYXRhVG9Db29raWVzID0gKGNOYW1lLCBjVmFsdWUsIGV4ZGF5cykgPT4ge1xuICAgIGNvbnN0IGQgPSBuZXcgRGF0ZSgpO1xuICAgIGQuc2V0VGltZShkLmdldFRpbWUoKSArIChleGRheXMgKiAyNCAqIDYwICogNjAgKiAxMDAwKSk7XG4gICAgbGV0IGV4cGlyZXMgPSBcImV4cGlyZXM9XCIrZC50b1VUQ1N0cmluZygpO1xuICAgIGRvY3VtZW50LmNvb2tpZSA9IGNOYW1lICsgXCI9XCIgKyBjVmFsdWUgKyBcIjtcIiArIGV4cGlyZXMgKyBcIjtwYXRoPS9cIjtcbn1cblxuZXhwb3J0IGNvbnN0IGdldERhdGFGcm9tQ29va2llcyA9IChjTmFtZSkgPT4ge1xuICAgIGxldCBuYW1lID0gYCR7Y05hbWV9PWA7XG4gICAgbGV0IGNvb2tpZURhdGEgPSBkb2N1bWVudC5jb29raWUuc3BsaXQoJzsnKTtcbiAgICBsZXQgZGF0YSA9IG51bGw7XG4gICAgY29va2llRGF0YS5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgICBjb25zdCBpdGVtID0gZWwudHJpbSgpO1xuICAgICAgICBpZiAoaXRlbS5pbmRleE9mKG5hbWUpID09PSAwKSB7XG4gICAgICAgICAgICBkYXRhID0gaXRlbS5yZXBsYWNlKG5hbWUsICcnKTtcbiAgICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIGRhdGE7XG59XG5cbmV4cG9ydCBjb25zdCBEQVRFX1JBTkdFID0gW1xuICAgIHsgbGFiZWw6ICcxIGhvdXInLCBmcm9tOiBtb21lbnQoKS5zdWJ0cmFjdCgxLCAnaG91cicpLCB0bzogbW9tZW50KCksIGZyb21WYWx1ZTogNjB9LFxuICAgIHsgbGFiZWw6ICcxMiBob3VycycsIGZyb206IG1vbWVudCgpLnN1YnRyYWN0KDEyLCAnaG91cicpLCB0bzogbW9tZW50KCksIGZyb21WYWx1ZTogNzIwfSxcbiAgICB7IGxhYmVsOiAnMSBkYXknLCBmcm9tOiBtb21lbnQoKS5zdWJ0cmFjdCgyNCwgJ2hvdXInKSwgdG86IG1vbWVudCgpLCBmcm9tVmFsdWU6IDE0NDB9LFxuICAgIHsgbGFiZWw6ICc3IGRheXMnLCBmcm9tOiBtb21lbnQoKS5zdWJ0cmFjdCg3LCAnZGF5cycpLCB0bzogbW9tZW50KCksIGZyb21WYWx1ZTogMTAwODB9LFxuICAgIHsgbGFiZWw6ICdUb2RheScsIGZyb206IG1vbWVudCgpLCB0bzogbW9tZW50KCl9LFxuICAgIHsgbGFiZWw6ICdZZXN0ZXJkYXknLCBmcm9tOiBtb21lbnQoKS5zdWJ0cmFjdCgxLCAnZGF5cycpLCB0bzogbW9tZW50KCkuc3VidHJhY3QoMSwgJ2RheXMnKX0sXG4gICAgeyBsYWJlbDogJ1RoaXMgTW9udGgnLCBmcm9tOiBtb21lbnQoKS5zdGFydE9mKCdtb250aCcpLCB0bzogbW9tZW50KCkuZW5kT2YoJ21vbnRoJyl9LFxuICAgIHsgbGFiZWw6ICdMYXN0IE1vbnRoJywgZnJvbTptb21lbnQoKS5zdWJ0cmFjdCgxLCAnbW9udGgnKS5zdGFydE9mKCdtb250aCcpLCB0bzogbW9tZW50KCkuc3VidHJhY3QoMSwgJ21vbnRoJykuZW5kT2YoJ21vbnRoJyl9LFxuXVxuIl0sInNvdXJjZVJvb3QiOiIifQ==