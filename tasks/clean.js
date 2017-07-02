/**
 * gulp 自动化配置
 * 清空指定文件夹里的文件
 */

import gulp from 'gulp';
// 删除命令
import del from 'del';
// 对命令行参数进行解析
import args from './util/args';

// 使用 gulp 创建一个任务
gulp.task('clean', () => {
    return del(['server/public', 'server/views']);
});
