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
/******/ 	deferredModules.push(["./assets/js/pages/index/dashboard.js","vendors~alerts_list~app~dashboard-page~dashboard_empty~dashboard_form~export_list~flot_chart~graph_f~fed29054","vendors~alerts_list~dashboard-page~dashboard_empty~dashboard_form~export_list~flot_chart~graph_form~~fe102de6","alerts_list~dashboard-page~dashboard_empty~dashboard_form~export_list~flot_chart~graph_form~graph_li~f320c34b"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/js/pages/index/dashboard.js":
/*!********************************************!*\
  !*** ./assets/js/pages/index/dashboard.js ***!
  \********************************************/
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
/* harmony import */ var core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.concat */ "./node_modules/core-js/modules/es.array.concat.js");
/* harmony import */ var core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_array_every__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.array.every */ "./node_modules/core-js/modules/es.array.every.js");
/* harmony import */ var core_js_modules_es_array_every__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_every__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.array.filter */ "./node_modules/core-js/modules/es.array.filter.js");
/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.array.find */ "./node_modules/core-js/modules/es.array.find.js");
/* harmony import */ var core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_6__);
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
/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! core-js/modules/es.promise */ "./node_modules/core-js/modules/es.promise.js");
/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! core-js/modules/es.regexp.to-string */ "./node_modules/core-js/modules/es.regexp.to-string.js");
/* harmony import */ var core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! core-js/modules/es.string.iterator */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_23__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_24___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_24__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_25___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_25__);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! regenerator-runtime/runtime */ "./node_modules/regenerator-runtime/runtime.js");
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_26___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_26__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_27___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_27__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_28___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_28__);
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ../../components */ "./assets/js/components/index.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ../../actions */ "./assets/js/actions/index.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ../../utils */ "./assets/js/utils.js");
/* harmony import */ var _styles_pages_dashboard_scss__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ../../../styles/pages/dashboard.scss */ "./assets/styles/pages/dashboard.scss");
/* harmony import */ var _styles_pages_dashboard_scss__WEBPACK_IMPORTED_MODULE_32___default = /*#__PURE__*/__webpack_require__.n(_styles_pages_dashboard_scss__WEBPACK_IMPORTED_MODULE_32__);




























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

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }








var ConfirmDeleteDashboard = function ConfirmDeleteDashboard(_ref) {
  var dashboard = _ref.dashboard,
      dashboardTitle = _ref.dashboardTitle,
      onConfirmDeleteDashboard = _ref.onConfirmDeleteDashboard,
      onHidden = _ref.onHidden;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_27___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_29__["Modal"], {
    size: _components__WEBPACK_IMPORTED_MODULE_29__["Size"].medium,
    id: "delete-dashboard",
    title: "Deleting table ".concat(dashboardTitle),
    showCloseButton: true,
    closeButtonTitle: "Cancel",
    showSaveButton: true,
    saveButtonTitle: "Delete dashboard",
    saveButtonColor: "danger",
    saveButtonAction: function saveButtonAction() {
      return onConfirmDeleteDashboard(dashboard);
    },
    closeButtonAction: function closeButtonAction() {
      return onHidden();
    },
    show: !!dashboardTitle,
    onHidden: onHidden
  }, " Are you sure you want to delete ".concat(dashboardTitle));
};

var DashboardPage = function DashboardPage(_ref2) {
  _objectDestructuringEmpty(_ref2);

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_27__["useState"])(false),
      _useState2 = _slicedToArray(_useState, 2),
      isLoading = _useState2[0],
      setIsLoading = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_27__["useState"])(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isShowCreateNewDashboard = _useState4[0],
      setIsShowCreateNewDashboard = _useState4[1];

  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_27__["useState"])([]),
      _useState6 = _slicedToArray(_useState5, 2),
      dashboardList = _useState6[0],
      setDashboardList = _useState6[1];

  var _useState7 = Object(react__WEBPACK_IMPORTED_MODULE_27__["useState"])(),
      _useState8 = _slicedToArray(_useState7, 2),
      dashboardDetail = _useState8[0],
      setDashboardDetail = _useState8[1];

  var _useState9 = Object(react__WEBPACK_IMPORTED_MODULE_27__["useState"])([]),
      _useState10 = _slicedToArray(_useState9, 2),
      widgetList = _useState10[0],
      setWidgetList = _useState10[1];

  var _useState11 = Object(react__WEBPACK_IMPORTED_MODULE_27__["useState"])([]),
      _useState12 = _slicedToArray(_useState11, 2),
      widgetListOrigin = _useState12[0],
      setWidgetListOrigin = _useState12[1];

  var _useState13 = Object(react__WEBPACK_IMPORTED_MODULE_27__["useState"])(),
      _useState14 = _slicedToArray(_useState13, 2),
      visibleConfirmDeleteDashboard = _useState14[0],
      setVisibleConfirmDeleteDashboard = _useState14[1];

  var _useState15 = Object(react__WEBPACK_IMPORTED_MODULE_27__["useState"])(),
      _useState16 = _slicedToArray(_useState15, 2),
      toastContent = _useState16[0],
      setToastContent = _useState16[1];

  var _useState17 = Object(react__WEBPACK_IMPORTED_MODULE_27__["useState"])(false),
      _useState18 = _slicedToArray(_useState17, 2),
      visibleAddWidgetModal = _useState18[0],
      setVisibleAddWidgetModal = _useState18[1];

  var _useState19 = Object(react__WEBPACK_IMPORTED_MODULE_27__["useState"])(false),
      _useState20 = _slicedToArray(_useState19, 2),
      isNewWidgetAdded = _useState20[0],
      setIsNewWidgetAdded = _useState20[1];

  Object(react__WEBPACK_IMPORTED_MODULE_27__["useEffect"])(function () {
    loadData();
  }, []);
  Object(react__WEBPACK_IMPORTED_MODULE_27__["useEffect"])(function () {
    if (isNewWidgetAdded) {
      setIsNewWidgetAdded(false);
      loadData();
    }
  }, [visibleAddWidgetModal]);

  var loadData = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var _yield$Promise$all, _yield$Promise$all2, dashboardListRes, dashboardRes, dashboardList, dashboardDetail, widgets, data, configs;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              setIsLoading(true);
              _context.next = 3;
              return Promise.all([_actions__WEBPACK_IMPORTED_MODULE_30__["DashboardActions"].listDashboard(), _actions__WEBPACK_IMPORTED_MODULE_30__["LogTableActions"].getDashboard(uuid)]);

            case 3:
              _yield$Promise$all = _context.sent;
              _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 2);
              dashboardListRes = _yield$Promise$all2[0];
              dashboardRes = _yield$Promise$all2[1];
              dashboardList = dashboardListRes && dashboardListRes.data && dashboardListRes.data.length > 0 ? dashboardListRes.data : [];
              dashboardDetail = {};

              if (dashboardRes && !dashboardRes.error) {
                widgets = dashboardRes.widgets, data = dashboardRes.data, configs = dashboardRes.configs;
                dashboardDetail = _objectSpread(_objectSpread({}, data), {}, {
                  configs: configs && configs.size ? _objectSpread({}, configs) : {},
                  widgets: widgets
                });
                loadWidgetList(widgets);
                setDashboardList(_toConsumableArray(dashboardList));
                setDashboardDetail(_objectSpread({}, dashboardDetail));
              }

              setIsLoading(false);

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function loadData() {
      return _ref3.apply(this, arguments);
    };
  }();

  var _onConfirmDeleteDashboard = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var res, toastContent, newDashboardList, pathname, _newDashboardList$;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              setIsLoading(true);
              _context2.next = 3;
              return _actions__WEBPACK_IMPORTED_MODULE_30__["DashboardActions"].deleteDashboard(visibleConfirmDeleteDashboard === null || visibleConfirmDeleteDashboard === void 0 ? void 0 : visibleConfirmDeleteDashboard.id);

            case 3:
              res = _context2.sent;
              newDashboardList = _toConsumableArray(dashboardList);

              if (res && !res.error) {
                newDashboardList = newDashboardList.filter(function (item) {
                  return item.uuid !== visibleConfirmDeleteDashboard.uuid;
                });
                pathname = "dashboard";

                if (newDashboardList.length > 0) {
                  pathname = "".concat(pathname, "/").concat((_newDashboardList$ = newDashboardList[0]) === null || _newDashboardList$ === void 0 ? void 0 : _newDashboardList$.uuid);
                }

                window.location.pathname = pathname;
              } else {
                toastContent = {
                  color: _utils__WEBPACK_IMPORTED_MODULE_31__["TOAST_STATUS"].failed,
                  message: res === null || res === void 0 ? void 0 : res.message
                };
                setVisibleConfirmDeleteDashboard();
                setDashboardList(_toConsumableArray(newDashboardList));
                setIsLoading(false);
                setToastContent(toastContent);
              }

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function onConfirmDeleteDashboard() {
      return _ref4.apply(this, arguments);
    };
  }();

  var loadWidgetList = /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(widgetExistInDashboard) {
      var widgetListRes, widgetList, widgetListOrigin;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _actions__WEBPACK_IMPORTED_MODULE_30__["WidgetActions"].listWidget();

            case 2:
              widgetListRes = _context3.sent;
              widgetList = widgetListRes && widgetListRes.data && widgetListRes.data.length > 0 ? widgetListRes.data : [];
              widgetListOrigin = widgetList;
              if ((widgetExistInDashboard === null || widgetExistInDashboard === void 0 ? void 0 : widgetExistInDashboard.length) > 0) widgetList = widgetList.filter(function (item) {
                return widgetExistInDashboard.every(function (el) {
                  return el.widget_id !== item.id;
                });
              });
              setWidgetListOrigin(_toConsumableArray(widgetListOrigin));
              setWidgetList(_toConsumableArray(widgetList));

            case 8:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function loadWidgetList(_x) {
      return _ref5.apply(this, arguments);
    };
  }();

  var onAddNewWidget = /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(widgetListSelected) {
      var widgetListAddToDashboard, addWidgetRes, isErrorExist;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              widgetListAddToDashboard = widgetListSelected.map(function (item) {
                var position = {};

                switch (item.type) {
                  case _utils__WEBPACK_IMPORTED_MODULE_31__["WIDGET_TYPE"].bar:
                  case _utils__WEBPACK_IMPORTED_MODULE_31__["WIDGET_TYPE"].line:
                  case _utils__WEBPACK_IMPORTED_MODULE_31__["WIDGET_TYPE"].doughnut:
                  case _utils__WEBPACK_IMPORTED_MODULE_31__["WIDGET_TYPE"].pie:
                    {
                      position = {
                        x: 0,
                        y: 0,
                        width: 3,
                        height: 2,
                        fixed: null
                      };
                      break;
                    }

                  case _utils__WEBPACK_IMPORTED_MODULE_31__["WIDGET_TYPE"].counterSum:
                    {
                      position = {
                        x: 0,
                        y: 0,
                        width: 3,
                        height: 1,
                        fixed: null
                      };
                      break;
                    }

                  case _utils__WEBPACK_IMPORTED_MODULE_31__["WIDGET_TYPE"].table:
                    {
                      position = {
                        x: 0,
                        y: 0,
                        width: 3,
                        height: 3,
                        fixed: null
                      };
                      break;
                    }
                }

                return _actions__WEBPACK_IMPORTED_MODULE_30__["DashboardActions"].addWidget(dashboardDetail.id, item.id, position);
              });
              _context4.next = 3;
              return Promise.all(_toConsumableArray(widgetListAddToDashboard));

            case 3:
              addWidgetRes = _context4.sent;
              isErrorExist = addWidgetRes.every(function (item) {
                return item.error !== 0;
              });

              if (!isErrorExist) {
                setToastContent({
                  color: _utils__WEBPACK_IMPORTED_MODULE_31__["TOAST_STATUS"].success,
                  message: "Add ".concat(widgetListSelected.length, " widget to dashboard successful.")
                });
                setWidgetList(widgetList.filter(function (item) {
                  return !widgetListSelected.find(function (el) {
                    return el.id === item.id;
                  });
                }));
                setIsNewWidgetAdded(true);
                setVisibleAddWidgetModal(false);
              }

            case 6:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function onAddNewWidget(_x2) {
      return _ref6.apply(this, arguments);
    };
  }();

  var onWidgetListChange = function onWidgetListChange(widgets) {
    if (widgets) setWidgetList(widgetListOrigin.filter(function (item) {
      return widgets.every(function (el) {
        return el.widget_id !== item.id;
      });
    }));
  };

  var _onAddWidgetClick = function onAddWidgetClick() {
    return setVisibleAddWidgetModal(true);
  };

  var onWidgetUpdateSuccess = function onWidgetUpdateSuccess() {
    return loadData();
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_27___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_27___default.a.Fragment, null, !isLoading ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_27___default.a.createElement("div", {
    className: "dashboard-page ms-cp-4 mt-3 me-cp-3",
    style: {
      marginBottom: "7rem"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_27___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_29__["Toast"], {
    toastContent: toastContent,
    onToastClosed: function onToastClosed() {
      return setToastContent();
    },
    style: {
      zIndex: "1060"
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_27___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_29__["DashboardHeader"], {
    dashboardDetail: dashboardDetail,
    dashboardList: dashboardList,
    onCreateNewDashboardClick: function onCreateNewDashboardClick() {
      return setIsShowCreateNewDashboard(true);
    },
    onDeleteDashboardClick: function onDeleteDashboardClick(dashboard) {
      return setVisibleConfirmDeleteDashboard(dashboard);
    },
    onAddWidgetClick: function onAddWidgetClick() {
      return _onAddWidgetClick();
    }
  }), dashboardDetail && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_27___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_29__["DashboardContent"], {
    dashboardDetail: dashboardDetail,
    onAddWidgetClick: function onAddWidgetClick() {
      return _onAddWidgetClick();
    },
    onWidgetListChange: onWidgetListChange,
    onWidgetUpdateSuccess: onWidgetUpdateSuccess
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_27___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_29__["CreateNewDashboardModal"], {
    isShow: isShowCreateNewDashboard,
    onHidden: function onHidden() {
      return setIsShowCreateNewDashboard(false);
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_27___default.a.createElement(ConfirmDeleteDashboard, {
    dashboard: visibleConfirmDeleteDashboard,
    dashboardTitle: visibleConfirmDeleteDashboard === null || visibleConfirmDeleteDashboard === void 0 ? void 0 : visibleConfirmDeleteDashboard.title,
    onConfirmDeleteDashboard: function onConfirmDeleteDashboard() {
      return _onConfirmDeleteDashboard();
    },
    onHidden: function onHidden() {
      return setVisibleConfirmDeleteDashboard();
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_27___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_29__["WidgetListModal"], {
    isShow: visibleAddWidgetModal,
    widgetList: widgetList,
    onHidden: function onHidden() {
      setVisibleAddWidgetModal(false);
    },
    isSpinnerFullHeight: false,
    onSelectWidgetForDashboard: function onSelectWidgetForDashboard(widgetListSelected) {
      return onAddNewWidget(widgetListSelected);
    },
    isCreateNewWidgetCallback: function isCreateNewWidgetCallback() {
      return loadWidgetList(dashboardDetail === null || dashboardDetail === void 0 ? void 0 : dashboardDetail.widgets);
    }
  })) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_27___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_29__["Spinner"], null));
};

react_dom__WEBPACK_IMPORTED_MODULE_28___default.a.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_27___default.a.createElement(DashboardPage, null), document.querySelector("#root"));

/***/ }),

/***/ "./assets/styles/pages/dashboard.scss":
/*!********************************************!*\
  !*** ./assets/styles/pages/dashboard.scss ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/core-js/modules/es.array.every.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.every.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var $every = __webpack_require__(/*! ../internals/array-iteration */ "./node_modules/core-js/internals/array-iteration.js").every;
var arrayMethodIsStrict = __webpack_require__(/*! ../internals/array-method-is-strict */ "./node_modules/core-js/internals/array-method-is-strict.js");
var arrayMethodUsesToLength = __webpack_require__(/*! ../internals/array-method-uses-to-length */ "./node_modules/core-js/internals/array-method-uses-to-length.js");

var STRICT_METHOD = arrayMethodIsStrict('every');
var USES_TO_LENGTH = arrayMethodUsesToLength('every');

// `Array.prototype.every` method
// https://tc39.github.io/ecma262/#sec-array.prototype.every
$({ target: 'Array', proto: true, forced: !STRICT_METHOD || !USES_TO_LENGTH }, {
  every: function every(callbackfn /* , thisArg */) {
    return $every(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3BhZ2VzL2luZGV4L2Rhc2hib2FyZC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvc3R5bGVzL3BhZ2VzL2Rhc2hib2FyZC5zY3NzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMuYXJyYXkuZXZlcnkuanMiXSwibmFtZXMiOlsiQ29uZmlybURlbGV0ZURhc2hib2FyZCIsImRhc2hib2FyZCIsImRhc2hib2FyZFRpdGxlIiwib25Db25maXJtRGVsZXRlRGFzaGJvYXJkIiwib25IaWRkZW4iLCJTaXplIiwibWVkaXVtIiwiRGFzaGJvYXJkUGFnZSIsInVzZVN0YXRlIiwiaXNMb2FkaW5nIiwic2V0SXNMb2FkaW5nIiwiaXNTaG93Q3JlYXRlTmV3RGFzaGJvYXJkIiwic2V0SXNTaG93Q3JlYXRlTmV3RGFzaGJvYXJkIiwiZGFzaGJvYXJkTGlzdCIsInNldERhc2hib2FyZExpc3QiLCJkYXNoYm9hcmREZXRhaWwiLCJzZXREYXNoYm9hcmREZXRhaWwiLCJ3aWRnZXRMaXN0Iiwic2V0V2lkZ2V0TGlzdCIsIndpZGdldExpc3RPcmlnaW4iLCJzZXRXaWRnZXRMaXN0T3JpZ2luIiwidmlzaWJsZUNvbmZpcm1EZWxldGVEYXNoYm9hcmQiLCJzZXRWaXNpYmxlQ29uZmlybURlbGV0ZURhc2hib2FyZCIsInRvYXN0Q29udGVudCIsInNldFRvYXN0Q29udGVudCIsInZpc2libGVBZGRXaWRnZXRNb2RhbCIsInNldFZpc2libGVBZGRXaWRnZXRNb2RhbCIsImlzTmV3V2lkZ2V0QWRkZWQiLCJzZXRJc05ld1dpZGdldEFkZGVkIiwidXNlRWZmZWN0IiwibG9hZERhdGEiLCJQcm9taXNlIiwiYWxsIiwiRGFzaGJvYXJkQWN0aW9ucyIsImxpc3REYXNoYm9hcmQiLCJMb2dUYWJsZUFjdGlvbnMiLCJnZXREYXNoYm9hcmQiLCJ1dWlkIiwiZGFzaGJvYXJkTGlzdFJlcyIsImRhc2hib2FyZFJlcyIsImRhdGEiLCJsZW5ndGgiLCJlcnJvciIsIndpZGdldHMiLCJjb25maWdzIiwic2l6ZSIsImxvYWRXaWRnZXRMaXN0IiwiZGVsZXRlRGFzaGJvYXJkIiwiaWQiLCJyZXMiLCJuZXdEYXNoYm9hcmRMaXN0IiwiZmlsdGVyIiwiaXRlbSIsInBhdGhuYW1lIiwid2luZG93IiwibG9jYXRpb24iLCJjb2xvciIsIlRPQVNUX1NUQVRVUyIsImZhaWxlZCIsIm1lc3NhZ2UiLCJ3aWRnZXRFeGlzdEluRGFzaGJvYXJkIiwiV2lkZ2V0QWN0aW9ucyIsImxpc3RXaWRnZXQiLCJ3aWRnZXRMaXN0UmVzIiwiZXZlcnkiLCJlbCIsIndpZGdldF9pZCIsIm9uQWRkTmV3V2lkZ2V0Iiwid2lkZ2V0TGlzdFNlbGVjdGVkIiwid2lkZ2V0TGlzdEFkZFRvRGFzaGJvYXJkIiwibWFwIiwicG9zaXRpb24iLCJ0eXBlIiwiV0lER0VUX1RZUEUiLCJiYXIiLCJsaW5lIiwiZG91Z2hudXQiLCJwaWUiLCJ4IiwieSIsIndpZHRoIiwiaGVpZ2h0IiwiZml4ZWQiLCJjb3VudGVyU3VtIiwidGFibGUiLCJhZGRXaWRnZXQiLCJhZGRXaWRnZXRSZXMiLCJpc0Vycm9yRXhpc3QiLCJzdWNjZXNzIiwiZmluZCIsIm9uV2lkZ2V0TGlzdENoYW5nZSIsIm9uQWRkV2lkZ2V0Q2xpY2siLCJvbldpZGdldFVwZGF0ZVN1Y2Nlc3MiLCJtYXJnaW5Cb3R0b20iLCJ6SW5kZXgiLCJ0aXRsZSIsIlJlYWN0RE9NIiwicmVuZGVyIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSxRQUFRLG9CQUFvQjtRQUM1QjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7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LE1BQVQsZUFBZ0IsNERBQUMsYUFBRCxPQUFoQixFQUFtQ0MsUUFBUSxDQUFDQyxhQUFULENBQXVCLE9BQXZCLENBQW5DLEU7Ozs7Ozs7Ozs7O0FDL1BBLHVDOzs7Ozs7Ozs7Ozs7QUNBYTtBQUNiLFFBQVEsbUJBQU8sQ0FBQyx1RUFBcUI7QUFDckMsYUFBYSxtQkFBTyxDQUFDLHlGQUE4QjtBQUNuRCwwQkFBMEIsbUJBQU8sQ0FBQyx1R0FBcUM7QUFDdkUsOEJBQThCLG1CQUFPLENBQUMsaUhBQTBDOztBQUVoRjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHLDBFQUEwRTtBQUM3RTtBQUNBO0FBQ0E7QUFDQSxDQUFDIiwiZmlsZSI6ImRhc2hib2FyZC1wYWdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSnNvbnBDYWxsYmFjayhkYXRhKSB7XG4gXHRcdHZhciBjaHVua0lkcyA9IGRhdGFbMF07XG4gXHRcdHZhciBtb3JlTW9kdWxlcyA9IGRhdGFbMV07XG4gXHRcdHZhciBleGVjdXRlTW9kdWxlcyA9IGRhdGFbMl07XG5cbiBcdFx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG4gXHRcdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuIFx0XHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwLCByZXNvbHZlcyA9IFtdO1xuIFx0XHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdHJlc29sdmVzLnB1c2goaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKTtcbiBcdFx0XHR9XG4gXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcbiBcdFx0fVxuIFx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmKHBhcmVudEpzb25wRnVuY3Rpb24pIHBhcmVudEpzb25wRnVuY3Rpb24oZGF0YSk7XG5cbiBcdFx0d2hpbGUocmVzb2x2ZXMubGVuZ3RoKSB7XG4gXHRcdFx0cmVzb2x2ZXMuc2hpZnQoKSgpO1xuIFx0XHR9XG5cbiBcdFx0Ly8gYWRkIGVudHJ5IG1vZHVsZXMgZnJvbSBsb2FkZWQgY2h1bmsgdG8gZGVmZXJyZWQgbGlzdFxuIFx0XHRkZWZlcnJlZE1vZHVsZXMucHVzaC5hcHBseShkZWZlcnJlZE1vZHVsZXMsIGV4ZWN1dGVNb2R1bGVzIHx8IFtdKTtcblxuIFx0XHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIGFsbCBjaHVua3MgcmVhZHlcbiBcdFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4gXHR9O1xuIFx0ZnVuY3Rpb24gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKSB7XG4gXHRcdHZhciByZXN1bHQ7XG4gXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgZGVmZXJyZWRNb2R1bGUgPSBkZWZlcnJlZE1vZHVsZXNbaV07XG4gXHRcdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG4gXHRcdFx0Zm9yKHZhciBqID0gMTsgaiA8IGRlZmVycmVkTW9kdWxlLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgZGVwSWQgPSBkZWZlcnJlZE1vZHVsZVtqXTtcbiBcdFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tkZXBJZF0gIT09IDApIGZ1bGZpbGxlZCA9IGZhbHNlO1xuIFx0XHRcdH1cbiBcdFx0XHRpZihmdWxmaWxsZWQpIHtcbiBcdFx0XHRcdGRlZmVycmVkTW9kdWxlcy5zcGxpY2UoaS0tLCAxKTtcbiBcdFx0XHRcdHJlc3VsdCA9IF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gZGVmZXJyZWRNb2R1bGVbMF0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdHJldHVybiByZXN1bHQ7XG4gXHR9XG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgQ1NTIGNodW5rc1xuIFx0dmFyIGluc3RhbGxlZENzc0NodW5rcyA9IHtcbiBcdFx0XCJkYXNoYm9hcmQtcGFnZVwiOiAwXG4gXHR9XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHQvLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbiBcdC8vIFByb21pc2UgPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHRcImRhc2hib2FyZC1wYWdlXCI6IDBcbiBcdH07XG5cbiBcdHZhciBkZWZlcnJlZE1vZHVsZXMgPSBbXTtcblxuIFx0Ly8gc2NyaXB0IHBhdGggZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIGpzb25wU2NyaXB0U3JjKGNodW5rSWQpIHtcbiBcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyAoe31bY2h1bmtJZF18fGNodW5rSWQpICsgXCIuanNcIlxuIFx0fVxuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cbiBcdC8vIFRoaXMgZmlsZSBjb250YWlucyBvbmx5IHRoZSBlbnRyeSBjaHVuay5cbiBcdC8vIFRoZSBjaHVuayBsb2FkaW5nIGZ1bmN0aW9uIGZvciBhZGRpdGlvbmFsIGNodW5rc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5lID0gZnVuY3Rpb24gcmVxdWlyZUVuc3VyZShjaHVua0lkKSB7XG4gXHRcdHZhciBwcm9taXNlcyA9IFtdO1xuXG5cbiBcdFx0Ly8gbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4gQ1NTIGxvYWRpbmdcbiBcdFx0dmFyIGNzc0NodW5rcyA9IHtcIjBcIjoxfTtcbiBcdFx0aWYoaW5zdGFsbGVkQ3NzQ2h1bmtzW2NodW5rSWRdKSBwcm9taXNlcy5wdXNoKGluc3RhbGxlZENzc0NodW5rc1tjaHVua0lkXSk7XG4gXHRcdGVsc2UgaWYoaW5zdGFsbGVkQ3NzQ2h1bmtzW2NodW5rSWRdICE9PSAwICYmIGNzc0NodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ3NzQ2h1bmtzW2NodW5rSWRdID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0XHR2YXIgaHJlZiA9IFwiXCIgKyAoe31bY2h1bmtJZF18fGNodW5rSWQpICsgXCIuY3NzXCI7XG4gXHRcdFx0XHR2YXIgZnVsbGhyZWYgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBocmVmO1xuIFx0XHRcdFx0dmFyIGV4aXN0aW5nTGlua1RhZ3MgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImxpbmtcIik7XG4gXHRcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZXhpc3RpbmdMaW5rVGFncy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHR2YXIgdGFnID0gZXhpc3RpbmdMaW5rVGFnc1tpXTtcbiBcdFx0XHRcdFx0dmFyIGRhdGFIcmVmID0gdGFnLmdldEF0dHJpYnV0ZShcImRhdGEtaHJlZlwiKSB8fCB0YWcuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKTtcbiBcdFx0XHRcdFx0aWYodGFnLnJlbCA9PT0gXCJzdHlsZXNoZWV0XCIgJiYgKGRhdGFIcmVmID09PSBocmVmIHx8IGRhdGFIcmVmID09PSBmdWxsaHJlZikpIHJldHVybiByZXNvbHZlKCk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHR2YXIgZXhpc3RpbmdTdHlsZVRhZ3MgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInN0eWxlXCIpO1xuIFx0XHRcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGV4aXN0aW5nU3R5bGVUYWdzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdHZhciB0YWcgPSBleGlzdGluZ1N0eWxlVGFnc1tpXTtcbiBcdFx0XHRcdFx0dmFyIGRhdGFIcmVmID0gdGFnLmdldEF0dHJpYnV0ZShcImRhdGEtaHJlZlwiKTtcbiBcdFx0XHRcdFx0aWYoZGF0YUhyZWYgPT09IGhyZWYgfHwgZGF0YUhyZWYgPT09IGZ1bGxocmVmKSByZXR1cm4gcmVzb2x2ZSgpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0dmFyIGxpbmtUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcbiBcdFx0XHRcdGxpbmtUYWcucmVsID0gXCJzdHlsZXNoZWV0XCI7XG4gXHRcdFx0XHRsaW5rVGFnLnR5cGUgPSBcInRleHQvY3NzXCI7XG4gXHRcdFx0XHRsaW5rVGFnLm9ubG9hZCA9IHJlc29sdmU7XG4gXHRcdFx0XHRsaW5rVGFnLm9uZXJyb3IgPSBmdW5jdGlvbihldmVudCkge1xuIFx0XHRcdFx0XHR2YXIgcmVxdWVzdCA9IGV2ZW50ICYmIGV2ZW50LnRhcmdldCAmJiBldmVudC50YXJnZXQuc3JjIHx8IGZ1bGxocmVmO1xuIFx0XHRcdFx0XHR2YXIgZXJyID0gbmV3IEVycm9yKFwiTG9hZGluZyBDU1MgY2h1bmsgXCIgKyBjaHVua0lkICsgXCIgZmFpbGVkLlxcbihcIiArIHJlcXVlc3QgKyBcIilcIik7XG4gXHRcdFx0XHRcdGVyci5yZXF1ZXN0ID0gcmVxdWVzdDtcbiBcdFx0XHRcdFx0cmVqZWN0KGVycik7XG4gXHRcdFx0XHR9O1xuIFx0XHRcdFx0bGlua1RhZy5ocmVmID0gZnVsbGhyZWY7XG4gXHRcdFx0XHR2YXIgaGVhZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXTtcbiBcdFx0XHRcdGhlYWQuYXBwZW5kQ2hpbGQobGlua1RhZyk7XG4gXHRcdFx0fSkudGhlbihmdW5jdGlvbigpIHtcbiBcdFx0XHRcdGluc3RhbGxlZENzc0NodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdFx0fSkpO1xuIFx0XHR9XG5cbiBcdFx0Ly8gSlNPTlAgY2h1bmsgbG9hZGluZyBmb3IgamF2YXNjcmlwdFxuXG4gXHRcdHZhciBpbnN0YWxsZWRDaHVua0RhdGEgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSAhPT0gMCkgeyAvLyAwIG1lYW5zIFwiYWxyZWFkeSBpbnN0YWxsZWRcIi5cblxuIFx0XHRcdC8vIGEgUHJvbWlzZSBtZWFucyBcImN1cnJlbnRseSBsb2FkaW5nXCIuXG4gXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhKSB7XG4gXHRcdFx0XHRwcm9taXNlcy5wdXNoKGluc3RhbGxlZENodW5rRGF0YVsyXSk7XG4gXHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdC8vIHNldHVwIFByb21pc2UgaW4gY2h1bmsgY2FjaGVcbiBcdFx0XHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0XHRcdGluc3RhbGxlZENodW5rRGF0YSA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IFtyZXNvbHZlLCByZWplY3RdO1xuIFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRwcm9taXNlcy5wdXNoKGluc3RhbGxlZENodW5rRGF0YVsyXSA9IHByb21pc2UpO1xuXG4gXHRcdFx0XHQvLyBzdGFydCBjaHVuayBsb2FkaW5nXG4gXHRcdFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gXHRcdFx0XHR2YXIgb25TY3JpcHRDb21wbGV0ZTtcblxuIFx0XHRcdFx0c2NyaXB0LmNoYXJzZXQgPSAndXRmLTgnO1xuIFx0XHRcdFx0c2NyaXB0LnRpbWVvdXQgPSAxMjA7XG4gXHRcdFx0XHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5uYykge1xuIFx0XHRcdFx0XHRzY3JpcHQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgX193ZWJwYWNrX3JlcXVpcmVfXy5uYyk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRzY3JpcHQuc3JjID0ganNvbnBTY3JpcHRTcmMoY2h1bmtJZCk7XG5cbiBcdFx0XHRcdC8vIGNyZWF0ZSBlcnJvciBiZWZvcmUgc3RhY2sgdW53b3VuZCB0byBnZXQgdXNlZnVsIHN0YWNrdHJhY2UgbGF0ZXJcbiBcdFx0XHRcdHZhciBlcnJvciA9IG5ldyBFcnJvcigpO1xuIFx0XHRcdFx0b25TY3JpcHRDb21wbGV0ZSA9IGZ1bmN0aW9uIChldmVudCkge1xuIFx0XHRcdFx0XHQvLyBhdm9pZCBtZW0gbGVha3MgaW4gSUUuXG4gXHRcdFx0XHRcdHNjcmlwdC5vbmVycm9yID0gc2NyaXB0Lm9ubG9hZCA9IG51bGw7XG4gXHRcdFx0XHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiBcdFx0XHRcdFx0dmFyIGNodW5rID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0XHRcdFx0XHRpZihjaHVuayAhPT0gMCkge1xuIFx0XHRcdFx0XHRcdGlmKGNodW5rKSB7XG4gXHRcdFx0XHRcdFx0XHR2YXIgZXJyb3JUeXBlID0gZXZlbnQgJiYgKGV2ZW50LnR5cGUgPT09ICdsb2FkJyA/ICdtaXNzaW5nJyA6IGV2ZW50LnR5cGUpO1xuIFx0XHRcdFx0XHRcdFx0dmFyIHJlYWxTcmMgPSBldmVudCAmJiBldmVudC50YXJnZXQgJiYgZXZlbnQudGFyZ2V0LnNyYztcbiBcdFx0XHRcdFx0XHRcdGVycm9yLm1lc3NhZ2UgPSAnTG9hZGluZyBjaHVuayAnICsgY2h1bmtJZCArICcgZmFpbGVkLlxcbignICsgZXJyb3JUeXBlICsgJzogJyArIHJlYWxTcmMgKyAnKSc7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci5uYW1lID0gJ0NodW5rTG9hZEVycm9yJztcbiBcdFx0XHRcdFx0XHRcdGVycm9yLnR5cGUgPSBlcnJvclR5cGU7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci5yZXF1ZXN0ID0gcmVhbFNyYztcbiBcdFx0XHRcdFx0XHRcdGNodW5rWzFdKGVycm9yKTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gdW5kZWZpbmVkO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9O1xuIFx0XHRcdFx0dmFyIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gXHRcdFx0XHRcdG9uU2NyaXB0Q29tcGxldGUoeyB0eXBlOiAndGltZW91dCcsIHRhcmdldDogc2NyaXB0IH0pO1xuIFx0XHRcdFx0fSwgMTIwMDAwKTtcbiBcdFx0XHRcdHNjcmlwdC5vbmVycm9yID0gc2NyaXB0Lm9ubG9hZCA9IG9uU2NyaXB0Q29tcGxldGU7XG4gXHRcdFx0XHRkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gXHR9O1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Fzc2V0cy9cIjtcblxuIFx0Ly8gb24gZXJyb3IgZnVuY3Rpb24gZm9yIGFzeW5jIGxvYWRpbmdcbiBcdF9fd2VicGFja19yZXF1aXJlX18ub2UgPSBmdW5jdGlvbihlcnIpIHsgY29uc29sZS5lcnJvcihlcnIpOyB0aHJvdyBlcnI7IH07XG5cbiBcdHZhciBqc29ucEFycmF5ID0gd2luZG93W1wid2VicGFja0pzb25wXCJdID0gd2luZG93W1wid2VicGFja0pzb25wXCJdIHx8IFtdO1xuIFx0dmFyIG9sZEpzb25wRnVuY3Rpb24gPSBqc29ucEFycmF5LnB1c2guYmluZChqc29ucEFycmF5KTtcbiBcdGpzb25wQXJyYXkucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrO1xuIFx0anNvbnBBcnJheSA9IGpzb25wQXJyYXkuc2xpY2UoKTtcbiBcdGZvcih2YXIgaSA9IDA7IGkgPCBqc29ucEFycmF5Lmxlbmd0aDsgaSsrKSB3ZWJwYWNrSnNvbnBDYWxsYmFjayhqc29ucEFycmF5W2ldKTtcbiBcdHZhciBwYXJlbnRKc29ucEZ1bmN0aW9uID0gb2xkSnNvbnBGdW5jdGlvbjtcblxuXG4gXHQvLyBhZGQgZW50cnkgbW9kdWxlIHRvIGRlZmVycmVkIGxpc3RcbiBcdGRlZmVycmVkTW9kdWxlcy5wdXNoKFtcIi4vYXNzZXRzL2pzL3BhZ2VzL2luZGV4L2Rhc2hib2FyZC5qc1wiLFwidmVuZG9yc35hbGVydHNfbGlzdH5hcHB+ZGFzaGJvYXJkLXBhZ2V+ZGFzaGJvYXJkX2VtcHR5fmRhc2hib2FyZF9mb3JtfmV4cG9ydF9saXN0fmZsb3RfY2hhcnR+Z3JhcGhfZn5mZWQyOTA1NFwiLFwidmVuZG9yc35hbGVydHNfbGlzdH5kYXNoYm9hcmQtcGFnZX5kYXNoYm9hcmRfZW1wdHl+ZGFzaGJvYXJkX2Zvcm1+ZXhwb3J0X2xpc3R+ZmxvdF9jaGFydH5ncmFwaF9mb3Jtfn5mZTEwMmRlNlwiLFwiYWxlcnRzX2xpc3R+ZGFzaGJvYXJkLXBhZ2V+ZGFzaGJvYXJkX2VtcHR5fmRhc2hib2FyZF9mb3JtfmV4cG9ydF9saXN0fmZsb3RfY2hhcnR+Z3JhcGhfZm9ybX5ncmFwaF9saX5mMzIwYzM0YlwiXSk7XG4gXHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIHJlYWR5XG4gXHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUmVhY3RET00gZnJvbSBcInJlYWN0LWRvbVwiO1xuaW1wb3J0IHtcbiAgICBDcmVhdGVOZXdEYXNoYm9hcmRNb2RhbCxcbiAgICBEYXNoYm9hcmRDb250ZW50LFxuICAgIERhc2hib2FyZEhlYWRlcixcbiAgICBNb2RhbCxcbiAgICBTaXplLFxuICAgIFNwaW5uZXIsXG4gICAgVG9hc3QsXG4gICAgV2lkZ2V0TGlzdE1vZGFsLFxufSBmcm9tIFwiLi4vLi4vY29tcG9uZW50c1wiO1xuaW1wb3J0IHsgRGFzaGJvYXJkQWN0aW9ucywgTG9nVGFibGVBY3Rpb25zLCBXaWRnZXRBY3Rpb25zIH0gZnJvbSBcIi4uLy4uL2FjdGlvbnNcIjtcbmltcG9ydCB7IFRPQVNUX1NUQVRVUywgV0lER0VUX1RZUEUgfSBmcm9tIFwiLi4vLi4vdXRpbHNcIjtcbmltcG9ydCBcIi4uLy4uLy4uL3N0eWxlcy9wYWdlcy9kYXNoYm9hcmQuc2Nzc1wiO1xuXG5jb25zdCBDb25maXJtRGVsZXRlRGFzaGJvYXJkID0gKHtcbiAgICBkYXNoYm9hcmQsXG4gICAgZGFzaGJvYXJkVGl0bGUsXG4gICAgb25Db25maXJtRGVsZXRlRGFzaGJvYXJkLFxuICAgIG9uSGlkZGVuLFxufSkgPT4ge1xuICAgIHJldHVybiAoXG4gICAgICAgIDxNb2RhbFxuICAgICAgICAgICAgc2l6ZT17U2l6ZS5tZWRpdW19XG4gICAgICAgICAgICBpZD17XCJkZWxldGUtZGFzaGJvYXJkXCJ9XG4gICAgICAgICAgICB0aXRsZT17YERlbGV0aW5nIHRhYmxlICR7ZGFzaGJvYXJkVGl0bGV9YH1cbiAgICAgICAgICAgIHNob3dDbG9zZUJ1dHRvbj17dHJ1ZX1cbiAgICAgICAgICAgIGNsb3NlQnV0dG9uVGl0bGU9XCJDYW5jZWxcIlxuICAgICAgICAgICAgc2hvd1NhdmVCdXR0b249e3RydWV9XG4gICAgICAgICAgICBzYXZlQnV0dG9uVGl0bGU9XCJEZWxldGUgZGFzaGJvYXJkXCJcbiAgICAgICAgICAgIHNhdmVCdXR0b25Db2xvcj1cImRhbmdlclwiXG4gICAgICAgICAgICBzYXZlQnV0dG9uQWN0aW9uPXsoKSA9PiBvbkNvbmZpcm1EZWxldGVEYXNoYm9hcmQoZGFzaGJvYXJkKX1cbiAgICAgICAgICAgIGNsb3NlQnV0dG9uQWN0aW9uPXsoKSA9PiBvbkhpZGRlbigpfVxuICAgICAgICAgICAgc2hvdz17ISFkYXNoYm9hcmRUaXRsZX1cbiAgICAgICAgICAgIG9uSGlkZGVuPXtvbkhpZGRlbn1cbiAgICAgICAgPlxuICAgICAgICAgICAge2AgQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSAke2Rhc2hib2FyZFRpdGxlfWB9XG4gICAgICAgIDwvTW9kYWw+XG4gICAgKTtcbn07XG5cbmNvbnN0IERhc2hib2FyZFBhZ2UgPSAoe30pID0+IHtcbiAgICBjb25zdCBbaXNMb2FkaW5nLCBzZXRJc0xvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICAgIGNvbnN0IFtpc1Nob3dDcmVhdGVOZXdEYXNoYm9hcmQsIHNldElzU2hvd0NyZWF0ZU5ld0Rhc2hib2FyZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gICAgY29uc3QgW2Rhc2hib2FyZExpc3QsIHNldERhc2hib2FyZExpc3RdID0gdXNlU3RhdGUoW10pO1xuICAgIGNvbnN0IFtkYXNoYm9hcmREZXRhaWwsIHNldERhc2hib2FyZERldGFpbF0gPSB1c2VTdGF0ZSgpO1xuICAgIGNvbnN0IFt3aWRnZXRMaXN0LCBzZXRXaWRnZXRMaXN0XSA9IHVzZVN0YXRlKFtdKTtcbiAgICBjb25zdCBbd2lkZ2V0TGlzdE9yaWdpbiwgc2V0V2lkZ2V0TGlzdE9yaWdpbl0gPSB1c2VTdGF0ZShbXSk7XG4gICAgY29uc3QgW3Zpc2libGVDb25maXJtRGVsZXRlRGFzaGJvYXJkLCBzZXRWaXNpYmxlQ29uZmlybURlbGV0ZURhc2hib2FyZF0gPSB1c2VTdGF0ZSgpO1xuICAgIGNvbnN0IFt0b2FzdENvbnRlbnQsIHNldFRvYXN0Q29udGVudF0gPSB1c2VTdGF0ZSgpO1xuICAgIGNvbnN0IFt2aXNpYmxlQWRkV2lkZ2V0TW9kYWwsIHNldFZpc2libGVBZGRXaWRnZXRNb2RhbF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gICAgY29uc3QgW2lzTmV3V2lkZ2V0QWRkZWQsIHNldElzTmV3V2lkZ2V0QWRkZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgbG9hZERhdGEoKTtcbiAgICB9LCBbXSk7XG5cbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBpZiAoaXNOZXdXaWRnZXRBZGRlZCkge1xuICAgICAgICAgICAgc2V0SXNOZXdXaWRnZXRBZGRlZChmYWxzZSk7XG4gICAgICAgICAgICBsb2FkRGF0YSgpO1xuICAgICAgICB9XG4gICAgfSwgW3Zpc2libGVBZGRXaWRnZXRNb2RhbF0pO1xuXG4gICAgY29uc3QgbG9hZERhdGEgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgIHNldElzTG9hZGluZyh0cnVlKTtcbiAgICAgICAgY29uc3QgW2Rhc2hib2FyZExpc3RSZXMsIGRhc2hib2FyZFJlc10gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICBEYXNoYm9hcmRBY3Rpb25zLmxpc3REYXNoYm9hcmQoKSxcbiAgICAgICAgICAgIExvZ1RhYmxlQWN0aW9ucy5nZXREYXNoYm9hcmQodXVpZCksXG4gICAgICAgIF0pO1xuXG4gICAgICAgIGNvbnN0IGRhc2hib2FyZExpc3QgPVxuICAgICAgICAgICAgZGFzaGJvYXJkTGlzdFJlcyAmJiBkYXNoYm9hcmRMaXN0UmVzLmRhdGEgJiYgZGFzaGJvYXJkTGlzdFJlcy5kYXRhLmxlbmd0aCA+IDBcbiAgICAgICAgICAgICAgICA/IGRhc2hib2FyZExpc3RSZXMuZGF0YVxuICAgICAgICAgICAgICAgIDogW107XG5cbiAgICAgICAgbGV0IGRhc2hib2FyZERldGFpbCA9IHt9O1xuXG4gICAgICAgIGlmIChkYXNoYm9hcmRSZXMgJiYgIWRhc2hib2FyZFJlcy5lcnJvcikge1xuICAgICAgICAgICAgY29uc3QgeyB3aWRnZXRzLCBkYXRhLCBjb25maWdzIH0gPSBkYXNoYm9hcmRSZXM7XG5cbiAgICAgICAgICAgIGRhc2hib2FyZERldGFpbCA9IHtcbiAgICAgICAgICAgICAgICAuLi5kYXRhLFxuICAgICAgICAgICAgICAgIGNvbmZpZ3M6IGNvbmZpZ3MgJiYgY29uZmlncy5zaXplID8geyAuLi5jb25maWdzIH0gOiB7fSxcbiAgICAgICAgICAgICAgICB3aWRnZXRzLFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgbG9hZFdpZGdldExpc3Qod2lkZ2V0cyk7XG5cbiAgICAgICAgICAgIHNldERhc2hib2FyZExpc3QoWy4uLmRhc2hib2FyZExpc3RdKTtcbiAgICAgICAgICAgIHNldERhc2hib2FyZERldGFpbCh7IC4uLmRhc2hib2FyZERldGFpbCB9KTtcbiAgICAgICAgfVxuICAgICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xuICAgIH07XG5cbiAgICBjb25zdCBvbkNvbmZpcm1EZWxldGVEYXNoYm9hcmQgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgIHNldElzTG9hZGluZyh0cnVlKTtcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgRGFzaGJvYXJkQWN0aW9ucy5kZWxldGVEYXNoYm9hcmQodmlzaWJsZUNvbmZpcm1EZWxldGVEYXNoYm9hcmQ/LmlkKTtcbiAgICAgICAgbGV0IHRvYXN0Q29udGVudDtcbiAgICAgICAgbGV0IG5ld0Rhc2hib2FyZExpc3QgPSBbLi4uZGFzaGJvYXJkTGlzdF07XG4gICAgICAgIGlmIChyZXMgJiYgIXJlcy5lcnJvcikge1xuICAgICAgICAgICAgbmV3RGFzaGJvYXJkTGlzdCA9IG5ld0Rhc2hib2FyZExpc3QuZmlsdGVyKFxuICAgICAgICAgICAgICAgIChpdGVtKSA9PiBpdGVtLnV1aWQgIT09IHZpc2libGVDb25maXJtRGVsZXRlRGFzaGJvYXJkLnV1aWRcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGxldCBwYXRobmFtZSA9IGBkYXNoYm9hcmRgO1xuICAgICAgICAgICAgaWYgKG5ld0Rhc2hib2FyZExpc3QubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHBhdGhuYW1lID0gYCR7cGF0aG5hbWV9LyR7bmV3RGFzaGJvYXJkTGlzdFswXT8udXVpZH1gO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lID0gcGF0aG5hbWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0b2FzdENvbnRlbnQgPSB7XG4gICAgICAgICAgICAgICAgY29sb3I6IFRPQVNUX1NUQVRVUy5mYWlsZWQsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogcmVzPy5tZXNzYWdlLFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgc2V0VmlzaWJsZUNvbmZpcm1EZWxldGVEYXNoYm9hcmQoKTtcbiAgICAgICAgICAgIHNldERhc2hib2FyZExpc3QoWy4uLm5ld0Rhc2hib2FyZExpc3RdKTtcbiAgICAgICAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XG4gICAgICAgICAgICBzZXRUb2FzdENvbnRlbnQodG9hc3RDb250ZW50KTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBsb2FkV2lkZ2V0TGlzdCA9IGFzeW5jICh3aWRnZXRFeGlzdEluRGFzaGJvYXJkKSA9PiB7XG4gICAgICAgIGNvbnN0IHdpZGdldExpc3RSZXMgPSBhd2FpdCBXaWRnZXRBY3Rpb25zLmxpc3RXaWRnZXQoKTtcblxuICAgICAgICBsZXQgd2lkZ2V0TGlzdCA9XG4gICAgICAgICAgICB3aWRnZXRMaXN0UmVzICYmIHdpZGdldExpc3RSZXMuZGF0YSAmJiB3aWRnZXRMaXN0UmVzLmRhdGEubGVuZ3RoID4gMFxuICAgICAgICAgICAgICAgID8gd2lkZ2V0TGlzdFJlcy5kYXRhXG4gICAgICAgICAgICAgICAgOiBbXTtcblxuICAgICAgICBjb25zdCB3aWRnZXRMaXN0T3JpZ2luID0gd2lkZ2V0TGlzdDtcblxuICAgICAgICBpZiAod2lkZ2V0RXhpc3RJbkRhc2hib2FyZD8ubGVuZ3RoID4gMClcbiAgICAgICAgICAgIHdpZGdldExpc3QgPSB3aWRnZXRMaXN0LmZpbHRlcigoaXRlbSkgPT5cbiAgICAgICAgICAgICAgICB3aWRnZXRFeGlzdEluRGFzaGJvYXJkLmV2ZXJ5KChlbCkgPT4gZWwud2lkZ2V0X2lkICE9PSBpdGVtLmlkKVxuICAgICAgICAgICAgKTtcblxuICAgICAgICBzZXRXaWRnZXRMaXN0T3JpZ2luKFsuLi53aWRnZXRMaXN0T3JpZ2luXSk7XG4gICAgICAgXHRzZXRXaWRnZXRMaXN0KFsuLi53aWRnZXRMaXN0XSk7XG4gICAgfTtcblxuICAgIGNvbnN0IG9uQWRkTmV3V2lkZ2V0ID0gYXN5bmMgKHdpZGdldExpc3RTZWxlY3RlZCkgPT4ge1xuICAgICAgICBjb25zdCB3aWRnZXRMaXN0QWRkVG9EYXNoYm9hcmQgPSB3aWRnZXRMaXN0U2VsZWN0ZWQubWFwKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBsZXQgcG9zaXRpb24gPSB7fTtcblxuICAgICAgICAgICAgc3dpdGNoIChpdGVtLnR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIFdJREdFVF9UWVBFLmJhcjpcbiAgICAgICAgICAgICAgICBjYXNlIFdJREdFVF9UWVBFLmxpbmU6XG4gICAgICAgICAgICAgICAgY2FzZSBXSURHRVRfVFlQRS5kb3VnaG51dDpcbiAgICAgICAgICAgICAgICBjYXNlIFdJREdFVF9UWVBFLnBpZToge1xuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbiA9IHsgeDogMCwgeTogMCwgd2lkdGg6IDMsIGhlaWdodDogMiwgZml4ZWQ6IG51bGwgfTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhc2UgV0lER0VUX1RZUEUuY291bnRlclN1bToge1xuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbiA9IHsgeDogMCwgeTogMCwgd2lkdGg6IDMsIGhlaWdodDogMSwgZml4ZWQ6IG51bGwgfTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhc2UgV0lER0VUX1RZUEUudGFibGU6IHtcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24gPSB7IHg6IDAsIHk6IDAsIHdpZHRoOiAzLCBoZWlnaHQ6IDMsIGZpeGVkOiBudWxsIH07XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIERhc2hib2FyZEFjdGlvbnMuYWRkV2lkZ2V0KGRhc2hib2FyZERldGFpbC5pZCwgaXRlbS5pZCwgcG9zaXRpb24pO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBhZGRXaWRnZXRSZXMgPSBhd2FpdCBQcm9taXNlLmFsbChbLi4ud2lkZ2V0TGlzdEFkZFRvRGFzaGJvYXJkXSk7XG5cbiAgICAgICAgY29uc3QgaXNFcnJvckV4aXN0ID0gYWRkV2lkZ2V0UmVzLmV2ZXJ5KChpdGVtKSA9PiBpdGVtLmVycm9yICE9PSAwKTtcbiAgICAgICAgaWYgKCFpc0Vycm9yRXhpc3QpIHtcbiAgICAgICAgICAgIHNldFRvYXN0Q29udGVudCh7XG4gICAgICAgICAgICAgICAgY29sb3I6IFRPQVNUX1NUQVRVUy5zdWNjZXNzLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGBBZGQgJHt3aWRnZXRMaXN0U2VsZWN0ZWQubGVuZ3RofSB3aWRnZXQgdG8gZGFzaGJvYXJkIHN1Y2Nlc3NmdWwuYCxcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBzZXRXaWRnZXRMaXN0KFxuICAgICAgICAgICAgICAgIHdpZGdldExpc3QuZmlsdGVyKChpdGVtKSA9PiAhd2lkZ2V0TGlzdFNlbGVjdGVkLmZpbmQoKGVsKSA9PiBlbC5pZCA9PT0gaXRlbS5pZCkpXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgc2V0SXNOZXdXaWRnZXRBZGRlZCh0cnVlKTtcbiAgICAgICAgICAgIHNldFZpc2libGVBZGRXaWRnZXRNb2RhbChmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3Qgb25XaWRnZXRMaXN0Q2hhbmdlID0gKHdpZGdldHMpID0+IHtcbiAgICAgICAgaWYgKHdpZGdldHMpXG4gICAgICAgICAgICBzZXRXaWRnZXRMaXN0KFxuICAgICAgICAgICAgICAgIHdpZGdldExpc3RPcmlnaW4uZmlsdGVyKChpdGVtKSA9PiB3aWRnZXRzLmV2ZXJ5KChlbCkgPT4gZWwud2lkZ2V0X2lkICE9PSBpdGVtLmlkKSlcbiAgICAgICAgICAgICk7XG4gICAgfTtcblxuICAgIGNvbnN0IG9uQWRkV2lkZ2V0Q2xpY2sgPSAoKSA9PiBzZXRWaXNpYmxlQWRkV2lkZ2V0TW9kYWwodHJ1ZSk7XG5cbiAgICBjb25zdCBvbldpZGdldFVwZGF0ZVN1Y2Nlc3MgPSAoKSA9PiBsb2FkRGF0YSgpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPD5cbiAgICAgICAgICAgIHshaXNMb2FkaW5nID8gKFxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZGFzaGJvYXJkLXBhZ2UgbXMtY3AtNCBtdC0zIG1lLWNwLTNcIlxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyBtYXJnaW5Cb3R0b206IFwiN3JlbVwiIH19XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8VG9hc3RcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvYXN0Q29udGVudD17dG9hc3RDb250ZW50fVxuICAgICAgICAgICAgICAgICAgICAgICAgb25Ub2FzdENsb3NlZD17KCkgPT4gc2V0VG9hc3RDb250ZW50KCl9XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyB6SW5kZXg6IFwiMTA2MFwiIH19XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDxEYXNoYm9hcmRIZWFkZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhc2hib2FyZERldGFpbD17ZGFzaGJvYXJkRGV0YWlsfVxuICAgICAgICAgICAgICAgICAgICAgICAgZGFzaGJvYXJkTGlzdD17ZGFzaGJvYXJkTGlzdH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ3JlYXRlTmV3RGFzaGJvYXJkQ2xpY2s9eygpID0+IHNldElzU2hvd0NyZWF0ZU5ld0Rhc2hib2FyZCh0cnVlKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uRGVsZXRlRGFzaGJvYXJkQ2xpY2s9eyhkYXNoYm9hcmQpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VmlzaWJsZUNvbmZpcm1EZWxldGVEYXNoYm9hcmQoZGFzaGJvYXJkKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25BZGRXaWRnZXRDbGljaz17KCkgPT4gb25BZGRXaWRnZXRDbGljaygpfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICB7ZGFzaGJvYXJkRGV0YWlsICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxEYXNoYm9hcmRDb250ZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGFzaGJvYXJkRGV0YWlsPXtkYXNoYm9hcmREZXRhaWx9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25BZGRXaWRnZXRDbGljaz17KCkgPT4gb25BZGRXaWRnZXRDbGljaygpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uV2lkZ2V0TGlzdENoYW5nZT17b25XaWRnZXRMaXN0Q2hhbmdlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uV2lkZ2V0VXBkYXRlU3VjY2Vzcz17b25XaWRnZXRVcGRhdGVTdWNjZXNzfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgPENyZWF0ZU5ld0Rhc2hib2FyZE1vZGFsXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1Nob3c9e2lzU2hvd0NyZWF0ZU5ld0Rhc2hib2FyZH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uSGlkZGVuPXsoKSA9PiBzZXRJc1Nob3dDcmVhdGVOZXdEYXNoYm9hcmQoZmFsc2UpfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8Q29uZmlybURlbGV0ZURhc2hib2FyZFxuICAgICAgICAgICAgICAgICAgICAgICAgZGFzaGJvYXJkPXt2aXNpYmxlQ29uZmlybURlbGV0ZURhc2hib2FyZH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGRhc2hib2FyZFRpdGxlPXt2aXNpYmxlQ29uZmlybURlbGV0ZURhc2hib2FyZD8udGl0bGV9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNvbmZpcm1EZWxldGVEYXNoYm9hcmQ9eygpID0+IG9uQ29uZmlybURlbGV0ZURhc2hib2FyZCgpfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25IaWRkZW49eygpID0+IHNldFZpc2libGVDb25maXJtRGVsZXRlRGFzaGJvYXJkKCl9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDxXaWRnZXRMaXN0TW9kYWxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzU2hvdz17dmlzaWJsZUFkZFdpZGdldE1vZGFsfVxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0TGlzdD17d2lkZ2V0TGlzdH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uSGlkZGVuPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VmlzaWJsZUFkZFdpZGdldE1vZGFsKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICBpc1NwaW5uZXJGdWxsSGVpZ2h0PXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0V2lkZ2V0Rm9yRGFzaGJvYXJkPXsod2lkZ2V0TGlzdFNlbGVjdGVkKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQWRkTmV3V2lkZ2V0KHdpZGdldExpc3RTZWxlY3RlZClcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlzQ3JlYXRlTmV3V2lkZ2V0Q2FsbGJhY2s9eygpID0+IGxvYWRXaWRnZXRMaXN0KGRhc2hib2FyZERldGFpbD8ud2lkZ2V0cyl9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgIDxTcGlubmVyIC8+XG4gICAgICAgICAgICApfVxuICAgICAgICA8Lz5cbiAgICApO1xufTtcblxuUmVhY3RET00ucmVuZGVyKDxEYXNoYm9hcmRQYWdlIC8+LCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Jvb3RcIikpO1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgJGV2ZXJ5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWl0ZXJhdGlvbicpLmV2ZXJ5O1xudmFyIGFycmF5TWV0aG9kSXNTdHJpY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktbWV0aG9kLWlzLXN0cmljdCcpO1xudmFyIGFycmF5TWV0aG9kVXNlc1RvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LW1ldGhvZC11c2VzLXRvLWxlbmd0aCcpO1xuXG52YXIgU1RSSUNUX01FVEhPRCA9IGFycmF5TWV0aG9kSXNTdHJpY3QoJ2V2ZXJ5Jyk7XG52YXIgVVNFU19UT19MRU5HVEggPSBhcnJheU1ldGhvZFVzZXNUb0xlbmd0aCgnZXZlcnknKTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS5ldmVyeWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuZXZlcnlcbiQoeyB0YXJnZXQ6ICdBcnJheScsIHByb3RvOiB0cnVlLCBmb3JjZWQ6ICFTVFJJQ1RfTUVUSE9EIHx8ICFVU0VTX1RPX0xFTkdUSCB9LCB7XG4gIGV2ZXJ5OiBmdW5jdGlvbiBldmVyeShjYWxsYmFja2ZuIC8qICwgdGhpc0FyZyAqLykge1xuICAgIHJldHVybiAkZXZlcnkodGhpcywgY2FsbGJhY2tmbiwgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQpO1xuICB9XG59KTtcbiJdLCJzb3VyY2VSb290IjoiIn0=