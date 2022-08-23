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
/******/ 		"page_index": 0
/******/ 	}
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"page_index": 0
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
/******/ 	deferredModules.push(["./assets/js/pages/index/index.js","vendors~alerts_list~app~dashboard-page~dashboard_empty~dashboard_form~export_list~flot_chart~graph_f~fed29054","vendors~alerts_list~dashboard-page~dashboard_empty~dashboard_form~export_list~flot_chart~graph_form~~fe102de6","alerts_list~dashboard-page~dashboard_empty~dashboard_form~export_list~flot_chart~graph_form~graph_li~f320c34b"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/js/pages/index/index.js":
/*!****************************************!*\
  !*** ./assets/js/pages/index/index.js ***!
  \****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(moment, $) {/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.symbol */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.symbol.description */ "./node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator */ "./node_modules/core-js/modules/es.symbol.iterator.js");
/* harmony import */ var core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.filter */ "./node_modules/core-js/modules/es.array.filter.js");
/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.array.find */ "./node_modules/core-js/modules/es.array.find.js");
/* harmony import */ var core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.array.for-each */ "./node_modules/core-js/modules/es.array.for-each.js");
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.array.iterator */ "./node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_array_splice__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.array.splice */ "./node_modules/core-js/modules/es.array.splice.js");
/* harmony import */ var core_js_modules_es_array_splice__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_splice__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_date_to_string__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.date.to-string */ "./node_modules/core-js/modules/es.date.to-string.js");
/* harmony import */ var core_js_modules_es_date_to_string__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_date_to_string__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_function_bind__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.function.bind */ "./node_modules/core-js/modules/es.function.bind.js");
/* harmony import */ var core_js_modules_es_function_bind__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_bind__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.function.name */ "./node_modules/core-js/modules/es.function.name.js");
/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es_number_constructor__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/es.number.constructor */ "./node_modules/core-js/modules/es.number.constructor.js");
/* harmony import */ var core_js_modules_es_number_constructor__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_es_number_is_integer__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! core-js/modules/es.number.is-integer */ "./node_modules/core-js/modules/es.number.is-integer.js");
/* harmony import */ var core_js_modules_es_number_is_integer__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_is_integer__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var core_js_modules_es_object_create__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! core-js/modules/es.object.create */ "./node_modules/core-js/modules/es.object.create.js");
/* harmony import */ var core_js_modules_es_object_create__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_create__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var core_js_modules_es_object_define_properties__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! core-js/modules/es.object.define-properties */ "./node_modules/core-js/modules/es.object.define-properties.js");
/* harmony import */ var core_js_modules_es_object_define_properties__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_define_properties__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var core_js_modules_es_object_define_property__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! core-js/modules/es.object.define-property */ "./node_modules/core-js/modules/es.object.define-property.js");
/* harmony import */ var core_js_modules_es_object_define_property__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_define_property__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptor */ "./node_modules/core-js/modules/es.object.get-own-property-descriptor.js");
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptors */ "./node_modules/core-js/modules/es.object.get-own-property-descriptors.js");
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var core_js_modules_es_object_get_prototype_of__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! core-js/modules/es.object.get-prototype-of */ "./node_modules/core-js/modules/es.object.get-prototype-of.js");
/* harmony import */ var core_js_modules_es_object_get_prototype_of__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_prototype_of__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! core-js/modules/es.object.keys */ "./node_modules/core-js/modules/es.object.keys.js");
/* harmony import */ var core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var core_js_modules_es_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! core-js/modules/es.object.set-prototype-of */ "./node_modules/core-js/modules/es.object.set-prototype-of.js");
/* harmony import */ var core_js_modules_es_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! core-js/modules/es.promise */ "./node_modules/core-js/modules/es.promise.js");
/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var core_js_modules_es_reflect_construct__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! core-js/modules/es.reflect.construct */ "./node_modules/core-js/modules/es.reflect.construct.js");
/* harmony import */ var core_js_modules_es_reflect_construct__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_reflect_construct__WEBPACK_IMPORTED_MODULE_23__);
/* harmony import */ var core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! core-js/modules/es.regexp.to-string */ "./node_modules/core-js/modules/es.regexp.to-string.js");
/* harmony import */ var core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_24___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_24__);
/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! core-js/modules/es.string.iterator */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_25___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_25__);
/* harmony import */ var core_js_modules_es_string_trim__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! core-js/modules/es.string.trim */ "./node_modules/core-js/modules/es.string.trim.js");
/* harmony import */ var core_js_modules_es_string_trim__WEBPACK_IMPORTED_MODULE_26___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_trim__WEBPACK_IMPORTED_MODULE_26__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_27___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_27__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_28___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_28__);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! regenerator-runtime/runtime */ "./node_modules/regenerator-runtime/runtime.js");
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_29___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_29__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_30___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_30__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_31___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_31__);
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ../../components */ "./assets/js/components/index.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ../../actions */ "./assets/js/actions/index.js");
/* harmony import */ var _styles_pages_index_scss__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ../../../styles/pages/index.scss */ "./assets/styles/pages/index.scss");
/* harmony import */ var _styles_pages_index_scss__WEBPACK_IMPORTED_MODULE_34___default = /*#__PURE__*/__webpack_require__.n(_styles_pages_index_scss__WEBPACK_IMPORTED_MODULE_34__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ../../utils */ "./assets/js/utils.js");
/* harmony import */ var _components_modal__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ../../components/_modal */ "./assets/js/components/_modal.js");
/* harmony import */ var _components_input__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ../../components/_input */ "./assets/js/components/_input.js");































function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }










var Index = /*#__PURE__*/function (_Component) {
  _inherits(Index, _Component);

  var _super = _createSuper(Index);

  function Index(props) {
    var _this;

    _classCallCheck(this, Index);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "loadLogView", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var response, data, error, selectedTable, uuid, i, table, _this$getFilterForTab, isLive, disableLive, dateRange;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _actions__WEBPACK_IMPORTED_MODULE_33__["LogViewActions"].getAll();

            case 2:
              response = _context.sent;
              data = response.data, error = response.error;

              if (!error) {
                _context.next = 6;
                break;
              }

              return _context.abrupt("return");

            case 6:
              if (!(data.length === 0)) {
                _context.next = 9;
                break;
              }

              window.location.href = '/welcome';
              return _context.abrupt("return");

            case 9:
              selectedTable = null;
              uuid = window.uuid;

              if (!window.uuid) {
                _context.next = 23;
                break;
              }

              _context.t0 = regeneratorRuntime.keys(data);

            case 13:
              if ((_context.t1 = _context.t0()).done) {
                _context.next = 21;
                break;
              }

              i = _context.t1.value;
              table = data[i];

              if (!(table.uuid === window.uuid)) {
                _context.next = 19;
                break;
              }

              selectedTable = data[i];
              return _context.abrupt("break", 21);

            case 19:
              _context.next = 13;
              break;

            case 21:
              _context.next = 24;
              break;

            case 23:
              if (data.length > 0) {
                selectedTable = data[0];
                uuid = selectedTable.uuid;
              }

            case 24:
              _this$getFilterForTab = _this.getFilterForTable(uuid), isLive = _this$getFilterForTab.isLive, disableLive = _this$getFilterForTab.disableLive, dateRange = _this$getFilterForTab.dateRange;

              _this.setState({
                logViews: data,
                selectedTable: selectedTable,
                disableLive: disableLive,
                isLive: isLive,
                dateRange: dateRange
              }, function () {
                var _this$state = _this.state,
                    logViews = _this$state.logViews,
                    isLive = _this$state.isLive;

                if (logViews.length > 0) {
                  _this.loadData();

                  if (isLive) _this.startStreaming();
                }
              });

            case 26:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));

    _defineProperty(_assertThisInitialized(_this), "getFilterForTable", function (uuid) {
      var cData = Object(_utils__WEBPACK_IMPORTED_MODULE_35__["getDataFromCookies"])(uuid) || '{}';
      var newDateRange = {};
      var disableLive = '';
      var isLive = '';
      var dateRangeLabel = '';

      if (cData !== '{}') {
        var cDataObject = JSON.parse(cData);
        dateRangeLabel = cDataObject.label || '';

        if (dateRangeLabel !== 'Custom Range') {
          var dateRangeValue = _utils__WEBPACK_IMPORTED_MODULE_35__["DATE_RANGE"].find(function (item) {
            return item.label === dateRangeLabel;
          });

          if (dateRangeValue) {
            newDateRange = _objectSpread({}, dateRangeValue);
            disableLive = !Number.isInteger(newDateRange.fromValue);
            isLive = cDataObject.isLive == 1;
          }
        } else {
          newDateRange.label = cDataObject.label;
          newDateRange.from = moment.unix(cDataObject.from);
          newDateRange.to = moment.unix(cDataObject.to);
          disableLive = true;
          isLive = false;
        }
      } else {
        newDateRange = {
          from: _utils__WEBPACK_IMPORTED_MODULE_35__["DATE_RANGE"][0].from,
          to: _utils__WEBPACK_IMPORTED_MODULE_35__["DATE_RANGE"][0].to,
          label: _utils__WEBPACK_IMPORTED_MODULE_35__["DATE_RANGE"][0].label
        };
        disableLive = false;
        isLive = true;

        _this.setDataCookies(uuid, {
          label: _utils__WEBPACK_IMPORTED_MODULE_35__["DATE_RANGE"][0].label,
          isLive: 1
        });
      }

      return {
        dateRange: _objectSpread({}, newDateRange),
        isLive: isLive,
        disableLive: disableLive
      };
    });

    _defineProperty(_assertThisInitialized(_this), "setDataCookies", function (uuid, cData) {
      Object(_utils__WEBPACK_IMPORTED_MODULE_35__["setDataToCookies"])(uuid, "".concat(JSON.stringify(cData)), 30);
    });

    _this.state = {
      logViews: [],
      isLive: true,
      disableLive: false,
      interval: 5000,
      showTableSettingModal: false,
      selectedTable: null,
      tableColumnList: [],
      dateRange: {
        from: _utils__WEBPACK_IMPORTED_MODULE_35__["DATE_RANGE"][0].from,
        to: _utils__WEBPACK_IMPORTED_MODULE_35__["DATE_RANGE"][0].to,
        label: _utils__WEBPACK_IMPORTED_MODULE_35__["DATE_RANGE"][0].label
      },
      queries: [],
      showQueryModal: false,
      queryModalQuery: {}
    };
    _this.advanceSearchRef = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_30___default.a.createRef();
    _this.handleRealTimeClicked = _this.handleRealTimeClicked.bind(_assertThisInitialized(_this));
    _this.onDateRangeChanged = _this.onDateRangeChanged.bind(_assertThisInitialized(_this));
    _this.setSelectedTable = _this.setSelectedTable.bind(_assertThisInitialized(_this));
    _this.syncAll = _this.syncAll.bind(_assertThisInitialized(_this));
    _this.onSubmitQuery = _this.onSubmitQuery.bind(_assertThisInitialized(_this));
    _this.onQuerySave = _this.onQuerySave.bind(_assertThisInitialized(_this));
    _this.onQueryModelChange = _this.onQueryModelChange.bind(_assertThisInitialized(_this));
    _this.onDeleteQuery = _this.onDeleteQuery.bind(_assertThisInitialized(_this));
    _this.hideQueryModal = _this.hideQueryModal.bind(_assertThisInitialized(_this));
    _this.setDate = _this.setDate.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Index, [{
    key: "loadData",
    value: function loadData() {
      var _this$state2 = this.state,
          selectedTable = _this$state2.selectedTable,
          queries = _this$state2.queries;

      if (!selectedTable) {
        return;
      }

      var that = this;

      if (queries[selectedTable.uuid] === undefined) {
        _actions__WEBPACK_IMPORTED_MODULE_33__["LogTableActions"].getQueries(selectedTable.uuid).then(function (res) {
          var error = res.error,
              data = res.data;

          if (error === 0) {
            queries[selectedTable.uuid] = data;
            that.setState({
              queries: queries
            });
          }
        });
      }

      _actions__WEBPACK_IMPORTED_MODULE_33__["Live"].refresh();
      window.history.pushState('logview', selectedTable.name, '/log-view/' + selectedTable.uuid);
    }
  }, {
    key: "startStreaming",
    value: function startStreaming() {
      _actions__WEBPACK_IMPORTED_MODULE_33__["Live"].start(this.state.interval);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      _actions__WEBPACK_IMPORTED_MODULE_33__["Event"].bus.register(_actions__WEBPACK_IMPORTED_MODULE_33__["Event"].RESPONSE_ERROR, function (res) {
        var error = res.error;

        if (error === _actions__WEBPACK_IMPORTED_MODULE_33__["Event"].ERROR_INVALID_QUERY) {
          _this2.setState({
            isLive: false
          });

          _actions__WEBPACK_IMPORTED_MODULE_33__["Live"].pause();
        }
      });
      this.syncAll();
    }
  }, {
    key: "syncAll",
    value: function syncAll() {
      var $this = this;
      _actions__WEBPACK_IMPORTED_MODULE_33__["DatabaseActions"].syncAll().then(function (response) {
        var error = response.error;

        if (error === 0) {
          $this.loadLogView();
        }
      });
    }
  }, {
    key: "setSelectedTable",
    value: function setSelectedTable(selectedTable) {
      var _this3 = this;

      var _this$getFilterForTab2 = this.getFilterForTable(selectedTable.uuid),
          isLive = _this$getFilterForTab2.isLive,
          disableLive = _this$getFilterForTab2.disableLive,
          dateRange = _this$getFilterForTab2.dateRange;

      this.setState({
        selectedTable: selectedTable,
        isLive: isLive,
        disableLive: disableLive,
        dateRange: dateRange
      }, function () {
        _this3.loadData();

        if (!isLive) _actions__WEBPACK_IMPORTED_MODULE_33__["Live"].pause();else if (isLive) _this3.startStreaming();
      });
    }
  }, {
    key: "handleRealTimeClicked",
    value: function handleRealTimeClicked(event) {
      var _this$state3 = this.state,
          interval = _this$state3.interval,
          selectedTable = _this$state3.selectedTable;
      var checked = event.target.checked;
      this.setState({
        isLive: checked
      });

      if (checked) {
        _actions__WEBPACK_IMPORTED_MODULE_33__["Live"].start(interval, true);
      } else {
        _actions__WEBPACK_IMPORTED_MODULE_33__["Live"].pause();
      }

      var cData = JSON.parse(Object(_utils__WEBPACK_IMPORTED_MODULE_35__["getDataFromCookies"])(selectedTable.uuid) || '{}');
      cData.isLive = checked ? 1 : 0;
      this.setDataCookies(selectedTable.uuid, cData);
    }
  }, {
    key: "onDateRangeChanged",
    value: function onDateRangeChanged(from, to, dateRange) {
      var needToRefresh = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      var _this$state4 = this.state,
          selectedTable = _this$state4.selectedTable,
          interval = _this$state4.interval,
          isLive = _this$state4.isLive;

      if (to) {
        this.setState({
          // isLive: false,
          disableLive: true
        });
        dateRange.isLive = 0;
        _actions__WEBPACK_IMPORTED_MODULE_33__["Live"].pause();
      } else if (!to) {
        this.setState({
          // isLive: true,
          disableLive: false
        });

        if (isLive) {
          _actions__WEBPACK_IMPORTED_MODULE_33__["Live"].start(interval);
        }

        dateRange.isLive = isLive ? 1 : 0;
      }

      this.setDataCookies(selectedTable.uuid, dateRange);
      this.setState({
        dateRange: dateRange
      }, function () {
        if (needToRefresh) {
          _actions__WEBPACK_IMPORTED_MODULE_33__["Live"].refresh();
        }
      });
    }
  }, {
    key: "onSubmitQuery",
    value: function onSubmitQuery(query) {
      this.setState({
        showQueryModal: true,
        queryModalQuery: query
      });
    }
  }, {
    key: "onQuerySave",
    value: function onQuerySave() {
      var that = this;
      var _this$state5 = this.state,
          queryModalQuery = _this$state5.queryModalQuery,
          selectedTable = _this$state5.selectedTable,
          queries = _this$state5.queries;

      if ($.trim(queryModalQuery.name) == '') {
        _actions__WEBPACK_IMPORTED_MODULE_33__["Alert"].error('Query name should not be blank');
        queryModalQuery.nameClass = 'is-invalid';
        that.setState({
          queryModalQuery: queryModalQuery
        });
        return;
      }

      queryModalQuery.nameClass = '';

      if ($.trim(queryModalQuery.name) == '' || $.trim(queryModalQuery.query) == '') {
        _actions__WEBPACK_IMPORTED_MODULE_33__["Alert"].error('Query should not be blank');
        queryModalQuery.queryClass = 'is-invalid';
        that.setState({
          queryModalQuery: queryModalQuery
        });
        return;
      }

      queryModalQuery.queryClass = '';
      that.setState({
        queryModalQuery: queryModalQuery
      });
      _actions__WEBPACK_IMPORTED_MODULE_33__["LogTableActions"].saveQueries(selectedTable.uuid, queryModalQuery, queryModalQuery.id).then(function (res) {
        var error = res.error,
            query = res.query;

        if (error === 0) {
          if (queryModalQuery.id) {
            _actions__WEBPACK_IMPORTED_MODULE_33__["Alert"].success('Update successful');
            var selectedQueries = queries[selectedTable.uuid];

            for (var i = 0; i < selectedQueries.length; i++) {
              if (selectedQueries[i].id === query.id) {
                queries[selectedTable.uuid][i] = query;
                break;
              }
            }
          } else {
            _actions__WEBPACK_IMPORTED_MODULE_33__["Alert"].success('Create successful');
            queries[selectedTable.uuid].push(query);
          }

          that.setState({
            queryModalQuery: {},
            showQueryModal: false,
            queries: queries
          });
        }
      });
    }
  }, {
    key: "onDeleteQuery",
    value: function onDeleteQuery(query) {
      var that = this;
      var _this$state6 = this.state,
          selectedTable = _this$state6.selectedTable,
          queries = _this$state6.queries;
      _actions__WEBPACK_IMPORTED_MODULE_33__["LogTableActions"].deleteQueries(query.id).then(function (res) {
        var error = res.error;

        if (error === 0) {
          _actions__WEBPACK_IMPORTED_MODULE_33__["Alert"].success('Delete successful');
          var selectedQueries = queries[selectedTable.uuid];

          for (var i = 0; i < selectedQueries.length; i++) {
            if (selectedQueries[i].id === query.id) {
              queries[selectedTable.uuid].splice(i, 1);
              break;
            }
          }

          that.setState({
            queries: queries,
            showQueryModal: false
          });
        }
      });
    }
  }, {
    key: "onQueryModelChange",
    value: function onQueryModelChange(e) {
      var queryModalQuery = this.state.queryModalQuery;
      queryModalQuery[e.target.name] = e.target.value;
      queryModalQuery[e.target.name + 'Class'] = e.target.value == '' ? 'is-invalid' : '';
      this.setState({
        queryModalQuery: queryModalQuery
      });
    }
  }, {
    key: "hideQueryModal",
    value: function hideQueryModal() {
      this.setState({
        showQueryModal: false
      });
    }
  }, {
    key: "setDate",
    value: function setDate(from, to, dateValue, callback) {
      this.advanceSearchRef.current.setDate(from, to, dateValue, callback);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state7 = this.state,
          isLive = _this$state7.isLive,
          disableLive = _this$state7.disableLive,
          logViews = _this$state7.logViews,
          selectedTable = _this$state7.selectedTable,
          dateRange = _this$state7.dateRange,
          queries = _this$state7.queries,
          showQueryModal = _this$state7.showQueryModal,
          queryModalQuery = _this$state7.queryModalQuery;
      var uuid = selectedTable ? selectedTable.uuid : null;
      var selectedQueries = queries[uuid] || [];
      var query = queryModalQuery.query,
          name = queryModalQuery.name,
          _queryModalQuery$name = queryModalQuery.nameClass,
          nameClass = _queryModalQuery$name === void 0 ? '' : _queryModalQuery$name,
          _queryModalQuery$quer = queryModalQuery.queryClass,
          queryClass = _queryModalQuery$quer === void 0 ? '' : _queryModalQuery$quer;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_30___default.a.createElement("div", {
        className: "dashboard-page ms-cp-4 me-cp-3 mt-3"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_30___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_32__["ContentHeader"], {
        pageTitle: "Explorer",
        iconName: "search"
      }), logViews && logViews.length > 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_30___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_30___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_30___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_32__["AdvancedSearch"], {
        key: selectedTable.uuid,
        onDateRangeChanged: this.onDateRangeChanged,
        data: logViews,
        selected: selectedTable,
        onSelected: this.setSelectedTable,
        dateRange: dateRange,
        queries: selectedQueries,
        onSaveClicked: this.onSubmitQuery,
        onDeleteCLicked: this.onDeleteQuery,
        ref: this.advanceSearchRef
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_30___default.a.createElement("div", {
        className: "float-chart row justify-content-start flex-md-wrap"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_30___default.a.createElement("div", {
        className: "col-12"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_30___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_32__["UPlotChart"], {
        isLive: isLive,
        uuid: uuid,
        handleRealTimeClicked: this.handleRealTimeClicked,
        disableLive: disableLive,
        className: "mb-2",
        setDate: this.setDate
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_30___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_32__["LogViewTable"], {
        selectedTable: selectedTable
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_30___default.a.createElement(_components_modal__WEBPACK_IMPORTED_MODULE_36__["Modal"], {
        title: 'Query',
        id: 'query',
        size: _components__WEBPACK_IMPORTED_MODULE_32__["Size"].large,
        saveButtonTitle: 'Save',
        showSaveButton: true,
        show: showQueryModal,
        saveButtonAction: this.onQuerySave,
        closeButtonAction: this.hideQueryModal
      }, showQueryModal && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_30___default.a.createElement("div", {
        className: "row"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_30___default.a.createElement("div", {
        className: "col-12"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_30___default.a.createElement(_components_input__WEBPACK_IMPORTED_MODULE_37__["Input"], {
        name: "name",
        placeholder: "Query name",
        defaultValue: name,
        className: nameClass,
        onChange: this.onQueryModelChange
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_30___default.a.createElement("div", {
        className: "col-12 mt-3"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_30___default.a.createElement(_components_input__WEBPACK_IMPORTED_MODULE_37__["Input"], {
        name: "query",
        defaultValue: query,
        className: queryClass,
        onChange: this.onQueryModelChange
      }))))) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_30___default.a.createElement("div", {
        className: "spinner text-center position-absolute"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_30___default.a.createElement("div", {
        className: "spinner-border text-primary",
        role: "status"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_30___default.a.createElement("span", {
        className: "sr-only"
      }, "Loading..."))));
    }
  }]);

  return Index;
}(react__WEBPACK_IMPORTED_MODULE_30__["Component"]);

react_dom__WEBPACK_IMPORTED_MODULE_31___default.a.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_30___default.a.createElement(Index, null), document.querySelector('#root'));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! moment */ "./node_modules/moment/moment.js"), __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./assets/styles/pages/index.scss":
/*!****************************************!*\
  !*** ./assets/styles/pages/index.scss ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/core-js/internals/is-integer.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/is-integer.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");

var floor = Math.floor;

// `Number.isInteger` method implementation
// https://tc39.github.io/ecma262/#sec-number.isinteger
module.exports = function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor(it) === it;
};


/***/ }),

/***/ "./node_modules/core-js/modules/es.number.is-integer.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es.number.is-integer.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var isInteger = __webpack_require__(/*! ../internals/is-integer */ "./node_modules/core-js/internals/is-integer.js");

// `Number.isInteger` method
// https://tc39.github.io/ecma262/#sec-number.isinteger
$({ target: 'Number', stat: true }, {
  isInteger: isInteger
});


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3BhZ2VzL2luZGV4L2luZGV4LmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9zdHlsZXMvcGFnZXMvaW5kZXguc2NzcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaXMtaW50ZWdlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLm51bWJlci5pcy1pbnRlZ2VyLmpzIl0sIm5hbWVzIjpbIkluZGV4IiwicHJvcHMiLCJMb2dWaWV3QWN0aW9ucyIsImdldEFsbCIsInJlc3BvbnNlIiwiZGF0YSIsImVycm9yIiwibGVuZ3RoIiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwic2VsZWN0ZWRUYWJsZSIsInV1aWQiLCJpIiwidGFibGUiLCJnZXRGaWx0ZXJGb3JUYWJsZSIsImlzTGl2ZSIsImRpc2FibGVMaXZlIiwiZGF0ZVJhbmdlIiwic2V0U3RhdGUiLCJsb2dWaWV3cyIsInN0YXRlIiwibG9hZERhdGEiLCJzdGFydFN0cmVhbWluZyIsImNEYXRhIiwiZ2V0RGF0YUZyb21Db29raWVzIiwibmV3RGF0ZVJhbmdlIiwiZGF0ZVJhbmdlTGFiZWwiLCJjRGF0YU9iamVjdCIsIkpTT04iLCJwYXJzZSIsImxhYmVsIiwiZGF0ZVJhbmdlVmFsdWUiLCJEQVRFX1JBTkdFIiwiZmluZCIsIml0ZW0iLCJOdW1iZXIiLCJpc0ludGVnZXIiLCJmcm9tVmFsdWUiLCJmcm9tIiwibW9tZW50IiwidW5peCIsInRvIiwic2V0RGF0YUNvb2tpZXMiLCJzZXREYXRhVG9Db29raWVzIiwic3RyaW5naWZ5IiwiaW50ZXJ2YWwiLCJzaG93VGFibGVTZXR0aW5nTW9kYWwiLCJ0YWJsZUNvbHVtbkxpc3QiLCJxdWVyaWVzIiwic2hvd1F1ZXJ5TW9kYWwiLCJxdWVyeU1vZGFsUXVlcnkiLCJhZHZhbmNlU2VhcmNoUmVmIiwiUmVhY3QiLCJjcmVhdGVSZWYiLCJoYW5kbGVSZWFsVGltZUNsaWNrZWQiLCJiaW5kIiwib25EYXRlUmFuZ2VDaGFuZ2VkIiwic2V0U2VsZWN0ZWRUYWJsZSIsInN5bmNBbGwiLCJvblN1Ym1pdFF1ZXJ5Iiwib25RdWVyeVNhdmUiLCJvblF1ZXJ5TW9kZWxDaGFuZ2UiLCJvbkRlbGV0ZVF1ZXJ5IiwiaGlkZVF1ZXJ5TW9kYWwiLCJzZXREYXRlIiwidGhhdCIsInVuZGVmaW5lZCIsIkxvZ1RhYmxlQWN0aW9ucyIsImdldFF1ZXJpZXMiLCJ0aGVuIiwicmVzIiwiTGl2ZSIsInJlZnJlc2giLCJoaXN0b3J5IiwicHVzaFN0YXRlIiwibmFtZSIsInN0YXJ0IiwiRXZlbnQiLCJidXMiLCJyZWdpc3RlciIsIlJFU1BPTlNFX0VSUk9SIiwiRVJST1JfSU5WQUxJRF9RVUVSWSIsInBhdXNlIiwiJHRoaXMiLCJEYXRhYmFzZUFjdGlvbnMiLCJsb2FkTG9nVmlldyIsImV2ZW50IiwiY2hlY2tlZCIsInRhcmdldCIsIm5lZWRUb1JlZnJlc2giLCJxdWVyeSIsIiQiLCJ0cmltIiwiQWxlcnQiLCJuYW1lQ2xhc3MiLCJxdWVyeUNsYXNzIiwic2F2ZVF1ZXJpZXMiLCJpZCIsInN1Y2Nlc3MiLCJzZWxlY3RlZFF1ZXJpZXMiLCJwdXNoIiwiZGVsZXRlUXVlcmllcyIsInNwbGljZSIsImUiLCJ2YWx1ZSIsImRhdGVWYWx1ZSIsImNhbGxiYWNrIiwiY3VycmVudCIsIlNpemUiLCJsYXJnZSIsIkNvbXBvbmVudCIsIlJlYWN0RE9NIiwicmVuZGVyIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSxRQUFRLG9CQUFvQjtRQUM1QjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FB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O0VBemFlaUQsZ0Q7O0FBNGFwQkMsaURBQVEsQ0FBQ0MsTUFBVCxlQUFnQiw0REFBQyxLQUFELE9BQWhCLEVBQTBCQyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBMUIsRTs7Ozs7Ozs7Ozs7O0FDN2JBLHVDOzs7Ozs7Ozs7OztBQ0FBLGVBQWUsbUJBQU8sQ0FBQyw2RUFBd0I7O0FBRS9DOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ1JBLFFBQVEsbUJBQU8sQ0FBQyx1RUFBcUI7QUFDckMsZ0JBQWdCLG1CQUFPLENBQUMsK0VBQXlCOztBQUVqRDtBQUNBO0FBQ0EsR0FBRywrQkFBK0I7QUFDbEM7QUFDQSxDQUFDIiwiZmlsZSI6InBhZ2VfaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcbiBcdFx0dmFyIGV4ZWN1dGVNb2R1bGVzID0gZGF0YVsyXTtcblxuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcblxuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0XHQvLyBhZGQgZW50cnkgbW9kdWxlcyBmcm9tIGxvYWRlZCBjaHVuayB0byBkZWZlcnJlZCBsaXN0XG4gXHRcdGRlZmVycmVkTW9kdWxlcy5wdXNoLmFwcGx5KGRlZmVycmVkTW9kdWxlcywgZXhlY3V0ZU1vZHVsZXMgfHwgW10pO1xuXG4gXHRcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gYWxsIGNodW5rcyByZWFkeVxuIFx0XHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiBcdH07XG4gXHRmdW5jdGlvbiBjaGVja0RlZmVycmVkTW9kdWxlcygpIHtcbiBcdFx0dmFyIHJlc3VsdDtcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlZmVycmVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBkZWZlcnJlZE1vZHVsZSA9IGRlZmVycmVkTW9kdWxlc1tpXTtcbiBcdFx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcbiBcdFx0XHRmb3IodmFyIGogPSAxOyBqIDwgZGVmZXJyZWRNb2R1bGUubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBkZXBJZCA9IGRlZmVycmVkTW9kdWxlW2pdO1xuIFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2RlcElkXSAhPT0gMCkgZnVsZmlsbGVkID0gZmFsc2U7XG4gXHRcdFx0fVxuIFx0XHRcdGlmKGZ1bGZpbGxlZCkge1xuIFx0XHRcdFx0ZGVmZXJyZWRNb2R1bGVzLnNwbGljZShpLS0sIDEpO1xuIFx0XHRcdFx0cmVzdWx0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBkZWZlcnJlZE1vZHVsZVswXSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0cmV0dXJuIHJlc3VsdDtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBDU1MgY2h1bmtzXG4gXHR2YXIgaW5zdGFsbGVkQ3NzQ2h1bmtzID0ge1xuIFx0XHRcInBhZ2VfaW5kZXhcIjogMFxuIFx0fVxuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJwYWdlX2luZGV4XCI6IDBcbiBcdH07XG5cbiBcdHZhciBkZWZlcnJlZE1vZHVsZXMgPSBbXTtcblxuIFx0Ly8gc2NyaXB0IHBhdGggZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIGpzb25wU2NyaXB0U3JjKGNodW5rSWQpIHtcbiBcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyAoe31bY2h1bmtJZF18fGNodW5rSWQpICsgXCIuanNcIlxuIFx0fVxuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cbiBcdC8vIFRoaXMgZmlsZSBjb250YWlucyBvbmx5IHRoZSBlbnRyeSBjaHVuay5cbiBcdC8vIFRoZSBjaHVuayBsb2FkaW5nIGZ1bmN0aW9uIGZvciBhZGRpdGlvbmFsIGNodW5rc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5lID0gZnVuY3Rpb24gcmVxdWlyZUVuc3VyZShjaHVua0lkKSB7XG4gXHRcdHZhciBwcm9taXNlcyA9IFtdO1xuXG5cbiBcdFx0Ly8gbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4gQ1NTIGxvYWRpbmdcbiBcdFx0dmFyIGNzc0NodW5rcyA9IHtcIjBcIjoxfTtcbiBcdFx0aWYoaW5zdGFsbGVkQ3NzQ2h1bmtzW2NodW5rSWRdKSBwcm9taXNlcy5wdXNoKGluc3RhbGxlZENzc0NodW5rc1tjaHVua0lkXSk7XG4gXHRcdGVsc2UgaWYoaW5zdGFsbGVkQ3NzQ2h1bmtzW2NodW5rSWRdICE9PSAwICYmIGNzc0NodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ3NzQ2h1bmtzW2NodW5rSWRdID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0XHR2YXIgaHJlZiA9IFwiXCIgKyAoe31bY2h1bmtJZF18fGNodW5rSWQpICsgXCIuY3NzXCI7XG4gXHRcdFx0XHR2YXIgZnVsbGhyZWYgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBocmVmO1xuIFx0XHRcdFx0dmFyIGV4aXN0aW5nTGlua1RhZ3MgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImxpbmtcIik7XG4gXHRcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZXhpc3RpbmdMaW5rVGFncy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHR2YXIgdGFnID0gZXhpc3RpbmdMaW5rVGFnc1tpXTtcbiBcdFx0XHRcdFx0dmFyIGRhdGFIcmVmID0gdGFnLmdldEF0dHJpYnV0ZShcImRhdGEtaHJlZlwiKSB8fCB0YWcuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKTtcbiBcdFx0XHRcdFx0aWYodGFnLnJlbCA9PT0gXCJzdHlsZXNoZWV0XCIgJiYgKGRhdGFIcmVmID09PSBocmVmIHx8IGRhdGFIcmVmID09PSBmdWxsaHJlZikpIHJldHVybiByZXNvbHZlKCk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHR2YXIgZXhpc3RpbmdTdHlsZVRhZ3MgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInN0eWxlXCIpO1xuIFx0XHRcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGV4aXN0aW5nU3R5bGVUYWdzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdHZhciB0YWcgPSBleGlzdGluZ1N0eWxlVGFnc1tpXTtcbiBcdFx0XHRcdFx0dmFyIGRhdGFIcmVmID0gdGFnLmdldEF0dHJpYnV0ZShcImRhdGEtaHJlZlwiKTtcbiBcdFx0XHRcdFx0aWYoZGF0YUhyZWYgPT09IGhyZWYgfHwgZGF0YUhyZWYgPT09IGZ1bGxocmVmKSByZXR1cm4gcmVzb2x2ZSgpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0dmFyIGxpbmtUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcbiBcdFx0XHRcdGxpbmtUYWcucmVsID0gXCJzdHlsZXNoZWV0XCI7XG4gXHRcdFx0XHRsaW5rVGFnLnR5cGUgPSBcInRleHQvY3NzXCI7XG4gXHRcdFx0XHRsaW5rVGFnLm9ubG9hZCA9IHJlc29sdmU7XG4gXHRcdFx0XHRsaW5rVGFnLm9uZXJyb3IgPSBmdW5jdGlvbihldmVudCkge1xuIFx0XHRcdFx0XHR2YXIgcmVxdWVzdCA9IGV2ZW50ICYmIGV2ZW50LnRhcmdldCAmJiBldmVudC50YXJnZXQuc3JjIHx8IGZ1bGxocmVmO1xuIFx0XHRcdFx0XHR2YXIgZXJyID0gbmV3IEVycm9yKFwiTG9hZGluZyBDU1MgY2h1bmsgXCIgKyBjaHVua0lkICsgXCIgZmFpbGVkLlxcbihcIiArIHJlcXVlc3QgKyBcIilcIik7XG4gXHRcdFx0XHRcdGVyci5yZXF1ZXN0ID0gcmVxdWVzdDtcbiBcdFx0XHRcdFx0cmVqZWN0KGVycik7XG4gXHRcdFx0XHR9O1xuIFx0XHRcdFx0bGlua1RhZy5ocmVmID0gZnVsbGhyZWY7XG4gXHRcdFx0XHR2YXIgaGVhZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXTtcbiBcdFx0XHRcdGhlYWQuYXBwZW5kQ2hpbGQobGlua1RhZyk7XG4gXHRcdFx0fSkudGhlbihmdW5jdGlvbigpIHtcbiBcdFx0XHRcdGluc3RhbGxlZENzc0NodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdFx0fSkpO1xuIFx0XHR9XG5cbiBcdFx0Ly8gSlNPTlAgY2h1bmsgbG9hZGluZyBmb3IgamF2YXNjcmlwdFxuXG4gXHRcdHZhciBpbnN0YWxsZWRDaHVua0RhdGEgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSAhPT0gMCkgeyAvLyAwIG1lYW5zIFwiYWxyZWFkeSBpbnN0YWxsZWRcIi5cblxuIFx0XHRcdC8vIGEgUHJvbWlzZSBtZWFucyBcImN1cnJlbnRseSBsb2FkaW5nXCIuXG4gXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhKSB7XG4gXHRcdFx0XHRwcm9taXNlcy5wdXNoKGluc3RhbGxlZENodW5rRGF0YVsyXSk7XG4gXHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdC8vIHNldHVwIFByb21pc2UgaW4gY2h1bmsgY2FjaGVcbiBcdFx0XHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0XHRcdGluc3RhbGxlZENodW5rRGF0YSA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IFtyZXNvbHZlLCByZWplY3RdO1xuIFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRwcm9taXNlcy5wdXNoKGluc3RhbGxlZENodW5rRGF0YVsyXSA9IHByb21pc2UpO1xuXG4gXHRcdFx0XHQvLyBzdGFydCBjaHVuayBsb2FkaW5nXG4gXHRcdFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gXHRcdFx0XHR2YXIgb25TY3JpcHRDb21wbGV0ZTtcblxuIFx0XHRcdFx0c2NyaXB0LmNoYXJzZXQgPSAndXRmLTgnO1xuIFx0XHRcdFx0c2NyaXB0LnRpbWVvdXQgPSAxMjA7XG4gXHRcdFx0XHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5uYykge1xuIFx0XHRcdFx0XHRzY3JpcHQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgX193ZWJwYWNrX3JlcXVpcmVfXy5uYyk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRzY3JpcHQuc3JjID0ganNvbnBTY3JpcHRTcmMoY2h1bmtJZCk7XG5cbiBcdFx0XHRcdC8vIGNyZWF0ZSBlcnJvciBiZWZvcmUgc3RhY2sgdW53b3VuZCB0byBnZXQgdXNlZnVsIHN0YWNrdHJhY2UgbGF0ZXJcbiBcdFx0XHRcdHZhciBlcnJvciA9IG5ldyBFcnJvcigpO1xuIFx0XHRcdFx0b25TY3JpcHRDb21wbGV0ZSA9IGZ1bmN0aW9uIChldmVudCkge1xuIFx0XHRcdFx0XHQvLyBhdm9pZCBtZW0gbGVha3MgaW4gSUUuXG4gXHRcdFx0XHRcdHNjcmlwdC5vbmVycm9yID0gc2NyaXB0Lm9ubG9hZCA9IG51bGw7XG4gXHRcdFx0XHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiBcdFx0XHRcdFx0dmFyIGNodW5rID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0XHRcdFx0XHRpZihjaHVuayAhPT0gMCkge1xuIFx0XHRcdFx0XHRcdGlmKGNodW5rKSB7XG4gXHRcdFx0XHRcdFx0XHR2YXIgZXJyb3JUeXBlID0gZXZlbnQgJiYgKGV2ZW50LnR5cGUgPT09ICdsb2FkJyA/ICdtaXNzaW5nJyA6IGV2ZW50LnR5cGUpO1xuIFx0XHRcdFx0XHRcdFx0dmFyIHJlYWxTcmMgPSBldmVudCAmJiBldmVudC50YXJnZXQgJiYgZXZlbnQudGFyZ2V0LnNyYztcbiBcdFx0XHRcdFx0XHRcdGVycm9yLm1lc3NhZ2UgPSAnTG9hZGluZyBjaHVuayAnICsgY2h1bmtJZCArICcgZmFpbGVkLlxcbignICsgZXJyb3JUeXBlICsgJzogJyArIHJlYWxTcmMgKyAnKSc7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci5uYW1lID0gJ0NodW5rTG9hZEVycm9yJztcbiBcdFx0XHRcdFx0XHRcdGVycm9yLnR5cGUgPSBlcnJvclR5cGU7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci5yZXF1ZXN0ID0gcmVhbFNyYztcbiBcdFx0XHRcdFx0XHRcdGNodW5rWzFdKGVycm9yKTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gdW5kZWZpbmVkO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9O1xuIFx0XHRcdFx0dmFyIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gXHRcdFx0XHRcdG9uU2NyaXB0Q29tcGxldGUoeyB0eXBlOiAndGltZW91dCcsIHRhcmdldDogc2NyaXB0IH0pO1xuIFx0XHRcdFx0fSwgMTIwMDAwKTtcbiBcdFx0XHRcdHNjcmlwdC5vbmVycm9yID0gc2NyaXB0Lm9ubG9hZCA9IG9uU2NyaXB0Q29tcGxldGU7XG4gXHRcdFx0XHRkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gXHR9O1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Fzc2V0cy9cIjtcblxuIFx0Ly8gb24gZXJyb3IgZnVuY3Rpb24gZm9yIGFzeW5jIGxvYWRpbmdcbiBcdF9fd2VicGFja19yZXF1aXJlX18ub2UgPSBmdW5jdGlvbihlcnIpIHsgY29uc29sZS5lcnJvcihlcnIpOyB0aHJvdyBlcnI7IH07XG5cbiBcdHZhciBqc29ucEFycmF5ID0gd2luZG93W1wid2VicGFja0pzb25wXCJdID0gd2luZG93W1wid2VicGFja0pzb25wXCJdIHx8IFtdO1xuIFx0dmFyIG9sZEpzb25wRnVuY3Rpb24gPSBqc29ucEFycmF5LnB1c2guYmluZChqc29ucEFycmF5KTtcbiBcdGpzb25wQXJyYXkucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrO1xuIFx0anNvbnBBcnJheSA9IGpzb25wQXJyYXkuc2xpY2UoKTtcbiBcdGZvcih2YXIgaSA9IDA7IGkgPCBqc29ucEFycmF5Lmxlbmd0aDsgaSsrKSB3ZWJwYWNrSnNvbnBDYWxsYmFjayhqc29ucEFycmF5W2ldKTtcbiBcdHZhciBwYXJlbnRKc29ucEZ1bmN0aW9uID0gb2xkSnNvbnBGdW5jdGlvbjtcblxuXG4gXHQvLyBhZGQgZW50cnkgbW9kdWxlIHRvIGRlZmVycmVkIGxpc3RcbiBcdGRlZmVycmVkTW9kdWxlcy5wdXNoKFtcIi4vYXNzZXRzL2pzL3BhZ2VzL2luZGV4L2luZGV4LmpzXCIsXCJ2ZW5kb3JzfmFsZXJ0c19saXN0fmFwcH5kYXNoYm9hcmQtcGFnZX5kYXNoYm9hcmRfZW1wdHl+ZGFzaGJvYXJkX2Zvcm1+ZXhwb3J0X2xpc3R+ZmxvdF9jaGFydH5ncmFwaF9mfmZlZDI5MDU0XCIsXCJ2ZW5kb3JzfmFsZXJ0c19saXN0fmRhc2hib2FyZC1wYWdlfmRhc2hib2FyZF9lbXB0eX5kYXNoYm9hcmRfZm9ybX5leHBvcnRfbGlzdH5mbG90X2NoYXJ0fmdyYXBoX2Zvcm1+fmZlMTAyZGU2XCIsXCJhbGVydHNfbGlzdH5kYXNoYm9hcmQtcGFnZX5kYXNoYm9hcmRfZW1wdHl+ZGFzaGJvYXJkX2Zvcm1+ZXhwb3J0X2xpc3R+ZmxvdF9jaGFydH5ncmFwaF9mb3JtfmdyYXBoX2xpfmYzMjBjMzRiXCJdKTtcbiBcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gcmVhZHlcbiBcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIiwiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCB7XG4gICAgQWR2YW5jZWRTZWFyY2gsXG4gICAgU3VtbWFyeSxcbiAgICBGbG90Q2hhcnQsXG4gICAgTG9nVmlld1RhYmxlLFxuICAgIFNpemUsXG4gICAgVVBsb3RDaGFydCxcbiAgICBDb250ZW50SGVhZGVyXG59IGZyb20gJy4uLy4uL2NvbXBvbmVudHMnO1xuaW1wb3J0IHtMaXZlLCBMb2dUYWJsZUFjdGlvbnMsIEV2ZW50LCBMb2dWaWV3QWN0aW9ucywgRGF0YWJhc2VBY3Rpb25zLCBBbGVydH0gZnJvbSAnLi4vLi4vYWN0aW9ucyc7XG5pbXBvcnQgJy4uLy4uLy4uL3N0eWxlcy9wYWdlcy9pbmRleC5zY3NzJztcbmltcG9ydCB7REFURV9SQU5HRSwgZ2V0RGF0YUZyb21Db29raWVzLCBzZXREYXRhVG9Db29raWVzfSBmcm9tIFwiLi4vLi4vdXRpbHNcIjtcbmltcG9ydCB7TW9kYWx9IGZyb20gXCIuLi8uLi9jb21wb25lbnRzL19tb2RhbFwiO1xuaW1wb3J0IHtJbnB1dH0gZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvX2lucHV0XCI7XG5cbmNsYXNzIEluZGV4IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBsb2dWaWV3czogW10sXG4gICAgICAgICAgICBpc0xpdmU6IHRydWUsXG4gICAgICAgICAgICBkaXNhYmxlTGl2ZTogZmFsc2UsXG4gICAgICAgICAgICBpbnRlcnZhbDogNTAwMCxcbiAgICAgICAgICAgIHNob3dUYWJsZVNldHRpbmdNb2RhbDogZmFsc2UsXG4gICAgICAgICAgICBzZWxlY3RlZFRhYmxlOiBudWxsLFxuICAgICAgICAgICAgdGFibGVDb2x1bW5MaXN0OiBbXSxcbiAgICAgICAgICAgIGRhdGVSYW5nZToge1xuICAgICAgICAgICAgICAgIGZyb206IERBVEVfUkFOR0VbMF0uZnJvbSxcbiAgICAgICAgICAgICAgICB0bzogREFURV9SQU5HRVswXS50byxcbiAgICAgICAgICAgICAgICBsYWJlbDogREFURV9SQU5HRVswXS5sYWJlbCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBxdWVyaWVzOiBbXSxcbiAgICAgICAgICAgIHNob3dRdWVyeU1vZGFsOiBmYWxzZSxcbiAgICAgICAgICAgIHF1ZXJ5TW9kYWxRdWVyeToge30sXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5hZHZhbmNlU2VhcmNoUmVmID0gUmVhY3QuY3JlYXRlUmVmKCk7XG5cbiAgICAgICAgdGhpcy5oYW5kbGVSZWFsVGltZUNsaWNrZWQgPSB0aGlzLmhhbmRsZVJlYWxUaW1lQ2xpY2tlZC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLm9uRGF0ZVJhbmdlQ2hhbmdlZCA9IHRoaXMub25EYXRlUmFuZ2VDaGFuZ2VkLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuc2V0U2VsZWN0ZWRUYWJsZSA9IHRoaXMuc2V0U2VsZWN0ZWRUYWJsZS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLnN5bmNBbGwgPSB0aGlzLnN5bmNBbGwuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5vblN1Ym1pdFF1ZXJ5ID0gdGhpcy5vblN1Ym1pdFF1ZXJ5LmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub25RdWVyeVNhdmUgPSB0aGlzLm9uUXVlcnlTYXZlLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub25RdWVyeU1vZGVsQ2hhbmdlID0gdGhpcy5vblF1ZXJ5TW9kZWxDaGFuZ2UuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5vbkRlbGV0ZVF1ZXJ5ID0gdGhpcy5vbkRlbGV0ZVF1ZXJ5LmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuaGlkZVF1ZXJ5TW9kYWwgPSB0aGlzLmhpZGVRdWVyeU1vZGFsLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuc2V0RGF0ZSA9IHRoaXMuc2V0RGF0ZS5iaW5kKHRoaXMpO1xuICAgIH1cblxuICAgIGxvYWREYXRhKCkge1xuICAgICAgICBjb25zdCB7c2VsZWN0ZWRUYWJsZSwgcXVlcmllc30gPSB0aGlzLnN0YXRlO1xuXG4gICAgICAgIGlmICghc2VsZWN0ZWRUYWJsZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XG5cbiAgICAgICAgaWYgKHF1ZXJpZXNbc2VsZWN0ZWRUYWJsZS51dWlkXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBMb2dUYWJsZUFjdGlvbnMuZ2V0UXVlcmllcyhzZWxlY3RlZFRhYmxlLnV1aWQpXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qge2Vycm9yLCBkYXRhfSA9IHJlcztcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBxdWVyaWVzW3NlbGVjdGVkVGFibGUudXVpZF0gPSBkYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVlcmllczogcXVlcmllc1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgTGl2ZS5yZWZyZXNoKCk7XG4gICAgICAgIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSgnbG9ndmlldycsIHNlbGVjdGVkVGFibGUubmFtZSwgJy9sb2ctdmlldy8nICsgc2VsZWN0ZWRUYWJsZS51dWlkKTtcbiAgICB9XG5cbiAgICBsb2FkTG9nVmlldyA9IGFzeW5jKCkgPT4ge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IExvZ1ZpZXdBY3Rpb25zLmdldEFsbCgpO1xuICAgICAgICBjb25zdCB7ZGF0YSwgZXJyb3J9ID0gcmVzcG9uc2U7XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvd2VsY29tZSc7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgc2VsZWN0ZWRUYWJsZSA9IG51bGw7XG4gICAgICAgIGxldCB1dWlkID0gd2luZG93LnV1aWQ7XG5cbiAgICAgICAgaWYgKHdpbmRvdy51dWlkKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGkgaW4gZGF0YSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRhYmxlID0gZGF0YVtpXTtcbiAgICAgICAgICAgICAgICBpZiAodGFibGUudXVpZCA9PT0gd2luZG93LnV1aWQpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRUYWJsZSA9IGRhdGFbaV07XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChkYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHNlbGVjdGVkVGFibGUgPSBkYXRhWzBdO1xuICAgICAgICAgICAgdXVpZCA9IHNlbGVjdGVkVGFibGUudXVpZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHtpc0xpdmUsIGRpc2FibGVMaXZlLCBkYXRlUmFuZ2UgfSA9IHRoaXMuZ2V0RmlsdGVyRm9yVGFibGUodXVpZCk7XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBsb2dWaWV3czogZGF0YSxcbiAgICAgICAgICAgIHNlbGVjdGVkVGFibGUsXG4gICAgICAgICAgICBkaXNhYmxlTGl2ZSxcbiAgICAgICAgICAgIGlzTGl2ZSxcbiAgICAgICAgICAgIGRhdGVSYW5nZSxcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qge2xvZ1ZpZXdzLCBpc0xpdmV9ID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgICAgIGlmIChsb2dWaWV3cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkRGF0YSgpO1xuICAgICAgICAgICAgICAgIGlmIChpc0xpdmUpIHRoaXMuc3RhcnRTdHJlYW1pbmcoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RhcnRTdHJlYW1pbmcoKSB7XG4gICAgICAgIExpdmUuc3RhcnQodGhpcy5zdGF0ZS5pbnRlcnZhbCk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIEV2ZW50LmJ1cy5yZWdpc3RlcihFdmVudC5SRVNQT05TRV9FUlJPUiwgcmVzID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHtlcnJvcn0gPSByZXM7XG4gICAgICAgICAgICBpZiAoZXJyb3IgPT09IEV2ZW50LkVSUk9SX0lOVkFMSURfUVVFUlkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgaXNMaXZlOiBmYWxzZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIExpdmUucGF1c2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5zeW5jQWxsKClcbiAgICB9XG5cbiAgICBzeW5jQWxsKCkge1xuICAgICAgICBjb25zdCAkdGhpcyA9IHRoaXM7XG4gICAgICAgIERhdGFiYXNlQWN0aW9ucy5zeW5jQWxsKCkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICBjb25zdCB7ZXJyb3J9ID0gcmVzcG9uc2U7XG4gICAgICAgICAgICBpZiAoZXJyb3IgPT09IDApIHtcbiAgICAgICAgICAgICAgICAkdGhpcy5sb2FkTG9nVmlldygpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldEZpbHRlckZvclRhYmxlID0gKHV1aWQpID0+IHtcbiAgICAgICAgY29uc3QgY0RhdGEgPSBnZXREYXRhRnJvbUNvb2tpZXModXVpZCkgfHwgICd7fSc7XG4gICAgICAgIGxldCBuZXdEYXRlUmFuZ2UgPSB7fTtcbiAgICAgICAgbGV0IGRpc2FibGVMaXZlID0gJyc7XG4gICAgICAgIGxldCBpc0xpdmUgPSAnJztcbiAgICAgICAgbGV0IGRhdGVSYW5nZUxhYmVsID0gJyc7XG4gICAgICAgIGlmIChjRGF0YSAhPT0gJ3t9Jykge1xuICAgICAgICAgICAgY29uc3QgY0RhdGFPYmplY3QgPSBKU09OLnBhcnNlKGNEYXRhKTtcbiAgICAgICAgICAgIGRhdGVSYW5nZUxhYmVsID0gY0RhdGFPYmplY3QubGFiZWwgfHwgJyc7XG4gICAgICAgICAgICBpZiAoZGF0ZVJhbmdlTGFiZWwgIT09ICdDdXN0b20gUmFuZ2UnKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0ZVJhbmdlVmFsdWUgPSBEQVRFX1JBTkdFLmZpbmQoaXRlbSA9PiBpdGVtLmxhYmVsID09PSBkYXRlUmFuZ2VMYWJlbCk7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGVSYW5nZVZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld0RhdGVSYW5nZSA9IHsgLi4uZGF0ZVJhbmdlVmFsdWUgfTtcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZUxpdmUgPSAhTnVtYmVyLmlzSW50ZWdlcihuZXdEYXRlUmFuZ2UuZnJvbVZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgaXNMaXZlID0gY0RhdGFPYmplY3QuaXNMaXZlID09IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBuZXdEYXRlUmFuZ2UubGFiZWwgPSBjRGF0YU9iamVjdC5sYWJlbDtcbiAgICAgICAgICAgICAgICBuZXdEYXRlUmFuZ2UuZnJvbSA9IG1vbWVudC51bml4KGNEYXRhT2JqZWN0LmZyb20pO1xuICAgICAgICAgICAgICAgIG5ld0RhdGVSYW5nZS50byA9IG1vbWVudC51bml4KGNEYXRhT2JqZWN0LnRvKTtcbiAgICAgICAgICAgICAgICBkaXNhYmxlTGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgaXNMaXZlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXdEYXRlUmFuZ2UgPSB7XG4gICAgICAgICAgICAgICAgZnJvbTogREFURV9SQU5HRVswXS5mcm9tLFxuICAgICAgICAgICAgICAgIHRvOiBEQVRFX1JBTkdFWzBdLnRvLFxuICAgICAgICAgICAgICAgIGxhYmVsOiBEQVRFX1JBTkdFWzBdLmxhYmVsLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGRpc2FibGVMaXZlID0gZmFsc2U7XG4gICAgICAgICAgICBpc0xpdmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5zZXREYXRhQ29va2llcyh1dWlkLCB7bGFiZWw6IERBVEVfUkFOR0VbMF0ubGFiZWwsIGlzTGl2ZTogMX0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkYXRlUmFuZ2U6IHsgLi4ubmV3RGF0ZVJhbmdlIH0sXG4gICAgICAgICAgICBpc0xpdmUsXG4gICAgICAgICAgICBkaXNhYmxlTGl2ZSxcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldERhdGFDb29raWVzID0gKHV1aWQsIGNEYXRhKSA9PiB7XG4gICAgICAgIHNldERhdGFUb0Nvb2tpZXModXVpZCwgYCR7SlNPTi5zdHJpbmdpZnkoY0RhdGEpfWAsIDMwKTtcbiAgICB9XG5cbiAgICBzZXRTZWxlY3RlZFRhYmxlKHNlbGVjdGVkVGFibGUpIHtcbiAgICAgICAgY29uc3Qge2lzTGl2ZSwgZGlzYWJsZUxpdmUsIGRhdGVSYW5nZSB9ID0gdGhpcy5nZXRGaWx0ZXJGb3JUYWJsZShzZWxlY3RlZFRhYmxlLnV1aWQpO1xuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgc2VsZWN0ZWRUYWJsZSxcbiAgICAgICAgICAgIGlzTGl2ZSxcbiAgICAgICAgICAgIGRpc2FibGVMaXZlLFxuICAgICAgICAgICAgZGF0ZVJhbmdlXG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMubG9hZERhdGEoKTtcbiAgICAgICAgICAgIGlmICghaXNMaXZlKSBMaXZlLnBhdXNlKCk7XG4gICAgICAgICAgICBlbHNlIGlmIChpc0xpdmUpIHRoaXMuc3RhcnRTdHJlYW1pbmcoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaGFuZGxlUmVhbFRpbWVDbGlja2VkKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IHtpbnRlcnZhbCwgc2VsZWN0ZWRUYWJsZX0gPSB0aGlzLnN0YXRlO1xuICAgICAgICBjb25zdCB7Y2hlY2tlZH0gPSBldmVudC50YXJnZXQ7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgaXNMaXZlOiBjaGVja2VkXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoY2hlY2tlZCkge1xuICAgICAgICAgICAgTGl2ZS5zdGFydChpbnRlcnZhbCwgdHJ1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBMaXZlLnBhdXNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY0RhdGEgPSBKU09OLnBhcnNlKGdldERhdGFGcm9tQ29va2llcyhzZWxlY3RlZFRhYmxlLnV1aWQpIHx8ICAne30nKTtcbiAgICAgICAgY0RhdGEuaXNMaXZlID0gY2hlY2tlZCA/IDEgOiAwO1xuICAgICAgICB0aGlzLnNldERhdGFDb29raWVzKHNlbGVjdGVkVGFibGUudXVpZCwgY0RhdGEpO1xuICAgIH1cblxuICAgIG9uRGF0ZVJhbmdlQ2hhbmdlZChmcm9tLCB0bywgZGF0ZVJhbmdlLCBuZWVkVG9SZWZyZXNoID0gdHJ1ZSkge1xuICAgICAgICBjb25zdCB7c2VsZWN0ZWRUYWJsZSwgaW50ZXJ2YWwsIGlzTGl2ZX0gPSB0aGlzLnN0YXRlO1xuICAgICAgICBpZiAodG8pIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIC8vIGlzTGl2ZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgZGlzYWJsZUxpdmU6IHRydWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZGF0ZVJhbmdlLmlzTGl2ZSA9IDA7XG4gICAgICAgICAgICBMaXZlLnBhdXNlKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoIXRvKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICAvLyBpc0xpdmU6IHRydWUsXG4gICAgICAgICAgICAgICAgZGlzYWJsZUxpdmU6IGZhbHNlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChpc0xpdmUpIHtcbiAgICAgICAgICAgICAgICBMaXZlLnN0YXJ0KGludGVydmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRhdGVSYW5nZS5pc0xpdmUgPSBpc0xpdmUgPyAxIDogMDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0RGF0YUNvb2tpZXMoc2VsZWN0ZWRUYWJsZS51dWlkLCBkYXRlUmFuZ2UpO1xuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgZGF0ZVJhbmdlLFxuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICBpZihuZWVkVG9SZWZyZXNoKSB7XG4gICAgICAgICAgICAgICAgTGl2ZS5yZWZyZXNoKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25TdWJtaXRRdWVyeShxdWVyeSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHNob3dRdWVyeU1vZGFsOiB0cnVlLFxuICAgICAgICAgICAgcXVlcnlNb2RhbFF1ZXJ5OiBxdWVyeVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIG9uUXVlcnlTYXZlKCkge1xuICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcbiAgICAgICAgbGV0IHtxdWVyeU1vZGFsUXVlcnksIHNlbGVjdGVkVGFibGUsIHF1ZXJpZXN9ID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgaWYgKCQudHJpbShxdWVyeU1vZGFsUXVlcnkubmFtZSkgPT0gJycpIHtcbiAgICAgICAgICAgIEFsZXJ0LmVycm9yKCdRdWVyeSBuYW1lIHNob3VsZCBub3QgYmUgYmxhbmsnKTtcbiAgICAgICAgICAgIHF1ZXJ5TW9kYWxRdWVyeS5uYW1lQ2xhc3MgPSAnaXMtaW52YWxpZCc7XG4gICAgICAgICAgICB0aGF0LnNldFN0YXRlKHtxdWVyeU1vZGFsUXVlcnl9KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBxdWVyeU1vZGFsUXVlcnkubmFtZUNsYXNzID0gJyc7XG4gICAgICAgIGlmICgkLnRyaW0ocXVlcnlNb2RhbFF1ZXJ5Lm5hbWUpID09ICcnIHx8ICQudHJpbShxdWVyeU1vZGFsUXVlcnkucXVlcnkpID09ICcnKSB7XG4gICAgICAgICAgICBBbGVydC5lcnJvcignUXVlcnkgc2hvdWxkIG5vdCBiZSBibGFuaycpO1xuICAgICAgICAgICAgcXVlcnlNb2RhbFF1ZXJ5LnF1ZXJ5Q2xhc3MgPSAnaXMtaW52YWxpZCc7XG4gICAgICAgICAgICB0aGF0LnNldFN0YXRlKHtxdWVyeU1vZGFsUXVlcnl9KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBxdWVyeU1vZGFsUXVlcnkucXVlcnlDbGFzcyA9ICcnO1xuICAgICAgICB0aGF0LnNldFN0YXRlKHtxdWVyeU1vZGFsUXVlcnl9KTtcbiAgICAgICAgTG9nVGFibGVBY3Rpb25zLnNhdmVRdWVyaWVzKHNlbGVjdGVkVGFibGUudXVpZCwgcXVlcnlNb2RhbFF1ZXJ5LCBxdWVyeU1vZGFsUXVlcnkuaWQpXG4gICAgICAgICAgICAudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHtlcnJvciwgcXVlcnl9ID0gcmVzO1xuICAgICAgICAgICAgICAgIGlmIChlcnJvciA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocXVlcnlNb2RhbFF1ZXJ5LmlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBBbGVydC5zdWNjZXNzKCdVcGRhdGUgc3VjY2Vzc2Z1bCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkUXVlcmllcyA9IHF1ZXJpZXNbc2VsZWN0ZWRUYWJsZS51dWlkXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VsZWN0ZWRRdWVyaWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkUXVlcmllc1tpXS5pZCA9PT0gcXVlcnkuaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVlcmllc1tzZWxlY3RlZFRhYmxlLnV1aWRdW2ldID0gcXVlcnk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIEFsZXJ0LnN1Y2Nlc3MoJ0NyZWF0ZSBzdWNjZXNzZnVsJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBxdWVyaWVzW3NlbGVjdGVkVGFibGUudXVpZF0ucHVzaChxdWVyeSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBxdWVyeU1vZGFsUXVlcnk6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgc2hvd1F1ZXJ5TW9kYWw6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgcXVlcmllczogcXVlcmllc1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgfVxuXG4gICAgb25EZWxldGVRdWVyeShxdWVyeSkge1xuICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcbiAgICAgICAgbGV0IHtzZWxlY3RlZFRhYmxlLCBxdWVyaWVzfSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIExvZ1RhYmxlQWN0aW9ucy5kZWxldGVRdWVyaWVzKHF1ZXJ5LmlkKVxuICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB7ZXJyb3J9ID0gcmVzO1xuICAgICAgICAgICAgICAgIGlmIChlcnJvciA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBBbGVydC5zdWNjZXNzKCdEZWxldGUgc3VjY2Vzc2Z1bCcpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2VsZWN0ZWRRdWVyaWVzID0gcXVlcmllc1tzZWxlY3RlZFRhYmxlLnV1aWRdO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbGVjdGVkUXVlcmllcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkUXVlcmllc1tpXS5pZCA9PT0gcXVlcnkuaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWVyaWVzW3NlbGVjdGVkVGFibGUudXVpZF0uc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBxdWVyaWVzOiBxdWVyaWVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2hvd1F1ZXJ5TW9kYWw6IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICB9XG5cbiAgICBvblF1ZXJ5TW9kZWxDaGFuZ2UoZSkge1xuICAgICAgICBsZXQge3F1ZXJ5TW9kYWxRdWVyeX0gPSB0aGlzLnN0YXRlO1xuICAgICAgICBxdWVyeU1vZGFsUXVlcnlbZS50YXJnZXQubmFtZV0gPSBlLnRhcmdldC52YWx1ZTtcbiAgICAgICAgcXVlcnlNb2RhbFF1ZXJ5W2UudGFyZ2V0Lm5hbWUgKyAnQ2xhc3MnXSA9IGUudGFyZ2V0LnZhbHVlID09ICcnID8gJ2lzLWludmFsaWQnIDogJyc7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3F1ZXJ5TW9kYWxRdWVyeX0pO1xuICAgIH1cblxuICAgIGhpZGVRdWVyeU1vZGFsKCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHNob3dRdWVyeU1vZGFsOiBmYWxzZVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHNldERhdGUoZnJvbSwgdG8sIGRhdGVWYWx1ZSwgY2FsbGJhY2spe1xuICAgICAgICB0aGlzLmFkdmFuY2VTZWFyY2hSZWYuY3VycmVudC5zZXREYXRlKGZyb20sIHRvLCBkYXRlVmFsdWUsIGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIGlzTGl2ZSxcbiAgICAgICAgICAgIGRpc2FibGVMaXZlLFxuICAgICAgICAgICAgbG9nVmlld3MsXG4gICAgICAgICAgICBzZWxlY3RlZFRhYmxlLFxuICAgICAgICAgICAgZGF0ZVJhbmdlLFxuICAgICAgICAgICAgcXVlcmllcyxcbiAgICAgICAgICAgIHNob3dRdWVyeU1vZGFsLFxuICAgICAgICAgICAgcXVlcnlNb2RhbFF1ZXJ5XG4gICAgICAgIH0gPSB0aGlzLnN0YXRlO1xuXG4gICAgICAgIGNvbnN0IHV1aWQgPSBzZWxlY3RlZFRhYmxlID8gc2VsZWN0ZWRUYWJsZS51dWlkIDogbnVsbDtcblxuICAgICAgICBjb25zdCBzZWxlY3RlZFF1ZXJpZXMgPSBxdWVyaWVzW3V1aWRdIHx8IFtdO1xuXG4gICAgICAgIGNvbnN0IHtxdWVyeSwgbmFtZSwgbmFtZUNsYXNzID0gJycsIHF1ZXJ5Q2xhc3MgPSAnJ30gPSBxdWVyeU1vZGFsUXVlcnk7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGFzaGJvYXJkLXBhZ2UgbXMtY3AtNCBtZS1jcC0zIG10LTNcIj5cbiAgICAgICAgICAgICAgICA8Q29udGVudEhlYWRlclxuICAgICAgICAgICAgICAgICAgICBwYWdlVGl0bGU9XCJFeHBsb3JlclwiXG4gICAgICAgICAgICAgICAgICAgIGljb25OYW1lPVwic2VhcmNoXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIHtsb2dWaWV3cyAmJiBsb2dWaWV3cy5sZW5ndGggPiAwID8gKFxuICAgICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICAgICAgPEFkdmFuY2VkU2VhcmNoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtzZWxlY3RlZFRhYmxlLnV1aWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25EYXRlUmFuZ2VDaGFuZ2VkPXt0aGlzLm9uRGF0ZVJhbmdlQ2hhbmdlZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhPXtsb2dWaWV3c31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZD17c2VsZWN0ZWRUYWJsZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblNlbGVjdGVkPXt0aGlzLnNldFNlbGVjdGVkVGFibGV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZVJhbmdlPXtkYXRlUmFuZ2V9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVlcmllcz17c2VsZWN0ZWRRdWVyaWVzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uU2F2ZUNsaWNrZWQ9e3RoaXMub25TdWJtaXRRdWVyeX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkRlbGV0ZUNMaWNrZWQ9e3RoaXMub25EZWxldGVRdWVyeX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY9e3RoaXMuYWR2YW5jZVNlYXJjaFJlZn1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsb2F0LWNoYXJ0IHJvdyBqdXN0aWZ5LWNvbnRlbnQtc3RhcnQgZmxleC1tZC13cmFwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtMTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFVQbG90Q2hhcnQgaXNMaXZlPXtpc0xpdmV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dWlkPXt1dWlkfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlUmVhbFRpbWVDbGlja2VkPXt0aGlzLmhhbmRsZVJlYWxUaW1lQ2xpY2tlZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVMaXZlPXtkaXNhYmxlTGl2ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1iLTJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0RGF0ZT17dGhpcy5zZXREYXRlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsvKiA8ZGl2IGNsYXNzTmFtZT1cImNvbC0xMiBjYXJkLWNvbHVtbnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxTdW1tYXJ5IHV1aWQ9e3V1aWR9Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+ICovfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPExvZ1ZpZXdUYWJsZSBzZWxlY3RlZFRhYmxlPXtzZWxlY3RlZFRhYmxlfS8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxNb2RhbCB0aXRsZT17J1F1ZXJ5J31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZD17J3F1ZXJ5J31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaXplPXtTaXplLmxhcmdlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNhdmVCdXR0b25UaXRsZT17J1NhdmUnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dTYXZlQnV0dG9uPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3c9e3Nob3dRdWVyeU1vZGFsfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNhdmVCdXR0b25BY3Rpb249e3RoaXMub25RdWVyeVNhdmV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VCdXR0b25BY3Rpb249e3RoaXMuaGlkZVF1ZXJ5TW9kYWx9XG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3Nob3dRdWVyeU1vZGFsICYmIDxkaXYgY2xhc3NOYW1lPSdyb3cnPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sLTEyJz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxJbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU9J25hbWUnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9J1F1ZXJ5IG5hbWUnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlPXtuYW1lfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17bmFtZUNsYXNzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uUXVlcnlNb2RlbENoYW5nZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sLTEyIG10LTMnPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPElucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZT0ncXVlcnknXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlPXtxdWVyeX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3F1ZXJ5Q2xhc3N9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25RdWVyeU1vZGVsQ2hhbmdlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+fVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9Nb2RhbD5cbiAgICAgICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGlubmVyIHRleHQtY2VudGVyIHBvc2l0aW9uLWFic29sdXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwaW5uZXItYm9yZGVyIHRleHQtcHJpbWFyeVwiIHJvbGU9XCJzdGF0dXNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJzci1vbmx5XCI+TG9hZGluZy4uLjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5SZWFjdERPTS5yZW5kZXIoPEluZGV4Lz4sIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyb290JykpO1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xuXG52YXIgZmxvb3IgPSBNYXRoLmZsb29yO1xuXG4vLyBgTnVtYmVyLmlzSW50ZWdlcmAgbWV0aG9kIGltcGxlbWVudGF0aW9uXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1udW1iZXIuaXNpbnRlZ2VyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzSW50ZWdlcihpdCkge1xuICByZXR1cm4gIWlzT2JqZWN0KGl0KSAmJiBpc0Zpbml0ZShpdCkgJiYgZmxvb3IoaXQpID09PSBpdDtcbn07XG4iLCJ2YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBpc0ludGVnZXIgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtaW50ZWdlcicpO1xuXG4vLyBgTnVtYmVyLmlzSW50ZWdlcmAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1udW1iZXIuaXNpbnRlZ2VyXG4kKHsgdGFyZ2V0OiAnTnVtYmVyJywgc3RhdDogdHJ1ZSB9LCB7XG4gIGlzSW50ZWdlcjogaXNJbnRlZ2VyXG59KTtcbiJdLCJzb3VyY2VSb290IjoiIn0=