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
/******/ 		"widget_form": 0
/******/ 	}
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"widget_form": 0
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
/******/ 	deferredModules.push(["./assets/js/pages/widget/form.js","vendors~alerts_form~alerts_list~content-header~dashboard-page~dashboard_form~dashboard_list~database~ad6a277b","vendors~alerts_form~alerts_list~app~dashboard-page~dashboard_form~dashboard_list~database_form~datab~7df76b7b","vendors~alerts_form~alerts_list~dashboard-page~dashboard_form~dashboard_list~database_form~database_~a0c5edc0","alerts_form~alerts_list~dashboard-page~dashboard_form~dashboard_list~database_form~database_tables~e~96755b64"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/js/pages/widget/form.js":
/*!****************************************!*\
  !*** ./assets/js/pages/widget/form.js ***!
  \****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var core_js_modules_es_date_to_string_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.date.to-string.js */ "./node_modules/core-js/modules/es.date.to-string.js");
/* harmony import */ var core_js_modules_es_date_to_string_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_date_to_string_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.regexp.to-string.js */ "./node_modules/core-js/modules/es.regexp.to-string.js");
/* harmony import */ var core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.map.js */ "./node_modules/core-js/modules/es.array.map.js");
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.function.bind.js */ "./node_modules/core-js/modules/es.function.bind.js");
/* harmony import */ var core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_string_trim_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.string.trim.js */ "./node_modules/core-js/modules/es.string.trim.js");
/* harmony import */ var core_js_modules_es_string_trim_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_trim_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.function.name.js */ "./node_modules/core-js/modules/es.function.name.js");
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.array.slice.js */ "./node_modules/core-js/modules/es.array.slice.js");
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.object.define-property.js */ "./node_modules/core-js/modules/es.object.define-property.js");
/* harmony import */ var core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.object.set-prototype-of.js */ "./node_modules/core-js/modules/es.object.set-prototype-of.js");
/* harmony import */ var core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.object.get-prototype-of.js */ "./node_modules/core-js/modules/es.object.get-prototype-of.js");
/* harmony import */ var core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/es.reflect.construct.js */ "./node_modules/core-js/modules/es.reflect.construct.js");
/* harmony import */ var core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! core-js/modules/es.object.create.js */ "./node_modules/core-js/modules/es.object.create.js");
/* harmony import */ var core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! core-js/modules/es.object.keys.js */ "./node_modules/core-js/modules/es.object.keys.js");
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! core-js/modules/es.array.filter.js */ "./node_modules/core-js/modules/es.array.filter.js");
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptor.js */ "./node_modules/core-js/modules/es.object.get-own-property-descriptor.js");
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor_js__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptor_js__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! core-js/modules/es.array.for-each.js */ "./node_modules/core-js/modules/es.array.for-each.js");
/* harmony import */ var core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptors.js */ "./node_modules/core-js/modules/es.object.get-own-property-descriptors.js");
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors_js__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptors_js__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var core_js_modules_es_object_define_properties_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! core-js/modules/es.object.define-properties.js */ "./node_modules/core-js/modules/es.object.define-properties.js");
/* harmony import */ var core_js_modules_es_object_define_properties_js__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_define_properties_js__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! core-js/modules/es.object.assign.js */ "./node_modules/core-js/modules/es.object.assign.js");
/* harmony import */ var core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! core-js/modules/es.symbol.description.js */ "./node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ "./node_modules/core-js/modules/es.symbol.iterator.js");
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_23__);
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_24___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_24__);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_25___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_25__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_26___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_26__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_27___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_27__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_28___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_28__);
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ../../components */ "./assets/js/components/index.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ../../utils */ "./assets/js/utils.js");
/* harmony import */ var _components_widget_counter_sum__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ../../components/widget/_counter-sum */ "./assets/js/components/widget/_counter-sum.js");
/* harmony import */ var _components_widget_widget_table__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ../../components/widget/_widget-table */ "./assets/js/components/widget/_widget-table.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ../../actions */ "./assets/js/actions/index.js");
/* harmony import */ var _components_input__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ../../components/_input */ "./assets/js/components/_input.js");
/* harmony import */ var _components_modal__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ../../components/_modal */ "./assets/js/components/_modal.js");
/* harmony import */ var _components_widget_line_bar_chart__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ../../components/widget/_line-bar-chart */ "./assets/js/components/widget/_line-bar-chart.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }





























function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

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











var SAMPLE_DATA = [{
  "label": "Bergoo",
  "value": 931
}, {
  "label": "Carlos",
  "value": 296
}, {
  "label": "Groveville",
  "value": 587
}, {
  "label": "Carrizo",
  "value": 645
}, {
  "label": "Broadlands",
  "value": 581
}, {
  "label": "Jennings",
  "value": 234
}, {
  "label": "Whitestone",
  "value": 350
}, {
  "label": "Harborton",
  "value": 545
}, {
  "label": "Spelter",
  "value": 178
}, {
  "label": "Stockwell",
  "value": 199
}, {
  "label": "Oceola",
  "value": 636
}, {
  "label": "Bluffview",
  "value": 840
}, {
  "label": "Oley",
  "value": 942
}, {
  "label": "Staples",
  "value": 994
}, {
  "label": "Emison",
  "value": 876
}, {
  "label": "Cuylerville",
  "value": 690
}, {
  "label": "Saranap",
  "value": 188
}, {
  "label": "Sanborn",
  "value": 106
}, {
  "label": "Tibbie",
  "value": 229
}, {
  "label": "Bascom",
  "value": 144
}];

var WidgetPage = /*#__PURE__*/function (_Component) {
  _inherits(WidgetPage, _Component);

  var _super = _createSuper(WidgetPage);

  function WidgetPage(props) {
    var _this;

    _classCallCheck(this, WidgetPage);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "updateInitialData", function (initialData) {
      _this.setState(_objectSpread(_objectSpread({}, initialData), {}, {
        type: initialData.type.toString()
      }));
    });

    _this.state = {
      type: '',
      title: '',
      size: '',
      column: '',
      showQueryModal: false,
      queryModalQuery: {}
    };
    _this.color = SAMPLE_DATA.map(function () {
      return _this.getRandomColor();
    });
    _this.onSubmitQuery = _this.onSubmitQuery.bind(_assertThisInitialized(_this));
    _this.onQuerySave = _this.onQuerySave.bind(_assertThisInitialized(_this));
    _this.onDeleteQuery = _this.onDeleteQuery.bind(_assertThisInitialized(_this));
    _this.onQueryModelChange = _this.onQueryModelChange.bind(_assertThisInitialized(_this));
    _this.hideQueryModal = _this.hideQueryModal.bind(_assertThisInitialized(_this));
    _this.loadQueries = _this.loadQueries.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(WidgetPage, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadQueries();
    }
  }, {
    key: "getRandomColor",
    value: function getRandomColor() {
      var letters = '0123456789ABCDEF';
      var color = '#';

      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }

      return color;
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
    key: "loadQueries",
    value: function loadQueries() {
      var that = this;
      _actions__WEBPACK_IMPORTED_MODULE_33__["WidgetActions"].getQueries().then(function (res) {
        var error = res.error,
            data = res.data;

        if (error === 0) {
          that.setState({
            queries: data
          });
        }
      });
    }
  }, {
    key: "onQuerySave",
    value: function onQuerySave() {
      var _this2 = this;

      var that = this;
      var queryModalQuery = this.state.queryModalQuery;

      if ($.trim(queryModalQuery.name) === '') {
        _actions__WEBPACK_IMPORTED_MODULE_33__["Alert"].error('Query name should not be blank');
        queryModalQuery.nameClass = 'is-invalid';
        that.setState({
          queryModalQuery: queryModalQuery
        });
        return;
      }

      queryModalQuery.nameClass = '';

      if ($.trim(queryModalQuery.name) === '' || $.trim(queryModalQuery.query) === '') {
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
      _actions__WEBPACK_IMPORTED_MODULE_33__["WidgetActions"].saveQueries(queryModalQuery.id, queryModalQuery).then(function (res) {
        var error = res.error;

        if (error === 0) {
          _this2.loadQueries();

          that.setState({
            queryModalQuery: {},
            showQueryModal: false
          });
        }
      });
    }
  }, {
    key: "onDeleteQuery",
    value: function onDeleteQuery(query) {
      var _this3 = this;

      var that = this;
      _actions__WEBPACK_IMPORTED_MODULE_33__["WidgetActions"].deleteQueries(query.id).then(function (res) {
        var error = res.error;

        if (error === 0) {
          _this3.loadQueries();

          that.setState({
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
      queryModalQuery[e.target.name + 'Class'] = e.target.value === '' ? 'is-invalid' : '';
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
    key: "render",
    value: function render() {
      var _this4 = this;

      var WidgetLayout = function WidgetLayout(_ref) {
        var type = _ref.type,
            title = _ref.title,
            size = _ref.size,
            column = _ref.column,
            duration = _ref.duration;
        var dataWidget = SAMPLE_DATA.slice(0, size);

        var color = _this4.color.slice(0, size);

        var component;

        switch (type) {
          case _utils__WEBPACK_IMPORTED_MODULE_30__["WIDGET_TYPE"].doughnut:
          case _utils__WEBPACK_IMPORTED_MODULE_30__["WIDGET_TYPE"].pie:
            {
              component = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_27___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_29__["DoughnutPieChart"], {
                id: "new",
                type: type,
                widgetHeader: title,
                data: dataWidget,
                height: "500",
                minHeight: "500",
                duration: duration,
                color: color
              });
              break;
            }

          case _utils__WEBPACK_IMPORTED_MODULE_30__["WIDGET_TYPE"].bar:
          case _utils__WEBPACK_IMPORTED_MODULE_30__["WIDGET_TYPE"].line:
            {
              component = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_27___default.a.createElement(_components_widget_line_bar_chart__WEBPACK_IMPORTED_MODULE_36__["LineBarChart"], {
                id: "new",
                type: type,
                widgetHeader: title,
                data: dataWidget,
                height: "500",
                minHeight: "500",
                duration: duration,
                color: color
              });
              break;
            }

          case _utils__WEBPACK_IMPORTED_MODULE_30__["WIDGET_TYPE"].counterSum:
            {
              component = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_27___default.a.createElement(_components_widget_counter_sum__WEBPACK_IMPORTED_MODULE_31__["CounterSum"], {
                data: dataWidget.length,
                widgetHeader: title
              });
              break;
            }

          case _utils__WEBPACK_IMPORTED_MODULE_30__["WIDGET_TYPE"].table:
            {
              component = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_27___default.a.createElement(_components_widget_widget_table__WEBPACK_IMPORTED_MODULE_32__["WidgetTable"], {
                key: dataWidget,
                data: dataWidget,
                widgetHeader: title,
                column: column,
                isDashboardComponent: true
              });
              break;
            }
        }

        return component;
      };

      var _this$state = this.state,
          type = _this$state.type,
          showQueryModal = _this$state.showQueryModal,
          queryModalQuery = _this$state.queryModalQuery,
          queries = _this$state.queries;
      var query = queryModalQuery.query,
          name = queryModalQuery.name,
          _queryModalQuery$name = queryModalQuery.nameClass,
          nameClass = _queryModalQuery$name === void 0 ? '' : _queryModalQuery$name,
          _queryModalQuery$quer = queryModalQuery.queryClass,
          queryClass = _queryModalQuery$quer === void 0 ? '' : _queryModalQuery$quer;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_27___default.a.createElement("div", {
        className: "row"
      }, this.state.isLoading ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_27___default.a.createElement("span", {
        className: "spinner-border spinner-border-sm me-2",
        role: "status",
        "aria-hidden": "true"
      }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_27___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_27___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_27___default.a.createElement(_components_modal__WEBPACK_IMPORTED_MODULE_35__["Modal"], {
        title: 'Query',
        id: 'query',
        size: _components__WEBPACK_IMPORTED_MODULE_29__["Size"].large,
        saveButtonTitle: 'Save',
        showSaveButton: true,
        show: showQueryModal,
        saveButtonAction: this.onQuerySave,
        closeButtonAction: this.hideQueryModal
      }, showQueryModal && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_27___default.a.createElement("div", {
        className: "row"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_27___default.a.createElement("div", {
        className: "col-12"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_27___default.a.createElement(_components_input__WEBPACK_IMPORTED_MODULE_34__["Input"], {
        name: "name",
        placeholder: "Query name",
        defaultValue: name,
        className: nameClass,
        onChange: this.onQueryModelChange
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_27___default.a.createElement("div", {
        className: "col-12 mt-3"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_27___default.a.createElement(_components_input__WEBPACK_IMPORTED_MODULE_34__["Input"], {
        name: "query",
        defaultValue: query,
        className: queryClass,
        onChange: this.onQueryModelChange
      })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_27___default.a.createElement("div", {
        className: " col-12 col-md-4"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_27___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_29__["WidgetManagement"], _extends({}, this.props, {
        onUpdateWidget: function onUpdateWidget(name, value) {
          var _this4$setState;

          _this4.setState((_this4$setState = {}, _defineProperty(_this4$setState, name, value), _defineProperty(_this4$setState, "duration", name === 'type' || name === 'size' ? 1000 : 0), _this4$setState));
        },
        updateInitialData: this.updateInitialData,
        updateLoading: function updateLoading(value) {
          _this4.setState({
            isLoading: value
          });
        },
        queries: queries,
        onSaveClicked: this.onSubmitQuery,
        onDeleteCLicked: this.onDeleteQuery
      }))), type && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_27___default.a.createElement("div", {
        className: "widget col-12 col-md-8"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_27___default.a.createElement("div", {
        className: "card pb-5"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_27___default.a.createElement(WidgetLayout, this.state)))));
    }
  }]);

  return WidgetPage;
}(react__WEBPACK_IMPORTED_MODULE_27__["Component"]);

var root = document.querySelector('#root');
react_dom__WEBPACK_IMPORTED_MODULE_28___default.a.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_27___default.a.createElement(WidgetPage, root.dataset), root);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3BhZ2VzL3dpZGdldC9mb3JtLmpzIl0sIm5hbWVzIjpbIlNBTVBMRV9EQVRBIiwiV2lkZ2V0UGFnZSIsInByb3BzIiwiaW5pdGlhbERhdGEiLCJzZXRTdGF0ZSIsInR5cGUiLCJ0b1N0cmluZyIsInN0YXRlIiwidGl0bGUiLCJzaXplIiwiY29sdW1uIiwic2hvd1F1ZXJ5TW9kYWwiLCJxdWVyeU1vZGFsUXVlcnkiLCJjb2xvciIsIm1hcCIsImdldFJhbmRvbUNvbG9yIiwib25TdWJtaXRRdWVyeSIsImJpbmQiLCJvblF1ZXJ5U2F2ZSIsIm9uRGVsZXRlUXVlcnkiLCJvblF1ZXJ5TW9kZWxDaGFuZ2UiLCJoaWRlUXVlcnlNb2RhbCIsImxvYWRRdWVyaWVzIiwibGV0dGVycyIsImkiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJxdWVyeSIsInRoYXQiLCJXaWRnZXRBY3Rpb25zIiwiZ2V0UXVlcmllcyIsInRoZW4iLCJyZXMiLCJlcnJvciIsImRhdGEiLCJxdWVyaWVzIiwiJCIsInRyaW0iLCJuYW1lIiwiQWxlcnQiLCJuYW1lQ2xhc3MiLCJxdWVyeUNsYXNzIiwic2F2ZVF1ZXJpZXMiLCJpZCIsImRlbGV0ZVF1ZXJpZXMiLCJlIiwidGFyZ2V0IiwidmFsdWUiLCJXaWRnZXRMYXlvdXQiLCJkdXJhdGlvbiIsImRhdGFXaWRnZXQiLCJzbGljZSIsImNvbXBvbmVudCIsIldJREdFVF9UWVBFIiwiZG91Z2hudXQiLCJwaWUiLCJiYXIiLCJsaW5lIiwiY291bnRlclN1bSIsImxlbmd0aCIsInRhYmxlIiwiaXNMb2FkaW5nIiwiU2l6ZSIsImxhcmdlIiwidXBkYXRlSW5pdGlhbERhdGEiLCJDb21wb25lbnQiLCJyb290IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiUmVhY3RET00iLCJyZW5kZXIiLCJkYXRhc2V0Il0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTtR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YyxVQUhmO0FBSUksZ0JBQVEsRUFBRSxLQUFLdEI7QUFKbkIsUUFESixDQVZlLENBVHZCLENBREosZUE4Qkk7QUFBSyxpQkFBUyxFQUFDO0FBQWYsc0JBQ0ksNERBQUMsNkRBQUQsZUFDUSxLQUFLbEIsS0FEYjtBQUVJLHNCQUFjLEVBQUUsd0JBQUNxQyxJQUFELEVBQU9TLEtBQVAsRUFBaUI7QUFBQTs7QUFDN0IsZ0JBQUksQ0FBQzVDLFFBQUwseURBQ0ttQyxJQURMLEVBQ1lTLEtBRFosZ0RBRWNULElBQUksS0FBSyxNQUFULElBQW1CQSxJQUFJLEtBQUssTUFBNUIsR0FBcUMsSUFBckMsR0FBNEMsQ0FGMUQ7QUFJSCxTQVBMO0FBUUkseUJBQWlCLEVBQUUsS0FBSzBCLGlCQVI1QjtBQVNJLHFCQUFhLEVBQUUsdUJBQUNqQixLQUFELEVBQVc7QUFDdEIsZ0JBQUksQ0FBQzVDLFFBQUwsQ0FBYztBQUNWMEQscUJBQVMsRUFBRWQ7QUFERCxXQUFkO0FBR0gsU0FiTDtBQWNJLGVBQU8sRUFBRVosT0FkYjtBQWVJLHFCQUFhLEVBQUUsS0FBS3BCLGFBZnhCO0FBZ0JJLHVCQUFlLEVBQUUsS0FBS0c7QUFoQjFCLFNBREosQ0E5QkosRUFrREtkLElBQUksaUJBQUk7QUFBSyxpQkFBUyxFQUFDO0FBQWYsc0JBQ0w7QUFBSyxpQkFBUyxFQUFDO0FBQWYsc0JBQ0ksNERBQUMsWUFBRCxFQUFrQixLQUFLRSxLQUF2QixDQURKLENBREssQ0FsRGIsQ0FMUixDQURKO0FBZ0VIOzs7O0VBdlBvQjJELGdEOztBQTJQekIsSUFBTUMsSUFBSSxHQUFHQyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBYjtBQUNBQyxpREFBUSxDQUFDQyxNQUFULGVBQWdCLDREQUFDLFVBQUQsRUFBZ0JKLElBQUksQ0FBQ0ssT0FBckIsQ0FBaEIsRUFBaURMLElBQWpELEUiLCJmaWxlIjoid2lkZ2V0X2Zvcm0uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcbiBcdFx0dmFyIGV4ZWN1dGVNb2R1bGVzID0gZGF0YVsyXTtcblxuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcblxuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0XHQvLyBhZGQgZW50cnkgbW9kdWxlcyBmcm9tIGxvYWRlZCBjaHVuayB0byBkZWZlcnJlZCBsaXN0XG4gXHRcdGRlZmVycmVkTW9kdWxlcy5wdXNoLmFwcGx5KGRlZmVycmVkTW9kdWxlcywgZXhlY3V0ZU1vZHVsZXMgfHwgW10pO1xuXG4gXHRcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gYWxsIGNodW5rcyByZWFkeVxuIFx0XHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiBcdH07XG4gXHRmdW5jdGlvbiBjaGVja0RlZmVycmVkTW9kdWxlcygpIHtcbiBcdFx0dmFyIHJlc3VsdDtcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlZmVycmVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBkZWZlcnJlZE1vZHVsZSA9IGRlZmVycmVkTW9kdWxlc1tpXTtcbiBcdFx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcbiBcdFx0XHRmb3IodmFyIGogPSAxOyBqIDwgZGVmZXJyZWRNb2R1bGUubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBkZXBJZCA9IGRlZmVycmVkTW9kdWxlW2pdO1xuIFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2RlcElkXSAhPT0gMCkgZnVsZmlsbGVkID0gZmFsc2U7XG4gXHRcdFx0fVxuIFx0XHRcdGlmKGZ1bGZpbGxlZCkge1xuIFx0XHRcdFx0ZGVmZXJyZWRNb2R1bGVzLnNwbGljZShpLS0sIDEpO1xuIFx0XHRcdFx0cmVzdWx0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBkZWZlcnJlZE1vZHVsZVswXSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0cmV0dXJuIHJlc3VsdDtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBDU1MgY2h1bmtzXG4gXHR2YXIgaW5zdGFsbGVkQ3NzQ2h1bmtzID0ge1xuIFx0XHRcIndpZGdldF9mb3JtXCI6IDBcbiBcdH1cblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuIFx0Ly8gUHJvbWlzZSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdFwid2lkZ2V0X2Zvcm1cIjogMFxuIFx0fTtcblxuIFx0dmFyIGRlZmVycmVkTW9kdWxlcyA9IFtdO1xuXG4gXHQvLyBzY3JpcHQgcGF0aCBmdW5jdGlvblxuIFx0ZnVuY3Rpb24ganNvbnBTY3JpcHRTcmMoY2h1bmtJZCkge1xuIFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArICh7fVtjaHVua0lkXXx8Y2h1bmtJZCkgKyBcIi5qc1wiXG4gXHR9XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuIFx0Ly8gVGhpcyBmaWxlIGNvbnRhaW5zIG9ubHkgdGhlIGVudHJ5IGNodW5rLlxuIFx0Ly8gVGhlIGNodW5rIGxvYWRpbmcgZnVuY3Rpb24gZm9yIGFkZGl0aW9uYWwgY2h1bmtzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmUgPSBmdW5jdGlvbiByZXF1aXJlRW5zdXJlKGNodW5rSWQpIHtcbiBcdFx0dmFyIHByb21pc2VzID0gW107XG5cblxuIFx0XHQvLyBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiBDU1MgbG9hZGluZ1xuIFx0XHR2YXIgY3NzQ2h1bmtzID0ge1wiMFwiOjF9O1xuIFx0XHRpZihpbnN0YWxsZWRDc3NDaHVua3NbY2h1bmtJZF0pIHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ3NzQ2h1bmtzW2NodW5rSWRdKTtcbiBcdFx0ZWxzZSBpZihpbnN0YWxsZWRDc3NDaHVua3NbY2h1bmtJZF0gIT09IDAgJiYgY3NzQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDc3NDaHVua3NbY2h1bmtJZF0gPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRcdHZhciBocmVmID0gXCJcIiArICh7fVtjaHVua0lkXXx8Y2h1bmtJZCkgKyBcIi5jc3NcIjtcbiBcdFx0XHRcdHZhciBmdWxsaHJlZiA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIGhyZWY7XG4gXHRcdFx0XHR2YXIgZXhpc3RpbmdMaW5rVGFncyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwibGlua1wiKTtcbiBcdFx0XHRcdGZvcih2YXIgaSA9IDA7IGkgPCBleGlzdGluZ0xpbmtUYWdzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdHZhciB0YWcgPSBleGlzdGluZ0xpbmtUYWdzW2ldO1xuIFx0XHRcdFx0XHR2YXIgZGF0YUhyZWYgPSB0YWcuZ2V0QXR0cmlidXRlKFwiZGF0YS1ocmVmXCIpIHx8IHRhZy5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpO1xuIFx0XHRcdFx0XHRpZih0YWcucmVsID09PSBcInN0eWxlc2hlZXRcIiAmJiAoZGF0YUhyZWYgPT09IGhyZWYgfHwgZGF0YUhyZWYgPT09IGZ1bGxocmVmKSkgcmV0dXJuIHJlc29sdmUoKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdHZhciBleGlzdGluZ1N0eWxlVGFncyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic3R5bGVcIik7XG4gXHRcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZXhpc3RpbmdTdHlsZVRhZ3MubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0dmFyIHRhZyA9IGV4aXN0aW5nU3R5bGVUYWdzW2ldO1xuIFx0XHRcdFx0XHR2YXIgZGF0YUhyZWYgPSB0YWcuZ2V0QXR0cmlidXRlKFwiZGF0YS1ocmVmXCIpO1xuIFx0XHRcdFx0XHRpZihkYXRhSHJlZiA9PT0gaHJlZiB8fCBkYXRhSHJlZiA9PT0gZnVsbGhyZWYpIHJldHVybiByZXNvbHZlKCk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHR2YXIgbGlua1RhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xuIFx0XHRcdFx0bGlua1RhZy5yZWwgPSBcInN0eWxlc2hlZXRcIjtcbiBcdFx0XHRcdGxpbmtUYWcudHlwZSA9IFwidGV4dC9jc3NcIjtcbiBcdFx0XHRcdGxpbmtUYWcub25sb2FkID0gcmVzb2x2ZTtcbiBcdFx0XHRcdGxpbmtUYWcub25lcnJvciA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gXHRcdFx0XHRcdHZhciByZXF1ZXN0ID0gZXZlbnQgJiYgZXZlbnQudGFyZ2V0ICYmIGV2ZW50LnRhcmdldC5zcmMgfHwgZnVsbGhyZWY7XG4gXHRcdFx0XHRcdHZhciBlcnIgPSBuZXcgRXJyb3IoXCJMb2FkaW5nIENTUyBjaHVuayBcIiArIGNodW5rSWQgKyBcIiBmYWlsZWQuXFxuKFwiICsgcmVxdWVzdCArIFwiKVwiKTtcbiBcdFx0XHRcdFx0ZXJyLnJlcXVlc3QgPSByZXF1ZXN0O1xuIFx0XHRcdFx0XHRyZWplY3QoZXJyKTtcbiBcdFx0XHRcdH07XG4gXHRcdFx0XHRsaW5rVGFnLmhyZWYgPSBmdWxsaHJlZjtcbiBcdFx0XHRcdHZhciBoZWFkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdO1xuIFx0XHRcdFx0aGVhZC5hcHBlbmRDaGlsZChsaW5rVGFnKTtcbiBcdFx0XHR9KS50aGVuKGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0aW5zdGFsbGVkQ3NzQ2h1bmtzW2NodW5rSWRdID0gMDtcbiBcdFx0XHR9KSk7XG4gXHRcdH1cblxuIFx0XHQvLyBKU09OUCBjaHVuayBsb2FkaW5nIGZvciBqYXZhc2NyaXB0XG5cbiBcdFx0dmFyIGluc3RhbGxlZENodW5rRGF0YSA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhICE9PSAwKSB7IC8vIDAgbWVhbnMgXCJhbHJlYWR5IGluc3RhbGxlZFwiLlxuXG4gXHRcdFx0Ly8gYSBQcm9taXNlIG1lYW5zIFwiY3VycmVudGx5IGxvYWRpbmdcIi5cbiBcdFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEpIHtcbiBcdFx0XHRcdHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ2h1bmtEYXRhWzJdKTtcbiBcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0Ly8gc2V0dXAgUHJvbWlzZSBpbiBjaHVuayBjYWNoZVxuIFx0XHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRcdFx0aW5zdGFsbGVkQ2h1bmtEYXRhID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gW3Jlc29sdmUsIHJlamVjdF07XG4gXHRcdFx0XHR9KTtcbiBcdFx0XHRcdHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ2h1bmtEYXRhWzJdID0gcHJvbWlzZSk7XG5cbiBcdFx0XHRcdC8vIHN0YXJ0IGNodW5rIGxvYWRpbmdcbiBcdFx0XHRcdHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiBcdFx0XHRcdHZhciBvblNjcmlwdENvbXBsZXRlO1xuXG4gXHRcdFx0XHRzY3JpcHQuY2hhcnNldCA9ICd1dGYtOCc7XG4gXHRcdFx0XHRzY3JpcHQudGltZW91dCA9IDEyMDtcbiBcdFx0XHRcdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKSB7XG4gXHRcdFx0XHRcdHNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdHNjcmlwdC5zcmMgPSBqc29ucFNjcmlwdFNyYyhjaHVua0lkKTtcblxuIFx0XHRcdFx0Ly8gY3JlYXRlIGVycm9yIGJlZm9yZSBzdGFjayB1bndvdW5kIHRvIGdldCB1c2VmdWwgc3RhY2t0cmFjZSBsYXRlclxuIFx0XHRcdFx0dmFyIGVycm9yID0gbmV3IEVycm9yKCk7XG4gXHRcdFx0XHRvblNjcmlwdENvbXBsZXRlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gXHRcdFx0XHRcdC8vIGF2b2lkIG1lbSBsZWFrcyBpbiBJRS5cbiBcdFx0XHRcdFx0c2NyaXB0Lm9uZXJyb3IgPSBzY3JpcHQub25sb2FkID0gbnVsbDtcbiBcdFx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuIFx0XHRcdFx0XHR2YXIgY2h1bmsgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHRcdFx0XHRcdGlmKGNodW5rICE9PSAwKSB7XG4gXHRcdFx0XHRcdFx0aWYoY2h1bmspIHtcbiBcdFx0XHRcdFx0XHRcdHZhciBlcnJvclR5cGUgPSBldmVudCAmJiAoZXZlbnQudHlwZSA9PT0gJ2xvYWQnID8gJ21pc3NpbmcnIDogZXZlbnQudHlwZSk7XG4gXHRcdFx0XHRcdFx0XHR2YXIgcmVhbFNyYyA9IGV2ZW50ICYmIGV2ZW50LnRhcmdldCAmJiBldmVudC50YXJnZXQuc3JjO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IubWVzc2FnZSA9ICdMb2FkaW5nIGNodW5rICcgKyBjaHVua0lkICsgJyBmYWlsZWQuXFxuKCcgKyBlcnJvclR5cGUgKyAnOiAnICsgcmVhbFNyYyArICcpJztcbiBcdFx0XHRcdFx0XHRcdGVycm9yLm5hbWUgPSAnQ2h1bmtMb2FkRXJyb3InO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IudHlwZSA9IGVycm9yVHlwZTtcbiBcdFx0XHRcdFx0XHRcdGVycm9yLnJlcXVlc3QgPSByZWFsU3JjO1xuIFx0XHRcdFx0XHRcdFx0Y2h1bmtbMV0oZXJyb3IpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSB1bmRlZmluZWQ7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH07XG4gXHRcdFx0XHR2YXIgdGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiBcdFx0XHRcdFx0b25TY3JpcHRDb21wbGV0ZSh7IHR5cGU6ICd0aW1lb3V0JywgdGFyZ2V0OiBzY3JpcHQgfSk7XG4gXHRcdFx0XHR9LCAxMjAwMDApO1xuIFx0XHRcdFx0c2NyaXB0Lm9uZXJyb3IgPSBzY3JpcHQub25sb2FkID0gb25TY3JpcHRDb21wbGV0ZTtcbiBcdFx0XHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0cmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbiBcdH07XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvYXNzZXRzL1wiO1xuXG4gXHQvLyBvbiBlcnJvciBmdW5jdGlvbiBmb3IgYXN5bmMgbG9hZGluZ1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vZSA9IGZ1bmN0aW9uKGVycikgeyBjb25zb2xlLmVycm9yKGVycik7IHRocm93IGVycjsgfTtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIGFkZCBlbnRyeSBtb2R1bGUgdG8gZGVmZXJyZWQgbGlzdFxuIFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2goW1wiLi9hc3NldHMvanMvcGFnZXMvd2lkZ2V0L2Zvcm0uanNcIixcInZlbmRvcnN+YWxlcnRzX2Zvcm1+YWxlcnRzX2xpc3R+Y29udGVudC1oZWFkZXJ+ZGFzaGJvYXJkLXBhZ2V+ZGFzaGJvYXJkX2Zvcm1+ZGFzaGJvYXJkX2xpc3R+ZGF0YWJhc2V+YWQ2YTI3N2JcIixcInZlbmRvcnN+YWxlcnRzX2Zvcm1+YWxlcnRzX2xpc3R+YXBwfmRhc2hib2FyZC1wYWdlfmRhc2hib2FyZF9mb3JtfmRhc2hib2FyZF9saXN0fmRhdGFiYXNlX2Zvcm1+ZGF0YWJ+N2RmNzZiN2JcIixcInZlbmRvcnN+YWxlcnRzX2Zvcm1+YWxlcnRzX2xpc3R+ZGFzaGJvYXJkLXBhZ2V+ZGFzaGJvYXJkX2Zvcm1+ZGFzaGJvYXJkX2xpc3R+ZGF0YWJhc2VfZm9ybX5kYXRhYmFzZV9+YTBjNWVkYzBcIixcImFsZXJ0c19mb3JtfmFsZXJ0c19saXN0fmRhc2hib2FyZC1wYWdlfmRhc2hib2FyZF9mb3JtfmRhc2hib2FyZF9saXN0fmRhdGFiYXNlX2Zvcm1+ZGF0YWJhc2VfdGFibGVzfmV+OTY3NTViNjRcIl0pO1xuIFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiByZWFkeVxuIFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4iLCJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IHtEb3VnaG51dFBpZUNoYXJ0LCBTaXplLCBXaWRnZXRNYW5hZ2VtZW50fSBmcm9tIFwiLi4vLi4vY29tcG9uZW50c1wiO1xuaW1wb3J0IHtXSURHRVRfVFlQRX0gZnJvbSBcIi4uLy4uL3V0aWxzXCI7XG5pbXBvcnQge0NvdW50ZXJTdW19IGZyb20gXCIuLi8uLi9jb21wb25lbnRzL3dpZGdldC9fY291bnRlci1zdW1cIjtcbmltcG9ydCB7V2lkZ2V0VGFibGV9IGZyb20gXCIuLi8uLi9jb21wb25lbnRzL3dpZGdldC9fd2lkZ2V0LXRhYmxlXCI7XG5pbXBvcnQge0FsZXJ0LCBXaWRnZXRBY3Rpb25zfSBmcm9tIFwiLi4vLi4vYWN0aW9uc1wiO1xuaW1wb3J0IHtJbnB1dH0gZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvX2lucHV0XCI7XG5pbXBvcnQge01vZGFsfSBmcm9tIFwiLi4vLi4vY29tcG9uZW50cy9fbW9kYWxcIjtcbmltcG9ydCB7TGluZUJhckNoYXJ0fSBmcm9tIFwiLi4vLi4vY29tcG9uZW50cy93aWRnZXQvX2xpbmUtYmFyLWNoYXJ0XCI7XG5cbmNvbnN0IFNBTVBMRV9EQVRBID0gW1xuICAgIHtcbiAgICAgICAgXCJsYWJlbFwiOiBcIkJlcmdvb1wiLFxuICAgICAgICBcInZhbHVlXCI6IDkzMVxuICAgIH0sXG4gICAge1xuICAgICAgICBcImxhYmVsXCI6IFwiQ2FybG9zXCIsXG4gICAgICAgIFwidmFsdWVcIjogMjk2XG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwibGFiZWxcIjogXCJHcm92ZXZpbGxlXCIsXG4gICAgICAgIFwidmFsdWVcIjogNTg3XG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwibGFiZWxcIjogXCJDYXJyaXpvXCIsXG4gICAgICAgIFwidmFsdWVcIjogNjQ1XG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwibGFiZWxcIjogXCJCcm9hZGxhbmRzXCIsXG4gICAgICAgIFwidmFsdWVcIjogNTgxXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwibGFiZWxcIjogXCJKZW5uaW5nc1wiLFxuICAgICAgICBcInZhbHVlXCI6IDIzNFxuICAgIH0sXG4gICAge1xuICAgICAgICBcImxhYmVsXCI6IFwiV2hpdGVzdG9uZVwiLFxuICAgICAgICBcInZhbHVlXCI6IDM1MFxuICAgIH0sXG4gICAge1xuICAgICAgICBcImxhYmVsXCI6IFwiSGFyYm9ydG9uXCIsXG4gICAgICAgIFwidmFsdWVcIjogNTQ1XG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwibGFiZWxcIjogXCJTcGVsdGVyXCIsXG4gICAgICAgIFwidmFsdWVcIjogMTc4XG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwibGFiZWxcIjogXCJTdG9ja3dlbGxcIixcbiAgICAgICAgXCJ2YWx1ZVwiOiAxOTlcbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJsYWJlbFwiOiBcIk9jZW9sYVwiLFxuICAgICAgICBcInZhbHVlXCI6IDYzNlxuICAgIH0sXG4gICAge1xuICAgICAgICBcImxhYmVsXCI6IFwiQmx1ZmZ2aWV3XCIsXG4gICAgICAgIFwidmFsdWVcIjogODQwXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwibGFiZWxcIjogXCJPbGV5XCIsXG4gICAgICAgIFwidmFsdWVcIjogOTQyXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwibGFiZWxcIjogXCJTdGFwbGVzXCIsXG4gICAgICAgIFwidmFsdWVcIjogOTk0XG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwibGFiZWxcIjogXCJFbWlzb25cIixcbiAgICAgICAgXCJ2YWx1ZVwiOiA4NzZcbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJsYWJlbFwiOiBcIkN1eWxlcnZpbGxlXCIsXG4gICAgICAgIFwidmFsdWVcIjogNjkwXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwibGFiZWxcIjogXCJTYXJhbmFwXCIsXG4gICAgICAgIFwidmFsdWVcIjogMTg4XG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwibGFiZWxcIjogXCJTYW5ib3JuXCIsXG4gICAgICAgIFwidmFsdWVcIjogMTA2XG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwibGFiZWxcIjogXCJUaWJiaWVcIixcbiAgICAgICAgXCJ2YWx1ZVwiOiAyMjlcbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJsYWJlbFwiOiBcIkJhc2NvbVwiLFxuICAgICAgICBcInZhbHVlXCI6IDE0NFxuICAgIH1cbl07XG5cbmNsYXNzIFdpZGdldFBhZ2UgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcblxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgdHlwZTogJycsXG4gICAgICAgICAgICB0aXRsZTogJycsXG4gICAgICAgICAgICBzaXplOiAnJyxcbiAgICAgICAgICAgIGNvbHVtbjogJycsXG4gICAgICAgICAgICBzaG93UXVlcnlNb2RhbDogZmFsc2UsXG4gICAgICAgICAgICBxdWVyeU1vZGFsUXVlcnk6IHt9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNvbG9yID0gU0FNUExFX0RBVEEubWFwKCgpID0+IHRoaXMuZ2V0UmFuZG9tQ29sb3IoKSk7XG4gICAgICAgIHRoaXMub25TdWJtaXRRdWVyeSA9IHRoaXMub25TdWJtaXRRdWVyeS5iaW5kKHRoaXMpXG4gICAgICAgIHRoaXMub25RdWVyeVNhdmUgPSB0aGlzLm9uUXVlcnlTYXZlLmJpbmQodGhpcylcbiAgICAgICAgdGhpcy5vbkRlbGV0ZVF1ZXJ5ID0gdGhpcy5vbkRlbGV0ZVF1ZXJ5LmJpbmQodGhpcylcbiAgICAgICAgdGhpcy5vblF1ZXJ5TW9kZWxDaGFuZ2UgPSB0aGlzLm9uUXVlcnlNb2RlbENoYW5nZS5iaW5kKHRoaXMpXG4gICAgICAgIHRoaXMuaGlkZVF1ZXJ5TW9kYWwgPSB0aGlzLmhpZGVRdWVyeU1vZGFsLmJpbmQodGhpcylcbiAgICAgICAgdGhpcy5sb2FkUXVlcmllcyA9IHRoaXMubG9hZFF1ZXJpZXMuYmluZCh0aGlzKVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLmxvYWRRdWVyaWVzKClcbiAgICB9XG5cbiAgICBnZXRSYW5kb21Db2xvcigpIHtcbiAgICAgICAgY29uc3QgbGV0dGVycyA9ICcwMTIzNDU2Nzg5QUJDREVGJztcbiAgICAgICAgbGV0IGNvbG9yID0gJyMnO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDY7IGkrKykge1xuICAgICAgICAgICAgY29sb3IgKz0gbGV0dGVyc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxNildO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb2xvcjtcbiAgICB9XG5cbiAgICB1cGRhdGVJbml0aWFsRGF0YSA9IChpbml0aWFsRGF0YSkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIC4uLmluaXRpYWxEYXRhLFxuICAgICAgICAgICAgdHlwZTogaW5pdGlhbERhdGEudHlwZS50b1N0cmluZygpXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgb25TdWJtaXRRdWVyeShxdWVyeSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHNob3dRdWVyeU1vZGFsOiB0cnVlLFxuICAgICAgICAgICAgcXVlcnlNb2RhbFF1ZXJ5OiBxdWVyeVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGxvYWRRdWVyaWVzKCkge1xuICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcblxuICAgICAgICBXaWRnZXRBY3Rpb25zLmdldFF1ZXJpZXMoKVxuICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB7ZXJyb3IsIGRhdGF9ID0gcmVzO1xuICAgICAgICAgICAgICAgIGlmIChlcnJvciA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGF0LnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJpZXM6IGRhdGFcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvblF1ZXJ5U2F2ZSgpIHtcbiAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XG4gICAgICAgIGxldCB7cXVlcnlNb2RhbFF1ZXJ5fSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGlmICgkLnRyaW0ocXVlcnlNb2RhbFF1ZXJ5Lm5hbWUpID09PSAnJykge1xuICAgICAgICAgICAgQWxlcnQuZXJyb3IoJ1F1ZXJ5IG5hbWUgc2hvdWxkIG5vdCBiZSBibGFuaycpO1xuICAgICAgICAgICAgcXVlcnlNb2RhbFF1ZXJ5Lm5hbWVDbGFzcyA9ICdpcy1pbnZhbGlkJztcbiAgICAgICAgICAgIHRoYXQuc2V0U3RhdGUoe3F1ZXJ5TW9kYWxRdWVyeX0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHF1ZXJ5TW9kYWxRdWVyeS5uYW1lQ2xhc3MgPSAnJztcbiAgICAgICAgaWYgKCQudHJpbShxdWVyeU1vZGFsUXVlcnkubmFtZSkgPT09ICcnIHx8ICQudHJpbShxdWVyeU1vZGFsUXVlcnkucXVlcnkpID09PSAnJykge1xuICAgICAgICAgICAgQWxlcnQuZXJyb3IoJ1F1ZXJ5IHNob3VsZCBub3QgYmUgYmxhbmsnKTtcbiAgICAgICAgICAgIHF1ZXJ5TW9kYWxRdWVyeS5xdWVyeUNsYXNzID0gJ2lzLWludmFsaWQnO1xuICAgICAgICAgICAgdGhhdC5zZXRTdGF0ZSh7cXVlcnlNb2RhbFF1ZXJ5fSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgcXVlcnlNb2RhbFF1ZXJ5LnF1ZXJ5Q2xhc3MgPSAnJztcbiAgICAgICAgdGhhdC5zZXRTdGF0ZSh7cXVlcnlNb2RhbFF1ZXJ5fSk7XG5cbiAgICAgICAgV2lkZ2V0QWN0aW9ucy5zYXZlUXVlcmllcyhxdWVyeU1vZGFsUXVlcnkuaWQsIHF1ZXJ5TW9kYWxRdWVyeSlcbiAgICAgICAgICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qge2Vycm9yfSA9IHJlcztcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkUXVlcmllcygpXG5cbiAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBxdWVyeU1vZGFsUXVlcnk6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgc2hvd1F1ZXJ5TW9kYWw6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgfVxuXG4gICAgb25EZWxldGVRdWVyeShxdWVyeSkge1xuICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcbiAgICAgICAgV2lkZ2V0QWN0aW9ucy5kZWxldGVRdWVyaWVzKHF1ZXJ5LmlkKVxuICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB7ZXJyb3J9ID0gcmVzO1xuICAgICAgICAgICAgICAgIGlmIChlcnJvciA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRRdWVyaWVzKClcblxuICAgICAgICAgICAgICAgICAgICB0aGF0LnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3dRdWVyeU1vZGFsOiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgfVxuXG4gICAgb25RdWVyeU1vZGVsQ2hhbmdlKGUpIHtcbiAgICAgICAgbGV0IHtxdWVyeU1vZGFsUXVlcnl9ID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgcXVlcnlNb2RhbFF1ZXJ5W2UudGFyZ2V0Lm5hbWVdID0gZS50YXJnZXQudmFsdWU7XG4gICAgICAgIHF1ZXJ5TW9kYWxRdWVyeVtlLnRhcmdldC5uYW1lICsgJ0NsYXNzJ10gPSBlLnRhcmdldC52YWx1ZSA9PT0gJycgPyAnaXMtaW52YWxpZCcgOiAnJztcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7cXVlcnlNb2RhbFF1ZXJ5fSk7XG4gICAgfVxuXG4gICAgaGlkZVF1ZXJ5TW9kYWwoKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgc2hvd1F1ZXJ5TW9kYWw6IGZhbHNlXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCBXaWRnZXRMYXlvdXQgPSAoe3R5cGUsIHRpdGxlLCBzaXplLCBjb2x1bW4sIGR1cmF0aW9ufSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZGF0YVdpZGdldCA9IFNBTVBMRV9EQVRBLnNsaWNlKDAsIHNpemUpO1xuICAgICAgICAgICAgY29uc3QgY29sb3IgPSB0aGlzLmNvbG9yLnNsaWNlKDAsIHNpemUpO1xuICAgICAgICAgICAgbGV0IGNvbXBvbmVudDtcbiAgICAgICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgV0lER0VUX1RZUEUuZG91Z2hudXQ6XG4gICAgICAgICAgICAgICAgY2FzZSBXSURHRVRfVFlQRS5waWU6IHtcbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50ID0gPERvdWdobnV0UGllQ2hhcnRcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkPSduZXcnXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPXt0eXBlfVxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0SGVhZGVyPXt0aXRsZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE9e2RhdGFXaWRnZXR9XG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ9JzUwMCdcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pbkhlaWdodD0nNTAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb249e2R1cmF0aW9ufVxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I9e2NvbG9yfVxuICAgICAgICAgICAgICAgICAgICAvPjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhc2UgV0lER0VUX1RZUEUuYmFyOlxuICAgICAgICAgICAgICAgIGNhc2UgV0lER0VUX1RZUEUubGluZToge1xuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnQgPSA8TGluZUJhckNoYXJ0XG4gICAgICAgICAgICAgICAgICAgICAgICBpZD0nbmV3J1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT17dHlwZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldEhlYWRlcj17dGl0bGV9XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhPXtkYXRhV2lkZ2V0fVxuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0PSc1MDAnXG4gICAgICAgICAgICAgICAgICAgICAgICBtaW5IZWlnaHQ9JzUwMCdcbiAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uPXtkdXJhdGlvbn1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yPXtjb2xvcn1cbiAgICAgICAgICAgICAgICAgICAgLz47XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXNlIFdJREdFVF9UWVBFLmNvdW50ZXJTdW06IHtcbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50ID0gPENvdW50ZXJTdW1cbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE9e2RhdGFXaWRnZXQubGVuZ3RofVxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0SGVhZGVyPXt0aXRsZX1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhc2UgV0lER0VUX1RZUEUudGFibGU6IHtcbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50ID0gPFdpZGdldFRhYmxlXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2RhdGFXaWRnZXR9XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhPXtkYXRhV2lkZ2V0fVxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0SGVhZGVyPXt0aXRsZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbj17Y29sdW1ufVxuICAgICAgICAgICAgICAgICAgICAgICAgaXNEYXNoYm9hcmRDb21wb25lbnQ9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjb21wb25lbnQ7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB7dHlwZSwgc2hvd1F1ZXJ5TW9kYWwsIHF1ZXJ5TW9kYWxRdWVyeSwgcXVlcmllc30gPSB0aGlzLnN0YXRlO1xuXG4gICAgICAgIGNvbnN0IHtxdWVyeSwgbmFtZSwgbmFtZUNsYXNzID0gJycsIHF1ZXJ5Q2xhc3MgPSAnJ30gPSBxdWVyeU1vZGFsUXVlcnk7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAge3RoaXMuc3RhdGUuaXNMb2FkaW5nID9cbiAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInNwaW5uZXItYm9yZGVyIHNwaW5uZXItYm9yZGVyLXNtIG1lLTJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgcm9sZT1cInN0YXR1c1wiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj4gOlxuICAgICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICAgICAgPE1vZGFsIHRpdGxlPXsnUXVlcnknfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkPXsncXVlcnknfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpemU9e1NpemUubGFyZ2V9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2F2ZUJ1dHRvblRpdGxlPXsnU2F2ZSd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd1NhdmVCdXR0b249e3RydWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvdz17c2hvd1F1ZXJ5TW9kYWx9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2F2ZUJ1dHRvbkFjdGlvbj17dGhpcy5vblF1ZXJ5U2F2ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZUJ1dHRvbkFjdGlvbj17dGhpcy5oaWRlUXVlcnlNb2RhbH1cbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7c2hvd1F1ZXJ5TW9kYWwgJiYgPGRpdiBjbGFzc05hbWU9J3Jvdyc+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2wtMTInPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPElucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZT0nbmFtZSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj0nUXVlcnkgbmFtZSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU9e25hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtuYW1lQ2xhc3N9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25RdWVyeU1vZGVsQ2hhbmdlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2wtMTIgbXQtMyc+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8SW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lPSdxdWVyeSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU9e3F1ZXJ5fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17cXVlcnlDbGFzc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vblF1ZXJ5TW9kZWxDaGFuZ2V9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj59XG4gICAgICAgICAgICAgICAgICAgICAgICA8L01vZGFsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCIgY29sLTEyIGNvbC1tZC00XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFdpZGdldE1hbmFnZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uVXBkYXRlV2lkZ2V0PXsobmFtZSwgdmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuYW1lXTogdmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IG5hbWUgPT09ICd0eXBlJyB8fCBuYW1lID09PSAnc2l6ZScgPyAxMDAwIDogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZUluaXRpYWxEYXRhPXt0aGlzLnVwZGF0ZUluaXRpYWxEYXRhfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVMb2FkaW5nPXsodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzTG9hZGluZzogdmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWVyaWVzPXtxdWVyaWVzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblNhdmVDbGlja2VkPXt0aGlzLm9uU3VibWl0UXVlcnl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRGVsZXRlQ0xpY2tlZD17dGhpcy5vbkRlbGV0ZVF1ZXJ5fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt0eXBlICYmIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0IGNvbC0xMiBjb2wtbWQtOFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZCBwYi01XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxXaWRnZXRMYXlvdXQgey4uLnRoaXMuc3RhdGV9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj59XG4gICAgICAgICAgICAgICAgICAgIDwvPn1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5jb25zdCByb290ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Jvb3QnKTtcblJlYWN0RE9NLnJlbmRlcig8V2lkZ2V0UGFnZSB7Li4ucm9vdC5kYXRhc2V0fS8+LCByb290KTtcbiJdLCJzb3VyY2VSb290IjoiIn0=