// 接口模块
// 期号接口、倒计时 end 时间戳接口、销售状态接口、遗漏接口、开奖号接口

import $ from 'jquery';

class Interface {
    /**
     * 遗漏接口
     * @param  {string} issue 当前期号
     * @return {[type]}       [description]
     */
    getOmit(issue) {
        let self = this;
        return new Promise((resolve, reject) => {
            $.ajax({
                url: '/get/omit',
                dataType: 'json',
                data: { issue: issue },
                success: function(res) {
                    self.setOmint(res.data);
                    resolve.call(self, res);
                },
                error: function(err) {
                    reject.call(err);
                }
            });
        });
    }

    /**
     * 开奖号接口
     * @param  {string} issue 当前期号
     * @return {[type]}       [description]
     */
    getOpenNumber(issue) {
        let self = this;
        return new Promise((resolve, reject) => {
            $.ajax({
                url: '/get/openNumber',
                dataType: 'json',
                data: { issue: issue },
                success: function(res) {
                    self.setOpenNumber(res.data);
                    resolve.call(self, res);
                },
                error: function(err) {
                    reject.call(err);
                }
            });
        });
    }

    /**
     * 销售状态接口
     * @param  {string} issue 当前期号
     * @return {[type]}       [description]
     */
    getState(issue) {
        let self = this;
        return new Promise((resolve, reject) => {
            $.ajax({
                url: '/get/state',
                dataType: 'json',
                data: { issue: issue },
                success: function(res) {
                    resolve.call(self, res);
                },
                error: function(err) {
                    reject.call(err);
                }
            });
        });
    }
}

export default Interface;
