/**
 * 对命令行参数进行解析
 */

// node.js 命令行框架
import yargs from 'yargs';

const args = yargs
    .option('production', {
        // 生产环境，默认关闭
        boolean: true,
        default: false,
        describe: 'min all scripts'
    })
    .option('watch', {
        // 监听开发环境中的文件，自动更新
        boolean: true,
        default: false,
        describe: 'min all files'
    })
    .option('verbose', {
        // 输出命令行执行日志
        boolean: true,
        default: false,
        describe: 'log'
    })
    .option('sourcemaps', {
        // 压缩
        describe: 'force the creation of sourcemaps'
    })
    .option('port', {
        // 服务器端口
        string: true,
        default: 8080,
        describe: 'server port'
    })
    .argv;

export default args;
