// 时间模块

class Time {
    /**
     * 倒计时
     * @param  {Number} end    截止时间
     * @param  {[type]} update 时间更新的回调
     * @param  {[type]} handle 结束回调
     * @return {[type]}        [description]
     */
    countDown(end, update, handle) {
        // now 1498917683022
        // end 1498917826710
        const now = new Date().getTime();
        const self = this;

        if (now - end > 0) {
            handle.call(self);
        } else {
            // 剩余时间
            let last_time = end - now;

            const d_to_ms = 24 * 60 * 60 * 1000;
            const h_to_ms = 60 * 60 * 1000;
            const m_to_ms = 60 * 1000;
            const s_to_ms = 1000;

            let d = Math.floor(last_time / d_to_ms);
            let h = Math.floor((last_time - d * d_to_ms) / h_to_ms);
            let m = Math.floor((last_time - d * d_to_ms - h * h_to_ms) / m_to_ms);
            let s = Math.floor((last_time - d * d_to_ms - h * h_to_ms - m * m_to_ms) / s_to_ms);

            let arr = [];

            if (d > 0) {
                arr.push(`${d}天`);
            }
            if (h > 0 || arr.length > 0) {
                arr.push(`${h}小时`);
            }
            if (m > 0 || arr.length > 0) {
                arr.push(`${m}分钟`);
            }
            if (s > 0 || arr.length > 0) {
                arr.push(`${s}秒`);
            }

            self.last_time = arr.join('');
            update.call(self, arr.join(''));

            setTimeout(function() {
                self.countDown(end, update, handle);
            }, 1000);
        }
    }
}

export default Time;
