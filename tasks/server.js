/**
 * gulp 自动化配置
 * 处理服务器的脚本
 */

import gulp from 'gulp';
// gulp 判断语句
import gulpif from 'gulp-if';
// 启动服务器
import liveserver from 'gulp-live-server';
// 对命令行参数进行解析
import args from './util/args';

// 使用 gulp 创建一个任务
gulp.task('serve', (cb) => {
    // 若命令行不处于监听状态，返回
    // if (!args.watch) {
    //     return cb();
    // }

    // 创建一个服务器并启动
    var server = liveserver.new(['--harmony', 'server/bin/www']);
    server.start();

    // 热更新
    gulp.watch(['server/public/**/*.js', 'server/public/**/*.css', 'server/views/*.ejs'], (file) => {
        server.notify.apply(server, [file]);
    });

    // 需要重启服务器才能更新
    gulp.watch(['server/routes/**/*.js', 'server/app.js'], () => {
        server.start.bind(server)();
    });
});
