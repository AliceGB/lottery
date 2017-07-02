/**
 * gulp 自动化配置
 * 处理模板 views 信息
 */

import gulp from 'gulp';
// gulp 判断语句
import gulpif from 'gulp-if';
// 浏览器热更新
import livereload from 'gulp-livereload';
// 对命令行参数进行解析
import args from './util/args';

// 使用 gulp 创建一个任务
gulp.task('pages', () => {
    return gulp.src('app/**/*.ejs')
        // 文件存放路径
        .pipe(gulp.dest('server'))
        // 热更新，若命令行中有 watch 这个参数才执行
        .pipe(gulpif(args.watch, livereload()));
});
