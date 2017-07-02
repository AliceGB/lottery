// 计算模块
// 您选了15注，共30元，若中奖，奖金：6元至60元，您将盈利-24元至30元

class Calc {
    /**
     * 排列组合运算
     * @param  {array} arr 选号列表，如：[01, 02, 03, 04]
     * @param  {number} size 玩法后缀，如：3
     * @return {number}     注数
     */
    static combine(arr, size) {
        // 保存最后各种组合的结果
        let allResult = [];

        // restlt 初始为 []
        (function f(arr, size, restlt) {
            let arrLen = arr.length;

            if (arrLen < size) {
                return;
            }
            if (arrLen === size) {
                allResult.push([].concat(restlt, arr)) // [01, 02, 03]
            } else {
                // 不断增加新的数组
                for (let i = 0; i < arrLen; i++) {
                    // 保存上次运行结果
                    let newResult = [].concat(result);
                    newResult.push(arr[i]);

                    // 如果选择的是‘任一’，则结束计算
                    if (size === 1) {
                        allResult.push(newResult);
                    } else {
                        // 保存上次运行结果
                        let newArr = [].concat(result);
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

    /**
     * 当前选中的注数
     * @param  {number} active 当前选中的号码的个数
     * @param  {string} type   当前选中的玩法类型，如：r3(任三)
     * @return {number}        注数
     */
    calcCount(active, type) {
        let count = 0;
        // type_list 是一个 Map 数据结构
        const exist = this.type_list.has(type);
        // 生成一个长度为 active 的数组，并全部填充 0
        const arr = new Array(active).fill(0);

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
    calcBonus(active, type) {
        const self = this;
        let type_split = type.split(''); // ['r', '3']
        // string 隐式转换成 number
        let arr = new Array(type_split[1] * 1).fill(0);
        let min, max;

        if (type_split[0] === 'r') {
            // 最小命中数
            let min_active = active - 6;

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
            let max_active = Math.min(active, 5);

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
        return [min,max].map((item) => {
            return item*self.type_list.get(type.bonus);
        });
    }
}

export default Calc;
