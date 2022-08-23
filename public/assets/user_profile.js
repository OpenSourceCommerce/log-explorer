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
/******/ 		"user_profile": 0
/******/ 	}
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"user_profile": 0
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
/******/ 	deferredModules.push(["./assets/js/pages/user/profile.js","vendors~alerts_list~app~dashboard-page~dashboard_empty~dashboard_form~export_list~flot_chart~graph_f~fed29054","vendors~alerts_list~dashboard-page~dashboard_empty~dashboard_form~export_list~flot_chart~graph_form~~fe102de6","alerts_list~dashboard-page~dashboard_empty~dashboard_form~export_list~flot_chart~graph_form~graph_li~f320c34b"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/images/chevron-right.svg":
/*!*****************************************!*\
  !*** ./assets/images/chevron-right.svg ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("/assets/images/chevron-right.be329556.svg");

/***/ }),

/***/ "./assets/js/pages/database/table-columns.js":
/*!***************************************************!*\
  !*** ./assets/js/pages/database/table-columns.js ***!
  \***************************************************/
/*! exports provided: TableColumn */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TableColumn", function() { return TableColumn; });
/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.symbol */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.symbol.description */ "./node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator */ "./node_modules/core-js/modules/es.symbol.iterator.js");
/* harmony import */ var core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.concat */ "./node_modules/core-js/modules/es.array.concat.js");
/* harmony import */ var core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.array.filter */ "./node_modules/core-js/modules/es.array.filter.js");
/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.array.find */ "./node_modules/core-js/modules/es.array.find.js");
/* harmony import */ var core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.array.for-each */ "./node_modules/core-js/modules/es.array.for-each.js");
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_array_from__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.array.from */ "./node_modules/core-js/modules/es.array.from.js");
/* harmony import */ var core_js_modules_es_array_from__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_from__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.array.index-of */ "./node_modules/core-js/modules/es.array.index-of.js");
/* harmony import */ var core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_array_is_array__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.array.is-array */ "./node_modules/core-js/modules/es.array.is-array.js");
/* harmony import */ var core_js_modules_es_array_is_array__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_is_array__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.array.iterator */ "./node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es_array_map__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/es.array.map */ "./node_modules/core-js/modules/es.array.map.js");
/* harmony import */ var core_js_modules_es_array_map__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_es_array_slice__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! core-js/modules/es.array.slice */ "./node_modules/core-js/modules/es.array.slice.js");
/* harmony import */ var core_js_modules_es_array_slice__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_slice__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var core_js_modules_es_date_to_string__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! core-js/modules/es.date.to-string */ "./node_modules/core-js/modules/es.date.to-string.js");
/* harmony import */ var core_js_modules_es_date_to_string__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_date_to_string__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! core-js/modules/es.function.name */ "./node_modules/core-js/modules/es.function.name.js");
/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var core_js_modules_es_object_define_properties__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! core-js/modules/es.object.define-properties */ "./node_modules/core-js/modules/es.object.define-properties.js");
/* harmony import */ var core_js_modules_es_object_define_properties__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_define_properties__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var core_js_modules_es_object_define_property__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! core-js/modules/es.object.define-property */ "./node_modules/core-js/modules/es.object.define-property.js");
/* harmony import */ var core_js_modules_es_object_define_property__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_define_property__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptor */ "./node_modules/core-js/modules/es.object.get-own-property-descriptor.js");
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptors */ "./node_modules/core-js/modules/es.object.get-own-property-descriptors.js");
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! core-js/modules/es.object.keys */ "./node_modules/core-js/modules/es.object.keys.js");
/* harmony import */ var core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! core-js/modules/es.regexp.to-string */ "./node_modules/core-js/modules/es.regexp.to-string.js");
/* harmony import */ var core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! core-js/modules/es.string.iterator */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_23__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_24___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_24__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_25___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_25__);
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ../../components */ "./assets/js/components/index.js");


























function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



var COLUMN_TYPE_LIST = window.clickhouseTypes;
var REGEX_SPECIAL_CHARACTERS = /[!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?]+/;
var DUPLICATE_FIELD_ERROR = "Duplicate column name error";
var SPECIAL_CHARACTERS_ERROR = "Column name should not contain special characters";
var BLANK_SPACE_ERROR = "Column name not contain blank space";

var TableDetailRow = function TableDetailRow(_ref) {
  var columns = _ref.columns,
      column = _ref.column,
      position = _ref.position,
      onFieldChange = _ref.onFieldChange,
      onFieldBlur = _ref.onFieldBlur,
      errorMessage = _ref.errorMessage,
      disabled = _ref.disabled,
      onRemoveColumnClicked = _ref.onRemoveColumnClicked;
  var name = column.name,
      type = column.type,
      isDisableEdit = column.isDisableEdit;
  var isDisableField = isDisableEdit || disabled;

  var onInputBlur = function onInputBlur(_ref2) {
    var name = _ref2.name,
        value = _ref2.value;
    var error = null;

    if (value) {
      var _columns$find;

      var valueIsExist = !!((_columns$find = columns.find(function (item, index) {
        return index !== position && item.name === value;
      })) === null || _columns$find === void 0 ? void 0 : _columns$find.name);
      var _errorMessage = "";

      if (valueIsExist) {
        _errorMessage = DUPLICATE_FIELD_ERROR;
      }

      if (value.indexOf(" ") >= 0) {
        _errorMessage = _errorMessage ? "".concat(_errorMessage, " and ").concat(BLANK_SPACE_ERROR) : BLANK_SPACE_ERROR;
      }

      if (REGEX_SPECIAL_CHARACTERS.test(value)) {
        _errorMessage = _errorMessage ? "".concat(_errorMessage, " and ").concat(SPECIAL_CHARACTERS_ERROR) : SPECIAL_CHARACTERS_ERROR;
      }

      if (_errorMessage) {
        error = {
          position: position,
          errorMessage: _errorMessage
        };
      }
    }

    onFieldBlur(position, error);
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_25___default.a.createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_25___default.a.createElement("td", {
    className: "ps-0",
    style: {
      width: "70%"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_25___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_26__["FormField"], {
    fieldName: "name",
    value: name,
    isHiddenLabel: true,
    disabled: isDisableField,
    errorMessage: errorMessage,
    onChange: function onChange(e) {
      return onFieldChange(position, e.target);
    },
    onBlur: function onBlur(e) {
      return onInputBlur(e.target);
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_25___default.a.createElement("td", {
    style: {
      width: "25%"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_25___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_26__["FormField"], {
    fieldName: "type",
    disabled: isDisableField,
    value: type,
    type: "select",
    isHiddenLabel: true,
    onChange: function onChange(e) {
      return onFieldChange(position, e.target);
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_25___default.a.createElement("option", {
    value: ""
  }, "Select type"), COLUMN_TYPE_LIST.map(function (item, key) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_25___default.a.createElement("option", {
      key: key,
      value: item
    }, item);
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_25___default.a.createElement("td", {
    className: "pe-0",
    style: {
      width: "5%"
    }
  }, !isDisableField && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_25___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_26__["Button"], {
    outlineColor: _components__WEBPACK_IMPORTED_MODULE_26__["Colors"].red,
    disabled: columns.length < 2,
    onClick: onRemoveColumnClicked
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_25___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_26__["Icon"], {
    dataFeather: "trash-2"
  }))));
};

var TableColumn = function TableColumn(_ref3) {
  var passedColumns = _ref3.columns,
      setColumnNameWillRemove = _ref3.setColumnNameWillRemove,
      isEnableSaveChangesModal = _ref3.isEnableSaveChangesModal,
      onFieldChange = _ref3.onFieldChange,
      onFieldBlur = _ref3.onFieldBlur,
      addNewColumn = _ref3.addNewColumn,
      errors = _ref3.errors;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_25__["useState"])([]),
      _useState2 = _slicedToArray(_useState, 2),
      columns = _useState2[0],
      setColumns = _useState2[1];

  Object(react__WEBPACK_IMPORTED_MODULE_25__["useEffect"])(function () {
    setColumns(passedColumns);
  }, [passedColumns]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_25___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_25___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_25___default.a.createElement("div", {
    className: "table-header d-flex justify-content-between mt-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_25___default.a.createElement("span", {
    className: "fw-bold"
  }, "Columns"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_25___default.a.createElement("button", {
    className: "btn btn-link text-primary",
    onClick: function onClick() {
      return addNewColumn();
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_25___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_26__["Icon"], {
    dataFeather: "plus",
    className: "me-2 feather-sm"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_25___default.a.createElement("span", {
    className: "d-inline-block align-middle fw-bold"
  }, "Add Column"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_25___default.a.createElement("table", {
    className: "table table-borderless"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_25___default.a.createElement("thead", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_25___default.a.createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_25___default.a.createElement("th", {
    className: "p-0 fw-medium border-0"
  }, "Name"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_25___default.a.createElement("th", {
    className: "p-0 fw-medium border-0"
  }, "Type"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_25___default.a.createElement("th", {
    className: "border-0"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_25___default.a.createElement("tbody", null, columns && columns.length > 0 ? columns.map(function (item, key) {
    var errorObj = errors.find(function (item) {
      return item.position === key;
    });
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_25___default.a.createElement(TableDetailRow, {
      columns: columns,
      errorMessage: errorObj === null || errorObj === void 0 ? void 0 : errorObj.errorMessage,
      column: item,
      key: key,
      position: key,
      disabled: isEnableSaveChangesModal,
      onFieldChange: onFieldChange,
      onFieldBlur: onFieldBlur,
      onRemoveColumnClicked: function onRemoveColumnClicked() {
        return setColumnNameWillRemove(_objectSpread(_objectSpread({}, item), {}, {
          position: key
        }));
      }
    });
  }) : null)));
};

/***/ }),

/***/ "./assets/js/pages/database/table-details.js":
/*!***************************************************!*\
  !*** ./assets/js/pages/database/table-details.js ***!
  \***************************************************/
/*! exports provided: DatabaseTableDetail */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DatabaseTableDetail", function() { return DatabaseTableDetail; });
/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.symbol */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.symbol.description */ "./node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator */ "./node_modules/core-js/modules/es.symbol.iterator.js");
/* harmony import */ var core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.concat */ "./node_modules/core-js/modules/es.array.concat.js");
/* harmony import */ var core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.array.filter */ "./node_modules/core-js/modules/es.array.filter.js");
/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_array_find_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.array.find-index */ "./node_modules/core-js/modules/es.array.find-index.js");
/* harmony import */ var core_js_modules_es_array_find_index__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_index__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.array.for-each */ "./node_modules/core-js/modules/es.array.for-each.js");
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_array_from__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.array.from */ "./node_modules/core-js/modules/es.array.from.js");
/* harmony import */ var core_js_modules_es_array_from__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_from__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_array_includes__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.array.includes */ "./node_modules/core-js/modules/es.array.includes.js");
/* harmony import */ var core_js_modules_es_array_includes__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_includes__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_array_is_array__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.array.is-array */ "./node_modules/core-js/modules/es.array.is-array.js");
/* harmony import */ var core_js_modules_es_array_is_array__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_is_array__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.array.iterator */ "./node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es_array_map__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/es.array.map */ "./node_modules/core-js/modules/es.array.map.js");
/* harmony import */ var core_js_modules_es_array_map__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_es_array_reduce__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! core-js/modules/es.array.reduce */ "./node_modules/core-js/modules/es.array.reduce.js");
/* harmony import */ var core_js_modules_es_array_reduce__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_reduce__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var core_js_modules_es_array_slice__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! core-js/modules/es.array.slice */ "./node_modules/core-js/modules/es.array.slice.js");
/* harmony import */ var core_js_modules_es_array_slice__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_slice__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var core_js_modules_es_array_splice__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! core-js/modules/es.array.splice */ "./node_modules/core-js/modules/es.array.splice.js");
/* harmony import */ var core_js_modules_es_array_splice__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_splice__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var core_js_modules_es_date_to_string__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! core-js/modules/es.date.to-string */ "./node_modules/core-js/modules/es.date.to-string.js");
/* harmony import */ var core_js_modules_es_date_to_string__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_date_to_string__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! core-js/modules/es.function.name */ "./node_modules/core-js/modules/es.function.name.js");
/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var core_js_modules_es_object_define_properties__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! core-js/modules/es.object.define-properties */ "./node_modules/core-js/modules/es.object.define-properties.js");
/* harmony import */ var core_js_modules_es_object_define_properties__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_define_properties__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var core_js_modules_es_object_define_property__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! core-js/modules/es.object.define-property */ "./node_modules/core-js/modules/es.object.define-property.js");
/* harmony import */ var core_js_modules_es_object_define_property__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_define_property__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptor */ "./node_modules/core-js/modules/es.object.get-own-property-descriptor.js");
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptors */ "./node_modules/core-js/modules/es.object.get-own-property-descriptors.js");
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! core-js/modules/es.object.keys */ "./node_modules/core-js/modules/es.object.keys.js");
/* harmony import */ var core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! core-js/modules/es.promise */ "./node_modules/core-js/modules/es.promise.js");
/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_23__);
/* harmony import */ var core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! core-js/modules/es.regexp.to-string */ "./node_modules/core-js/modules/es.regexp.to-string.js");
/* harmony import */ var core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_24___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_24__);
/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! core-js/modules/es.string.iterator */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_25___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_25__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_26___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_26__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_27___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_27__);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! regenerator-runtime/runtime */ "./node_modules/regenerator-runtime/runtime.js");
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_28___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_28__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_29___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_29__);
/* harmony import */ var _components___WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ../../components/ */ "./assets/js/components/index.js");
/* harmony import */ var lodash_isEqual__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! lodash/isEqual */ "./node_modules/lodash/isEqual.js");
/* harmony import */ var lodash_isEqual__WEBPACK_IMPORTED_MODULE_31___default = /*#__PURE__*/__webpack_require__.n(lodash_isEqual__WEBPACK_IMPORTED_MODULE_31__);
/* harmony import */ var _actions_database_actions__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ../../actions/_database-actions */ "./assets/js/actions/_database-actions.js");
/* harmony import */ var _components_size__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ../../components/_size */ "./assets/js/components/_size.js");
/* harmony import */ var _components_size__WEBPACK_IMPORTED_MODULE_33___default = /*#__PURE__*/__webpack_require__.n(_components_size__WEBPACK_IMPORTED_MODULE_33__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ../../utils */ "./assets/js/utils.js");
/* harmony import */ var _table_columns__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./table-columns */ "./assets/js/pages/database/table-columns.js");
/* harmony import */ var react_input_color__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! react-input-color */ "./node_modules/react-input-color/dist/index.esm.js");






























function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }










var DEFAULT_COLUMN_DATA = {
  name: "",
  type: "String"
};

var AlertUpdateColumn = function AlertUpdateColumn(_ref) {
  var name = _ref.name,
      isShow = _ref.isShow,
      columns = _ref.columns,
      onHidden = _ref.onHidden,
      onUpdateTableClick = _ref.onUpdateTableClick,
      passedTableName = _ref.passedTableName,
      tableName = _ref.tableName;
  var confirmMessages = columns.reduce(function (arr, item) {
    var originName = item.originName,
        name = item.name,
        type = item.type,
        originType = item.originType;

    if (!originName) {
      arr.push("Create new column \"".concat(name, "\" with type \"").concat(type, "\""));
    } else {
      if (originName !== name) {
        arr.push("Column from \"".concat(originName, "\" to \"").concat(name, "\""));
      }

      if (originType !== type) {
        arr.push("Column from \"".concat(originType, "\" to \"").concat(type, "\""));
      }
    }

    return arr;
  }, []);

  if (tableName !== passedTableName) {
    confirmMessages.unshift("Table name from \"".concat(passedTableName, "\" to \"").concat(tableName, "\""));
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_29___default.a.createElement(_components___WEBPACK_IMPORTED_MODULE_30__["Modal"], {
    id: "update-column-".concat(name),
    size: _components_size__WEBPACK_IMPORTED_MODULE_33__["Size"].medium,
    title: "Update table ".concat(name),
    show: isShow,
    onHidden: onHidden,
    closeButtonAction: onHidden,
    saveButtonTitle: "Save Changes",
    showSaveButton: true,
    saveButtonColor: _components___WEBPACK_IMPORTED_MODULE_30__["Colors"].blue,
    saveButtonAction: onUpdateTableClick
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_29___default.a.createElement("p", null, "Are you sure to change table structure?"), confirmMessages.map(function (item, index) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_29___default.a.createElement("span", {
      className: "d-block text-break",
      key: index
    }, item);
  }));
};

var AlertRemoveColumn = function AlertRemoveColumn(_ref2) {
  var columnName = _ref2.columnName,
      isShow = _ref2.isShow,
      onHidden = _ref2.onHidden,
      onConfirmRemoveColumnClick = _ref2.onConfirmRemoveColumnClick;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_29___default.a.createElement(_components___WEBPACK_IMPORTED_MODULE_30__["Modal"], {
    id: "remove-column-".concat(columnName),
    size: _components_size__WEBPACK_IMPORTED_MODULE_33__["Size"].medium,
    title: "Delete \"".concat(columnName, "\" column"),
    show: isShow,
    onHidden: onHidden,
    closeButtonAction: onHidden,
    saveButtonTitle: "Confirm Delete",
    showSaveButton: true,
    saveButtonColor: _components___WEBPACK_IMPORTED_MODULE_30__["Colors"].red,
    saveButtonAction: function saveButtonAction() {
      return onConfirmRemoveColumnClick(columnName);
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_29___default.a.createElement("p", {
    className: "text-danger"
  }, "Be careful - this will also delete the column in clickhouse table!"));
};

var AlertDeleteTable = function AlertDeleteTable(_ref3) {
  var tableName = _ref3.tableName,
      onConfirmDeleteTable = _ref3.onConfirmDeleteTable,
      onHidden = _ref3.onHidden;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_29___default.a.createElement(_components___WEBPACK_IMPORTED_MODULE_30__["Modal"], {
    size: _components_size__WEBPACK_IMPORTED_MODULE_33__["Size"].medium,
    id: "delete-table",
    title: "Deleting table ".concat(tableName),
    showCloseButton: true,
    closeButtonTitle: "Cancel",
    showSaveButton: true,
    saveButtonTitle: "Delete table",
    saveButtonColor: "danger",
    saveButtonAction: function saveButtonAction() {
      return onConfirmDeleteTable(tableName);
    },
    closeButtonAction: function closeButtonAction() {
      return onHidden();
    },
    show: !!tableName,
    onHidden: onHidden
  }, "Be careful - this will also delete the table in clickhouse database!");
};

var DatabaseTableDetail = function DatabaseTableDetail(_ref4) {
  var passedTableName = _ref4.tableName,
      setNewTableName = _ref4.setNewTableName,
      setToastMessage = _ref4.setToastMessage,
      onDeleteTable = _ref4.onDeleteTable;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_29__["useState"])(passedTableName),
      _useState2 = _slicedToArray(_useState, 2),
      tableName = _useState2[0],
      setTableName = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_29__["useState"])([]),
      _useState4 = _slicedToArray(_useState3, 2),
      originColumnData = _useState4[0],
      setOriginColumnData = _useState4[1];

  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_29__["useState"])([]),
      _useState6 = _slicedToArray(_useState5, 2),
      columns = _useState6[0],
      setColumns = _useState6[1];

  var _useState7 = Object(react__WEBPACK_IMPORTED_MODULE_29__["useState"])(false),
      _useState8 = _slicedToArray(_useState7, 2),
      isEnableSaveChangesModal = _useState8[0],
      setIsEnableSaveChangesModal = _useState8[1];

  var _useState9 = Object(react__WEBPACK_IMPORTED_MODULE_29__["useState"])([]),
      _useState10 = _slicedToArray(_useState9, 2),
      errors = _useState10[0],
      setError = _useState10[1];

  var _useState11 = Object(react__WEBPACK_IMPORTED_MODULE_29__["useState"])(false),
      _useState12 = _slicedToArray(_useState11, 2),
      isLoading = _useState12[0],
      setIsLoading = _useState12[1];

  var _useState13 = Object(react__WEBPACK_IMPORTED_MODULE_29__["useState"])(""),
      _useState14 = _slicedToArray(_useState13, 2),
      columnNameWillRemove = _useState14[0],
      setColumnNameWillRemove = _useState14[1];

  var _useState15 = Object(react__WEBPACK_IMPORTED_MODULE_29__["useState"])(""),
      _useState16 = _slicedToArray(_useState15, 2),
      tableWillRemove = _useState16[0],
      setTableWillRemove = _useState16[1];

  Object(react__WEBPACK_IMPORTED_MODULE_29__["useEffect"])(function () {
    setTableName(passedTableName);
    setIsLoading(true);

    var loadTableColumns = /*#__PURE__*/function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var res, data, error, columnList;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (passedTableName) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return");

              case 2:
                _context.next = 4;
                return _actions_database_actions__WEBPACK_IMPORTED_MODULE_32__["default"].getTableColumns(passedTableName);

              case 4:
                res = _context.sent;
                data = res.data, error = res.error;

                if (!error) {
                  columnList = data.map(function (item) {
                    return _objectSpread(_objectSpread({}, item), {}, {
                      originName: item.name,
                      originType: item.type,
                      isDisableEdit: ["timestamp", "_id"].includes(item.name)
                    });
                  });
                  setOriginColumnData(columnList);
                  setColumns(columnList);
                  setIsLoading(false);
                }

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function loadTableColumns() {
        return _ref5.apply(this, arguments);
      };
    }();

    loadTableColumns();
    setError([]);
  }, [passedTableName]);

  var onFieldChange = function onFieldChange(index, _ref6) {
    var name = _ref6.name,
        value = _ref6.value;
    setColumns(function (columnList) {
      var cloneColumnList = _toConsumableArray(columnList);

      var cloneColumnItemChange = _objectSpread({}, cloneColumnList[index]);

      cloneColumnItemChange[name] = value;
      cloneColumnList[index] = _objectSpread({}, cloneColumnItemChange);
      return _toConsumableArray(cloneColumnList);
    });

    var newErrors = _toConsumableArray(errors).filter(function (item) {
      return item.position !== index;
    });

    setError(_toConsumableArray(newErrors));
  };

  var onFieldBlur = function onFieldBlur(position, error) {
    var newErrors = _toConsumableArray(errors).filter(function (item) {
      return item.position !== position;
    });

    if (error) newErrors.push(error);
    setError(newErrors);
  };

  var onSubmitUpdateTable = /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var dataPayload, res, newColumns;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              dataPayload = {
                name: tableName,
                columns: columns.map(function (item) {
                  var name = item.name,
                      originName = item.originName,
                      type = item.type;
                  return {
                    name: name,
                    origin: originName,
                    type: type
                  };
                })
              };
              _context2.next = 3;
              return _actions_database_actions__WEBPACK_IMPORTED_MODULE_32__["default"].createOrUpdate(passedTableName, dataPayload);

            case 3:
              res = _context2.sent;
              _context2.next = 6;
              return setIsEnableSaveChangesModal(false);

            case 6:
              if (!res.error) {
                newColumns = columns.map(function (item) {
                  return _objectSpread(_objectSpread({}, item), {}, {
                    originType: item.type,
                    originName: item.name
                  });
                });
                setColumns(_toConsumableArray(newColumns));
                setOriginColumnData(_toConsumableArray(newColumns));

                if (passedTableName !== tableName) {
                  setNewTableName(passedTableName, tableName);
                }

                setToastMessage({
                  color: _utils__WEBPACK_IMPORTED_MODULE_34__["TOAST_STATUS"].success,
                  message: "Update table successful."
                });
              } else {
                setToastMessage({
                  color: _utils__WEBPACK_IMPORTED_MODULE_34__["TOAST_STATUS"].failed,
                  message: res.message,
                  timeoutCloseToast: 4000
                });
              }

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function onSubmitUpdateTable() {
      return _ref7.apply(this, arguments);
    };
  }();

  var onConfirmRemoveColumnClick = /*#__PURE__*/function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(columnName) {
      var res, error, newColumns, key;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _actions_database_actions__WEBPACK_IMPORTED_MODULE_32__["default"].deleteColumn(tableName, columnName);

            case 2:
              res = _context3.sent;
              error = res.error;

              if (!error) {
                newColumns = _toConsumableArray(columns);
                key = newColumns.findIndex(function (el) {
                  return el.name === columnName;
                });
                newColumns.splice(key, 1);
                setColumns(_toConsumableArray(newColumns));
                setOriginColumnData(_toConsumableArray(newColumns));
                setColumnNameWillRemove("");
                setToastMessage({
                  color: _utils__WEBPACK_IMPORTED_MODULE_34__["TOAST_STATUS"].success,
                  message: res.message
                });
              } else {
                setToastMessage({
                  color: _utils__WEBPACK_IMPORTED_MODULE_34__["TOAST_STATUS"].failed,
                  message: res.message
                });
              }

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function onConfirmRemoveColumnClick(_x) {
      return _ref8.apply(this, arguments);
    };
  }();

  var _onConfirmDeleteTable = /*#__PURE__*/function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(tableName, onDeleteTable) {
      var res, error;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return _actions_database_actions__WEBPACK_IMPORTED_MODULE_32__["default"].deleteTable(tableName);

            case 2:
              res = _context4.sent;
              error = res.error;

              if (!error) {
                setTableWillRemove("");
                setToastMessage({
                  color: _utils__WEBPACK_IMPORTED_MODULE_34__["TOAST_STATUS"].success,
                  message: res.message
                });
                onDeleteTable(tableName);
              } else {
                setToastMessage({
                  color: _utils__WEBPACK_IMPORTED_MODULE_34__["TOAST_STATUS"].failed,
                  message: res.message
                });
              }

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function onConfirmDeleteTable(_x2, _x3) {
      return _ref9.apply(this, arguments);
    };
  }();

  var onRemoveColumnClick = function onRemoveColumnClick(column) {
    if (column.originName) {
      setColumnNameWillRemove(column.name);
      return;
    }

    var newColumns = _toConsumableArray(columns);

    newColumns.splice(column.position, 1);
    setColumns(_toConsumableArray(newColumns));
  };

  var addNewColumn = function addNewColumn() {
    setColumns([].concat(_toConsumableArray(columns), [_objectSpread({}, DEFAULT_COLUMN_DATA)]));
    setToastMessage({
      color: _utils__WEBPACK_IMPORTED_MODULE_34__["TOAST_STATUS"].success,
      message: "Add column successful."
    });
  };

  var isEnableSaveChanges = !lodash_isEqual__WEBPACK_IMPORTED_MODULE_31___default()(passedTableName, tableName) || !lodash_isEqual__WEBPACK_IMPORTED_MODULE_31___default()(originColumnData, columns);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_29___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_29___default.a.Fragment, null, !isLoading ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_29___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_29___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_29___default.a.createElement("div", {
    className: "table-detail mt-3 me-cp-3 ms-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_29___default.a.createElement("div", {
    className: "d-flex justify-content-between align-items-end"
  }, tableName && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_29___default.a.createElement(_components___WEBPACK_IMPORTED_MODULE_30__["FormField"], {
    fieldName: "table-name",
    className: "w-25",
    label: "Table name",
    value: tableName,
    disabled: isEnableSaveChangesModal,
    onChange: function onChange(e) {
      setTableName(e.target.value);
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_29___default.a.createElement("div", {
    className: "action-button"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_29___default.a.createElement(_components___WEBPACK_IMPORTED_MODULE_30__["Button"], {
    outlineColor: _components___WEBPACK_IMPORTED_MODULE_30__["Colors"].red,
    className: "me-2",
    onClick: function onClick() {
      return setTableWillRemove(tableName);
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_29___default.a.createElement(_components___WEBPACK_IMPORTED_MODULE_30__["Icon"], {
    dataFeather: "trash-2",
    className: "feather-xs me-2"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_29___default.a.createElement("span", {
    className: "d-inline-block align-middle"
  }, "Delete datatable")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_29___default.a.createElement(_components___WEBPACK_IMPORTED_MODULE_30__["Button"], {
    onClick: function onClick() {
      return setIsEnableSaveChangesModal(true);
    },
    disabled: !isEnableSaveChanges || errors.length > 0
  }, "Save Changes"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_29___default.a.createElement(_table_columns__WEBPACK_IMPORTED_MODULE_35__["TableColumn"], {
    columns: columns,
    errors: errors,
    setColumnNameWillRemove: function setColumnNameWillRemove(column) {
      return onRemoveColumnClick(column);
    },
    isEnableSaveChangesModal: isEnableSaveChangesModal,
    onFieldChange: onFieldChange,
    onFieldBlur: onFieldBlur,
    addNewColumn: addNewColumn
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_29___default.a.createElement(AlertUpdateColumn, {
    name: tableName,
    columns: columns,
    passedTableName: passedTableName,
    tableName: tableName,
    isShow: isEnableSaveChangesModal,
    onHidden: function onHidden() {
      setIsEnableSaveChangesModal(false);
    },
    onUpdateTableClick: function onUpdateTableClick() {
      onSubmitUpdateTable();
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_29___default.a.createElement(AlertRemoveColumn, {
    columnName: columnNameWillRemove,
    isShow: !!columnNameWillRemove,
    onHidden: function onHidden() {
      setColumnNameWillRemove("");
    },
    onConfirmRemoveColumnClick: onConfirmRemoveColumnClick
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_29___default.a.createElement(AlertDeleteTable, {
    tableName: tableWillRemove,
    isShow: !!tableWillRemove,
    onHidden: function onHidden() {
      setTableWillRemove("");
    },
    onConfirmDeleteTable: function onConfirmDeleteTable(tableName) {
      return _onConfirmDeleteTable(tableName, onDeleteTable);
    }
  })) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_29___default.a.createElement(_components___WEBPACK_IMPORTED_MODULE_30__["Spinner"], null));
};

/***/ }),

/***/ "./assets/js/pages/database/tables.js":
/*!********************************************!*\
  !*** ./assets/js/pages/database/tables.js ***!
  \********************************************/
/*! exports provided: DatabaseTables */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DatabaseTables", function() { return DatabaseTables; });
/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.symbol */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.symbol.description */ "./node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator */ "./node_modules/core-js/modules/es.symbol.iterator.js");
/* harmony import */ var core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.concat */ "./node_modules/core-js/modules/es.array.concat.js");
/* harmony import */ var core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.array.filter */ "./node_modules/core-js/modules/es.array.filter.js");
/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.array.find */ "./node_modules/core-js/modules/es.array.find.js");
/* harmony import */ var core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_array_find_index__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.array.find-index */ "./node_modules/core-js/modules/es.array.find-index.js");
/* harmony import */ var core_js_modules_es_array_find_index__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_index__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.array.for-each */ "./node_modules/core-js/modules/es.array.for-each.js");
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_array_from__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.array.from */ "./node_modules/core-js/modules/es.array.from.js");
/* harmony import */ var core_js_modules_es_array_from__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_from__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_array_is_array__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.array.is-array */ "./node_modules/core-js/modules/es.array.is-array.js");
/* harmony import */ var core_js_modules_es_array_is_array__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_is_array__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.array.iterator */ "./node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es_array_map__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/es.array.map */ "./node_modules/core-js/modules/es.array.map.js");
/* harmony import */ var core_js_modules_es_array_map__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_es_array_reduce__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! core-js/modules/es.array.reduce */ "./node_modules/core-js/modules/es.array.reduce.js");
/* harmony import */ var core_js_modules_es_array_reduce__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_reduce__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var core_js_modules_es_array_slice__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! core-js/modules/es.array.slice */ "./node_modules/core-js/modules/es.array.slice.js");
/* harmony import */ var core_js_modules_es_array_slice__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_slice__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var core_js_modules_es_array_splice__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! core-js/modules/es.array.splice */ "./node_modules/core-js/modules/es.array.splice.js");
/* harmony import */ var core_js_modules_es_array_splice__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_splice__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var core_js_modules_es_date_to_string__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! core-js/modules/es.date.to-string */ "./node_modules/core-js/modules/es.date.to-string.js");
/* harmony import */ var core_js_modules_es_date_to_string__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_date_to_string__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! core-js/modules/es.function.name */ "./node_modules/core-js/modules/es.function.name.js");
/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var core_js_modules_es_object_define_properties__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! core-js/modules/es.object.define-properties */ "./node_modules/core-js/modules/es.object.define-properties.js");
/* harmony import */ var core_js_modules_es_object_define_properties__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_define_properties__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var core_js_modules_es_object_define_property__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! core-js/modules/es.object.define-property */ "./node_modules/core-js/modules/es.object.define-property.js");
/* harmony import */ var core_js_modules_es_object_define_property__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_define_property__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptor */ "./node_modules/core-js/modules/es.object.get-own-property-descriptor.js");
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptors */ "./node_modules/core-js/modules/es.object.get-own-property-descriptors.js");
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! core-js/modules/es.object.keys */ "./node_modules/core-js/modules/es.object.keys.js");
/* harmony import */ var core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! core-js/modules/es.promise */ "./node_modules/core-js/modules/es.promise.js");
/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_23__);
/* harmony import */ var core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! core-js/modules/es.regexp.to-string */ "./node_modules/core-js/modules/es.regexp.to-string.js");
/* harmony import */ var core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_24___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_24__);
/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! core-js/modules/es.string.iterator */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_25___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_25__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_26___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_26__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_27___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_27__);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! regenerator-runtime/runtime */ "./node_modules/regenerator-runtime/runtime.js");
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_28___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_28__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_29___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_29__);
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ../../components */ "./assets/js/components/index.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ../../actions */ "./assets/js/actions/index.js");
/* harmony import */ var _table_details__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./table-details */ "./assets/js/pages/database/table-details.js");
/* harmony import */ var _table_columns__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./table-columns */ "./assets/js/pages/database/table-columns.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ../../utils */ "./assets/js/utils.js");
/* harmony import */ var _images_chevron_right_svg__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ../../../images/chevron-right.svg */ "./assets/images/chevron-right.svg");
/* harmony import */ var _styles_pages_tables_scss__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ../../../styles/pages/tables.scss */ "./assets/styles/pages/tables.scss");
/* harmony import */ var _styles_pages_tables_scss__WEBPACK_IMPORTED_MODULE_36___default = /*#__PURE__*/__webpack_require__.n(_styles_pages_tables_scss__WEBPACK_IMPORTED_MODULE_36__);






























function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }









var DEFAULT_DATATABLE_VALUE = {
  tableName: "",
  ttl: ""
};
var DEFAULT_COLUMNS_DATA = [{
  name: "",
  type: "String"
}];

var CreateDatabaseTableModal = function CreateDatabaseTableModal(_ref) {
  var isShow = _ref.isShow,
      onHidden = _ref.onHidden,
      onCreateDataTableSuccess = _ref.onCreateDataTableSuccess,
      setToastMessage = _ref.setToastMessage;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_29__["useState"])([]),
      _useState2 = _slicedToArray(_useState, 2),
      errors = _useState2[0],
      setErrors = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_29__["useState"])(_objectSpread({}, DEFAULT_DATATABLE_VALUE)),
      _useState4 = _slicedToArray(_useState3, 2),
      dataTable = _useState4[0],
      setDataTable = _useState4[1];

  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_29__["useState"])([].concat(DEFAULT_COLUMNS_DATA)),
      _useState6 = _slicedToArray(_useState5, 2),
      dataTableColumns = _useState6[0],
      setDataTableColumns = _useState6[1];

  var _useState7 = Object(react__WEBPACK_IMPORTED_MODULE_29__["useState"])(false),
      _useState8 = _slicedToArray(_useState7, 2),
      isLoading = _useState8[0],
      setIsLoading = _useState8[1];

  var _useState9 = Object(react__WEBPACK_IMPORTED_MODULE_29__["useState"])(),
      _useState10 = _slicedToArray(_useState9, 2),
      fieldErrors = _useState10[0],
      setFieldErrors = _useState10[1];

  Object(react__WEBPACK_IMPORTED_MODULE_29__["useEffect"])(function () {
    setDataTable(_objectSpread({}, DEFAULT_DATATABLE_VALUE));
    setDataTableColumns([].concat(DEFAULT_COLUMNS_DATA));
    setErrors([]);
    setIsLoading(false);
  }, [isShow]);

  var _onFieldChange = function onFieldChange(_ref2, position) {
    var name = _ref2.name,
        value = _ref2.value;

    if (name === "type" || name === "name") {
      var newColumns = dataTableColumns.map(function (item, index) {
        var temp = _objectSpread({}, item);

        if (index === position) {
          temp[name] = value;
        }

        return temp;
      });
      setDataTableColumns(_toConsumableArray(newColumns));
    } else {
      setDataTable(_objectSpread(_objectSpread({}, dataTable), {}, _defineProperty({}, name, value)));
    }

    var isExistError = errors.find(function (item) {
      return item.position === position;
    });

    if (isExistError) {
      var newErrors = _toConsumableArray(errors).filter(function (item) {
        return item.position !== position;
      });

      setErrors(_toConsumableArray(newErrors));
    }

    if (fieldErrors === null || fieldErrors === void 0 ? void 0 : fieldErrors.name) {
      setFieldErrors(_objectSpread(_objectSpread({}, fieldErrors), {}, {
        name: ""
      }));
    }
  };

  var addNewColumn = function addNewColumn() {
    setDataTableColumns([].concat(_toConsumableArray(dataTableColumns), [{
      name: "",
      type: "String"
    }]));
  };

  var onFieldBlur = function onFieldBlur(position, error) {
    var newErrors = _toConsumableArray(errors).filter(function (item) {
      return item.position !== position;
    });

    if (error) newErrors.push(error);
    setErrors(newErrors);
  };

  var setColumnNameWillRemove = function setColumnNameWillRemove(_ref3) {
    var position = _ref3.position;
    setDataTableColumns(_toConsumableArray(dataTableColumns).filter(function (_, index) {
      return index !== position;
    }));
  };

  var createNewDataTable = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var toastContent, tableName, ttl, payload, res, _res$fields, _res$fields2;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              setIsLoading(true);
              toastContent = {};
              tableName = dataTable.tableName, ttl = dataTable.ttl;
              payload = {
                name: tableName,
                ttl: ttl,
                columns: dataTableColumns.reduce(function (arr, item) {
                  if (item.name) {
                    arr.push(_objectSpread(_objectSpread({}, item), {}, {
                      origin: ""
                    }));
                  }

                  return arr;
                }, [])
              };
              _context.next = 6;
              return _actions__WEBPACK_IMPORTED_MODULE_31__["DatabaseActions"].createOrUpdate(null, payload);

            case 6:
              res = _context.sent;

              if (!res.error) {
                toastContent = {
                  color: _utils__WEBPACK_IMPORTED_MODULE_34__["TOAST_STATUS"].success,
                  message: "Create datatable successful."
                };
                onCreateDataTableSuccess(tableName);
                onHidden();
                setToastMessage(toastContent);
              } else {
                setFieldErrors(_objectSpread({}, res.fields));

                if ((_res$fields = res.fields) === null || _res$fields === void 0 ? void 0 : _res$fields.columns) {
                  setErrors([{
                    position: 0,
                    errorMessage: (_res$fields2 = res.fields) === null || _res$fields2 === void 0 ? void 0 : _res$fields2.columns
                  }]);
                }
              }

              setIsLoading(false);

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function createNewDataTable() {
      return _ref4.apply(this, arguments);
    };
  }();

  var tableName = dataTable.tableName,
      ttl = dataTable.ttl;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_29___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_30__["Modal"], {
    size: _components__WEBPACK_IMPORTED_MODULE_30__["Size"].large,
    id: "create-new-table",
    title: "Create a new datatable",
    showCloseButton: false,
    isPositionCenter: true,
    show: isShow,
    onHidden: onHidden
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_29___default.a.createElement("div", {
    className: "mx-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_29___default.a.createElement("div", {
    className: "row mb-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_29___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_30__["FormField"], {
    className: "col-12 col-md-6",
    label: "Table name",
    fieldName: "tableName",
    value: tableName,
    isMandatory: true,
    disabled: isLoading,
    placeholder: "table name",
    onChange: function onChange(e) {
      return _onFieldChange(e.target);
    },
    errorMessage: fieldErrors === null || fieldErrors === void 0 ? void 0 : fieldErrors.name
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_29___default.a.createElement("div", {
    className: "row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_29___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_30__["FormField"], {
    className: "col-12 col-md-6",
    label: "Table TTL",
    fieldName: "ttl",
    value: ttl,
    disabled: isLoading,
    placeholder: "timestamp + toIntervalMonth(100)",
    onChange: function onChange(e) {
      return _onFieldChange(e.target);
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_29___default.a.createElement(_table_columns__WEBPACK_IMPORTED_MODULE_33__["TableColumn"], {
    columns: dataTableColumns,
    errors: errors,
    setColumnNameWillRemove: setColumnNameWillRemove,
    isEnableSaveChangesModal: isLoading,
    onFieldChange: function onFieldChange(position, target) {
      return _onFieldChange(target, position);
    },
    onFieldBlur: onFieldBlur,
    addNewColumn: addNewColumn
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_29___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_30__["Button"], {
    className: "w-100",
    disabled: errors.length > 0,
    isLoading: isLoading,
    onClick: function onClick() {
      return createNewDataTable();
    }
  }, "Create Datatable")));
};

var DatabaseTables = function DatabaseTables() {
  var _useState11 = Object(react__WEBPACK_IMPORTED_MODULE_29__["useState"])(false),
      _useState12 = _slicedToArray(_useState11, 2),
      isLoading = _useState12[0],
      setIsLoading = _useState12[1];

  var _useState13 = Object(react__WEBPACK_IMPORTED_MODULE_29__["useState"])([]),
      _useState14 = _slicedToArray(_useState13, 2),
      tables = _useState14[0],
      setTableList = _useState14[1];

  var _useState15 = Object(react__WEBPACK_IMPORTED_MODULE_29__["useState"])(null),
      _useState16 = _slicedToArray(_useState15, 2),
      currentTableSelected = _useState16[0],
      setCurrentTableSelected = _useState16[1];

  var _useState17 = Object(react__WEBPACK_IMPORTED_MODULE_29__["useState"])({}),
      _useState18 = _slicedToArray(_useState17, 2),
      toastContent = _useState18[0],
      setToastContent = _useState18[1];

  var _useState19 = Object(react__WEBPACK_IMPORTED_MODULE_29__["useState"])(false),
      _useState20 = _slicedToArray(_useState19, 2),
      isShowCreateDatabaseTable = _useState20[0],
      setIsShowCreateDatabaseTable = _useState20[1];

  var loadDataTableList = /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var res, error, data;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _actions__WEBPACK_IMPORTED_MODULE_31__["DatabaseActions"].getAllTable();

            case 2:
              res = _context2.sent;
              error = res.error, data = res.data;

              if (!error) {
                setTableList(data);
                if (data.length > 0) setCurrentTableSelected(data[0]);
              }

              setIsLoading(false);

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function loadDataTableList() {
      return _ref5.apply(this, arguments);
    };
  }();

  Object(react__WEBPACK_IMPORTED_MODULE_29__["useEffect"])(function () {
    setIsLoading(true);
    loadDataTableList();
  }, []);

  var setNewTableName = function setNewTableName(originTableName, newTableName) {
    var newTableList = _toConsumableArray(tables);

    var index = newTableList.findIndex(function (item) {
      return item === originTableName;
    });
    newTableList[index] = newTableName;
    setCurrentTableSelected(newTableName);
    setTableList(_toConsumableArray(newTableList));
  };

  var setToastMessage = function setToastMessage(toastContent) {
    setToastContent(toastContent);
  };

  var onDeleteTable = function onDeleteTable(tableName) {
    var newTableList = _toConsumableArray(tables);

    var findIndex = newTableList.findIndex(function (item) {
      return item === tableName;
    });
    newTableList.splice(findIndex, 1);
    setCurrentTableSelected(newTableList[0]);
    setTableList(_toConsumableArray(newTableList));
  };

  var syncAllTable = /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var res;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              setIsLoading(true);
              _context3.next = 3;
              return _actions__WEBPACK_IMPORTED_MODULE_31__["DatabaseActions"].syncAll();

            case 3:
              res = _context3.sent;
              if (!res.error) loadDataTableList();

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function syncAllTable() {
      return _ref6.apply(this, arguments);
    };
  }();

  var onCreateDataTableSuccess = function onCreateDataTableSuccess(tableName) {
    var newDataTableList = _toConsumableArray(tables);

    newDataTableList.push(tableName);
    setTableList(_toConsumableArray(newDataTableList));
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_29___default.a.createElement("div", {
    className: "database-page row m-0"
  }, !isLoading ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_29___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_29___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_29___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_30__["Toast"], {
    toastContent: toastContent,
    onToastClosed: function onToastClosed() {
      setToastContent({});
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_29___default.a.createElement("div", {
    className: "col-12 col-md-3 bg-white min-h-100 d-flex flex-column p-0 project-list-side"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_29___default.a.createElement("small", {
    className: "title ps-cp-4 my-3"
  }, "Datatables"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_29___default.a.createElement("button", {
    className: "ps-cp-4 py-3 btn btn-link text-start text-info",
    onClick: function onClick() {
      return syncAllTable();
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_29___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_30__["Icon"], {
    dataFeather: "refresh-ccw",
    className: "feather-sm me-2"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_29___default.a.createElement("span", {
    className: "d-inline-block align-middle fw-bold"
  }, "Sync tables")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_29___default.a.createElement("button", {
    className: "ps-cp-4 py-3 btn btn-link text-start",
    onClick: function onClick() {
      return setIsShowCreateDatabaseTable(true);
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_29___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_30__["Icon"], {
    dataFeather: "plus",
    className: "feather-sm me-2"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_29___default.a.createElement("span", {
    className: "d-inline-block align-middle fw-bold"
  }, "Create new datatable")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_29___default.a.createElement("ul", {
    className: "project-list list-unstyled"
  }, tables && tables.length > 0 ? tables.map(function (item, key) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_29___default.a.createElement("li", {
      key: key,
      className: "".concat(currentTableSelected === item ? "active" : ""),
      role: "button"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_29___default.a.createElement("button", {
      className: "w-100 d-flex justify-content-between align-items-center btn btn-link text-start py-3 ps-cp-4 pe-3 text-dark",
      onClick: function onClick() {
        return setCurrentTableSelected(item);
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_29___default.a.createElement("span", null, item), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_29___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_30__["Image"], {
      src: _images_chevron_right_svg__WEBPACK_IMPORTED_MODULE_35__["default"]
    })));
  }) : null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_29___default.a.createElement("div", {
    className: "col-12 col-md-9"
  }, currentTableSelected && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_29___default.a.createElement(_table_details__WEBPACK_IMPORTED_MODULE_32__["DatabaseTableDetail"], {
    setNewTableName: setNewTableName,
    tableName: currentTableSelected,
    setToastMessage: setToastMessage,
    onDeleteTable: onDeleteTable
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_29___default.a.createElement(CreateDatabaseTableModal, {
    isShow: isShowCreateDatabaseTable,
    onHidden: function onHidden() {
      return setIsShowCreateDatabaseTable(false);
    },
    setToastMessage: setToastMessage,
    onCreateDataTableSuccess: onCreateDataTableSuccess
  })) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_29___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_30__["Spinner"], null));
};

/***/ }),

/***/ "./assets/js/pages/user/profile.js":
/*!*****************************************!*\
  !*** ./assets/js/pages/user/profile.js ***!
  \*****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.symbol */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.symbol.description */ "./node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator */ "./node_modules/core-js/modules/es.symbol.iterator.js");
/* harmony import */ var core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.for-each */ "./node_modules/core-js/modules/es.array.for-each.js");
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_array_from__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.array.from */ "./node_modules/core-js/modules/es.array.from.js");
/* harmony import */ var core_js_modules_es_array_from__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_from__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_array_is_array__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.array.is-array */ "./node_modules/core-js/modules/es.array.is-array.js");
/* harmony import */ var core_js_modules_es_array_is_array__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_is_array__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.array.iterator */ "./node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_array_map__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.array.map */ "./node_modules/core-js/modules/es.array.map.js");
/* harmony import */ var core_js_modules_es_array_map__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_array_slice__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.array.slice */ "./node_modules/core-js/modules/es.array.slice.js");
/* harmony import */ var core_js_modules_es_array_slice__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_slice__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_date_to_string__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.date.to-string */ "./node_modules/core-js/modules/es.date.to-string.js");
/* harmony import */ var core_js_modules_es_date_to_string__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_date_to_string__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.function.name */ "./node_modules/core-js/modules/es.function.name.js");
/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es_object_assign__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/es.object.assign */ "./node_modules/core-js/modules/es.object.assign.js");
/* harmony import */ var core_js_modules_es_object_assign__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_assign__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! core-js/modules/es.regexp.exec */ "./node_modules/core-js/modules/es.regexp.exec.js");
/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! core-js/modules/es.regexp.to-string */ "./node_modules/core-js/modules/es.regexp.to-string.js");
/* harmony import */ var core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! core-js/modules/es.string.iterator */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var core_js_modules_es_string_search__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! core-js/modules/es.string.search */ "./node_modules/core-js/modules/es.string.search.js");
/* harmony import */ var core_js_modules_es_string_search__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_search__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var core_js_modules_es_string_split__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! core-js/modules/es.string.split */ "./node_modules/core-js/modules/es.string.split.js");
/* harmony import */ var core_js_modules_es_string_split__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_split__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../components */ "./assets/js/components/index.js");
/* harmony import */ var _styles_pages_edit_profile_scss__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../../../styles/pages/_edit-profile.scss */ "./assets/styles/pages/_edit-profile.scss");
/* harmony import */ var _styles_pages_edit_profile_scss__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(_styles_pages_edit_profile_scss__WEBPACK_IMPORTED_MODULE_23__);
/* harmony import */ var _database_tables__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../database/tables */ "./assets/js/pages/database/tables.js");





















function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }






var TAB_LIST = [{
  id: "profile",
  title: "My Profile"
}, {
  id: "databases",
  title: "Databases"
}, {
  id: "widgets",
  title: "Widgets"
}];

var NavComponent = function NavComponent(_ref) {
  var currentTab = _ref.currentTab;

  var TabComponent = function TabComponent(_ref2) {
    var title = _ref2.title,
        id = _ref2.id,
        currentTab = _ref2.currentTab;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement("li", {
      className: "nav-item",
      role: "presentation"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement("button", {
      className: "nav-link ".concat(currentTab === id ? "active" : ""),
      id: "pills-".concat(id, "-tab"),
      type: "button",
      role: "tab",
      "aria-controls": "pills-".concat(id),
      "aria-selected": "true",
      onClick: function onClick() {
        if (currentTab !== id) location.href = "setting?tab=".concat(id);
      }
    }, title));
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement("ul", {
    className: "nav nav-pills ms-4",
    id: "pills-tab",
    role: "tablist"
  }, TAB_LIST.map(function (item) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement(TabComponent, _extends({
      key: item.id
    }, item, {
      currentTab: currentTab
    }));
  }));
};

var ProfileForm = function ProfileForm(_ref3) {
  var passedCurrentTab = _ref3.currentTab;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_20__["useState"])(),
      _useState2 = _slicedToArray(_useState, 2),
      toastContent = _useState2[0],
      setToastContent = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_20__["useState"])(),
      _useState4 = _slicedToArray(_useState3, 2),
      currentTab = _useState4[0],
      setCurrentTab = _useState4[1];

  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_20__["useState"])(),
      _useState6 = _slicedToArray(_useState5, 2),
      widgetIdParam = _useState6[0],
      setWidgetIdParam = _useState6[1];

  Object(react__WEBPACK_IMPORTED_MODULE_20__["useEffect"])(function () {
    var currentUrlQueries = window.location.search;
    var currentUrlQueriesArray = currentUrlQueries.split("&");

    if (currentUrlQueriesArray && currentUrlQueriesArray.length > 0) {
      currentUrlQueriesArray.forEach(function (item) {
        var queryParam = item.split("=");

        switch (queryParam[0]) {
          case "tab":
            {
              setCurrentTab(queryParam[1]);
              break;
            }

          case "widgetId":
            {
              setWidgetIdParam(queryParam[1]);
              break;
            }
        }
      });
    }
  }, []);
  Object(react__WEBPACK_IMPORTED_MODULE_20__["useEffect"])(function () {
    setCurrentTab(passedCurrentTab);
  }, [passedCurrentTab]);

  var setToastMessage = function setToastMessage(toastContent) {
    return setToastContent(toastContent);
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement("div", {
    className: "setting-profile",
    style: {
      marginBottom: "50px"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement("div", {
    className: "content"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_22__["Toast"], {
    toastContent: toastContent,
    onToastClosed: function onToastClosed() {
      setToastContent();
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement("div", {
    className: "bg-white"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement("div", {
    className: "container-fluid"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement("div", {
    className: "ms-4 me-4"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_22__["ContentHeader"], {
    pageTitle: "Settings",
    iconName: "settings",
    className: "pb-2 bg-white"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement(NavComponent, {
    currentTab: currentTab
  }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement("div", {
    className: "tab-content",
    id: "pills-tabContent"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement("div", {
    className: "container-fluid pb-5 ms-cp-4 px-0 mt-3 tab-pane fade ".concat(currentTab === "profile" ? "show active" : ""),
    id: "pills-profile",
    role: "tabpanel",
    "aria-labelledby": "pills-profile-tab"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_22__["UserProfile"], {
    setToastMessage: setToastMessage
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_22__["ChangePasswordForm"], {
    setToastMessage: setToastMessage
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement("div", {
    className: "tab-pane fade ".concat(currentTab === "databases" ? "show active" : ""),
    id: "pills-databases",
    role: "tabpanel",
    "aria-labelledby": "pills-databases-tab"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement(_database_tables__WEBPACK_IMPORTED_MODULE_24__["DatabaseTables"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement("div", {
    className: "tab-pane fade ".concat(currentTab === "widgets" ? "show active" : ""),
    id: "pills-widgets",
    role: "tabpanel",
    "aria-labelledby": "pills-widgets-tab"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_22__["WidgetList"], {
    className: "mx-3",
    widgetIdParam: widgetIdParam
  })))));
};

var root = document.querySelector("#root");
react_dom__WEBPACK_IMPORTED_MODULE_21___default.a.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement(ProfileForm, root.dataset), root);

/***/ }),

/***/ "./assets/styles/pages/_edit-profile.scss":
/*!************************************************!*\
  !*** ./assets/styles/pages/_edit-profile.scss ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./assets/styles/pages/tables.scss":
/*!*****************************************!*\
  !*** ./assets/styles/pages/tables.scss ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/core-js/internals/same-value.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/same-value.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// `SameValue` abstract operation
// https://tc39.github.io/ecma262/#sec-samevalue
module.exports = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};


/***/ }),

/***/ "./node_modules/core-js/modules/es.string.search.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es.string.search.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fixRegExpWellKnownSymbolLogic = __webpack_require__(/*! ../internals/fix-regexp-well-known-symbol-logic */ "./node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js");
var sameValue = __webpack_require__(/*! ../internals/same-value */ "./node_modules/core-js/internals/same-value.js");
var regExpExec = __webpack_require__(/*! ../internals/regexp-exec-abstract */ "./node_modules/core-js/internals/regexp-exec-abstract.js");

// @@search logic
fixRegExpWellKnownSymbolLogic('search', 1, function (SEARCH, nativeSearch, maybeCallNative) {
  return [
    // `String.prototype.search` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.search
    function search(regexp) {
      var O = requireObjectCoercible(this);
      var searcher = regexp == undefined ? undefined : regexp[SEARCH];
      return searcher !== undefined ? searcher.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
    },
    // `RegExp.prototype[@@search]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@search
    function (regexp) {
      var res = maybeCallNative(nativeSearch, regexp, this);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);

      var previousLastIndex = rx.lastIndex;
      if (!sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
      var result = regExpExec(rx, S);
      if (!sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
      return result === null ? -1 : result.index;
    }
  ];
});


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2ltYWdlcy9jaGV2cm9uLXJpZ2h0LnN2ZyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvcGFnZXMvZGF0YWJhc2UvdGFibGUtY29sdW1ucy5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvcGFnZXMvZGF0YWJhc2UvdGFibGUtZGV0YWlscy5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvcGFnZXMvZGF0YWJhc2UvdGFibGVzLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9wYWdlcy91c2VyL3Byb2ZpbGUuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3N0eWxlcy9wYWdlcy9fZWRpdC1wcm9maWxlLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3N0eWxlcy9wYWdlcy90YWJsZXMuc2NzcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc2FtZS12YWx1ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLnN0cmluZy5zZWFyY2guanMiXSwibmFtZXMiOlsiQ09MVU1OX1RZUEVfTElTVCIsIndpbmRvdyIsImNsaWNraG91c2VUeXBlcyIsIlJFR0VYX1NQRUNJQUxfQ0hBUkFDVEVSUyIsIkRVUExJQ0FURV9GSUVMRF9FUlJPUiIsIlNQRUNJQUxfQ0hBUkFDVEVSU19FUlJPUiIsIkJMQU5LX1NQQUNFX0VSUk9SIiwiVGFibGVEZXRhaWxSb3ciLCJjb2x1bW5zIiwiY29sdW1uIiwicG9zaXRpb24iLCJvbkZpZWxkQ2hhbmdlIiwib25GaWVsZEJsdXIiLCJlcnJvck1lc3NhZ2UiLCJkaXNhYmxlZCIsIm9uUmVtb3ZlQ29sdW1uQ2xpY2tlZCIsIm5hbWUiLCJ0eXBlIiwiaXNEaXNhYmxlRWRpdCIsImlzRGlzYWJsZUZpZWxkIiwib25JbnB1dEJsdXIiLCJ2YWx1ZSIsImVycm9yIiwidmFsdWVJc0V4aXN0IiwiZmluZCIsIml0ZW0iLCJpbmRleCIsImluZGV4T2YiLCJ0ZXN0Iiwid2lkdGgiLCJlIiwidGFyZ2V0IiwibWFwIiwia2V5IiwiQ29sb3JzIiwicmVkIiwibGVuZ3RoIiwiVGFibGVDb2x1bW4iLCJwYXNzZWRDb2x1bW5zIiwic2V0Q29sdW1uTmFtZVdpbGxSZW1vdmUiLCJpc0VuYWJsZVNhdmVDaGFuZ2VzTW9kYWwiLCJhZGROZXdDb2x1bW4iLCJlcnJvcnMiLCJ1c2VTdGF0ZSIsInNldENvbHVtbnMiLCJ1c2VFZmZlY3QiLCJlcnJvck9iaiIsIkRFRkFVTFRfQ09MVU1OX0RBVEEiLCJBbGVydFVwZGF0ZUNvbHVtbiIsImlzU2hvdyIsIm9uSGlkZGVuIiwib25VcGRhdGVUYWJsZUNsaWNrIiwicGFzc2VkVGFibGVOYW1lIiwidGFibGVOYW1lIiwiY29uZmlybU1lc3NhZ2VzIiwicmVkdWNlIiwiYXJyIiwib3JpZ2luTmFtZSIsIm9yaWdpblR5cGUiLCJwdXNoIiwidW5zaGlmdCIsIlNpemUiLCJtZWRpdW0iLCJibHVlIiwiQWxlcnRSZW1vdmVDb2x1bW4iLCJjb2x1bW5OYW1lIiwib25Db25maXJtUmVtb3ZlQ29sdW1uQ2xpY2siLCJBbGVydERlbGV0ZVRhYmxlIiwib25Db25maXJtRGVsZXRlVGFibGUiLCJEYXRhYmFzZVRhYmxlRGV0YWlsIiwic2V0TmV3VGFibGVOYW1lIiwic2V0VG9hc3RNZXNzYWdlIiwib25EZWxldGVUYWJsZSIsInNldFRhYmxlTmFtZSIsIm9yaWdpbkNvbHVtbkRhdGEiLCJzZXRPcmlnaW5Db2x1bW5EYXRhIiwic2V0SXNFbmFibGVTYXZlQ2hhbmdlc01vZGFsIiwic2V0RXJyb3IiLCJpc0xvYWRpbmciLCJzZXRJc0xvYWRpbmciLCJjb2x1bW5OYW1lV2lsbFJlbW92ZSIsInRhYmxlV2lsbFJlbW92ZSIsInNldFRhYmxlV2lsbFJlbW92ZSIsImxvYWRUYWJsZUNvbHVtbnMiLCJEYXRhYmFzZUFjdGlvbnMiLCJnZXRUYWJsZUNvbHVtbnMiLCJyZXMiLCJkYXRhIiwiY29sdW1uTGlzdCIsImluY2x1ZGVzIiwiY2xvbmVDb2x1bW5MaXN0IiwiY2xvbmVDb2x1bW5JdGVtQ2hhbmdlIiwibmV3RXJyb3JzIiwiZmlsdGVyIiwib25TdWJtaXRVcGRhdGVUYWJsZSIsImRhdGFQYXlsb2FkIiwib3JpZ2luIiwiY3JlYXRlT3JVcGRhdGUiLCJuZXdDb2x1bW5zIiwiY29sb3IiLCJUT0FTVF9TVEFUVVMiLCJzdWNjZXNzIiwibWVzc2FnZSIsImZhaWxlZCIsInRpbWVvdXRDbG9zZVRvYXN0IiwiZGVsZXRlQ29sdW1uIiwiZmluZEluZGV4IiwiZWwiLCJzcGxpY2UiLCJkZWxldGVUYWJsZSIsIm9uUmVtb3ZlQ29sdW1uQ2xpY2siLCJpc0VuYWJsZVNhdmVDaGFuZ2VzIiwiaXNFcXVhbCIsIkRFRkFVTFRfREFUQVRBQkxFX1ZBTFVFIiwidHRsIiwiREVGQVVMVF9DT0xVTU5TX0RBVEEiLCJDcmVhdGVEYXRhYmFzZVRhYmxlTW9kYWwiLCJvbkNyZWF0ZURhdGFUYWJsZVN1Y2Nlc3MiLCJzZXRFcnJvcnMiLCJkYXRhVGFibGUiLCJzZXREYXRhVGFibGUiLCJkYXRhVGFibGVDb2x1bW5zIiwic2V0RGF0YVRhYmxlQ29sdW1ucyIsImZpZWxkRXJyb3JzIiwic2V0RmllbGRFcnJvcnMiLCJ0ZW1wIiwiaXNFeGlzdEVycm9yIiwiXyIsImNyZWF0ZU5ld0RhdGFUYWJsZSIsInRvYXN0Q29udGVudCIsInBheWxvYWQiLCJmaWVsZHMiLCJsYXJnZSIsIkRhdGFiYXNlVGFibGVzIiwidGFibGVzIiwic2V0VGFibGVMaXN0IiwiY3VycmVudFRhYmxlU2VsZWN0ZWQiLCJzZXRDdXJyZW50VGFibGVTZWxlY3RlZCIsInNldFRvYXN0Q29udGVudCIsImlzU2hvd0NyZWF0ZURhdGFiYXNlVGFibGUiLCJzZXRJc1Nob3dDcmVhdGVEYXRhYmFzZVRhYmxlIiwibG9hZERhdGFUYWJsZUxpc3QiLCJnZXRBbGxUYWJsZSIsIm9yaWdpblRhYmxlTmFtZSIsIm5ld1RhYmxlTmFtZSIsIm5ld1RhYmxlTGlzdCIsInN5bmNBbGxUYWJsZSIsInN5bmNBbGwiLCJuZXdEYXRhVGFibGVMaXN0IiwiQ2hldnJvblJpZ2h0IiwiVEFCX0xJU1QiLCJpZCIsInRpdGxlIiwiTmF2Q29tcG9uZW50IiwiY3VycmVudFRhYiIsIlRhYkNvbXBvbmVudCIsImxvY2F0aW9uIiwiaHJlZiIsIlByb2ZpbGVGb3JtIiwicGFzc2VkQ3VycmVudFRhYiIsInNldEN1cnJlbnRUYWIiLCJ3aWRnZXRJZFBhcmFtIiwic2V0V2lkZ2V0SWRQYXJhbSIsImN1cnJlbnRVcmxRdWVyaWVzIiwic2VhcmNoIiwiY3VycmVudFVybFF1ZXJpZXNBcnJheSIsInNwbGl0IiwiZm9yRWFjaCIsInF1ZXJ5UGFyYW0iLCJtYXJnaW5Cb3R0b20iLCJyb290IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiUmVhY3RET00iLCJyZW5kZXIiLCJkYXRhc2V0Il0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSxRQUFRLG9CQUFvQjtRQUM1QjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLGlCQUFpQiw0QkFBNEI7UUFDN0M7UUFDQTtRQUNBLGtCQUFrQiwyQkFBMkI7UUFDN0M7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBOztRQUVBO1FBQ0E7UUFDQSwwQ0FBMEM7UUFDMUM7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtR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QXZCLENBQWI7QUFDQUMsaURBQVEsQ0FBQ0MsTUFBVCxlQUFnQiw0REFBQyxXQUFELEVBQWlCSixJQUFJLENBQUNLLE9BQXRCLENBQWhCLEVBQW1ETCxJQUFuRCxFOzs7Ozs7Ozs7OztBQ2xKQSx1Qzs7Ozs7Ozs7Ozs7QUNBQSx1Qzs7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNMYTtBQUNiLG9DQUFvQyxtQkFBTyxDQUFDLCtIQUFpRDtBQUM3RixlQUFlLG1CQUFPLENBQUMsNkVBQXdCO0FBQy9DLDZCQUE2QixtQkFBTyxDQUFDLDJHQUF1QztBQUM1RSxnQkFBZ0IsbUJBQU8sQ0FBQywrRUFBeUI7QUFDakQsaUJBQWlCLG1CQUFPLENBQUMsbUdBQW1DOztBQUU1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyIsImZpbGUiOiJ1c2VyX3Byb2ZpbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcbiBcdFx0dmFyIGV4ZWN1dGVNb2R1bGVzID0gZGF0YVsyXTtcblxuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcblxuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0XHQvLyBhZGQgZW50cnkgbW9kdWxlcyBmcm9tIGxvYWRlZCBjaHVuayB0byBkZWZlcnJlZCBsaXN0XG4gXHRcdGRlZmVycmVkTW9kdWxlcy5wdXNoLmFwcGx5KGRlZmVycmVkTW9kdWxlcywgZXhlY3V0ZU1vZHVsZXMgfHwgW10pO1xuXG4gXHRcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gYWxsIGNodW5rcyByZWFkeVxuIFx0XHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiBcdH07XG4gXHRmdW5jdGlvbiBjaGVja0RlZmVycmVkTW9kdWxlcygpIHtcbiBcdFx0dmFyIHJlc3VsdDtcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlZmVycmVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBkZWZlcnJlZE1vZHVsZSA9IGRlZmVycmVkTW9kdWxlc1tpXTtcbiBcdFx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcbiBcdFx0XHRmb3IodmFyIGogPSAxOyBqIDwgZGVmZXJyZWRNb2R1bGUubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBkZXBJZCA9IGRlZmVycmVkTW9kdWxlW2pdO1xuIFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2RlcElkXSAhPT0gMCkgZnVsZmlsbGVkID0gZmFsc2U7XG4gXHRcdFx0fVxuIFx0XHRcdGlmKGZ1bGZpbGxlZCkge1xuIFx0XHRcdFx0ZGVmZXJyZWRNb2R1bGVzLnNwbGljZShpLS0sIDEpO1xuIFx0XHRcdFx0cmVzdWx0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBkZWZlcnJlZE1vZHVsZVswXSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0cmV0dXJuIHJlc3VsdDtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBDU1MgY2h1bmtzXG4gXHR2YXIgaW5zdGFsbGVkQ3NzQ2h1bmtzID0ge1xuIFx0XHRcInVzZXJfcHJvZmlsZVwiOiAwXG4gXHR9XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHQvLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbiBcdC8vIFByb21pc2UgPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHRcInVzZXJfcHJvZmlsZVwiOiAwXG4gXHR9O1xuXG4gXHR2YXIgZGVmZXJyZWRNb2R1bGVzID0gW107XG5cbiBcdC8vIHNjcmlwdCBwYXRoIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBqc29ucFNjcmlwdFNyYyhjaHVua0lkKSB7XG4gXHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgKHt9W2NodW5rSWRdfHxjaHVua0lkKSArIFwiLmpzXCJcbiBcdH1cblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG4gXHQvLyBUaGlzIGZpbGUgY29udGFpbnMgb25seSB0aGUgZW50cnkgY2h1bmsuXG4gXHQvLyBUaGUgY2h1bmsgbG9hZGluZyBmdW5jdGlvbiBmb3IgYWRkaXRpb25hbCBjaHVua3NcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZSA9IGZ1bmN0aW9uIHJlcXVpcmVFbnN1cmUoY2h1bmtJZCkge1xuIFx0XHR2YXIgcHJvbWlzZXMgPSBbXTtcblxuXG4gXHRcdC8vIG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIENTUyBsb2FkaW5nXG4gXHRcdHZhciBjc3NDaHVua3MgPSB7XCIwXCI6MX07XG4gXHRcdGlmKGluc3RhbGxlZENzc0NodW5rc1tjaHVua0lkXSkgcHJvbWlzZXMucHVzaChpbnN0YWxsZWRDc3NDaHVua3NbY2h1bmtJZF0pO1xuIFx0XHRlbHNlIGlmKGluc3RhbGxlZENzc0NodW5rc1tjaHVua0lkXSAhPT0gMCAmJiBjc3NDaHVua3NbY2h1bmtJZF0pIHtcbiBcdFx0XHRwcm9taXNlcy5wdXNoKGluc3RhbGxlZENzc0NodW5rc1tjaHVua0lkXSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdFx0dmFyIGhyZWYgPSBcIlwiICsgKHt9W2NodW5rSWRdfHxjaHVua0lkKSArIFwiLmNzc1wiO1xuIFx0XHRcdFx0dmFyIGZ1bGxocmVmID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgaHJlZjtcbiBcdFx0XHRcdHZhciBleGlzdGluZ0xpbmtUYWdzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJsaW5rXCIpO1xuIFx0XHRcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGV4aXN0aW5nTGlua1RhZ3MubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0dmFyIHRhZyA9IGV4aXN0aW5nTGlua1RhZ3NbaV07XG4gXHRcdFx0XHRcdHZhciBkYXRhSHJlZiA9IHRhZy5nZXRBdHRyaWJ1dGUoXCJkYXRhLWhyZWZcIikgfHwgdGFnLmdldEF0dHJpYnV0ZShcImhyZWZcIik7XG4gXHRcdFx0XHRcdGlmKHRhZy5yZWwgPT09IFwic3R5bGVzaGVldFwiICYmIChkYXRhSHJlZiA9PT0gaHJlZiB8fCBkYXRhSHJlZiA9PT0gZnVsbGhyZWYpKSByZXR1cm4gcmVzb2x2ZSgpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0dmFyIGV4aXN0aW5nU3R5bGVUYWdzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzdHlsZVwiKTtcbiBcdFx0XHRcdGZvcih2YXIgaSA9IDA7IGkgPCBleGlzdGluZ1N0eWxlVGFncy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHR2YXIgdGFnID0gZXhpc3RpbmdTdHlsZVRhZ3NbaV07XG4gXHRcdFx0XHRcdHZhciBkYXRhSHJlZiA9IHRhZy5nZXRBdHRyaWJ1dGUoXCJkYXRhLWhyZWZcIik7XG4gXHRcdFx0XHRcdGlmKGRhdGFIcmVmID09PSBocmVmIHx8IGRhdGFIcmVmID09PSBmdWxsaHJlZikgcmV0dXJuIHJlc29sdmUoKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdHZhciBsaW5rVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XG4gXHRcdFx0XHRsaW5rVGFnLnJlbCA9IFwic3R5bGVzaGVldFwiO1xuIFx0XHRcdFx0bGlua1RhZy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuIFx0XHRcdFx0bGlua1RhZy5vbmxvYWQgPSByZXNvbHZlO1xuIFx0XHRcdFx0bGlua1RhZy5vbmVycm9yID0gZnVuY3Rpb24oZXZlbnQpIHtcbiBcdFx0XHRcdFx0dmFyIHJlcXVlc3QgPSBldmVudCAmJiBldmVudC50YXJnZXQgJiYgZXZlbnQudGFyZ2V0LnNyYyB8fCBmdWxsaHJlZjtcbiBcdFx0XHRcdFx0dmFyIGVyciA9IG5ldyBFcnJvcihcIkxvYWRpbmcgQ1NTIGNodW5rIFwiICsgY2h1bmtJZCArIFwiIGZhaWxlZC5cXG4oXCIgKyByZXF1ZXN0ICsgXCIpXCIpO1xuIFx0XHRcdFx0XHRlcnIucmVxdWVzdCA9IHJlcXVlc3Q7XG4gXHRcdFx0XHRcdHJlamVjdChlcnIpO1xuIFx0XHRcdFx0fTtcbiBcdFx0XHRcdGxpbmtUYWcuaHJlZiA9IGZ1bGxocmVmO1xuIFx0XHRcdFx0dmFyIGhlYWQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF07XG4gXHRcdFx0XHRoZWFkLmFwcGVuZENoaWxkKGxpbmtUYWcpO1xuIFx0XHRcdH0pLnRoZW4oZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRpbnN0YWxsZWRDc3NDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHRcdH0pKTtcbiBcdFx0fVxuXG4gXHRcdC8vIEpTT05QIGNodW5rIGxvYWRpbmcgZm9yIGphdmFzY3JpcHRcblxuIFx0XHR2YXIgaW5zdGFsbGVkQ2h1bmtEYXRhID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEgIT09IDApIHsgLy8gMCBtZWFucyBcImFscmVhZHkgaW5zdGFsbGVkXCIuXG5cbiBcdFx0XHQvLyBhIFByb21pc2UgbWVhbnMgXCJjdXJyZW50bHkgbG9hZGluZ1wiLlxuIFx0XHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSkge1xuIFx0XHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDaHVua0RhdGFbMl0pO1xuIFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHQvLyBzZXR1cCBQcm9taXNlIGluIGNodW5rIGNhY2hlXG4gXHRcdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdFx0XHRpbnN0YWxsZWRDaHVua0RhdGEgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSBbcmVzb2x2ZSwgcmVqZWN0XTtcbiBcdFx0XHRcdH0pO1xuIFx0XHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDaHVua0RhdGFbMl0gPSBwcm9taXNlKTtcblxuIFx0XHRcdFx0Ly8gc3RhcnQgY2h1bmsgbG9hZGluZ1xuIFx0XHRcdFx0dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuIFx0XHRcdFx0dmFyIG9uU2NyaXB0Q29tcGxldGU7XG5cbiBcdFx0XHRcdHNjcmlwdC5jaGFyc2V0ID0gJ3V0Zi04JztcbiBcdFx0XHRcdHNjcmlwdC50aW1lb3V0ID0gMTIwO1xuIFx0XHRcdFx0aWYgKF9fd2VicGFja19yZXF1aXJlX18ubmMpIHtcbiBcdFx0XHRcdFx0c2NyaXB0LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIF9fd2VicGFja19yZXF1aXJlX18ubmMpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0c2NyaXB0LnNyYyA9IGpzb25wU2NyaXB0U3JjKGNodW5rSWQpO1xuXG4gXHRcdFx0XHQvLyBjcmVhdGUgZXJyb3IgYmVmb3JlIHN0YWNrIHVud291bmQgdG8gZ2V0IHVzZWZ1bCBzdGFja3RyYWNlIGxhdGVyXG4gXHRcdFx0XHR2YXIgZXJyb3IgPSBuZXcgRXJyb3IoKTtcbiBcdFx0XHRcdG9uU2NyaXB0Q29tcGxldGUgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiBcdFx0XHRcdFx0Ly8gYXZvaWQgbWVtIGxlYWtzIGluIElFLlxuIFx0XHRcdFx0XHRzY3JpcHQub25lcnJvciA9IHNjcmlwdC5vbmxvYWQgPSBudWxsO1xuIFx0XHRcdFx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG4gXHRcdFx0XHRcdHZhciBjaHVuayA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdFx0XHRcdFx0aWYoY2h1bmsgIT09IDApIHtcbiBcdFx0XHRcdFx0XHRpZihjaHVuaykge1xuIFx0XHRcdFx0XHRcdFx0dmFyIGVycm9yVHlwZSA9IGV2ZW50ICYmIChldmVudC50eXBlID09PSAnbG9hZCcgPyAnbWlzc2luZycgOiBldmVudC50eXBlKTtcbiBcdFx0XHRcdFx0XHRcdHZhciByZWFsU3JjID0gZXZlbnQgJiYgZXZlbnQudGFyZ2V0ICYmIGV2ZW50LnRhcmdldC5zcmM7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci5tZXNzYWdlID0gJ0xvYWRpbmcgY2h1bmsgJyArIGNodW5rSWQgKyAnIGZhaWxlZC5cXG4oJyArIGVycm9yVHlwZSArICc6ICcgKyByZWFsU3JjICsgJyknO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IubmFtZSA9ICdDaHVua0xvYWRFcnJvcic7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci50eXBlID0gZXJyb3JUeXBlO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IucmVxdWVzdCA9IHJlYWxTcmM7XG4gXHRcdFx0XHRcdFx0XHRjaHVua1sxXShlcnJvcik7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IHVuZGVmaW5lZDtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fTtcbiBcdFx0XHRcdHZhciB0aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpe1xuIFx0XHRcdFx0XHRvblNjcmlwdENvbXBsZXRlKHsgdHlwZTogJ3RpbWVvdXQnLCB0YXJnZXQ6IHNjcmlwdCB9KTtcbiBcdFx0XHRcdH0sIDEyMDAwMCk7XG4gXHRcdFx0XHRzY3JpcHQub25lcnJvciA9IHNjcmlwdC5vbmxvYWQgPSBvblNjcmlwdENvbXBsZXRlO1xuIFx0XHRcdFx0ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRyZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuIFx0fTtcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9hc3NldHMvXCI7XG5cbiBcdC8vIG9uIGVycm9yIGZ1bmN0aW9uIGZvciBhc3luYyBsb2FkaW5nXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm9lID0gZnVuY3Rpb24oZXJyKSB7IGNvbnNvbGUuZXJyb3IoZXJyKTsgdGhyb3cgZXJyOyB9O1xuXG4gXHR2YXIganNvbnBBcnJheSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSB8fCBbXTtcbiBcdHZhciBvbGRKc29ucEZ1bmN0aW9uID0ganNvbnBBcnJheS5wdXNoLmJpbmQoanNvbnBBcnJheSk7XG4gXHRqc29ucEFycmF5LnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjaztcbiBcdGpzb25wQXJyYXkgPSBqc29ucEFycmF5LnNsaWNlKCk7XG4gXHRmb3IodmFyIGkgPSAwOyBpIDwganNvbnBBcnJheS5sZW5ndGg7IGkrKykgd2VicGFja0pzb25wQ2FsbGJhY2soanNvbnBBcnJheVtpXSk7XG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IG9sZEpzb25wRnVuY3Rpb247XG5cblxuIFx0Ly8gYWRkIGVudHJ5IG1vZHVsZSB0byBkZWZlcnJlZCBsaXN0XG4gXHRkZWZlcnJlZE1vZHVsZXMucHVzaChbXCIuL2Fzc2V0cy9qcy9wYWdlcy91c2VyL3Byb2ZpbGUuanNcIixcInZlbmRvcnN+YWxlcnRzX2xpc3R+YXBwfmRhc2hib2FyZC1wYWdlfmRhc2hib2FyZF9lbXB0eX5kYXNoYm9hcmRfZm9ybX5leHBvcnRfbGlzdH5mbG90X2NoYXJ0fmdyYXBoX2Z+ZmVkMjkwNTRcIixcInZlbmRvcnN+YWxlcnRzX2xpc3R+ZGFzaGJvYXJkLXBhZ2V+ZGFzaGJvYXJkX2VtcHR5fmRhc2hib2FyZF9mb3JtfmV4cG9ydF9saXN0fmZsb3RfY2hhcnR+Z3JhcGhfZm9ybX5+ZmUxMDJkZTZcIixcImFsZXJ0c19saXN0fmRhc2hib2FyZC1wYWdlfmRhc2hib2FyZF9lbXB0eX5kYXNoYm9hcmRfZm9ybX5leHBvcnRfbGlzdH5mbG90X2NoYXJ0fmdyYXBoX2Zvcm1+Z3JhcGhfbGl+ZjMyMGMzNGJcIl0pO1xuIFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiByZWFkeVxuIFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4iLCJleHBvcnQgZGVmYXVsdCBcIi9hc3NldHMvaW1hZ2VzL2NoZXZyb24tcmlnaHQuYmUzMjk1NTYuc3ZnXCI7IiwiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IEljb24sIEZvcm1GaWVsZCwgQnV0dG9uLCBDb2xvcnMgfSBmcm9tIFwiLi4vLi4vY29tcG9uZW50c1wiO1xuXG5jb25zdCBDT0xVTU5fVFlQRV9MSVNUID0gd2luZG93LmNsaWNraG91c2VUeXBlcztcbmNvbnN0IFJFR0VYX1NQRUNJQUxfQ0hBUkFDVEVSUyA9IC9bIUAjJCVeJiooKStcXC09XFxbXFxde307JzpcIlxcXFx8LC48PlxcLz9dKy87XG5jb25zdCBEVVBMSUNBVEVfRklFTERfRVJST1IgPSBcIkR1cGxpY2F0ZSBjb2x1bW4gbmFtZSBlcnJvclwiO1xuY29uc3QgU1BFQ0lBTF9DSEFSQUNURVJTX0VSUk9SID0gXCJDb2x1bW4gbmFtZSBzaG91bGQgbm90IGNvbnRhaW4gc3BlY2lhbCBjaGFyYWN0ZXJzXCI7XG5jb25zdCBCTEFOS19TUEFDRV9FUlJPUiA9IFwiQ29sdW1uIG5hbWUgbm90IGNvbnRhaW4gYmxhbmsgc3BhY2VcIjtcblxuY29uc3QgVGFibGVEZXRhaWxSb3cgPSAoe1xuICAgIGNvbHVtbnMsXG4gICAgY29sdW1uLFxuICAgIHBvc2l0aW9uLFxuICAgIG9uRmllbGRDaGFuZ2UsXG4gICAgb25GaWVsZEJsdXIsXG4gICAgZXJyb3JNZXNzYWdlLFxuICAgIGRpc2FibGVkLFxuICAgIG9uUmVtb3ZlQ29sdW1uQ2xpY2tlZCxcbn0pID0+IHtcbiAgICBjb25zdCB7IG5hbWUsIHR5cGUsIGlzRGlzYWJsZUVkaXQgfSA9IGNvbHVtbjtcblxuICAgIGNvbnN0IGlzRGlzYWJsZUZpZWxkID0gaXNEaXNhYmxlRWRpdCB8fCBkaXNhYmxlZDtcblxuICAgIGNvbnN0IG9uSW5wdXRCbHVyID0gKHsgbmFtZSwgdmFsdWUgfSkgPT4ge1xuICAgICAgICBsZXQgZXJyb3IgPSBudWxsO1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlSXNFeGlzdCA9ICEhY29sdW1ucy5maW5kKFxuICAgICAgICAgICAgICAgIChpdGVtLCBpbmRleCkgPT4gaW5kZXggIT09IHBvc2l0aW9uICYmIGl0ZW0ubmFtZSA9PT0gdmFsdWVcbiAgICAgICAgICAgICk/Lm5hbWU7XG5cbiAgICAgICAgICAgIGxldCBlcnJvck1lc3NhZ2UgPSBcIlwiO1xuXG4gICAgICAgICAgICBpZiAodmFsdWVJc0V4aXN0KSB7XG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlID0gRFVQTElDQVRFX0ZJRUxEX0VSUk9SO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodmFsdWUuaW5kZXhPZihcIiBcIikgPj0gMCkge1xuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZSA9IGVycm9yTWVzc2FnZVxuICAgICAgICAgICAgICAgICAgICA/IGAke2Vycm9yTWVzc2FnZX0gYW5kICR7QkxBTktfU1BBQ0VfRVJST1J9YFxuICAgICAgICAgICAgICAgICAgICA6IEJMQU5LX1NQQUNFX0VSUk9SO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoUkVHRVhfU1BFQ0lBTF9DSEFSQUNURVJTLnRlc3QodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlID0gZXJyb3JNZXNzYWdlXG4gICAgICAgICAgICAgICAgICAgID8gYCR7ZXJyb3JNZXNzYWdlfSBhbmQgJHtTUEVDSUFMX0NIQVJBQ1RFUlNfRVJST1J9YFxuICAgICAgICAgICAgICAgICAgICA6IFNQRUNJQUxfQ0hBUkFDVEVSU19FUlJPUjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGVycm9yTWVzc2FnZSkge1xuICAgICAgICAgICAgICAgIGVycm9yID0ge1xuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbixcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBvbkZpZWxkQmx1cihwb3NpdGlvbiwgZXJyb3IpO1xuICAgIH07XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8dHI+XG4gICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicHMtMFwiIHN0eWxlPXt7IHdpZHRoOiBcIjcwJVwiIH19PlxuICAgICAgICAgICAgICAgIDxGb3JtRmllbGRcbiAgICAgICAgICAgICAgICAgICAgZmllbGROYW1lPVwibmFtZVwiXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXtuYW1lfVxuICAgICAgICAgICAgICAgICAgICBpc0hpZGRlbkxhYmVsPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17aXNEaXNhYmxlRmllbGR9XG4gICAgICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZT17ZXJyb3JNZXNzYWdlfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IG9uRmllbGRDaGFuZ2UocG9zaXRpb24sIGUudGFyZ2V0KX1cbiAgICAgICAgICAgICAgICAgICAgb25CbHVyPXsoZSkgPT4gb25JbnB1dEJsdXIoZS50YXJnZXQpfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHdpZHRoOiBcIjI1JVwiIH19PlxuICAgICAgICAgICAgICAgIDxGb3JtRmllbGRcbiAgICAgICAgICAgICAgICAgICAgZmllbGROYW1lPVwidHlwZVwiXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtpc0Rpc2FibGVGaWVsZH1cbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3R5cGV9XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJzZWxlY3RcIlxuICAgICAgICAgICAgICAgICAgICBpc0hpZGRlbkxhYmVsPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IG9uRmllbGRDaGFuZ2UocG9zaXRpb24sIGUudGFyZ2V0KX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJcIj5TZWxlY3QgdHlwZTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICB7Q09MVU1OX1RZUEVfTElTVC5tYXAoKGl0ZW0sIGtleSkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiBrZXk9e2tleX0gdmFsdWU9e2l0ZW19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtpdGVtfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgIDwvRm9ybUZpZWxkPlxuICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJwZS0wXCIgc3R5bGU9e3sgd2lkdGg6IFwiNSVcIiB9fT5cbiAgICAgICAgICAgICAgICB7IWlzRGlzYWJsZUZpZWxkICYmIChcbiAgICAgICAgICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgb3V0bGluZUNvbG9yPXtDb2xvcnMucmVkfVxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2NvbHVtbnMubGVuZ3RoIDwgMn1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e29uUmVtb3ZlQ29sdW1uQ2xpY2tlZH1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEljb24gZGF0YUZlYXRoZXI9XCJ0cmFzaC0yXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgIDwvdHI+XG4gICAgKTtcbn07XG5cbmV4cG9ydCBjb25zdCBUYWJsZUNvbHVtbiA9ICh7XG4gICAgY29sdW1uczogcGFzc2VkQ29sdW1ucyxcbiAgICBzZXRDb2x1bW5OYW1lV2lsbFJlbW92ZSxcbiAgICBpc0VuYWJsZVNhdmVDaGFuZ2VzTW9kYWwsXG4gICAgb25GaWVsZENoYW5nZSxcbiAgICBvbkZpZWxkQmx1cixcbiAgICBhZGROZXdDb2x1bW4sXG4gICAgZXJyb3JzLFxufSkgPT4ge1xuICAgIGNvbnN0IFtjb2x1bW5zLCBzZXRDb2x1bW5zXSA9IHVzZVN0YXRlKFtdKTtcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBzZXRDb2x1bW5zKHBhc3NlZENvbHVtbnMpO1xuICAgIH0sIFtwYXNzZWRDb2x1bW5zXSk7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPD5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGFibGUtaGVhZGVyIGQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtYmV0d2VlbiBtdC0zXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZnctYm9sZFwiPkNvbHVtbnM8L3NwYW4+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLWxpbmsgdGV4dC1wcmltYXJ5XCIgb25DbGljaz17KCkgPT4gYWRkTmV3Q29sdW1uKCl9PlxuICAgICAgICAgICAgICAgICAgICA8SWNvbiBkYXRhRmVhdGhlcj1cInBsdXNcIiBjbGFzc05hbWU9XCJtZS0yIGZlYXRoZXItc21cIiAvPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJkLWlubGluZS1ibG9jayBhbGlnbi1taWRkbGUgZnctYm9sZFwiPkFkZCBDb2x1bW48L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJ0YWJsZSB0YWJsZS1ib3JkZXJsZXNzXCI+XG4gICAgICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwicC0wIGZ3LW1lZGl1bSBib3JkZXItMFwiPk5hbWU8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInAtMCBmdy1tZWRpdW0gYm9yZGVyLTBcIj5UeXBlPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJib3JkZXItMFwiPjwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAgICAgIHtjb2x1bW5zICYmIGNvbHVtbnMubGVuZ3RoID4gMFxuICAgICAgICAgICAgICAgICAgICAgICAgPyBjb2x1bW5zLm1hcCgoaXRlbSwga2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBlcnJvck9iaiA9IGVycm9ycy5maW5kKChpdGVtKSA9PiBpdGVtLnBvc2l0aW9uID09PSBrZXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGFibGVEZXRhaWxSb3dcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1ucz17Y29sdW1uc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlPXtlcnJvck9iaj8uZXJyb3JNZXNzYWdlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW49e2l0ZW19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbj17a2V5fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17aXNFbmFibGVTYXZlQ2hhbmdlc01vZGFsfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkZpZWxkQ2hhbmdlPXtvbkZpZWxkQ2hhbmdlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkZpZWxkQmx1cj17b25GaWVsZEJsdXJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uUmVtb3ZlQ29sdW1uQ2xpY2tlZD17KCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldENvbHVtbk5hbWVXaWxsUmVtb3ZlKHsgLi4uaXRlbSwgcG9zaXRpb246IGtleSB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICA6IG51bGx9XG4gICAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgIDwvPlxuICAgICk7XG59O1xuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IEJ1dHRvbiwgRm9ybUZpZWxkLCBJY29uLCBTcGlubmVyIH0gZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvXCI7XG5pbXBvcnQgaXNFcXVhbCBmcm9tIFwibG9kYXNoL2lzRXF1YWxcIjtcbmltcG9ydCBEYXRhYmFzZUFjdGlvbnMgZnJvbSBcIi4uLy4uL2FjdGlvbnMvX2RhdGFiYXNlLWFjdGlvbnNcIjtcbmltcG9ydCB7IE1vZGFsLCBDb2xvcnMgfSBmcm9tIFwiLi4vLi4vY29tcG9uZW50c1wiO1xuaW1wb3J0IHsgU2l6ZSB9IGZyb20gXCIuLi8uLi9jb21wb25lbnRzL19zaXplXCI7XG5pbXBvcnQgeyBUT0FTVF9TVEFUVVMgfSBmcm9tIFwiLi4vLi4vdXRpbHNcIjtcbmltcG9ydCB7IFRhYmxlQ29sdW1uIH0gZnJvbSBcIi4vdGFibGUtY29sdW1uc1wiO1xuaW1wb3J0IHsgQ29sb3IgfSBmcm9tIFwicmVhY3QtaW5wdXQtY29sb3JcIjtcblxuY29uc3QgREVGQVVMVF9DT0xVTU5fREFUQSA9IHtcbiAgICBuYW1lOiBcIlwiLFxuICAgIHR5cGU6IFwiU3RyaW5nXCIsXG59O1xuXG5jb25zdCBBbGVydFVwZGF0ZUNvbHVtbiA9ICh7XG4gICAgbmFtZSxcbiAgICBpc1Nob3csXG4gICAgY29sdW1ucyxcbiAgICBvbkhpZGRlbixcbiAgICBvblVwZGF0ZVRhYmxlQ2xpY2ssXG4gICAgcGFzc2VkVGFibGVOYW1lLFxuICAgIHRhYmxlTmFtZSxcbn0pID0+IHtcbiAgICBjb25zdCBjb25maXJtTWVzc2FnZXMgPSBjb2x1bW5zLnJlZHVjZSgoYXJyLCBpdGVtKSA9PiB7XG4gICAgICAgIGNvbnN0IHsgb3JpZ2luTmFtZSwgbmFtZSwgdHlwZSwgb3JpZ2luVHlwZSB9ID0gaXRlbTtcblxuICAgICAgICBpZiAoIW9yaWdpbk5hbWUpIHtcbiAgICAgICAgICAgIGFyci5wdXNoKGBDcmVhdGUgbmV3IGNvbHVtbiBcIiR7bmFtZX1cIiB3aXRoIHR5cGUgXCIke3R5cGV9XCJgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChvcmlnaW5OYW1lICE9PSBuYW1lKSB7XG4gICAgICAgICAgICAgICAgYXJyLnB1c2goYENvbHVtbiBmcm9tIFwiJHtvcmlnaW5OYW1lfVwiIHRvIFwiJHtuYW1lfVwiYCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChvcmlnaW5UeXBlICE9PSB0eXBlKSB7XG4gICAgICAgICAgICAgICAgYXJyLnB1c2goYENvbHVtbiBmcm9tIFwiJHtvcmlnaW5UeXBlfVwiIHRvIFwiJHt0eXBlfVwiYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYXJyO1xuICAgIH0sIFtdKTtcblxuICAgIGlmICh0YWJsZU5hbWUgIT09IHBhc3NlZFRhYmxlTmFtZSkge1xuICAgICAgICBjb25maXJtTWVzc2FnZXMudW5zaGlmdChgVGFibGUgbmFtZSBmcm9tIFwiJHtwYXNzZWRUYWJsZU5hbWV9XCIgdG8gXCIke3RhYmxlTmFtZX1cImApO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICAgIDxNb2RhbFxuICAgICAgICAgICAgaWQ9e2B1cGRhdGUtY29sdW1uLSR7bmFtZX1gfVxuICAgICAgICAgICAgc2l6ZT17U2l6ZS5tZWRpdW19XG4gICAgICAgICAgICB0aXRsZT17YFVwZGF0ZSB0YWJsZSAke25hbWV9YH1cbiAgICAgICAgICAgIHNob3c9e2lzU2hvd31cbiAgICAgICAgICAgIG9uSGlkZGVuPXtvbkhpZGRlbn1cbiAgICAgICAgICAgIGNsb3NlQnV0dG9uQWN0aW9uPXtvbkhpZGRlbn1cbiAgICAgICAgICAgIHNhdmVCdXR0b25UaXRsZT1cIlNhdmUgQ2hhbmdlc1wiXG4gICAgICAgICAgICBzaG93U2F2ZUJ1dHRvbj17dHJ1ZX1cbiAgICAgICAgICAgIHNhdmVCdXR0b25Db2xvcj17Q29sb3JzLmJsdWV9XG4gICAgICAgICAgICBzYXZlQnV0dG9uQWN0aW9uPXtvblVwZGF0ZVRhYmxlQ2xpY2t9XG4gICAgICAgID5cbiAgICAgICAgICAgIDxwPkFyZSB5b3Ugc3VyZSB0byBjaGFuZ2UgdGFibGUgc3RydWN0dXJlPzwvcD5cbiAgICAgICAgICAgIHtjb25maXJtTWVzc2FnZXMubWFwKChpdGVtLCBpbmRleCkgPT4gKFxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImQtYmxvY2sgdGV4dC1icmVha1wiIGtleT17aW5kZXh9PlxuICAgICAgICAgICAgICAgICAgICB7aXRlbX1cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgPC9Nb2RhbD5cbiAgICApO1xufTtcblxuY29uc3QgQWxlcnRSZW1vdmVDb2x1bW4gPSAoeyBjb2x1bW5OYW1lLCBpc1Nob3csIG9uSGlkZGVuLCBvbkNvbmZpcm1SZW1vdmVDb2x1bW5DbGljayB9KSA9PiAoXG4gICAgPE1vZGFsXG4gICAgICAgIGlkPXtgcmVtb3ZlLWNvbHVtbi0ke2NvbHVtbk5hbWV9YH1cbiAgICAgICAgc2l6ZT17U2l6ZS5tZWRpdW19XG4gICAgICAgIHRpdGxlPXtgRGVsZXRlIFwiJHtjb2x1bW5OYW1lfVwiIGNvbHVtbmB9XG4gICAgICAgIHNob3c9e2lzU2hvd31cbiAgICAgICAgb25IaWRkZW49e29uSGlkZGVufVxuICAgICAgICBjbG9zZUJ1dHRvbkFjdGlvbj17b25IaWRkZW59XG4gICAgICAgIHNhdmVCdXR0b25UaXRsZT1cIkNvbmZpcm0gRGVsZXRlXCJcbiAgICAgICAgc2hvd1NhdmVCdXR0b249e3RydWV9XG4gICAgICAgIHNhdmVCdXR0b25Db2xvcj17Q29sb3JzLnJlZH1cbiAgICAgICAgc2F2ZUJ1dHRvbkFjdGlvbj17KCkgPT4gb25Db25maXJtUmVtb3ZlQ29sdW1uQ2xpY2soY29sdW1uTmFtZSl9XG4gICAgPlxuICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWRhbmdlclwiPlxuICAgICAgICAgICAgQmUgY2FyZWZ1bCAtIHRoaXMgd2lsbCBhbHNvIGRlbGV0ZSB0aGUgY29sdW1uIGluIGNsaWNraG91c2UgdGFibGUhXG4gICAgICAgIDwvcD5cbiAgICA8L01vZGFsPlxuKTtcblxuY29uc3QgQWxlcnREZWxldGVUYWJsZSA9ICh7IHRhYmxlTmFtZSwgb25Db25maXJtRGVsZXRlVGFibGUsIG9uSGlkZGVuIH0pID0+IHtcbiAgICByZXR1cm4gKFxuICAgICAgICA8TW9kYWxcbiAgICAgICAgICAgIHNpemU9e1NpemUubWVkaXVtfVxuICAgICAgICAgICAgaWQ9e1wiZGVsZXRlLXRhYmxlXCJ9XG4gICAgICAgICAgICB0aXRsZT17YERlbGV0aW5nIHRhYmxlICR7dGFibGVOYW1lfWB9XG4gICAgICAgICAgICBzaG93Q2xvc2VCdXR0b249e3RydWV9XG4gICAgICAgICAgICBjbG9zZUJ1dHRvblRpdGxlPVwiQ2FuY2VsXCJcbiAgICAgICAgICAgIHNob3dTYXZlQnV0dG9uPXt0cnVlfVxuICAgICAgICAgICAgc2F2ZUJ1dHRvblRpdGxlPVwiRGVsZXRlIHRhYmxlXCJcbiAgICAgICAgICAgIHNhdmVCdXR0b25Db2xvcj1cImRhbmdlclwiXG4gICAgICAgICAgICBzYXZlQnV0dG9uQWN0aW9uPXsoKSA9PiBvbkNvbmZpcm1EZWxldGVUYWJsZSh0YWJsZU5hbWUpfVxuICAgICAgICAgICAgY2xvc2VCdXR0b25BY3Rpb249eygpID0+IG9uSGlkZGVuKCl9XG4gICAgICAgICAgICBzaG93PXshIXRhYmxlTmFtZX1cbiAgICAgICAgICAgIG9uSGlkZGVuPXtvbkhpZGRlbn1cbiAgICAgICAgPlxuICAgICAgICAgICAgQmUgY2FyZWZ1bCAtIHRoaXMgd2lsbCBhbHNvIGRlbGV0ZSB0aGUgdGFibGUgaW4gY2xpY2tob3VzZSBkYXRhYmFzZSFcbiAgICAgICAgPC9Nb2RhbD5cbiAgICApO1xufTtcblxuZXhwb3J0IGNvbnN0IERhdGFiYXNlVGFibGVEZXRhaWwgPSAoe1xuICAgIHRhYmxlTmFtZTogcGFzc2VkVGFibGVOYW1lLFxuICAgIHNldE5ld1RhYmxlTmFtZSxcbiAgICBzZXRUb2FzdE1lc3NhZ2UsXG4gICAgb25EZWxldGVUYWJsZSxcbn0pID0+IHtcbiAgICBjb25zdCBbdGFibGVOYW1lLCBzZXRUYWJsZU5hbWVdID0gdXNlU3RhdGUocGFzc2VkVGFibGVOYW1lKTtcbiAgICBjb25zdCBbb3JpZ2luQ29sdW1uRGF0YSwgc2V0T3JpZ2luQ29sdW1uRGF0YV0gPSB1c2VTdGF0ZShbXSk7XG4gICAgY29uc3QgW2NvbHVtbnMsIHNldENvbHVtbnNdID0gdXNlU3RhdGUoW10pO1xuICAgIGNvbnN0IFtpc0VuYWJsZVNhdmVDaGFuZ2VzTW9kYWwsIHNldElzRW5hYmxlU2F2ZUNoYW5nZXNNb2RhbF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gICAgY29uc3QgW2Vycm9ycywgc2V0RXJyb3JdID0gdXNlU3RhdGUoW10pO1xuICAgIGNvbnN0IFtpc0xvYWRpbmcsIHNldElzTG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gICAgY29uc3QgW2NvbHVtbk5hbWVXaWxsUmVtb3ZlLCBzZXRDb2x1bW5OYW1lV2lsbFJlbW92ZV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgICBjb25zdCBbdGFibGVXaWxsUmVtb3ZlLCBzZXRUYWJsZVdpbGxSZW1vdmVdID0gdXNlU3RhdGUoXCJcIik7XG5cbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBzZXRUYWJsZU5hbWUocGFzc2VkVGFibGVOYW1lKTtcbiAgICAgICAgc2V0SXNMb2FkaW5nKHRydWUpO1xuXG4gICAgICAgIGNvbnN0IGxvYWRUYWJsZUNvbHVtbnMgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoIXBhc3NlZFRhYmxlTmFtZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IERhdGFiYXNlQWN0aW9ucy5nZXRUYWJsZUNvbHVtbnMocGFzc2VkVGFibGVOYW1lKTtcbiAgICAgICAgICAgIGNvbnN0IHsgZGF0YSwgZXJyb3IgfSA9IHJlcztcbiAgICAgICAgICAgIGlmICghZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjb2x1bW5MaXN0ID0gZGF0YS5tYXAoKGl0ZW0pID0+ICh7XG4gICAgICAgICAgICAgICAgICAgIC4uLml0ZW0sXG4gICAgICAgICAgICAgICAgICAgIG9yaWdpbk5hbWU6IGl0ZW0ubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luVHlwZTogaXRlbS50eXBlLFxuICAgICAgICAgICAgICAgICAgICBpc0Rpc2FibGVFZGl0OiBbXCJ0aW1lc3RhbXBcIiwgXCJfaWRcIl0uaW5jbHVkZXMoaXRlbS5uYW1lKSxcbiAgICAgICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgICAgICBzZXRPcmlnaW5Db2x1bW5EYXRhKGNvbHVtbkxpc3QpO1xuICAgICAgICAgICAgICAgIHNldENvbHVtbnMoY29sdW1uTGlzdCk7XG4gICAgICAgICAgICAgICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBsb2FkVGFibGVDb2x1bW5zKCk7XG5cbiAgICAgICAgc2V0RXJyb3IoW10pO1xuICAgIH0sIFtwYXNzZWRUYWJsZU5hbWVdKTtcblxuICAgIGNvbnN0IG9uRmllbGRDaGFuZ2UgPSAoaW5kZXgsIHsgbmFtZSwgdmFsdWUgfSkgPT4ge1xuICAgICAgICBzZXRDb2x1bW5zKChjb2x1bW5MaXN0KSA9PiB7XG4gICAgICAgICAgICBsZXQgY2xvbmVDb2x1bW5MaXN0ID0gWy4uLmNvbHVtbkxpc3RdO1xuICAgICAgICAgICAgbGV0IGNsb25lQ29sdW1uSXRlbUNoYW5nZSA9IHsgLi4uY2xvbmVDb2x1bW5MaXN0W2luZGV4XSB9O1xuICAgICAgICAgICAgY2xvbmVDb2x1bW5JdGVtQ2hhbmdlW25hbWVdID0gdmFsdWU7XG4gICAgICAgICAgICBjbG9uZUNvbHVtbkxpc3RbaW5kZXhdID0geyAuLi5jbG9uZUNvbHVtbkl0ZW1DaGFuZ2UgfTtcbiAgICAgICAgICAgIHJldHVybiBbLi4uY2xvbmVDb2x1bW5MaXN0XTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IG5ld0Vycm9ycyA9IFsuLi5lcnJvcnNdLmZpbHRlcigoaXRlbSkgPT4gaXRlbS5wb3NpdGlvbiAhPT0gaW5kZXgpO1xuICAgICAgICBzZXRFcnJvcihbLi4ubmV3RXJyb3JzXSk7XG4gICAgfTtcblxuICAgIGNvbnN0IG9uRmllbGRCbHVyID0gKHBvc2l0aW9uLCBlcnJvcikgPT4ge1xuICAgICAgICBsZXQgbmV3RXJyb3JzID0gWy4uLmVycm9yc10uZmlsdGVyKChpdGVtKSA9PiBpdGVtLnBvc2l0aW9uICE9PSBwb3NpdGlvbik7XG5cbiAgICAgICAgaWYgKGVycm9yKSBuZXdFcnJvcnMucHVzaChlcnJvcik7XG5cbiAgICAgICAgc2V0RXJyb3IobmV3RXJyb3JzKTtcbiAgICB9O1xuXG4gICAgY29uc3Qgb25TdWJtaXRVcGRhdGVUYWJsZSA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc3QgZGF0YVBheWxvYWQgPSB7XG4gICAgICAgICAgICBuYW1lOiB0YWJsZU5hbWUsXG4gICAgICAgICAgICBjb2x1bW5zOiBjb2x1bW5zLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgbmFtZSwgb3JpZ2luTmFtZSwgdHlwZSB9ID0gaXRlbTtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgICAgICAgICBvcmlnaW46IG9yaWdpbk5hbWUsXG4gICAgICAgICAgICAgICAgICAgIHR5cGUsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBEYXRhYmFzZUFjdGlvbnMuY3JlYXRlT3JVcGRhdGUocGFzc2VkVGFibGVOYW1lLCBkYXRhUGF5bG9hZCk7XG4gICAgICAgIGF3YWl0IHNldElzRW5hYmxlU2F2ZUNoYW5nZXNNb2RhbChmYWxzZSk7XG4gICAgICAgIGlmICghcmVzLmVycm9yKSB7XG4gICAgICAgICAgICBjb25zdCBuZXdDb2x1bW5zID0gY29sdW1ucy5tYXAoKGl0ZW0pID0+ICh7XG4gICAgICAgICAgICAgICAgLi4uaXRlbSxcbiAgICAgICAgICAgICAgICBvcmlnaW5UeXBlOiBpdGVtLnR5cGUsXG4gICAgICAgICAgICAgICAgb3JpZ2luTmFtZTogaXRlbS5uYW1lLFxuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgc2V0Q29sdW1ucyhbLi4ubmV3Q29sdW1uc10pO1xuICAgICAgICAgICAgc2V0T3JpZ2luQ29sdW1uRGF0YShbLi4ubmV3Q29sdW1uc10pO1xuICAgICAgICAgICAgaWYgKHBhc3NlZFRhYmxlTmFtZSAhPT0gdGFibGVOYW1lKSB7XG4gICAgICAgICAgICAgICAgc2V0TmV3VGFibGVOYW1lKHBhc3NlZFRhYmxlTmFtZSwgdGFibGVOYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNldFRvYXN0TWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgY29sb3I6IFRPQVNUX1NUQVRVUy5zdWNjZXNzLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiVXBkYXRlIHRhYmxlIHN1Y2Nlc3NmdWwuXCIsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNldFRvYXN0TWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgY29sb3I6IFRPQVNUX1NUQVRVUy5mYWlsZWQsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogcmVzLm1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgdGltZW91dENsb3NlVG9hc3Q6IDQwMDAsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBvbkNvbmZpcm1SZW1vdmVDb2x1bW5DbGljayA9IGFzeW5jIChjb2x1bW5OYW1lKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IERhdGFiYXNlQWN0aW9ucy5kZWxldGVDb2x1bW4odGFibGVOYW1lLCBjb2x1bW5OYW1lKTtcbiAgICAgICAgY29uc3QgeyBlcnJvciB9ID0gcmVzO1xuICAgICAgICBpZiAoIWVycm9yKSB7XG4gICAgICAgICAgICBjb25zdCBuZXdDb2x1bW5zID0gWy4uLmNvbHVtbnNdO1xuICAgICAgICAgICAgY29uc3Qga2V5ID0gbmV3Q29sdW1ucy5maW5kSW5kZXgoKGVsKSA9PiBlbC5uYW1lID09PSBjb2x1bW5OYW1lKTtcbiAgICAgICAgICAgIG5ld0NvbHVtbnMuc3BsaWNlKGtleSwgMSk7XG4gICAgICAgICAgICBzZXRDb2x1bW5zKFsuLi5uZXdDb2x1bW5zXSk7XG4gICAgICAgICAgICBzZXRPcmlnaW5Db2x1bW5EYXRhKFsuLi5uZXdDb2x1bW5zXSk7XG4gICAgICAgICAgICBzZXRDb2x1bW5OYW1lV2lsbFJlbW92ZShcIlwiKTtcbiAgICAgICAgICAgIHNldFRvYXN0TWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgY29sb3I6IFRPQVNUX1NUQVRVUy5zdWNjZXNzLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHJlcy5tZXNzYWdlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZXRUb2FzdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgIGNvbG9yOiBUT0FTVF9TVEFUVVMuZmFpbGVkLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHJlcy5tZXNzYWdlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3Qgb25Db25maXJtRGVsZXRlVGFibGUgPSBhc3luYyAodGFibGVOYW1lLCBvbkRlbGV0ZVRhYmxlKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IERhdGFiYXNlQWN0aW9ucy5kZWxldGVUYWJsZSh0YWJsZU5hbWUpO1xuICAgICAgICBjb25zdCB7IGVycm9yIH0gPSByZXM7XG4gICAgICAgIGlmICghZXJyb3IpIHtcbiAgICAgICAgICAgIHNldFRhYmxlV2lsbFJlbW92ZShcIlwiKTtcbiAgICAgICAgICAgIHNldFRvYXN0TWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgY29sb3I6IFRPQVNUX1NUQVRVUy5zdWNjZXNzLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHJlcy5tZXNzYWdlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBvbkRlbGV0ZVRhYmxlKHRhYmxlTmFtZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZXRUb2FzdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgIGNvbG9yOiBUT0FTVF9TVEFUVVMuZmFpbGVkLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHJlcy5tZXNzYWdlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3Qgb25SZW1vdmVDb2x1bW5DbGljayA9IChjb2x1bW4pID0+IHtcbiAgICAgICAgaWYgKGNvbHVtbi5vcmlnaW5OYW1lKSB7XG4gICAgICAgICAgICBzZXRDb2x1bW5OYW1lV2lsbFJlbW92ZShjb2x1bW4ubmFtZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbmV3Q29sdW1ucyA9IFsuLi5jb2x1bW5zXTtcbiAgICAgICAgbmV3Q29sdW1ucy5zcGxpY2UoY29sdW1uLnBvc2l0aW9uLCAxKTtcbiAgICAgICAgc2V0Q29sdW1ucyhbLi4ubmV3Q29sdW1uc10pO1xuICAgIH07XG5cbiAgICBjb25zdCBhZGROZXdDb2x1bW4gPSAoKSA9PiB7XG4gICAgICAgIHNldENvbHVtbnMoWy4uLmNvbHVtbnMsIHsgLi4uREVGQVVMVF9DT0xVTU5fREFUQSB9XSk7XG4gICAgICAgIHNldFRvYXN0TWVzc2FnZSh7XG4gICAgICAgICAgICBjb2xvcjogVE9BU1RfU1RBVFVTLnN1Y2Nlc3MsXG4gICAgICAgICAgICBtZXNzYWdlOiBcIkFkZCBjb2x1bW4gc3VjY2Vzc2Z1bC5cIixcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGNvbnN0IGlzRW5hYmxlU2F2ZUNoYW5nZXMgPVxuICAgICAgICAhaXNFcXVhbChwYXNzZWRUYWJsZU5hbWUsIHRhYmxlTmFtZSkgfHwgIWlzRXF1YWwob3JpZ2luQ29sdW1uRGF0YSwgY29sdW1ucyk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8PlxuICAgICAgICAgICAgeyFpc0xvYWRpbmcgPyAoXG4gICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0YWJsZS1kZXRhaWwgbXQtMyBtZS1jcC0zIG1zLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZC1mbGV4IGp1c3RpZnktY29udGVudC1iZXR3ZWVuIGFsaWduLWl0ZW1zLWVuZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0YWJsZU5hbWUgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUZpZWxkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZE5hbWU9XCJ0YWJsZS1uYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctMjVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw9XCJUYWJsZSBuYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0YWJsZU5hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17aXNFbmFibGVTYXZlQ2hhbmdlc01vZGFsfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGFibGVOYW1lKGUudGFyZ2V0LnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFjdGlvbi1idXR0b25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0bGluZUNvbG9yPXtDb2xvcnMucmVkfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibWUtMlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRUYWJsZVdpbGxSZW1vdmUodGFibGVOYW1lKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEljb24gZGF0YUZlYXRoZXI9XCJ0cmFzaC0yXCIgY2xhc3NOYW1lPVwiZmVhdGhlci14cyBtZS0yXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImQtaW5saW5lLWJsb2NrIGFsaWduLW1pZGRsZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERlbGV0ZSBkYXRhdGFibGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldElzRW5hYmxlU2F2ZUNoYW5nZXNNb2RhbCh0cnVlKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXshaXNFbmFibGVTYXZlQ2hhbmdlcyB8fCBlcnJvcnMubGVuZ3RoID4gMH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgU2F2ZSBDaGFuZ2VzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8VGFibGVDb2x1bW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5zPXtjb2x1bW5zfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9ycz17ZXJyb3JzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldENvbHVtbk5hbWVXaWxsUmVtb3ZlPXsoY29sdW1uKSA9PiBvblJlbW92ZUNvbHVtbkNsaWNrKGNvbHVtbil9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNFbmFibGVTYXZlQ2hhbmdlc01vZGFsPXtpc0VuYWJsZVNhdmVDaGFuZ2VzTW9kYWx9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25GaWVsZENoYW5nZT17b25GaWVsZENoYW5nZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkZpZWxkQmx1cj17b25GaWVsZEJsdXJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkTmV3Q29sdW1uPXthZGROZXdDb2x1bW59XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPEFsZXJ0VXBkYXRlQ29sdW1uXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lPXt0YWJsZU5hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5zPXtjb2x1bW5zfVxuICAgICAgICAgICAgICAgICAgICAgICAgcGFzc2VkVGFibGVOYW1lPXtwYXNzZWRUYWJsZU5hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJsZU5hbWU9e3RhYmxlTmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlzU2hvdz17aXNFbmFibGVTYXZlQ2hhbmdlc01vZGFsfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25IaWRkZW49eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRJc0VuYWJsZVNhdmVDaGFuZ2VzTW9kYWwoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uVXBkYXRlVGFibGVDbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uU3VibWl0VXBkYXRlVGFibGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDxBbGVydFJlbW92ZUNvbHVtblxuICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uTmFtZT17Y29sdW1uTmFtZVdpbGxSZW1vdmV9XG4gICAgICAgICAgICAgICAgICAgICAgICBpc1Nob3c9eyEhY29sdW1uTmFtZVdpbGxSZW1vdmV9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkhpZGRlbj17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldENvbHVtbk5hbWVXaWxsUmVtb3ZlKFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ29uZmlybVJlbW92ZUNvbHVtbkNsaWNrPXtvbkNvbmZpcm1SZW1vdmVDb2x1bW5DbGlja31cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPEFsZXJ0RGVsZXRlVGFibGVcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYmxlTmFtZT17dGFibGVXaWxsUmVtb3ZlfVxuICAgICAgICAgICAgICAgICAgICAgICAgaXNTaG93PXshIXRhYmxlV2lsbFJlbW92ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uSGlkZGVuPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGFibGVXaWxsUmVtb3ZlKFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ29uZmlybURlbGV0ZVRhYmxlPXsodGFibGVOYW1lKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ29uZmlybURlbGV0ZVRhYmxlKHRhYmxlTmFtZSwgb25EZWxldGVUYWJsZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgPFNwaW5uZXIgLz5cbiAgICAgICAgICAgICl9XG4gICAgICAgIDwvPlxuICAgICk7XG59O1xuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IFNwaW5uZXIsIEljb24sIFRvYXN0LCBTaXplLCBNb2RhbCwgRm9ybUZpZWxkLCBCdXR0b24sIEltYWdlIH0gZnJvbSBcIi4uLy4uL2NvbXBvbmVudHNcIjtcbmltcG9ydCB7IERhdGFiYXNlQWN0aW9ucyB9IGZyb20gXCIuLi8uLi9hY3Rpb25zXCI7XG5pbXBvcnQgeyBEYXRhYmFzZVRhYmxlRGV0YWlsIH0gZnJvbSBcIi4vdGFibGUtZGV0YWlsc1wiO1xuaW1wb3J0IHsgVGFibGVDb2x1bW4gfSBmcm9tIFwiLi90YWJsZS1jb2x1bW5zXCI7XG5pbXBvcnQgeyBUT0FTVF9TVEFUVVMgfSBmcm9tIFwiLi4vLi4vdXRpbHNcIjtcbmltcG9ydCBDaGV2cm9uUmlnaHQgZnJvbSBcIi4uLy4uLy4uL2ltYWdlcy9jaGV2cm9uLXJpZ2h0LnN2Z1wiO1xuaW1wb3J0IFwiLi4vLi4vLi4vc3R5bGVzL3BhZ2VzL3RhYmxlcy5zY3NzXCI7XG5cbmNvbnN0IERFRkFVTFRfREFUQVRBQkxFX1ZBTFVFID0ge1xuICAgIHRhYmxlTmFtZTogXCJcIixcbiAgICB0dGw6IFwiXCIsXG59O1xuXG5jb25zdCBERUZBVUxUX0NPTFVNTlNfREFUQSA9IFt7IG5hbWU6IFwiXCIsIHR5cGU6IFwiU3RyaW5nXCIgfV07XG5cbmNvbnN0IENyZWF0ZURhdGFiYXNlVGFibGVNb2RhbCA9ICh7XG4gICAgaXNTaG93LFxuICAgIG9uSGlkZGVuLFxuICAgIG9uQ3JlYXRlRGF0YVRhYmxlU3VjY2VzcyxcbiAgICBzZXRUb2FzdE1lc3NhZ2UsXG59KSA9PiB7XG4gICAgY29uc3QgW2Vycm9ycywgc2V0RXJyb3JzXSA9IHVzZVN0YXRlKFtdKTtcbiAgICBjb25zdCBbZGF0YVRhYmxlLCBzZXREYXRhVGFibGVdID0gdXNlU3RhdGUoeyAuLi5ERUZBVUxUX0RBVEFUQUJMRV9WQUxVRSB9KTtcbiAgICBjb25zdCBbZGF0YVRhYmxlQ29sdW1ucywgc2V0RGF0YVRhYmxlQ29sdW1uc10gPSB1c2VTdGF0ZShbLi4uREVGQVVMVF9DT0xVTU5TX0RBVEFdKTtcbiAgICBjb25zdCBbaXNMb2FkaW5nLCBzZXRJc0xvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICAgIGNvbnN0IFtmaWVsZEVycm9ycywgc2V0RmllbGRFcnJvcnNdID0gdXNlU3RhdGUoKTtcblxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIHNldERhdGFUYWJsZSh7IC4uLkRFRkFVTFRfREFUQVRBQkxFX1ZBTFVFIH0pO1xuICAgICAgICBzZXREYXRhVGFibGVDb2x1bW5zKFsuLi5ERUZBVUxUX0NPTFVNTlNfREFUQV0pO1xuICAgICAgICBzZXRFcnJvcnMoW10pO1xuICAgICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xuICAgIH0sIFtpc1Nob3ddKTtcblxuICAgIGNvbnN0IG9uRmllbGRDaGFuZ2UgPSAoeyBuYW1lLCB2YWx1ZSB9LCBwb3NpdGlvbikgPT4ge1xuICAgICAgICBpZiAobmFtZSA9PT0gXCJ0eXBlXCIgfHwgbmFtZSA9PT0gXCJuYW1lXCIpIHtcbiAgICAgICAgICAgIGxldCBuZXdDb2x1bW5zID0gZGF0YVRhYmxlQ29sdW1ucy5tYXAoKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGVtcCA9IHsgLi4uaXRlbSB9O1xuICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PT0gcG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcFtuYW1lXSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGVtcDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc2V0RGF0YVRhYmxlQ29sdW1ucyhbLi4ubmV3Q29sdW1uc10pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2V0RGF0YVRhYmxlKHsgLi4uZGF0YVRhYmxlLCBbbmFtZV06IHZhbHVlIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgaXNFeGlzdEVycm9yID0gZXJyb3JzLmZpbmQoKGl0ZW0pID0+IGl0ZW0ucG9zaXRpb24gPT09IHBvc2l0aW9uKTtcblxuICAgICAgICBpZiAoaXNFeGlzdEVycm9yKSB7XG4gICAgICAgICAgICBjb25zdCBuZXdFcnJvcnMgPSBbLi4uZXJyb3JzXS5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0ucG9zaXRpb24gIT09IHBvc2l0aW9uKTtcbiAgICAgICAgICAgIHNldEVycm9ycyhbLi4ubmV3RXJyb3JzXSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZmllbGRFcnJvcnM/Lm5hbWUpIHtcbiAgICAgICAgICAgIHNldEZpZWxkRXJyb3JzKHtcbiAgICAgICAgICAgICAgICAuLi5maWVsZEVycm9ycyxcbiAgICAgICAgICAgICAgICBuYW1lOiBcIlwiLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgYWRkTmV3Q29sdW1uID0gKCkgPT4ge1xuICAgICAgICBzZXREYXRhVGFibGVDb2x1bW5zKFsuLi5kYXRhVGFibGVDb2x1bW5zLCB7IG5hbWU6IFwiXCIsIHR5cGU6IFwiU3RyaW5nXCIgfV0pO1xuICAgIH07XG5cbiAgICBjb25zdCBvbkZpZWxkQmx1ciA9IChwb3NpdGlvbiwgZXJyb3IpID0+IHtcbiAgICAgICAgbGV0IG5ld0Vycm9ycyA9IFsuLi5lcnJvcnNdLmZpbHRlcigoaXRlbSkgPT4gaXRlbS5wb3NpdGlvbiAhPT0gcG9zaXRpb24pO1xuXG4gICAgICAgIGlmIChlcnJvcikgbmV3RXJyb3JzLnB1c2goZXJyb3IpO1xuXG4gICAgICAgIHNldEVycm9ycyhuZXdFcnJvcnMpO1xuICAgIH07XG5cbiAgICBjb25zdCBzZXRDb2x1bW5OYW1lV2lsbFJlbW92ZSA9ICh7IHBvc2l0aW9uIH0pID0+IHtcbiAgICAgICAgc2V0RGF0YVRhYmxlQ29sdW1ucyhbLi4uZGF0YVRhYmxlQ29sdW1uc10uZmlsdGVyKChfLCBpbmRleCkgPT4gaW5kZXggIT09IHBvc2l0aW9uKSk7XG4gICAgfTtcblxuICAgIGNvbnN0IGNyZWF0ZU5ld0RhdGFUYWJsZSA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgc2V0SXNMb2FkaW5nKHRydWUpO1xuICAgICAgICBsZXQgdG9hc3RDb250ZW50ID0ge307XG4gICAgICAgIGNvbnN0IHsgdGFibGVOYW1lLCB0dGwgfSA9IGRhdGFUYWJsZTtcblxuICAgICAgICBjb25zdCBwYXlsb2FkID0ge1xuICAgICAgICAgICAgbmFtZTogdGFibGVOYW1lLFxuICAgICAgICAgICAgdHRsLFxuICAgICAgICAgICAgY29sdW1uczogZGF0YVRhYmxlQ29sdW1ucy5yZWR1Y2UoKGFyciwgaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChpdGVtLm5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgYXJyLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4uaXRlbSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9yaWdpbjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBhcnI7XG4gICAgICAgICAgICB9LCBbXSksXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IERhdGFiYXNlQWN0aW9ucy5jcmVhdGVPclVwZGF0ZShudWxsLCBwYXlsb2FkKTtcbiAgICAgICAgaWYgKCFyZXMuZXJyb3IpIHtcbiAgICAgICAgICAgIHRvYXN0Q29udGVudCA9IHsgY29sb3I6IFRPQVNUX1NUQVRVUy5zdWNjZXNzLCBtZXNzYWdlOiBcIkNyZWF0ZSBkYXRhdGFibGUgc3VjY2Vzc2Z1bC5cIiB9O1xuICAgICAgICAgICAgb25DcmVhdGVEYXRhVGFibGVTdWNjZXNzKHRhYmxlTmFtZSk7XG4gICAgICAgICAgICBvbkhpZGRlbigpO1xuICAgICAgICAgICAgc2V0VG9hc3RNZXNzYWdlKHRvYXN0Q29udGVudCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZXRGaWVsZEVycm9ycyh7IC4uLnJlcy5maWVsZHMgfSk7XG4gICAgICAgICAgICBpZiAocmVzLmZpZWxkcz8uY29sdW1ucykge1xuICAgICAgICAgICAgICAgIHNldEVycm9ycyhbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiByZXMuZmllbGRzPy5jb2x1bW5zLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XG4gICAgfTtcblxuICAgIGNvbnN0IHsgdGFibGVOYW1lLCB0dGwgfSA9IGRhdGFUYWJsZTtcbiAgICByZXR1cm4gKFxuICAgICAgICA8TW9kYWxcbiAgICAgICAgICAgIHNpemU9e1NpemUubGFyZ2V9XG4gICAgICAgICAgICBpZD1cImNyZWF0ZS1uZXctdGFibGVcIlxuICAgICAgICAgICAgdGl0bGU9XCJDcmVhdGUgYSBuZXcgZGF0YXRhYmxlXCJcbiAgICAgICAgICAgIHNob3dDbG9zZUJ1dHRvbj17ZmFsc2V9XG4gICAgICAgICAgICBpc1Bvc2l0aW9uQ2VudGVyPXt0cnVlfVxuICAgICAgICAgICAgc2hvdz17aXNTaG93fVxuICAgICAgICAgICAgb25IaWRkZW49e29uSGlkZGVufVxuICAgICAgICA+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm14LTNcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvdyBtYi0zXCI+XG4gICAgICAgICAgICAgICAgICAgIDxGb3JtRmllbGRcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImNvbC0xMiBjb2wtbWQtNlwiXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbD1cIlRhYmxlIG5hbWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgZmllbGROYW1lPVwidGFibGVOYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0YWJsZU5hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgICBpc01hbmRhdG9yeT17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtpc0xvYWRpbmd9XG4gICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cInRhYmxlIG5hbWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBvbkZpZWxkQ2hhbmdlKGUudGFyZ2V0KX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZT17ZmllbGRFcnJvcnM/Lm5hbWV9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgPEZvcm1GaWVsZFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiY29sLTEyIGNvbC1tZC02XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPVwiVGFibGUgVFRMXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkTmFtZT1cInR0bFwiXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dHRsfVxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2lzTG9hZGluZ31cbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwidGltZXN0YW1wICsgdG9JbnRlcnZhbE1vbnRoKDEwMClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBvbkZpZWxkQ2hhbmdlKGUudGFyZ2V0KX1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8VGFibGVDb2x1bW5cbiAgICAgICAgICAgICAgICAgICAgY29sdW1ucz17ZGF0YVRhYmxlQ29sdW1uc31cbiAgICAgICAgICAgICAgICAgICAgZXJyb3JzPXtlcnJvcnN9XG4gICAgICAgICAgICAgICAgICAgIHNldENvbHVtbk5hbWVXaWxsUmVtb3ZlPXtzZXRDb2x1bW5OYW1lV2lsbFJlbW92ZX1cbiAgICAgICAgICAgICAgICAgICAgaXNFbmFibGVTYXZlQ2hhbmdlc01vZGFsPXtpc0xvYWRpbmd9XG4gICAgICAgICAgICAgICAgICAgIG9uRmllbGRDaGFuZ2U9eyhwb3NpdGlvbiwgdGFyZ2V0KSA9PiBvbkZpZWxkQ2hhbmdlKHRhcmdldCwgcG9zaXRpb24pfVxuICAgICAgICAgICAgICAgICAgICBvbkZpZWxkQmx1cj17b25GaWVsZEJsdXJ9XG4gICAgICAgICAgICAgICAgICAgIGFkZE5ld0NvbHVtbj17YWRkTmV3Q29sdW1ufVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LTEwMFwiXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtlcnJvcnMubGVuZ3RoID4gMH1cbiAgICAgICAgICAgICAgICAgICAgaXNMb2FkaW5nPXtpc0xvYWRpbmd9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGNyZWF0ZU5ld0RhdGFUYWJsZSgpfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgQ3JlYXRlIERhdGF0YWJsZVxuICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvTW9kYWw+XG4gICAgKTtcbn07XG5cbmV4cG9ydCBjb25zdCBEYXRhYmFzZVRhYmxlcyA9ICgpID0+IHtcbiAgICBjb25zdCBbaXNMb2FkaW5nLCBzZXRJc0xvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICAgIGNvbnN0IFt0YWJsZXMsIHNldFRhYmxlTGlzdF0gPSB1c2VTdGF0ZShbXSk7XG4gICAgY29uc3QgW2N1cnJlbnRUYWJsZVNlbGVjdGVkLCBzZXRDdXJyZW50VGFibGVTZWxlY3RlZF0gPSB1c2VTdGF0ZShudWxsKTtcbiAgICBjb25zdCBbdG9hc3RDb250ZW50LCBzZXRUb2FzdENvbnRlbnRdID0gdXNlU3RhdGUoe30pO1xuICAgIGNvbnN0IFtpc1Nob3dDcmVhdGVEYXRhYmFzZVRhYmxlLCBzZXRJc1Nob3dDcmVhdGVEYXRhYmFzZVRhYmxlXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICAgIGNvbnN0IGxvYWREYXRhVGFibGVMaXN0ID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBEYXRhYmFzZUFjdGlvbnMuZ2V0QWxsVGFibGUoKTtcbiAgICAgICAgY29uc3QgeyBlcnJvciwgZGF0YSB9ID0gcmVzO1xuICAgICAgICBpZiAoIWVycm9yKSB7XG4gICAgICAgICAgICBzZXRUYWJsZUxpc3QoZGF0YSk7XG4gICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPiAwKSBzZXRDdXJyZW50VGFibGVTZWxlY3RlZChkYXRhWzBdKTtcbiAgICAgICAgfVxuICAgICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xuICAgIH07XG5cbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBzZXRJc0xvYWRpbmcodHJ1ZSk7XG4gICAgICAgIGxvYWREYXRhVGFibGVMaXN0KCk7XG4gICAgfSwgW10pO1xuXG4gICAgY29uc3Qgc2V0TmV3VGFibGVOYW1lID0gKG9yaWdpblRhYmxlTmFtZSwgbmV3VGFibGVOYW1lKSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld1RhYmxlTGlzdCA9IFsuLi50YWJsZXNdO1xuICAgICAgICBjb25zdCBpbmRleCA9IG5ld1RhYmxlTGlzdC5maW5kSW5kZXgoKGl0ZW0pID0+IGl0ZW0gPT09IG9yaWdpblRhYmxlTmFtZSk7XG4gICAgICAgIG5ld1RhYmxlTGlzdFtpbmRleF0gPSBuZXdUYWJsZU5hbWU7XG4gICAgICAgIHNldEN1cnJlbnRUYWJsZVNlbGVjdGVkKG5ld1RhYmxlTmFtZSk7XG4gICAgICAgIHNldFRhYmxlTGlzdChbLi4ubmV3VGFibGVMaXN0XSk7XG4gICAgfTtcblxuICAgIGNvbnN0IHNldFRvYXN0TWVzc2FnZSA9ICh0b2FzdENvbnRlbnQpID0+IHtcbiAgICAgICAgc2V0VG9hc3RDb250ZW50KHRvYXN0Q29udGVudCk7XG4gICAgfTtcblxuICAgIGNvbnN0IG9uRGVsZXRlVGFibGUgPSAodGFibGVOYW1lKSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld1RhYmxlTGlzdCA9IFsuLi50YWJsZXNdO1xuICAgICAgICBjb25zdCBmaW5kSW5kZXggPSBuZXdUYWJsZUxpc3QuZmluZEluZGV4KChpdGVtKSA9PiBpdGVtID09PSB0YWJsZU5hbWUpO1xuICAgICAgICBuZXdUYWJsZUxpc3Quc3BsaWNlKGZpbmRJbmRleCwgMSk7XG4gICAgICAgIHNldEN1cnJlbnRUYWJsZVNlbGVjdGVkKG5ld1RhYmxlTGlzdFswXSk7XG4gICAgICAgIHNldFRhYmxlTGlzdChbLi4ubmV3VGFibGVMaXN0XSk7XG4gICAgfTtcblxuICAgIGNvbnN0IHN5bmNBbGxUYWJsZSA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgc2V0SXNMb2FkaW5nKHRydWUpO1xuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBEYXRhYmFzZUFjdGlvbnMuc3luY0FsbCgpO1xuICAgICAgICBpZiAoIXJlcy5lcnJvcikgbG9hZERhdGFUYWJsZUxpc3QoKTtcbiAgICB9O1xuXG4gICAgY29uc3Qgb25DcmVhdGVEYXRhVGFibGVTdWNjZXNzID0gKHRhYmxlTmFtZSkgPT4ge1xuICAgICAgICBjb25zdCBuZXdEYXRhVGFibGVMaXN0ID0gWy4uLnRhYmxlc107XG4gICAgICAgIG5ld0RhdGFUYWJsZUxpc3QucHVzaCh0YWJsZU5hbWUpO1xuICAgICAgICBzZXRUYWJsZUxpc3QoWy4uLm5ld0RhdGFUYWJsZUxpc3RdKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkYXRhYmFzZS1wYWdlIHJvdyBtLTBcIj5cbiAgICAgICAgICAgIHshaXNMb2FkaW5nID8gKFxuICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgIDxUb2FzdFxuICAgICAgICAgICAgICAgICAgICAgICAgdG9hc3RDb250ZW50PXt0b2FzdENvbnRlbnR9XG4gICAgICAgICAgICAgICAgICAgICAgICBvblRvYXN0Q2xvc2VkPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VG9hc3RDb250ZW50KHt9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTEyIGNvbC1tZC0zIGJnLXdoaXRlIG1pbi1oLTEwMCBkLWZsZXggZmxleC1jb2x1bW4gcC0wIHByb2plY3QtbGlzdC1zaWRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c21hbGwgY2xhc3NOYW1lPVwidGl0bGUgcHMtY3AtNCBteS0zXCI+RGF0YXRhYmxlczwvc21hbGw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHMtY3AtNCBweS0zIGJ0biBidG4tbGluayB0ZXh0LXN0YXJ0IHRleHQtaW5mb1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc3luY0FsbFRhYmxlKCl9XG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEljb24gZGF0YUZlYXRoZXI9XCJyZWZyZXNoLWNjd1wiIGNsYXNzTmFtZT1cImZlYXRoZXItc20gbWUtMlwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZC1pbmxpbmUtYmxvY2sgYWxpZ24tbWlkZGxlIGZ3LWJvbGRcIj5TeW5jIHRhYmxlczwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInBzLWNwLTQgcHktMyBidG4gYnRuLWxpbmsgdGV4dC1zdGFydFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0SXNTaG93Q3JlYXRlRGF0YWJhc2VUYWJsZSh0cnVlKX1cbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8SWNvbiBkYXRhRmVhdGhlcj1cInBsdXNcIiBjbGFzc05hbWU9XCJmZWF0aGVyLXNtIG1lLTJcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImQtaW5saW5lLWJsb2NrIGFsaWduLW1pZGRsZSBmdy1ib2xkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENyZWF0ZSBuZXcgZGF0YXRhYmxlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwicHJvamVjdC1saXN0IGxpc3QtdW5zdHlsZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGFibGVzICYmIHRhYmxlcy5sZW5ndGggPiAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gdGFibGVzLm1hcCgoaXRlbSwga2V5KSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2Ake1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRUYWJsZVNlbGVjdGVkID09PSBpdGVtID8gXCJhY3RpdmVcIiA6IFwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9sZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LTEwMCBkLWZsZXgganVzdGlmeS1jb250ZW50LWJldHdlZW4gYWxpZ24taXRlbXMtY2VudGVyIGJ0biBidG4tbGluayB0ZXh0LXN0YXJ0IHB5LTMgcHMtY3AtNCBwZS0zIHRleHQtZGFya1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0Q3VycmVudFRhYmxlU2VsZWN0ZWQoaXRlbSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e2l0ZW19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxJbWFnZSBzcmM9e0NoZXZyb25SaWdodH0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogbnVsbH1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC0xMiBjb2wtbWQtOVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge2N1cnJlbnRUYWJsZVNlbGVjdGVkICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RGF0YWJhc2VUYWJsZURldGFpbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXROZXdUYWJsZU5hbWU9e3NldE5ld1RhYmxlTmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFibGVOYW1lPXtjdXJyZW50VGFibGVTZWxlY3RlZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VG9hc3RNZXNzYWdlPXtzZXRUb2FzdE1lc3NhZ2V9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRGVsZXRlVGFibGU9e29uRGVsZXRlVGFibGV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8Q3JlYXRlRGF0YWJhc2VUYWJsZU1vZGFsXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1Nob3c9e2lzU2hvd0NyZWF0ZURhdGFiYXNlVGFibGV9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkhpZGRlbj17KCkgPT4gc2V0SXNTaG93Q3JlYXRlRGF0YWJhc2VUYWJsZShmYWxzZSl9XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUb2FzdE1lc3NhZ2U9e3NldFRvYXN0TWVzc2FnZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ3JlYXRlRGF0YVRhYmxlU3VjY2Vzcz17b25DcmVhdGVEYXRhVGFibGVTdWNjZXNzfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICA8U3Bpbm5lciAvPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG4gICAgKTtcbn07XG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gXCJyZWFjdC1kb21cIjtcbmltcG9ydCB7XG4gICAgQ29udGVudEhlYWRlcixcbiAgICBUb2FzdCxcbiAgICBVc2VyUHJvZmlsZSxcbiAgICBDaGFuZ2VQYXNzd29yZEZvcm0sXG4gICAgV2lkZ2V0TGlzdCxcbn0gZnJvbSBcIi4uLy4uL2NvbXBvbmVudHNcIjtcbmltcG9ydCBcIi4uLy4uLy4uL3N0eWxlcy9wYWdlcy9fZWRpdC1wcm9maWxlLnNjc3NcIjtcbmltcG9ydCB7IERhdGFiYXNlVGFibGVzIH0gZnJvbSBcIi4uL2RhdGFiYXNlL3RhYmxlc1wiO1xuXG5jb25zdCBUQUJfTElTVCA9IFtcbiAgICB7XG4gICAgICAgIGlkOiBcInByb2ZpbGVcIixcbiAgICAgICAgdGl0bGU6IFwiTXkgUHJvZmlsZVwiLFxuICAgIH0sXG4gICAge1xuICAgICAgICBpZDogXCJkYXRhYmFzZXNcIixcbiAgICAgICAgdGl0bGU6IFwiRGF0YWJhc2VzXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGlkOiBcIndpZGdldHNcIixcbiAgICAgICAgdGl0bGU6IFwiV2lkZ2V0c1wiLFxuICAgIH0sXG5dO1xuXG5jb25zdCBOYXZDb21wb25lbnQgPSAoeyBjdXJyZW50VGFiIH0pID0+IHtcbiAgICBjb25zdCBUYWJDb21wb25lbnQgPSAoeyB0aXRsZSwgaWQsIGN1cnJlbnRUYWIgfSkgPT4ge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cIm5hdi1pdGVtXCIgcm9sZT1cInByZXNlbnRhdGlvblwiPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgbmF2LWxpbmsgJHtjdXJyZW50VGFiID09PSBpZCA/IFwiYWN0aXZlXCIgOiBcIlwifWB9XG4gICAgICAgICAgICAgICAgICAgIGlkPXtgcGlsbHMtJHtpZH0tdGFiYH1cbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgIHJvbGU9XCJ0YWJcIlxuICAgICAgICAgICAgICAgICAgICBhcmlhLWNvbnRyb2xzPXtgcGlsbHMtJHtpZH1gfVxuICAgICAgICAgICAgICAgICAgICBhcmlhLXNlbGVjdGVkPVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50VGFiICE9PSBpZCkgbG9jYXRpb24uaHJlZiA9IGBzZXR0aW5nP3RhYj0ke2lkfWA7XG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7dGl0bGV9XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICApO1xuICAgIH07XG4gICAgcmV0dXJuIChcbiAgICAgICAgPHVsIGNsYXNzTmFtZT1cIm5hdiBuYXYtcGlsbHMgbXMtNFwiIGlkPVwicGlsbHMtdGFiXCIgcm9sZT1cInRhYmxpc3RcIj5cbiAgICAgICAgICAgIHtUQUJfTElTVC5tYXAoKGl0ZW0pID0+IChcbiAgICAgICAgICAgICAgICA8VGFiQ29tcG9uZW50IGtleT17aXRlbS5pZH0gey4uLml0ZW19IGN1cnJlbnRUYWI9e2N1cnJlbnRUYWJ9IC8+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgPC91bD5cbiAgICApO1xufTtcblxuY29uc3QgUHJvZmlsZUZvcm0gPSAoeyBjdXJyZW50VGFiOiBwYXNzZWRDdXJyZW50VGFiIH0pID0+IHtcbiAgICBjb25zdCBbdG9hc3RDb250ZW50LCBzZXRUb2FzdENvbnRlbnRdID0gdXNlU3RhdGUoKTtcbiAgICBjb25zdCBbY3VycmVudFRhYiwgc2V0Q3VycmVudFRhYl0gPSB1c2VTdGF0ZSgpO1xuICAgIGNvbnN0IFt3aWRnZXRJZFBhcmFtLCBzZXRXaWRnZXRJZFBhcmFtXSA9IHVzZVN0YXRlKCk7XG5cbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBjb25zdCBjdXJyZW50VXJsUXVlcmllcyA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2g7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRVcmxRdWVyaWVzQXJyYXkgPSBjdXJyZW50VXJsUXVlcmllcy5zcGxpdChcIiZcIik7XG4gICAgICAgIGlmIChjdXJyZW50VXJsUXVlcmllc0FycmF5ICYmIGN1cnJlbnRVcmxRdWVyaWVzQXJyYXkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY3VycmVudFVybFF1ZXJpZXNBcnJheS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcXVlcnlQYXJhbSA9IGl0ZW0uc3BsaXQoXCI9XCIpO1xuICAgICAgICAgICAgICAgIHN3aXRjaCAocXVlcnlQYXJhbVswXSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwidGFiXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldEN1cnJlbnRUYWIocXVlcnlQYXJhbVsxXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwid2lkZ2V0SWRcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0V2lkZ2V0SWRQYXJhbShxdWVyeVBhcmFtWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LCBbXSk7XG5cbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBzZXRDdXJyZW50VGFiKHBhc3NlZEN1cnJlbnRUYWIpO1xuICAgIH0sIFtwYXNzZWRDdXJyZW50VGFiXSk7XG5cbiAgICBjb25zdCBzZXRUb2FzdE1lc3NhZ2UgPSAodG9hc3RDb250ZW50KSA9PiBzZXRUb2FzdENvbnRlbnQodG9hc3RDb250ZW50KTtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2V0dGluZy1wcm9maWxlXCIgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiBcIjUwcHhcIiB9fT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudFwiPlxuICAgICAgICAgICAgICAgIDxUb2FzdFxuICAgICAgICAgICAgICAgICAgICB0b2FzdENvbnRlbnQ9e3RvYXN0Q29udGVudH1cbiAgICAgICAgICAgICAgICAgICAgb25Ub2FzdENsb3NlZD17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VG9hc3RDb250ZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXdoaXRlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyLWZsdWlkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1zLTQgbWUtNFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxDb250ZW50SGVhZGVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2VUaXRsZT1cIlNldHRpbmdzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbk5hbWU9XCJzZXR0aW5nc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInBiLTIgYmctd2hpdGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPE5hdkNvbXBvbmVudCBjdXJyZW50VGFiPXtjdXJyZW50VGFifSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29udGVudEhlYWRlcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRhYi1jb250ZW50XCIgaWQ9XCJwaWxscy10YWJDb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGNvbnRhaW5lci1mbHVpZCBwYi01IG1zLWNwLTQgcHgtMCBtdC0zIHRhYi1wYW5lIGZhZGUgJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50VGFiID09PSBcInByb2ZpbGVcIiA/IFwic2hvdyBhY3RpdmVcIiA6IFwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ9XCJwaWxscy1wcm9maWxlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvbGU9XCJ0YWJwYW5lbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsbGVkYnk9XCJwaWxscy1wcm9maWxlLXRhYlwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxVc2VyUHJvZmlsZSBzZXRUb2FzdE1lc3NhZ2U9e3NldFRvYXN0TWVzc2FnZX0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxDaGFuZ2VQYXNzd29yZEZvcm0gc2V0VG9hc3RNZXNzYWdlPXtzZXRUb2FzdE1lc3NhZ2V9IC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2B0YWItcGFuZSBmYWRlICR7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFRhYiA9PT0gXCJkYXRhYmFzZXNcIiA/IFwic2hvdyBhY3RpdmVcIiA6IFwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ9XCJwaWxscy1kYXRhYmFzZXNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgcm9sZT1cInRhYnBhbmVsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyaWEtbGFiZWxsZWRieT1cInBpbGxzLWRhdGFiYXNlcy10YWJcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8RGF0YWJhc2VUYWJsZXMgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHRhYi1wYW5lIGZhZGUgJHtjdXJyZW50VGFiID09PSBcIndpZGdldHNcIiA/IFwic2hvdyBhY3RpdmVcIiA6IFwiXCJ9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlkPVwicGlsbHMtd2lkZ2V0c1wiXG4gICAgICAgICAgICAgICAgICAgICAgICByb2xlPVwidGFicGFuZWxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbGxlZGJ5PVwicGlsbHMtd2lkZ2V0cy10YWJcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8V2lkZ2V0TGlzdCBjbGFzc05hbWU9XCJteC0zXCIgd2lkZ2V0SWRQYXJhbT17d2lkZ2V0SWRQYXJhbX0gLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgKTtcbn07XG5cbmNvbnN0IHJvb3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Jvb3RcIik7XG5SZWFjdERPTS5yZW5kZXIoPFByb2ZpbGVGb3JtIHsuLi5yb290LmRhdGFzZXR9IC8+LCByb290KTtcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiIsIi8vIGBTYW1lVmFsdWVgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtc2FtZXZhbHVlXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5pcyB8fCBmdW5jdGlvbiBpcyh4LCB5KSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgcmV0dXJuIHggPT09IHkgPyB4ICE9PSAwIHx8IDEgLyB4ID09PSAxIC8geSA6IHggIT0geCAmJiB5ICE9IHk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGZpeFJlZ0V4cFdlbGxLbm93blN5bWJvbExvZ2ljID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZpeC1yZWdleHAtd2VsbC1rbm93bi1zeW1ib2wtbG9naWMnKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcbnZhciByZXF1aXJlT2JqZWN0Q29lcmNpYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlcXVpcmUtb2JqZWN0LWNvZXJjaWJsZScpO1xudmFyIHNhbWVWYWx1ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zYW1lLXZhbHVlJyk7XG52YXIgcmVnRXhwRXhlYyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWdleHAtZXhlYy1hYnN0cmFjdCcpO1xuXG4vLyBAQHNlYXJjaCBsb2dpY1xuZml4UmVnRXhwV2VsbEtub3duU3ltYm9sTG9naWMoJ3NlYXJjaCcsIDEsIGZ1bmN0aW9uIChTRUFSQ0gsIG5hdGl2ZVNlYXJjaCwgbWF5YmVDYWxsTmF0aXZlKSB7XG4gIHJldHVybiBbXG4gICAgLy8gYFN0cmluZy5wcm90b3R5cGUuc2VhcmNoYCBtZXRob2RcbiAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1zdHJpbmcucHJvdG90eXBlLnNlYXJjaFxuICAgIGZ1bmN0aW9uIHNlYXJjaChyZWdleHApIHtcbiAgICAgIHZhciBPID0gcmVxdWlyZU9iamVjdENvZXJjaWJsZSh0aGlzKTtcbiAgICAgIHZhciBzZWFyY2hlciA9IHJlZ2V4cCA9PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiByZWdleHBbU0VBUkNIXTtcbiAgICAgIHJldHVybiBzZWFyY2hlciAhPT0gdW5kZWZpbmVkID8gc2VhcmNoZXIuY2FsbChyZWdleHAsIE8pIDogbmV3IFJlZ0V4cChyZWdleHApW1NFQVJDSF0oU3RyaW5nKE8pKTtcbiAgICB9LFxuICAgIC8vIGBSZWdFeHAucHJvdG90eXBlW0BAc2VhcmNoXWAgbWV0aG9kXG4gICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtcmVnZXhwLnByb3RvdHlwZS1AQHNlYXJjaFxuICAgIGZ1bmN0aW9uIChyZWdleHApIHtcbiAgICAgIHZhciByZXMgPSBtYXliZUNhbGxOYXRpdmUobmF0aXZlU2VhcmNoLCByZWdleHAsIHRoaXMpO1xuICAgICAgaWYgKHJlcy5kb25lKSByZXR1cm4gcmVzLnZhbHVlO1xuXG4gICAgICB2YXIgcnggPSBhbk9iamVjdChyZWdleHApO1xuICAgICAgdmFyIFMgPSBTdHJpbmcodGhpcyk7XG5cbiAgICAgIHZhciBwcmV2aW91c0xhc3RJbmRleCA9IHJ4Lmxhc3RJbmRleDtcbiAgICAgIGlmICghc2FtZVZhbHVlKHByZXZpb3VzTGFzdEluZGV4LCAwKSkgcngubGFzdEluZGV4ID0gMDtcbiAgICAgIHZhciByZXN1bHQgPSByZWdFeHBFeGVjKHJ4LCBTKTtcbiAgICAgIGlmICghc2FtZVZhbHVlKHJ4Lmxhc3RJbmRleCwgcHJldmlvdXNMYXN0SW5kZXgpKSByeC5sYXN0SW5kZXggPSBwcmV2aW91c0xhc3RJbmRleDtcbiAgICAgIHJldHVybiByZXN1bHQgPT09IG51bGwgPyAtMSA6IHJlc3VsdC5pbmRleDtcbiAgICB9XG4gIF07XG59KTtcbiJdLCJzb3VyY2VSb290IjoiIn0=