/**
 * gulp 自动化配置
 * 处理 js 代码
 */

import gulp from 'gulp';
// gulp 判断语句
import gulpif from 'gulp-if';
// 字符串拼接
import concat from 'gulp-concat';
// 构建
import webpack from 'webpack';
// 基于流的构建
import gulpWebpack from 'webpack-stream';
// 处理文件信息流
import plumber from 'gulp-plumber';
// 文件命名
import named from 'vinyl-named';
// 文件重命名
import rename from 'gulp-rename';
// 浏览器热更新
import livereload from 'gulp-livereload';
// css、js压缩
import uglify from 'gulp-uglify';
// 命令行输出
import { log, colors } from 'gulp-util';
// 对命令行参数进行解析
import args from './util/args';

// 使用 gulp 创建一个任务
gulp.task('scripts', () => {
    return gulp.src('app/js/*.js')
        // 错误日志检查处理
        .pipe(plumber({
            errorHandle: function() {

            }
        }))
        // 文件命名
        .pipe(named())
        // 遇到 js 文件时，用 babel 处理
        // npm install babel-loader babel-core babel-preset-env --save-dev
        .pipe(gulpWebpack({
            module: {
                loaders: [{
                    test: /\.js$/,
                    loader: 'babel'
                }]
            }
        }), null, (err, stats) => {
            log(`Finished '${colors.cyan('scripts')}'`, stats.toString({
                chunks: false
            }));
        })
        // 文件存放路径
        .pipe(gulp.dest('server/public/js'))
        // 备份并重命名
        .pipe(rename({
            basename: 'cp',
            extname: '.min.js'
        }))
        // 压缩
        .pipe(uglify({
            compress: {
                properties: false
            },
            output: {
                'quote_keys': true
            }
        }))
        // 文件存放路径
        .pipe(gulp.dest('server/public/js'))
        // 热更新，若命令行中有 watch 这个参数才执行
        .pipe(gulpif(args.watch, livereload()));
});
