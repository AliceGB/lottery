/**
 * gulp 自动化配置默认文件
 * 执行: gulp --watch
 */

import gulp from 'gulp'; // 获取 gulp
import yargs from 'yargs'; // node.js 命令行框架
import requireDir from 'require-dir'; // 包含文件
import del from 'del'; // 清除文件
// import copy from 'copy'; // 复制文件
// import rev from 'gulp-rev'; //
// import revReplace from 'gulp-rev-replace'; //
// import useref from 'gulp-useref'; //
// import filter from 'gulp-filter'; //
// import csso from 'gulp-csso'; //
import gulpSequence from 'gulp-sequence'; // 设置 gulp task 的顺序
import gulpif from 'gulp-if'; // gulp 判断语句
import livereload from 'gulp-livereload'; // 浏览器热更新
import util from 'gulp-util'; // 命令行输出
import concat from 'gulp-concat'; // 字符串拼接(合并文件)
import webpack from 'webpack'; // 构建
import gulpWebpack from 'webpack-stream'; // 基于流的构建
import plumber from 'gulp-plumber'; // 处理文件信息流
import named from 'vinyl-named'; // 文件命名
import rename from 'gulp-rename'; // 文件重命名
import htmlmin from 'gulp-htmlmin'; // html 压缩
import htmlReplace from 'gulp-html-replace'; // html 文件对合并文件后的替换处理插件
import uglify from 'gulp-uglify'; // js 压缩
import minifyCSS from 'gulp-minify-css'; // css 压缩
import imagemin from 'gulp-imagemin'; // 图片压缩
import liveserver from 'gulp-live-server'; // 启动服务器



// npm install ... --save-dev

// 对命令行参数进行解析
const args = yargs
    // 生产环境，默认关闭
    .option('production', {
        boolean: true,
        default: false,
        describe: 'min all scripts'
    })
    // 监听开发环境中的文件，自动更新
    .option('watch', {
        boolean: true,
        default: false,
        describe: 'min all files'
    })
    // 输出命令行执行日志
    .option('verbose', {
        boolean: true,
        default: false,
        describe: 'log'
    })
    // 压缩
    .option('sourcemaps', {
        describe: 'force the creation of sourcemaps'
    })
    // 服务器端口
    .option('port', {
        string: true,
        default: 8080,
        describe: 'server port'
    })
    .argv;

// default task
gulp.task('default', ['build']);

// 设置 gulp task 的顺序
gulp.task('build', gulpSequence('clean', 'pages', 'styles', 'images', 'scripts', ['browser', 'serve']));

// 清空指定文件夹里的文件(清除旧部署文件)
gulp.task('clean', () => {
    return del(['server/public', 'server/views']);
});

// 处理模板 views 信息
gulp.task('pages', () => {
    return gulp.src('app/**/*.ejs')
        // 文件存放路径
        .pipe(gulp.dest('server'))
        // 热更新，若命令行中有 watch 这个参数才执行
        .pipe(gulpif(args.watch, livereload()));
});

// 处理 css 文件
gulp.task('styles', () => {
    return gulp.src('app/**/*.css')
        // 压缩文件
        .pipe(minifyCSS())
        // 文件存放路径
        .pipe(gulp.dest('server/public'))
        // 热更新，若命令行中有 watch 这个参数才执行
        .pipe(gulpif(args.watch, livereload()));
});

// 图片处理
gulp.task('images', function() {
    return gulp.src('app/**/*.{png,jpg,jpeg,gif,webp,svg,ico}')
        // 压缩图片
        // .pipe(imagemin({
        //     progressive: true
        // }))
        // 文件存放路径
        .pipe(gulp.dest('server/public'))
        // 热更新，若命令行中有 watch 这个参数才执行
        .pipe(gulpif(args.watch, livereload()));
});

// 处理 js 代码
gulp.task('scripts', () => {
    return gulp.src('app/**/*.js')
        .pipe(plumber({
            errorHandle: function() {}
        }))
        .pipe(named())
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
            }))
        })
        .pipe(gulp.dest('server/public/js'))
        .pipe(rename({
            basename: 'cp',
            extname: '.min.js'
        }))
        .pipe(uglify({ compress: { properties: false }, output: { 'quote_keys': true } }))
        .pipe(gulp.dest('server/public/js'))
        .pipe(gulpif(args.watch, livereload()))
});

// 在 html 中替换调用的 js代码，以及压缩 html
// 例如: a.html 调用了 a.js b.js，然后 a.js b.js在前面被合并成 c.min.js，这个 task 的作用就是将 a.html 中改成调用 c.min.js
// gulp.task('htmlmin', function() {
//     let options = {
//         // 压缩HTML
//         collapseWhitespace: true,
//         // 压缩页面JS
//         minifyJS: true,
//         // 压缩页面CSS
//         minifyCSS: true,
//         // 省略布尔属性的值
//         collapseBooleanAttributes: false
//     };

//     return gulp.src('../**/*.{htm,html,ejs}')
//         .pipe(htmlReplace({
//             'cpjs': '/js/cp.min.js',
//         }))
//         .pipe(htmlmin(options))
//         // 文件存放路径
//         .pipe(gulp.dest('server/public'))
//         // 热更新，若命令行中有 watch 这个参数才执行
//         .pipe(gulpif(args.watch, livereload()));
// });

// 浏览器热更新监听，当 前者变化时，启动后面的任务
gulp.task('browser', (cb) => {
    if (!args.watch) {
        return cb();
    }

    // 热更新
    gulp.watch(['app/**/*.js'], ['scripts']);
    gulp.watch(['app/**/*.css'], ['styles']);
    gulp.watch(['app/**/*.ejs'], ['pages']);
});

// 处理服务器的脚本
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
