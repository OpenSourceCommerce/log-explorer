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
/******/ 		"database_form": 0
/******/ 	}
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"database_form": 0
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
/******/ 	deferredModules.push(["./assets/js/pages/database/form.js","vendors~alerts_form~alerts_list~content-header~dashboard-page~dashboard_form~dashboard_list~database~ad6a277b","vendors~alerts_form~alerts_list~app~dashboard-page~dashboard_form~dashboard_list~database_form~datab~7df76b7b","vendors~alerts_form~alerts_list~dashboard-page~dashboard_form~dashboard_list~database_form~database_~a0c5edc0","alerts_form~alerts_list~dashboard-page~dashboard_form~dashboard_list~database_form~database_tables~e~96755b64"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/js/pages/database/form.js":
/*!******************************************!*\
  !*** ./assets/js/pages/database/form.js ***!
  \******************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.function.bind.js */ "./node_modules/core-js/modules/es.function.bind.js");
/* harmony import */ var core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.function.name.js */ "./node_modules/core-js/modules/es.function.name.js");
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.find-index.js */ "./node_modules/core-js/modules/es.array.find-index.js");
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.splice.js */ "./node_modules/core-js/modules/es.array.splice.js");
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_string_trim_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.string.trim.js */ "./node_modules/core-js/modules/es.string.trim.js");
/* harmony import */ var core_js_modules_es_string_trim_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_trim_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.array.concat.js */ "./node_modules/core-js/modules/es.array.concat.js");
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_array_join_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.array.join.js */ "./node_modules/core-js/modules/es.array.join.js");
/* harmony import */ var core_js_modules_es_array_join_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_join_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.array.map.js */ "./node_modules/core-js/modules/es.array.map.js");
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.object.set-prototype-of.js */ "./node_modules/core-js/modules/es.object.set-prototype-of.js");
/* harmony import */ var core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.object.get-prototype-of.js */ "./node_modules/core-js/modules/es.object.get-prototype-of.js");
/* harmony import */ var core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/es.reflect.construct.js */ "./node_modules/core-js/modules/es.reflect.construct.js");
/* harmony import */ var core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! core-js/modules/es.object.create.js */ "./node_modules/core-js/modules/es.object.create.js");
/* harmony import */ var core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! core-js/modules/es.object.define-property.js */ "./node_modules/core-js/modules/es.object.define-property.js");
/* harmony import */ var core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! core-js/modules/es.array.slice.js */ "./node_modules/core-js/modules/es.array.slice.js");
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! core-js/modules/es.array.from.js */ "./node_modules/core-js/modules/es.array.from.js");
/* harmony import */ var core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! core-js/modules/es.symbol.description.js */ "./node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ "./node_modules/core-js/modules/es.symbol.iterator.js");
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var core_js_modules_es_array_is_array_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! core-js/modules/es.array.is-array.js */ "./node_modules/core-js/modules/es.array.is-array.js");
/* harmony import */ var core_js_modules_es_array_is_array_js__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_is_array_js__WEBPACK_IMPORTED_MODULE_23__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_24___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_24__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_25___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_25__);
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ../../components */ "./assets/js/components/index.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ../../actions */ "./assets/js/actions/index.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }


























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






var DatabaseForm = /*#__PURE__*/function (_Component) {
  _inherits(DatabaseForm, _Component);

  var _super = _createSuper(DatabaseForm);

  function DatabaseForm(props) {
    var _this;

    _classCallCheck(this, DatabaseForm);

    _this = _super.call(this, props);
    var columns = [];

    for (var i = 0; i < 3; i++) {
      columns.push(_this.getBlankColumn());
    }

    _this.state = {
      isNew: !window.table,
      originTable: window.table ? window.table : '',
      table: window.table ? window.table : '',
      columns: columns,
      ttl: '',
      tableError: false,
      noColumnError: false,
      isLoading: false,
      deletingColumn: null
    };
    _this.onTableChange = _this.onTableChange.bind(_assertThisInitialized(_this));
    _this.addMoreColumn = _this.addMoreColumn.bind(_assertThisInitialized(_this));
    _this.onTTLChange = _this.onTTLChange.bind(_assertThisInitialized(_this));
    _this.onSubmit = _this.onSubmit.bind(_assertThisInitialized(_this));
    _this.showDeleteConfirmationModal = _this.showDeleteConfirmationModal.bind(_assertThisInitialized(_this));
    _this.deleteColumn = _this.deleteColumn.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(DatabaseForm, [{
    key: "loadColumns",
    value: function loadColumns(table) {
      var that = this;
      this.setState({
        isLoading: true
      });
      _actions__WEBPACK_IMPORTED_MODULE_27__["DatabaseActions"].getTableColumns(table).then(function (res) {
        var error = res.error,
            table = res.table,
            data = res.data;

        if (error) {
          return;
        }

        var columns = [];

        for (var i in data) {
          var column = data[i];
          column = $.extend(that.getBlankColumn(), column);
          column.isNew = false;
          column.origin = column.name;
          column.originType = column.type;
          columns.push(column);
        }

        that.setState({
          table: table,
          columns: columns,
          isLoading: false
        });
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var table = this.state.table;

      if (table) {
        this.loadColumns(table);
      }
    }
  }, {
    key: "getBlankColumn",
    value: function getBlankColumn() {
      return {
        isNew: true,
        name: '',
        origin: '',
        type: 'String',
        originType: '',
        error: false
      };
    }
  }, {
    key: "onTableChange",
    value: function onTableChange(e) {
      this.setState({
        table: e.target.value,
        tableError: false
      });
    }
  }, {
    key: "onTTLChange",
    value: function onTTLChange(e) {
      this.setState({
        ttl: e.target.value
      });
    }
  }, {
    key: "onColumnChange",
    value: function onColumnChange(key, name, e) {
      var columns = this.state.columns;
      columns[key][name] = e.target.value;
      this.setState({
        columns: columns,
        noColumnError: false
      });
    }
  }, {
    key: "addMoreColumn",
    value: function addMoreColumn() {
      var columns = this.state.columns;

      for (var i = 0; i < 3; i++) {
        columns.push(this.getBlankColumn());
      }

      this.setState({
        columns: columns
      });
    }
  }, {
    key: "deleteColumn",
    value: function deleteColumn() {
      var _this2 = this;

      var _this$state = this.state,
          table = _this$state.table,
          deletingColumn = _this$state.deletingColumn,
          columns = _this$state.columns;

      if (!deletingColumn) {
        return;
      }

      _actions__WEBPACK_IMPORTED_MODULE_27__["DatabaseActions"].deleteColumn(table, deletingColumn.origin).then(function (res) {
        var error = res.error;

        if (error !== 0) {
          return;
        }

        _actions__WEBPACK_IMPORTED_MODULE_27__["Alert"].success('Remove successful');
        var key = columns.findIndex(function (el) {
          return el.origin === deletingColumn.origin;
        });
        columns.splice(key, 1);

        _this2.setState({
          columns: columns,
          deletingColumn: null
        });
      });
    }
  }, {
    key: "showDeleteConfirmationModal",
    value: function showDeleteConfirmationModal(deletingColumn) {
      this.setState({
        deletingColumn: deletingColumn
      });
    }
  }, {
    key: "onSubmit",
    value: function onSubmit() {
      var _this3 = this;

      var _this$state2 = this.state,
          originTable = _this$state2.originTable,
          table = _this$state2.table,
          ttl = _this$state2.ttl,
          columns = _this$state2.columns;
      table = $.trim(table);
      ttl = $.trim(ttl);
      var change = [];
      var validColumns = [];
      var hasErrorBefore = false;
      var hasError = false;
      var hasNew = false;

      if (table === '') {
        this.setState({
          tableError: true,
          isLoading: false
        });
        hasError = true;
      }

      if (table !== originTable) {
        change.push("Table from \"".concat(originTable, "\" to \"").concat(table, "\""));
      }

      var _iterator = _createForOfIteratorHelper(columns),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var column = _step.value;
          var isNew = column.isNew,
              name = column.name,
              origin = column.origin,
              type = column.type,
              originType = column.originType,
              error = column.error;
          column.error = false;

          if (error) {
            hasErrorBefore = true;
          }

          name = $.trim(name);

          if (isNew && name === '') {
            continue;
          }

          if (name === '') {
            column.error = true;
            hasError = true;
            continue;
          }

          if (!isNew) {
            if (name !== origin) {
              change.push("Column from \"".concat(origin, "\" to \"").concat(name, "\""));
            }

            if (type !== originType) {
              change.push("Column \"".concat(origin, "\" from \"").concat(originType, "\" to \"").concat(type, "\""));
            }
          } else {
            hasNew = true;
          }

          validColumns.push({
            name: name,
            origin: origin,
            type: type
          });
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      if (hasError !== hasErrorBefore || hasError) {
        this.setState({
          columns: columns,
          isLoading: false
        });
      }

      if (validColumns.length === 0) {
        hasError = true;
        this.setState({
          noColumnError: true,
          isLoading: false
        });
      }

      if (!hasError) {
        var tableData = {
          name: table,
          ttl: ttl,
          columns: validColumns
        };

        if (originTable && change.length > 0) {
          _actions__WEBPACK_IMPORTED_MODULE_27__["Alert"].confirm("Are you sure to change table structure?\n" + change.join("\n"), function () {
            _this3.createOrUpdate(originTable, tableData);
          });
        } else if (!originTable || hasNew) {
          this.createOrUpdate(originTable, tableData);
        }
      }
    }
  }, {
    key: "createOrUpdate",
    value: function createOrUpdate(table, data) {
      var _this4 = this;

      var that = this;
      this.setState({
        isLoading: true
      });
      _actions__WEBPACK_IMPORTED_MODULE_27__["DatabaseActions"].createOrUpdate(table, data).then(function (res) {
        var error = res.error,
            redirect = res.redirect;

        if (error !== 0) {
          return;
        }

        if (redirect) {
          _actions__WEBPACK_IMPORTED_MODULE_27__["Alert"].success('Create successful');
          window.location.href = redirect;
        } else {
          _actions__WEBPACK_IMPORTED_MODULE_27__["Alert"].success('Update successful');
          that.loadColumns(table);
        }
      }).then(function () {
        _this4.setState({
          isLoading: false
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      var _this$state3 = this.state,
          isNew = _this$state3.isNew,
          table = _this$state3.table,
          ttl = _this$state3.ttl,
          columns = _this$state3.columns,
          tableError = _this$state3.tableError,
          noColumnError = _this$state3.noColumnError,
          isLoading = _this$state3.isLoading,
          deletingColumn = _this$state3.deletingColumn;
      var readonly = !isNew;
      var types = window.clickhouseTypes;

      var _columns = columns.map(function (item, key) {
        var disabled = readonly && !item.isNew && (item.origin === 'timestamp' || item.origin === '_id');
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_24___default.a.createElement("div", {
          key: key,
          className: "form-group"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_24___default.a.createElement("div", {
          className: "row"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_24___default.a.createElement("div", {
          className: "col-5"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_24___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_26__["Input"], {
          disabled: disabled,
          value: item.name,
          className: (item.error ? 'is-invalid ' : '') + 'table_field',
          onChange: function onChange(e) {
            return _this5.onColumnChange(key, 'name', e);
          },
          placeholder: "Name"
        })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_24___default.a.createElement("div", {
          className: "col-5"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_24___default.a.createElement("select", {
          disabled: disabled,
          className: "form-control table_type",
          value: item.type,
          onChange: function onChange(e) {
            return _this5.onColumnChange(key, 'type', e);
          }
        }, types.map(function (type, k) {
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_24___default.a.createElement("option", {
            key: k,
            value: type
          }, type);
        }))), !disabled && !item.isNew && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_24___default.a.createElement("div", {
          className: "col"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_24___default.a.createElement("a", {
          onClick: function onClick() {
            return _this5.showDeleteConfirmationModal(item);
          },
          href: "#",
          className: "btn btn-danger table_rm_column"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_24___default.a.createElement("i", {
          className: "fa fa-trash"
        })))));
      });

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_24___default.a.createElement("div", {
        className: "database container-fluid"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_24___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_26__["Modal"], {
        size: _components__WEBPACK_IMPORTED_MODULE_26__["Size"].medium,
        id: 'delete-column',
        title: "Deleting column \"".concat(deletingColumn === null || deletingColumn === void 0 ? void 0 : deletingColumn.origin, "\""),
        showCloseButton: true,
        closeButtonTitle: "Abort",
        showSaveButton: true,
        saveButtonTitle: "OK",
        saveButtonColor: "danger",
        saveButtonAction: this.deleteColumn,
        show: deletingColumn != null,
        onHidden: function onHidden() {
          _this5.setState({
            deletingColumn: null
          });
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_24___default.a.createElement("p", {
        className: 'text-danger'
      }, "Be careful - this will also delete the column in clickhouse table!")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_24___default.a.createElement("div", {
        className: "card"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_24___default.a.createElement("div", {
        className: "card-header"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_24___default.a.createElement("h3", {
        className: "card-title align-items-center p-2"
      }, isNew ? 'Create new table' : 'Update table'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_24___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_26__["Button"], {
        className: "float-end",
        color: 'success',
        onClick: this.onSubmit,
        isLoading: isLoading
      }, isNew ? 'Create table' : 'Update table')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_24___default.a.createElement("div", {
        className: "card-body"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_24___default.a.createElement("form", {
        role: "form"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_24___default.a.createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_24___default.a.createElement("label", null, "Table name"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_24___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_26__["Input"], {
        name: "table_name",
        className: tableError ? 'is-invalid' : '',
        placeholder: "Table name",
        value: table,
        onChange: this.onTableChange
      })), isNew && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_24___default.a.createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_24___default.a.createElement("label", null, "Table TTL"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_24___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_26__["Input"], {
        disabled: readonly,
        name: "table_ttl",
        placeholder: "timestamp + toIntervalMonth(100)",
        value: ttl,
        onChange: this.onTTLChange
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_24___default.a.createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_24___default.a.createElement("label", {
        htmlFor: "exampleInputPassword1"
      }, "Column"), noColumnError && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_24___default.a.createElement("div", {
        className: 'row has-error'
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_24___default.a.createElement("span", {
        className: 'col-12 text-red'
      }, "Please fill at less one column")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_24___default.a.createElement("div", {
        className: "row"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_24___default.a.createElement("div", {
        className: "col-6"
      }, "Name"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_24___default.a.createElement("div", {
        className: "col-6"
      }, "Type"))), isLoading ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_24___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_26__["Spinner"], null) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_24___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_24___default.a.Fragment, null, _columns, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_24___default.a.createElement("div", {
        className: "box-footer"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_24___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_26__["Button"], {
        id: "btn-more-column",
        color: 'primary',
        onClick: this.addMoreColumn
      }, "Add more column")))))));
    }
  }]);

  return DatabaseForm;
}(react__WEBPACK_IMPORTED_MODULE_24__["Component"]);

react_dom__WEBPACK_IMPORTED_MODULE_25___default.a.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_24___default.a.createElement(DatabaseForm, null), document.querySelector('#root'));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./node_modules/core-js/modules/es.array.find-index.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.find-index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var $findIndex = __webpack_require__(/*! ../internals/array-iteration */ "./node_modules/core-js/internals/array-iteration.js").findIndex;
var addToUnscopables = __webpack_require__(/*! ../internals/add-to-unscopables */ "./node_modules/core-js/internals/add-to-unscopables.js");

var FIND_INDEX = 'findIndex';
var SKIPS_HOLES = true;

// Shouldn't skip holes
if (FIND_INDEX in []) Array(1)[FIND_INDEX](function () { SKIPS_HOLES = false; });

// `Array.prototype.findIndex` method
// https://tc39.es/ecma262/#sec-array.prototype.findindex
$({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $findIndex(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables(FIND_INDEX);


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3BhZ2VzL2RhdGFiYXNlL2Zvcm0uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5hcnJheS5maW5kLWluZGV4LmpzIl0sIm5hbWVzIjpbIkRhdGFiYXNlRm9ybSIsInByb3BzIiwiY29sdW1ucyIsImkiLCJwdXNoIiwiZ2V0QmxhbmtDb2x1bW4iLCJzdGF0ZSIsImlzTmV3Iiwid2luZG93IiwidGFibGUiLCJvcmlnaW5UYWJsZSIsInR0bCIsInRhYmxlRXJyb3IiLCJub0NvbHVtbkVycm9yIiwiaXNMb2FkaW5nIiwiZGVsZXRpbmdDb2x1bW4iLCJvblRhYmxlQ2hhbmdlIiwiYmluZCIsImFkZE1vcmVDb2x1bW4iLCJvblRUTENoYW5nZSIsIm9uU3VibWl0Iiwic2hvd0RlbGV0ZUNvbmZpcm1hdGlvbk1vZGFsIiwiZGVsZXRlQ29sdW1uIiwidGhhdCIsInNldFN0YXRlIiwiRGF0YWJhc2VBY3Rpb25zIiwiZ2V0VGFibGVDb2x1bW5zIiwidGhlbiIsInJlcyIsImVycm9yIiwiZGF0YSIsImNvbHVtbiIsIiQiLCJleHRlbmQiLCJvcmlnaW4iLCJuYW1lIiwib3JpZ2luVHlwZSIsInR5cGUiLCJsb2FkQ29sdW1ucyIsImUiLCJ0YXJnZXQiLCJ2YWx1ZSIsImtleSIsIkFsZXJ0Iiwic3VjY2VzcyIsImZpbmRJbmRleCIsImVsIiwic3BsaWNlIiwidHJpbSIsImNoYW5nZSIsInZhbGlkQ29sdW1ucyIsImhhc0Vycm9yQmVmb3JlIiwiaGFzRXJyb3IiLCJoYXNOZXciLCJsZW5ndGgiLCJ0YWJsZURhdGEiLCJjb25maXJtIiwiam9pbiIsImNyZWF0ZU9yVXBkYXRlIiwicmVkaXJlY3QiLCJsb2NhdGlvbiIsImhyZWYiLCJyZWFkb25seSIsInR5cGVzIiwiY2xpY2tob3VzZVR5cGVzIiwiX2NvbHVtbnMiLCJtYXAiLCJpdGVtIiwiZGlzYWJsZWQiLCJvbkNvbHVtbkNoYW5nZSIsImsiLCJTaXplIiwibWVkaXVtIiwiQ29tcG9uZW50IiwiUmVhY3RET00iLCJyZW5kZXIiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLFFBQVEsb0JBQW9CO1FBQzVCO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsaUJBQWlCLDRCQUE0QjtRQUM3QztRQUNBO1FBQ0Esa0JBQWtCLDJCQUEyQjtRQUM3QztRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7O1FBRUE7UUFDQTtRQUNBLDBDQUEwQztRQUMxQzs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0Esb0JBQW9CO1FBQ3BCO1FBQ0E7UUFDQTtRQUNBLHdCQUF3QjtRQUN4QjtRQUNBO1FBQ0EsbUJBQW1CLDZCQUE2QjtRQUNoRDtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsbUJBQW1CLDhCQUE4QjtRQUNqRDtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsS0FBSztRQUNMO1FBQ0EsS0FBSztRQUNMOztRQUVBOztRQUVBO1FBQ0EsaUNBQWlDOztRQUVqQztRQUNBO1FBQ0E7UUFDQSxLQUFL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LEVBQUU7O0FBRS9FO0FBQ0E7QUFDQSxHQUFHLG9EQUFvRDtBQUN2RDtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0EiLCJmaWxlIjoiZGF0YWJhc2VfZm9ybS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0ZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soZGF0YSkge1xuIFx0XHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuIFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuIFx0XHR2YXIgZXhlY3V0ZU1vZHVsZXMgPSBkYXRhWzJdO1xuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHRcdC8vIGFkZCBlbnRyeSBtb2R1bGVzIGZyb20gbG9hZGVkIGNodW5rIHRvIGRlZmVycmVkIGxpc3RcbiBcdFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2guYXBwbHkoZGVmZXJyZWRNb2R1bGVzLCBleGVjdXRlTW9kdWxlcyB8fCBbXSk7XG5cbiBcdFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiBhbGwgY2h1bmtzIHJlYWR5XG4gXHRcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIFx0fTtcbiBcdGZ1bmN0aW9uIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCkge1xuIFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGRlZmVycmVkTW9kdWxlID0gZGVmZXJyZWRNb2R1bGVzW2ldO1xuIFx0XHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuIFx0XHRcdGZvcih2YXIgaiA9IDE7IGogPCBkZWZlcnJlZE1vZHVsZS5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGRlcElkID0gZGVmZXJyZWRNb2R1bGVbal07XG4gXHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbZGVwSWRdICE9PSAwKSBmdWxmaWxsZWQgPSBmYWxzZTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYoZnVsZmlsbGVkKSB7XG4gXHRcdFx0XHRkZWZlcnJlZE1vZHVsZXMuc3BsaWNlKGktLSwgMSk7XG4gXHRcdFx0XHRyZXN1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IGRlZmVycmVkTW9kdWxlWzBdKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHRyZXR1cm4gcmVzdWx0O1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIENTUyBjaHVua3NcbiBcdHZhciBpbnN0YWxsZWRDc3NDaHVua3MgPSB7XG4gXHRcdFwiZGF0YWJhc2VfZm9ybVwiOiAwXG4gXHR9XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHQvLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbiBcdC8vIFByb21pc2UgPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHRcImRhdGFiYXNlX2Zvcm1cIjogMFxuIFx0fTtcblxuIFx0dmFyIGRlZmVycmVkTW9kdWxlcyA9IFtdO1xuXG4gXHQvLyBzY3JpcHQgcGF0aCBmdW5jdGlvblxuIFx0ZnVuY3Rpb24ganNvbnBTY3JpcHRTcmMoY2h1bmtJZCkge1xuIFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArICh7fVtjaHVua0lkXXx8Y2h1bmtJZCkgKyBcIi5qc1wiXG4gXHR9XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuIFx0Ly8gVGhpcyBmaWxlIGNvbnRhaW5zIG9ubHkgdGhlIGVudHJ5IGNodW5rLlxuIFx0Ly8gVGhlIGNodW5rIGxvYWRpbmcgZnVuY3Rpb24gZm9yIGFkZGl0aW9uYWwgY2h1bmtzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmUgPSBmdW5jdGlvbiByZXF1aXJlRW5zdXJlKGNodW5rSWQpIHtcbiBcdFx0dmFyIHByb21pc2VzID0gW107XG5cblxuIFx0XHQvLyBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiBDU1MgbG9hZGluZ1xuIFx0XHR2YXIgY3NzQ2h1bmtzID0ge1wiMFwiOjF9O1xuIFx0XHRpZihpbnN0YWxsZWRDc3NDaHVua3NbY2h1bmtJZF0pIHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ3NzQ2h1bmtzW2NodW5rSWRdKTtcbiBcdFx0ZWxzZSBpZihpbnN0YWxsZWRDc3NDaHVua3NbY2h1bmtJZF0gIT09IDAgJiYgY3NzQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDc3NDaHVua3NbY2h1bmtJZF0gPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRcdHZhciBocmVmID0gXCJcIiArICh7fVtjaHVua0lkXXx8Y2h1bmtJZCkgKyBcIi5jc3NcIjtcbiBcdFx0XHRcdHZhciBmdWxsaHJlZiA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIGhyZWY7XG4gXHRcdFx0XHR2YXIgZXhpc3RpbmdMaW5rVGFncyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwibGlua1wiKTtcbiBcdFx0XHRcdGZvcih2YXIgaSA9IDA7IGkgPCBleGlzdGluZ0xpbmtUYWdzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdHZhciB0YWcgPSBleGlzdGluZ0xpbmtUYWdzW2ldO1xuIFx0XHRcdFx0XHR2YXIgZGF0YUhyZWYgPSB0YWcuZ2V0QXR0cmlidXRlKFwiZGF0YS1ocmVmXCIpIHx8IHRhZy5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpO1xuIFx0XHRcdFx0XHRpZih0YWcucmVsID09PSBcInN0eWxlc2hlZXRcIiAmJiAoZGF0YUhyZWYgPT09IGhyZWYgfHwgZGF0YUhyZWYgPT09IGZ1bGxocmVmKSkgcmV0dXJuIHJlc29sdmUoKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdHZhciBleGlzdGluZ1N0eWxlVGFncyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic3R5bGVcIik7XG4gXHRcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZXhpc3RpbmdTdHlsZVRhZ3MubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0dmFyIHRhZyA9IGV4aXN0aW5nU3R5bGVUYWdzW2ldO1xuIFx0XHRcdFx0XHR2YXIgZGF0YUhyZWYgPSB0YWcuZ2V0QXR0cmlidXRlKFwiZGF0YS1ocmVmXCIpO1xuIFx0XHRcdFx0XHRpZihkYXRhSHJlZiA9PT0gaHJlZiB8fCBkYXRhSHJlZiA9PT0gZnVsbGhyZWYpIHJldHVybiByZXNvbHZlKCk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHR2YXIgbGlua1RhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xuIFx0XHRcdFx0bGlua1RhZy5yZWwgPSBcInN0eWxlc2hlZXRcIjtcbiBcdFx0XHRcdGxpbmtUYWcudHlwZSA9IFwidGV4dC9jc3NcIjtcbiBcdFx0XHRcdGxpbmtUYWcub25sb2FkID0gcmVzb2x2ZTtcbiBcdFx0XHRcdGxpbmtUYWcub25lcnJvciA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gXHRcdFx0XHRcdHZhciByZXF1ZXN0ID0gZXZlbnQgJiYgZXZlbnQudGFyZ2V0ICYmIGV2ZW50LnRhcmdldC5zcmMgfHwgZnVsbGhyZWY7XG4gXHRcdFx0XHRcdHZhciBlcnIgPSBuZXcgRXJyb3IoXCJMb2FkaW5nIENTUyBjaHVuayBcIiArIGNodW5rSWQgKyBcIiBmYWlsZWQuXFxuKFwiICsgcmVxdWVzdCArIFwiKVwiKTtcbiBcdFx0XHRcdFx0ZXJyLnJlcXVlc3QgPSByZXF1ZXN0O1xuIFx0XHRcdFx0XHRyZWplY3QoZXJyKTtcbiBcdFx0XHRcdH07XG4gXHRcdFx0XHRsaW5rVGFnLmhyZWYgPSBmdWxsaHJlZjtcbiBcdFx0XHRcdHZhciBoZWFkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdO1xuIFx0XHRcdFx0aGVhZC5hcHBlbmRDaGlsZChsaW5rVGFnKTtcbiBcdFx0XHR9KS50aGVuKGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0aW5zdGFsbGVkQ3NzQ2h1bmtzW2NodW5rSWRdID0gMDtcbiBcdFx0XHR9KSk7XG4gXHRcdH1cblxuIFx0XHQvLyBKU09OUCBjaHVuayBsb2FkaW5nIGZvciBqYXZhc2NyaXB0XG5cbiBcdFx0dmFyIGluc3RhbGxlZENodW5rRGF0YSA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhICE9PSAwKSB7IC8vIDAgbWVhbnMgXCJhbHJlYWR5IGluc3RhbGxlZFwiLlxuXG4gXHRcdFx0Ly8gYSBQcm9taXNlIG1lYW5zIFwiY3VycmVudGx5IGxvYWRpbmdcIi5cbiBcdFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEpIHtcbiBcdFx0XHRcdHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ2h1bmtEYXRhWzJdKTtcbiBcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0Ly8gc2V0dXAgUHJvbWlzZSBpbiBjaHVuayBjYWNoZVxuIFx0XHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRcdFx0aW5zdGFsbGVkQ2h1bmtEYXRhID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gW3Jlc29sdmUsIHJlamVjdF07XG4gXHRcdFx0XHR9KTtcbiBcdFx0XHRcdHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ2h1bmtEYXRhWzJdID0gcHJvbWlzZSk7XG5cbiBcdFx0XHRcdC8vIHN0YXJ0IGNodW5rIGxvYWRpbmdcbiBcdFx0XHRcdHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiBcdFx0XHRcdHZhciBvblNjcmlwdENvbXBsZXRlO1xuXG4gXHRcdFx0XHRzY3JpcHQuY2hhcnNldCA9ICd1dGYtOCc7XG4gXHRcdFx0XHRzY3JpcHQudGltZW91dCA9IDEyMDtcbiBcdFx0XHRcdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKSB7XG4gXHRcdFx0XHRcdHNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdHNjcmlwdC5zcmMgPSBqc29ucFNjcmlwdFNyYyhjaHVua0lkKTtcblxuIFx0XHRcdFx0Ly8gY3JlYXRlIGVycm9yIGJlZm9yZSBzdGFjayB1bndvdW5kIHRvIGdldCB1c2VmdWwgc3RhY2t0cmFjZSBsYXRlclxuIFx0XHRcdFx0dmFyIGVycm9yID0gbmV3IEVycm9yKCk7XG4gXHRcdFx0XHRvblNjcmlwdENvbXBsZXRlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gXHRcdFx0XHRcdC8vIGF2b2lkIG1lbSBsZWFrcyBpbiBJRS5cbiBcdFx0XHRcdFx0c2NyaXB0Lm9uZXJyb3IgPSBzY3JpcHQub25sb2FkID0gbnVsbDtcbiBcdFx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuIFx0XHRcdFx0XHR2YXIgY2h1bmsgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHRcdFx0XHRcdGlmKGNodW5rICE9PSAwKSB7XG4gXHRcdFx0XHRcdFx0aWYoY2h1bmspIHtcbiBcdFx0XHRcdFx0XHRcdHZhciBlcnJvclR5cGUgPSBldmVudCAmJiAoZXZlbnQudHlwZSA9PT0gJ2xvYWQnID8gJ21pc3NpbmcnIDogZXZlbnQudHlwZSk7XG4gXHRcdFx0XHRcdFx0XHR2YXIgcmVhbFNyYyA9IGV2ZW50ICYmIGV2ZW50LnRhcmdldCAmJiBldmVudC50YXJnZXQuc3JjO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IubWVzc2FnZSA9ICdMb2FkaW5nIGNodW5rICcgKyBjaHVua0lkICsgJyBmYWlsZWQuXFxuKCcgKyBlcnJvclR5cGUgKyAnOiAnICsgcmVhbFNyYyArICcpJztcbiBcdFx0XHRcdFx0XHRcdGVycm9yLm5hbWUgPSAnQ2h1bmtMb2FkRXJyb3InO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IudHlwZSA9IGVycm9yVHlwZTtcbiBcdFx0XHRcdFx0XHRcdGVycm9yLnJlcXVlc3QgPSByZWFsU3JjO1xuIFx0XHRcdFx0XHRcdFx0Y2h1bmtbMV0oZXJyb3IpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSB1bmRlZmluZWQ7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH07XG4gXHRcdFx0XHR2YXIgdGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiBcdFx0XHRcdFx0b25TY3JpcHRDb21wbGV0ZSh7IHR5cGU6ICd0aW1lb3V0JywgdGFyZ2V0OiBzY3JpcHQgfSk7XG4gXHRcdFx0XHR9LCAxMjAwMDApO1xuIFx0XHRcdFx0c2NyaXB0Lm9uZXJyb3IgPSBzY3JpcHQub25sb2FkID0gb25TY3JpcHRDb21wbGV0ZTtcbiBcdFx0XHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0cmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbiBcdH07XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvYXNzZXRzL1wiO1xuXG4gXHQvLyBvbiBlcnJvciBmdW5jdGlvbiBmb3IgYXN5bmMgbG9hZGluZ1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vZSA9IGZ1bmN0aW9uKGVycikgeyBjb25zb2xlLmVycm9yKGVycik7IHRocm93IGVycjsgfTtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIGFkZCBlbnRyeSBtb2R1bGUgdG8gZGVmZXJyZWQgbGlzdFxuIFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2goW1wiLi9hc3NldHMvanMvcGFnZXMvZGF0YWJhc2UvZm9ybS5qc1wiLFwidmVuZG9yc35hbGVydHNfZm9ybX5hbGVydHNfbGlzdH5jb250ZW50LWhlYWRlcn5kYXNoYm9hcmQtcGFnZX5kYXNoYm9hcmRfZm9ybX5kYXNoYm9hcmRfbGlzdH5kYXRhYmFzZX5hZDZhMjc3YlwiLFwidmVuZG9yc35hbGVydHNfZm9ybX5hbGVydHNfbGlzdH5hcHB+ZGFzaGJvYXJkLXBhZ2V+ZGFzaGJvYXJkX2Zvcm1+ZGFzaGJvYXJkX2xpc3R+ZGF0YWJhc2VfZm9ybX5kYXRhYn43ZGY3NmI3YlwiLFwidmVuZG9yc35hbGVydHNfZm9ybX5hbGVydHNfbGlzdH5kYXNoYm9hcmQtcGFnZX5kYXNoYm9hcmRfZm9ybX5kYXNoYm9hcmRfbGlzdH5kYXRhYmFzZV9mb3JtfmRhdGFiYXNlX35hMGM1ZWRjMFwiLFwiYWxlcnRzX2Zvcm1+YWxlcnRzX2xpc3R+ZGFzaGJvYXJkLXBhZ2V+ZGFzaGJvYXJkX2Zvcm1+ZGFzaGJvYXJkX2xpc3R+ZGF0YWJhc2VfZm9ybX5kYXRhYmFzZV90YWJsZXN+ZX45Njc1NWI2NFwiXSk7XG4gXHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIHJlYWR5XG4gXHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiIsImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQge0lucHV0LCBCdXR0b24sIFNwaW5uZXIsIE1vZGFsLCBTaXplfSBmcm9tICcuLi8uLi9jb21wb25lbnRzJztcbmltcG9ydCB7QWxlcnQsIERhdGFiYXNlQWN0aW9uc30gZnJvbSAnLi4vLi4vYWN0aW9ucyc7XG5cbmNsYXNzIERhdGFiYXNlRm9ybSBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICBjb25zdCBjb2x1bW5zID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgICAgICBjb2x1bW5zLnB1c2godGhpcy5nZXRCbGFua0NvbHVtbigpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBpc05ldzogIXdpbmRvdy50YWJsZSxcbiAgICAgICAgICAgIG9yaWdpblRhYmxlOiB3aW5kb3cudGFibGUgPyB3aW5kb3cudGFibGUgOiAnJyxcbiAgICAgICAgICAgIHRhYmxlOiB3aW5kb3cudGFibGUgPyB3aW5kb3cudGFibGUgOiAnJyxcbiAgICAgICAgICAgIGNvbHVtbnMsXG4gICAgICAgICAgICB0dGw6ICcnLFxuICAgICAgICAgICAgdGFibGVFcnJvcjogZmFsc2UsXG4gICAgICAgICAgICBub0NvbHVtbkVycm9yOiBmYWxzZSxcbiAgICAgICAgICAgIGlzTG9hZGluZzogZmFsc2UsXG4gICAgICAgICAgICBkZWxldGluZ0NvbHVtbjogbnVsbCxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5vblRhYmxlQ2hhbmdlID0gdGhpcy5vblRhYmxlQ2hhbmdlLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuYWRkTW9yZUNvbHVtbiA9IHRoaXMuYWRkTW9yZUNvbHVtbi5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLm9uVFRMQ2hhbmdlID0gdGhpcy5vblRUTENoYW5nZS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLm9uU3VibWl0ID0gdGhpcy5vblN1Ym1pdC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLnNob3dEZWxldGVDb25maXJtYXRpb25Nb2RhbCA9IHRoaXMuc2hvd0RlbGV0ZUNvbmZpcm1hdGlvbk1vZGFsLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuZGVsZXRlQ29sdW1uID0gdGhpcy5kZWxldGVDb2x1bW4uYmluZCh0aGlzKTtcbiAgICB9XG5cbiAgICBsb2FkQ29sdW1ucyh0YWJsZSkge1xuICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBpc0xvYWRpbmc6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIERhdGFiYXNlQWN0aW9ucy5nZXRUYWJsZUNvbHVtbnModGFibGUpXG4gICAgICAgICAgICAudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHtlcnJvciwgdGFibGUsIGRhdGF9ID0gcmVzO1xuICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29uc3QgY29sdW1ucyA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaSBpbiBkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjb2x1bW4gPSBkYXRhW2ldO1xuICAgICAgICAgICAgICAgICAgICBjb2x1bW4gPSAkLmV4dGVuZCh0aGF0LmdldEJsYW5rQ29sdW1uKCksIGNvbHVtbik7XG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbi5pc05ldyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBjb2x1bW4ub3JpZ2luID0gY29sdW1uLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbi5vcmlnaW5UeXBlID0gY29sdW1uLnR5cGU7XG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnMucHVzaChjb2x1bW4pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoYXQuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICB0YWJsZSxcbiAgICAgICAgICAgICAgICAgICAgY29sdW1ucyxcbiAgICAgICAgICAgICAgICAgICAgaXNMb2FkaW5nOiBmYWxzZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIGNvbnN0IHt0YWJsZX0gPSB0aGlzLnN0YXRlO1xuICAgICAgICBpZiAodGFibGUpIHtcbiAgICAgICAgICAgIHRoaXMubG9hZENvbHVtbnModGFibGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0QmxhbmtDb2x1bW4oKSB7XG4gICAgICAgIHJldHVybiB7aXNOZXc6IHRydWUsIG5hbWU6ICcnLCBvcmlnaW46ICcnLCB0eXBlOiAnU3RyaW5nJywgb3JpZ2luVHlwZTogJycsIGVycm9yOiBmYWxzZX07XG4gICAgfVxuXG4gICAgb25UYWJsZUNoYW5nZShlKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgdGFibGU6IGUudGFyZ2V0LnZhbHVlLFxuICAgICAgICAgICAgdGFibGVFcnJvcjogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25UVExDaGFuZ2UoZSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHR0bDogZS50YXJnZXQudmFsdWVcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25Db2x1bW5DaGFuZ2Uoa2V5LCBuYW1lLCBlKSB7XG4gICAgICAgIGNvbnN0IHtjb2x1bW5zfSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGNvbHVtbnNba2V5XVtuYW1lXSA9IGUudGFyZ2V0LnZhbHVlO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGNvbHVtbnMsXG4gICAgICAgICAgICBub0NvbHVtbkVycm9yOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhZGRNb3JlQ29sdW1uKCkge1xuICAgICAgICBjb25zdCB7Y29sdW1uc30gPSB0aGlzLnN0YXRlO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICAgICAgY29sdW1ucy5wdXNoKHRoaXMuZ2V0QmxhbmtDb2x1bW4oKSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGNvbHVtbnNcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZGVsZXRlQ29sdW1uKCkge1xuICAgICAgICBsZXQge3RhYmxlLCBkZWxldGluZ0NvbHVtbiwgY29sdW1uc30gPSB0aGlzLnN0YXRlO1xuXG4gICAgICAgIGlmICghZGVsZXRpbmdDb2x1bW4pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIERhdGFiYXNlQWN0aW9ucy5kZWxldGVDb2x1bW4odGFibGUsIGRlbGV0aW5nQ29sdW1uLm9yaWdpbilcbiAgICAgICAgICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qge2Vycm9yfSA9IHJlcztcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IgIT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBBbGVydC5zdWNjZXNzKCdSZW1vdmUgc3VjY2Vzc2Z1bCcpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGtleSA9IGNvbHVtbnMuZmluZEluZGV4KChlbCkgPT4gZWwub3JpZ2luID09PSBkZWxldGluZ0NvbHVtbi5vcmlnaW4pXG4gICAgICAgICAgICAgICAgY29sdW1ucy5zcGxpY2Uoa2V5LCAxKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgY29sdW1ucyxcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRpbmdDb2x1bW46IG51bGxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgfVxuXG4gICAgc2hvd0RlbGV0ZUNvbmZpcm1hdGlvbk1vZGFsKGRlbGV0aW5nQ29sdW1uKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2RlbGV0aW5nQ29sdW1ufSlcbiAgICB9XG5cbiAgICBvblN1Ym1pdCgpIHtcbiAgICAgICAgbGV0IHtvcmlnaW5UYWJsZSwgdGFibGUsIHR0bCwgY29sdW1uc30gPSB0aGlzLnN0YXRlO1xuICAgICAgICB0YWJsZSA9ICQudHJpbSh0YWJsZSk7XG4gICAgICAgIHR0bCA9ICQudHJpbSh0dGwpO1xuICAgICAgICBjb25zdCBjaGFuZ2UgPSBbXTtcbiAgICAgICAgY29uc3QgdmFsaWRDb2x1bW5zID0gW107XG4gICAgICAgIGxldCBoYXNFcnJvckJlZm9yZSA9IGZhbHNlO1xuICAgICAgICBsZXQgaGFzRXJyb3IgPSBmYWxzZTtcbiAgICAgICAgbGV0IGhhc05ldyA9IGZhbHNlO1xuICAgICAgICBpZiAodGFibGUgPT09ICcnKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICB0YWJsZUVycm9yOiB0cnVlLFxuICAgICAgICAgICAgICAgIGlzTG9hZGluZzogZmFsc2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaGFzRXJyb3IgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRhYmxlICE9PSBvcmlnaW5UYWJsZSkge1xuICAgICAgICAgICAgY2hhbmdlLnB1c2goYFRhYmxlIGZyb20gXCIke29yaWdpblRhYmxlfVwiIHRvIFwiJHt0YWJsZX1cImApO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgY29sdW1uIG9mIGNvbHVtbnMpIHtcbiAgICAgICAgICAgIGxldCB7aXNOZXcsIG5hbWUsIG9yaWdpbiwgdHlwZSwgb3JpZ2luVHlwZSwgZXJyb3J9ID0gY29sdW1uO1xuICAgICAgICAgICAgY29sdW1uLmVycm9yID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBoYXNFcnJvckJlZm9yZSA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG5hbWUgPSAkLnRyaW0obmFtZSk7XG4gICAgICAgICAgICBpZiAoaXNOZXcgJiYgbmFtZSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG5hbWUgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgY29sdW1uLmVycm9yID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBoYXNFcnJvciA9IHRydWU7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghaXNOZXcpIHtcbiAgICAgICAgICAgICAgICBpZiAobmFtZSAhPT0gb3JpZ2luKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZS5wdXNoKGBDb2x1bW4gZnJvbSBcIiR7b3JpZ2lufVwiIHRvIFwiJHtuYW1lfVwiYCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0eXBlICE9PSBvcmlnaW5UeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZS5wdXNoKGBDb2x1bW4gXCIke29yaWdpbn1cIiBmcm9tIFwiJHtvcmlnaW5UeXBlfVwiIHRvIFwiJHt0eXBlfVwiYCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBoYXNOZXcgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YWxpZENvbHVtbnMucHVzaCh7XG4gICAgICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgICAgICBvcmlnaW4sXG4gICAgICAgICAgICAgICAgdHlwZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaGFzRXJyb3IgIT09IGhhc0Vycm9yQmVmb3JlIHx8IGhhc0Vycm9yKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBjb2x1bW5zLFxuICAgICAgICAgICAgICAgIGlzTG9hZGluZzogZmFsc2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhbGlkQ29sdW1ucy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGhhc0Vycm9yID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIG5vQ29sdW1uRXJyb3I6IHRydWUsXG4gICAgICAgICAgICAgICAgaXNMb2FkaW5nOiBmYWxzZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWhhc0Vycm9yKSB7XG4gICAgICAgICAgICBjb25zdCB0YWJsZURhdGEgPSB7XG4gICAgICAgICAgICAgICAgbmFtZTogdGFibGUsXG4gICAgICAgICAgICAgICAgdHRsLFxuICAgICAgICAgICAgICAgIGNvbHVtbnM6IHZhbGlkQ29sdW1uc1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG9yaWdpblRhYmxlICYmIGNoYW5nZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgQWxlcnQuY29uZmlybShcIkFyZSB5b3Ugc3VyZSB0byBjaGFuZ2UgdGFibGUgc3RydWN0dXJlP1xcblwiICsgY2hhbmdlLmpvaW4oXCJcXG5cIiksICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVPclVwZGF0ZShvcmlnaW5UYWJsZSwgdGFibGVEYXRhKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSBlbHNlIGlmICghb3JpZ2luVGFibGUgfHwgaGFzTmV3KSAge1xuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlT3JVcGRhdGUob3JpZ2luVGFibGUsIHRhYmxlRGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjcmVhdGVPclVwZGF0ZSh0YWJsZSwgZGF0YSkge1xuICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBpc0xvYWRpbmc6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIERhdGFiYXNlQWN0aW9ucy5jcmVhdGVPclVwZGF0ZSh0YWJsZSwgZGF0YSlcbiAgICAgICAgICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qge2Vycm9yLCByZWRpcmVjdH0gPSByZXM7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAocmVkaXJlY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgQWxlcnQuc3VjY2VzcygnQ3JlYXRlIHN1Y2Nlc3NmdWwnKTtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSByZWRpcmVjdDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBBbGVydC5zdWNjZXNzKCdVcGRhdGUgc3VjY2Vzc2Z1bCcpO1xuICAgICAgICAgICAgICAgICAgICB0aGF0LmxvYWRDb2x1bW5zKHRhYmxlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIGlzTG9hZGluZzogZmFsc2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIGlzTmV3LFxuICAgICAgICAgICAgdGFibGUsXG4gICAgICAgICAgICB0dGwsXG4gICAgICAgICAgICBjb2x1bW5zLFxuICAgICAgICAgICAgdGFibGVFcnJvcixcbiAgICAgICAgICAgIG5vQ29sdW1uRXJyb3IsXG4gICAgICAgICAgICBpc0xvYWRpbmcsXG4gICAgICAgICAgICBkZWxldGluZ0NvbHVtblxuICAgICAgICB9ID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgY29uc3QgcmVhZG9ubHkgPSAhaXNOZXc7XG4gICAgICAgIGNvbnN0IHR5cGVzID0gd2luZG93LmNsaWNraG91c2VUeXBlcztcbiAgICAgICAgY29uc3QgX2NvbHVtbnMgPSBjb2x1bW5zLm1hcCgoaXRlbSwga2V5KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBkaXNhYmxlZCA9IHJlYWRvbmx5ICYmICFpdGVtLmlzTmV3ICYmIChpdGVtLm9yaWdpbiA9PT0gJ3RpbWVzdGFtcCcgfHwgaXRlbS5vcmlnaW4gPT09ICdfaWQnKTtcbiAgICAgICAgICAgIHJldHVybiA8ZGl2IGtleT17a2V5fSBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtNVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPElucHV0IGRpc2FibGVkPXtkaXNhYmxlZH0gdmFsdWU9e2l0ZW0ubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9eyhpdGVtLmVycm9yID8gJ2lzLWludmFsaWQgJyA6ICcnKSArICd0YWJsZV9maWVsZCd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e2UgPT4gdGhpcy5vbkNvbHVtbkNoYW5nZShrZXksICduYW1lJywgZSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJOYW1lXCIvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtNVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCBkaXNhYmxlZD17ZGlzYWJsZWR9IGNsYXNzTmFtZT1cImZvcm0tY29udHJvbCB0YWJsZV90eXBlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2l0ZW0udHlwZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e2UgPT4gdGhpcy5vbkNvbHVtbkNoYW5nZShrZXksICd0eXBlJywgZSl9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0eXBlcy5tYXAoKHR5cGUsIGspID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxvcHRpb24ga2V5PXtrfSB2YWx1ZT17dHlwZX0+e3R5cGV9PC9vcHRpb24+O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICB7IWRpc2FibGVkICYmICFpdGVtLmlzTmV3ICYmXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YSBvbkNsaWNrPXsoKSA9PiB0aGlzLnNob3dEZWxldGVDb25maXJtYXRpb25Nb2RhbChpdGVtKX0gaHJlZj0nIydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJ0biBidG4tZGFuZ2VyIHRhYmxlX3JtX2NvbHVtblwiPjxpIGNsYXNzTmFtZT1cImZhIGZhLXRyYXNoXCI+PC9pPjwvYT5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+fVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+O1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkYXRhYmFzZSBjb250YWluZXItZmx1aWRcIj5cbiAgICAgICAgICAgICAgICA8TW9kYWxcbiAgICAgICAgICAgICAgICAgICAgc2l6ZT17U2l6ZS5tZWRpdW19XG4gICAgICAgICAgICAgICAgICAgIGlkPXsnZGVsZXRlLWNvbHVtbid9XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlPXtgRGVsZXRpbmcgY29sdW1uIFxcXCIke2RlbGV0aW5nQ29sdW1uPy5vcmlnaW59XFxcImB9XG4gICAgICAgICAgICAgICAgICAgIHNob3dDbG9zZUJ1dHRvbj17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgY2xvc2VCdXR0b25UaXRsZT0nQWJvcnQnXG4gICAgICAgICAgICAgICAgICAgIHNob3dTYXZlQnV0dG9uPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICBzYXZlQnV0dG9uVGl0bGU9J09LJ1xuICAgICAgICAgICAgICAgICAgICBzYXZlQnV0dG9uQ29sb3I9J2RhbmdlcidcbiAgICAgICAgICAgICAgICAgICAgc2F2ZUJ1dHRvbkFjdGlvbj17dGhpcy5kZWxldGVDb2x1bW59XG4gICAgICAgICAgICAgICAgICAgIHNob3c9e2RlbGV0aW5nQ29sdW1uICE9IG51bGx9XG4gICAgICAgICAgICAgICAgICAgIG9uSGlkZGVuPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtkZWxldGluZ0NvbHVtbjogbnVsbH0pXG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9eyd0ZXh0LWRhbmdlcid9PlxuICAgICAgICAgICAgICAgICAgICAgICAgQmUgY2FyZWZ1bCAtIHRoaXMgd2lsbCBhbHNvIGRlbGV0ZSB0aGUgY29sdW1uIGluIGNsaWNraG91c2UgdGFibGUhXG4gICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8L01vZGFsPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwiY2FyZC10aXRsZSBhbGlnbi1pdGVtcy1jZW50ZXIgcC0yXCI+e2lzTmV3ID8gJ0NyZWF0ZSBuZXcgdGFibGUnIDogJ1VwZGF0ZSB0YWJsZSd9PC9oMz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b24gY2xhc3NOYW1lPVwiZmxvYXQtZW5kXCIgY29sb3I9eydzdWNjZXNzJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5vblN1Ym1pdH0gaXNMb2FkaW5nPXtpc0xvYWRpbmd9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtpc05ldyA/ICdDcmVhdGUgdGFibGUnIDogJ1VwZGF0ZSB0YWJsZSd9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cblxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLWJvZHlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxmb3JtIHJvbGU9XCJmb3JtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD5UYWJsZSBuYW1lPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPElucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lPVwidGFibGVfbmFtZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3RhYmxlRXJyb3IgPyAnaXMtaW52YWxpZCcgOiAnJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiVGFibGUgbmFtZVwiIHZhbHVlPXt0YWJsZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uVGFibGVDaGFuZ2V9Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7aXNOZXcgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPlRhYmxlIFRUTDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxJbnB1dCBkaXNhYmxlZD17cmVhZG9ubHl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lPVwidGFibGVfdHRsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwidGltZXN0YW1wICsgdG9JbnRlcnZhbE1vbnRoKDEwMClcIiB2YWx1ZT17dHRsfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25UVExDaGFuZ2V9Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj59XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPVwiZXhhbXBsZUlucHV0UGFzc3dvcmQxXCI+Q29sdW1uPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge25vQ29sdW1uRXJyb3IgJiYgPGRpdiBjbGFzc05hbWU9eydyb3cgaGFzLWVycm9yJ30+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9eydjb2wtMTIgdGV4dC1yZWQnfT5QbGVhc2UgZmlsbCBhdCBsZXNzIG9uZSBjb2x1bW48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2Pn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTZcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBOYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTZcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUeXBlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2lzTG9hZGluZyA/IDxTcGlubmVyLz4gOiA8PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7X2NvbHVtbnN9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJib3gtZm9vdGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIGlkPVwiYnRuLW1vcmUtY29sdW1uXCIgY29sb3I9eydwcmltYXJ5J30gb25DbGljaz17dGhpcy5hZGRNb3JlQ29sdW1ufT5BZGRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3JlIGNvbHVtbjwvQnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Lz59XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuXG59XG5cblJlYWN0RE9NLnJlbmRlcig8RGF0YWJhc2VGb3JtLz4sIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyb290JykpO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgJGZpbmRJbmRleCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1pdGVyYXRpb24nKS5maW5kSW5kZXg7XG52YXIgYWRkVG9VbnNjb3BhYmxlcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hZGQtdG8tdW5zY29wYWJsZXMnKTtcblxudmFyIEZJTkRfSU5ERVggPSAnZmluZEluZGV4JztcbnZhciBTS0lQU19IT0xFUyA9IHRydWU7XG5cbi8vIFNob3VsZG4ndCBza2lwIGhvbGVzXG5pZiAoRklORF9JTkRFWCBpbiBbXSkgQXJyYXkoMSlbRklORF9JTkRFWF0oZnVuY3Rpb24gKCkgeyBTS0lQU19IT0xFUyA9IGZhbHNlOyB9KTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS5maW5kSW5kZXhgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuZmluZGluZGV4XG4kKHsgdGFyZ2V0OiAnQXJyYXknLCBwcm90bzogdHJ1ZSwgZm9yY2VkOiBTS0lQU19IT0xFUyB9LCB7XG4gIGZpbmRJbmRleDogZnVuY3Rpb24gZmluZEluZGV4KGNhbGxiYWNrZm4gLyogLCB0aGF0ID0gdW5kZWZpbmVkICovKSB7XG4gICAgcmV0dXJuICRmaW5kSW5kZXgodGhpcywgY2FsbGJhY2tmbiwgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQpO1xuICB9XG59KTtcblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUtQEB1bnNjb3BhYmxlc1xuYWRkVG9VbnNjb3BhYmxlcyhGSU5EX0lOREVYKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=