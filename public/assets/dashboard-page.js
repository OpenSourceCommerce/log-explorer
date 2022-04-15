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
/******/ 		"dashboard-page": 0
/******/ 	}
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"dashboard-page": 0
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
/******/ 	deferredModules.push(["./assets/js/pages/index/dashboard.js","vendors~alerts_form~alerts_list~content-header~dashboard-page~dashboard_form~dashboard_list~database~ad6a277b","vendors~alerts_form~alerts_list~app~dashboard-page~dashboard_form~dashboard_list~database_form~datab~7df76b7b","vendors~alerts_form~alerts_list~dashboard-page~dashboard_form~dashboard_list~database_form~database_~a0c5edc0","alerts_form~alerts_list~dashboard-page~dashboard_form~dashboard_list~database_form~database_tables~e~96755b64"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/js/pages/index/dashboard.js":
/*!********************************************!*\
  !*** ./assets/js/pages/index/dashboard.js ***!
  \********************************************/
/*! exports provided: DashboardPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($, moment) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardPage", function() { return DashboardPage; });
/* harmony import */ var regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! regenerator-runtime/runtime.js */ "./node_modules/regenerator-runtime/runtime.js");
/* harmony import */ var regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.promise.js */ "./node_modules/core-js/modules/es.promise.js");
/* harmony import */ var core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_array_reduce_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.array.reduce.js */ "./node_modules/core-js/modules/es.array.reduce.js");
/* harmony import */ var core_js_modules_es_array_reduce_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_reduce_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.array.find.js */ "./node_modules/core-js/modules/es.array.find.js");
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.array.concat.js */ "./node_modules/core-js/modules/es.array.concat.js");
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_date_to_string_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.date.to-string.js */ "./node_modules/core-js/modules/es.date.to-string.js");
/* harmony import */ var core_js_modules_es_date_to_string_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_date_to_string_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.regexp.to-string.js */ "./node_modules/core-js/modules/es.regexp.to-string.js");
/* harmony import */ var core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/es.array.map.js */ "./node_modules/core-js/modules/es.array.map.js");
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! core-js/modules/es.array.for-each.js */ "./node_modules/core-js/modules/es.array.for-each.js");
/* harmony import */ var core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var core_js_modules_es_string_fixed_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! core-js/modules/es.string.fixed.js */ "./node_modules/core-js/modules/es.string.fixed.js");
/* harmony import */ var core_js_modules_es_string_fixed_js__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_fixed_js__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! core-js/modules/es.array.includes.js */ "./node_modules/core-js/modules/es.array.includes.js");
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! core-js/modules/es.string.includes.js */ "./node_modules/core-js/modules/es.string.includes.js");
/* harmony import */ var core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var core_js_modules_es_string_split_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! core-js/modules/es.string.split.js */ "./node_modules/core-js/modules/es.string.split.js");
/* harmony import */ var core_js_modules_es_string_split_js__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_split_js__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! core-js/modules/es.function.name.js */ "./node_modules/core-js/modules/es.function.name.js");
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! core-js/modules/es.array.find-index.js */ "./node_modules/core-js/modules/es.array.find-index.js");
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var core_js_modules_es_string_trim_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! core-js/modules/es.string.trim.js */ "./node_modules/core-js/modules/es.string.trim.js");
/* harmony import */ var core_js_modules_es_string_trim_js__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_trim_js__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! core-js/modules/es.array.filter.js */ "./node_modules/core-js/modules/es.array.filter.js");
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! core-js/modules/es.object.keys.js */ "./node_modules/core-js/modules/es.object.keys.js");
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_23__);
/* harmony import */ var core_js_modules_es_array_some_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! core-js/modules/es.array.some.js */ "./node_modules/core-js/modules/es.array.some.js");
/* harmony import */ var core_js_modules_es_array_some_js__WEBPACK_IMPORTED_MODULE_24___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_some_js__WEBPACK_IMPORTED_MODULE_24__);
/* harmony import */ var core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! core-js/modules/es.object.define-property.js */ "./node_modules/core-js/modules/es.object.define-property.js");
/* harmony import */ var core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_25___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_25__);
/* harmony import */ var core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! core-js/modules/es.object.set-prototype-of.js */ "./node_modules/core-js/modules/es.object.set-prototype-of.js");
/* harmony import */ var core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_26___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_26__);
/* harmony import */ var core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! core-js/modules/es.object.get-prototype-of.js */ "./node_modules/core-js/modules/es.object.get-prototype-of.js");
/* harmony import */ var core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_27___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_27__);
/* harmony import */ var core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! core-js/modules/es.reflect.construct.js */ "./node_modules/core-js/modules/es.reflect.construct.js");
/* harmony import */ var core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_28___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_28__);
/* harmony import */ var core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! core-js/modules/es.object.create.js */ "./node_modules/core-js/modules/es.object.create.js");
/* harmony import */ var core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_29___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_29__);
/* harmony import */ var core_js_modules_es_array_is_array_js__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! core-js/modules/es.array.is-array.js */ "./node_modules/core-js/modules/es.array.is-array.js");
/* harmony import */ var core_js_modules_es_array_is_array_js__WEBPACK_IMPORTED_MODULE_30___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_is_array_js__WEBPACK_IMPORTED_MODULE_30__);
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_31___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_31__);
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! core-js/modules/es.symbol.description.js */ "./node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_32___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_32__);
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ "./node_modules/core-js/modules/es.symbol.iterator.js");
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_33___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_33__);
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! core-js/modules/es.array.slice.js */ "./node_modules/core-js/modules/es.array.slice.js");
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_34___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_34__);
/* harmony import */ var core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! core-js/modules/es.array.from.js */ "./node_modules/core-js/modules/es.array.from.js");
/* harmony import */ var core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_35___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_35__);
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor_js__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptor.js */ "./node_modules/core-js/modules/es.object.get-own-property-descriptor.js");
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor_js__WEBPACK_IMPORTED_MODULE_36___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptor_js__WEBPACK_IMPORTED_MODULE_36__);
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors_js__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptors.js */ "./node_modules/core-js/modules/es.object.get-own-property-descriptors.js");
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors_js__WEBPACK_IMPORTED_MODULE_37___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptors_js__WEBPACK_IMPORTED_MODULE_37__);
/* harmony import */ var core_js_modules_es_object_define_properties_js__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! core-js/modules/es.object.define-properties.js */ "./node_modules/core-js/modules/es.object.define-properties.js");
/* harmony import */ var core_js_modules_es_object_define_properties_js__WEBPACK_IMPORTED_MODULE_38___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_define_properties_js__WEBPACK_IMPORTED_MODULE_38__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_39___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_39__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_40___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_40__);
/* harmony import */ var _actions_log_table_actions__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ../../actions/_log-table-actions */ "./assets/js/actions/_log-table-actions.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ../../components */ "./assets/js/components/index.js");
/* harmony import */ var _components_button__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ../../components/_button */ "./assets/js/components/_button.js");
/* harmony import */ var _components_icon__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ../../components/_icon */ "./assets/js/components/_icon.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ../../actions */ "./assets/js/actions/index.js");
/* harmony import */ var _actions_dashboard_actions__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ../../actions/_dashboard-actions */ "./assets/js/actions/_dashboard-actions.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ../../utils */ "./assets/js/utils.js");
/* harmony import */ var _components_form_field__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! ../../components/_form-field */ "./assets/js/components/_form-field.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }



function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }








































function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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











var DashboardPage = /*#__PURE__*/function (_Component) {
  _inherits(DashboardPage, _Component);

  var _super = _createSuper(DashboardPage);

  function DashboardPage(props) {
    var _this;

    _classCallCheck(this, DashboardPage);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "loadingData", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var filters, uuid, _yield$Promise$all, _yield$Promise$all2, dashboardRes, widgetListRes, widgetList, dashboardDetail, tables, widgets, data, configs, _widgetList;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this.setState({
                isLoading: true
              });

              filters = _this.state.filters;
              uuid = window.uuid;
              _context.next = 5;
              return Promise.all([_actions_log_table_actions__WEBPACK_IMPORTED_MODULE_41__["default"].getDashboard(uuid), _actions__WEBPACK_IMPORTED_MODULE_45__["WidgetActions"].listWidget()]);

            case 5:
              _yield$Promise$all = _context.sent;
              _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 2);
              dashboardRes = _yield$Promise$all2[0];
              widgetListRes = _yield$Promise$all2[1];
              widgetList = widgetListRes && widgetListRes.data && widgetListRes.data.length > 0 ? widgetListRes.data : [];
              dashboardDetail = {};
              tables = [];

              if (!(dashboardRes && !dashboardRes.error)) {
                _context.next = 19;
                break;
              }

              widgets = dashboardRes.widgets, data = dashboardRes.data, configs = dashboardRes.configs;
              tables = widgets && widgets.length > 0 ? widgets.reduce(function (result, item, index) {
                if (item.table != '') {
                  if (result.length === 0 || !result.find(function (e) {
                    return e.value === item.table;
                  })) {
                    var isSelected = index === 0;

                    if (filters && filters.length > 0) {
                      isSelected = !!filters.find(function (el) {
                        return el.table === item.table;
                      });
                    }

                    result = [].concat(_toConsumableArray(result), [{
                      value: item.table,
                      label: item.table,
                      isSelected: isSelected
                    }]);
                  }
                }

                return result;
              }, []) : [];
              _context.next = 17;
              return _this.getWidgetDetail(widgets, configs, uuid);

            case 17:
              _widgetList = _context.sent;
              dashboardDetail = _objectSpread(_objectSpread({}, data), {}, {
                configs: configs && configs.size ? _objectSpread({}, configs) : {},
                widgets: _toConsumableArray(_widgetList)
              });

            case 19:
              _this.setState({
                dashboardDetail: dashboardDetail,
                widgetList: widgetList,
                isLoading: false,
                tables: tables
              });

            case 20:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));

    _defineProperty(_assertThisInitialized(_this), "onSaveChange", /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(widgetId) {
        var _this$state, dashboardDetail, widgetList, id, newWidget, widget, addWidgetRes;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(widgetId === 'createNewOne')) {
                  _context2.next = 3;
                  break;
                }

                window.location.href = '/widget/create';
                return _context2.abrupt("return");

              case 3:
                _this.setState({
                  isLoading: true
                });

                _this$state = _this.state, dashboardDetail = _this$state.dashboardDetail, widgetList = _this$state.widgetList;
                id = dashboardDetail.id;
                newWidget = {};
                widget = widgetList.find(function (item) {
                  return item.id.toString() === widgetId;
                });

                if (!widget) {
                  _context2.next = 24;
                  break;
                }

                _context2.t0 = widget.type.toString();
                _context2.next = _context2.t0 === _utils__WEBPACK_IMPORTED_MODULE_47__["WIDGET_TYPE"].bar ? 12 : _context2.t0 === _utils__WEBPACK_IMPORTED_MODULE_47__["WIDGET_TYPE"].line ? 12 : _context2.t0 === _utils__WEBPACK_IMPORTED_MODULE_47__["WIDGET_TYPE"].doughnut ? 12 : _context2.t0 === _utils__WEBPACK_IMPORTED_MODULE_47__["WIDGET_TYPE"].pie ? 12 : _context2.t0 === _utils__WEBPACK_IMPORTED_MODULE_47__["WIDGET_TYPE"].counterSum ? 14 : _context2.t0 === _utils__WEBPACK_IMPORTED_MODULE_47__["WIDGET_TYPE"].table ? 16 : 18;
                break;

              case 12:
                newWidget = {
                  x: 0,
                  y: 0,
                  width: 3,
                  height: 2,
                  fixed: null
                };
                return _context2.abrupt("break", 18);

              case 14:
                newWidget = {
                  x: 0,
                  y: 0,
                  width: 3,
                  height: 1,
                  fixed: null
                };
                return _context2.abrupt("break", 18);

              case 16:
                newWidget = {
                  x: 0,
                  y: 0,
                  width: 3,
                  height: 3,
                  fixed: null
                };
                return _context2.abrupt("break", 18);

              case 18:
                _context2.next = 20;
                return _actions_dashboard_actions__WEBPACK_IMPORTED_MODULE_46__["default"].addWidget(id, widget.id, newWidget);

              case 20:
                addWidgetRes = _context2.sent;

                if (!(addWidgetRes && !addWidgetRes.error)) {
                  _context2.next = 24;
                  break;
                }

                _context2.next = 24;
                return _this.loadingData();

              case 24:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "removeWidget", /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(id) {
        var dashboardDetail, removeWidgetRes;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _this.setState({
                  isLoading: true
                });

                dashboardDetail = _this.state.dashboardDetail;
                _context3.next = 4;
                return _actions_dashboard_actions__WEBPACK_IMPORTED_MODULE_46__["default"].removeWidget(dashboardDetail.id, id);

              case 4:
                removeWidgetRes = _context3.sent;

                if (!(removeWidgetRes && !removeWidgetRes.error)) {
                  _context3.next = 8;
                  break;
                }

                _context3.next = 8;
                return _this.loadingData();

              case 8:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      return function (_x2) {
        return _ref3.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "applyFilter", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      var _this$state2, filters, dashboardDetail, dateRange, uuid, widgets, rawWidget, filterRes;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _this.setState({
                isLoading: true
              });

              _this$state2 = _this.state, filters = _this$state2.filters, dashboardDetail = _this$state2.dashboardDetail, dateRange = _this$state2.dateRange;
              uuid = dashboardDetail.uuid;
              widgets = _toConsumableArray(dashboardDetail.widgets);
              rawWidget = widgets.map(function (item) {
                if (filters.length === 1 && !filters[0].query) {
                  return _actions_log_table_actions__WEBPACK_IMPORTED_MODULE_41__["default"].getWidget(uuid, item.widget_id);
                } else {
                  var tableSelected = filters.find(function (el) {
                    return el.table === item.table;
                  });

                  if (tableSelected && tableSelected.query) {
                    return _actions_log_table_actions__WEBPACK_IMPORTED_MODULE_41__["default"].getWidget(uuid, item.widget_id, tableSelected.query);
                  }
                }
              });
              _context4.next = 7;
              return Promise.all(rawWidget);

            case 7:
              filterRes = _context4.sent;

              if (filterRes && filterRes.length > 0) {
                filterRes.forEach(function (item, index) {
                  if (item && !item.error) {
                    widgets[index].data = item.data;
                    widgets[index].duration = 1000;

                    if (widgets[index].color && widgets[index].color.length !== item.data.length) {
                      widgets[index].color = item.data.map(function () {
                        return _this.getRandomColor();
                      });
                    }
                  }
                });
              }

              _this.setState({
                widgets: widgets,
                isLoading: false
              });

            case 10:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));

    _defineProperty(_assertThisInitialized(_this), "getRandomColor", function () {
      var letters = '0123456789ABCDEF';
      var color = '#';

      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }

      return color;
    });

    _defineProperty(_assertThisInitialized(_this), "getWidgetDetail", /*#__PURE__*/function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(widgets, configs, uuid, query) {
        var data, rawWidget, widgetRes;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                data = [];

                if (!(widgets && widgets.length > 0)) {
                  _context5.next = 7;
                  break;
                }

                rawWidget = widgets.map(function (item) {
                  return _actions_log_table_actions__WEBPACK_IMPORTED_MODULE_41__["default"].getWidget(uuid, item.widget_id, query);
                });
                _context5.next = 5;
                return Promise.all(rawWidget);

              case 5:
                widgetRes = _context5.sent;
                data = widgetRes && widgetRes.length > 0 && widgetRes.reduce(function (arr, item, index) {
                  var error = item.error,
                      data = item.data;
                  var _widgets$index = widgets[index],
                      id = _widgets$index.id,
                      x = _widgets$index.x,
                      y = _widgets$index.y,
                      width = _widgets$index.width,
                      height = _widgets$index.height,
                      fixed = _widgets$index.fixed,
                      title = _widgets$index.title,
                      type = _widgets$index.type,
                      widget_id = _widgets$index.widget_id,
                      color = _widgets$index.color,
                      w = _widgets$index.w,
                      h = _widgets$index.h;
                  var _configs$size$type = configs.size[type],
                      minWidth = _configs$size$type.minWidth,
                      minHeight = _configs$size$type.minHeight;
                  var colorForChart;

                  if (color && color.length > 0 && color.length === data.length) {
                    colorForChart = color;
                  } else if (type.toString() === _utils__WEBPACK_IMPORTED_MODULE_47__["WIDGET_TYPE"].doughnut || type.toString() === _utils__WEBPACK_IMPORTED_MODULE_47__["WIDGET_TYPE"].pie || type.toString() === _utils__WEBPACK_IMPORTED_MODULE_47__["WIDGET_TYPE"].bar || type.toString() === _utils__WEBPACK_IMPORTED_MODULE_47__["WIDGET_TYPE"].line) {
                    colorForChart = data.reduce(function (arr) {
                      var colorCode = _this.getRandomColor();

                      if (!arr.includes(colorCode)) {
                        arr.push(colorCode);
                      }

                      return arr;
                    }, []);
                  }

                  arr.push(_objectSpread(_objectSpread({}, widgets[index]), {}, {
                    data: data,
                    i: id.toString(),
                    x: x,
                    y: y,
                    w: w || width,
                    h: h || height,
                    minW: minWidth,
                    minH: minHeight,
                    "static": !!fixed,
                    title: title,
                    widget_id: widget_id,
                    type: type.toString(),
                    color: colorForChart,
                    duration: 1000
                  }));
                  return arr;
                }, []);

              case 7:
                return _context5.abrupt("return", data);

              case 8:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      return function (_x3, _x4, _x5, _x6) {
        return _ref5.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "onChangeFilter", /*#__PURE__*/function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(from, to, dateRange) {
        var dashboardDetail, widgets, configs, uuid, widgetList;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _this.setState({
                  isLoading: true
                });

                dashboardDetail = _this.state.dashboardDetail;
                widgets = dashboardDetail.widgets, configs = dashboardDetail.configs, uuid = dashboardDetail.uuid;
                _context6.next = 5;
                return _this.getWidgetDetail(widgets, configs, uuid);

              case 5:
                widgetList = _context6.sent;

                _this.setState({
                  dashboardDetail: _objectSpread(_objectSpread({}, dashboardDetail), {}, {
                    widgets: _toConsumableArray(widgetList)
                  }),
                  dateRange: dateRange,
                  isLoading: false
                }, function () {
                  _this.setDataCookies(null, dateRange);
                });

              case 7:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      return function (_x7, _x8, _x9) {
        return _ref6.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "getFilterDataFromCookies", function () {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var dateRange = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var cData = Object(_utils__WEBPACK_IMPORTED_MODULE_47__["getDataFromCookies"])(window.uuid) ? Object(_utils__WEBPACK_IMPORTED_MODULE_47__["getDataFromCookies"])(window.uuid).split('|') : '';
      var filterCookie = filters;
      var dateRangeCookie = dateRange;

      if (cData) {
        filterCookie = filterCookie || JSON.parse(decodeURIComponent(cData[1]));
        dateRangeCookie = dateRange || JSON.parse(cData[0]);
      }

      return {
        filterCookie: filterCookie,
        dateRangeCookie: dateRangeCookie
      };
    });

    _defineProperty(_assertThisInitialized(_this), "setDataCookies", function (filters, dateRange) {
      var _this$getFilterDataFr = _this.getFilterDataFromCookies(filters, dateRange),
          filterCookie = _this$getFilterDataFr.filterCookie,
          dateRangeCookie = _this$getFilterDataFr.dateRangeCookie;

      var filter = JSON.stringify(filterCookie.map(function (_ref7) {
        var query = _ref7.query,
            table = _ref7.table;
        return {
          query: query,
          table: table
        };
      }));
      Object(_utils__WEBPACK_IMPORTED_MODULE_47__["setDataToCookies"])(window.uuid, "".concat(JSON.stringify(dateRangeCookie), "|").concat(encodeURIComponent(filter)), 30);
    });

    _defineProperty(_assertThisInitialized(_this), "onQueryTableChange", function (_ref8, index) {
      var name = _ref8.name,
          value = _ref8.value;

      _this.setState(function (preState) {
        // in one table user only put one
        var tables = _toConsumableArray(preState.tables);

        var filters = _toConsumableArray(preState.filters);

        var widgets = _toConsumableArray(preState.dashboardDetail.widgets).map(function (item) {
          return _objectSpread(_objectSpread({}, item), {}, {
            duration: 0
          });
        });

        filters[index][name] = value;

        if (name === 'table') {
          tables = _toConsumableArray(preState.tables).map(function (item) {
            var filter = filters.find(function (el) {
              return el.table === item.value;
            });
            return _objectSpread(_objectSpread({}, item), {}, {
              isSelected: !!filter
            });
          });
        }

        _this.setDataCookies(filters);

        return {
          filters: filters,
          tables: tables,
          dashboardDetail: _objectSpread(_objectSpread({}, preState.dashboardDetail), {}, {
            widgets: widgets
          })
        };
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onWidgetClicked", function (value, column, table) {
      var queryStr = "".concat(column, " = '").concat(value, "'");
      var isQueryChange = false;

      if (/^\d+$/.test(value)) {
        queryStr = "".concat(column, " = ").concat(value);
      }

      var _this$state3 = _this.state,
          filters = _this$state3.filters,
          tables = _this$state3.tables,
          dashboardDetail = _this$state3.dashboardDetail;

      var widgets = _toConsumableArray(dashboardDetail.widgets).map(function (item) {
        return _objectSpread(_objectSpread({}, item), {}, {
          duration: 0
        });
      });

      var tableList = tables;
      var filterList = filters;
      var tableIndex = tableList.findIndex(function (item) {
        return item.value === table;
      });
      tableList[tableIndex].isSelected = true;
      var filterIndex = filters.findIndex(function (item) {
        return item.table === table;
      });

      if (filterIndex !== -1) {
        if (!filters[filterIndex].query.includes(value)) {
          filterList[filterIndex].query = filterList[filterIndex].query ? "".concat(filterList[filterIndex].query.trim(), " AND ").concat(queryStr) : queryStr;
          isQueryChange = true;
        }
      } else {
        filterList = [].concat(_toConsumableArray(filters), [{
          id: filters.length - 1,
          query: queryStr,
          table: table
        }]);
        isQueryChange = true;
      }

      if (isQueryChange) {
        _this.setState({
          tables: _toConsumableArray(tableList),
          filters: _toConsumableArray(filterList),
          dashboardDetail: _objectSpread(_objectSpread({}, dashboardDetail), {}, {
            widgets: widgets
          })
        }, function () {
          _this.setDataCookies(filters);

          $('#collapseAdvanceSearch').addClass('show');

          _this.applyFilter();
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onRemoveFilter", function (id, table) {
      _this.setState(function (preState) {
        var tables = _toConsumableArray(preState.tables);

        if (table) {
          var index = tables.findIndex(function (item) {
            return item.value === table;
          });
          tables[index].isSelected = false;
        }

        var filters = _toConsumableArray(preState.filters).filter(function (el) {
          return id !== el.id;
        });

        if (filters.length === 0) {
          filters.push({
            id: 0,
            query: '',
            table: tables[0].value
          });
          tables[0].isSelected = true;
        } else {
          filters.map(function (item, index) {
            return _objectSpread(_objectSpread({}, item), {}, {
              id: index
            });
          });
        }

        _this.setDataCookies(filters);

        return {
          filters: filters,
          tables: tables,
          dashboardDetail: _objectSpread(_objectSpread({}, preState.dashboardDetail), {}, {
            widgets: _toConsumableArray(preState.dashboardDetail.widgets).map(function (item) {
              return _objectSpread(_objectSpread({}, item), {}, {
                duration: 0
              });
            })
          })
        };
      });
    });

    _defineProperty(_assertThisInitialized(_this), "stickWidget", /*#__PURE__*/function () {
      var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(widgetId, fixed, index) {
        var dashboardDetail, widgets, _widgets$index2, x, y, w, h, stickWidgetRes;

        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _this.setState({
                  isLoading: true
                });

                dashboardDetail = _this.state.dashboardDetail;
                widgets = _toConsumableArray(dashboardDetail.widgets);
                _widgets$index2 = widgets[index], x = _widgets$index2.x, y = _widgets$index2.y, w = _widgets$index2.w, h = _widgets$index2.h;

                if (!widgetId) {
                  _context7.next = 9;
                  break;
                }

                _context7.next = 7;
                return _actions_dashboard_actions__WEBPACK_IMPORTED_MODULE_46__["default"].updateWidget(dashboardDetail.id, widgetId, {
                  fixed: fixed === true ? 1 : null,
                  x: x,
                  y: y,
                  width: w,
                  height: h
                });

              case 7:
                stickWidgetRes = _context7.sent;

                if (!stickWidgetRes.error) {
                  widgets[index]["static"] = fixed;

                  _this.setState({
                    dashboardDetail: _objectSpread(_objectSpread({}, dashboardDetail), {}, {
                      widgets: widgets.map(function (item) {
                        return _objectSpread(_objectSpread({}, item), {}, {
                          duration: 1000
                        });
                      })
                    }),
                    isLoading: false
                  });
                }

              case 9:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      return function (_x10, _x11, _x12) {
        return _ref9.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "onLayoutChange", /*#__PURE__*/function () {
      var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(e) {
        var dashboardDetail, widgets, id, keyForCheck, newWidgetPosition;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                dashboardDetail = _this.state.dashboardDetail;
                widgets = dashboardDetail.widgets, id = dashboardDetail.id;
                keyForCheck = ['x', 'y', 'w', 'h'];
                newWidgetPosition = _toConsumableArray(widgets).map(function (item) {
                  var widget_id = item.widget_id;
                  var isChangePosition = false;
                  var widget = e.find(function (el) {
                    return el.i === item.i;
                  });
                  Object.keys(item).forEach(function (key) {
                    if (keyForCheck.includes(key) && item[key] !== widget[key]) {
                      isChangePosition = true;
                      return;
                    }
                  });

                  if (isChangePosition) {
                    var x = widget.x,
                        y = widget.y,
                        w = widget.w,
                        h = widget.h;
                    _actions_dashboard_actions__WEBPACK_IMPORTED_MODULE_46__["default"].updateWidget(id, widget_id, {
                      x: x,
                      y: y,
                      width: w,
                      height: h
                    }).then(function (res) {
                      var error = res.error;

                      if (error) {
                        _this.setState({});
                      } else {//Alert.success('Change position success');
                      }
                    });
                  }

                  return _objectSpread(_objectSpread({}, item), widget);
                });

                _this.setState({
                  dashboardDetail: _objectSpread(_objectSpread({}, dashboardDetail), {}, {
                    widgets: _toConsumableArray(newWidgetPosition).map(function (item) {
                      return _objectSpread(_objectSpread({}, item), {}, {
                        duration: 0
                      });
                    })
                  })
                });

              case 5:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      return function (_x13) {
        return _ref10.apply(this, arguments);
      };
    }());

    var _filters = [{
      id: 0,
      query: '',
      table: ''
    }];
    var _dateRange = {
      from: _utils__WEBPACK_IMPORTED_MODULE_47__["DATE_RANGE"][0].from,
      to: _utils__WEBPACK_IMPORTED_MODULE_47__["DATE_RANGE"][0].to,
      label: _utils__WEBPACK_IMPORTED_MODULE_47__["DATE_RANGE"][0].label
    };

    var _this$getFilterDataFr2 = _this.getFilterDataFromCookies(),
        _filterCookie = _this$getFilterDataFr2.filterCookie,
        _dateRangeCookie = _this$getFilterDataFr2.dateRangeCookie;

    if (_filterCookie && _dateRangeCookie) {
      var dateRangeLabel = _dateRangeCookie.label || '';

      if (dateRangeLabel !== 'Custom Range') {
        var dateRangeValue = _utils__WEBPACK_IMPORTED_MODULE_47__["DATE_RANGE"].find(function (item) {
          return item.label === dateRangeLabel;
        });

        if (dateRangeValue) {
          _dateRange = _objectSpread({}, dateRangeValue);
        }
      } else {
        _dateRange.label = _dateRangeCookie.label;
        _dateRange.from = moment.unix(_dateRangeCookie.from);
        _dateRange.to = moment.unix(_dateRangeCookie.to);
      }

      _filters = _filterCookie && _filterCookie.length > 0 ? _filterCookie.map(function (item, index) {
        return _objectSpread(_objectSpread({}, item), {}, {
          id: index
        });
      }) : _filters;
    } else {
      _this.setDataCookies(_filters, {
        label: _dateRange.label
      });
    }

    _this.state = {
      dashboardDetail: {},
      widgetList: [],
      tables: [],
      filters: _filters,
      widgetSelected: null,
      isLoading: false,
      dateRange: _dateRange
    };
    return _this;
  }

  _createClass(DashboardPage, [{
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
        var _this$state4, filters, tables, newFilters;

        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return this.loadingData();

              case 2:
                _this$state4 = this.state, filters = _this$state4.filters, tables = _this$state4.tables;

                if (tables && tables.length > 0) {
                  newFilters = _toConsumableArray(filters);

                  if (!newFilters[0].table) {
                    newFilters[0].table = tables[0].value;
                  }

                  this.setDataCookies(newFilters);
                }

              case 4:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state5 = this.state,
          isLoading = _this$state5.isLoading,
          dashboardDetail = _this$state5.dashboardDetail,
          widgetList = _this$state5.widgetList,
          widgetSelected = _this$state5.widgetSelected,
          tables = _this$state5.tables,
          filters = _this$state5.filters,
          dateRange = _this$state5.dateRange;
      var title = dashboardDetail.title,
          widgets = dashboardDetail.widgets;
      var columns = widgetList.filter(function (e) {
        return !widgets.some(function (el) {
          return el.widget_id === e.id;
        });
      });
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_39___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_39___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_39___default.a.createElement("div", {
        className: "dashboard-container"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_39___default.a.createElement("h3", {
        className: "col-12"
      }, title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_39___default.a.createElement("div", {
        className: "filter col-12"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_39___default.a.createElement("div", {
        className: "card"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_39___default.a.createElement("div", {
        className: "card-body"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_39___default.a.createElement("div", {
        className: "col-12"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_39___default.a.createElement("div", {
        className: "row justify-content-between flex-row flex-wrap"
      }, isUser() || /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_39___default.a.createElement("div", {
        className: "col-md-3 col-12",
        style: {
          minWidth: '250px'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_39___default.a.createElement(_components_form_field__WEBPACK_IMPORTED_MODULE_48__["FormField"], {
        isHiddenLabel: true,
        value: widgetSelected || '',
        fieldName: "widgetSelected",
        onChange: function onChange(e) {
          return _this2.onSaveChange(e.target.value);
        },
        type: "select",
        className: "mb-0"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_39___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_39___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_39___default.a.createElement("option", {
        value: "",
        className: "d-none"
      }, "Add widget"), columns.length === 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_39___default.a.createElement("option", {
        value: "createNewOne"
      }, 'Create new one'), columns.map(function (item, index) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_39___default.a.createElement("option", {
          value: item.id,
          key: index
        }, item.title);
      })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_39___default.a.createElement("div", {
        className: "col-md-3 col-12 mt-2 mt-md-0 me-auto",
        style: {
          minWidth: '250px'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_39___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_42__["FilterDate"], {
        dateRange: dateRange,
        onDateRangeChanged: this.onChangeFilter
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_39___default.a.createElement("div", {
        className: "d-flex ms-auto mt-2 mt-md-0 mb-2 mb-md-0"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_39___default.a.createElement("div", {
        className: "me-2"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_39___default.a.createElement(_components_button__WEBPACK_IMPORTED_MODULE_43__["Button"], {
        id: "btn-search",
        className: "btn-search",
        disabled: isLoading,
        onClick: function onClick() {
          return _this2.onChangeFilter();
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_39___default.a.createElement(_components_icon__WEBPACK_IMPORTED_MODULE_44__["Icon"], {
        name: "sync"
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_39___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_39___default.a.createElement(_components_button__WEBPACK_IMPORTED_MODULE_43__["Button"], {
        id: "btn-filters",
        className: "btn-search",
        "data-toggle": "collapse",
        href: "#collapseAdvanceSearch",
        "aria-expanded": "false",
        "aria-controls": "collapseAdvanceSearch"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_39___default.a.createElement(_components_icon__WEBPACK_IMPORTED_MODULE_44__["Icon"], {
        name: "filter",
        className: "me-2"
      }), "Filters"))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_39___default.a.createElement("div", {
        className: "collapse col-12",
        id: "collapseAdvanceSearch"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_39___default.a.createElement("div", {
        className: "advanced-search",
        key: filters
      }, filters.map(function (item, index) {
        var id = item.id,
            query = item.query,
            table = item.table;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_39___default.a.createElement("div", {
          className: "row ms-0 mt-2",
          key: "".concat(query, "|").concat(table)
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_39___default.a.createElement("div", {
          className: "col-12 col-md-9 d-flex ps-0 mb-2 mb-md-0"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_39___default.a.createElement(_components_button__WEBPACK_IMPORTED_MODULE_43__["Button"], {
          className: "bg-transparent border-0 btn btn-light",
          onClick: function onClick() {
            return _this2.onRemoveFilter(id, table);
          }
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_39___default.a.createElement(_components_icon__WEBPACK_IMPORTED_MODULE_44__["Icon"], {
          name: "times",
          className: "align-self-center me-3"
        })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_39___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_42__["FilterText"], {
          className: "mb-0",
          placeholder: "status = 200 AND url LIKE '%product%'",
          value: query,
          onBlur: function onBlur(e) {
            return _this2.onQueryTableChange(e.target, index);
          }
        })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_39___default.a.createElement(_components_form_field__WEBPACK_IMPORTED_MODULE_48__["FormField"], {
          className: "col-12 col-md-3 mb-0 mb-2 mb-md-0",
          value: table,
          fieldName: "table",
          isHiddenLabel: true,
          onChange: function onChange(e) {
            return _this2.onQueryTableChange(e.target, index);
          },
          type: "select"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_39___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_39___default.a.Fragment, null, tables.map(function (item, index) {
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_39___default.a.createElement("option", {
            value: item.value,
            key: index,
            className: item.isSelected ? 'd-none' : ''
          }, item.label);
        }))));
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_39___default.a.createElement("div", {
        className: "d-flex justify-content-end mb-2"
      }, tables && tables.length > 0 && tables.length > filters.length && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_39___default.a.createElement("div", {
        className: "col-6 col-md-1 btn-action-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_39___default.a.createElement(_components_button__WEBPACK_IMPORTED_MODULE_43__["Button"], {
        className: "btn-search mt-0 mt-md-2 w-100",
        onClick: function onClick() {
          var table = tables.filter(function (item) {
            return !item.isSelected;
          })[0].value;
          var index = tables.findIndex(function (item) {
            return item.value === table;
          });

          var newTables = _toConsumableArray(tables);

          newTables[index].isSelected = true;

          _this2.setState({
            filters: [].concat(_toConsumableArray(filters), [{
              id: filters.length,
              table: table
            }]),
            widgets: _toConsumableArray(widgets).map(function (item) {
              return _objectSpread(_objectSpread({}, item), {}, {
                duration: 0
              });
            })
          });
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_39___default.a.createElement(_components_icon__WEBPACK_IMPORTED_MODULE_44__["Icon"], {
        name: "plus-circle"
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_39___default.a.createElement("div", {
        className: "btn-action-group pr-0"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_39___default.a.createElement(_components_button__WEBPACK_IMPORTED_MODULE_43__["Button"], {
        className: "btn-search mt-0 mt-md-2 w-100 text-nowrap",
        disabled: isLoading,
        onClick: function onClick() {
          return _this2.applyFilter();
        }
      }, "Apply"))))))), isLoading ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_39___default.a.createElement("span", {
        className: "spinner-border spinner-border-sm",
        role: "status",
        "aria-hidden": "true"
      }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_39___default.a.createElement("div", {
        key: widgets
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_39___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_42__["ResponsiveGridLayout"], {
        layouts: widgets,
        isResizable: !isUser(),
        isDraggable: !isUser(),
        removeWidget: function removeWidget(id) {
          return _this2.removeWidget(id);
        },
        stickWidget: this.stickWidget,
        editWidget: function editWidget(id) {
          window.location.href = '/widget/' + id;
        },
        onLayoutChange: this.onLayoutChange,
        onWidgetClicked: this.onWidgetClicked
      }))));
    }
  }]);

  return DashboardPage;
}(react__WEBPACK_IMPORTED_MODULE_39__["Component"]);
react_dom__WEBPACK_IMPORTED_MODULE_40___default.a.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_39___default.a.createElement(DashboardPage, null), document.querySelector('#root'));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js"), __webpack_require__(/*! moment */ "./node_modules/moment/moment.js")))

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


/***/ }),

/***/ "./node_modules/core-js/modules/es.array.some.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.some.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var $some = __webpack_require__(/*! ../internals/array-iteration */ "./node_modules/core-js/internals/array-iteration.js").some;
var arrayMethodIsStrict = __webpack_require__(/*! ../internals/array-method-is-strict */ "./node_modules/core-js/internals/array-method-is-strict.js");

var STRICT_METHOD = arrayMethodIsStrict('some');

// `Array.prototype.some` method
// https://tc39.es/ecma262/#sec-array.prototype.some
$({ target: 'Array', proto: true, forced: !STRICT_METHOD }, {
  some: function some(callbackfn /* , thisArg */) {
    return $some(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.string.fixed.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es.string.fixed.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var createHTML = __webpack_require__(/*! ../internals/create-html */ "./node_modules/core-js/internals/create-html.js");
var forcedStringHTMLMethod = __webpack_require__(/*! ../internals/string-html-forced */ "./node_modules/core-js/internals/string-html-forced.js");

// `String.prototype.fixed` method
// https://tc39.es/ecma262/#sec-string.prototype.fixed
$({ target: 'String', proto: true, forced: forcedStringHTMLMethod('fixed') }, {
  fixed: function fixed() {
    return createHTML(this, 'tt', '', '');
  }
});


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3BhZ2VzL2luZGV4L2Rhc2hib2FyZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLmFycmF5LmZpbmQtaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5hcnJheS5zb21lLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMuc3RyaW5nLmZpeGVkLmpzIl0sIm5hbWVzIjpbIkRhc2hib2FyZFBhZ2UiLCJwcm9wcyIsInNldFN0YXRlIiwiaXNMb2FkaW5nIiwiZmlsdGVycyIsInN0YXRlIiwidXVpZCIsIndpbmRvdyIsIlByb21pc2UiLCJhbGwiLCJMb2dUYWJsZUFjdGlvbnMiLCJnZXREYXNoYm9hcmQiLCJXaWRnZXRBY3Rpb25zIiwibGlzdFdpZGdldCIsImRhc2hib2FyZFJlcyIsIndpZGdldExpc3RSZXMiLCJ3aWRnZXRMaXN0IiwiZGF0YSIsImxlbmd0aCIsImRhc2hib2FyZERldGFpbCIsInRhYmxlcyIsImVycm9yIiwid2lkZ2V0cyIsImNvbmZpZ3MiLCJyZWR1Y2UiLCJyZXN1bHQiLCJpdGVtIiwiaW5kZXgiLCJ0YWJsZSIsImZpbmQiLCJlIiwidmFsdWUiLCJpc1NlbGVjdGVkIiwiZWwiLCJsYWJlbCIsImdldFdpZGdldERldGFpbCIsInNpemUiLCJ3aWRnZXRJZCIsImxvY2F0aW9uIiwiaHJlZiIsImlkIiwibmV3V2lkZ2V0Iiwid2lkZ2V0IiwidG9TdHJpbmciLCJ0eXBlIiwiV0lER0VUX1RZUEUiLCJiYXIiLCJsaW5lIiwiZG91Z2hudXQiLCJwaWUiLCJjb3VudGVyU3VtIiwieCIsInkiLCJ3aWR0aCIsImhlaWdodCIsImZpeGVkIiwiRGFzaGJvYXJkQWN0aW9ucyIsImFkZFdpZGdldCIsImFkZFdpZGdldFJlcyIsImxvYWRpbmdEYXRhIiwicmVtb3ZlV2lkZ2V0IiwicmVtb3ZlV2lkZ2V0UmVzIiwiZGF0ZVJhbmdlIiwicmF3V2lkZ2V0IiwibWFwIiwicXVlcnkiLCJnZXRXaWRnZXQiLCJ3aWRnZXRfaWQiLCJ0YWJsZVNlbGVjdGVkIiwiZmlsdGVyUmVzIiwiZm9yRWFjaCIsImR1cmF0aW9uIiwiY29sb3IiLCJnZXRSYW5kb21Db2xvciIsImxldHRlcnMiLCJpIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwid2lkZ2V0UmVzIiwiYXJyIiwidGl0bGUiLCJ3IiwiaCIsIm1pbldpZHRoIiwibWluSGVpZ2h0IiwiY29sb3JGb3JDaGFydCIsImNvbG9yQ29kZSIsImluY2x1ZGVzIiwicHVzaCIsIm1pblciLCJtaW5IIiwiZnJvbSIsInRvIiwic2V0RGF0YUNvb2tpZXMiLCJjRGF0YSIsImdldERhdGFGcm9tQ29va2llcyIsInNwbGl0IiwiZmlsdGVyQ29va2llIiwiZGF0ZVJhbmdlQ29va2llIiwiSlNPTiIsInBhcnNlIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwiZ2V0RmlsdGVyRGF0YUZyb21Db29raWVzIiwiZmlsdGVyIiwic3RyaW5naWZ5Iiwic2V0RGF0YVRvQ29va2llcyIsImVuY29kZVVSSUNvbXBvbmVudCIsIm5hbWUiLCJwcmVTdGF0ZSIsImNvbHVtbiIsInF1ZXJ5U3RyIiwiaXNRdWVyeUNoYW5nZSIsInRlc3QiLCJ0YWJsZUxpc3QiLCJmaWx0ZXJMaXN0IiwidGFibGVJbmRleCIsImZpbmRJbmRleCIsImZpbHRlckluZGV4IiwidHJpbSIsIiQiLCJhZGRDbGFzcyIsImFwcGx5RmlsdGVyIiwidXBkYXRlV2lkZ2V0Iiwic3RpY2tXaWRnZXRSZXMiLCJrZXlGb3JDaGVjayIsIm5ld1dpZGdldFBvc2l0aW9uIiwiaXNDaGFuZ2VQb3NpdGlvbiIsIk9iamVjdCIsImtleXMiLCJrZXkiLCJ0aGVuIiwicmVzIiwiREFURV9SQU5HRSIsImRhdGVSYW5nZUxhYmVsIiwiZGF0ZVJhbmdlVmFsdWUiLCJtb21lbnQiLCJ1bml4Iiwid2lkZ2V0U2VsZWN0ZWQiLCJuZXdGaWx0ZXJzIiwiY29sdW1ucyIsInNvbWUiLCJpc1VzZXIiLCJvblNhdmVDaGFuZ2UiLCJ0YXJnZXQiLCJvbkNoYW5nZUZpbHRlciIsIm9uUmVtb3ZlRmlsdGVyIiwib25RdWVyeVRhYmxlQ2hhbmdlIiwibmV3VGFibGVzIiwic3RpY2tXaWRnZXQiLCJvbkxheW91dENoYW5nZSIsIm9uV2lkZ2V0Q2xpY2tlZCIsIkNvbXBvbmVudCIsIlJlYWN0RE9NIiwicmVuZGVyIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSxRQUFRLG9CQUFvQjtRQUM1QjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLGlCQUFpQiw0QkFBNEI7UUFDN0M7UUFDQTtRQUNBLGtCQUFrQiwyQkFBMkI7UUFDN0M7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBOztRQUVBO1FBQ0E7UUFDQSwwQ0FBMEM7UUFDMUM7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBOzs7UUFHQTtRQUNBLG9CQUFvQjtRQUNwQjtRQUNBO1FBQ0E7UUFDQSx3QkFBd0I7UUFDeEI7UUFDQTtRQUNBLG1CQUFtQiw2QkFBNkI7UUFDaEQ7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLG1CQUFtQiw4QkFBOEI7UUFDakQ7UUFDQTtR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LFlBQVksbUJBQU8sQ0FBQyx5RkFBOEI7QUFDbEQsMEJBQTBCLG1CQUFPLENBQUMsdUdBQXFDOztBQUV2RTs7QUFFQTtBQUNBO0FBQ0EsR0FBRyx1REFBdUQ7QUFDMUQ7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7OztBQ2JZO0FBQ2IsUUFBUSxtQkFBTyxDQUFDLHVFQUFxQjtBQUNyQyxpQkFBaUIsbUJBQU8sQ0FBQyxpRkFBMEI7QUFDbkQsNkJBQTZCLG1CQUFPLENBQUMsK0ZBQWlDOztBQUV0RTtBQUNBO0FBQ0EsR0FBRyx5RUFBeUU7QUFDNUU7QUFDQTtBQUNBO0FBQ0EsQ0FBQyIsImZpbGUiOiJkYXNoYm9hcmQtcGFnZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0ZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soZGF0YSkge1xuIFx0XHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuIFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuIFx0XHR2YXIgZXhlY3V0ZU1vZHVsZXMgPSBkYXRhWzJdO1xuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHRcdC8vIGFkZCBlbnRyeSBtb2R1bGVzIGZyb20gbG9hZGVkIGNodW5rIHRvIGRlZmVycmVkIGxpc3RcbiBcdFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2guYXBwbHkoZGVmZXJyZWRNb2R1bGVzLCBleGVjdXRlTW9kdWxlcyB8fCBbXSk7XG5cbiBcdFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiBhbGwgY2h1bmtzIHJlYWR5XG4gXHRcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIFx0fTtcbiBcdGZ1bmN0aW9uIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCkge1xuIFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGRlZmVycmVkTW9kdWxlID0gZGVmZXJyZWRNb2R1bGVzW2ldO1xuIFx0XHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuIFx0XHRcdGZvcih2YXIgaiA9IDE7IGogPCBkZWZlcnJlZE1vZHVsZS5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGRlcElkID0gZGVmZXJyZWRNb2R1bGVbal07XG4gXHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbZGVwSWRdICE9PSAwKSBmdWxmaWxsZWQgPSBmYWxzZTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYoZnVsZmlsbGVkKSB7XG4gXHRcdFx0XHRkZWZlcnJlZE1vZHVsZXMuc3BsaWNlKGktLSwgMSk7XG4gXHRcdFx0XHRyZXN1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IGRlZmVycmVkTW9kdWxlWzBdKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHRyZXR1cm4gcmVzdWx0O1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIENTUyBjaHVua3NcbiBcdHZhciBpbnN0YWxsZWRDc3NDaHVua3MgPSB7XG4gXHRcdFwiZGFzaGJvYXJkLXBhZ2VcIjogMFxuIFx0fVxuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJkYXNoYm9hcmQtcGFnZVwiOiAwXG4gXHR9O1xuXG4gXHR2YXIgZGVmZXJyZWRNb2R1bGVzID0gW107XG5cbiBcdC8vIHNjcmlwdCBwYXRoIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBqc29ucFNjcmlwdFNyYyhjaHVua0lkKSB7XG4gXHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgKHt9W2NodW5rSWRdfHxjaHVua0lkKSArIFwiLmpzXCJcbiBcdH1cblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG4gXHQvLyBUaGlzIGZpbGUgY29udGFpbnMgb25seSB0aGUgZW50cnkgY2h1bmsuXG4gXHQvLyBUaGUgY2h1bmsgbG9hZGluZyBmdW5jdGlvbiBmb3IgYWRkaXRpb25hbCBjaHVua3NcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZSA9IGZ1bmN0aW9uIHJlcXVpcmVFbnN1cmUoY2h1bmtJZCkge1xuIFx0XHR2YXIgcHJvbWlzZXMgPSBbXTtcblxuXG4gXHRcdC8vIG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIENTUyBsb2FkaW5nXG4gXHRcdHZhciBjc3NDaHVua3MgPSB7XCIwXCI6MX07XG4gXHRcdGlmKGluc3RhbGxlZENzc0NodW5rc1tjaHVua0lkXSkgcHJvbWlzZXMucHVzaChpbnN0YWxsZWRDc3NDaHVua3NbY2h1bmtJZF0pO1xuIFx0XHRlbHNlIGlmKGluc3RhbGxlZENzc0NodW5rc1tjaHVua0lkXSAhPT0gMCAmJiBjc3NDaHVua3NbY2h1bmtJZF0pIHtcbiBcdFx0XHRwcm9taXNlcy5wdXNoKGluc3RhbGxlZENzc0NodW5rc1tjaHVua0lkXSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdFx0dmFyIGhyZWYgPSBcIlwiICsgKHt9W2NodW5rSWRdfHxjaHVua0lkKSArIFwiLmNzc1wiO1xuIFx0XHRcdFx0dmFyIGZ1bGxocmVmID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgaHJlZjtcbiBcdFx0XHRcdHZhciBleGlzdGluZ0xpbmtUYWdzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJsaW5rXCIpO1xuIFx0XHRcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGV4aXN0aW5nTGlua1RhZ3MubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0dmFyIHRhZyA9IGV4aXN0aW5nTGlua1RhZ3NbaV07XG4gXHRcdFx0XHRcdHZhciBkYXRhSHJlZiA9IHRhZy5nZXRBdHRyaWJ1dGUoXCJkYXRhLWhyZWZcIikgfHwgdGFnLmdldEF0dHJpYnV0ZShcImhyZWZcIik7XG4gXHRcdFx0XHRcdGlmKHRhZy5yZWwgPT09IFwic3R5bGVzaGVldFwiICYmIChkYXRhSHJlZiA9PT0gaHJlZiB8fCBkYXRhSHJlZiA9PT0gZnVsbGhyZWYpKSByZXR1cm4gcmVzb2x2ZSgpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0dmFyIGV4aXN0aW5nU3R5bGVUYWdzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzdHlsZVwiKTtcbiBcdFx0XHRcdGZvcih2YXIgaSA9IDA7IGkgPCBleGlzdGluZ1N0eWxlVGFncy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHR2YXIgdGFnID0gZXhpc3RpbmdTdHlsZVRhZ3NbaV07XG4gXHRcdFx0XHRcdHZhciBkYXRhSHJlZiA9IHRhZy5nZXRBdHRyaWJ1dGUoXCJkYXRhLWhyZWZcIik7XG4gXHRcdFx0XHRcdGlmKGRhdGFIcmVmID09PSBocmVmIHx8IGRhdGFIcmVmID09PSBmdWxsaHJlZikgcmV0dXJuIHJlc29sdmUoKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdHZhciBsaW5rVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XG4gXHRcdFx0XHRsaW5rVGFnLnJlbCA9IFwic3R5bGVzaGVldFwiO1xuIFx0XHRcdFx0bGlua1RhZy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuIFx0XHRcdFx0bGlua1RhZy5vbmxvYWQgPSByZXNvbHZlO1xuIFx0XHRcdFx0bGlua1RhZy5vbmVycm9yID0gZnVuY3Rpb24oZXZlbnQpIHtcbiBcdFx0XHRcdFx0dmFyIHJlcXVlc3QgPSBldmVudCAmJiBldmVudC50YXJnZXQgJiYgZXZlbnQudGFyZ2V0LnNyYyB8fCBmdWxsaHJlZjtcbiBcdFx0XHRcdFx0dmFyIGVyciA9IG5ldyBFcnJvcihcIkxvYWRpbmcgQ1NTIGNodW5rIFwiICsgY2h1bmtJZCArIFwiIGZhaWxlZC5cXG4oXCIgKyByZXF1ZXN0ICsgXCIpXCIpO1xuIFx0XHRcdFx0XHRlcnIucmVxdWVzdCA9IHJlcXVlc3Q7XG4gXHRcdFx0XHRcdHJlamVjdChlcnIpO1xuIFx0XHRcdFx0fTtcbiBcdFx0XHRcdGxpbmtUYWcuaHJlZiA9IGZ1bGxocmVmO1xuIFx0XHRcdFx0dmFyIGhlYWQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF07XG4gXHRcdFx0XHRoZWFkLmFwcGVuZENoaWxkKGxpbmtUYWcpO1xuIFx0XHRcdH0pLnRoZW4oZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRpbnN0YWxsZWRDc3NDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHRcdH0pKTtcbiBcdFx0fVxuXG4gXHRcdC8vIEpTT05QIGNodW5rIGxvYWRpbmcgZm9yIGphdmFzY3JpcHRcblxuIFx0XHR2YXIgaW5zdGFsbGVkQ2h1bmtEYXRhID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEgIT09IDApIHsgLy8gMCBtZWFucyBcImFscmVhZHkgaW5zdGFsbGVkXCIuXG5cbiBcdFx0XHQvLyBhIFByb21pc2UgbWVhbnMgXCJjdXJyZW50bHkgbG9hZGluZ1wiLlxuIFx0XHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSkge1xuIFx0XHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDaHVua0RhdGFbMl0pO1xuIFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHQvLyBzZXR1cCBQcm9taXNlIGluIGNodW5rIGNhY2hlXG4gXHRcdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdFx0XHRpbnN0YWxsZWRDaHVua0RhdGEgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSBbcmVzb2x2ZSwgcmVqZWN0XTtcbiBcdFx0XHRcdH0pO1xuIFx0XHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDaHVua0RhdGFbMl0gPSBwcm9taXNlKTtcblxuIFx0XHRcdFx0Ly8gc3RhcnQgY2h1bmsgbG9hZGluZ1xuIFx0XHRcdFx0dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuIFx0XHRcdFx0dmFyIG9uU2NyaXB0Q29tcGxldGU7XG5cbiBcdFx0XHRcdHNjcmlwdC5jaGFyc2V0ID0gJ3V0Zi04JztcbiBcdFx0XHRcdHNjcmlwdC50aW1lb3V0ID0gMTIwO1xuIFx0XHRcdFx0aWYgKF9fd2VicGFja19yZXF1aXJlX18ubmMpIHtcbiBcdFx0XHRcdFx0c2NyaXB0LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIF9fd2VicGFja19yZXF1aXJlX18ubmMpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0c2NyaXB0LnNyYyA9IGpzb25wU2NyaXB0U3JjKGNodW5rSWQpO1xuXG4gXHRcdFx0XHQvLyBjcmVhdGUgZXJyb3IgYmVmb3JlIHN0YWNrIHVud291bmQgdG8gZ2V0IHVzZWZ1bCBzdGFja3RyYWNlIGxhdGVyXG4gXHRcdFx0XHR2YXIgZXJyb3IgPSBuZXcgRXJyb3IoKTtcbiBcdFx0XHRcdG9uU2NyaXB0Q29tcGxldGUgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiBcdFx0XHRcdFx0Ly8gYXZvaWQgbWVtIGxlYWtzIGluIElFLlxuIFx0XHRcdFx0XHRzY3JpcHQub25lcnJvciA9IHNjcmlwdC5vbmxvYWQgPSBudWxsO1xuIFx0XHRcdFx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG4gXHRcdFx0XHRcdHZhciBjaHVuayA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdFx0XHRcdFx0aWYoY2h1bmsgIT09IDApIHtcbiBcdFx0XHRcdFx0XHRpZihjaHVuaykge1xuIFx0XHRcdFx0XHRcdFx0dmFyIGVycm9yVHlwZSA9IGV2ZW50ICYmIChldmVudC50eXBlID09PSAnbG9hZCcgPyAnbWlzc2luZycgOiBldmVudC50eXBlKTtcbiBcdFx0XHRcdFx0XHRcdHZhciByZWFsU3JjID0gZXZlbnQgJiYgZXZlbnQudGFyZ2V0ICYmIGV2ZW50LnRhcmdldC5zcmM7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci5tZXNzYWdlID0gJ0xvYWRpbmcgY2h1bmsgJyArIGNodW5rSWQgKyAnIGZhaWxlZC5cXG4oJyArIGVycm9yVHlwZSArICc6ICcgKyByZWFsU3JjICsgJyknO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IubmFtZSA9ICdDaHVua0xvYWRFcnJvcic7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci50eXBlID0gZXJyb3JUeXBlO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IucmVxdWVzdCA9IHJlYWxTcmM7XG4gXHRcdFx0XHRcdFx0XHRjaHVua1sxXShlcnJvcik7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IHVuZGVmaW5lZDtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fTtcbiBcdFx0XHRcdHZhciB0aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpe1xuIFx0XHRcdFx0XHRvblNjcmlwdENvbXBsZXRlKHsgdHlwZTogJ3RpbWVvdXQnLCB0YXJnZXQ6IHNjcmlwdCB9KTtcbiBcdFx0XHRcdH0sIDEyMDAwMCk7XG4gXHRcdFx0XHRzY3JpcHQub25lcnJvciA9IHNjcmlwdC5vbmxvYWQgPSBvblNjcmlwdENvbXBsZXRlO1xuIFx0XHRcdFx0ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRyZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuIFx0fTtcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9hc3NldHMvXCI7XG5cbiBcdC8vIG9uIGVycm9yIGZ1bmN0aW9uIGZvciBhc3luYyBsb2FkaW5nXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm9lID0gZnVuY3Rpb24oZXJyKSB7IGNvbnNvbGUuZXJyb3IoZXJyKTsgdGhyb3cgZXJyOyB9O1xuXG4gXHR2YXIganNvbnBBcnJheSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSB8fCBbXTtcbiBcdHZhciBvbGRKc29ucEZ1bmN0aW9uID0ganNvbnBBcnJheS5wdXNoLmJpbmQoanNvbnBBcnJheSk7XG4gXHRqc29ucEFycmF5LnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjaztcbiBcdGpzb25wQXJyYXkgPSBqc29ucEFycmF5LnNsaWNlKCk7XG4gXHRmb3IodmFyIGkgPSAwOyBpIDwganNvbnBBcnJheS5sZW5ndGg7IGkrKykgd2VicGFja0pzb25wQ2FsbGJhY2soanNvbnBBcnJheVtpXSk7XG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IG9sZEpzb25wRnVuY3Rpb247XG5cblxuIFx0Ly8gYWRkIGVudHJ5IG1vZHVsZSB0byBkZWZlcnJlZCBsaXN0XG4gXHRkZWZlcnJlZE1vZHVsZXMucHVzaChbXCIuL2Fzc2V0cy9qcy9wYWdlcy9pbmRleC9kYXNoYm9hcmQuanNcIixcInZlbmRvcnN+YWxlcnRzX2Zvcm1+YWxlcnRzX2xpc3R+Y29udGVudC1oZWFkZXJ+ZGFzaGJvYXJkLXBhZ2V+ZGFzaGJvYXJkX2Zvcm1+ZGFzaGJvYXJkX2xpc3R+ZGF0YWJhc2V+YWQ2YTI3N2JcIixcInZlbmRvcnN+YWxlcnRzX2Zvcm1+YWxlcnRzX2xpc3R+YXBwfmRhc2hib2FyZC1wYWdlfmRhc2hib2FyZF9mb3JtfmRhc2hib2FyZF9saXN0fmRhdGFiYXNlX2Zvcm1+ZGF0YWJ+N2RmNzZiN2JcIixcInZlbmRvcnN+YWxlcnRzX2Zvcm1+YWxlcnRzX2xpc3R+ZGFzaGJvYXJkLXBhZ2V+ZGFzaGJvYXJkX2Zvcm1+ZGFzaGJvYXJkX2xpc3R+ZGF0YWJhc2VfZm9ybX5kYXRhYmFzZV9+YTBjNWVkYzBcIixcImFsZXJ0c19mb3JtfmFsZXJ0c19saXN0fmRhc2hib2FyZC1wYWdlfmRhc2hib2FyZF9mb3JtfmRhc2hib2FyZF9saXN0fmRhdGFiYXNlX2Zvcm1+ZGF0YWJhc2VfdGFibGVzfmV+OTY3NTViNjRcIl0pO1xuIFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiByZWFkeVxuIFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4iLCJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IExvZ1RhYmxlQWN0aW9ucyBmcm9tIFwiLi4vLi4vYWN0aW9ucy9fbG9nLXRhYmxlLWFjdGlvbnNcIjtcbmltcG9ydCB7RmlsdGVyRGF0ZSwgRmlsdGVyVGV4dCwgUmVzcG9uc2l2ZUdyaWRMYXlvdXR9IGZyb20gXCIuLi8uLi9jb21wb25lbnRzXCI7XG5pbXBvcnQge0J1dHRvbn0gZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvX2J1dHRvblwiO1xuaW1wb3J0IHtJY29ufSBmcm9tIFwiLi4vLi4vY29tcG9uZW50cy9faWNvblwiO1xuaW1wb3J0IHtEYXRhYmFzZUFjdGlvbnMsIFdpZGdldEFjdGlvbnN9IGZyb20gXCIuLi8uLi9hY3Rpb25zXCI7XG5pbXBvcnQgRGFzaGJvYXJkQWN0aW9ucyBmcm9tIFwiLi4vLi4vYWN0aW9ucy9fZGFzaGJvYXJkLWFjdGlvbnNcIjtcbmltcG9ydCB7REFURV9SQU5HRSwgZ2V0RGF0YUZyb21Db29raWVzLCBzZXREYXRhVG9Db29raWVzLCBXSURHRVRfVFlQRX0gZnJvbSBcIi4uLy4uL3V0aWxzXCI7XG5pbXBvcnQge0Zvcm1GaWVsZH0gZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvX2Zvcm0tZmllbGRcIjtcblxuZXhwb3J0IGNsYXNzIERhc2hib2FyZFBhZ2UgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcblxuICAgICAgICBsZXQgZmlsdGVycyA9IFt7XG4gICAgICAgICAgICBpZDogMCxcbiAgICAgICAgICAgIHF1ZXJ5OiAnJyxcbiAgICAgICAgICAgIHRhYmxlOiAnJ1xuICAgICAgICB9XTtcbiAgICAgICAgbGV0IGRhdGVSYW5nZSA9IHtcbiAgICAgICAgICAgIGZyb206IERBVEVfUkFOR0VbMF0uZnJvbSxcbiAgICAgICAgICAgIHRvOiBEQVRFX1JBTkdFWzBdLnRvLFxuICAgICAgICAgICAgbGFiZWw6IERBVEVfUkFOR0VbMF0ubGFiZWwsXG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3Qge2ZpbHRlckNvb2tpZSwgZGF0ZVJhbmdlQ29va2llfSA9IHRoaXMuZ2V0RmlsdGVyRGF0YUZyb21Db29raWVzKCk7XG4gICAgICAgIGlmIChmaWx0ZXJDb29raWUgJiYgZGF0ZVJhbmdlQ29va2llKSB7XG4gICAgICAgICAgICBjb25zdCBkYXRlUmFuZ2VMYWJlbCA9IGRhdGVSYW5nZUNvb2tpZS5sYWJlbCB8fCAnJztcbiAgICAgICAgICAgIGlmIChkYXRlUmFuZ2VMYWJlbCAhPT0gJ0N1c3RvbSBSYW5nZScpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRlUmFuZ2VWYWx1ZSA9IERBVEVfUkFOR0UuZmluZChpdGVtID0+IGl0ZW0ubGFiZWwgPT09IGRhdGVSYW5nZUxhYmVsKTtcbiAgICAgICAgICAgICAgICBpZiAoZGF0ZVJhbmdlVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0ZVJhbmdlID0gey4uLmRhdGVSYW5nZVZhbHVlfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRhdGVSYW5nZS5sYWJlbCA9IGRhdGVSYW5nZUNvb2tpZS5sYWJlbDtcbiAgICAgICAgICAgICAgICBkYXRlUmFuZ2UuZnJvbSA9IG1vbWVudC51bml4KGRhdGVSYW5nZUNvb2tpZS5mcm9tKTtcbiAgICAgICAgICAgICAgICBkYXRlUmFuZ2UudG8gPSBtb21lbnQudW5peChkYXRlUmFuZ2VDb29raWUudG8pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmlsdGVycyA9IGZpbHRlckNvb2tpZSAmJiBmaWx0ZXJDb29raWUubGVuZ3RoID4gMD8gZmlsdGVyQ29va2llLm1hcCgoaXRlbSwgaW5kZXgpID0+ICh7XG4gICAgICAgICAgICAgICAgLi4uaXRlbSxcbiAgICAgICAgICAgICAgICBpZDogaW5kZXhcbiAgICAgICAgICAgIH0pKSA6IGZpbHRlcnM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNldERhdGFDb29raWVzKGZpbHRlcnMsIHtsYWJlbDogZGF0ZVJhbmdlLmxhYmVsfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgZGFzaGJvYXJkRGV0YWlsOiB7fSxcbiAgICAgICAgICAgIHdpZGdldExpc3Q6IFtdLFxuICAgICAgICAgICAgdGFibGVzOiBbXSxcbiAgICAgICAgICAgIGZpbHRlcnMsXG4gICAgICAgICAgICB3aWRnZXRTZWxlY3RlZDogbnVsbCxcbiAgICAgICAgICAgIGlzTG9hZGluZzogZmFsc2UsXG4gICAgICAgICAgICBkYXRlUmFuZ2UsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgYXN5bmMgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIGF3YWl0IHRoaXMubG9hZGluZ0RhdGEoKTtcblxuICAgICAgICBjb25zdCB7IGZpbHRlcnMsIHRhYmxlcyB9ID0gdGhpcy5zdGF0ZTtcblxuICAgICAgICBpZiAodGFibGVzICYmIHRhYmxlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBuZXdGaWx0ZXJzID0gWy4uLmZpbHRlcnNdO1xuXG4gICAgICAgICAgICBpZiAoIW5ld0ZpbHRlcnNbMF0udGFibGUpIHtcbiAgICAgICAgICAgICAgICBuZXdGaWx0ZXJzWzBdLnRhYmxlID0gdGFibGVzWzBdLnZhbHVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnNldERhdGFDb29raWVzKG5ld0ZpbHRlcnMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbG9hZGluZ0RhdGEgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgaXNMb2FkaW5nOiB0cnVlLFxuICAgICAgICB9KVxuXG4gICAgICAgIGNvbnN0IHsgZmlsdGVycyB9ID0gdGhpcy5zdGF0ZTtcblxuICAgICAgICBjb25zdCB1dWlkID0gd2luZG93LnV1aWQ7XG5cbiAgICAgICAgY29uc3QgW2Rhc2hib2FyZFJlcywgd2lkZ2V0TGlzdFJlc10gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICBMb2dUYWJsZUFjdGlvbnMuZ2V0RGFzaGJvYXJkKHV1aWQpLFxuICAgICAgICAgICAgV2lkZ2V0QWN0aW9ucy5saXN0V2lkZ2V0KCksXG4gICAgICAgIF0pO1xuXG4gICAgICAgIGNvbnN0IHdpZGdldExpc3QgPSB3aWRnZXRMaXN0UmVzICYmIHdpZGdldExpc3RSZXMuZGF0YSAmJiB3aWRnZXRMaXN0UmVzLmRhdGEubGVuZ3RoID4gMCA/IHdpZGdldExpc3RSZXMuZGF0YSA6IFtdO1xuXG4gICAgICAgIGxldCBkYXNoYm9hcmREZXRhaWwgPSB7fTtcblxuICAgICAgICBsZXQgdGFibGVzID0gW107XG5cbiAgICAgICAgaWYgKGRhc2hib2FyZFJlcyAmJiAhZGFzaGJvYXJkUmVzLmVycm9yKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHt3aWRnZXRzLCBkYXRhLCBjb25maWdzfSA9IGRhc2hib2FyZFJlcztcblxuICAgICAgICAgICAgdGFibGVzID0gd2lkZ2V0cyAmJiB3aWRnZXRzLmxlbmd0aCA+IDAgPyB3aWRnZXRzLnJlZHVjZSgocmVzdWx0LCBpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChpdGVtLnRhYmxlICE9ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQubGVuZ3RoID09PSAwIHx8ICFyZXN1bHQuZmluZChlID0+IGUudmFsdWUgPT09IGl0ZW0udGFibGUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaXNTZWxlY3RlZCA9IGluZGV4ID09PSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpbHRlcnMgJiYgZmlsdGVycy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNTZWxlY3RlZCA9ICEhZmlsdGVycy5maW5kKChlbCkgPT4gZWwudGFibGUgPT09IGl0ZW0udGFibGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLnJlc3VsdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBpdGVtLnRhYmxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogaXRlbS50YWJsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNTZWxlY3RlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH0sIFtdKSA6IFtdO1xuXG5cbiAgICAgICAgICAgIGNvbnN0IHdpZGdldExpc3QgPSBhd2FpdCB0aGlzLmdldFdpZGdldERldGFpbCh3aWRnZXRzLCBjb25maWdzLCB1dWlkKTtcblxuICAgICAgICAgICAgZGFzaGJvYXJkRGV0YWlsID0ge1xuICAgICAgICAgICAgICAgIC4uLmRhdGEsXG4gICAgICAgICAgICAgICAgY29uZmlnczogY29uZmlncyAmJiBjb25maWdzLnNpemUgPyB7Li4uY29uZmlnc30gOiB7fSxcbiAgICAgICAgICAgICAgICB3aWRnZXRzOiBbLi4ud2lkZ2V0TGlzdF0sXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBkYXNoYm9hcmREZXRhaWwsXG4gICAgICAgICAgICB3aWRnZXRMaXN0LFxuICAgICAgICAgICAgaXNMb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgICAgIHRhYmxlc1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvblNhdmVDaGFuZ2UgPSBhc3luYyAod2lkZ2V0SWQpID0+IHtcbiAgICAgICAgaWYgKHdpZGdldElkID09PSAnY3JlYXRlTmV3T25lJykge1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL3dpZGdldC9jcmVhdGUnO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgaXNMb2FkaW5nOiB0cnVlLFxuICAgICAgICB9KVxuXG4gICAgICAgIGNvbnN0IHtkYXNoYm9hcmREZXRhaWwsIHdpZGdldExpc3R9ID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgY29uc3Qge2lkfSA9IGRhc2hib2FyZERldGFpbDtcbiAgICAgICAgbGV0IG5ld1dpZGdldCA9IHt9O1xuICAgICAgICBjb25zdCB3aWRnZXQgPSB3aWRnZXRMaXN0LmZpbmQoaXRlbSA9PiBpdGVtLmlkLnRvU3RyaW5nKCkgPT09IHdpZGdldElkKTtcbiAgICAgICAgaWYgKHdpZGdldCkge1xuICAgICAgICAgICAgc3dpdGNoICh3aWRnZXQudHlwZS50b1N0cmluZygpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBXSURHRVRfVFlQRS5iYXI6XG4gICAgICAgICAgICAgICAgY2FzZSBXSURHRVRfVFlQRS5saW5lOlxuICAgICAgICAgICAgICAgIGNhc2UgV0lER0VUX1RZUEUuZG91Z2hudXQ6XG4gICAgICAgICAgICAgICAgY2FzZSBXSURHRVRfVFlQRS5waWU6IHtcbiAgICAgICAgICAgICAgICAgICAgbmV3V2lkZ2V0ID0ge3g6IDAsIHk6IDAsIHdpZHRoOiAzLCBoZWlnaHQ6IDIsIGZpeGVkOiBudWxsfTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhc2UgV0lER0VUX1RZUEUuY291bnRlclN1bToge1xuICAgICAgICAgICAgICAgICAgICBuZXdXaWRnZXQgPSB7eDogMCwgeTogMCwgd2lkdGg6IDMsIGhlaWdodDogMSwgZml4ZWQ6IG51bGx9O1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2FzZSBXSURHRVRfVFlQRS50YWJsZToge1xuICAgICAgICAgICAgICAgICAgICBuZXdXaWRnZXQgPSB7eDogMCwgeTogMCwgd2lkdGg6IDMsIGhlaWdodDogMywgZml4ZWQ6IG51bGx9O1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGFkZFdpZGdldFJlcyA9IGF3YWl0IERhc2hib2FyZEFjdGlvbnMuYWRkV2lkZ2V0KGlkLCB3aWRnZXQuaWQsIG5ld1dpZGdldCk7XG5cbiAgICAgICAgICAgIGlmIChhZGRXaWRnZXRSZXMgJiYgIWFkZFdpZGdldFJlcy5lcnJvcikge1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMubG9hZGluZ0RhdGEoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbW92ZVdpZGdldCA9IGFzeW5jIChpZCkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGlzTG9hZGluZzogdHJ1ZSxcbiAgICAgICAgfSlcbiAgICAgICAgY29uc3Qge2Rhc2hib2FyZERldGFpbH0gPSB0aGlzLnN0YXRlO1xuICAgICAgICBjb25zdCByZW1vdmVXaWRnZXRSZXMgPSBhd2FpdCBEYXNoYm9hcmRBY3Rpb25zLnJlbW92ZVdpZGdldChkYXNoYm9hcmREZXRhaWwuaWQsIGlkKTtcblxuICAgICAgICBpZiAocmVtb3ZlV2lkZ2V0UmVzICYmICFyZW1vdmVXaWRnZXRSZXMuZXJyb3IpIHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMubG9hZGluZ0RhdGEoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFwcGx5RmlsdGVyID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtpc0xvYWRpbmc6IHRydWV9KVxuXG4gICAgICAgIGNvbnN0IHtmaWx0ZXJzLCBkYXNoYm9hcmREZXRhaWwsIGRhdGVSYW5nZX0gPSB0aGlzLnN0YXRlO1xuICAgICAgICBjb25zdCB7dXVpZH0gPSBkYXNoYm9hcmREZXRhaWw7XG4gICAgICAgIGxldCB3aWRnZXRzID0gWy4uLmRhc2hib2FyZERldGFpbC53aWRnZXRzXTtcbiAgICAgICAgY29uc3QgcmF3V2lkZ2V0ID0gd2lkZ2V0cy5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGlmIChmaWx0ZXJzLmxlbmd0aCA9PT0gMSAmJiAhZmlsdGVyc1swXS5xdWVyeSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBMb2dUYWJsZUFjdGlvbnMuZ2V0V2lkZ2V0KHV1aWQsIGl0ZW0ud2lkZ2V0X2lkKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGFibGVTZWxlY3RlZCA9IGZpbHRlcnMuZmluZChlbCA9PiBlbC50YWJsZSA9PT0gaXRlbS50YWJsZSk7XG4gICAgICAgICAgICAgICAgaWYgKHRhYmxlU2VsZWN0ZWQgJiYgdGFibGVTZWxlY3RlZC5xdWVyeSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gTG9nVGFibGVBY3Rpb25zLmdldFdpZGdldCh1dWlkLCBpdGVtLndpZGdldF9pZCwgdGFibGVTZWxlY3RlZC5xdWVyeSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgZmlsdGVyUmVzID0gYXdhaXQgUHJvbWlzZS5hbGwocmF3V2lkZ2V0KTtcblxuICAgICAgICBpZiAoZmlsdGVyUmVzICYmIGZpbHRlclJlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBmaWx0ZXJSZXMuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbSAmJiAhaXRlbS5lcnJvcikge1xuICAgICAgICAgICAgICAgICAgICB3aWRnZXRzW2luZGV4XS5kYXRhID0gaXRlbS5kYXRhO1xuICAgICAgICAgICAgICAgICAgICB3aWRnZXRzW2luZGV4XS5kdXJhdGlvbiA9IDEwMDA7XG4gICAgICAgICAgICAgICAgICAgIGlmICh3aWRnZXRzW2luZGV4XS5jb2xvciAmJiB3aWRnZXRzW2luZGV4XS5jb2xvci5sZW5ndGggIT09IGl0ZW0uZGF0YS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldHNbaW5kZXhdLmNvbG9yID0gaXRlbS5kYXRhLm1hcCgoKSA9PiB0aGlzLmdldFJhbmRvbUNvbG9yKCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHdpZGdldHMsXG4gICAgICAgICAgICBpc0xvYWRpbmc6IGZhbHNlLFxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGdldFJhbmRvbUNvbG9yID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBsZXR0ZXJzID0gJzAxMjM0NTY3ODlBQkNERUYnO1xuICAgICAgICBsZXQgY29sb3IgPSAnIyc7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNjsgaSsrKSB7XG4gICAgICAgICAgICBjb2xvciArPSBsZXR0ZXJzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDE2KV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbG9yO1xuICAgIH1cblxuXG4gICAgZ2V0V2lkZ2V0RGV0YWlsID0gYXN5bmMgKHdpZGdldHMsIGNvbmZpZ3MsIHV1aWQsIHF1ZXJ5KSA9PiB7XG4gICAgICAgIGxldCBkYXRhID0gW107XG4gICAgICAgIGlmICh3aWRnZXRzICYmIHdpZGdldHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc3QgcmF3V2lkZ2V0ID0gd2lkZ2V0cy5tYXAoKGl0ZW0pID0+IExvZ1RhYmxlQWN0aW9ucy5nZXRXaWRnZXQodXVpZCwgaXRlbS53aWRnZXRfaWQsIHF1ZXJ5KSk7XG4gICAgICAgICAgICBjb25zdCB3aWRnZXRSZXMgPSBhd2FpdCBQcm9taXNlLmFsbChyYXdXaWRnZXQpO1xuXG4gICAgICAgICAgICBkYXRhID0gd2lkZ2V0UmVzICYmIHdpZGdldFJlcy5sZW5ndGggPiAwICYmIHdpZGdldFJlcy5yZWR1Y2UoKGFyciwgaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB7ZXJyb3IsIGRhdGF9ID0gaXRlbTtcbiAgICAgICAgICAgICAgICBjb25zdCB7aWQsIHgsIHksIHdpZHRoLCBoZWlnaHQsIGZpeGVkLCB0aXRsZSwgdHlwZSwgd2lkZ2V0X2lkLCBjb2xvciwgdywgaH0gPSB3aWRnZXRzW2luZGV4XTtcbiAgICAgICAgICAgICAgICBjb25zdCB7bWluV2lkdGgsIG1pbkhlaWdodH0gPSBjb25maWdzLnNpemVbdHlwZV07XG5cbiAgICAgICAgICAgICAgICBsZXQgY29sb3JGb3JDaGFydDtcbiAgICAgICAgICAgICAgICBpZiAoY29sb3IgJiYgY29sb3IubGVuZ3RoID4gMCAmJiBjb2xvci5sZW5ndGggPT09IGRhdGEubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbG9yRm9yQ2hhcnQgPSBjb2xvcjtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGUudG9TdHJpbmcoKSA9PT0gV0lER0VUX1RZUEUuZG91Z2hudXQgfHwgdHlwZS50b1N0cmluZygpID09PSBXSURHRVRfVFlQRS5waWUgfHwgdHlwZS50b1N0cmluZygpID09PSBXSURHRVRfVFlQRS5iYXIgfHwgdHlwZS50b1N0cmluZygpID09PSBXSURHRVRfVFlQRS5saW5lKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbG9yRm9yQ2hhcnQgPSBkYXRhLnJlZHVjZSgoYXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjb2xvckNvZGUgPSB0aGlzLmdldFJhbmRvbUNvbG9yKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZighYXJyLmluY2x1ZGVzKGNvbG9yQ29kZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnIucHVzaChjb2xvckNvZGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFycjtcbiAgICAgICAgICAgICAgICAgICAgfSwgW10pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGFyci5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgLi4ud2lkZ2V0c1tpbmRleF0sXG4gICAgICAgICAgICAgICAgICAgIGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIGk6IGlkLnRvU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgIHgsXG4gICAgICAgICAgICAgICAgICAgIHksXG4gICAgICAgICAgICAgICAgICAgIHc6IHcgfHwgd2lkdGgsXG4gICAgICAgICAgICAgICAgICAgIGg6IGggfHwgaGVpZ2h0LFxuICAgICAgICAgICAgICAgICAgICBtaW5XOiBtaW5XaWR0aCxcbiAgICAgICAgICAgICAgICAgICAgbWluSDogbWluSGVpZ2h0LFxuICAgICAgICAgICAgICAgICAgICBzdGF0aWM6ICEhZml4ZWQsXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlLFxuICAgICAgICAgICAgICAgICAgICB3aWRnZXRfaWQsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IHR5cGUudG9TdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6IGNvbG9yRm9yQ2hhcnQsXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBhcnI7XG4gICAgICAgICAgICB9LCBbXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuXG4gICAgb25DaGFuZ2VGaWx0ZXIgPSBhc3luYyAoZnJvbSwgdG8sIGRhdGVSYW5nZSkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGlzTG9hZGluZzogdHJ1ZSxcbiAgICAgICAgfSlcblxuICAgICAgICBjb25zdCB7ZGFzaGJvYXJkRGV0YWlsfSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGNvbnN0IHt3aWRnZXRzLCBjb25maWdzLCB1dWlkfSA9IGRhc2hib2FyZERldGFpbDtcbiAgICAgICAgY29uc3Qgd2lkZ2V0TGlzdCA9IGF3YWl0IHRoaXMuZ2V0V2lkZ2V0RGV0YWlsKHdpZGdldHMsIGNvbmZpZ3MsIHV1aWQpO1xuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgZGFzaGJvYXJkRGV0YWlsOiB7XG4gICAgICAgICAgICAgICAgLi4uZGFzaGJvYXJkRGV0YWlsLFxuICAgICAgICAgICAgICAgIHdpZGdldHM6IFsuLi53aWRnZXRMaXN0XSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkYXRlUmFuZ2UsXG4gICAgICAgICAgICBpc0xvYWRpbmc6IGZhbHNlLFxuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldERhdGFDb29raWVzKG51bGwsIGRhdGVSYW5nZSk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZ2V0RmlsdGVyRGF0YUZyb21Db29raWVzID0gKGZpbHRlcnMgPSBudWxsLCBkYXRlUmFuZ2UgPSBudWxsKSA9PiB7XG4gICAgICAgIGNvbnN0IGNEYXRhID0gZ2V0RGF0YUZyb21Db29raWVzKHdpbmRvdy51dWlkKSA/XG4gICAgICAgICAgICBnZXREYXRhRnJvbUNvb2tpZXMod2luZG93LnV1aWQpLnNwbGl0KCd8JykgOiAnJztcblxuICAgICAgICBsZXQgZmlsdGVyQ29va2llID0gZmlsdGVycztcbiAgICAgICAgbGV0IGRhdGVSYW5nZUNvb2tpZSA9IGRhdGVSYW5nZTtcblxuICAgICAgICBpZihjRGF0YSkge1xuICAgICAgICAgICAgZmlsdGVyQ29va2llID0gZmlsdGVyQ29va2llIHx8IEpTT04ucGFyc2UoZGVjb2RlVVJJQ29tcG9uZW50KGNEYXRhWzFdKSlcbiAgICAgICAgICAgIGRhdGVSYW5nZUNvb2tpZSA9IGRhdGVSYW5nZSB8fCBKU09OLnBhcnNlKGNEYXRhWzBdKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtmaWx0ZXJDb29raWUsIGRhdGVSYW5nZUNvb2tpZX1cbiAgICB9XG5cbiAgICBzZXREYXRhQ29va2llcyA9IChmaWx0ZXJzLCBkYXRlUmFuZ2UpID0+IHtcbiAgICAgICAgY29uc3Qge2ZpbHRlckNvb2tpZSwgZGF0ZVJhbmdlQ29va2llfSA9IHRoaXMuZ2V0RmlsdGVyRGF0YUZyb21Db29raWVzKGZpbHRlcnMsIGRhdGVSYW5nZSlcbiAgICAgICAgY29uc3QgZmlsdGVyID0gSlNPTi5zdHJpbmdpZnkoZmlsdGVyQ29va2llLm1hcCgoe3F1ZXJ5LCB0YWJsZX0pID0+ICh7cXVlcnksIHRhYmxlfSkpKVxuICAgICAgICBzZXREYXRhVG9Db29raWVzKHdpbmRvdy51dWlkLCBgJHtKU09OLnN0cmluZ2lmeShkYXRlUmFuZ2VDb29raWUpfXwke2VuY29kZVVSSUNvbXBvbmVudChmaWx0ZXIpfWAsIDMwKTtcbiAgICB9XG5cbiAgICBvblF1ZXJ5VGFibGVDaGFuZ2UgPSAoe25hbWUsIHZhbHVlfSwgaW5kZXgpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSgocHJlU3RhdGUpID0+IHtcbiAgICAgICAgICAgIC8vIGluIG9uZSB0YWJsZSB1c2VyIG9ubHkgcHV0IG9uZVxuICAgICAgICAgICAgbGV0IHRhYmxlcyA9IFsuLi5wcmVTdGF0ZS50YWJsZXNdO1xuICAgICAgICAgICAgY29uc3QgZmlsdGVycyA9IFsuLi5wcmVTdGF0ZS5maWx0ZXJzXTtcbiAgICAgICAgICAgIGNvbnN0IHdpZGdldHMgPSBbLi4ucHJlU3RhdGUuZGFzaGJvYXJkRGV0YWlsLndpZGdldHNdLm1hcChpdGVtID0+ICh7IC4uLml0ZW0sIGR1cmF0aW9uOiAwfSkpO1xuXG4gICAgICAgICAgICBmaWx0ZXJzW2luZGV4XVtuYW1lXSA9IHZhbHVlO1xuXG4gICAgICAgICAgICBpZiAobmFtZSA9PT0gJ3RhYmxlJykge1xuICAgICAgICAgICAgICAgIHRhYmxlcyA9IFsuLi5wcmVTdGF0ZS50YWJsZXNdLm1hcChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZmlsdGVyID0gZmlsdGVycy5maW5kKGVsID0+IGVsLnRhYmxlID09PSBpdGVtLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLml0ZW0sXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1NlbGVjdGVkOiAhIWZpbHRlcixcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YUNvb2tpZXMoZmlsdGVycyk7XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgZmlsdGVycyxcbiAgICAgICAgICAgICAgICB0YWJsZXMsXG4gICAgICAgICAgICAgICAgZGFzaGJvYXJkRGV0YWlsOiB7XG4gICAgICAgICAgICAgICAgICAgIC4uLnByZVN0YXRlLmRhc2hib2FyZERldGFpbCxcbiAgICAgICAgICAgICAgICAgICAgd2lkZ2V0cyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvbldpZGdldENsaWNrZWQgPSAodmFsdWUsIGNvbHVtbiwgdGFibGUpID0+IHtcbiAgICAgICAgbGV0IHF1ZXJ5U3RyID0gYCR7Y29sdW1ufSA9ICcke3ZhbHVlfSdgXG4gICAgICAgIGxldCBpc1F1ZXJ5Q2hhbmdlID0gZmFsc2VcblxuICAgICAgICBpZiAoL15cXGQrJC8udGVzdCh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHF1ZXJ5U3RyID0gYCR7Y29sdW1ufSA9ICR7dmFsdWV9YFxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qge2ZpbHRlcnMsIHRhYmxlcywgZGFzaGJvYXJkRGV0YWlsfSA9IHRoaXMuc3RhdGVcblxuICAgICAgICBjb25zdCB3aWRnZXRzID0gWy4uLmRhc2hib2FyZERldGFpbC53aWRnZXRzXS5tYXAoaXRlbSA9PiAoe1xuICAgICAgICAgICAgLi4uaXRlbSxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAwXG4gICAgICAgIH0pKTtcblxuICAgICAgICBjb25zdCB0YWJsZUxpc3QgPSB0YWJsZXNcbiAgICAgICAgbGV0IGZpbHRlckxpc3QgPSBmaWx0ZXJzXG5cbiAgICAgICAgY29uc3QgdGFibGVJbmRleCA9IHRhYmxlTGlzdC5maW5kSW5kZXgoaXRlbSA9PiBpdGVtLnZhbHVlID09PSB0YWJsZSlcbiAgICAgICAgdGFibGVMaXN0W3RhYmxlSW5kZXhdLmlzU2VsZWN0ZWQgPSB0cnVlXG5cbiAgICAgICAgY29uc3QgZmlsdGVySW5kZXggPSBmaWx0ZXJzLmZpbmRJbmRleChpdGVtID0+IGl0ZW0udGFibGUgPT09IHRhYmxlKVxuXG4gICAgICAgIGlmIChmaWx0ZXJJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgIGlmICghZmlsdGVyc1tmaWx0ZXJJbmRleF0ucXVlcnkuaW5jbHVkZXModmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgZmlsdGVyTGlzdFtmaWx0ZXJJbmRleF0ucXVlcnkgPSBmaWx0ZXJMaXN0W2ZpbHRlckluZGV4XS5xdWVyeSA/IGAke2ZpbHRlckxpc3RbZmlsdGVySW5kZXhdLnF1ZXJ5LnRyaW0oKX0gQU5EICR7cXVlcnlTdHJ9YCA6IHF1ZXJ5U3RyXG4gICAgICAgICAgICAgICAgaXNRdWVyeUNoYW5nZSA9IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZpbHRlckxpc3QgPSBbLi4uZmlsdGVycywge1xuICAgICAgICAgICAgICAgIGlkOiBmaWx0ZXJzLmxlbmd0aCAtIDEsXG4gICAgICAgICAgICAgICAgcXVlcnk6IHF1ZXJ5U3RyLFxuICAgICAgICAgICAgICAgIHRhYmxlOiB0YWJsZVxuICAgICAgICAgICAgfV1cbiAgICAgICAgICAgIGlzUXVlcnlDaGFuZ2UgPSB0cnVlXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNRdWVyeUNoYW5nZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgdGFibGVzOiBbLi4udGFibGVMaXN0XSxcbiAgICAgICAgICAgICAgICBmaWx0ZXJzOiBbLi4uZmlsdGVyTGlzdF0sXG4gICAgICAgICAgICAgICAgZGFzaGJvYXJkRGV0YWlsOiB7XG4gICAgICAgICAgICAgICAgICAgIC4uLmRhc2hib2FyZERldGFpbCxcbiAgICAgICAgICAgICAgICAgICAgd2lkZ2V0cyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YUNvb2tpZXMoZmlsdGVycylcbiAgICAgICAgICAgICAgICAkKCcjY29sbGFwc2VBZHZhbmNlU2VhcmNoJykuYWRkQ2xhc3MoJ3Nob3cnKVxuICAgICAgICAgICAgICAgIHRoaXMuYXBwbHlGaWx0ZXIoKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uUmVtb3ZlRmlsdGVyID0gKGlkLCB0YWJsZSkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKChwcmVTdGF0ZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGFibGVzID0gWy4uLnByZVN0YXRlLnRhYmxlc107XG4gICAgICAgICAgICBpZiAodGFibGUpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IHRhYmxlcy5maW5kSW5kZXgoaXRlbSA9PiBpdGVtLnZhbHVlID09PSB0YWJsZSk7XG4gICAgICAgICAgICAgICAgdGFibGVzW2luZGV4XS5pc1NlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgZmlsdGVycyA9IFsuLi5wcmVTdGF0ZS5maWx0ZXJzXS5maWx0ZXIoKGVsKSA9PiBpZCAhPT0gZWwuaWQpO1xuICAgICAgICAgICAgaWYgKGZpbHRlcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgZmlsdGVycy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IDAsXG4gICAgICAgICAgICAgICAgICAgIHF1ZXJ5OiAnJyxcbiAgICAgICAgICAgICAgICAgICAgdGFibGU6IHRhYmxlc1swXS52YWx1ZSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0YWJsZXNbMF0uaXNTZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGZpbHRlcnMubWFwKChpdGVtLCBpbmRleCkgPT4gKHsuLi5pdGVtLCBpZDppbmRleH0pKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zZXREYXRhQ29va2llcyhmaWx0ZXJzKTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgZmlsdGVycyxcbiAgICAgICAgICAgICAgICB0YWJsZXMsXG4gICAgICAgICAgICAgICAgZGFzaGJvYXJkRGV0YWlsOiB7XG4gICAgICAgICAgICAgICAgICAgIC4uLnByZVN0YXRlLmRhc2hib2FyZERldGFpbCxcbiAgICAgICAgICAgICAgICAgICAgd2lkZ2V0czogWy4uLnByZVN0YXRlLmRhc2hib2FyZERldGFpbC53aWRnZXRzXS5tYXAoaXRlbSA9PiAoeyAuLi5pdGVtLCBkdXJhdGlvbjogMH0pKSxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHN0aWNrV2lkZ2V0ID0gYXN5bmMgKHdpZGdldElkLCBmaXhlZCwgaW5kZXgpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBpc0xvYWRpbmc6IHRydWUsXG4gICAgICAgIH0pXG4gICAgICAgIGNvbnN0IHtkYXNoYm9hcmREZXRhaWx9ID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgY29uc3Qgd2lkZ2V0cyA9IFsuLi5kYXNoYm9hcmREZXRhaWwud2lkZ2V0c107XG4gICAgICAgIGNvbnN0IHt4LCB5LCB3LCBofSA9IHdpZGdldHNbaW5kZXhdO1xuICAgICAgICBpZiAod2lkZ2V0SWQpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0aWNrV2lkZ2V0UmVzID0gYXdhaXQgRGFzaGJvYXJkQWN0aW9ucy51cGRhdGVXaWRnZXQoZGFzaGJvYXJkRGV0YWlsLmlkLCB3aWRnZXRJZCwge1xuICAgICAgICAgICAgICAgIGZpeGVkOiBmaXhlZCA9PT0gdHJ1ZSA/IDEgOiBudWxsLFxuICAgICAgICAgICAgICAgIHgsXG4gICAgICAgICAgICAgICAgeSxcbiAgICAgICAgICAgICAgICB3aWR0aDogdyxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IGhcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAoIXN0aWNrV2lkZ2V0UmVzLmVycm9yKSB7XG4gICAgICAgICAgICAgICAgd2lkZ2V0c1tpbmRleF0uc3RhdGljID0gZml4ZWQ7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIGRhc2hib2FyZERldGFpbDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4uZGFzaGJvYXJkRGV0YWlsLFxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0czogd2lkZ2V0cy5tYXAoaXRlbSA9PiAoeyAuLi5pdGVtLCBkdXJhdGlvbjogMTAwMCB9KSksXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGlzTG9hZGluZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkxheW91dENoYW5nZSA9IGFzeW5jIChlKSA9PiB7XG4gICAgICAgIGNvbnN0IHtkYXNoYm9hcmREZXRhaWx9ID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgY29uc3Qge3dpZGdldHMsIGlkfSA9IGRhc2hib2FyZERldGFpbDtcbiAgICAgICAgY29uc3Qga2V5Rm9yQ2hlY2sgPSBbJ3gnLCAneScsICd3JywgJ2gnXTtcbiAgICAgICAgY29uc3QgbmV3V2lkZ2V0UG9zaXRpb24gPSBbLi4ud2lkZ2V0c10ubWFwKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB7d2lkZ2V0X2lkfSA9IGl0ZW07XG4gICAgICAgICAgICBsZXQgaXNDaGFuZ2VQb3NpdGlvbiA9IGZhbHNlO1xuICAgICAgICAgICAgY29uc3Qgd2lkZ2V0ID0gZS5maW5kKGVsID0+IGVsLmkgPT09IGl0ZW0uaSk7XG4gICAgICAgICAgICBPYmplY3Qua2V5cyhpdGVtKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoa2V5Rm9yQ2hlY2suaW5jbHVkZXMoa2V5KSAmJiBpdGVtW2tleV0gIT09IHdpZGdldFtrZXldKSB7XG4gICAgICAgICAgICAgICAgICAgIGlzQ2hhbmdlUG9zaXRpb24gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGlmIChpc0NoYW5nZVBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qge3gsIHksIHcsIGh9ID0gd2lkZ2V0O1xuICAgICAgICAgICAgICAgIERhc2hib2FyZEFjdGlvbnMudXBkYXRlV2lkZ2V0KGlkLCB3aWRnZXRfaWQsIHtcbiAgICAgICAgICAgICAgICAgICAgeCxcbiAgICAgICAgICAgICAgICAgICAgeSxcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHcsXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogaCxcbiAgICAgICAgICAgICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHtlcnJvcn0gPSByZXM7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7fSlcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vQWxlcnQuc3VjY2VzcygnQ2hhbmdlIHBvc2l0aW9uIHN1Y2Nlc3MnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAuLi5pdGVtLFxuICAgICAgICAgICAgICAgIC4uLndpZGdldCxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgZGFzaGJvYXJkRGV0YWlsOiB7XG4gICAgICAgICAgICAgICAgLi4uZGFzaGJvYXJkRGV0YWlsLFxuICAgICAgICAgICAgICAgIHdpZGdldHM6IFsuLi5uZXdXaWRnZXRQb3NpdGlvbl0ubWFwKGl0ZW0gPT4gKHsgLi4uaXRlbSwgZHVyYXRpb246IDB9KSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIGlzTG9hZGluZyxcbiAgICAgICAgICAgIGRhc2hib2FyZERldGFpbCxcbiAgICAgICAgICAgIHdpZGdldExpc3QsXG4gICAgICAgICAgICB3aWRnZXRTZWxlY3RlZCxcbiAgICAgICAgICAgIHRhYmxlcyxcbiAgICAgICAgICAgIGZpbHRlcnMsXG4gICAgICAgICAgICBkYXRlUmFuZ2VcbiAgICAgICAgfSA9IHRoaXMuc3RhdGU7XG5cbiAgICAgICAgY29uc3Qge3RpdGxlLCB3aWRnZXRzfSA9IGRhc2hib2FyZERldGFpbDtcblxuICAgICAgICBjb25zdCBjb2x1bW5zID0gd2lkZ2V0TGlzdC5maWx0ZXIoZSA9PiAhd2lkZ2V0cy5zb21lKGVsID0+IGVsLndpZGdldF9pZCA9PT0gZS5pZCkpO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGFzaGJvYXJkLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwiY29sLTEyXCI+e3RpdGxlfTwvaDM+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmlsdGVyIGNvbC0xMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLWJvZHlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtMTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93IGp1c3RpZnktY29udGVudC1iZXR3ZWVuIGZsZXgtcm93IGZsZXgtd3JhcFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtpc1VzZXIoKSB8fCA8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZC0zIGNvbC0xMlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7bWluV2lkdGg6ICcyNTBweCd9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1GaWVsZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNIaWRkZW5MYWJlbD17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXt3aWRnZXRTZWxlY3RlZCB8fCAnJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkTmFtZT0nd2lkZ2V0U2VsZWN0ZWQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHRoaXMub25TYXZlQ2hhbmdlKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9J3NlbGVjdCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0nbWItMCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPScnIGNsYXNzTmFtZT0nZC1ub25lJz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQWRkIHdpZGdldFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtjb2x1bW5zLmxlbmd0aCA9PT0gMCAmJiA8b3B0aW9uIHZhbHVlPSdjcmVhdGVOZXdPbmUnPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7J0NyZWF0ZSBuZXcgb25lJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L29wdGlvbj59XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2NvbHVtbnMubWFwKChpdGVtLCBpbmRleCkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPXtpdGVtLmlkfSBrZXk9e2luZGV4fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtpdGVtLnRpdGxlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L29wdGlvbj4pKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0Zvcm1GaWVsZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj59XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtMyBjb2wtMTIgbXQtMiBtdC1tZC0wIG1lLWF1dG9cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e21pbldpZHRoOiAnMjUwcHgnfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGaWx0ZXJEYXRlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRlUmFuZ2U9e2RhdGVSYW5nZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRGF0ZVJhbmdlQ2hhbmdlZD17dGhpcy5vbkNoYW5nZUZpbHRlcn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImQtZmxleCBtcy1hdXRvIG10LTIgbXQtbWQtMCBtYi0yIG1iLW1kLTBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtZS0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIGlkPVwiYnRuLXNlYXJjaFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJ0bi1zZWFyY2hcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17aXNMb2FkaW5nfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB0aGlzLm9uQ2hhbmdlRmlsdGVyKCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEljb24gbmFtZT1cInN5bmNcIi8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIGlkPVwiYnRuLWZpbHRlcnNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJidG4tc2VhcmNoXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS10b2dnbGU9XCJjb2xsYXBzZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhyZWY9XCIjY29sbGFwc2VBZHZhbmNlU2VhcmNoXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJpYS1leHBhbmRlZD1cImZhbHNlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJpYS1jb250cm9scz1cImNvbGxhcHNlQWR2YW5jZVNlYXJjaFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEljb24gbmFtZT1cImZpbHRlclwiIGNsYXNzTmFtZT1cIm1lLTJcIi8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRmlsdGVyc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbGxhcHNlIGNvbC0xMlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ9XCJjb2xsYXBzZUFkdmFuY2VTZWFyY2hcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkdmFuY2VkLXNlYXJjaFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17ZmlsdGVyc30+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2ZpbHRlcnMubWFwKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7IGlkLCBxdWVyeSwgdGFibGUgfSA9IGl0ZW07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoPGRpdiBjbGFzc05hbWU9XCJyb3cgbXMtMCBtdC0yXCIga2V5PXtgJHtxdWVyeX18JHt0YWJsZX1gfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTEyIGNvbC1tZC05IGQtZmxleCBwcy0wIG1iLTIgbWItbWQtMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b24gY2xhc3NOYW1lPVwiYmctdHJhbnNwYXJlbnQgYm9yZGVyLTAgYnRuIGJ0bi1saWdodFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB0aGlzLm9uUmVtb3ZlRmlsdGVyKGlkLCB0YWJsZSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8SWNvbiBuYW1lPVwidGltZXNcIiBjbGFzc05hbWU9XCJhbGlnbi1zZWxmLWNlbnRlciBtZS0zXCIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGaWx0ZXJUZXh0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1iLTBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cInN0YXR1cyA9IDIwMCBBTkQgdXJsIExJS0UgJyVwcm9kdWN0JSdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17cXVlcnl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQmx1cj17KGUpID0+IHRoaXMub25RdWVyeVRhYmxlQ2hhbmdlKGUudGFyZ2V0LCBpbmRleCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1GaWVsZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImNvbC0xMiBjb2wtbWQtMyBtYi0wIG1iLTIgbWItbWQtMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RhYmxlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkTmFtZT0ndGFibGUnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNIaWRkZW5MYWJlbD17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHRoaXMub25RdWVyeVRhYmxlQ2hhbmdlKGUudGFyZ2V0LCBpbmRleCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT0nc2VsZWN0J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0YWJsZXMubWFwKChpdGVtLCBpbmRleCkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT17aXRlbS52YWx1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtpbmRleH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtpdGVtLmlzU2VsZWN0ZWQgPyAnZC1ub25lJyA6ICcnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtpdGVtLmxhYmVsfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9vcHRpb24+KSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0Zvcm1GaWVsZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkLWZsZXgganVzdGlmeS1jb250ZW50LWVuZCBtYi0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3RhYmxlcyAmJiB0YWJsZXMubGVuZ3RoID4gMCAmJiB0YWJsZXMubGVuZ3RoID4gZmlsdGVycy5sZW5ndGggJiYgPGRpdiBjbGFzc05hbWU9XCJjb2wtNiBjb2wtbWQtMSBidG4tYWN0aW9uLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b24gY2xhc3NOYW1lPVwiYnRuLXNlYXJjaCBtdC0wIG10LW1kLTIgdy0xMDBcIiBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0YWJsZSA9IHRhYmxlcy5maWx0ZXIoaXRlbSA9PiAhaXRlbS5pc1NlbGVjdGVkKVswXS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gdGFibGVzLmZpbmRJbmRleChpdGVtID0+IGl0ZW0udmFsdWUgPT09IHRhYmxlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld1RhYmxlcyA9IFsuLi50YWJsZXNdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3VGFibGVzW2luZGV4XS5pc1NlbGVjdGVkID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyczogWyAuLi5maWx0ZXJzLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBmaWx0ZXJzLmxlbmd0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFibGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0czogWy4uLndpZGdldHNdLm1hcChpdGVtID0+ICh7IC4uLml0ZW0sIGR1cmF0aW9uOiAwIH0pKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8SWNvbiBuYW1lPVwicGx1cy1jaXJjbGVcIi8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2Pn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ0bi1hY3Rpb24tZ3JvdXAgcHItMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIGNsYXNzTmFtZT1cImJ0bi1zZWFyY2ggbXQtMCBtdC1tZC0yIHctMTAwIHRleHQtbm93cmFwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17aXNMb2FkaW5nfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHRoaXMuYXBwbHlGaWx0ZXIoKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXBwbHlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIHtpc0xvYWRpbmcgPyA8c3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwic3Bpbm5lci1ib3JkZXIgc3Bpbm5lci1ib3JkZXItc21cIlxuICAgICAgICAgICAgICAgICAgICAgICAgcm9sZT1cInN0YXR1c1wiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiLz4gOlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e3dpZGdldHN9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxSZXNwb25zaXZlR3JpZExheW91dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXlvdXRzPXt3aWRnZXRzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1Jlc2l6YWJsZT17IWlzVXNlcigpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0RyYWdnYWJsZT17IWlzVXNlcigpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVXaWRnZXQ9eyhpZCkgPT4gdGhpcy5yZW1vdmVXaWRnZXQoaWQpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGlja1dpZGdldD17dGhpcy5zdGlja1dpZGdldH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWRpdFdpZGdldD17KGlkKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvd2lkZ2V0LycgKyBpZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25MYXlvdXRDaGFuZ2U9e3RoaXMub25MYXlvdXRDaGFuZ2V9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uV2lkZ2V0Q2xpY2tlZD17dGhpcy5vbldpZGdldENsaWNrZWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+fVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC8+XG5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblJlYWN0RE9NLnJlbmRlcig8RGFzaGJvYXJkUGFnZS8+LCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcm9vdCcpKTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyICRmaW5kSW5kZXggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktaXRlcmF0aW9uJykuZmluZEluZGV4O1xudmFyIGFkZFRvVW5zY29wYWJsZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYWRkLXRvLXVuc2NvcGFibGVzJyk7XG5cbnZhciBGSU5EX0lOREVYID0gJ2ZpbmRJbmRleCc7XG52YXIgU0tJUFNfSE9MRVMgPSB0cnVlO1xuXG4vLyBTaG91bGRuJ3Qgc2tpcCBob2xlc1xuaWYgKEZJTkRfSU5ERVggaW4gW10pIEFycmF5KDEpW0ZJTkRfSU5ERVhdKGZ1bmN0aW9uICgpIHsgU0tJUFNfSE9MRVMgPSBmYWxzZTsgfSk7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUuZmluZEluZGV4YCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmZpbmRpbmRleFxuJCh7IHRhcmdldDogJ0FycmF5JywgcHJvdG86IHRydWUsIGZvcmNlZDogU0tJUFNfSE9MRVMgfSwge1xuICBmaW5kSW5kZXg6IGZ1bmN0aW9uIGZpbmRJbmRleChjYWxsYmFja2ZuIC8qICwgdGhhdCA9IHVuZGVmaW5lZCAqLykge1xuICAgIHJldHVybiAkZmluZEluZGV4KHRoaXMsIGNhbGxiYWNrZm4sIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkKTtcbiAgfVxufSk7XG5cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLUBAdW5zY29wYWJsZXNcbmFkZFRvVW5zY29wYWJsZXMoRklORF9JTkRFWCk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciAkc29tZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1pdGVyYXRpb24nKS5zb21lO1xudmFyIGFycmF5TWV0aG9kSXNTdHJpY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktbWV0aG9kLWlzLXN0cmljdCcpO1xuXG52YXIgU1RSSUNUX01FVEhPRCA9IGFycmF5TWV0aG9kSXNTdHJpY3QoJ3NvbWUnKTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS5zb21lYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLnNvbWVcbiQoeyB0YXJnZXQ6ICdBcnJheScsIHByb3RvOiB0cnVlLCBmb3JjZWQ6ICFTVFJJQ1RfTUVUSE9EIH0sIHtcbiAgc29tZTogZnVuY3Rpb24gc29tZShjYWxsYmFja2ZuIC8qICwgdGhpc0FyZyAqLykge1xuICAgIHJldHVybiAkc29tZSh0aGlzLCBjYWxsYmFja2ZuLCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCk7XG4gIH1cbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgY3JlYXRlSFRNTCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtaHRtbCcpO1xudmFyIGZvcmNlZFN0cmluZ0hUTUxNZXRob2QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc3RyaW5nLWh0bWwtZm9yY2VkJyk7XG5cbi8vIGBTdHJpbmcucHJvdG90eXBlLmZpeGVkYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3RyaW5nLnByb3RvdHlwZS5maXhlZFxuJCh7IHRhcmdldDogJ1N0cmluZycsIHByb3RvOiB0cnVlLCBmb3JjZWQ6IGZvcmNlZFN0cmluZ0hUTUxNZXRob2QoJ2ZpeGVkJykgfSwge1xuICBmaXhlZDogZnVuY3Rpb24gZml4ZWQoKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUhUTUwodGhpcywgJ3R0JywgJycsICcnKTtcbiAgfVxufSk7XG4iXSwic291cmNlUm9vdCI6IiJ9