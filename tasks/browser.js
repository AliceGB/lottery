/**
 * gulp 自动化配置
 * 浏览器热更新监听
 * 当 app/js 变化时，启动 task/scripts.js
 * 当 app/css 变化时，启动 task/styles.js
 * 当 app/views 变化时，启动 task/pages.js
 */

import gulp from 'gulp';
// gulp 判断语句
import gulpif from 'gulp-if';
// 浏览器热更新
import livereload from 'gulp-livereload';
// 命令行输出
import util from 'gulp-util';
// 对命令行参数进行解析
import args from './util/args';

// 使用 gulp 创建一个任务
gulp.task('browser', (cb) => {
    if (!args.watch) {
        return cb();
    }

    // 热更新
    gulp.watch(['app/**/*.js'], ['scripts']);
    gulp.watch(['app/**/*.css'], ['styles']);
    gulp.watch(['app/**/*.ejs'], ['pages']);
});
