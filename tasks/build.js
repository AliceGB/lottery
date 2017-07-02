/**
 * gulp 自动化配置
 * 设置 gulp task 的顺序
 */

import gulp from 'gulp';
// 删除命令
import gulpSequence from 'gulp-sequence';
// 设置 gulp task 的顺序

// 使用 gulp 创建一个任务
gulp.task('build', gulpSequence('clean', 'styles', 'pages', 'scripts', ['browser', 'serve']));
