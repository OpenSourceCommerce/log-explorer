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
/******/ 	deferredModules.push(["./assets/js/pages/index/index.js","vendors~alerts_form~alerts_list~content-header~dashboard-page~dashboard_form~dashboard_list~database~ad6a277b","vendors~alerts_form~alerts_list~app~dashboard-page~dashboard_form~dashboard_list~database_form~datab~7df76b7b","vendors~alerts_form~alerts_list~dashboard-page~dashboard_form~dashboard_list~database_form~database_~a0c5edc0","alerts_form~alerts_list~dashboard-page~dashboard_form~dashboard_list~database_form~database_tables~e~96755b64"]);
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
/* WEBPACK VAR INJECTION */(function(moment, $) {/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.find.js */ "./node_modules/core-js/modules/es.array.find.js");
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_number_is_integer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.number.is-integer.js */ "./node_modules/core-js/modules/es.number.is-integer.js");
/* harmony import */ var core_js_modules_es_number_is_integer_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_is_integer_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.number.constructor.js */ "./node_modules/core-js/modules/es.number.constructor.js");
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.function.bind.js */ "./node_modules/core-js/modules/es.function.bind.js");
/* harmony import */ var core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.function.name.js */ "./node_modules/core-js/modules/es.function.name.js");
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_string_trim_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.string.trim.js */ "./node_modules/core-js/modules/es.string.trim.js");
/* harmony import */ var core_js_modules_es_string_trim_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_trim_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.array.splice.js */ "./node_modules/core-js/modules/es.array.splice.js");
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.object.define-property.js */ "./node_modules/core-js/modules/es.object.define-property.js");
/* harmony import */ var core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/es.object.set-prototype-of.js */ "./node_modules/core-js/modules/es.object.set-prototype-of.js");
/* harmony import */ var core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! core-js/modules/es.object.get-prototype-of.js */ "./node_modules/core-js/modules/es.object.get-prototype-of.js");
/* harmony import */ var core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! core-js/modules/es.reflect.construct.js */ "./node_modules/core-js/modules/es.reflect.construct.js");
/* harmony import */ var core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! core-js/modules/es.object.create.js */ "./node_modules/core-js/modules/es.object.create.js");
/* harmony import */ var core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! core-js/modules/es.promise.js */ "./node_modules/core-js/modules/es.promise.js");
/* harmony import */ var core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! core-js/modules/es.object.keys.js */ "./node_modules/core-js/modules/es.object.keys.js");
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! core-js/modules/es.array.filter.js */ "./node_modules/core-js/modules/es.array.filter.js");
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptor.js */ "./node_modules/core-js/modules/es.object.get-own-property-descriptor.js");
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor_js__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptor_js__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! core-js/modules/es.array.for-each.js */ "./node_modules/core-js/modules/es.array.for-each.js");
/* harmony import */ var core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptors.js */ "./node_modules/core-js/modules/es.object.get-own-property-descriptors.js");
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors_js__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptors_js__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var core_js_modules_es_object_define_properties_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! core-js/modules/es.object.define-properties.js */ "./node_modules/core-js/modules/es.object.define-properties.js");
/* harmony import */ var core_js_modules_es_object_define_properties_js__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_define_properties_js__WEBPACK_IMPORTED_MODULE_23__);
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! core-js/modules/es.symbol.description.js */ "./node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_24___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_24__);
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ "./node_modules/core-js/modules/es.symbol.iterator.js");
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_25___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_25__);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_26___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_26__);
/* harmony import */ var regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! regenerator-runtime/runtime.js */ "./node_modules/regenerator-runtime/runtime.js");
/* harmony import */ var regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_27___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_27__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_28___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_28__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_29___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_29__);
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ../../components */ "./assets/js/components/index.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ../../actions */ "./assets/js/actions/index.js");
/* harmony import */ var _styles_pages_index_scss__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ../../../styles/pages/index.scss */ "./assets/styles/pages/index.scss");
/* harmony import */ var _styles_pages_index_scss__WEBPACK_IMPORTED_MODULE_32___default = /*#__PURE__*/__webpack_require__.n(_styles_pages_index_scss__WEBPACK_IMPORTED_MODULE_32__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ../../utils */ "./assets/js/utils.js");
/* harmony import */ var _components_modal__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ../../components/_modal */ "./assets/js/components/_modal.js");
/* harmony import */ var _components_input__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ../../components/_input */ "./assets/js/components/_input.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }






























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
              return _actions__WEBPACK_IMPORTED_MODULE_31__["LogViewActions"].getAll();

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
      var cData = Object(_utils__WEBPACK_IMPORTED_MODULE_33__["getDataFromCookies"])(uuid) || '{}';
      var newDateRange = {};
      var disableLive = '';
      var isLive = '';
      var dateRangeLabel = '';

      if (cData !== '{}') {
        var cDataObject = JSON.parse(cData);
        dateRangeLabel = cDataObject.label || '';

        if (dateRangeLabel !== 'Custom Range') {
          var dateRangeValue = _utils__WEBPACK_IMPORTED_MODULE_33__["DATE_RANGE"].find(function (item) {
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
          from: _utils__WEBPACK_IMPORTED_MODULE_33__["DATE_RANGE"][0].from,
          to: _utils__WEBPACK_IMPORTED_MODULE_33__["DATE_RANGE"][0].to,
          label: _utils__WEBPACK_IMPORTED_MODULE_33__["DATE_RANGE"][0].label
        };
        disableLive = false;
        isLive = true;

        _this.setDataCookies(uuid, {
          label: _utils__WEBPACK_IMPORTED_MODULE_33__["DATE_RANGE"][0].label,
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
      Object(_utils__WEBPACK_IMPORTED_MODULE_33__["setDataToCookies"])(uuid, "".concat(JSON.stringify(cData)), 30);
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
        from: _utils__WEBPACK_IMPORTED_MODULE_33__["DATE_RANGE"][0].from,
        to: _utils__WEBPACK_IMPORTED_MODULE_33__["DATE_RANGE"][0].to,
        label: _utils__WEBPACK_IMPORTED_MODULE_33__["DATE_RANGE"][0].label
      },
      queries: [],
      showQueryModal: false,
      queryModalQuery: {}
    };
    _this.advanceSearchRef = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_28___default.a.createRef();
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
        _actions__WEBPACK_IMPORTED_MODULE_31__["LogTableActions"].getQueries(selectedTable.uuid).then(function (res) {
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

      _actions__WEBPACK_IMPORTED_MODULE_31__["Live"].refresh();
      window.history.pushState('logview', selectedTable.name, '/log-view/' + selectedTable.uuid);
    }
  }, {
    key: "startStreaming",
    value: function startStreaming() {
      _actions__WEBPACK_IMPORTED_MODULE_31__["Live"].start(this.state.interval);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      _actions__WEBPACK_IMPORTED_MODULE_31__["Event"].bus.register(_actions__WEBPACK_IMPORTED_MODULE_31__["Event"].RESPONSE_ERROR, function (res) {
        var error = res.error;

        if (error === _actions__WEBPACK_IMPORTED_MODULE_31__["Event"].ERROR_INVALID_QUERY) {
          _this2.setState({
            isLive: false
          });

          _actions__WEBPACK_IMPORTED_MODULE_31__["Live"].pause();
        }
      });
      this.syncAll();
    }
  }, {
    key: "syncAll",
    value: function syncAll() {
      var $this = this;
      _actions__WEBPACK_IMPORTED_MODULE_31__["DatabaseActions"].syncAll().then(function (response) {
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

        if (!isLive) _actions__WEBPACK_IMPORTED_MODULE_31__["Live"].pause();else if (isLive) _this3.startStreaming();
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
        _actions__WEBPACK_IMPORTED_MODULE_31__["Live"].start(interval, true);
      } else {
        _actions__WEBPACK_IMPORTED_MODULE_31__["Live"].pause();
      }

      var cData = JSON.parse(Object(_utils__WEBPACK_IMPORTED_MODULE_33__["getDataFromCookies"])(selectedTable.uuid) || '{}');
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
        _actions__WEBPACK_IMPORTED_MODULE_31__["Live"].pause();
      } else if (!to) {
        this.setState({
          // isLive: true,
          disableLive: false
        });

        if (isLive) {
          _actions__WEBPACK_IMPORTED_MODULE_31__["Live"].start(interval);
        }

        dateRange.isLive = isLive ? 1 : 0;
      }

      this.setDataCookies(selectedTable.uuid, dateRange);
      this.setState({
        dateRange: dateRange
      }, function () {
        if (needToRefresh) {
          _actions__WEBPACK_IMPORTED_MODULE_31__["Live"].refresh();
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
        _actions__WEBPACK_IMPORTED_MODULE_31__["Alert"].error('Query name should not be blank');
        queryModalQuery.nameClass = 'is-invalid';
        that.setState({
          queryModalQuery: queryModalQuery
        });
        return;
      }

      queryModalQuery.nameClass = '';

      if ($.trim(queryModalQuery.name) == '' || $.trim(queryModalQuery.query) == '') {
        _actions__WEBPACK_IMPORTED_MODULE_31__["Alert"].error('Query should not be blank');
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
      _actions__WEBPACK_IMPORTED_MODULE_31__["LogTableActions"].saveQueries(selectedTable.uuid, queryModalQuery, queryModalQuery.id).then(function (res) {
        var error = res.error,
            query = res.query;

        if (error === 0) {
          if (queryModalQuery.id) {
            _actions__WEBPACK_IMPORTED_MODULE_31__["Alert"].success('Update successful');
            var selectedQueries = queries[selectedTable.uuid];

            for (var i = 0; i < selectedQueries.length; i++) {
              if (selectedQueries[i].id === query.id) {
                queries[selectedTable.uuid][i] = query;
                break;
              }
            }
          } else {
            _actions__WEBPACK_IMPORTED_MODULE_31__["Alert"].success('Create successful');
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
      _actions__WEBPACK_IMPORTED_MODULE_31__["LogTableActions"].deleteQueries(query.id).then(function (res) {
        var error = res.error;

        if (error === 0) {
          _actions__WEBPACK_IMPORTED_MODULE_31__["Alert"].success('Delete successful');
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
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_28___default.a.createElement("div", {
        className: "dashboard-page container-fluid"
      }, logViews && logViews.length > 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_28___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_28___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_28___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_30__["AdvancedSearch"], {
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
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_28___default.a.createElement("div", {
        className: "float-chart row justify-content-start flex-md-wrap"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_28___default.a.createElement("div", {
        className: "col-12"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_28___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_30__["UPlotChart"], {
        isLive: isLive,
        uuid: uuid,
        handleRealTimeClicked: this.handleRealTimeClicked,
        disableLive: disableLive,
        className: "mb-2",
        setDate: this.setDate
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_28___default.a.createElement("div", {
        className: "col-12 card-columns"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_28___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_30__["Summary"], {
        uuid: uuid
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_28___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_30__["LogViewTable"], {
        selectedTable: selectedTable
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_28___default.a.createElement(_components_modal__WEBPACK_IMPORTED_MODULE_34__["Modal"], {
        title: 'Query',
        id: 'query',
        size: _components__WEBPACK_IMPORTED_MODULE_30__["Size"].large,
        saveButtonTitle: 'Save',
        showSaveButton: true,
        show: showQueryModal,
        saveButtonAction: this.onQuerySave,
        closeButtonAction: this.hideQueryModal
      }, showQueryModal && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_28___default.a.createElement("div", {
        className: "row"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_28___default.a.createElement("div", {
        className: "col-12"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_28___default.a.createElement(_components_input__WEBPACK_IMPORTED_MODULE_35__["Input"], {
        name: "name",
        placeholder: "Query name",
        defaultValue: name,
        className: nameClass,
        onChange: this.onQueryModelChange
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_28___default.a.createElement("div", {
        className: "col-12 mt-3"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_28___default.a.createElement(_components_input__WEBPACK_IMPORTED_MODULE_35__["Input"], {
        name: "query",
        defaultValue: query,
        className: queryClass,
        onChange: this.onQueryModelChange
      }))))) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_28___default.a.createElement("div", {
        className: "spinner text-center position-absolute"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_28___default.a.createElement("div", {
        className: "spinner-border text-primary",
        role: "status"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_28___default.a.createElement("span", {
        className: "sr-only"
      }, "Loading..."))));
    }
  }]);

  return Index;
}(react__WEBPACK_IMPORTED_MODULE_28__["Component"]);

react_dom__WEBPACK_IMPORTED_MODULE_29___default.a.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_28___default.a.createElement(Index, null), document.querySelector('#root'));
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

/***/ "./node_modules/core-js/internals/is-integral-number.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/internals/is-integral-number.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");

var floor = Math.floor;

// `IsIntegralNumber` abstract operation
// https://tc39.es/ecma262/#sec-isintegralnumber
// eslint-disable-next-line es-x/no-number-isinteger -- safe
module.exports = Number.isInteger || function isInteger(it) {
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
var isIntegralNumber = __webpack_require__(/*! ../internals/is-integral-number */ "./node_modules/core-js/internals/is-integral-number.js");

// `Number.isInteger` method
// https://tc39.es/ecma262/#sec-number.isinteger
$({ target: 'Number', stat: true }, {
  isInteger: isIntegralNumber
});


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3BhZ2VzL2luZGV4L2luZGV4LmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9zdHlsZXMvcGFnZXMvaW5kZXguc2NzcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaXMtaW50ZWdyYWwtbnVtYmVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMubnVtYmVyLmlzLWludGVnZXIuanMiXSwibmFtZXMiOlsiSW5kZXgiLCJwcm9wcyIsIkxvZ1ZpZXdBY3Rpb25zIiwiZ2V0QWxsIiwicmVzcG9uc2UiLCJkYXRhIiwiZXJyb3IiLCJsZW5ndGgiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJzZWxlY3RlZFRhYmxlIiwidXVpZCIsImkiLCJ0YWJsZSIsImdldEZpbHRlckZvclRhYmxlIiwiaXNMaXZlIiwiZGlzYWJsZUxpdmUiLCJkYXRlUmFuZ2UiLCJzZXRTdGF0ZSIsImxvZ1ZpZXdzIiwic3RhdGUiLCJsb2FkRGF0YSIsInN0YXJ0U3RyZWFtaW5nIiwiY0RhdGEiLCJnZXREYXRhRnJvbUNvb2tpZXMiLCJuZXdEYXRlUmFuZ2UiLCJkYXRlUmFuZ2VMYWJlbCIsImNEYXRhT2JqZWN0IiwiSlNPTiIsInBhcnNlIiwibGFiZWwiLCJkYXRlUmFuZ2VWYWx1ZSIsIkRBVEVfUkFOR0UiLCJmaW5kIiwiaXRlbSIsIk51bWJlciIsImlzSW50ZWdlciIsImZyb21WYWx1ZSIsImZyb20iLCJtb21lbnQiLCJ1bml4IiwidG8iLCJzZXREYXRhQ29va2llcyIsInNldERhdGFUb0Nvb2tpZXMiLCJzdHJpbmdpZnkiLCJpbnRlcnZhbCIsInNob3dUYWJsZVNldHRpbmdNb2RhbCIsInRhYmxlQ29sdW1uTGlzdCIsInF1ZXJpZXMiLCJzaG93UXVlcnlNb2RhbCIsInF1ZXJ5TW9kYWxRdWVyeSIsImFkdmFuY2VTZWFyY2hSZWYiLCJSZWFjdCIsImNyZWF0ZVJlZiIsImhhbmRsZVJlYWxUaW1lQ2xpY2tlZCIsImJpbmQiLCJvbkRhdGVSYW5nZUNoYW5nZWQiLCJzZXRTZWxlY3RlZFRhYmxlIiwic3luY0FsbCIsIm9uU3VibWl0UXVlcnkiLCJvblF1ZXJ5U2F2ZSIsIm9uUXVlcnlNb2RlbENoYW5nZSIsIm9uRGVsZXRlUXVlcnkiLCJoaWRlUXVlcnlNb2RhbCIsInNldERhdGUiLCJ0aGF0IiwidW5kZWZpbmVkIiwiTG9nVGFibGVBY3Rpb25zIiwiZ2V0UXVlcmllcyIsInRoZW4iLCJyZXMiLCJMaXZlIiwicmVmcmVzaCIsImhpc3RvcnkiLCJwdXNoU3RhdGUiLCJuYW1lIiwic3RhcnQiLCJFdmVudCIsImJ1cyIsInJlZ2lzdGVyIiwiUkVTUE9OU0VfRVJST1IiLCJFUlJPUl9JTlZBTElEX1FVRVJZIiwicGF1c2UiLCIkdGhpcyIsIkRhdGFiYXNlQWN0aW9ucyIsImxvYWRMb2dWaWV3IiwiZXZlbnQiLCJjaGVja2VkIiwidGFyZ2V0IiwibmVlZFRvUmVmcmVzaCIsInF1ZXJ5IiwiJCIsInRyaW0iLCJBbGVydCIsIm5hbWVDbGFzcyIsInF1ZXJ5Q2xhc3MiLCJzYXZlUXVlcmllcyIsImlkIiwic3VjY2VzcyIsInNlbGVjdGVkUXVlcmllcyIsInB1c2giLCJkZWxldGVRdWVyaWVzIiwic3BsaWNlIiwiZSIsInZhbHVlIiwiZGF0ZVZhbHVlIiwiY2FsbGJhY2siLCJjdXJyZW50IiwiU2l6ZSIsImxhcmdlIiwiQ29tcG9uZW50IiwiUmVhY3RET00iLCJyZW5kZXIiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLFFBQVEsb0JBQW9CO1FBQzVCO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNB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QUFBSyxpQkFBUyxFQUFDO0FBQWYsc0JBQ0k7QUFBSyxpQkFBUyxFQUFDLDZCQUFmO0FBQTZDLFlBQUksRUFBQztBQUFsRCxzQkFDSTtBQUFNLGlCQUFTLEVBQUM7QUFBaEIsc0JBREosQ0FESixDQTlEUixDQURKO0FBdUVIOzs7O0VBcmFlaUQsZ0Q7O0FBd2FwQkMsaURBQVEsQ0FBQ0MsTUFBVCxlQUFnQiw0REFBQyxLQUFELE9BQWhCLEVBQTBCQyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBMUIsRTs7Ozs7Ozs7Ozs7O0FDeGJBLHVDOzs7Ozs7Ozs7OztBQ0FBLGVBQWUsbUJBQU8sQ0FBQyw2RUFBd0I7O0FBRS9DOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDVEEsUUFBUSxtQkFBTyxDQUFDLHVFQUFxQjtBQUNyQyx1QkFBdUIsbUJBQU8sQ0FBQywrRkFBaUM7O0FBRWhFO0FBQ0E7QUFDQSxHQUFHLCtCQUErQjtBQUNsQztBQUNBLENBQUMiLCJmaWxlIjoicGFnZV9pbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0ZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soZGF0YSkge1xuIFx0XHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuIFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuIFx0XHR2YXIgZXhlY3V0ZU1vZHVsZXMgPSBkYXRhWzJdO1xuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHRcdC8vIGFkZCBlbnRyeSBtb2R1bGVzIGZyb20gbG9hZGVkIGNodW5rIHRvIGRlZmVycmVkIGxpc3RcbiBcdFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2guYXBwbHkoZGVmZXJyZWRNb2R1bGVzLCBleGVjdXRlTW9kdWxlcyB8fCBbXSk7XG5cbiBcdFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiBhbGwgY2h1bmtzIHJlYWR5XG4gXHRcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIFx0fTtcbiBcdGZ1bmN0aW9uIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCkge1xuIFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGRlZmVycmVkTW9kdWxlID0gZGVmZXJyZWRNb2R1bGVzW2ldO1xuIFx0XHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuIFx0XHRcdGZvcih2YXIgaiA9IDE7IGogPCBkZWZlcnJlZE1vZHVsZS5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGRlcElkID0gZGVmZXJyZWRNb2R1bGVbal07XG4gXHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbZGVwSWRdICE9PSAwKSBmdWxmaWxsZWQgPSBmYWxzZTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYoZnVsZmlsbGVkKSB7XG4gXHRcdFx0XHRkZWZlcnJlZE1vZHVsZXMuc3BsaWNlKGktLSwgMSk7XG4gXHRcdFx0XHRyZXN1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IGRlZmVycmVkTW9kdWxlWzBdKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHRyZXR1cm4gcmVzdWx0O1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIENTUyBjaHVua3NcbiBcdHZhciBpbnN0YWxsZWRDc3NDaHVua3MgPSB7XG4gXHRcdFwicGFnZV9pbmRleFwiOiAwXG4gXHR9XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHQvLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbiBcdC8vIFByb21pc2UgPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHRcInBhZ2VfaW5kZXhcIjogMFxuIFx0fTtcblxuIFx0dmFyIGRlZmVycmVkTW9kdWxlcyA9IFtdO1xuXG4gXHQvLyBzY3JpcHQgcGF0aCBmdW5jdGlvblxuIFx0ZnVuY3Rpb24ganNvbnBTY3JpcHRTcmMoY2h1bmtJZCkge1xuIFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArICh7fVtjaHVua0lkXXx8Y2h1bmtJZCkgKyBcIi5qc1wiXG4gXHR9XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuIFx0Ly8gVGhpcyBmaWxlIGNvbnRhaW5zIG9ubHkgdGhlIGVudHJ5IGNodW5rLlxuIFx0Ly8gVGhlIGNodW5rIGxvYWRpbmcgZnVuY3Rpb24gZm9yIGFkZGl0aW9uYWwgY2h1bmtzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmUgPSBmdW5jdGlvbiByZXF1aXJlRW5zdXJlKGNodW5rSWQpIHtcbiBcdFx0dmFyIHByb21pc2VzID0gW107XG5cblxuIFx0XHQvLyBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiBDU1MgbG9hZGluZ1xuIFx0XHR2YXIgY3NzQ2h1bmtzID0ge1wiMFwiOjF9O1xuIFx0XHRpZihpbnN0YWxsZWRDc3NDaHVua3NbY2h1bmtJZF0pIHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ3NzQ2h1bmtzW2NodW5rSWRdKTtcbiBcdFx0ZWxzZSBpZihpbnN0YWxsZWRDc3NDaHVua3NbY2h1bmtJZF0gIT09IDAgJiYgY3NzQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDc3NDaHVua3NbY2h1bmtJZF0gPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRcdHZhciBocmVmID0gXCJcIiArICh7fVtjaHVua0lkXXx8Y2h1bmtJZCkgKyBcIi5jc3NcIjtcbiBcdFx0XHRcdHZhciBmdWxsaHJlZiA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIGhyZWY7XG4gXHRcdFx0XHR2YXIgZXhpc3RpbmdMaW5rVGFncyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwibGlua1wiKTtcbiBcdFx0XHRcdGZvcih2YXIgaSA9IDA7IGkgPCBleGlzdGluZ0xpbmtUYWdzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdHZhciB0YWcgPSBleGlzdGluZ0xpbmtUYWdzW2ldO1xuIFx0XHRcdFx0XHR2YXIgZGF0YUhyZWYgPSB0YWcuZ2V0QXR0cmlidXRlKFwiZGF0YS1ocmVmXCIpIHx8IHRhZy5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpO1xuIFx0XHRcdFx0XHRpZih0YWcucmVsID09PSBcInN0eWxlc2hlZXRcIiAmJiAoZGF0YUhyZWYgPT09IGhyZWYgfHwgZGF0YUhyZWYgPT09IGZ1bGxocmVmKSkgcmV0dXJuIHJlc29sdmUoKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdHZhciBleGlzdGluZ1N0eWxlVGFncyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic3R5bGVcIik7XG4gXHRcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZXhpc3RpbmdTdHlsZVRhZ3MubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0dmFyIHRhZyA9IGV4aXN0aW5nU3R5bGVUYWdzW2ldO1xuIFx0XHRcdFx0XHR2YXIgZGF0YUhyZWYgPSB0YWcuZ2V0QXR0cmlidXRlKFwiZGF0YS1ocmVmXCIpO1xuIFx0XHRcdFx0XHRpZihkYXRhSHJlZiA9PT0gaHJlZiB8fCBkYXRhSHJlZiA9PT0gZnVsbGhyZWYpIHJldHVybiByZXNvbHZlKCk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHR2YXIgbGlua1RhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xuIFx0XHRcdFx0bGlua1RhZy5yZWwgPSBcInN0eWxlc2hlZXRcIjtcbiBcdFx0XHRcdGxpbmtUYWcudHlwZSA9IFwidGV4dC9jc3NcIjtcbiBcdFx0XHRcdGxpbmtUYWcub25sb2FkID0gcmVzb2x2ZTtcbiBcdFx0XHRcdGxpbmtUYWcub25lcnJvciA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gXHRcdFx0XHRcdHZhciByZXF1ZXN0ID0gZXZlbnQgJiYgZXZlbnQudGFyZ2V0ICYmIGV2ZW50LnRhcmdldC5zcmMgfHwgZnVsbGhyZWY7XG4gXHRcdFx0XHRcdHZhciBlcnIgPSBuZXcgRXJyb3IoXCJMb2FkaW5nIENTUyBjaHVuayBcIiArIGNodW5rSWQgKyBcIiBmYWlsZWQuXFxuKFwiICsgcmVxdWVzdCArIFwiKVwiKTtcbiBcdFx0XHRcdFx0ZXJyLnJlcXVlc3QgPSByZXF1ZXN0O1xuIFx0XHRcdFx0XHRyZWplY3QoZXJyKTtcbiBcdFx0XHRcdH07XG4gXHRcdFx0XHRsaW5rVGFnLmhyZWYgPSBmdWxsaHJlZjtcbiBcdFx0XHRcdHZhciBoZWFkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdO1xuIFx0XHRcdFx0aGVhZC5hcHBlbmRDaGlsZChsaW5rVGFnKTtcbiBcdFx0XHR9KS50aGVuKGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0aW5zdGFsbGVkQ3NzQ2h1bmtzW2NodW5rSWRdID0gMDtcbiBcdFx0XHR9KSk7XG4gXHRcdH1cblxuIFx0XHQvLyBKU09OUCBjaHVuayBsb2FkaW5nIGZvciBqYXZhc2NyaXB0XG5cbiBcdFx0dmFyIGluc3RhbGxlZENodW5rRGF0YSA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhICE9PSAwKSB7IC8vIDAgbWVhbnMgXCJhbHJlYWR5IGluc3RhbGxlZFwiLlxuXG4gXHRcdFx0Ly8gYSBQcm9taXNlIG1lYW5zIFwiY3VycmVudGx5IGxvYWRpbmdcIi5cbiBcdFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEpIHtcbiBcdFx0XHRcdHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ2h1bmtEYXRhWzJdKTtcbiBcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0Ly8gc2V0dXAgUHJvbWlzZSBpbiBjaHVuayBjYWNoZVxuIFx0XHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRcdFx0aW5zdGFsbGVkQ2h1bmtEYXRhID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gW3Jlc29sdmUsIHJlamVjdF07XG4gXHRcdFx0XHR9KTtcbiBcdFx0XHRcdHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ2h1bmtEYXRhWzJdID0gcHJvbWlzZSk7XG5cbiBcdFx0XHRcdC8vIHN0YXJ0IGNodW5rIGxvYWRpbmdcbiBcdFx0XHRcdHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiBcdFx0XHRcdHZhciBvblNjcmlwdENvbXBsZXRlO1xuXG4gXHRcdFx0XHRzY3JpcHQuY2hhcnNldCA9ICd1dGYtOCc7XG4gXHRcdFx0XHRzY3JpcHQudGltZW91dCA9IDEyMDtcbiBcdFx0XHRcdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKSB7XG4gXHRcdFx0XHRcdHNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdHNjcmlwdC5zcmMgPSBqc29ucFNjcmlwdFNyYyhjaHVua0lkKTtcblxuIFx0XHRcdFx0Ly8gY3JlYXRlIGVycm9yIGJlZm9yZSBzdGFjayB1bndvdW5kIHRvIGdldCB1c2VmdWwgc3RhY2t0cmFjZSBsYXRlclxuIFx0XHRcdFx0dmFyIGVycm9yID0gbmV3IEVycm9yKCk7XG4gXHRcdFx0XHRvblNjcmlwdENvbXBsZXRlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gXHRcdFx0XHRcdC8vIGF2b2lkIG1lbSBsZWFrcyBpbiBJRS5cbiBcdFx0XHRcdFx0c2NyaXB0Lm9uZXJyb3IgPSBzY3JpcHQub25sb2FkID0gbnVsbDtcbiBcdFx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuIFx0XHRcdFx0XHR2YXIgY2h1bmsgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHRcdFx0XHRcdGlmKGNodW5rICE9PSAwKSB7XG4gXHRcdFx0XHRcdFx0aWYoY2h1bmspIHtcbiBcdFx0XHRcdFx0XHRcdHZhciBlcnJvclR5cGUgPSBldmVudCAmJiAoZXZlbnQudHlwZSA9PT0gJ2xvYWQnID8gJ21pc3NpbmcnIDogZXZlbnQudHlwZSk7XG4gXHRcdFx0XHRcdFx0XHR2YXIgcmVhbFNyYyA9IGV2ZW50ICYmIGV2ZW50LnRhcmdldCAmJiBldmVudC50YXJnZXQuc3JjO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IubWVzc2FnZSA9ICdMb2FkaW5nIGNodW5rICcgKyBjaHVua0lkICsgJyBmYWlsZWQuXFxuKCcgKyBlcnJvclR5cGUgKyAnOiAnICsgcmVhbFNyYyArICcpJztcbiBcdFx0XHRcdFx0XHRcdGVycm9yLm5hbWUgPSAnQ2h1bmtMb2FkRXJyb3InO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IudHlwZSA9IGVycm9yVHlwZTtcbiBcdFx0XHRcdFx0XHRcdGVycm9yLnJlcXVlc3QgPSByZWFsU3JjO1xuIFx0XHRcdFx0XHRcdFx0Y2h1bmtbMV0oZXJyb3IpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSB1bmRlZmluZWQ7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH07XG4gXHRcdFx0XHR2YXIgdGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiBcdFx0XHRcdFx0b25TY3JpcHRDb21wbGV0ZSh7IHR5cGU6ICd0aW1lb3V0JywgdGFyZ2V0OiBzY3JpcHQgfSk7XG4gXHRcdFx0XHR9LCAxMjAwMDApO1xuIFx0XHRcdFx0c2NyaXB0Lm9uZXJyb3IgPSBzY3JpcHQub25sb2FkID0gb25TY3JpcHRDb21wbGV0ZTtcbiBcdFx0XHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0cmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbiBcdH07XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvYXNzZXRzL1wiO1xuXG4gXHQvLyBvbiBlcnJvciBmdW5jdGlvbiBmb3IgYXN5bmMgbG9hZGluZ1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vZSA9IGZ1bmN0aW9uKGVycikgeyBjb25zb2xlLmVycm9yKGVycik7IHRocm93IGVycjsgfTtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIGFkZCBlbnRyeSBtb2R1bGUgdG8gZGVmZXJyZWQgbGlzdFxuIFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2goW1wiLi9hc3NldHMvanMvcGFnZXMvaW5kZXgvaW5kZXguanNcIixcInZlbmRvcnN+YWxlcnRzX2Zvcm1+YWxlcnRzX2xpc3R+Y29udGVudC1oZWFkZXJ+ZGFzaGJvYXJkLXBhZ2V+ZGFzaGJvYXJkX2Zvcm1+ZGFzaGJvYXJkX2xpc3R+ZGF0YWJhc2V+YWQ2YTI3N2JcIixcInZlbmRvcnN+YWxlcnRzX2Zvcm1+YWxlcnRzX2xpc3R+YXBwfmRhc2hib2FyZC1wYWdlfmRhc2hib2FyZF9mb3JtfmRhc2hib2FyZF9saXN0fmRhdGFiYXNlX2Zvcm1+ZGF0YWJ+N2RmNzZiN2JcIixcInZlbmRvcnN+YWxlcnRzX2Zvcm1+YWxlcnRzX2xpc3R+ZGFzaGJvYXJkLXBhZ2V+ZGFzaGJvYXJkX2Zvcm1+ZGFzaGJvYXJkX2xpc3R+ZGF0YWJhc2VfZm9ybX5kYXRhYmFzZV9+YTBjNWVkYzBcIixcImFsZXJ0c19mb3JtfmFsZXJ0c19saXN0fmRhc2hib2FyZC1wYWdlfmRhc2hib2FyZF9mb3JtfmRhc2hib2FyZF9saXN0fmRhdGFiYXNlX2Zvcm1+ZGF0YWJhc2VfdGFibGVzfmV+OTY3NTViNjRcIl0pO1xuIFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiByZWFkeVxuIFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4iLCJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IHtcbiAgICBBZHZhbmNlZFNlYXJjaCxcbiAgICBTdW1tYXJ5LFxuICAgIEZsb3RDaGFydCxcbiAgICBMb2dWaWV3VGFibGUsXG4gICAgU2l6ZSxcbiAgICBVUGxvdENoYXJ0XG59IGZyb20gJy4uLy4uL2NvbXBvbmVudHMnO1xuaW1wb3J0IHtMaXZlLCBMb2dUYWJsZUFjdGlvbnMsIEV2ZW50LCBMb2dWaWV3QWN0aW9ucywgRGF0YWJhc2VBY3Rpb25zLCBBbGVydH0gZnJvbSAnLi4vLi4vYWN0aW9ucyc7XG5pbXBvcnQgJy4uLy4uLy4uL3N0eWxlcy9wYWdlcy9pbmRleC5zY3NzJztcbmltcG9ydCB7REFURV9SQU5HRSwgZ2V0RGF0YUZyb21Db29raWVzLCBzZXREYXRhVG9Db29raWVzfSBmcm9tIFwiLi4vLi4vdXRpbHNcIjtcbmltcG9ydCB7TW9kYWx9IGZyb20gXCIuLi8uLi9jb21wb25lbnRzL19tb2RhbFwiO1xuaW1wb3J0IHtJbnB1dH0gZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvX2lucHV0XCI7XG5cbmNsYXNzIEluZGV4IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBsb2dWaWV3czogW10sXG4gICAgICAgICAgICBpc0xpdmU6IHRydWUsXG4gICAgICAgICAgICBkaXNhYmxlTGl2ZTogZmFsc2UsXG4gICAgICAgICAgICBpbnRlcnZhbDogNTAwMCxcbiAgICAgICAgICAgIHNob3dUYWJsZVNldHRpbmdNb2RhbDogZmFsc2UsXG4gICAgICAgICAgICBzZWxlY3RlZFRhYmxlOiBudWxsLFxuICAgICAgICAgICAgdGFibGVDb2x1bW5MaXN0OiBbXSxcbiAgICAgICAgICAgIGRhdGVSYW5nZToge1xuICAgICAgICAgICAgICAgIGZyb206IERBVEVfUkFOR0VbMF0uZnJvbSxcbiAgICAgICAgICAgICAgICB0bzogREFURV9SQU5HRVswXS50byxcbiAgICAgICAgICAgICAgICBsYWJlbDogREFURV9SQU5HRVswXS5sYWJlbCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBxdWVyaWVzOiBbXSxcbiAgICAgICAgICAgIHNob3dRdWVyeU1vZGFsOiBmYWxzZSxcbiAgICAgICAgICAgIHF1ZXJ5TW9kYWxRdWVyeToge30sXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5hZHZhbmNlU2VhcmNoUmVmID0gUmVhY3QuY3JlYXRlUmVmKCk7XG5cbiAgICAgICAgdGhpcy5oYW5kbGVSZWFsVGltZUNsaWNrZWQgPSB0aGlzLmhhbmRsZVJlYWxUaW1lQ2xpY2tlZC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLm9uRGF0ZVJhbmdlQ2hhbmdlZCA9IHRoaXMub25EYXRlUmFuZ2VDaGFuZ2VkLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuc2V0U2VsZWN0ZWRUYWJsZSA9IHRoaXMuc2V0U2VsZWN0ZWRUYWJsZS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLnN5bmNBbGwgPSB0aGlzLnN5bmNBbGwuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5vblN1Ym1pdFF1ZXJ5ID0gdGhpcy5vblN1Ym1pdFF1ZXJ5LmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub25RdWVyeVNhdmUgPSB0aGlzLm9uUXVlcnlTYXZlLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub25RdWVyeU1vZGVsQ2hhbmdlID0gdGhpcy5vblF1ZXJ5TW9kZWxDaGFuZ2UuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5vbkRlbGV0ZVF1ZXJ5ID0gdGhpcy5vbkRlbGV0ZVF1ZXJ5LmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuaGlkZVF1ZXJ5TW9kYWwgPSB0aGlzLmhpZGVRdWVyeU1vZGFsLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuc2V0RGF0ZSA9IHRoaXMuc2V0RGF0ZS5iaW5kKHRoaXMpO1xuICAgIH1cblxuICAgIGxvYWREYXRhKCkge1xuICAgICAgICBjb25zdCB7c2VsZWN0ZWRUYWJsZSwgcXVlcmllc30gPSB0aGlzLnN0YXRlO1xuXG4gICAgICAgIGlmICghc2VsZWN0ZWRUYWJsZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XG5cbiAgICAgICAgaWYgKHF1ZXJpZXNbc2VsZWN0ZWRUYWJsZS51dWlkXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBMb2dUYWJsZUFjdGlvbnMuZ2V0UXVlcmllcyhzZWxlY3RlZFRhYmxlLnV1aWQpXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qge2Vycm9yLCBkYXRhfSA9IHJlcztcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBxdWVyaWVzW3NlbGVjdGVkVGFibGUudXVpZF0gPSBkYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVlcmllczogcXVlcmllc1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgTGl2ZS5yZWZyZXNoKCk7XG4gICAgICAgIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSgnbG9ndmlldycsIHNlbGVjdGVkVGFibGUubmFtZSwgJy9sb2ctdmlldy8nICsgc2VsZWN0ZWRUYWJsZS51dWlkKTtcbiAgICB9XG5cbiAgICBsb2FkTG9nVmlldyA9IGFzeW5jKCkgPT4ge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IExvZ1ZpZXdBY3Rpb25zLmdldEFsbCgpO1xuICAgICAgICBjb25zdCB7ZGF0YSwgZXJyb3J9ID0gcmVzcG9uc2U7XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvd2VsY29tZSc7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgc2VsZWN0ZWRUYWJsZSA9IG51bGw7XG4gICAgICAgIGxldCB1dWlkID0gd2luZG93LnV1aWQ7XG5cbiAgICAgICAgaWYgKHdpbmRvdy51dWlkKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGkgaW4gZGF0YSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRhYmxlID0gZGF0YVtpXTtcbiAgICAgICAgICAgICAgICBpZiAodGFibGUudXVpZCA9PT0gd2luZG93LnV1aWQpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRUYWJsZSA9IGRhdGFbaV07XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChkYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHNlbGVjdGVkVGFibGUgPSBkYXRhWzBdO1xuICAgICAgICAgICAgdXVpZCA9IHNlbGVjdGVkVGFibGUudXVpZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHtpc0xpdmUsIGRpc2FibGVMaXZlLCBkYXRlUmFuZ2UgfSA9IHRoaXMuZ2V0RmlsdGVyRm9yVGFibGUodXVpZCk7XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBsb2dWaWV3czogZGF0YSxcbiAgICAgICAgICAgIHNlbGVjdGVkVGFibGUsXG4gICAgICAgICAgICBkaXNhYmxlTGl2ZSxcbiAgICAgICAgICAgIGlzTGl2ZSxcbiAgICAgICAgICAgIGRhdGVSYW5nZSxcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qge2xvZ1ZpZXdzLCBpc0xpdmV9ID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgICAgIGlmIChsb2dWaWV3cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkRGF0YSgpO1xuICAgICAgICAgICAgICAgIGlmIChpc0xpdmUpIHRoaXMuc3RhcnRTdHJlYW1pbmcoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RhcnRTdHJlYW1pbmcoKSB7XG4gICAgICAgIExpdmUuc3RhcnQodGhpcy5zdGF0ZS5pbnRlcnZhbCk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIEV2ZW50LmJ1cy5yZWdpc3RlcihFdmVudC5SRVNQT05TRV9FUlJPUiwgcmVzID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHtlcnJvcn0gPSByZXM7XG4gICAgICAgICAgICBpZiAoZXJyb3IgPT09IEV2ZW50LkVSUk9SX0lOVkFMSURfUVVFUlkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgaXNMaXZlOiBmYWxzZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIExpdmUucGF1c2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5zeW5jQWxsKClcbiAgICB9XG5cbiAgICBzeW5jQWxsKCkge1xuICAgICAgICBjb25zdCAkdGhpcyA9IHRoaXM7XG4gICAgICAgIERhdGFiYXNlQWN0aW9ucy5zeW5jQWxsKCkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICBjb25zdCB7ZXJyb3J9ID0gcmVzcG9uc2U7XG4gICAgICAgICAgICBpZiAoZXJyb3IgPT09IDApIHtcbiAgICAgICAgICAgICAgICAkdGhpcy5sb2FkTG9nVmlldygpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldEZpbHRlckZvclRhYmxlID0gKHV1aWQpID0+IHtcbiAgICAgICAgY29uc3QgY0RhdGEgPSBnZXREYXRhRnJvbUNvb2tpZXModXVpZCkgfHwgICd7fSc7XG4gICAgICAgIGxldCBuZXdEYXRlUmFuZ2UgPSB7fTtcbiAgICAgICAgbGV0IGRpc2FibGVMaXZlID0gJyc7XG4gICAgICAgIGxldCBpc0xpdmUgPSAnJztcbiAgICAgICAgbGV0IGRhdGVSYW5nZUxhYmVsID0gJyc7XG4gICAgICAgIGlmIChjRGF0YSAhPT0gJ3t9Jykge1xuICAgICAgICAgICAgY29uc3QgY0RhdGFPYmplY3QgPSBKU09OLnBhcnNlKGNEYXRhKTtcbiAgICAgICAgICAgIGRhdGVSYW5nZUxhYmVsID0gY0RhdGFPYmplY3QubGFiZWwgfHwgJyc7XG4gICAgICAgICAgICBpZiAoZGF0ZVJhbmdlTGFiZWwgIT09ICdDdXN0b20gUmFuZ2UnKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0ZVJhbmdlVmFsdWUgPSBEQVRFX1JBTkdFLmZpbmQoaXRlbSA9PiBpdGVtLmxhYmVsID09PSBkYXRlUmFuZ2VMYWJlbCk7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGVSYW5nZVZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld0RhdGVSYW5nZSA9IHsgLi4uZGF0ZVJhbmdlVmFsdWUgfTtcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZUxpdmUgPSAhTnVtYmVyLmlzSW50ZWdlcihuZXdEYXRlUmFuZ2UuZnJvbVZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgaXNMaXZlID0gY0RhdGFPYmplY3QuaXNMaXZlID09IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBuZXdEYXRlUmFuZ2UubGFiZWwgPSBjRGF0YU9iamVjdC5sYWJlbDtcbiAgICAgICAgICAgICAgICBuZXdEYXRlUmFuZ2UuZnJvbSA9IG1vbWVudC51bml4KGNEYXRhT2JqZWN0LmZyb20pO1xuICAgICAgICAgICAgICAgIG5ld0RhdGVSYW5nZS50byA9IG1vbWVudC51bml4KGNEYXRhT2JqZWN0LnRvKTtcbiAgICAgICAgICAgICAgICBkaXNhYmxlTGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgaXNMaXZlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXdEYXRlUmFuZ2UgPSB7XG4gICAgICAgICAgICAgICAgZnJvbTogREFURV9SQU5HRVswXS5mcm9tLFxuICAgICAgICAgICAgICAgIHRvOiBEQVRFX1JBTkdFWzBdLnRvLFxuICAgICAgICAgICAgICAgIGxhYmVsOiBEQVRFX1JBTkdFWzBdLmxhYmVsLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGRpc2FibGVMaXZlID0gZmFsc2U7XG4gICAgICAgICAgICBpc0xpdmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5zZXREYXRhQ29va2llcyh1dWlkLCB7bGFiZWw6IERBVEVfUkFOR0VbMF0ubGFiZWwsIGlzTGl2ZTogMX0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkYXRlUmFuZ2U6IHsgLi4ubmV3RGF0ZVJhbmdlIH0sXG4gICAgICAgICAgICBpc0xpdmUsXG4gICAgICAgICAgICBkaXNhYmxlTGl2ZSxcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldERhdGFDb29raWVzID0gKHV1aWQsIGNEYXRhKSA9PiB7XG4gICAgICAgIHNldERhdGFUb0Nvb2tpZXModXVpZCwgYCR7SlNPTi5zdHJpbmdpZnkoY0RhdGEpfWAsIDMwKTtcbiAgICB9XG5cbiAgICBzZXRTZWxlY3RlZFRhYmxlKHNlbGVjdGVkVGFibGUpIHtcbiAgICAgICAgY29uc3Qge2lzTGl2ZSwgZGlzYWJsZUxpdmUsIGRhdGVSYW5nZSB9ID0gdGhpcy5nZXRGaWx0ZXJGb3JUYWJsZShzZWxlY3RlZFRhYmxlLnV1aWQpO1xuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgc2VsZWN0ZWRUYWJsZSxcbiAgICAgICAgICAgIGlzTGl2ZSxcbiAgICAgICAgICAgIGRpc2FibGVMaXZlLFxuICAgICAgICAgICAgZGF0ZVJhbmdlXG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMubG9hZERhdGEoKTtcbiAgICAgICAgICAgIGlmICghaXNMaXZlKSBMaXZlLnBhdXNlKCk7XG4gICAgICAgICAgICBlbHNlIGlmIChpc0xpdmUpIHRoaXMuc3RhcnRTdHJlYW1pbmcoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaGFuZGxlUmVhbFRpbWVDbGlja2VkKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IHtpbnRlcnZhbCwgc2VsZWN0ZWRUYWJsZX0gPSB0aGlzLnN0YXRlO1xuICAgICAgICBjb25zdCB7Y2hlY2tlZH0gPSBldmVudC50YXJnZXQ7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgaXNMaXZlOiBjaGVja2VkXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoY2hlY2tlZCkge1xuICAgICAgICAgICAgTGl2ZS5zdGFydChpbnRlcnZhbCwgdHJ1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBMaXZlLnBhdXNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY0RhdGEgPSBKU09OLnBhcnNlKGdldERhdGFGcm9tQ29va2llcyhzZWxlY3RlZFRhYmxlLnV1aWQpIHx8ICAne30nKTtcbiAgICAgICAgY0RhdGEuaXNMaXZlID0gY2hlY2tlZCA/IDEgOiAwO1xuICAgICAgICB0aGlzLnNldERhdGFDb29raWVzKHNlbGVjdGVkVGFibGUudXVpZCwgY0RhdGEpO1xuICAgIH1cblxuICAgIG9uRGF0ZVJhbmdlQ2hhbmdlZChmcm9tLCB0bywgZGF0ZVJhbmdlLCBuZWVkVG9SZWZyZXNoID0gdHJ1ZSkge1xuICAgICAgICBjb25zdCB7c2VsZWN0ZWRUYWJsZSwgaW50ZXJ2YWwsIGlzTGl2ZX0gPSB0aGlzLnN0YXRlO1xuICAgICAgICBpZiAodG8pIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIC8vIGlzTGl2ZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgZGlzYWJsZUxpdmU6IHRydWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZGF0ZVJhbmdlLmlzTGl2ZSA9IDA7XG4gICAgICAgICAgICBMaXZlLnBhdXNlKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoIXRvKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICAvLyBpc0xpdmU6IHRydWUsXG4gICAgICAgICAgICAgICAgZGlzYWJsZUxpdmU6IGZhbHNlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChpc0xpdmUpIHtcbiAgICAgICAgICAgICAgICBMaXZlLnN0YXJ0KGludGVydmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRhdGVSYW5nZS5pc0xpdmUgPSBpc0xpdmUgPyAxIDogMDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0RGF0YUNvb2tpZXMoc2VsZWN0ZWRUYWJsZS51dWlkLCBkYXRlUmFuZ2UpO1xuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgZGF0ZVJhbmdlLFxuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICBpZihuZWVkVG9SZWZyZXNoKSB7XG4gICAgICAgICAgICAgICAgTGl2ZS5yZWZyZXNoKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25TdWJtaXRRdWVyeShxdWVyeSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHNob3dRdWVyeU1vZGFsOiB0cnVlLFxuICAgICAgICAgICAgcXVlcnlNb2RhbFF1ZXJ5OiBxdWVyeVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIG9uUXVlcnlTYXZlKCkge1xuICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcbiAgICAgICAgbGV0IHtxdWVyeU1vZGFsUXVlcnksIHNlbGVjdGVkVGFibGUsIHF1ZXJpZXN9ID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgaWYgKCQudHJpbShxdWVyeU1vZGFsUXVlcnkubmFtZSkgPT0gJycpIHtcbiAgICAgICAgICAgIEFsZXJ0LmVycm9yKCdRdWVyeSBuYW1lIHNob3VsZCBub3QgYmUgYmxhbmsnKTtcbiAgICAgICAgICAgIHF1ZXJ5TW9kYWxRdWVyeS5uYW1lQ2xhc3MgPSAnaXMtaW52YWxpZCc7XG4gICAgICAgICAgICB0aGF0LnNldFN0YXRlKHtxdWVyeU1vZGFsUXVlcnl9KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBxdWVyeU1vZGFsUXVlcnkubmFtZUNsYXNzID0gJyc7XG4gICAgICAgIGlmICgkLnRyaW0ocXVlcnlNb2RhbFF1ZXJ5Lm5hbWUpID09ICcnIHx8ICQudHJpbShxdWVyeU1vZGFsUXVlcnkucXVlcnkpID09ICcnKSB7XG4gICAgICAgICAgICBBbGVydC5lcnJvcignUXVlcnkgc2hvdWxkIG5vdCBiZSBibGFuaycpO1xuICAgICAgICAgICAgcXVlcnlNb2RhbFF1ZXJ5LnF1ZXJ5Q2xhc3MgPSAnaXMtaW52YWxpZCc7XG4gICAgICAgICAgICB0aGF0LnNldFN0YXRlKHtxdWVyeU1vZGFsUXVlcnl9KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBxdWVyeU1vZGFsUXVlcnkucXVlcnlDbGFzcyA9ICcnO1xuICAgICAgICB0aGF0LnNldFN0YXRlKHtxdWVyeU1vZGFsUXVlcnl9KTtcbiAgICAgICAgTG9nVGFibGVBY3Rpb25zLnNhdmVRdWVyaWVzKHNlbGVjdGVkVGFibGUudXVpZCwgcXVlcnlNb2RhbFF1ZXJ5LCBxdWVyeU1vZGFsUXVlcnkuaWQpXG4gICAgICAgICAgICAudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHtlcnJvciwgcXVlcnl9ID0gcmVzO1xuICAgICAgICAgICAgICAgIGlmIChlcnJvciA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocXVlcnlNb2RhbFF1ZXJ5LmlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBBbGVydC5zdWNjZXNzKCdVcGRhdGUgc3VjY2Vzc2Z1bCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkUXVlcmllcyA9IHF1ZXJpZXNbc2VsZWN0ZWRUYWJsZS51dWlkXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VsZWN0ZWRRdWVyaWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkUXVlcmllc1tpXS5pZCA9PT0gcXVlcnkuaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVlcmllc1tzZWxlY3RlZFRhYmxlLnV1aWRdW2ldID0gcXVlcnk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIEFsZXJ0LnN1Y2Nlc3MoJ0NyZWF0ZSBzdWNjZXNzZnVsJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBxdWVyaWVzW3NlbGVjdGVkVGFibGUudXVpZF0ucHVzaChxdWVyeSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBxdWVyeU1vZGFsUXVlcnk6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgc2hvd1F1ZXJ5TW9kYWw6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgcXVlcmllczogcXVlcmllc1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgfVxuXG4gICAgb25EZWxldGVRdWVyeShxdWVyeSkge1xuICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcbiAgICAgICAgbGV0IHtzZWxlY3RlZFRhYmxlLCBxdWVyaWVzfSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIExvZ1RhYmxlQWN0aW9ucy5kZWxldGVRdWVyaWVzKHF1ZXJ5LmlkKVxuICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB7ZXJyb3J9ID0gcmVzO1xuICAgICAgICAgICAgICAgIGlmIChlcnJvciA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBBbGVydC5zdWNjZXNzKCdEZWxldGUgc3VjY2Vzc2Z1bCcpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2VsZWN0ZWRRdWVyaWVzID0gcXVlcmllc1tzZWxlY3RlZFRhYmxlLnV1aWRdO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbGVjdGVkUXVlcmllcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkUXVlcmllc1tpXS5pZCA9PT0gcXVlcnkuaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWVyaWVzW3NlbGVjdGVkVGFibGUudXVpZF0uc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBxdWVyaWVzOiBxdWVyaWVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2hvd1F1ZXJ5TW9kYWw6IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICB9XG5cbiAgICBvblF1ZXJ5TW9kZWxDaGFuZ2UoZSkge1xuICAgICAgICBsZXQge3F1ZXJ5TW9kYWxRdWVyeX0gPSB0aGlzLnN0YXRlO1xuICAgICAgICBxdWVyeU1vZGFsUXVlcnlbZS50YXJnZXQubmFtZV0gPSBlLnRhcmdldC52YWx1ZTtcbiAgICAgICAgcXVlcnlNb2RhbFF1ZXJ5W2UudGFyZ2V0Lm5hbWUgKyAnQ2xhc3MnXSA9IGUudGFyZ2V0LnZhbHVlID09ICcnID8gJ2lzLWludmFsaWQnIDogJyc7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3F1ZXJ5TW9kYWxRdWVyeX0pO1xuICAgIH1cblxuICAgIGhpZGVRdWVyeU1vZGFsKCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHNob3dRdWVyeU1vZGFsOiBmYWxzZVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHNldERhdGUoZnJvbSwgdG8sIGRhdGVWYWx1ZSwgY2FsbGJhY2spe1xuICAgICAgICB0aGlzLmFkdmFuY2VTZWFyY2hSZWYuY3VycmVudC5zZXREYXRlKGZyb20sIHRvLCBkYXRlVmFsdWUsIGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIGlzTGl2ZSxcbiAgICAgICAgICAgIGRpc2FibGVMaXZlLFxuICAgICAgICAgICAgbG9nVmlld3MsXG4gICAgICAgICAgICBzZWxlY3RlZFRhYmxlLFxuICAgICAgICAgICAgZGF0ZVJhbmdlLFxuICAgICAgICAgICAgcXVlcmllcyxcbiAgICAgICAgICAgIHNob3dRdWVyeU1vZGFsLFxuICAgICAgICAgICAgcXVlcnlNb2RhbFF1ZXJ5XG4gICAgICAgIH0gPSB0aGlzLnN0YXRlO1xuXG4gICAgICAgIGNvbnN0IHV1aWQgPSBzZWxlY3RlZFRhYmxlID8gc2VsZWN0ZWRUYWJsZS51dWlkIDogbnVsbDtcblxuICAgICAgICBjb25zdCBzZWxlY3RlZFF1ZXJpZXMgPSBxdWVyaWVzW3V1aWRdIHx8IFtdO1xuXG4gICAgICAgIGNvbnN0IHtxdWVyeSwgbmFtZSwgbmFtZUNsYXNzID0gJycsIHF1ZXJ5Q2xhc3MgPSAnJ30gPSBxdWVyeU1vZGFsUXVlcnk7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGFzaGJvYXJkLXBhZ2UgY29udGFpbmVyLWZsdWlkXCI+XG4gICAgICAgICAgICAgICAge2xvZ1ZpZXdzICYmIGxvZ1ZpZXdzLmxlbmd0aCA+IDAgPyAoXG4gICAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8QWR2YW5jZWRTZWFyY2hcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e3NlbGVjdGVkVGFibGUudXVpZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkRhdGVSYW5nZUNoYW5nZWQ9e3RoaXMub25EYXRlUmFuZ2VDaGFuZ2VkfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE9e2xvZ1ZpZXdzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkPXtzZWxlY3RlZFRhYmxlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0ZWQ9e3RoaXMuc2V0U2VsZWN0ZWRUYWJsZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRlUmFuZ2U9e2RhdGVSYW5nZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWVyaWVzPXtzZWxlY3RlZFF1ZXJpZXN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25TYXZlQ2xpY2tlZD17dGhpcy5vblN1Ym1pdFF1ZXJ5fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRGVsZXRlQ0xpY2tlZD17dGhpcy5vbkRlbGV0ZVF1ZXJ5fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj17dGhpcy5hZHZhbmNlU2VhcmNoUmVmfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxvYXQtY2hhcnQgcm93IGp1c3RpZnktY29udGVudC1zdGFydCBmbGV4LW1kLXdyYXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC0xMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VVBsb3RDaGFydCBpc0xpdmU9e2lzTGl2ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV1aWQ9e3V1aWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVSZWFsVGltZUNsaWNrZWQ9e3RoaXMuaGFuZGxlUmVhbFRpbWVDbGlja2VkfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZUxpdmU9e2Rpc2FibGVMaXZlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibWItMlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXREYXRlPXt0aGlzLnNldERhdGV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtMTIgY2FyZC1jb2x1bW5zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxTdW1tYXJ5IHV1aWQ9e3V1aWR9Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxMb2dWaWV3VGFibGUgc2VsZWN0ZWRUYWJsZT17c2VsZWN0ZWRUYWJsZX0vPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8TW9kYWwgdGl0bGU9eydRdWVyeSd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ9eydxdWVyeSd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZT17U2l6ZS5sYXJnZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzYXZlQnV0dG9uVGl0bGU9eydTYXZlJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93U2F2ZUJ1dHRvbj17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93PXtzaG93UXVlcnlNb2RhbH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzYXZlQnV0dG9uQWN0aW9uPXt0aGlzLm9uUXVlcnlTYXZlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlQnV0dG9uQWN0aW9uPXt0aGlzLmhpZGVRdWVyeU1vZGFsfVxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtzaG93UXVlcnlNb2RhbCAmJiA8ZGl2IGNsYXNzTmFtZT0ncm93Jz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbC0xMic+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8SW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lPSduYW1lJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPSdRdWVyeSBuYW1lJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZT17bmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e25hbWVDbGFzc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vblF1ZXJ5TW9kZWxDaGFuZ2V9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbC0xMiBtdC0zJz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxJbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU9J3F1ZXJ5J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZT17cXVlcnl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtxdWVyeUNsYXNzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uUXVlcnlNb2RlbENoYW5nZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2Pn1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvTW9kYWw+XG4gICAgICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3Bpbm5lciB0ZXh0LWNlbnRlciBwb3NpdGlvbi1hYnNvbHV0ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGlubmVyLWJvcmRlciB0ZXh0LXByaW1hcnlcIiByb2xlPVwic3RhdHVzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwic3Itb25seVwiPkxvYWRpbmcuLi48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuUmVhY3RET00ucmVuZGVyKDxJbmRleC8+LCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcm9vdCcpKTtcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcblxudmFyIGZsb29yID0gTWF0aC5mbG9vcjtcblxuLy8gYElzSW50ZWdyYWxOdW1iZXJgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1pc2ludGVncmFsbnVtYmVyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMteC9uby1udW1iZXItaXNpbnRlZ2VyIC0tIHNhZmVcbm1vZHVsZS5leHBvcnRzID0gTnVtYmVyLmlzSW50ZWdlciB8fCBmdW5jdGlvbiBpc0ludGVnZXIoaXQpIHtcbiAgcmV0dXJuICFpc09iamVjdChpdCkgJiYgaXNGaW5pdGUoaXQpICYmIGZsb29yKGl0KSA9PT0gaXQ7XG59O1xuIiwidmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgaXNJbnRlZ3JhbE51bWJlciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1pbnRlZ3JhbC1udW1iZXInKTtcblxuLy8gYE51bWJlci5pc0ludGVnZXJgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1udW1iZXIuaXNpbnRlZ2VyXG4kKHsgdGFyZ2V0OiAnTnVtYmVyJywgc3RhdDogdHJ1ZSB9LCB7XG4gIGlzSW50ZWdlcjogaXNJbnRlZ3JhbE51bWJlclxufSk7XG4iXSwic291cmNlUm9vdCI6IiJ9