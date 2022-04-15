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
/******/ 		"dashboard_form": 0
/******/ 	}
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"dashboard_form": 0
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
/******/ 	deferredModules.push(["./assets/js/pages/dashboard/form.js","vendors~alerts_form~alerts_list~content-header~dashboard-page~dashboard_form~dashboard_list~database~ad6a277b","vendors~alerts_form~alerts_list~app~dashboard-page~dashboard_form~dashboard_list~database_form~datab~7df76b7b","vendors~alerts_form~alerts_list~dashboard-page~dashboard_form~dashboard_list~database_form~database_~a0c5edc0","alerts_form~alerts_list~dashboard-page~dashboard_form~dashboard_list~database_form~database_tables~e~96755b64"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/js/pages/dashboard/form.js":
/*!*******************************************!*\
  !*** ./assets/js/pages/dashboard/form.js ***!
  \*******************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! regenerator-runtime/runtime.js */ "./node_modules/regenerator-runtime/runtime.js");
/* harmony import */ var regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.function.bind.js */ "./node_modules/core-js/modules/es.function.bind.js");
/* harmony import */ var core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.function.name.js */ "./node_modules/core-js/modules/es.function.name.js");
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.promise.js */ "./node_modules/core-js/modules/es.promise.js");
/* harmony import */ var core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.array.map.js */ "./node_modules/core-js/modules/es.array.map.js");
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.symbol.description.js */ "./node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es_array_sort_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/es.array.sort.js */ "./node_modules/core-js/modules/es.array.sort.js");
/* harmony import */ var core_js_modules_es_array_sort_js__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_sort_js__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_es_array_reduce_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! core-js/modules/es.array.reduce.js */ "./node_modules/core-js/modules/es.array.reduce.js");
/* harmony import */ var core_js_modules_es_array_reduce_js__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_reduce_js__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! core-js/modules/es.array.find.js */ "./node_modules/core-js/modules/es.array.find.js");
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! core-js/modules/es.object.keys.js */ "./node_modules/core-js/modules/es.object.keys.js");
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! core-js/modules/es.object.set-prototype-of.js */ "./node_modules/core-js/modules/es.object.set-prototype-of.js");
/* harmony import */ var core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! core-js/modules/es.object.get-prototype-of.js */ "./node_modules/core-js/modules/es.object.get-prototype-of.js");
/* harmony import */ var core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! core-js/modules/es.reflect.construct.js */ "./node_modules/core-js/modules/es.reflect.construct.js");
/* harmony import */ var core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! core-js/modules/es.object.create.js */ "./node_modules/core-js/modules/es.object.create.js");
/* harmony import */ var core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! core-js/modules/es.object.define-property.js */ "./node_modules/core-js/modules/es.object.define-property.js");
/* harmony import */ var core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! core-js/modules/es.array.filter.js */ "./node_modules/core-js/modules/es.array.filter.js");
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptor.js */ "./node_modules/core-js/modules/es.object.get-own-property-descriptor.js");
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor_js__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptor_js__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! core-js/modules/es.array.for-each.js */ "./node_modules/core-js/modules/es.array.for-each.js");
/* harmony import */ var core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_23__);
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptors.js */ "./node_modules/core-js/modules/es.object.get-own-property-descriptors.js");
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors_js__WEBPACK_IMPORTED_MODULE_24___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptors_js__WEBPACK_IMPORTED_MODULE_24__);
/* harmony import */ var core_js_modules_es_object_define_properties_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! core-js/modules/es.object.define-properties.js */ "./node_modules/core-js/modules/es.object.define-properties.js");
/* harmony import */ var core_js_modules_es_object_define_properties_js__WEBPACK_IMPORTED_MODULE_25___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_define_properties_js__WEBPACK_IMPORTED_MODULE_25__);
/* harmony import */ var core_js_modules_es_array_is_array_js__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! core-js/modules/es.array.is-array.js */ "./node_modules/core-js/modules/es.array.is-array.js");
/* harmony import */ var core_js_modules_es_array_is_array_js__WEBPACK_IMPORTED_MODULE_26___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_is_array_js__WEBPACK_IMPORTED_MODULE_26__);
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ "./node_modules/core-js/modules/es.symbol.iterator.js");
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_27___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_27__);
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! core-js/modules/es.array.slice.js */ "./node_modules/core-js/modules/es.array.slice.js");
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_28___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_28__);
/* harmony import */ var core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! core-js/modules/es.array.from.js */ "./node_modules/core-js/modules/es.array.from.js");
/* harmony import */ var core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_29___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_29__);
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_30___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_30__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_31___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_31__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_32___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_32__);
/* harmony import */ var _components___WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ../../components/ */ "./assets/js/components/index.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_34___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_34__);
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ../../actions */ "./assets/js/actions/index.js");
/* harmony import */ var _actions_log_table_actions__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ../../actions/_log-table-actions */ "./assets/js/actions/_log-table-actions.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }



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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
































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








var DashboardPage = /*#__PURE__*/function (_Component) {
  _inherits(DashboardPage, _Component);

  var _super = _createSuper(DashboardPage);

  function DashboardPage(props) {
    var _this;

    _classCallCheck(this, DashboardPage);

    _this = _super.call(this, props);
    _this.state = {
      tables: [],
      widgetSelected: [],
      initialWidgetSelected: [],
      dashboardDetail: {},
      initialData: {},
      errors: {},
      widgets: [],
      initialLogTableDashboard: {},
      logTableDashboard: {},
      isLoading: false
    };
    _this.onChangeData = _this.onChangeData.bind(_assertThisInitialized(_this));
    _this.onSubmitForm = _this.onSubmitForm.bind(_assertThisInitialized(_this)); //this.getWidgetDetail = this.getWidgetDetail.bind(this);

    return _this;
  }

  _createClass(DashboardPage, [{
    key: "onChangeData",
    value: function onChangeData(_ref) {
      var name = _ref.name,
          value = _ref.value;

      if (name) {
        this.setState(function (preState) {
          return {
            dashboardDetail: _objectSpread(_objectSpread({}, preState.dashboardDetail), {}, _defineProperty({}, name, value))
          };
        });

        if (name === 'title') {
          if (!value) {
            this.setState({
              errors: {
                title: true
              }
            });
            return;
          } else {
            this.setState({
              errors: {}
            });
          }
        }
      }
    }
  }, {
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var dashboard, _yield$Promise$all, _yield$Promise$all2, dashboardRes, tableRes, widgetListRes, widgetSelected, dashboardDetail, initialLogTableDashboard, _widgetSelected$, widgets, data, logTableDashboardRes, widgetList, tables;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // call dashboardDetail detail API here
                this.setState({
                  isLoading: true
                });
                dashboard = this.props.dashboard;
                _context.next = 4;
                return Promise.all([dashboard && _actions__WEBPACK_IMPORTED_MODULE_35__["DashboardActions"].loadDashboard(dashboard), _actions__WEBPACK_IMPORTED_MODULE_35__["DatabaseActions"].getAllTable(), _actions__WEBPACK_IMPORTED_MODULE_35__["WidgetActions"].listWidget()]);

              case 4:
                _yield$Promise$all = _context.sent;
                _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 3);
                dashboardRes = _yield$Promise$all2[0];
                tableRes = _yield$Promise$all2[1];
                widgetListRes = _yield$Promise$all2[2];
                widgetSelected = [];
                dashboardDetail = {};
                initialLogTableDashboard = {};

                if (!(dashboardRes && !dashboardRes.error)) {
                  _context.next = 23;
                  break;
                }

                widgets = dashboardRes.widgets, data = dashboardRes.data;
                _context.t0 = data.uuid;

                if (!_context.t0) {
                  _context.next = 19;
                  break;
                }

                _context.next = 18;
                return _actions_log_table_actions__WEBPACK_IMPORTED_MODULE_36__["default"].getDashboard(data.uuid);

              case 18:
                _context.t0 = _context.sent;

              case 19:
                logTableDashboardRes = _context.t0;
                initialLogTableDashboard = logTableDashboardRes && !logTableDashboardRes.error ? _objectSpread(_objectSpread({}, logTableDashboardRes), {}, {
                  uuid: data.uuid
                }) : {};
                widgetSelected = widgets && widgets.length > 0 ? widgets : [];
                dashboardDetail = data ? _objectSpread(_objectSpread({}, data), {}, {
                  table: (_widgetSelected$ = widgetSelected[0]) === null || _widgetSelected$ === void 0 ? void 0 : _widgetSelected$.table
                }) : {};

              case 23:
                widgetList = widgetListRes && widgetListRes.data && widgetListRes.data.length > 0 ? widgetListRes.data : [];
                tables = tableRes && tableRes.data && tableRes.data.length > 0 ? tableRes.data.map(function (item) {
                  return {
                    value: item,
                    label: item
                  };
                }) : [];
                this.setState({
                  dashboardDetail: dashboardDetail,
                  initialData: _objectSpread({}, dashboardDetail),
                  widgetSelected: widgetSelected,
                  initialWidgetSelected: _toConsumableArray(widgetSelected),
                  widgetList: _toConsumableArray(widgetList),
                  tables: tables,
                  initialLogTableDashboard: initialLogTableDashboard,
                  logTableDashboard: initialLogTableDashboard,
                  isLoading: false
                });

              case 26:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: "onSubmitForm",
    value: function () {
      var _onSubmitForm = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _this$state, dashboardDetail, widgetSelected, id, title, response;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _this$state = this.state, dashboardDetail = _this$state.dashboardDetail, widgetSelected = _this$state.widgetSelected;
                id = dashboardDetail.id, title = dashboardDetail.title;

                if (title) {
                  _context2.next = 7;
                  break;
                }

                this.setState({
                  errors: {
                    title: true
                  }
                });
                return _context2.abrupt("return");

              case 7:
                this.setState({
                  errors: {}
                });

              case 8:
                ;
                _context2.next = 11;
                return _actions__WEBPACK_IMPORTED_MODULE_35__["DashboardActions"].createOrUpdate(id, {
                  title: title,
                  widgets: _toConsumableArray(widgetSelected).map(function (item) {
                    return item.id;
                  })
                });

              case 11:
                response = _context2.sent;

                if (!(response && !response.error)) {
                  _context2.next = 20;
                  break;
                }

                _actions__WEBPACK_IMPORTED_MODULE_35__["Alert"].success("".concat(id ? 'Update' : 'Add new', " successful"));

                if (!response.redirect) {
                  _context2.next = 17;
                  break;
                }

                window.location.href = response.redirect;
                return _context2.abrupt("return");

              case 17:
                this.setState({
                  initialWidgetSelected: _toConsumableArray(widgetSelected),
                  initialData: _objectSpread({}, dashboardDetail)
                });
                _context2.next = 21;
                break;

              case 20:
                _actions__WEBPACK_IMPORTED_MODULE_35__["Alert"].error(response.error || 'Cant save new information');

              case 21:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function onSubmitForm() {
        return _onSubmitForm.apply(this, arguments);
      }

      return onSubmitForm;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state2 = this.state,
          widgetSelected = _this$state2.widgetSelected,
          initialWidgetSelected = _this$state2.initialWidgetSelected,
          dashboardDetail = _this$state2.dashboardDetail,
          initialData = _this$state2.initialData,
          errors = _this$state2.errors,
          widgetList = _this$state2.widgetList,
          isLoading = _this$state2.isLoading,
          tables = _this$state2.tables,
          logTableDashboard = _this$state2.logTableDashboard;
      var _dashboardDetail$titl = dashboardDetail.title,
          title = _dashboardDetail$titl === void 0 ? '' : _dashboardDetail$titl,
          _dashboardDetail$desc = dashboardDetail.description,
          description = _dashboardDetail$desc === void 0 ? '' : _dashboardDetail$desc;

      var _columns = widgetList && widgetList.map(function (item, key) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_31___default.a.createElement("option", {
          key: key,
          value: item.title
        }, item.title);
      });

      var isEditMode = initialData.title;
      var isDataChange = !Object(lodash__WEBPACK_IMPORTED_MODULE_34__["isEqual"])(initialData, dashboardDetail) || !Object(lodash__WEBPACK_IMPORTED_MODULE_34__["isEqual"])(initialWidgetSelected.sort(), widgetSelected.sort());
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_31___default.a.createElement("div", {
        className: "dashboard-management"
      }, isLoading ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_31___default.a.createElement("span", {
        className: "spinner-border spinner-border-sm me-2",
        role: "status",
        "aria-hidden": "true"
      }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_31___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_31___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_31___default.a.createElement("div", {
        className: "card me-2 ms-2"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_31___default.a.createElement("div", {
        className: "card-header"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_31___default.a.createElement("span", {
        className: "align-items-center d-inline-flex"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_31___default.a.createElement("h3", {
        className: "mb-0"
      }, "".concat(title || 'Create new dashboard')))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_31___default.a.createElement("div", {
        className: "card-body"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_31___default.a.createElement("div", {
        className: "".concat(isEditMode ? 'row' : '')
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_31___default.a.createElement(_components___WEBPACK_IMPORTED_MODULE_33__["FormField"], {
        className: "".concat(isEditMode ? 'col-12 col-md-6' : ''),
        label: "Title",
        placeholder: "Dashboard title",
        fieldName: "title",
        value: title,
        onChange: function onChange(e) {
          return _this2.onChangeData(e.target);
        },
        isMandatory: true,
        errors: errors
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_31___default.a.createElement(_components___WEBPACK_IMPORTED_MODULE_33__["FormField"], {
        className: "".concat(isEditMode ? 'col-12 col-md-6' : ''),
        label: "Description",
        placeholder: "Dashboard description",
        fieldName: "description",
        value: description,
        onChange: function onChange(e) {
          return _this2.onChangeData(e.target);
        }
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_31___default.a.createElement("div", {
        className: "widget form-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_31___default.a.createElement("label", null, "Widgets"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_31___default.a.createElement(_components___WEBPACK_IMPORTED_MODULE_33__["Select2"], {
        id: 'widget-selected',
        multiple: "multiple",
        "data-placeholder": "Select widget",
        value: widgetSelected && widgetSelected.length > 0 ? widgetSelected.map(function (item) {
          return item.title;
        }) : [],
        onChange: function onChange() {
          var summary = $('#widget-selected').val();
          var newWidgetList = summary.reduce(function (obj, item) {
            var newWidget = _this2.state.widgetList.find(function (el) {
              return el.title === item;
            });

            if (newWidget) {
              obj.push(_objectSpread({}, newWidget));
            }

            return obj;
          }, []);

          _this2.setState({
            widgetSelected: _toConsumableArray(newWidgetList)
          });
        }
      }, _columns)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_31___default.a.createElement("div", {
        className: "d-inline-flex"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_31___default.a.createElement(_components___WEBPACK_IMPORTED_MODULE_33__["Button"], {
        className: "btn-search mb-3",
        disabled: !isDataChange || Object.keys(errors).length > 0,
        onClick: function onClick() {
          return _this2.onSubmitForm();
        }
      }, "Save"), initialData.title && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_31___default.a.createElement(_components___WEBPACK_IMPORTED_MODULE_33__["Button"], {
        className: "btn-search mb-3 ms-2",
        color: "default",
        onClick: function onClick() {
          return history.back();
        }
      }, "Cancel"))))));
    }
  }]);

  return DashboardPage;
}(react__WEBPACK_IMPORTED_MODULE_31__["Component"]);

var root = document.querySelector('#root');
react_dom__WEBPACK_IMPORTED_MODULE_32___default.a.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_31___default.a.createElement(DashboardPage, root.dataset), root);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3BhZ2VzL2Rhc2hib2FyZC9mb3JtLmpzIl0sIm5hbWVzIjpbIkRhc2hib2FyZFBhZ2UiLCJwcm9wcyIsInN0YXRlIiwidGFibGVzIiwid2lkZ2V0U2VsZWN0ZWQiLCJpbml0aWFsV2lkZ2V0U2VsZWN0ZWQiLCJkYXNoYm9hcmREZXRhaWwiLCJpbml0aWFsRGF0YSIsImVycm9ycyIsIndpZGdldHMiLCJpbml0aWFsTG9nVGFibGVEYXNoYm9hcmQiLCJsb2dUYWJsZURhc2hib2FyZCIsImlzTG9hZGluZyIsIm9uQ2hhbmdlRGF0YSIsImJpbmQiLCJvblN1Ym1pdEZvcm0iLCJuYW1lIiwidmFsdWUiLCJzZXRTdGF0ZSIsInByZVN0YXRlIiwidGl0bGUiLCJkYXNoYm9hcmQiLCJQcm9taXNlIiwiYWxsIiwiRGFzaGJvYXJkQWN0aW9ucyIsImxvYWREYXNoYm9hcmQiLCJEYXRhYmFzZUFjdGlvbnMiLCJnZXRBbGxUYWJsZSIsIldpZGdldEFjdGlvbnMiLCJsaXN0V2lkZ2V0IiwiZGFzaGJvYXJkUmVzIiwidGFibGVSZXMiLCJ3aWRnZXRMaXN0UmVzIiwiZXJyb3IiLCJkYXRhIiwidXVpZCIsIkxvZ1RhYmxlQWN0aW9ucyIsImdldERhc2hib2FyZCIsImxvZ1RhYmxlRGFzaGJvYXJkUmVzIiwibGVuZ3RoIiwidGFibGUiLCJ3aWRnZXRMaXN0IiwibWFwIiwiaXRlbSIsImxhYmVsIiwiaWQiLCJjcmVhdGVPclVwZGF0ZSIsInJlc3BvbnNlIiwiQWxlcnQiLCJzdWNjZXNzIiwicmVkaXJlY3QiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJkZXNjcmlwdGlvbiIsIl9jb2x1bW5zIiwia2V5IiwiaXNFZGl0TW9kZSIsImlzRGF0YUNoYW5nZSIsImlzRXF1YWwiLCJzb3J0IiwiZSIsInRhcmdldCIsInN1bW1hcnkiLCIkIiwidmFsIiwibmV3V2lkZ2V0TGlzdCIsInJlZHVjZSIsIm9iaiIsIm5ld1dpZGdldCIsImZpbmQiLCJlbCIsInB1c2giLCJPYmplY3QiLCJrZXlzIiwiaGlzdG9yeSIsImJhY2siLCJDb21wb25lbnQiLCJyb290IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiUmVhY3RET00iLCJyZW5kZXIiLCJkYXRhc2V0Il0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSxRQUFRLG9CQUFvQjtRQUM1QjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLGlCQUFpQiw0QkFBNEI7UUFDN0M7UUFDQTtRQUNBLGtCQUFrQiwyQkFBMkI7UUFDN0M7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBOztRQUVBO1FBQ0E7UUFDQSwwQ0FBMEM7UUFDMUM7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBOzs7UUFHQTtRQUNBLG9CQUFvQjtRQUNwQjtRQUNBO1FBQ0E7UUFDQSx3QkFBd0I7UUFDeEI7UUFDQTtRQUNBLG1CQUFtQiw2QkFBNkI7UUFDaEQ7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLG1CQUFtQiw4QkFBOEI7UUFDakQ7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLEtBQUs7UUFDTDtRQUNBLEtBQUs7UUFDTDs7UUFF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RyxZQUFELElBQWlCZSxNQUFNLENBQUNDLElBQVAsQ0FBWWxFLE1BQVosRUFBb0IrQixNQUFwQixHQUE2QixDQURoRTtBQUVRLGVBQU8sRUFBRTtBQUFBLGlCQUFNLE1BQUksQ0FBQ3hCLFlBQUwsRUFBTjtBQUFBO0FBRmpCLGdCQURKLEVBT0tSLFdBQVcsQ0FBQ2EsS0FBWixpQkFDRCw0REFBQyxvREFBRDtBQUFRLGlCQUFTLEVBQUMsc0JBQWxCO0FBQ1EsYUFBSyxFQUFDLFNBRGQ7QUFFUSxlQUFPLEVBQUU7QUFBQSxpQkFBTXVELE9BQU8sQ0FBQ0MsSUFBUixFQUFOO0FBQUE7QUFGakIsa0JBUkosQ0FoREosQ0FOSixDQURKLENBSlIsQ0FESjtBQStFSDs7OztFQTlQdUJDLGdEOztBQWlRNUIsSUFBTUMsSUFBSSxHQUFHQyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBYjtBQUNBQyxpREFBUSxDQUFDQyxNQUFULGVBQWdCLDREQUFDLGFBQUQsRUFBbUJKLElBQUksQ0FBQ0ssT0FBeEIsQ0FBaEIsRUFBb0RMLElBQXBELEUiLCJmaWxlIjoiZGFzaGJvYXJkX2Zvcm0uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcbiBcdFx0dmFyIGV4ZWN1dGVNb2R1bGVzID0gZGF0YVsyXTtcblxuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcblxuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0XHQvLyBhZGQgZW50cnkgbW9kdWxlcyBmcm9tIGxvYWRlZCBjaHVuayB0byBkZWZlcnJlZCBsaXN0XG4gXHRcdGRlZmVycmVkTW9kdWxlcy5wdXNoLmFwcGx5KGRlZmVycmVkTW9kdWxlcywgZXhlY3V0ZU1vZHVsZXMgfHwgW10pO1xuXG4gXHRcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gYWxsIGNodW5rcyByZWFkeVxuIFx0XHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiBcdH07XG4gXHRmdW5jdGlvbiBjaGVja0RlZmVycmVkTW9kdWxlcygpIHtcbiBcdFx0dmFyIHJlc3VsdDtcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlZmVycmVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBkZWZlcnJlZE1vZHVsZSA9IGRlZmVycmVkTW9kdWxlc1tpXTtcbiBcdFx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcbiBcdFx0XHRmb3IodmFyIGogPSAxOyBqIDwgZGVmZXJyZWRNb2R1bGUubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBkZXBJZCA9IGRlZmVycmVkTW9kdWxlW2pdO1xuIFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2RlcElkXSAhPT0gMCkgZnVsZmlsbGVkID0gZmFsc2U7XG4gXHRcdFx0fVxuIFx0XHRcdGlmKGZ1bGZpbGxlZCkge1xuIFx0XHRcdFx0ZGVmZXJyZWRNb2R1bGVzLnNwbGljZShpLS0sIDEpO1xuIFx0XHRcdFx0cmVzdWx0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBkZWZlcnJlZE1vZHVsZVswXSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0cmV0dXJuIHJlc3VsdDtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBDU1MgY2h1bmtzXG4gXHR2YXIgaW5zdGFsbGVkQ3NzQ2h1bmtzID0ge1xuIFx0XHRcImRhc2hib2FyZF9mb3JtXCI6IDBcbiBcdH1cblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuIFx0Ly8gUHJvbWlzZSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdFwiZGFzaGJvYXJkX2Zvcm1cIjogMFxuIFx0fTtcblxuIFx0dmFyIGRlZmVycmVkTW9kdWxlcyA9IFtdO1xuXG4gXHQvLyBzY3JpcHQgcGF0aCBmdW5jdGlvblxuIFx0ZnVuY3Rpb24ganNvbnBTY3JpcHRTcmMoY2h1bmtJZCkge1xuIFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArICh7fVtjaHVua0lkXXx8Y2h1bmtJZCkgKyBcIi5qc1wiXG4gXHR9XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuIFx0Ly8gVGhpcyBmaWxlIGNvbnRhaW5zIG9ubHkgdGhlIGVudHJ5IGNodW5rLlxuIFx0Ly8gVGhlIGNodW5rIGxvYWRpbmcgZnVuY3Rpb24gZm9yIGFkZGl0aW9uYWwgY2h1bmtzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmUgPSBmdW5jdGlvbiByZXF1aXJlRW5zdXJlKGNodW5rSWQpIHtcbiBcdFx0dmFyIHByb21pc2VzID0gW107XG5cblxuIFx0XHQvLyBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiBDU1MgbG9hZGluZ1xuIFx0XHR2YXIgY3NzQ2h1bmtzID0ge1wiMFwiOjF9O1xuIFx0XHRpZihpbnN0YWxsZWRDc3NDaHVua3NbY2h1bmtJZF0pIHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ3NzQ2h1bmtzW2NodW5rSWRdKTtcbiBcdFx0ZWxzZSBpZihpbnN0YWxsZWRDc3NDaHVua3NbY2h1bmtJZF0gIT09IDAgJiYgY3NzQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDc3NDaHVua3NbY2h1bmtJZF0gPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRcdHZhciBocmVmID0gXCJcIiArICh7fVtjaHVua0lkXXx8Y2h1bmtJZCkgKyBcIi5jc3NcIjtcbiBcdFx0XHRcdHZhciBmdWxsaHJlZiA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIGhyZWY7XG4gXHRcdFx0XHR2YXIgZXhpc3RpbmdMaW5rVGFncyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwibGlua1wiKTtcbiBcdFx0XHRcdGZvcih2YXIgaSA9IDA7IGkgPCBleGlzdGluZ0xpbmtUYWdzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdHZhciB0YWcgPSBleGlzdGluZ0xpbmtUYWdzW2ldO1xuIFx0XHRcdFx0XHR2YXIgZGF0YUhyZWYgPSB0YWcuZ2V0QXR0cmlidXRlKFwiZGF0YS1ocmVmXCIpIHx8IHRhZy5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpO1xuIFx0XHRcdFx0XHRpZih0YWcucmVsID09PSBcInN0eWxlc2hlZXRcIiAmJiAoZGF0YUhyZWYgPT09IGhyZWYgfHwgZGF0YUhyZWYgPT09IGZ1bGxocmVmKSkgcmV0dXJuIHJlc29sdmUoKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdHZhciBleGlzdGluZ1N0eWxlVGFncyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic3R5bGVcIik7XG4gXHRcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZXhpc3RpbmdTdHlsZVRhZ3MubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0dmFyIHRhZyA9IGV4aXN0aW5nU3R5bGVUYWdzW2ldO1xuIFx0XHRcdFx0XHR2YXIgZGF0YUhyZWYgPSB0YWcuZ2V0QXR0cmlidXRlKFwiZGF0YS1ocmVmXCIpO1xuIFx0XHRcdFx0XHRpZihkYXRhSHJlZiA9PT0gaHJlZiB8fCBkYXRhSHJlZiA9PT0gZnVsbGhyZWYpIHJldHVybiByZXNvbHZlKCk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHR2YXIgbGlua1RhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xuIFx0XHRcdFx0bGlua1RhZy5yZWwgPSBcInN0eWxlc2hlZXRcIjtcbiBcdFx0XHRcdGxpbmtUYWcudHlwZSA9IFwidGV4dC9jc3NcIjtcbiBcdFx0XHRcdGxpbmtUYWcub25sb2FkID0gcmVzb2x2ZTtcbiBcdFx0XHRcdGxpbmtUYWcub25lcnJvciA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gXHRcdFx0XHRcdHZhciByZXF1ZXN0ID0gZXZlbnQgJiYgZXZlbnQudGFyZ2V0ICYmIGV2ZW50LnRhcmdldC5zcmMgfHwgZnVsbGhyZWY7XG4gXHRcdFx0XHRcdHZhciBlcnIgPSBuZXcgRXJyb3IoXCJMb2FkaW5nIENTUyBjaHVuayBcIiArIGNodW5rSWQgKyBcIiBmYWlsZWQuXFxuKFwiICsgcmVxdWVzdCArIFwiKVwiKTtcbiBcdFx0XHRcdFx0ZXJyLnJlcXVlc3QgPSByZXF1ZXN0O1xuIFx0XHRcdFx0XHRyZWplY3QoZXJyKTtcbiBcdFx0XHRcdH07XG4gXHRcdFx0XHRsaW5rVGFnLmhyZWYgPSBmdWxsaHJlZjtcbiBcdFx0XHRcdHZhciBoZWFkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdO1xuIFx0XHRcdFx0aGVhZC5hcHBlbmRDaGlsZChsaW5rVGFnKTtcbiBcdFx0XHR9KS50aGVuKGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0aW5zdGFsbGVkQ3NzQ2h1bmtzW2NodW5rSWRdID0gMDtcbiBcdFx0XHR9KSk7XG4gXHRcdH1cblxuIFx0XHQvLyBKU09OUCBjaHVuayBsb2FkaW5nIGZvciBqYXZhc2NyaXB0XG5cbiBcdFx0dmFyIGluc3RhbGxlZENodW5rRGF0YSA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhICE9PSAwKSB7IC8vIDAgbWVhbnMgXCJhbHJlYWR5IGluc3RhbGxlZFwiLlxuXG4gXHRcdFx0Ly8gYSBQcm9taXNlIG1lYW5zIFwiY3VycmVudGx5IGxvYWRpbmdcIi5cbiBcdFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEpIHtcbiBcdFx0XHRcdHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ2h1bmtEYXRhWzJdKTtcbiBcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0Ly8gc2V0dXAgUHJvbWlzZSBpbiBjaHVuayBjYWNoZVxuIFx0XHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRcdFx0aW5zdGFsbGVkQ2h1bmtEYXRhID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gW3Jlc29sdmUsIHJlamVjdF07XG4gXHRcdFx0XHR9KTtcbiBcdFx0XHRcdHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ2h1bmtEYXRhWzJdID0gcHJvbWlzZSk7XG5cbiBcdFx0XHRcdC8vIHN0YXJ0IGNodW5rIGxvYWRpbmdcbiBcdFx0XHRcdHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiBcdFx0XHRcdHZhciBvblNjcmlwdENvbXBsZXRlO1xuXG4gXHRcdFx0XHRzY3JpcHQuY2hhcnNldCA9ICd1dGYtOCc7XG4gXHRcdFx0XHRzY3JpcHQudGltZW91dCA9IDEyMDtcbiBcdFx0XHRcdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKSB7XG4gXHRcdFx0XHRcdHNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdHNjcmlwdC5zcmMgPSBqc29ucFNjcmlwdFNyYyhjaHVua0lkKTtcblxuIFx0XHRcdFx0Ly8gY3JlYXRlIGVycm9yIGJlZm9yZSBzdGFjayB1bndvdW5kIHRvIGdldCB1c2VmdWwgc3RhY2t0cmFjZSBsYXRlclxuIFx0XHRcdFx0dmFyIGVycm9yID0gbmV3IEVycm9yKCk7XG4gXHRcdFx0XHRvblNjcmlwdENvbXBsZXRlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gXHRcdFx0XHRcdC8vIGF2b2lkIG1lbSBsZWFrcyBpbiBJRS5cbiBcdFx0XHRcdFx0c2NyaXB0Lm9uZXJyb3IgPSBzY3JpcHQub25sb2FkID0gbnVsbDtcbiBcdFx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuIFx0XHRcdFx0XHR2YXIgY2h1bmsgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHRcdFx0XHRcdGlmKGNodW5rICE9PSAwKSB7XG4gXHRcdFx0XHRcdFx0aWYoY2h1bmspIHtcbiBcdFx0XHRcdFx0XHRcdHZhciBlcnJvclR5cGUgPSBldmVudCAmJiAoZXZlbnQudHlwZSA9PT0gJ2xvYWQnID8gJ21pc3NpbmcnIDogZXZlbnQudHlwZSk7XG4gXHRcdFx0XHRcdFx0XHR2YXIgcmVhbFNyYyA9IGV2ZW50ICYmIGV2ZW50LnRhcmdldCAmJiBldmVudC50YXJnZXQuc3JjO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IubWVzc2FnZSA9ICdMb2FkaW5nIGNodW5rICcgKyBjaHVua0lkICsgJyBmYWlsZWQuXFxuKCcgKyBlcnJvclR5cGUgKyAnOiAnICsgcmVhbFNyYyArICcpJztcbiBcdFx0XHRcdFx0XHRcdGVycm9yLm5hbWUgPSAnQ2h1bmtMb2FkRXJyb3InO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IudHlwZSA9IGVycm9yVHlwZTtcbiBcdFx0XHRcdFx0XHRcdGVycm9yLnJlcXVlc3QgPSByZWFsU3JjO1xuIFx0XHRcdFx0XHRcdFx0Y2h1bmtbMV0oZXJyb3IpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSB1bmRlZmluZWQ7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH07XG4gXHRcdFx0XHR2YXIgdGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiBcdFx0XHRcdFx0b25TY3JpcHRDb21wbGV0ZSh7IHR5cGU6ICd0aW1lb3V0JywgdGFyZ2V0OiBzY3JpcHQgfSk7XG4gXHRcdFx0XHR9LCAxMjAwMDApO1xuIFx0XHRcdFx0c2NyaXB0Lm9uZXJyb3IgPSBzY3JpcHQub25sb2FkID0gb25TY3JpcHRDb21wbGV0ZTtcbiBcdFx0XHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0cmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbiBcdH07XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvYXNzZXRzL1wiO1xuXG4gXHQvLyBvbiBlcnJvciBmdW5jdGlvbiBmb3IgYXN5bmMgbG9hZGluZ1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vZSA9IGZ1bmN0aW9uKGVycikgeyBjb25zb2xlLmVycm9yKGVycik7IHRocm93IGVycjsgfTtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIGFkZCBlbnRyeSBtb2R1bGUgdG8gZGVmZXJyZWQgbGlzdFxuIFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2goW1wiLi9hc3NldHMvanMvcGFnZXMvZGFzaGJvYXJkL2Zvcm0uanNcIixcInZlbmRvcnN+YWxlcnRzX2Zvcm1+YWxlcnRzX2xpc3R+Y29udGVudC1oZWFkZXJ+ZGFzaGJvYXJkLXBhZ2V+ZGFzaGJvYXJkX2Zvcm1+ZGFzaGJvYXJkX2xpc3R+ZGF0YWJhc2V+YWQ2YTI3N2JcIixcInZlbmRvcnN+YWxlcnRzX2Zvcm1+YWxlcnRzX2xpc3R+YXBwfmRhc2hib2FyZC1wYWdlfmRhc2hib2FyZF9mb3JtfmRhc2hib2FyZF9saXN0fmRhdGFiYXNlX2Zvcm1+ZGF0YWJ+N2RmNzZiN2JcIixcInZlbmRvcnN+YWxlcnRzX2Zvcm1+YWxlcnRzX2xpc3R+ZGFzaGJvYXJkLXBhZ2V+ZGFzaGJvYXJkX2Zvcm1+ZGFzaGJvYXJkX2xpc3R+ZGF0YWJhc2VfZm9ybX5kYXRhYmFzZV9+YTBjNWVkYzBcIixcImFsZXJ0c19mb3JtfmFsZXJ0c19saXN0fmRhc2hib2FyZC1wYWdlfmRhc2hib2FyZF9mb3JtfmRhc2hib2FyZF9saXN0fmRhdGFiYXNlX2Zvcm1+ZGF0YWJhc2VfdGFibGVzfmV+OTY3NTViNjRcIl0pO1xuIFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiByZWFkeVxuIFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4iLCJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IHtCdXR0b24sIFJlc3BvbnNpdmVHcmlkTGF5b3V0LCBTZWxlY3QyLCBGb3JtRmllbGR9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvJztcbmltcG9ydCB7aXNFcXVhbH0gZnJvbSBcImxvZGFzaFwiO1xuaW1wb3J0IHtBbGVydCwgRGFzaGJvYXJkQWN0aW9ucywgRGF0YWJhc2VBY3Rpb25zLCBXaWRnZXRBY3Rpb25zfSBmcm9tIFwiLi4vLi4vYWN0aW9uc1wiO1xuaW1wb3J0IExvZ1RhYmxlQWN0aW9ucyBmcm9tIFwiLi4vLi4vYWN0aW9ucy9fbG9nLXRhYmxlLWFjdGlvbnNcIjtcblxuY2xhc3MgRGFzaGJvYXJkUGFnZSBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICB0YWJsZXM6IFtdLFxuICAgICAgICAgICAgd2lkZ2V0U2VsZWN0ZWQ6IFtdLFxuICAgICAgICAgICAgaW5pdGlhbFdpZGdldFNlbGVjdGVkOiBbXSxcbiAgICAgICAgICAgIGRhc2hib2FyZERldGFpbDoge30sXG4gICAgICAgICAgICBpbml0aWFsRGF0YToge30sXG4gICAgICAgICAgICBlcnJvcnM6IHt9LFxuICAgICAgICAgICAgd2lkZ2V0czogW10sXG4gICAgICAgICAgICBpbml0aWFsTG9nVGFibGVEYXNoYm9hcmQ6IHt9LFxuICAgICAgICAgICAgbG9nVGFibGVEYXNoYm9hcmQ6IHt9LFxuICAgICAgICAgICAgaXNMb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub25DaGFuZ2VEYXRhID0gdGhpcy5vbkNoYW5nZURhdGEuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5vblN1Ym1pdEZvcm0gPSB0aGlzLm9uU3VibWl0Rm9ybS5iaW5kKHRoaXMpO1xuICAgICAgICAvL3RoaXMuZ2V0V2lkZ2V0RGV0YWlsID0gdGhpcy5nZXRXaWRnZXREZXRhaWwuYmluZCh0aGlzKTtcbiAgICB9XG5cblxuICAgIG9uQ2hhbmdlRGF0YSh7bmFtZSwgdmFsdWV9KSB7XG4gICAgICAgIGlmIChuYW1lKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKChwcmVTdGF0ZSkgPT4gKHtcbiAgICAgICAgICAgICAgICBkYXNoYm9hcmREZXRhaWw6IHtcbiAgICAgICAgICAgICAgICAgICAgLi4ucHJlU3RhdGUuZGFzaGJvYXJkRGV0YWlsLFxuICAgICAgICAgICAgICAgICAgICBbbmFtZV06IHZhbHVlLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKVxuXG4gICAgICAgICAgICBpZiAobmFtZSA9PT0gJ3RpdGxlJykge1xuICAgICAgICAgICAgICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yczoge30sXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIC8vIGNhbGwgZGFzaGJvYXJkRGV0YWlsIGRldGFpbCBBUEkgaGVyZVxuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgaXNMb2FkaW5nOiB0cnVlLFxuICAgICAgICB9KVxuXG4gICAgICAgIGNvbnN0IHtkYXNoYm9hcmR9ID0gdGhpcy5wcm9wcztcblxuICAgICAgICBjb25zdCBbXG4gICAgICAgICAgICBkYXNoYm9hcmRSZXMsXG4gICAgICAgICAgICB0YWJsZVJlcyxcbiAgICAgICAgICAgIHdpZGdldExpc3RSZXMsXG4gICAgICAgIF0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICBkYXNoYm9hcmQgJiYgRGFzaGJvYXJkQWN0aW9ucy5sb2FkRGFzaGJvYXJkKGRhc2hib2FyZCksXG4gICAgICAgICAgICBEYXRhYmFzZUFjdGlvbnMuZ2V0QWxsVGFibGUoKSxcbiAgICAgICAgICAgIFdpZGdldEFjdGlvbnMubGlzdFdpZGdldCgpLFxuICAgICAgICBdKTtcblxuXG4gICAgICAgIGxldCB3aWRnZXRTZWxlY3RlZCA9IFtdO1xuICAgICAgICBsZXQgZGFzaGJvYXJkRGV0YWlsID0ge307XG4gICAgICAgIGxldCBpbml0aWFsTG9nVGFibGVEYXNoYm9hcmQgPSB7fTtcblxuICAgICAgICBpZiAoZGFzaGJvYXJkUmVzICYmICFkYXNoYm9hcmRSZXMuZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnN0IHt3aWRnZXRzLCBkYXRhfSA9IGRhc2hib2FyZFJlcztcblxuICAgICAgICAgICAgY29uc3QgbG9nVGFibGVEYXNoYm9hcmRSZXMgPSBkYXRhLnV1aWQgJiYgYXdhaXQgTG9nVGFibGVBY3Rpb25zLmdldERhc2hib2FyZChkYXRhLnV1aWQpO1xuXG4gICAgICAgICAgICBpbml0aWFsTG9nVGFibGVEYXNoYm9hcmQgPSBsb2dUYWJsZURhc2hib2FyZFJlcyAmJiAhbG9nVGFibGVEYXNoYm9hcmRSZXMuZXJyb3IgPyB7XG4gICAgICAgICAgICAgICAgLi4ubG9nVGFibGVEYXNoYm9hcmRSZXMsXG4gICAgICAgICAgICAgICAgdXVpZDogZGF0YS51dWlkXG4gICAgICAgICAgICB9IDoge307XG5cbiAgICAgICAgICAgIHdpZGdldFNlbGVjdGVkID0gd2lkZ2V0cyAmJiB3aWRnZXRzLmxlbmd0aCA+IDAgPyB3aWRnZXRzIDogW107XG5cbiAgICAgICAgICAgIGRhc2hib2FyZERldGFpbCA9IGRhdGEgPyB7XG4gICAgICAgICAgICAgICAgLi4uZGF0YSxcbiAgICAgICAgICAgICAgICB0YWJsZTogd2lkZ2V0U2VsZWN0ZWRbMF0/LnRhYmxlLFxuICAgICAgICAgICAgfSA6IHt9O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgd2lkZ2V0TGlzdCA9IHdpZGdldExpc3RSZXMgJiYgd2lkZ2V0TGlzdFJlcy5kYXRhICYmIHdpZGdldExpc3RSZXMuZGF0YS5sZW5ndGggPiAwID8gd2lkZ2V0TGlzdFJlcy5kYXRhIDogW107XG5cbiAgICAgICAgbGV0IHRhYmxlcyA9IHRhYmxlUmVzICYmIHRhYmxlUmVzLmRhdGEgJiYgdGFibGVSZXMuZGF0YS5sZW5ndGggPiAwID8gdGFibGVSZXMuZGF0YS5tYXAoaXRlbSA9PiAoe1xuICAgICAgICAgICAgdmFsdWU6IGl0ZW0sXG4gICAgICAgICAgICBsYWJlbDogaXRlbVxuICAgICAgICB9KSkgOiBbXTtcblxuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgZGFzaGJvYXJkRGV0YWlsLFxuICAgICAgICAgICAgaW5pdGlhbERhdGE6IHsuLi5kYXNoYm9hcmREZXRhaWx9LFxuICAgICAgICAgICAgd2lkZ2V0U2VsZWN0ZWQsXG4gICAgICAgICAgICBpbml0aWFsV2lkZ2V0U2VsZWN0ZWQ6IFsuLi53aWRnZXRTZWxlY3RlZF0sXG4gICAgICAgICAgICB3aWRnZXRMaXN0OiBbLi4ud2lkZ2V0TGlzdF0sXG4gICAgICAgICAgICB0YWJsZXMsXG4gICAgICAgICAgICBpbml0aWFsTG9nVGFibGVEYXNoYm9hcmQ6IGluaXRpYWxMb2dUYWJsZURhc2hib2FyZCxcbiAgICAgICAgICAgIGxvZ1RhYmxlRGFzaGJvYXJkOiBpbml0aWFsTG9nVGFibGVEYXNoYm9hcmQsXG4gICAgICAgICAgICBpc0xvYWRpbmc6IGZhbHNlLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhc3luYyBvblN1Ym1pdEZvcm0oKSB7XG4gICAgICAgIGNvbnN0IHtkYXNoYm9hcmREZXRhaWwsIHdpZGdldFNlbGVjdGVkfSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGNvbnN0IHtpZCwgdGl0bGV9ID0gZGFzaGJvYXJkRGV0YWlsO1xuXG4gICAgICAgIGlmICghdGl0bGUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIGVycm9yczoge1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIGVycm9yczoge30sXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIDtcblxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IERhc2hib2FyZEFjdGlvbnMuY3JlYXRlT3JVcGRhdGUoaWQsIHtcbiAgICAgICAgICAgIHRpdGxlLFxuICAgICAgICAgICAgd2lkZ2V0czogWy4uLndpZGdldFNlbGVjdGVkXS5tYXAoaXRlbSA9PiBpdGVtLmlkKSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHJlc3BvbnNlICYmICFyZXNwb25zZS5lcnJvcikge1xuICAgICAgICAgICAgQWxlcnQuc3VjY2VzcyhgJHtpZCA/ICdVcGRhdGUnIDogJ0FkZCBuZXcnfSBzdWNjZXNzZnVsYCk7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2UucmVkaXJlY3QpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHJlc3BvbnNlLnJlZGlyZWN0O1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgaW5pdGlhbFdpZGdldFNlbGVjdGVkOiBbLi4ud2lkZ2V0U2VsZWN0ZWRdLFxuICAgICAgICAgICAgICAgIGluaXRpYWxEYXRhOiB7Li4uZGFzaGJvYXJkRGV0YWlsfSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBBbGVydC5lcnJvcihyZXNwb25zZS5lcnJvciB8fCAnQ2FudCBzYXZlIG5ldyBpbmZvcm1hdGlvbicpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIHdpZGdldFNlbGVjdGVkLFxuICAgICAgICAgICAgaW5pdGlhbFdpZGdldFNlbGVjdGVkLFxuICAgICAgICAgICAgZGFzaGJvYXJkRGV0YWlsLFxuICAgICAgICAgICAgaW5pdGlhbERhdGEsXG4gICAgICAgICAgICBlcnJvcnMsXG4gICAgICAgICAgICB3aWRnZXRMaXN0LFxuICAgICAgICAgICAgaXNMb2FkaW5nLFxuICAgICAgICAgICAgdGFibGVzLFxuICAgICAgICAgICAgbG9nVGFibGVEYXNoYm9hcmQsXG4gICAgICAgIH0gPSB0aGlzLnN0YXRlO1xuXG4gICAgICAgIGNvbnN0IHt0aXRsZSA9ICcnLCBkZXNjcmlwdGlvbiA9ICcnfSA9IGRhc2hib2FyZERldGFpbDtcblxuICAgICAgICBjb25zdCBfY29sdW1ucyA9IHdpZGdldExpc3QgJiYgd2lkZ2V0TGlzdC5tYXAoKGl0ZW0sIGtleSkgPT4gPG9wdGlvbiBrZXk9e2tleX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtpdGVtLnRpdGxlfT57aXRlbS50aXRsZX08L29wdGlvbj4pO1xuXG4gICAgICAgIGNvbnN0IGlzRWRpdE1vZGUgPSBpbml0aWFsRGF0YS50aXRsZTtcblxuICAgICAgICBjb25zdCBpc0RhdGFDaGFuZ2UgPSAhaXNFcXVhbChpbml0aWFsRGF0YSwgZGFzaGJvYXJkRGV0YWlsKSB8fFxuICAgICAgICAgICAgIWlzRXF1YWwoaW5pdGlhbFdpZGdldFNlbGVjdGVkLnNvcnQoKSwgd2lkZ2V0U2VsZWN0ZWQuc29ydCgpKTtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkYXNoYm9hcmQtbWFuYWdlbWVudFwiPlxuICAgICAgICAgICAgICAgIHtpc0xvYWRpbmcgPyAoPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwic3Bpbm5lci1ib3JkZXIgc3Bpbm5lci1ib3JkZXItc20gbWUtMlwiXG4gICAgICAgICAgICAgICAgICAgIHJvbGU9XCJzdGF0dXNcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L3NwYW4+KSA6IChcbiAgICAgICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZCBtZS0yIG1zLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhbGlnbi1pdGVtcy1jZW50ZXIgZC1pbmxpbmUtZmxleFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJtYi0wXCI+e2Ake3RpdGxlIHx8ICdDcmVhdGUgbmV3IGRhc2hib2FyZCd9YH08L2gzPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1ib2R5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgJHtpc0VkaXRNb2RlID8gJ3JvdycgOiAnJ31gfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtRmllbGRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2Ake2lzRWRpdE1vZGUgPyAnY29sLTEyIGNvbC1tZC02JyA6ICcnfWB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw9J1RpdGxlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPSdEYXNoYm9hcmQgdGl0bGUnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmllbGROYW1lPSd0aXRsZSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGl0bGV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB0aGlzLm9uQ2hhbmdlRGF0YShlLnRhcmdldCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNNYW5kYXRvcnk9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JzPXtlcnJvcnN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1GaWVsZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YCR7aXNFZGl0TW9kZSA/ICdjb2wtMTIgY29sLW1kLTYnIDogJyd9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbD0nRGVzY3JpcHRpb24nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9J0Rhc2hib2FyZCBkZXNjcmlwdGlvbidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZE5hbWU9J2Rlc2NyaXB0aW9uJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtkZXNjcmlwdGlvbn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHRoaXMub25DaGFuZ2VEYXRhKGUudGFyZ2V0KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldCBmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWw+V2lkZ2V0czwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8U2VsZWN0MlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkPXsnd2lkZ2V0LXNlbGVjdGVkJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtdWx0aXBsZT1cIm11bHRpcGxlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLXBsYWNlaG9sZGVyPSdTZWxlY3Qgd2lkZ2V0J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXt3aWRnZXRTZWxlY3RlZCAmJiB3aWRnZXRTZWxlY3RlZC5sZW5ndGggPiAwID8gd2lkZ2V0U2VsZWN0ZWQubWFwKGl0ZW0gPT4gaXRlbS50aXRsZSkgOiBbXX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzdW1tYXJ5ID0gJCgnI3dpZGdldC1zZWxlY3RlZCcpLnZhbCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdXaWRnZXRMaXN0ID0gc3VtbWFyeS5yZWR1Y2UoKG9iaiwgaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3V2lkZ2V0ID0gdGhpcy5zdGF0ZS53aWRnZXRMaXN0LmZpbmQoZWwgPT4gZWwudGl0bGUgPT09IGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5ld1dpZGdldCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4ubmV3V2lkZ2V0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgW10pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0U2VsZWN0ZWQ6IFsuLi5uZXdXaWRnZXRMaXN0XSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtfY29sdW1uc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvU2VsZWN0Mj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZC1pbmxpbmUtZmxleFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiBjbGFzc05hbWU9XCJidG4tc2VhcmNoIG1iLTNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17IWlzRGF0YUNoYW5nZSB8fCBPYmplY3Qua2V5cyhlcnJvcnMpLmxlbmd0aCA+IDB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHRoaXMub25TdWJtaXRGb3JtKCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgU2F2ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7aW5pdGlhbERhdGEudGl0bGUgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b24gY2xhc3NOYW1lPVwiYnRuLXNlYXJjaCBtYi0zIG1zLTJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcj1cImRlZmF1bHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoaXN0b3J5LmJhY2soKX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ2FuY2VsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj59XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvPil9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNvbnN0IHJvb3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcm9vdCcpO1xuUmVhY3RET00ucmVuZGVyKDxEYXNoYm9hcmRQYWdlIHsuLi5yb290LmRhdGFzZXR9Lz4sIHJvb3QpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==