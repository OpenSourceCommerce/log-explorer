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
/******/ 		"app": 0
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
/******/ 	deferredModules.push(["./assets/app.js","vendors~alerts_list~app~dashboard-page~dashboard_empty~dashboard_form~export_list~flot_chart~graph_f~fed29054","vendors~app"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/app.js":
/*!***********************!*\
  !*** ./assets/app.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_app_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/app.scss */ "./assets/styles/app.scss");
/* harmony import */ var _styles_app_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_styles_app_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _fortawesome_fontawesome_free_css_all_min_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @fortawesome/fontawesome-free/css/all.min.css */ "./node_modules/@fortawesome/fontawesome-free/css/all.min.css");
/* harmony import */ var _fortawesome_fontawesome_free_css_all_min_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_fontawesome_free_css_all_min_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _vendor_theme_min_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./vendor/theme.min.js */ "./assets/vendor/theme.min.js");
/* harmony import */ var _vendor_theme_min_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_vendor_theme_min_js__WEBPACK_IMPORTED_MODULE_2__);
/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */
// any CSS you import will output into a single css file (app.css in this case)



var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");


window.bootstrap = __webpack_require__(/*! bootstrap/dist/js/bootstrap.bundle.js */ "./node_modules/bootstrap/dist/js/bootstrap.bundle.js"); // Need jQuery? Install it with 'yarn add jquery', then uncomment to import it.
// import 'admin-lte/plugins/jquery/jquery';
// import 'admin-lte/plugins/jquery-ui/jquery-ui';
// $.widget.bridge('uibutton', $.ui.button);
// import 'admin-lte/plugins/bootstrap/js/bootstrap.bundle.min';
// Import 'admin-lte/plugins/chart.js/Chart.min';
// import Sparkline from 'admin-lte/plugins/sparklines/sparkline';
// window.Sparkline = Sparkline;
// import 'admin-lte/plugins/jqvmap/jquery.vmap.min';
// import 'admin-lte/plugins/jqvmap/maps/jquery.vmap.usa';
// import 'admin-lte/plugins/jquery-knob/jquery.knob.min';
// import 'admin-lte/plugins/moment/moment.min';
// import 'admin-lte/plugins/daterangepicker/daterangepicker';
// import 'admin-lte/plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min';
// import 'admin-lte/plugins/summernote/summernote-bs4.min';
// import 'admin-lte/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min';
// import 'admin-lte/dist/js/adminlte';
// Import 'admin-lte/dist/js/pages/dashboard';
// import 'admin-lte/dist/js/demo';
// Console.log('Hello Webpack Encore! Edit me in assets/app.js');

/***/ }),

/***/ "./assets/styles/app.scss":
/*!********************************!*\
  !*** ./assets/styles/app.scss ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./assets/vendor/theme.min.js":
/*!************************************!*\
  !*** ./assets/vendor/theme.min.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {var require;var require;__webpack_require__(/*! core-js/modules/es.symbol */ "./node_modules/core-js/modules/es.symbol.js");

__webpack_require__(/*! core-js/modules/es.symbol.description */ "./node_modules/core-js/modules/es.symbol.description.js");

__webpack_require__(/*! core-js/modules/es.symbol.iterator */ "./node_modules/core-js/modules/es.symbol.iterator.js");

__webpack_require__(/*! core-js/modules/es.array.for-each */ "./node_modules/core-js/modules/es.array.for-each.js");

__webpack_require__(/*! core-js/modules/es.array.from */ "./node_modules/core-js/modules/es.array.from.js");

__webpack_require__(/*! core-js/modules/es.array.index-of */ "./node_modules/core-js/modules/es.array.index-of.js");

__webpack_require__(/*! core-js/modules/es.array.is-array */ "./node_modules/core-js/modules/es.array.is-array.js");

__webpack_require__(/*! core-js/modules/es.array.iterator */ "./node_modules/core-js/modules/es.array.iterator.js");

__webpack_require__(/*! core-js/modules/es.array.slice */ "./node_modules/core-js/modules/es.array.slice.js");

__webpack_require__(/*! core-js/modules/es.array.sort */ "./node_modules/core-js/modules/es.array.sort.js");

__webpack_require__(/*! core-js/modules/es.date.to-string */ "./node_modules/core-js/modules/es.date.to-string.js");

__webpack_require__(/*! core-js/modules/es.function.name */ "./node_modules/core-js/modules/es.function.name.js");

__webpack_require__(/*! core-js/modules/es.object.to-string */ "./node_modules/core-js/modules/es.object.to-string.js");

__webpack_require__(/*! core-js/modules/es.regexp.to-string */ "./node_modules/core-js/modules/es.regexp.to-string.js");

__webpack_require__(/*! core-js/modules/es.string.iterator */ "./node_modules/core-js/modules/es.string.iterator.js");

__webpack_require__(/*! core-js/modules/es.string.trim */ "./node_modules/core-js/modules/es.string.trim.js");

__webpack_require__(/*! core-js/modules/web.dom-collections.for-each */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");

__webpack_require__(/*! core-js/modules/web.dom-collections.iterator */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");

/*!
 * HTML component v1.0.0 (https://scale.sc/)
 * Copyright 2022-2022
 * Licensed under ISC
 * Based on Bootstrap
*/
!function n(o, l, c) {
  function i(e, t) {
    if (!l[e]) {
      if (!o[e]) {
        var r = "function" == typeof require && require;
        if (!t && r) return require(e, !0);
        if (a) return a(e, !0);
        throw (t = new Error("Cannot find module '" + e + "'")).code = "MODULE_NOT_FOUND", t;
      }

      r = l[e] = {
        exports: {}
      }, o[e][0].call(r.exports, function (t) {
        return i(o[e][1][t] || t);
      }, r, r.exports, n, o, l, c);
    }

    return l[e].exports;
  }

  for (var a = "function" == typeof require && require, t = 0; t < c.length; t++) {
    i(c[t]);
  }

  return i;
}({
  1: [function (t, e, r) {
    "use strict";

    function c(t) {
      return function (t) {
        if (Array.isArray(t)) return n(t);
      }(t) || function (t) {
        if ("undefined" != typeof Symbol && null != t[Symbol.iterator] || null != t["@@iterator"]) return Array.from(t);
      }(t) || function (t, e) {
        if (t) {
          if ("string" == typeof t) return n(t, e);
          var r = Object.prototype.toString.call(t).slice(8, -1);
          return "Map" === (r = "Object" === r && t.constructor ? t.constructor.name : r) || "Set" === r ? Array.from(t) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? n(t, e) : void 0;
        }
      }(t) || function () {
        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }();
    }

    function n(t, e) {
      (null == e || e > t.length) && (e = t.length);

      for (var r = 0, n = new Array(e); r < e; r++) {
        n[r] = t[r];
      }

      return n;
    }

    $(document).ready(function () {
      $("#sidebarCollapse").on("click", function () {
        $("#sidebar").toggleClass("hidden"), $("#sidebarCollapse").toggleClass("sidebar-hidden");
      }), document.querySelectorAll("#toggle-password").forEach(function (r) {
        r.addEventListener("click", function () {
          var t = r.parentElement.parentElement.querySelector("input"),
              e = r.querySelector("#fas-eye-icon");
          "password" === t.type ? (t.type = "text", e.classList.add("fa-eye-slash")) : (t.type = "password", e.classList.remove("fa-eye-slash"));
        });
      }), document.querySelectorAll(".table-sortable th.col-sortable").forEach(function (t) {
        t.addEventListener("click", function () {
          !function (t, r, e) {
            var e = !(2 < arguments.length && void 0 !== e) || e,
                n = e ? 1 : -1;

            if (console.log(t.tBodies[0]), t.tBodies && t.tBodies[0]) {
              for (var o = t.tBodies[0], l = Array.from(o.querySelectorAll("tr")).sort(function (t, e) {
                t = t.querySelector("td:nth-child(".concat(r + 1, ")")).textContent.trim();
                return e.querySelector("td:nth-child(".concat(r + 1, ")")).textContent.trim() < t ? n : -1 * n;
              }); o.firstChild;) {
                o.removeChild(o.firstChild);
              }

              o.append.apply(o, c(l)), t.querySelectorAll("th.col-sortable").forEach(function (t) {
                return t.classList.remove("th-sort-asc", "th-sort-desc");
              }), t.querySelector("th.col-sortable:nth-child(".concat(r + 1, ")")).classList.toggle("th-sort-asc", e), t.querySelector("th.col-sortable:nth-child(".concat(r + 1, ")")).classList.toggle("th-sort-desc", !e);
            }
          }(t.parentElement.parentElement.parentElement, Array.prototype.indexOf.call(t.parentElement.children, t), !t.classList.contains("th-sort-asc"));
        });
      });
    });
  }, {}]
}, {}, [1]);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvc3R5bGVzL2FwcC5zY3NzIiwid2VicGFjazovLy8uL2Fzc2V0cy92ZW5kb3IvdGhlbWUubWluLmpzIl0sIm5hbWVzIjpbIiQiLCJyZXF1aXJlIiwid2luZG93IiwiYm9vdHN0cmFwIiwibiIsIm8iLCJsIiwiYyIsImkiLCJlIiwidCIsInIiLCJhIiwiRXJyb3IiLCJjb2RlIiwiZXhwb3J0cyIsImNhbGwiLCJsZW5ndGgiLCJBcnJheSIsImlzQXJyYXkiLCJTeW1ib2wiLCJpdGVyYXRvciIsImZyb20iLCJPYmplY3QiLCJwcm90b3R5cGUiLCJ0b1N0cmluZyIsInNsaWNlIiwiY29uc3RydWN0b3IiLCJuYW1lIiwidGVzdCIsIlR5cGVFcnJvciIsImRvY3VtZW50IiwicmVhZHkiLCJvbiIsInRvZ2dsZUNsYXNzIiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJhZGRFdmVudExpc3RlbmVyIiwicGFyZW50RWxlbWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJ0eXBlIiwiY2xhc3NMaXN0IiwiYWRkIiwicmVtb3ZlIiwiYXJndW1lbnRzIiwiY29uc29sZSIsImxvZyIsInRCb2RpZXMiLCJzb3J0IiwiY29uY2F0IiwidGV4dENvbnRlbnQiLCJ0cmltIiwiZmlyc3RDaGlsZCIsInJlbW92ZUNoaWxkIiwiYXBwZW5kIiwiYXBwbHkiLCJ0b2dnbGUiLCJpbmRleE9mIiwiY2hpbGRyZW4iLCJjb250YWlucyJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsUUFBUSxvQkFBb0I7UUFDNUI7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtR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QUFELEMiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSnNvbnBDYWxsYmFjayhkYXRhKSB7XG4gXHRcdHZhciBjaHVua0lkcyA9IGRhdGFbMF07XG4gXHRcdHZhciBtb3JlTW9kdWxlcyA9IGRhdGFbMV07XG4gXHRcdHZhciBleGVjdXRlTW9kdWxlcyA9IGRhdGFbMl07XG5cbiBcdFx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG4gXHRcdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuIFx0XHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwLCByZXNvbHZlcyA9IFtdO1xuIFx0XHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdHJlc29sdmVzLnB1c2goaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKTtcbiBcdFx0XHR9XG4gXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcbiBcdFx0fVxuIFx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmKHBhcmVudEpzb25wRnVuY3Rpb24pIHBhcmVudEpzb25wRnVuY3Rpb24oZGF0YSk7XG5cbiBcdFx0d2hpbGUocmVzb2x2ZXMubGVuZ3RoKSB7XG4gXHRcdFx0cmVzb2x2ZXMuc2hpZnQoKSgpO1xuIFx0XHR9XG5cbiBcdFx0Ly8gYWRkIGVudHJ5IG1vZHVsZXMgZnJvbSBsb2FkZWQgY2h1bmsgdG8gZGVmZXJyZWQgbGlzdFxuIFx0XHRkZWZlcnJlZE1vZHVsZXMucHVzaC5hcHBseShkZWZlcnJlZE1vZHVsZXMsIGV4ZWN1dGVNb2R1bGVzIHx8IFtdKTtcblxuIFx0XHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIGFsbCBjaHVua3MgcmVhZHlcbiBcdFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4gXHR9O1xuIFx0ZnVuY3Rpb24gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKSB7XG4gXHRcdHZhciByZXN1bHQ7XG4gXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgZGVmZXJyZWRNb2R1bGUgPSBkZWZlcnJlZE1vZHVsZXNbaV07XG4gXHRcdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG4gXHRcdFx0Zm9yKHZhciBqID0gMTsgaiA8IGRlZmVycmVkTW9kdWxlLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgZGVwSWQgPSBkZWZlcnJlZE1vZHVsZVtqXTtcbiBcdFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tkZXBJZF0gIT09IDApIGZ1bGZpbGxlZCA9IGZhbHNlO1xuIFx0XHRcdH1cbiBcdFx0XHRpZihmdWxmaWxsZWQpIHtcbiBcdFx0XHRcdGRlZmVycmVkTW9kdWxlcy5zcGxpY2UoaS0tLCAxKTtcbiBcdFx0XHRcdHJlc3VsdCA9IF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gZGVmZXJyZWRNb2R1bGVbMF0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdHJldHVybiByZXN1bHQ7XG4gXHR9XG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHQvLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbiBcdC8vIFByb21pc2UgPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHRcImFwcFwiOiAwXG4gXHR9O1xuXG4gXHR2YXIgZGVmZXJyZWRNb2R1bGVzID0gW107XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Fzc2V0cy9cIjtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIGFkZCBlbnRyeSBtb2R1bGUgdG8gZGVmZXJyZWQgbGlzdFxuIFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2goW1wiLi9hc3NldHMvYXBwLmpzXCIsXCJ2ZW5kb3JzfmFsZXJ0c19saXN0fmFwcH5kYXNoYm9hcmQtcGFnZX5kYXNoYm9hcmRfZW1wdHl+ZGFzaGJvYXJkX2Zvcm1+ZXhwb3J0X2xpc3R+ZmxvdF9jaGFydH5ncmFwaF9mfmZlZDI5MDU0XCIsXCJ2ZW5kb3JzfmFwcFwiXSk7XG4gXHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIHJlYWR5XG4gXHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiIsIi8qXG4gKiBXZWxjb21lIHRvIHlvdXIgYXBwJ3MgbWFpbiBKYXZhU2NyaXB0IGZpbGUhXG4gKlxuICogV2UgcmVjb21tZW5kIGluY2x1ZGluZyB0aGUgYnVpbHQgdmVyc2lvbiBvZiB0aGlzIEphdmFTY3JpcHQgZmlsZVxuICogKGFuZCBpdHMgQ1NTIGZpbGUpIGluIHlvdXIgYmFzZSBsYXlvdXQgKGJhc2UuaHRtbC50d2lnKS5cbiAqL1xuXG4vLyBhbnkgQ1NTIHlvdSBpbXBvcnQgd2lsbCBvdXRwdXQgaW50byBhIHNpbmdsZSBjc3MgZmlsZSAoYXBwLmNzcyBpbiB0aGlzIGNhc2UpXG5pbXBvcnQgJy4vc3R5bGVzL2FwcC5zY3NzJztcbmltcG9ydCAnQGZvcnRhd2Vzb21lL2ZvbnRhd2Vzb21lLWZyZWUvY3NzL2FsbC5taW4uY3NzJztcblxuY29uc3QgJCA9IHJlcXVpcmUoJ2pxdWVyeScpO1xuaW1wb3J0IFwiLi92ZW5kb3IvdGhlbWUubWluLmpzXCI7XG5cbndpbmRvdy5ib290c3RyYXAgPSByZXF1aXJlKCdib290c3RyYXAvZGlzdC9qcy9ib290c3RyYXAuYnVuZGxlLmpzJyk7XG5cbi8vIE5lZWQgalF1ZXJ5PyBJbnN0YWxsIGl0IHdpdGggJ3lhcm4gYWRkIGpxdWVyeScsIHRoZW4gdW5jb21tZW50IHRvIGltcG9ydCBpdC5cbi8vIGltcG9ydCAnYWRtaW4tbHRlL3BsdWdpbnMvanF1ZXJ5L2pxdWVyeSc7XG4vLyBpbXBvcnQgJ2FkbWluLWx0ZS9wbHVnaW5zL2pxdWVyeS11aS9qcXVlcnktdWknO1xuXG4vLyAkLndpZGdldC5icmlkZ2UoJ3VpYnV0dG9uJywgJC51aS5idXR0b24pO1xuXG4vLyBpbXBvcnQgJ2FkbWluLWx0ZS9wbHVnaW5zL2Jvb3RzdHJhcC9qcy9ib290c3RyYXAuYnVuZGxlLm1pbic7XG4vLyBJbXBvcnQgJ2FkbWluLWx0ZS9wbHVnaW5zL2NoYXJ0LmpzL0NoYXJ0Lm1pbic7XG4vLyBpbXBvcnQgU3BhcmtsaW5lIGZyb20gJ2FkbWluLWx0ZS9wbHVnaW5zL3NwYXJrbGluZXMvc3BhcmtsaW5lJztcbi8vIHdpbmRvdy5TcGFya2xpbmUgPSBTcGFya2xpbmU7XG4vLyBpbXBvcnQgJ2FkbWluLWx0ZS9wbHVnaW5zL2pxdm1hcC9qcXVlcnkudm1hcC5taW4nO1xuLy8gaW1wb3J0ICdhZG1pbi1sdGUvcGx1Z2lucy9qcXZtYXAvbWFwcy9qcXVlcnkudm1hcC51c2EnO1xuLy8gaW1wb3J0ICdhZG1pbi1sdGUvcGx1Z2lucy9qcXVlcnkta25vYi9qcXVlcnkua25vYi5taW4nO1xuLy8gaW1wb3J0ICdhZG1pbi1sdGUvcGx1Z2lucy9tb21lbnQvbW9tZW50Lm1pbic7XG4vLyBpbXBvcnQgJ2FkbWluLWx0ZS9wbHVnaW5zL2RhdGVyYW5nZXBpY2tlci9kYXRlcmFuZ2VwaWNrZXInO1xuLy8gaW1wb3J0ICdhZG1pbi1sdGUvcGx1Z2lucy90ZW1wdXNkb21pbnVzLWJvb3RzdHJhcC00L2pzL3RlbXB1c2RvbWludXMtYm9vdHN0cmFwLTQubWluJztcbi8vIGltcG9ydCAnYWRtaW4tbHRlL3BsdWdpbnMvc3VtbWVybm90ZS9zdW1tZXJub3RlLWJzNC5taW4nO1xuLy8gaW1wb3J0ICdhZG1pbi1sdGUvcGx1Z2lucy9vdmVybGF5U2Nyb2xsYmFycy9qcy9qcXVlcnkub3ZlcmxheVNjcm9sbGJhcnMubWluJztcbi8vIGltcG9ydCAnYWRtaW4tbHRlL2Rpc3QvanMvYWRtaW5sdGUnO1xuLy8gSW1wb3J0ICdhZG1pbi1sdGUvZGlzdC9qcy9wYWdlcy9kYXNoYm9hcmQnO1xuLy8gaW1wb3J0ICdhZG1pbi1sdGUvZGlzdC9qcy9kZW1vJztcbi8vIENvbnNvbGUubG9nKCdIZWxsbyBXZWJwYWNrIEVuY29yZSEgRWRpdCBtZSBpbiBhc3NldHMvYXBwLmpzJyk7XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iLCIvKiFcbiAqIEhUTUwgY29tcG9uZW50IHYxLjAuMCAoaHR0cHM6Ly9zY2FsZS5zYy8pXG4gKiBDb3B5cmlnaHQgMjAyMi0yMDIyXG4gKiBMaWNlbnNlZCB1bmRlciBJU0NcbiAqIEJhc2VkIG9uIEJvb3RzdHJhcFxuKi9cbiFmdW5jdGlvbiBuKG8sbCxjKXtmdW5jdGlvbiBpKGUsdCl7aWYoIWxbZV0pe2lmKCFvW2VdKXt2YXIgcj1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCF0JiZyKXJldHVybiByKGUsITApO2lmKGEpcmV0dXJuIGEoZSwhMCk7dGhyb3codD1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2UrXCInXCIpKS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLHR9cj1sW2VdPXtleHBvcnRzOnt9fSxvW2VdWzBdLmNhbGwoci5leHBvcnRzLGZ1bmN0aW9uKHQpe3JldHVybiBpKG9bZV1bMV1bdF18fHQpfSxyLHIuZXhwb3J0cyxuLG8sbCxjKX1yZXR1cm4gbFtlXS5leHBvcnRzfWZvcih2YXIgYT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLHQ9MDt0PGMubGVuZ3RoO3QrKylpKGNbdF0pO3JldHVybiBpfSh7MTpbZnVuY3Rpb24odCxlLHIpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIGModCl7cmV0dXJuIGZ1bmN0aW9uKHQpe2lmKEFycmF5LmlzQXJyYXkodCkpcmV0dXJuIG4odCl9KHQpfHxmdW5jdGlvbih0KXtpZihcInVuZGVmaW5lZFwiIT10eXBlb2YgU3ltYm9sJiZudWxsIT10W1N5bWJvbC5pdGVyYXRvcl18fG51bGwhPXRbXCJAQGl0ZXJhdG9yXCJdKXJldHVybiBBcnJheS5mcm9tKHQpfSh0KXx8ZnVuY3Rpb24odCxlKXtpZih0KXtpZihcInN0cmluZ1wiPT10eXBlb2YgdClyZXR1cm4gbih0LGUpO3ZhciByPU9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh0KS5zbGljZSg4LC0xKTtyZXR1cm5cIk1hcFwiPT09KHI9XCJPYmplY3RcIj09PXImJnQuY29uc3RydWN0b3I/dC5jb25zdHJ1Y3Rvci5uYW1lOnIpfHxcIlNldFwiPT09cj9BcnJheS5mcm9tKHQpOlwiQXJndW1lbnRzXCI9PT1yfHwvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChyKT9uKHQsZSk6dm9pZCAwfX0odCl8fGZ1bmN0aW9uKCl7dGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBzcHJlYWQgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIil9KCl9ZnVuY3Rpb24gbih0LGUpeyhudWxsPT1lfHxlPnQubGVuZ3RoKSYmKGU9dC5sZW5ndGgpO2Zvcih2YXIgcj0wLG49bmV3IEFycmF5KGUpO3I8ZTtyKyspbltyXT10W3JdO3JldHVybiBufSQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7JChcIiNzaWRlYmFyQ29sbGFwc2VcIikub24oXCJjbGlja1wiLGZ1bmN0aW9uKCl7JChcIiNzaWRlYmFyXCIpLnRvZ2dsZUNsYXNzKFwiaGlkZGVuXCIpLCQoXCIjc2lkZWJhckNvbGxhcHNlXCIpLnRvZ2dsZUNsYXNzKFwic2lkZWJhci1oaWRkZW5cIil9KSxkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiI3RvZ2dsZS1wYXNzd29yZFwiKS5mb3JFYWNoKGZ1bmN0aW9uKHIpe3IuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsZnVuY3Rpb24oKXt2YXIgdD1yLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiaW5wdXRcIiksZT1yLnF1ZXJ5U2VsZWN0b3IoXCIjZmFzLWV5ZS1pY29uXCIpO1wicGFzc3dvcmRcIj09PXQudHlwZT8odC50eXBlPVwidGV4dFwiLGUuY2xhc3NMaXN0LmFkZChcImZhLWV5ZS1zbGFzaFwiKSk6KHQudHlwZT1cInBhc3N3b3JkXCIsZS5jbGFzc0xpc3QucmVtb3ZlKFwiZmEtZXllLXNsYXNoXCIpKX0pfSksZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50YWJsZS1zb3J0YWJsZSB0aC5jb2wtc29ydGFibGVcIikuZm9yRWFjaChmdW5jdGlvbih0KXt0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLGZ1bmN0aW9uKCl7IWZ1bmN0aW9uKHQscixlKXt2YXIgZT0hKDI8YXJndW1lbnRzLmxlbmd0aCYmdm9pZCAwIT09ZSl8fGUsbj1lPzE6LTE7aWYoY29uc29sZS5sb2codC50Qm9kaWVzWzBdKSx0LnRCb2RpZXMmJnQudEJvZGllc1swXSl7Zm9yKHZhciBvPXQudEJvZGllc1swXSxsPUFycmF5LmZyb20oby5xdWVyeVNlbGVjdG9yQWxsKFwidHJcIikpLnNvcnQoZnVuY3Rpb24odCxlKXt0PXQucXVlcnlTZWxlY3RvcihcInRkOm50aC1jaGlsZChcIi5jb25jYXQocisxLFwiKVwiKSkudGV4dENvbnRlbnQudHJpbSgpO3JldHVybiBlLnF1ZXJ5U2VsZWN0b3IoXCJ0ZDpudGgtY2hpbGQoXCIuY29uY2F0KHIrMSxcIilcIikpLnRleHRDb250ZW50LnRyaW0oKTx0P246LTEqbn0pO28uZmlyc3RDaGlsZDspby5yZW1vdmVDaGlsZChvLmZpcnN0Q2hpbGQpO28uYXBwZW5kLmFwcGx5KG8sYyhsKSksdC5xdWVyeVNlbGVjdG9yQWxsKFwidGguY29sLXNvcnRhYmxlXCIpLmZvckVhY2goZnVuY3Rpb24odCl7cmV0dXJuIHQuY2xhc3NMaXN0LnJlbW92ZShcInRoLXNvcnQtYXNjXCIsXCJ0aC1zb3J0LWRlc2NcIil9KSx0LnF1ZXJ5U2VsZWN0b3IoXCJ0aC5jb2wtc29ydGFibGU6bnRoLWNoaWxkKFwiLmNvbmNhdChyKzEsXCIpXCIpKS5jbGFzc0xpc3QudG9nZ2xlKFwidGgtc29ydC1hc2NcIixlKSx0LnF1ZXJ5U2VsZWN0b3IoXCJ0aC5jb2wtc29ydGFibGU6bnRoLWNoaWxkKFwiLmNvbmNhdChyKzEsXCIpXCIpKS5jbGFzc0xpc3QudG9nZ2xlKFwidGgtc29ydC1kZXNjXCIsIWUpfX0odC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudCxBcnJheS5wcm90b3R5cGUuaW5kZXhPZi5jYWxsKHQucGFyZW50RWxlbWVudC5jaGlsZHJlbix0KSwhdC5jbGFzc0xpc3QuY29udGFpbnMoXCJ0aC1zb3J0LWFzY1wiKSl9KX0pfSl9LHt9XX0se30sWzFdKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=