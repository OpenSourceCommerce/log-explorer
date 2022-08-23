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
/******/ 		"user_list": 0
/******/ 	}
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"user_list": 0
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
/******/ 	deferredModules.push(["./assets/js/pages/user/list.js","vendors~alerts_list~app~dashboard-page~dashboard_empty~dashboard_form~export_list~flot_chart~graph_f~fed29054","vendors~alerts_list~dashboard-page~dashboard_empty~dashboard_form~export_list~flot_chart~graph_form~~fe102de6","alerts_list~dashboard-page~dashboard_empty~dashboard_form~export_list~flot_chart~graph_form~graph_li~f320c34b"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/js/pages/user/form.js":
/*!**************************************!*\
  !*** ./assets/js/pages/user/form.js ***!
  \**************************************/
/*! exports provided: UserForm */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserForm", function() { return UserForm; });
/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.symbol */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.symbol.description */ "./node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator */ "./node_modules/core-js/modules/es.symbol.iterator.js");
/* harmony import */ var core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.filter */ "./node_modules/core-js/modules/es.array.filter.js");
/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.array.for-each */ "./node_modules/core-js/modules/es.array.for-each.js");
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_array_from__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.array.from */ "./node_modules/core-js/modules/es.array.from.js");
/* harmony import */ var core_js_modules_es_array_from__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_from__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_array_includes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.array.includes */ "./node_modules/core-js/modules/es.array.includes.js");
/* harmony import */ var core_js_modules_es_array_includes__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_includes__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_array_is_array__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.array.is-array */ "./node_modules/core-js/modules/es.array.is-array.js");
/* harmony import */ var core_js_modules_es_array_is_array__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_is_array__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.array.iterator */ "./node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_array_slice__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.array.slice */ "./node_modules/core-js/modules/es.array.slice.js");
/* harmony import */ var core_js_modules_es_array_slice__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_slice__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_date_to_string__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.date.to-string */ "./node_modules/core-js/modules/es.date.to-string.js");
/* harmony import */ var core_js_modules_es_date_to_string__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_date_to_string__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/es.function.name */ "./node_modules/core-js/modules/es.function.name.js");
/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_es_object_create__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! core-js/modules/es.object.create */ "./node_modules/core-js/modules/es.object.create.js");
/* harmony import */ var core_js_modules_es_object_create__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_create__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var core_js_modules_es_object_define_properties__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! core-js/modules/es.object.define-properties */ "./node_modules/core-js/modules/es.object.define-properties.js");
/* harmony import */ var core_js_modules_es_object_define_properties__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_define_properties__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var core_js_modules_es_object_define_property__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! core-js/modules/es.object.define-property */ "./node_modules/core-js/modules/es.object.define-property.js");
/* harmony import */ var core_js_modules_es_object_define_property__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_define_property__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptor */ "./node_modules/core-js/modules/es.object.get-own-property-descriptor.js");
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptors */ "./node_modules/core-js/modules/es.object.get-own-property-descriptors.js");
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var core_js_modules_es_object_get_prototype_of__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! core-js/modules/es.object.get-prototype-of */ "./node_modules/core-js/modules/es.object.get-prototype-of.js");
/* harmony import */ var core_js_modules_es_object_get_prototype_of__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_prototype_of__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! core-js/modules/es.object.keys */ "./node_modules/core-js/modules/es.object.keys.js");
/* harmony import */ var core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var core_js_modules_es_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! core-js/modules/es.object.set-prototype-of */ "./node_modules/core-js/modules/es.object.set-prototype-of.js");
/* harmony import */ var core_js_modules_es_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var core_js_modules_es_parse_int__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! core-js/modules/es.parse-int */ "./node_modules/core-js/modules/es.parse-int.js");
/* harmony import */ var core_js_modules_es_parse_int__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_parse_int__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! core-js/modules/es.promise */ "./node_modules/core-js/modules/es.promise.js");
/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var core_js_modules_es_reflect_construct__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! core-js/modules/es.reflect.construct */ "./node_modules/core-js/modules/es.reflect.construct.js");
/* harmony import */ var core_js_modules_es_reflect_construct__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_reflect_construct__WEBPACK_IMPORTED_MODULE_23__);
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






























function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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




var MANDATORY_FIELDS = ["firstName", "lastName", "email"];
var DEFAULT_USER = {
  id: null,
  firstName: "",
  lastName: "",
  email: "",
  isAdmin: false
};
var UserForm = /*#__PURE__*/function (_Component) {
  _inherits(UserForm, _Component);

  var _super = _createSuper(UserForm);

  function UserForm(props) {
    var _this;

    _classCallCheck(this, UserForm);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "onChangeField", function (_ref) {
      var name = _ref.name,
          value = _ref.value;

      _this.setState(function (preState) {
        var user = preState.user,
            errors = preState.errors;

        var newErrorArr = _toConsumableArray(errors);

        if (MANDATORY_FIELDS.includes(name)) {
          newErrorArr = newErrorArr.filter(function (el) {
            return el !== name;
          });
          if (!value) newErrorArr.push(name);
        }

        return {
          user: _objectSpread(_objectSpread({}, user), {}, _defineProperty({}, name, value)),
          errors: newErrorArr,
          errorMessageRes: null
        };
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onSubmit", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var user, onFinishEditUser, newErrorArr, id, firstName, lastName, email, isAdmin, userPayload, errorRes, res, error, message, isUpdateUser;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              user = _this.state.user;
              onFinishEditUser = _this.props.onFinishEditUser;
              newErrorArr = MANDATORY_FIELDS.filter(function (el) {
                if (!user[el]) return true;
                return false;
              });

              if (!(newErrorArr && newErrorArr.length > 0)) {
                _context.next = 6;
                break;
              }

              _this.setState({
                errors: newErrorArr
              });

              return _context.abrupt("return");

            case 6:
              id = user.id, firstName = user.firstName, lastName = user.lastName, email = user.email, isAdmin = user.isAdmin;
              userPayload = {
                first_name: firstName,
                last_name: lastName,
                email: email,
                is_admin: isAdmin ? 1 : 0
              };
              errorRes = null;

              _this.setState({
                isLoading: true
              });

              _context.prev = 10;
              _context.next = 13;
              return _actions__WEBPACK_IMPORTED_MODULE_31__["UserActions"].createOrUpdate(id, userPayload);

            case 13:
              res = _context.sent;
              error = res.error, message = res.message;
              isUpdateUser = parseInt(id) >= 0;

              if (error) {
                _context.next = 19;
                break;
              }

              onFinishEditUser(user, isUpdateUser);
              return _context.abrupt("return");

            case 19:
              errorRes = message ? message : "".concat(isUpdateUser ? "Update" : "Create", " user failed");
              _context.next = 25;
              break;

            case 22:
              _context.prev = 22;
              _context.t0 = _context["catch"](10);
              errorRes = _context.t0.message;

            case 25:
              _context.prev = 25;

              _this.setState({
                isLoading: false
              });

              return _context.finish(25);

            case 28:
              if (errorRes) {
                _this.setState({
                  errorMessageRes: errorRes
                });
              }

            case 29:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[10, 22, 25, 28]]);
    })));

    _this.state = {
      user: DEFAULT_USER,
      userPosition: null,
      errors: [],
      errorMessageRes: null,
      isLoading: false
    };
    return _this;
  }

  _createClass(UserForm, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state = this.state,
          isLoading = _this$state.isLoading,
          errors = _this$state.errors,
          user = _this$state.user,
          errorMessageRes = _this$state.errorMessageRes;
      var id = user.id,
          firstName = user.firstName,
          lastName = user.lastName,
          email = user.email,
          isAdmin = user.isAdmin;
      var _this$props = this.props,
          _onHidden = _this$props.onHidden,
          isShow = _this$props.isShow;
      var isUpdateUser = parseInt(id) >= 0;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_29___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_30__["Modal"], {
        id: "update-user-".concat(id),
        size: _components__WEBPACK_IMPORTED_MODULE_30__["Size"].medium,
        title: "".concat(isUpdateUser ? "Update" : "Create new", " user"),
        showCloseButton: false,
        show: isShow,
        isPositionCenter: true,
        onHidden: function onHidden() {
          _onHidden();

          _this2.setState({
            user: DEFAULT_USER,
            errors: []
          });
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_29___default.a.createElement("form", {
        role: "form",
        className: "mx-4"
      }, errorMessageRes && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_29___default.a.createElement("div", {
        className: "alert alert-danger"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_29___default.a.createElement("div", {
        className: "alert-message"
      }, errorMessageRes)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_29___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_30__["FormField"], {
        className: "mb-3",
        label: "First name",
        value: firstName,
        placeholder: "First name",
        fieldName: "firstName",
        onChange: function onChange(e) {
          return _this2.onChangeField(e.target);
        },
        isMandatory: MANDATORY_FIELDS.includes("firstName"),
        errors: errors
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_29___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_30__["FormField"], {
        className: "mb-3",
        label: "Last name",
        value: lastName,
        placeholder: "Last name",
        fieldName: "lastName",
        onChange: function onChange(e) {
          return _this2.onChangeField(e.target);
        },
        isMandatory: MANDATORY_FIELDS.includes("lastName"),
        errors: errors
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_29___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_30__["FormField"], {
        className: "mb-3",
        label: "E-mail",
        value: email,
        placeholder: "E-mail",
        fieldName: "email",
        onChange: function onChange(e) {
          return _this2.onChangeField(e.target);
        },
        isMandatory: MANDATORY_FIELDS.includes("email"),
        errors: errors
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_29___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_30__["FormField"], {
        id: "isAdmin",
        className: "mb-3",
        label: "Role",
        type: "checkbox",
        checkboxlabel: "Is Admin",
        checked: isAdmin,
        fieldName: "isAdmin",
        onChange: function onChange(e) {
          var target = e.target;

          _this2.onChangeField({
            name: target.name,
            value: target.checked
          });
        },
        isMandatory: MANDATORY_FIELDS.includes("isAdmin"),
        errors: errors
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_29___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_30__["Button"], {
        className: "btn-block w-100 my-3",
        color: _components__WEBPACK_IMPORTED_MODULE_30__["Colors"].blue,
        onClick: function onClick() {
          return _this2.onSubmit();
        },
        isLoading: isLoading,
        disabled: Object.keys(errors).length > 0 || errorMessageRes
      }, "".concat(isUpdateUser ? "Update" : "Create", " User"))));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      var userPosition = state.userPosition,
          user = state.user,
          errors = state.errors;
      var indexUserSelected = props.indexUserSelected,
          users = props.users;

      var newUser = _objectSpread({}, user);

      var position = indexUserSelected;

      var newErrors = _toConsumableArray(errors);

      if (indexUserSelected !== userPosition) {
        if (indexUserSelected === null) {
          newUser = DEFAULT_USER;
        } else {
          var _users$indexUserSelec = users[indexUserSelected],
              id = _users$indexUserSelec.id,
              first_name = _users$indexUserSelec.first_name,
              last_name = _users$indexUserSelec.last_name,
              email = _users$indexUserSelec.email,
              is_admin = _users$indexUserSelec.is_admin;
          newUser = {
            id: id,
            firstName: first_name,
            lastName: last_name,
            email: email,
            isAdmin: is_admin == 1
          };
        }

        newErrors = [];
      }

      return {
        user: _objectSpread({}, newUser),
        userPosition: position,
        errors: newErrors
      };
    }
  }]);

  return UserForm;
}(react__WEBPACK_IMPORTED_MODULE_29__["Component"]);

/***/ }),

/***/ "./assets/js/pages/user/list.js":
/*!**************************************!*\
  !*** ./assets/js/pages/user/list.js ***!
  \**************************************/
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
/* harmony import */ var core_js_modules_es_array_from__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.array.from */ "./node_modules/core-js/modules/es.array.from.js");
/* harmony import */ var core_js_modules_es_array_from__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_from__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_array_is_array__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.array.is-array */ "./node_modules/core-js/modules/es.array.is-array.js");
/* harmony import */ var core_js_modules_es_array_is_array__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_is_array__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.array.iterator */ "./node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_array_slice__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.array.slice */ "./node_modules/core-js/modules/es.array.slice.js");
/* harmony import */ var core_js_modules_es_array_slice__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_slice__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_array_splice__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.array.splice */ "./node_modules/core-js/modules/es.array.splice.js");
/* harmony import */ var core_js_modules_es_array_splice__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_splice__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_date_to_string__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.date.to-string */ "./node_modules/core-js/modules/es.date.to-string.js");
/* harmony import */ var core_js_modules_es_date_to_string__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_date_to_string__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.function.name */ "./node_modules/core-js/modules/es.function.name.js");
/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es_object_create__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/es.object.create */ "./node_modules/core-js/modules/es.object.create.js");
/* harmony import */ var core_js_modules_es_object_create__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_create__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_es_object_define_property__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! core-js/modules/es.object.define-property */ "./node_modules/core-js/modules/es.object.define-property.js");
/* harmony import */ var core_js_modules_es_object_define_property__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_define_property__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var core_js_modules_es_object_get_prototype_of__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! core-js/modules/es.object.get-prototype-of */ "./node_modules/core-js/modules/es.object.get-prototype-of.js");
/* harmony import */ var core_js_modules_es_object_get_prototype_of__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_prototype_of__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var core_js_modules_es_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! core-js/modules/es.object.set-prototype-of */ "./node_modules/core-js/modules/es.object.set-prototype-of.js");
/* harmony import */ var core_js_modules_es_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var core_js_modules_es_parse_int__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! core-js/modules/es.parse-int */ "./node_modules/core-js/modules/es.parse-int.js");
/* harmony import */ var core_js_modules_es_parse_int__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_parse_int__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! core-js/modules/es.promise */ "./node_modules/core-js/modules/es.promise.js");
/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var core_js_modules_es_promise_finally__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! core-js/modules/es.promise.finally */ "./node_modules/core-js/modules/es.promise.finally.js");
/* harmony import */ var core_js_modules_es_promise_finally__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise_finally__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var core_js_modules_es_reflect_construct__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! core-js/modules/es.reflect.construct */ "./node_modules/core-js/modules/es.reflect.construct.js");
/* harmony import */ var core_js_modules_es_reflect_construct__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_reflect_construct__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! core-js/modules/es.regexp.to-string */ "./node_modules/core-js/modules/es.regexp.to-string.js");
/* harmony import */ var core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! core-js/modules/es.string.iterator */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var core_js_modules_web_timers__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! core-js/modules/web.timers */ "./node_modules/core-js/modules/web.timers.js");
/* harmony import */ var core_js_modules_web_timers__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_timers__WEBPACK_IMPORTED_MODULE_23__);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! regenerator-runtime/runtime */ "./node_modules/regenerator-runtime/runtime.js");
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_24___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_24__);
/* harmony import */ var _nextcloud_event_bus__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @nextcloud/event-bus */ "./node_modules/@nextcloud/event-bus/dist/index.js");
/* harmony import */ var _nextcloud_event_bus__WEBPACK_IMPORTED_MODULE_25___default = /*#__PURE__*/__webpack_require__.n(_nextcloud_event_bus__WEBPACK_IMPORTED_MODULE_25__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_26___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_26__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_27___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_27__);
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ../../actions */ "./assets/js/actions/index.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ../../components */ "./assets/js/components/index.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ../../utils */ "./assets/js/utils.js");
/* harmony import */ var _form__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./form */ "./assets/js/pages/user/form.js");


























function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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








var INDEX_CURRENT_USER = 0;
var ADMIN_VALUE = 1;
var USER_VALUE = 0;

var UserList = /*#__PURE__*/function (_Component) {
  _inherits(UserList, _Component);

  var _super = _createSuper(UserList);

  function UserList(props) {
    var _this;

    _classCallCheck(this, UserList);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "loadData", function () {
      _this.setState({
        isLoading: true
      });

      _actions__WEBPACK_IMPORTED_MODULE_28__["UserActions"].getAllUser().then(function (res) {
        var error = res.error,
            data = res.data;

        if (error) {
          return;
        }

        _this.setState({
          users: data,
          isLoading: false
        });
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onChangeStatus", function (key, newValue) {
      if (key === INDEX_CURRENT_USER) {
        return;
      }

      var users = _this.state.users;

      var userData = _toConsumableArray(users);

      var id = userData[key].id;
      var newStatus = newValue ? ADMIN_VALUE : USER_VALUE;
      userData[key].is_active = newStatus;
      setTimeout(function () {
        _this.setState({
          isLoading: true,
          indexRowUpdated: key
        });

        var toastContent = {};
        _actions__WEBPACK_IMPORTED_MODULE_28__["UserActions"].setStatus(id, {
          is_active: newStatus
        }).then(function (res) {
          var error = res.error;
          var strMessage = newStatus ? "Enable" : "Disable";

          if (error) {
            toastContent = {
              color: _utils__WEBPACK_IMPORTED_MODULE_30__["TOAST_STATUS"].failed,
              message: "".concat(strMessage, " user failed")
            };
            return;
          }

          toastContent = {
            color: _utils__WEBPACK_IMPORTED_MODULE_30__["TOAST_STATUS"].success,
            message: "".concat(strMessage, " user successfully")
          };
        })["finally"](function () {
          _this.setState({
            isLoading: false,
            users: _toConsumableArray(userData),
            toastContent: toastContent,
            indexRowUpdated: null
          });
        });
      }, 150);
    });

    _defineProperty(_assertThisInitialized(_this), "onDelete", function (key) {
      if (key !== INDEX_CURRENT_USER) {
        _this.setState({
          deleteUserIndex: key
        });

        return;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onUpdateUserRole", /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(user, _ref, index) {
        var value, first_name, last_name, email, id, toastContent, userData, res;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                value = _ref.value;

                _this.setState({
                  isLoading: true,
                  indexRowUpdated: index
                });

                first_name = user.first_name, last_name = user.last_name, email = user.email, id = user.id;
                toastContent = {};
                userData = _toConsumableArray(_this.state.users);
                _context.prev = 5;
                _context.next = 8;
                return _actions__WEBPACK_IMPORTED_MODULE_28__["UserActions"].createOrUpdate(id, {
                  first_name: first_name,
                  last_name: last_name,
                  email: email,
                  is_admin: parseInt(value)
                });

              case 8:
                res = _context.sent;

                if (res.error) {
                  toastContent = {
                    color: _utils__WEBPACK_IMPORTED_MODULE_30__["TOAST_STATUS"].failed,
                    message: "Updated user failed"
                  };
                } else {
                  userData[index].is_admin = value;
                  toastContent = {
                    color: _utils__WEBPACK_IMPORTED_MODULE_30__["TOAST_STATUS"].success,
                    message: "Updated user successfully"
                  };
                }

                _context.next = 15;
                break;

              case 12:
                _context.prev = 12;
                _context.t0 = _context["catch"](5);
                toastContent = {
                  color: _utils__WEBPACK_IMPORTED_MODULE_30__["TOAST_STATUS"].failed,
                  message: _context.t0.message
                };

              case 15:
                _this.setState({
                  toastContent: toastContent,
                  users: _toConsumableArray(userData),
                  isLoading: false,
                  indexRowUpdated: null
                });

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[5, 12]]);
      }));

      return function (_x, _x2, _x3) {
        return _ref2.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "onConfirmDeleteUser", function () {
      _this.setState({
        isLoading: true
      });

      var toastContent = {};
      var _this$state = _this.state,
          deleteUserIndex = _this$state.deleteUserIndex,
          users = _this$state.users;

      var userData = _toConsumableArray(users);

      _actions__WEBPACK_IMPORTED_MODULE_28__["UserActions"]["delete"](users[deleteUserIndex].id).then(function (res) {
        var error = res.error;

        if (error) {
          toastContent = {
            color: _utils__WEBPACK_IMPORTED_MODULE_30__["TOAST_STATUS"].failed,
            message: "You can not delete this account"
          };
          return;
        }

        userData.splice(deleteUserIndex, 1);
        toastContent = {
          color: _utils__WEBPACK_IMPORTED_MODULE_30__["TOAST_STATUS"].success,
          message: "Delete successful"
        };
      })["finally"](function () {
        _this.setState({
          isLoading: false,
          deleteUserIndex: null,
          users: userData,
          toastContent: toastContent
        });
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onFinishEditUser", /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(user, isUpdateUser) {
        var toastContent;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                toastContent = {
                  color: "success",
                  message: "".concat(isUpdateUser ? "Update" : "Create", " user  ").concat(user.email, " successful")
                };
                _context2.next = 3;
                return _this.loadData();

              case 3:
                _this.setState({
                  isShowUserDetailForm: false,
                  editUserIndex: null,
                  toastContent: toastContent
                }, function () {
                  setTimeout(function () {
                    _this.setState({
                      toastContent: {}
                    });
                  }, 1500);
                });

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x4, _x5) {
        return _ref3.apply(this, arguments);
      };
    }());

    _this.state = {
      users: [],
      isLoading: false,
      newUser: null,
      editUserIndex: null,
      deleteUserIndex: null,
      toastContent: {},
      isShowUserDetailForm: false,
      indexRowUpdated: null
    };
    return _this;
  }

  _createClass(UserList, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadData();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state2 = this.state,
          users = _this$state2.users,
          editUserIndex = _this$state2.editUserIndex,
          deleteUserIndex = _this$state2.deleteUserIndex,
          toastContent = _this$state2.toastContent,
          isLoading = _this$state2.isLoading,
          isShowUserDetailForm = _this$state2.isShowUserDetailForm,
          indexRowUpdated = _this$state2.indexRowUpdated;
      var columns = [{
        label: ''
      }, {
        label: "Name",
        formatter: function formatter(_ref4) {
          var row = _ref4.row;
          return "".concat(row.first_name, " ").concat(row.last_name);
        }
      }, {
        label: "E-Mail",
        dataField: "email",
        formatter: function formatter(_ref5) {
          var cell = _ref5.cell;
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_26___default.a.createElement("span", {
            className: "text-primary"
          }, cell);
        }
      }, {
        label: "Role",
        dataField: "is_admin",
        formatter: function formatter(_ref6) {
          var cell = _ref6.cell,
              row = _ref6.row,
              index = _ref6.index;
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_26___default.a.createElement("select", {
            name: "is_admin",
            className: "form-select",
            "aria-label": cell ? "Admin" : "User",
            defaultValue: cell,
            disabled: isLoading && indexRowUpdated === index,
            onChange: function onChange(e) {
              return _this2.onUpdateUserRole(row, e.target, index);
            }
          }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_26___default.a.createElement("option", {
            value: USER_VALUE
          }, "User"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_26___default.a.createElement("option", {
            value: ADMIN_VALUE
          }, "Admin"));
        }
      }, {
        label: "Status",
        dataField: "is_active",
        formatter: function formatter(_ref7) {
          var index = _ref7.index,
              cell = _ref7.cell;
          var isDisable = indexRowUpdated === index;
          if (index === INDEX_CURRENT_USER) isDisable = true;
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_26___default.a.createElement("div", {
            className: "form-check form-switch"
          }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_26___default.a.createElement("input", {
            className: "form-check-input ".concat(index === INDEX_CURRENT_USER ? 'pe-none' : ''),
            type: "checkbox",
            role: "switch",
            id: "is_active_".concat(index),
            disabled: isDisable,
            defaultChecked: !!cell,
            onChange: function onChange(e) {
              return _this2.onChangeStatus(index, !cell);
            }
          }));
        }
      }, {
        label: "Last updated",
        dataField: "last_updated"
      }, {
        formatter: function formatter(_ref8) {
          var row = _ref8.row,
              index = _ref8.index;
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_26___default.a.createElement("div", {
            className: "dropdown float-end"
          }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_26___default.a.createElement("button", {
            className: "btn text-dark",
            id: "dropdownMenuLink",
            "data-bs-toggle": "dropdown",
            "aria-expanded": "false"
          }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_26___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_29__["Icon"], {
            name: "ellipsis-h"
          })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_26___default.a.createElement("ul", {
            className: "dropdown-menu",
            "aria-labelledby": "dropdownMenuLink"
          }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_26___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_26___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_29__["Button"], {
            className: "dropdown-item text-primary",
            onClick: function onClick() {
              _this2.setState({
                isShowUserDetailForm: true,
                editUserIndex: index
              });
            }
          }, "Edit")), index !== 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_26___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_26___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_29__["Button"], {
            onClick: function onClick() {
              return _this2.onDelete(index);
            },
            className: "dropdown-item text-danger"
          }, "Delete"))));
        }
      }];
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_26___default.a.createElement("div", {
        className: "users ms-cp-4 me-cp-3"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_26___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_29__["Toast"], {
        toastContent: toastContent,
        onToastClosed: function onToastClosed() {
          _this2.setState({
            toastContent: {}
          });
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_26___default.a.createElement("div", {
        className: "content me-2 mt-3"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_26___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_29__["ContentHeader"], {
        pageTitle: "Users",
        iconName: "users",
        actionButtonTitle: "Create User",
        actionButtonIcon: "plus",
        onClickActionBtn: function onClickActionBtn() {
          _this2.setState({
            isShowUserDetailForm: true
          });
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_26___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_29__["DataTable"], {
        columns: columns,
        dataTable: users
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_26___default.a.createElement(_form__WEBPACK_IMPORTED_MODULE_31__["UserForm"], {
        isShow: isShowUserDetailForm,
        indexUserSelected: editUserIndex,
        users: users,
        onFinishEditUser: this.onFinishEditUser,
        onHidden: function onHidden() {
          _this2.setState({
            isShowUserDetailForm: false,
            editUserIndex: null
          });
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_26___default.a.createElement(_components__WEBPACK_IMPORTED_MODULE_29__["DeleteModal"], {
        data: users,
        indexSelected: deleteUserIndex,
        objectName: "user",
        displayField: "email",
        closeButtonAction: function closeButtonAction() {
          _this2.setState({
            deleteUserIndex: null
          });
        },
        saveButtonAction: function saveButtonAction() {
          return _this2.onConfirmDeleteUser();
        }
      }));
    }
  }]);

  return UserList;
}(react__WEBPACK_IMPORTED_MODULE_26__["Component"]);

react_dom__WEBPACK_IMPORTED_MODULE_27___default.a.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_26___default.a.createElement(UserList, null), document.querySelector("#root"));

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3BhZ2VzL3VzZXIvZm9ybS5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvcGFnZXMvdXNlci9saXN0LmpzIl0sIm5hbWVzIjpbIk1BTkRBVE9SWV9GSUVMRFMiLCJERUZBVUxUX1VTRVIiLCJpZCIsImZpcnN0TmFtZSIsImxhc3ROYW1lIiwiZW1haWwiLCJpc0FkbWluIiwiVXNlckZvcm0iLCJwcm9wcyIsIm5hbWUiLCJ2YWx1ZSIsInNldFN0YXRlIiwicHJlU3RhdGUiLCJ1c2VyIiwiZXJyb3JzIiwibmV3RXJyb3JBcnIiLCJpbmNsdWRlcyIsImZpbHRlciIsImVsIiwicHVzaCIsImVycm9yTWVzc2FnZVJlcyIsInN0YXRlIiwib25GaW5pc2hFZGl0VXNlciIsImxlbmd0aCIsInVzZXJQYXlsb2FkIiwiZmlyc3RfbmFtZSIsImxhc3RfbmFtZSIsImlzX2FkbWluIiwiZXJyb3JSZXMiLCJpc0xvYWRpbmciLCJVc2VyQWN0aW9ucyIsImNyZWF0ZU9yVXBkYXRlIiwicmVzIiwiZXJyb3IiLCJtZXNzYWdlIiwiaXNVcGRhdGVVc2VyIiwicGFyc2VJbnQiLCJ1c2VyUG9zaXRpb24iLCJvbkhpZGRlbiIsImlzU2hvdyIsIlNpemUiLCJtZWRpdW0iLCJlIiwib25DaGFuZ2VGaWVsZCIsInRhcmdldCIsImNoZWNrZWQiLCJDb2xvcnMiLCJibHVlIiwib25TdWJtaXQiLCJPYmplY3QiLCJrZXlzIiwiaW5kZXhVc2VyU2VsZWN0ZWQiLCJ1c2VycyIsIm5ld1VzZXIiLCJwb3NpdGlvbiIsIm5ld0Vycm9ycyIsIkNvbXBvbmVudCIsIklOREVYX0NVUlJFTlRfVVNFUiIsIkFETUlOX1ZBTFVFIiwiVVNFUl9WQUxVRSIsIlVzZXJMaXN0IiwiZ2V0QWxsVXNlciIsInRoZW4iLCJkYXRhIiwia2V5IiwibmV3VmFsdWUiLCJ1c2VyRGF0YSIsIm5ld1N0YXR1cyIsImlzX2FjdGl2ZSIsInNldFRpbWVvdXQiLCJpbmRleFJvd1VwZGF0ZWQiLCJ0b2FzdENvbnRlbnQiLCJzZXRTdGF0dXMiLCJzdHJNZXNzYWdlIiwiY29sb3IiLCJUT0FTVF9TVEFUVVMiLCJmYWlsZWQiLCJzdWNjZXNzIiwiZGVsZXRlVXNlckluZGV4IiwiaW5kZXgiLCJzcGxpY2UiLCJsb2FkRGF0YSIsImlzU2hvd1VzZXJEZXRhaWxGb3JtIiwiZWRpdFVzZXJJbmRleCIsImNvbHVtbnMiLCJsYWJlbCIsImZvcm1hdHRlciIsInJvdyIsImRhdGFGaWVsZCIsImNlbGwiLCJvblVwZGF0ZVVzZXJSb2xlIiwiaXNEaXNhYmxlIiwib25DaGFuZ2VTdGF0dXMiLCJvbkRlbGV0ZSIsIm9uQ29uZmlybURlbGV0ZVVzZXIiLCJSZWFjdERPTSIsInJlbmRlciIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsUUFBUSxvQkFBb0I7UUFDNUI7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxpQkFBaUIsNEJBQTRCO1FBQzdDO1FBQ0E7UUFDQSxrQkFBa0IsMkJBQTJCO1FBQzdDO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTs7UUFFQTtRQUNBO1FBQ0EsMENBQTBDO1FBQzFDOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTs7O1FBR0E7UUFD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QUFDQyxhQUFULENBQXVCLE9BQXZCLENBQTlCLEUiLCJmaWxlIjoidXNlcl9saXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSnNvbnBDYWxsYmFjayhkYXRhKSB7XG4gXHRcdHZhciBjaHVua0lkcyA9IGRhdGFbMF07XG4gXHRcdHZhciBtb3JlTW9kdWxlcyA9IGRhdGFbMV07XG4gXHRcdHZhciBleGVjdXRlTW9kdWxlcyA9IGRhdGFbMl07XG5cbiBcdFx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG4gXHRcdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuIFx0XHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwLCByZXNvbHZlcyA9IFtdO1xuIFx0XHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdHJlc29sdmVzLnB1c2goaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKTtcbiBcdFx0XHR9XG4gXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcbiBcdFx0fVxuIFx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmKHBhcmVudEpzb25wRnVuY3Rpb24pIHBhcmVudEpzb25wRnVuY3Rpb24oZGF0YSk7XG5cbiBcdFx0d2hpbGUocmVzb2x2ZXMubGVuZ3RoKSB7XG4gXHRcdFx0cmVzb2x2ZXMuc2hpZnQoKSgpO1xuIFx0XHR9XG5cbiBcdFx0Ly8gYWRkIGVudHJ5IG1vZHVsZXMgZnJvbSBsb2FkZWQgY2h1bmsgdG8gZGVmZXJyZWQgbGlzdFxuIFx0XHRkZWZlcnJlZE1vZHVsZXMucHVzaC5hcHBseShkZWZlcnJlZE1vZHVsZXMsIGV4ZWN1dGVNb2R1bGVzIHx8IFtdKTtcblxuIFx0XHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIGFsbCBjaHVua3MgcmVhZHlcbiBcdFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4gXHR9O1xuIFx0ZnVuY3Rpb24gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKSB7XG4gXHRcdHZhciByZXN1bHQ7XG4gXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgZGVmZXJyZWRNb2R1bGUgPSBkZWZlcnJlZE1vZHVsZXNbaV07XG4gXHRcdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG4gXHRcdFx0Zm9yKHZhciBqID0gMTsgaiA8IGRlZmVycmVkTW9kdWxlLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgZGVwSWQgPSBkZWZlcnJlZE1vZHVsZVtqXTtcbiBcdFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tkZXBJZF0gIT09IDApIGZ1bGZpbGxlZCA9IGZhbHNlO1xuIFx0XHRcdH1cbiBcdFx0XHRpZihmdWxmaWxsZWQpIHtcbiBcdFx0XHRcdGRlZmVycmVkTW9kdWxlcy5zcGxpY2UoaS0tLCAxKTtcbiBcdFx0XHRcdHJlc3VsdCA9IF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gZGVmZXJyZWRNb2R1bGVbMF0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdHJldHVybiByZXN1bHQ7XG4gXHR9XG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgQ1NTIGNodW5rc1xuIFx0dmFyIGluc3RhbGxlZENzc0NodW5rcyA9IHtcbiBcdFx0XCJ1c2VyX2xpc3RcIjogMFxuIFx0fVxuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJ1c2VyX2xpc3RcIjogMFxuIFx0fTtcblxuIFx0dmFyIGRlZmVycmVkTW9kdWxlcyA9IFtdO1xuXG4gXHQvLyBzY3JpcHQgcGF0aCBmdW5jdGlvblxuIFx0ZnVuY3Rpb24ganNvbnBTY3JpcHRTcmMoY2h1bmtJZCkge1xuIFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArICh7fVtjaHVua0lkXXx8Y2h1bmtJZCkgKyBcIi5qc1wiXG4gXHR9XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuIFx0Ly8gVGhpcyBmaWxlIGNvbnRhaW5zIG9ubHkgdGhlIGVudHJ5IGNodW5rLlxuIFx0Ly8gVGhlIGNodW5rIGxvYWRpbmcgZnVuY3Rpb24gZm9yIGFkZGl0aW9uYWwgY2h1bmtzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmUgPSBmdW5jdGlvbiByZXF1aXJlRW5zdXJlKGNodW5rSWQpIHtcbiBcdFx0dmFyIHByb21pc2VzID0gW107XG5cblxuIFx0XHQvLyBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiBDU1MgbG9hZGluZ1xuIFx0XHR2YXIgY3NzQ2h1bmtzID0ge1wiMFwiOjF9O1xuIFx0XHRpZihpbnN0YWxsZWRDc3NDaHVua3NbY2h1bmtJZF0pIHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ3NzQ2h1bmtzW2NodW5rSWRdKTtcbiBcdFx0ZWxzZSBpZihpbnN0YWxsZWRDc3NDaHVua3NbY2h1bmtJZF0gIT09IDAgJiYgY3NzQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDc3NDaHVua3NbY2h1bmtJZF0gPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRcdHZhciBocmVmID0gXCJcIiArICh7fVtjaHVua0lkXXx8Y2h1bmtJZCkgKyBcIi5jc3NcIjtcbiBcdFx0XHRcdHZhciBmdWxsaHJlZiA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIGhyZWY7XG4gXHRcdFx0XHR2YXIgZXhpc3RpbmdMaW5rVGFncyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwibGlua1wiKTtcbiBcdFx0XHRcdGZvcih2YXIgaSA9IDA7IGkgPCBleGlzdGluZ0xpbmtUYWdzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdHZhciB0YWcgPSBleGlzdGluZ0xpbmtUYWdzW2ldO1xuIFx0XHRcdFx0XHR2YXIgZGF0YUhyZWYgPSB0YWcuZ2V0QXR0cmlidXRlKFwiZGF0YS1ocmVmXCIpIHx8IHRhZy5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpO1xuIFx0XHRcdFx0XHRpZih0YWcucmVsID09PSBcInN0eWxlc2hlZXRcIiAmJiAoZGF0YUhyZWYgPT09IGhyZWYgfHwgZGF0YUhyZWYgPT09IGZ1bGxocmVmKSkgcmV0dXJuIHJlc29sdmUoKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdHZhciBleGlzdGluZ1N0eWxlVGFncyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic3R5bGVcIik7XG4gXHRcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZXhpc3RpbmdTdHlsZVRhZ3MubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0dmFyIHRhZyA9IGV4aXN0aW5nU3R5bGVUYWdzW2ldO1xuIFx0XHRcdFx0XHR2YXIgZGF0YUhyZWYgPSB0YWcuZ2V0QXR0cmlidXRlKFwiZGF0YS1ocmVmXCIpO1xuIFx0XHRcdFx0XHRpZihkYXRhSHJlZiA9PT0gaHJlZiB8fCBkYXRhSHJlZiA9PT0gZnVsbGhyZWYpIHJldHVybiByZXNvbHZlKCk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHR2YXIgbGlua1RhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xuIFx0XHRcdFx0bGlua1RhZy5yZWwgPSBcInN0eWxlc2hlZXRcIjtcbiBcdFx0XHRcdGxpbmtUYWcudHlwZSA9IFwidGV4dC9jc3NcIjtcbiBcdFx0XHRcdGxpbmtUYWcub25sb2FkID0gcmVzb2x2ZTtcbiBcdFx0XHRcdGxpbmtUYWcub25lcnJvciA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gXHRcdFx0XHRcdHZhciByZXF1ZXN0ID0gZXZlbnQgJiYgZXZlbnQudGFyZ2V0ICYmIGV2ZW50LnRhcmdldC5zcmMgfHwgZnVsbGhyZWY7XG4gXHRcdFx0XHRcdHZhciBlcnIgPSBuZXcgRXJyb3IoXCJMb2FkaW5nIENTUyBjaHVuayBcIiArIGNodW5rSWQgKyBcIiBmYWlsZWQuXFxuKFwiICsgcmVxdWVzdCArIFwiKVwiKTtcbiBcdFx0XHRcdFx0ZXJyLnJlcXVlc3QgPSByZXF1ZXN0O1xuIFx0XHRcdFx0XHRyZWplY3QoZXJyKTtcbiBcdFx0XHRcdH07XG4gXHRcdFx0XHRsaW5rVGFnLmhyZWYgPSBmdWxsaHJlZjtcbiBcdFx0XHRcdHZhciBoZWFkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdO1xuIFx0XHRcdFx0aGVhZC5hcHBlbmRDaGlsZChsaW5rVGFnKTtcbiBcdFx0XHR9KS50aGVuKGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0aW5zdGFsbGVkQ3NzQ2h1bmtzW2NodW5rSWRdID0gMDtcbiBcdFx0XHR9KSk7XG4gXHRcdH1cblxuIFx0XHQvLyBKU09OUCBjaHVuayBsb2FkaW5nIGZvciBqYXZhc2NyaXB0XG5cbiBcdFx0dmFyIGluc3RhbGxlZENodW5rRGF0YSA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhICE9PSAwKSB7IC8vIDAgbWVhbnMgXCJhbHJlYWR5IGluc3RhbGxlZFwiLlxuXG4gXHRcdFx0Ly8gYSBQcm9taXNlIG1lYW5zIFwiY3VycmVudGx5IGxvYWRpbmdcIi5cbiBcdFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEpIHtcbiBcdFx0XHRcdHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ2h1bmtEYXRhWzJdKTtcbiBcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0Ly8gc2V0dXAgUHJvbWlzZSBpbiBjaHVuayBjYWNoZVxuIFx0XHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRcdFx0aW5zdGFsbGVkQ2h1bmtEYXRhID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gW3Jlc29sdmUsIHJlamVjdF07XG4gXHRcdFx0XHR9KTtcbiBcdFx0XHRcdHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ2h1bmtEYXRhWzJdID0gcHJvbWlzZSk7XG5cbiBcdFx0XHRcdC8vIHN0YXJ0IGNodW5rIGxvYWRpbmdcbiBcdFx0XHRcdHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiBcdFx0XHRcdHZhciBvblNjcmlwdENvbXBsZXRlO1xuXG4gXHRcdFx0XHRzY3JpcHQuY2hhcnNldCA9ICd1dGYtOCc7XG4gXHRcdFx0XHRzY3JpcHQudGltZW91dCA9IDEyMDtcbiBcdFx0XHRcdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKSB7XG4gXHRcdFx0XHRcdHNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdHNjcmlwdC5zcmMgPSBqc29ucFNjcmlwdFNyYyhjaHVua0lkKTtcblxuIFx0XHRcdFx0Ly8gY3JlYXRlIGVycm9yIGJlZm9yZSBzdGFjayB1bndvdW5kIHRvIGdldCB1c2VmdWwgc3RhY2t0cmFjZSBsYXRlclxuIFx0XHRcdFx0dmFyIGVycm9yID0gbmV3IEVycm9yKCk7XG4gXHRcdFx0XHRvblNjcmlwdENvbXBsZXRlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gXHRcdFx0XHRcdC8vIGF2b2lkIG1lbSBsZWFrcyBpbiBJRS5cbiBcdFx0XHRcdFx0c2NyaXB0Lm9uZXJyb3IgPSBzY3JpcHQub25sb2FkID0gbnVsbDtcbiBcdFx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuIFx0XHRcdFx0XHR2YXIgY2h1bmsgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHRcdFx0XHRcdGlmKGNodW5rICE9PSAwKSB7XG4gXHRcdFx0XHRcdFx0aWYoY2h1bmspIHtcbiBcdFx0XHRcdFx0XHRcdHZhciBlcnJvclR5cGUgPSBldmVudCAmJiAoZXZlbnQudHlwZSA9PT0gJ2xvYWQnID8gJ21pc3NpbmcnIDogZXZlbnQudHlwZSk7XG4gXHRcdFx0XHRcdFx0XHR2YXIgcmVhbFNyYyA9IGV2ZW50ICYmIGV2ZW50LnRhcmdldCAmJiBldmVudC50YXJnZXQuc3JjO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IubWVzc2FnZSA9ICdMb2FkaW5nIGNodW5rICcgKyBjaHVua0lkICsgJyBmYWlsZWQuXFxuKCcgKyBlcnJvclR5cGUgKyAnOiAnICsgcmVhbFNyYyArICcpJztcbiBcdFx0XHRcdFx0XHRcdGVycm9yLm5hbWUgPSAnQ2h1bmtMb2FkRXJyb3InO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IudHlwZSA9IGVycm9yVHlwZTtcbiBcdFx0XHRcdFx0XHRcdGVycm9yLnJlcXVlc3QgPSByZWFsU3JjO1xuIFx0XHRcdFx0XHRcdFx0Y2h1bmtbMV0oZXJyb3IpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSB1bmRlZmluZWQ7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH07XG4gXHRcdFx0XHR2YXIgdGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiBcdFx0XHRcdFx0b25TY3JpcHRDb21wbGV0ZSh7IHR5cGU6ICd0aW1lb3V0JywgdGFyZ2V0OiBzY3JpcHQgfSk7XG4gXHRcdFx0XHR9LCAxMjAwMDApO1xuIFx0XHRcdFx0c2NyaXB0Lm9uZXJyb3IgPSBzY3JpcHQub25sb2FkID0gb25TY3JpcHRDb21wbGV0ZTtcbiBcdFx0XHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0cmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbiBcdH07XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvYXNzZXRzL1wiO1xuXG4gXHQvLyBvbiBlcnJvciBmdW5jdGlvbiBmb3IgYXN5bmMgbG9hZGluZ1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vZSA9IGZ1bmN0aW9uKGVycikgeyBjb25zb2xlLmVycm9yKGVycik7IHRocm93IGVycjsgfTtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIGFkZCBlbnRyeSBtb2R1bGUgdG8gZGVmZXJyZWQgbGlzdFxuIFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2goW1wiLi9hc3NldHMvanMvcGFnZXMvdXNlci9saXN0LmpzXCIsXCJ2ZW5kb3JzfmFsZXJ0c19saXN0fmFwcH5kYXNoYm9hcmQtcGFnZX5kYXNoYm9hcmRfZW1wdHl+ZGFzaGJvYXJkX2Zvcm1+ZXhwb3J0X2xpc3R+ZmxvdF9jaGFydH5ncmFwaF9mfmZlZDI5MDU0XCIsXCJ2ZW5kb3JzfmFsZXJ0c19saXN0fmRhc2hib2FyZC1wYWdlfmRhc2hib2FyZF9lbXB0eX5kYXNoYm9hcmRfZm9ybX5leHBvcnRfbGlzdH5mbG90X2NoYXJ0fmdyYXBoX2Zvcm1+fmZlMTAyZGU2XCIsXCJhbGVydHNfbGlzdH5kYXNoYm9hcmQtcGFnZX5kYXNoYm9hcmRfZW1wdHl+ZGFzaGJvYXJkX2Zvcm1+ZXhwb3J0X2xpc3R+ZmxvdF9jaGFydH5ncmFwaF9mb3JtfmdyYXBoX2xpfmYzMjBjMzRiXCJdKTtcbiBcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gcmVhZHlcbiBcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgQnV0dG9uLCBNb2RhbCwgU2l6ZSwgQ29sb3JzLCBGb3JtRmllbGQgfSBmcm9tIFwiLi4vLi4vY29tcG9uZW50c1wiO1xuaW1wb3J0IHsgVXNlckFjdGlvbnMgfSBmcm9tIFwiLi4vLi4vYWN0aW9uc1wiO1xuXG5jb25zdCBNQU5EQVRPUllfRklFTERTID0gW1wiZmlyc3ROYW1lXCIsIFwibGFzdE5hbWVcIiwgXCJlbWFpbFwiXTtcblxuY29uc3QgREVGQVVMVF9VU0VSID0ge1xuICAgIGlkOiBudWxsLFxuICAgIGZpcnN0TmFtZTogXCJcIixcbiAgICBsYXN0TmFtZTogXCJcIixcbiAgICBlbWFpbDogXCJcIixcbiAgICBpc0FkbWluOiBmYWxzZSxcbn07XG5cbmV4cG9ydCBjbGFzcyBVc2VyRm9ybSBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICB1c2VyOiBERUZBVUxUX1VTRVIsXG4gICAgICAgICAgICB1c2VyUG9zaXRpb246IG51bGwsXG4gICAgICAgICAgICBlcnJvcnM6IFtdLFxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlUmVzOiBudWxsLFxuICAgICAgICAgICAgaXNMb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzKHByb3BzLCBzdGF0ZSkge1xuICAgICAgICBjb25zdCB7IHVzZXJQb3NpdGlvbiwgdXNlciwgZXJyb3JzIH0gPSBzdGF0ZTtcbiAgICAgICAgY29uc3QgeyBpbmRleFVzZXJTZWxlY3RlZCwgdXNlcnMgfSA9IHByb3BzO1xuXG4gICAgICAgIGxldCBuZXdVc2VyID0geyAuLi51c2VyIH07XG5cbiAgICAgICAgbGV0IHBvc2l0aW9uID0gaW5kZXhVc2VyU2VsZWN0ZWQ7XG5cbiAgICAgICAgbGV0IG5ld0Vycm9ycyA9IFsuLi5lcnJvcnNdO1xuXG4gICAgICAgIGlmIChpbmRleFVzZXJTZWxlY3RlZCAhPT0gdXNlclBvc2l0aW9uKSB7XG4gICAgICAgICAgICBpZiAoaW5kZXhVc2VyU2VsZWN0ZWQgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBuZXdVc2VyID0gREVGQVVMVF9VU0VSO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IGlkLCBmaXJzdF9uYW1lLCBsYXN0X25hbWUsIGVtYWlsLCBpc19hZG1pbiB9ID0gdXNlcnNbaW5kZXhVc2VyU2VsZWN0ZWRdO1xuXG4gICAgICAgICAgICAgICAgbmV3VXNlciA9IHtcbiAgICAgICAgICAgICAgICAgICAgaWQsXG4gICAgICAgICAgICAgICAgICAgIGZpcnN0TmFtZTogZmlyc3RfbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgbGFzdE5hbWU6IGxhc3RfbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgZW1haWwsXG4gICAgICAgICAgICAgICAgICAgIGlzQWRtaW46IGlzX2FkbWluID09IDEsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5ld0Vycm9ycyA9IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHVzZXI6IHsgLi4ubmV3VXNlciB9LFxuICAgICAgICAgICAgdXNlclBvc2l0aW9uOiBwb3NpdGlvbixcbiAgICAgICAgICAgIGVycm9yczogbmV3RXJyb3JzLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIG9uQ2hhbmdlRmllbGQgPSAoe25hbWUsIHZhbHVlfSkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKChwcmVTdGF0ZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgeyB1c2VyLCBlcnJvcnMgfSA9IHByZVN0YXRlO1xuICAgICAgICAgICAgbGV0IG5ld0Vycm9yQXJyID0gWy4uLmVycm9yc107XG4gICAgICAgICAgICBpZiAoTUFOREFUT1JZX0ZJRUxEUy5pbmNsdWRlcyhuYW1lKSkge1xuICAgICAgICAgICAgICAgIG5ld0Vycm9yQXJyID0gbmV3RXJyb3JBcnIuZmlsdGVyKChlbCkgPT4gZWwgIT09IG5hbWUpO1xuICAgICAgICAgICAgICAgIGlmICghdmFsdWUpIG5ld0Vycm9yQXJyLnB1c2gobmFtZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdXNlcjoge1xuICAgICAgICAgICAgICAgICAgICAuLi51c2VyLFxuICAgICAgICAgICAgICAgICAgICBbbmFtZV06IHZhbHVlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3JzOiBuZXdFcnJvckFycixcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2VSZXM6IG51bGwsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgb25TdWJtaXQgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHsgdXNlciB9ID0gdGhpcy5zdGF0ZTtcblxuICAgICAgICBjb25zdCB7IG9uRmluaXNoRWRpdFVzZXIgfSA9IHRoaXMucHJvcHM7XG5cbiAgICAgICAgY29uc3QgbmV3RXJyb3JBcnIgPSBNQU5EQVRPUllfRklFTERTLmZpbHRlcihlbCA9PiB7XG4gICAgICAgICAgICBpZighdXNlcltlbF0pIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KVxuXG4gICAgICAgIGlmIChuZXdFcnJvckFyciAmJiBuZXdFcnJvckFyci5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBlcnJvcnM6IG5ld0Vycm9yQXJyXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgeyBpZCwgZmlyc3ROYW1lLCBsYXN0TmFtZSwgZW1haWwsIGlzQWRtaW4gfSA9IHVzZXI7XG5cbiAgICAgICAgY29uc3QgdXNlclBheWxvYWQgPSB7XG4gICAgICAgICAgICBmaXJzdF9uYW1lOiBmaXJzdE5hbWUsXG4gICAgICAgICAgICBsYXN0X25hbWU6IGxhc3ROYW1lLFxuICAgICAgICAgICAgZW1haWwsXG4gICAgICAgICAgICBpc19hZG1pbjogaXNBZG1pbiA/IDEgOiAwLFxuICAgICAgICB9O1xuXG4gICAgICAgIGxldCBlcnJvclJlcyA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBpc0xvYWRpbmc6IHRydWUsXG4gICAgICAgIH0pXG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IFVzZXJBY3Rpb25zLmNyZWF0ZU9yVXBkYXRlKGlkLCB1c2VyUGF5bG9hZCk7XG4gICAgICAgICAgICBjb25zdCB7IGVycm9yLCBtZXNzYWdlIH0gPSByZXM7XG4gICAgICAgICAgICBjb25zdCBpc1VwZGF0ZVVzZXIgPSBwYXJzZUludChpZCkgPj0gMDtcbiAgICAgICAgICAgIGlmICghZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBvbkZpbmlzaEVkaXRVc2VyKHVzZXIsIGlzVXBkYXRlVXNlcik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZXJyb3JSZXMgPSBtZXNzYWdlID8gbWVzc2FnZSA6IGAke2lzVXBkYXRlVXNlciA/IFwiVXBkYXRlXCIgOiBcIkNyZWF0ZVwifSB1c2VyIGZhaWxlZGA7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGVycm9yUmVzID0gZS5tZXNzYWdlO1xuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgaXNMb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVycm9yUmVzKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2VSZXM6IGVycm9yUmVzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7IGlzTG9hZGluZywgZXJyb3JzLCB1c2VyLCBlcnJvck1lc3NhZ2VSZXMgfSA9IHRoaXMuc3RhdGU7XG5cbiAgICAgICAgY29uc3QgeyBpZCwgZmlyc3ROYW1lLCBsYXN0TmFtZSwgZW1haWwsIGlzQWRtaW4gfSA9IHVzZXI7XG5cbiAgICAgICAgY29uc3QgeyBvbkhpZGRlbiwgaXNTaG93IH0gPSB0aGlzLnByb3BzO1xuXG4gICAgICAgIGNvbnN0IGlzVXBkYXRlVXNlciA9IHBhcnNlSW50KGlkKSA+PSAwO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8TW9kYWxcbiAgICAgICAgICAgICAgICBpZD17YHVwZGF0ZS11c2VyLSR7aWR9YH1cbiAgICAgICAgICAgICAgICBzaXplPXtTaXplLm1lZGl1bX1cbiAgICAgICAgICAgICAgICB0aXRsZT17YCR7aXNVcGRhdGVVc2VyID8gXCJVcGRhdGVcIiA6IFwiQ3JlYXRlIG5ld1wifSB1c2VyYH1cbiAgICAgICAgICAgICAgICBzaG93Q2xvc2VCdXR0b249e2ZhbHNlfVxuICAgICAgICAgICAgICAgIHNob3c9e2lzU2hvd31cbiAgICAgICAgICAgICAgICBpc1Bvc2l0aW9uQ2VudGVyPXt0cnVlfVxuICAgICAgICAgICAgICAgIG9uSGlkZGVuPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG9uSGlkZGVuKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3VzZXI6IERFRkFVTFRfVVNFUiwgZXJyb3JzOiBbXX0pXG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8Zm9ybSByb2xlPVwiZm9ybVwiIGNsYXNzTmFtZT1cIm14LTRcIj5cbiAgICAgICAgICAgICAgICAgICAge2Vycm9yTWVzc2FnZVJlcyAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGFsZXJ0IGFsZXJ0LWRhbmdlcmB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWxlcnQtbWVzc2FnZVwiPntlcnJvck1lc3NhZ2VSZXN9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgPEZvcm1GaWVsZFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibWItM1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbD1cIkZpcnN0IG5hbWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2ZpcnN0TmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRmlyc3QgbmFtZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWVsZE5hbWU9XCJmaXJzdE5hbWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB0aGlzLm9uQ2hhbmdlRmllbGQoZS50YXJnZXQpfVxuICAgICAgICAgICAgICAgICAgICAgICAgaXNNYW5kYXRvcnk9e01BTkRBVE9SWV9GSUVMRFMuaW5jbHVkZXMoXCJmaXJzdE5hbWVcIil9XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvcnM9e2Vycm9yc31cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPEZvcm1GaWVsZFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibWItM1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbD1cIkxhc3QgbmFtZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17bGFzdE5hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkxhc3QgbmFtZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWVsZE5hbWU9XCJsYXN0TmFtZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHRoaXMub25DaGFuZ2VGaWVsZChlLnRhcmdldCl9XG4gICAgICAgICAgICAgICAgICAgICAgICBpc01hbmRhdG9yeT17TUFOREFUT1JZX0ZJRUxEUy5pbmNsdWRlcyhcImxhc3ROYW1lXCIpfVxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JzPXtlcnJvcnN9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDxGb3JtRmllbGRcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1iLTNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw9XCJFLW1haWxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2VtYWlsfVxuICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJFLW1haWxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgZmllbGROYW1lPVwiZW1haWxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB0aGlzLm9uQ2hhbmdlRmllbGQoZS50YXJnZXQpfVxuICAgICAgICAgICAgICAgICAgICAgICAgaXNNYW5kYXRvcnk9e01BTkRBVE9SWV9GSUVMRFMuaW5jbHVkZXMoXCJlbWFpbFwiKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9ycz17ZXJyb3JzfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8Rm9ybUZpZWxkXG4gICAgICAgICAgICAgICAgICAgICAgICBpZD1cImlzQWRtaW5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibWItM1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbD1cIlJvbGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrYm94bGFiZWw9XCJJcyBBZG1pblwiXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkPXtpc0FkbWlufVxuICAgICAgICAgICAgICAgICAgICAgICAgZmllbGROYW1lPVwiaXNBZG1pblwiXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uQ2hhbmdlRmllbGQoe25hbWU6IHRhcmdldC5uYW1lLCB2YWx1ZTogdGFyZ2V0LmNoZWNrZWR9KVxuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlzTWFuZGF0b3J5PXtNQU5EQVRPUllfRklFTERTLmluY2x1ZGVzKFwiaXNBZG1pblwiKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9ycz17ZXJyb3JzfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJidG4tYmxvY2sgdy0xMDAgbXktM1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcj17Q29sb3JzLmJsdWV9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB0aGlzLm9uU3VibWl0KCl9XG4gICAgICAgICAgICAgICAgICAgICAgICBpc0xvYWRpbmc9e2lzTG9hZGluZ31cbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtPYmplY3Qua2V5cyhlcnJvcnMpLmxlbmd0aCA+IDAgfHwgZXJyb3JNZXNzYWdlUmVzfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7YCR7aXNVcGRhdGVVc2VyID8gXCJVcGRhdGVcIiA6IFwiQ3JlYXRlXCJ9IFVzZXJgfVxuICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICAgICA8L01vZGFsPlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IHQgfSBmcm9tIFwiQG5leHRjbG91ZC9ldmVudC1idXNcIjtcbmltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tXCI7XG5pbXBvcnQgeyBVc2VyQWN0aW9ucyB9IGZyb20gXCIuLi8uLi9hY3Rpb25zXCI7XG5pbXBvcnQgeyBDb250ZW50SGVhZGVyLCBEYXRhVGFibGUsIFRvYXN0LCBEZWxldGVNb2RhbCwgQnV0dG9uLCBJY29uIH0gZnJvbSBcIi4uLy4uL2NvbXBvbmVudHNcIjtcbmltcG9ydCB7IFRPQVNUX1NUQVRVUyB9IGZyb20gXCIuLi8uLi91dGlsc1wiO1xuaW1wb3J0IHsgVXNlckZvcm0gfSBmcm9tIFwiLi9mb3JtXCI7XG5cbmNvbnN0IElOREVYX0NVUlJFTlRfVVNFUiA9IDA7XG5cbmNvbnN0IEFETUlOX1ZBTFVFID0gMTtcblxuY29uc3QgVVNFUl9WQUxVRSA9IDA7XG5jbGFzcyBVc2VyTGlzdCBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgdXNlcnM6IFtdLFxuICAgICAgICAgICAgaXNMb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgICAgIG5ld1VzZXI6IG51bGwsXG4gICAgICAgICAgICBlZGl0VXNlckluZGV4OiBudWxsLFxuICAgICAgICAgICAgZGVsZXRlVXNlckluZGV4OiBudWxsLFxuICAgICAgICAgICAgdG9hc3RDb250ZW50OiB7fSxcbiAgICAgICAgICAgIGlzU2hvd1VzZXJEZXRhaWxGb3JtOiBmYWxzZSxcbiAgICAgICAgICAgIGluZGV4Um93VXBkYXRlZDogbnVsbCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBsb2FkRGF0YSA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBpc0xvYWRpbmc6IHRydWUsXG4gICAgICAgIH0pO1xuICAgICAgICBVc2VyQWN0aW9ucy5nZXRBbGxVc2VyKCkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB7IGVycm9yLCBkYXRhIH0gPSByZXM7XG4gICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIHVzZXJzOiBkYXRhLFxuICAgICAgICAgICAgICAgIGlzTG9hZGluZzogZmFsc2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLmxvYWREYXRhKCk7XG4gICAgfVxuXG4gICAgb25DaGFuZ2VTdGF0dXMgPSAoa2V5LCBuZXdWYWx1ZSkgPT4ge1xuICAgICAgICBpZiAoa2V5ID09PSBJTkRFWF9DVVJSRU5UX1VTRVIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHsgdXNlcnMgfSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGNvbnN0IHVzZXJEYXRhID0gWy4uLnVzZXJzXTtcblxuICAgICAgICBjb25zdCB7IGlkIH0gPSB1c2VyRGF0YVtrZXldO1xuXG4gICAgICAgIGNvbnN0IG5ld1N0YXR1cyA9IG5ld1ZhbHVlID8gQURNSU5fVkFMVUUgOiBVU0VSX1ZBTFVFO1xuXG4gICAgICAgIHVzZXJEYXRhW2tleV0uaXNfYWN0aXZlID0gbmV3U3RhdHVzO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIGlzTG9hZGluZzogdHJ1ZSxcbiAgICAgICAgICAgICAgICBpbmRleFJvd1VwZGF0ZWQ6IGtleSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbGV0IHRvYXN0Q29udGVudCA9IHt9O1xuXG4gICAgICAgICAgICBVc2VyQWN0aW9ucy5zZXRTdGF0dXMoaWQsIHsgaXNfYWN0aXZlOiBuZXdTdGF0dXMgfSlcbiAgICAgICAgICAgICAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgZXJyb3IgfSA9IHJlcztcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RyTWVzc2FnZSA9IG5ld1N0YXR1cyA/IFwiRW5hYmxlXCIgOiBcIkRpc2FibGVcIjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2FzdENvbnRlbnQgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IFRPQVNUX1NUQVRVUy5mYWlsZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogYCR7c3RyTWVzc2FnZX0gdXNlciBmYWlsZWRgLFxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRvYXN0Q29udGVudCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBUT0FTVF9TVEFUVVMuc3VjY2VzcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGAke3N0ck1lc3NhZ2V9IHVzZXIgc3VjY2Vzc2Z1bGx5YCxcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5maW5hbGx5KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBpc0xvYWRpbmc6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlcnM6IFsuLi51c2VyRGF0YV0sXG4gICAgICAgICAgICAgICAgICAgICAgICB0b2FzdENvbnRlbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleFJvd1VwZGF0ZWQ6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCAxNTApO1xuICAgIH07XG5cbiAgICBvbkRlbGV0ZSA9IChrZXkpID0+IHtcbiAgICAgICAgaWYgKGtleSAhPT0gSU5ERVhfQ1VSUkVOVF9VU0VSKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBkZWxldGVVc2VySW5kZXg6IGtleSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIG9uVXBkYXRlVXNlclJvbGUgPSBhc3luYyAodXNlciwgeyB2YWx1ZSB9LCBpbmRleCkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGlzTG9hZGluZzogdHJ1ZSxcbiAgICAgICAgICAgIGluZGV4Um93VXBkYXRlZDogaW5kZXgsXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCB7IGZpcnN0X25hbWUsIGxhc3RfbmFtZSwgZW1haWwsIGlkIH0gPSB1c2VyO1xuICAgICAgICBsZXQgdG9hc3RDb250ZW50ID0ge307XG4gICAgICAgIGxldCB1c2VyRGF0YSA9IFsuLi50aGlzLnN0YXRlLnVzZXJzXTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IFVzZXJBY3Rpb25zLmNyZWF0ZU9yVXBkYXRlKGlkLCB7XG4gICAgICAgICAgICAgICAgZmlyc3RfbmFtZSxcbiAgICAgICAgICAgICAgICBsYXN0X25hbWUsXG4gICAgICAgICAgICAgICAgZW1haWwsXG4gICAgICAgICAgICAgICAgaXNfYWRtaW46IHBhcnNlSW50KHZhbHVlKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKHJlcy5lcnJvcikge1xuICAgICAgICAgICAgICAgIHRvYXN0Q29udGVudCA9IHtcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6IFRPQVNUX1NUQVRVUy5mYWlsZWQsXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiVXBkYXRlZCB1c2VyIGZhaWxlZFwiLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHVzZXJEYXRhW2luZGV4XS5pc19hZG1pbiA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIHRvYXN0Q29udGVudCA9IHtcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6IFRPQVNUX1NUQVRVUy5zdWNjZXNzLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIlVwZGF0ZWQgdXNlciBzdWNjZXNzZnVsbHlcIixcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICB0b2FzdENvbnRlbnQgPSB7XG4gICAgICAgICAgICAgICAgY29sb3I6IFRPQVNUX1NUQVRVUy5mYWlsZWQsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogZS5tZXNzYWdlLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHRvYXN0Q29udGVudCxcbiAgICAgICAgICAgIHVzZXJzOiBbLi4udXNlckRhdGFdLFxuICAgICAgICAgICAgaXNMb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgICAgIGluZGV4Um93VXBkYXRlZDogbnVsbCxcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIG9uQ29uZmlybURlbGV0ZVVzZXIgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgaXNMb2FkaW5nOiB0cnVlLFxuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgdG9hc3RDb250ZW50ID0ge307XG4gICAgICAgIGNvbnN0IHsgZGVsZXRlVXNlckluZGV4LCB1c2VycyB9ID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgY29uc3QgdXNlckRhdGEgPSBbLi4udXNlcnNdO1xuICAgICAgICBVc2VyQWN0aW9ucy5kZWxldGUodXNlcnNbZGVsZXRlVXNlckluZGV4XS5pZClcbiAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IGVycm9yIH0gPSByZXM7XG5cbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgdG9hc3RDb250ZW50ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IFRPQVNUX1NUQVRVUy5mYWlsZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIllvdSBjYW4gbm90IGRlbGV0ZSB0aGlzIGFjY291bnRcIixcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHVzZXJEYXRhLnNwbGljZShkZWxldGVVc2VySW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgIHRvYXN0Q29udGVudCA9IHtcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6IFRPQVNUX1NUQVRVUy5zdWNjZXNzLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIkRlbGV0ZSBzdWNjZXNzZnVsXCIsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZmluYWxseSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIGlzTG9hZGluZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZVVzZXJJbmRleDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgdXNlcnM6IHVzZXJEYXRhLFxuICAgICAgICAgICAgICAgICAgICB0b2FzdENvbnRlbnQsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgb25GaW5pc2hFZGl0VXNlciA9IGFzeW5jICh1c2VyLCBpc1VwZGF0ZVVzZXIpID0+IHtcbiAgICAgICAgY29uc3QgdG9hc3RDb250ZW50ID0ge1xuICAgICAgICAgICAgY29sb3I6IFwic3VjY2Vzc1wiLFxuICAgICAgICAgICAgbWVzc2FnZTogYCR7aXNVcGRhdGVVc2VyID8gXCJVcGRhdGVcIiA6IFwiQ3JlYXRlXCJ9IHVzZXIgICR7dXNlci5lbWFpbH0gc3VjY2Vzc2Z1bGAsXG4gICAgICAgIH07XG5cbiAgICAgICAgYXdhaXQgdGhpcy5sb2FkRGF0YSgpO1xuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaXNTaG93VXNlckRldGFpbEZvcm06IGZhbHNlLFxuICAgICAgICAgICAgICAgIGVkaXRVc2VySW5kZXg6IG51bGwsXG4gICAgICAgICAgICAgICAgdG9hc3RDb250ZW50LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHRvYXN0Q29udGVudDoge30gfSk7XG4gICAgICAgICAgICAgICAgfSwgMTUwMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfTtcblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgdXNlcnMsXG4gICAgICAgICAgICBlZGl0VXNlckluZGV4LFxuICAgICAgICAgICAgZGVsZXRlVXNlckluZGV4LFxuICAgICAgICAgICAgdG9hc3RDb250ZW50LFxuICAgICAgICAgICAgaXNMb2FkaW5nLFxuICAgICAgICAgICAgaXNTaG93VXNlckRldGFpbEZvcm0sXG4gICAgICAgICAgICBpbmRleFJvd1VwZGF0ZWQsXG4gICAgICAgIH0gPSB0aGlzLnN0YXRlO1xuXG4gICAgICAgIGNvbnN0IGNvbHVtbnMgPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbGFiZWw6ICcnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBsYWJlbDogXCJOYW1lXCIsXG4gICAgICAgICAgICAgICAgZm9ybWF0dGVyOiAoeyByb3cgfSkgPT4gYCR7cm93LmZpcnN0X25hbWV9ICR7cm93Lmxhc3RfbmFtZX1gLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBsYWJlbDogXCJFLU1haWxcIixcbiAgICAgICAgICAgICAgICBkYXRhRmllbGQ6IFwiZW1haWxcIixcbiAgICAgICAgICAgICAgICBmb3JtYXR0ZXI6ICh7IGNlbGwgfSkgPT4gPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1wcmltYXJ5XCI+e2NlbGx9PC9zcGFuPixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbGFiZWw6IFwiUm9sZVwiLFxuICAgICAgICAgICAgICAgIGRhdGFGaWVsZDogXCJpc19hZG1pblwiLFxuICAgICAgICAgICAgICAgIGZvcm1hdHRlcjogKHsgY2VsbCwgcm93LCBpbmRleCB9KSA9PiAoXG4gICAgICAgICAgICAgICAgICAgIDxzZWxlY3RcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU9XCJpc19hZG1pblwiXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmb3JtLXNlbGVjdFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtjZWxsID8gXCJBZG1pblwiIDogXCJVc2VyXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU9e2NlbGx9XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17aXNMb2FkaW5nICYmIGluZGV4Um93VXBkYXRlZCA9PT0gaW5kZXh9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHRoaXMub25VcGRhdGVVc2VyUm9sZShyb3csIGUudGFyZ2V0LCBpbmRleCl9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9e1VTRVJfVkFMVUV9PlVzZXI8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9e0FETUlOX1ZBTFVFfT5BZG1pbjwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBsYWJlbDogXCJTdGF0dXNcIixcbiAgICAgICAgICAgICAgICBkYXRhRmllbGQ6IFwiaXNfYWN0aXZlXCIsXG4gICAgICAgICAgICAgICAgZm9ybWF0dGVyOiAoeyBpbmRleCwgY2VsbCB9KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpc0Rpc2FibGUgPSBpbmRleFJvd1VwZGF0ZWQgPT09IGluZGV4O1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPT09IElOREVYX0NVUlJFTlRfVVNFUikgaXNEaXNhYmxlID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWNoZWNrIGZvcm0tc3dpdGNoXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGZvcm0tY2hlY2staW5wdXQgJHtpbmRleCA9PT0gSU5ERVhfQ1VSUkVOVF9VU0VSID8gJ3BlLW5vbmUnIDogJyd9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9sZT1cInN3aXRjaFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkPXtgaXNfYWN0aXZlXyR7aW5kZXh9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2lzRGlzYWJsZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdENoZWNrZWQ9eyEhY2VsbH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB0aGlzLm9uQ2hhbmdlU3RhdHVzKGluZGV4LCAhY2VsbCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGxhYmVsOiBcIkxhc3QgdXBkYXRlZFwiLFxuICAgICAgICAgICAgICAgIGRhdGFGaWVsZDogXCJsYXN0X3VwZGF0ZWRcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZm9ybWF0dGVyOiAoeyByb3csIGluZGV4IH0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZHJvcGRvd24gZmxvYXQtZW5kXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJidG4gdGV4dC1kYXJrXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ9XCJkcm9wZG93bk1lbnVMaW5rXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS1icy10b2dnbGU9XCJkcm9wZG93blwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8SWNvbiBuYW1lPVwiZWxsaXBzaXMtaFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImRyb3Bkb3duLW1lbnVcIiBhcmlhLWxhYmVsbGVkYnk9XCJkcm9wZG93bk1lbnVMaW5rXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJkcm9wZG93bi1pdGVtIHRleHQtcHJpbWFyeVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzU2hvd1VzZXJEZXRhaWxGb3JtOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWRpdFVzZXJJbmRleDogaW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRWRpdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtpbmRleCAhPT0gMCAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB0aGlzLm9uRGVsZXRlKGluZGV4KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZHJvcGRvd24taXRlbSB0ZXh0LWRhbmdlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEZWxldGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICBdO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInVzZXJzIG1zLWNwLTQgbWUtY3AtM1wiPlxuICAgICAgICAgICAgICAgIDxUb2FzdFxuICAgICAgICAgICAgICAgICAgICB0b2FzdENvbnRlbnQ9e3RvYXN0Q29udGVudH1cbiAgICAgICAgICAgICAgICAgICAgb25Ub2FzdENsb3NlZD17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHRvYXN0Q29udGVudDoge30gfSk7XG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnQgbWUtMiBtdC0zXCI+XG4gICAgICAgICAgICAgICAgICAgIDxDb250ZW50SGVhZGVyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYWdlVGl0bGU9XCJVc2Vyc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uTmFtZT1cInVzZXJzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbkJ1dHRvblRpdGxlPVwiQ3JlYXRlIFVzZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uQnV0dG9uSWNvbj1cInBsdXNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGlja0FjdGlvbkJ0bj17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1Nob3dVc2VyRGV0YWlsRm9ybTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDxEYXRhVGFibGUgY29sdW1ucz17Y29sdW1uc30gZGF0YVRhYmxlPXt1c2Vyc30gLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8VXNlckZvcm1cbiAgICAgICAgICAgICAgICAgICAgaXNTaG93PXtpc1Nob3dVc2VyRGV0YWlsRm9ybX1cbiAgICAgICAgICAgICAgICAgICAgaW5kZXhVc2VyU2VsZWN0ZWQ9e2VkaXRVc2VySW5kZXh9XG4gICAgICAgICAgICAgICAgICAgIHVzZXJzPXt1c2Vyc31cbiAgICAgICAgICAgICAgICAgICAgb25GaW5pc2hFZGl0VXNlcj17dGhpcy5vbkZpbmlzaEVkaXRVc2VyfVxuICAgICAgICAgICAgICAgICAgICBvbkhpZGRlbj17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNTaG93VXNlckRldGFpbEZvcm06IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVkaXRVc2VySW5kZXg6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxEZWxldGVNb2RhbFxuICAgICAgICAgICAgICAgICAgICBkYXRhPXt1c2Vyc31cbiAgICAgICAgICAgICAgICAgICAgaW5kZXhTZWxlY3RlZD17ZGVsZXRlVXNlckluZGV4fVxuICAgICAgICAgICAgICAgICAgICBvYmplY3ROYW1lPVwidXNlclwiXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXlGaWVsZD1cImVtYWlsXCJcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VCdXR0b25BY3Rpb249eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZVVzZXJJbmRleDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICBzYXZlQnV0dG9uQWN0aW9uPXsoKSA9PiB0aGlzLm9uQ29uZmlybURlbGV0ZVVzZXIoKX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5SZWFjdERPTS5yZW5kZXIoPFVzZXJMaXN0IC8+LCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Jvb3RcIikpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==