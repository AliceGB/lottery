/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(304);


/***/ }),

/***/ 304:
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// 时间模块

	var Time = function () {
	    function Time() {
	        _classCallCheck(this, Time);
	    }

	    _createClass(Time, [{
	        key: 'countDown',

	        /**
	         * 倒计时
	         * @param  {Number} end    截止时间
	         * @param  {[type]} update 时间更新的回调
	         * @param  {[type]} handle 结束回调
	         * @return {[type]}        [description]
	         */
	        value: function countDown(end, update, handle) {
	            // now 1498917683022
	            // end 1498917826710
	            var now = new Date().getTime();
	            var self = this;

	            if (now - end > 0) {
	                handle.call(self);
	            } else {
	                // 剩余时间
	                var last_time = end - now;

	                var d_to_ms = 24 * 60 * 60 * 1000;
	                var h_to_ms = 60 * 60 * 1000;
	                var m_to_ms = 60 * 1000;
	                var s_to_ms = 1000;

	                var d = Math.floor(last_time / d_to_ms);
	                var h = Math.floor((last_time - d * d_to_ms) / h_to_ms);
	                var m = Math.floor((last_time - d * d_to_ms - h * h_to_ms) / m_to_ms);
	                var s = Math.floor((last_time - d * d_to_ms - h * h_to_ms - m * m_to_ms) / s_to_ms);

	                var arr = [];

	                if (d > 0) {
	                    arr.push(d + '\u5929');
	                }
	                if (h > 0 || arr.length > 0) {
	                    arr.push(h + '\u5C0F\u65F6');
	                }
	                if (m > 0 || arr.length > 0) {
	                    arr.push(m + '\u5206\u949F');
	                }
	                if (s > 0 || arr.length > 0) {
	                    arr.push(s + '\u79D2');
	                }

	                self.last_time = arr.join('');
	                update.call(self, arr.join(''));

	                setTimeout(function () {
	                    self.countDown(end, update, handle);
	                }, 1000);
	            }
	        }
	    }]);

	    return Time;
	}();

	exports.default = Time;

/***/ })

/******/ });