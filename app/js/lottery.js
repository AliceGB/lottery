// 集成模块

import 'babel-polyfill';
import $ from 'jquery';
import Base from './base.js';
import Interface from './interface.js';
import Calc from './calc.js';
import Time from './time.js';

/**
 * 深拷贝
 * @param  {[type]} target [description]
 * @param  {[type]} source [description]
 * @return {[type]}        [description]
 */
const copyProperties = function(target, source) {
    // Reflect.ownKeys()方法返回target对象自己的属性键的数组。
    for (let key of Reflect.ownKeys(source)) {
        if (key !== 'constructor' && key !== 'prototype' && key !== 'name') {
            // 获取指定对象的自身属性描述符
            let desc = Object.getOwnPropertyDescriptor(source, key);
            Object.defineProperty(target, key, desc);
        }
    }
};

/**
 * 类的多重继承
 * @param  {...[type]} rest [description]
 * @return {[type]}         [description]
 */
const mix = function(...rest) {
    class Mix {}
    for (let item of rest) {
        copyProperties(Mix, item);
        copyProperties(Mix.prototype, item.prototype);
    }
    return Mix;
};

class Lottery extends mix(Base, Interface, Calc, Time) {
    // name 用于标识彩种
    // cname 彩种名称
    // issue 期号
    // state 销售状态
    constructor(name = 'syy', cname = '11选5', issue = '**', state = '**') {
        super();
        this.name = name;
        this.cname = cname;
        this.issue = issue;
        this.state = state;

        // 遗漏
        this.omit = new Map();
        // 玩法列表
        this.type_list = new Map();
        // 初始化1~11号码
        this.number = new Set();
        // 开奖号码
        this.open_code = new Set();
        this.open_code_list = new Map();

        this.el = '';
        // 期号选择器
        this.issue_el = '#curr_issue';
        // 状态选择器
        this.state_el = '.state_el';
        // 倒计时选择器
        this.countdown_el = '#countdown';
        // 购物车选择器
        this.cart_el = '.codelist';
        // 遗漏选择器
        this.omit_el = '';
        // 当前玩法选择器
        this.cur_play = 'r5';

        // 初始化各玩法的说明
        this.initTypeList();
        // 初始化1~11号码
        this.initNumber();
        this.updateState();
        this.initEvent();
    }

    /**
     * 各种更新
     * @return {[type]} [description]
     */
    updateState() {
        let self = this;
        this.getState().then(function(res) {
            self.issue = res.issue;
            self.end_time = res.end_time;
            self.state = res.state;
            // 更新当前期号
            $(self.issue_el).text(res.issue);
            // 更新倒计时
            self.countDown(res.end_time, function(time) {
                $(self.countdown_el).text(time);
            }, function() {
                setTimeout(function() {
                    self.updateState();
                    self.getOmit(this.issue).then(function(res) {
                        // body...
                    });
                    self.getOpenNumber(this.issue).then(function(res) {
                        // body...
                    });
                }, 500);
            });
        });
    }

    /**
     * 初始化事件
     * @return {[type]} [description]
     */
    initEvent() {
        let self = this;
        // 玩法切换
        $('#plays').on('click', 'li', self.changePlayNav.bind(self));
        // 号码的选中
        $('.boll-list').on('click', '.btn-boll', self.toggleCodeActive.bind(self));
        // 添加号码
        $('#confirm_sel_code').on('click', self.addCode.bind(self));
        // 清空
        $('.dxjo').on('click', 'li', self.assistHandle.bind(self));
        // 随机号码
        $('.qkmethod').on('click', '.btn-middle', self.getRandomCode.bind(self));
    }
}

export default Lottery;
