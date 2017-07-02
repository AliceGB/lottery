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
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(4);


/***/ }),
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// 计算模块
	// 您选了15注，共30元，若中奖，奖金：6元至60元，您将盈利-24元至30元

	var Calc = function () {
	    function Calc() {
	        _classCallCheck(this, Calc);
	    }

	    _createClass(Calc, [{
	        key: 'calcCount',


	        /**
	         * 当前选中的注数
	         * @param  {number} active 当前选中的号码的个数
	         * @param  {string} type   当前选中的玩法类型，如：r3(任三)
	         * @return {number}        注数
	         */
	        value: function calcCount(active, type) {
	            var count = 0;
	            // type_list 是一个 Map 数据结构
	            var exist = this.type_list.has(type);
	            // 生成一个长度为 active 的数组，并全部填充 0
	            var arr = new Array(active).fill(0);

	            if (exist && type.at(0) === 'r') {
	                // 取 rx 后面的 x
	                count = Calc.combine(arr, type.split('')[1]).length;
	            }
	            return count;
	        }

	        /**
	         * 计算奖金范围
	         * @param  {number} active 当前选中的号码的个数
	         * @param  {string} type   当前选中的玩法类型，如：r3(任三)
	         * @return {array}        [min, max]
	         */

	    }, {
	        key: 'calcBonus',
	        value: function calcBonus(active, type) {
	            var self = this;
	            var type_split = type.split(''); // ['r', '3']
	            // string 隐式转换成 number
	            var arr = new Array(type_split[1] * 1).fill(0);
	            var min = void 0,
	                max = void 0;

	            if (type_split[0] === 'r') {
	                // 最小命中数
	                var min_active = active - 6;

	                if (min_active > 0) {
	                    if (min_active - type_split[1] >= 0) {
	                        arr = new Array(min_active).fill(0);
	                        min = Calc.combine(arr, type_split[1]).length;
	                    } else {
	                        // 是否是‘任6 7 8’
	                        if (type_split[1] - 5 > 0 && active - type_split[1] >= 0) {
	                            arr = new Array(active - 5).fill(0);
	                            min = Calc.combine(arr, type_split[1] - 5).length;
	                        } else {
	                            min = active - type_split[1] > 1 ? 1 : 0;
	                        }
	                    }
	                } else {
	                    min = active - type_split[1] > -1 ? 1 : 0;
	                }

	                // 最大命中数
	                var max_active = Math.min(active, 5);

	                if (type_split[1] - 5 > 0) {
	                    if (active - type_split[1] >= 0) {
	                        arr = new Array(active - 5).fill(0);
	                        min = Calc.combine(arr, type_split[1] - 5).length;
	                    } else {
	                        max = 0;
	                    }
	                } else if (type_split[1] - 5 < 0) {
	                    arr = new Array(Math.min(active, 5)).fill(0);
	                    min = Calc.combine(arr, type_split[1]).length;
	                } else {
	                    max = 1;
	                }
	            }
	            return [min, max].map(function (item) {
	                return item * self.type_list.get(type.bonus);
	            });
	        }
	    }], [{
	        key: 'combine',

	        /**
	         * 排列组合运算
	         * @param  {array} arr 选号列表，如：[01, 02, 03, 04]
	         * @param  {number} size 玩法后缀，如：3
	         * @return {number}     注数
	         */
	        value: function combine(arr, size) {
	            // 保存最后各种组合的结果
	            var allResult = [];

	            // restlt 初始为 []
	            (function f(arr, size, restlt) {
	                var arrLen = arr.length;

	                if (arrLen < size) {
	                    return;
	                }
	                if (arrLen === size) {
	                    allResult.push([].concat(restlt, arr)); // [01, 02, 03]
	                } else {
	                    // 不断增加新的数组
	                    for (var i = 0; i < arrLen; i++) {
	                        // 保存上次运行结果
	                        var newResult = [].concat(result);
	                        newResult.push(arr[i]);

	                        // 如果选择的是‘任一’，则结束计算
	                        if (size === 1) {
	                            allResult.push(newResult);
	                        } else {
	                            // 保存上次运行结果
	                            var newArr = [].concat(result);
	                            // 重点！截取数组片段
	                            newArr.splice(0, i + 1);
	                            // 递归
	                            f(newArr, size - 1, newResult);
	                        }
	                    }
	                }
	            })(arr, size, []);

	            return allResult;
	        }
	    }]);

	    return Calc;
	}();

	exports.default = Calc;

/***/ })
/******/ ]);