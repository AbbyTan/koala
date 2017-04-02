var gulp = require('gulp');
var less = require('gulp-less');
//确保本地已安装gulp-minify-css [npm install gulp-minify-css --save-dev]
var cssmin = require('gulp-minify-css');
//确保本地已安装gulp-sourcemaps [npm install gulp-sourcemaps --save-dev]
var sourcemaps = require('gulp-sourcemaps');
//当发生异常时提示错误 确保本地安装gulp-notify和gulp-plumber
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');

var srcLess = './src/less/**/*.less',
    destLess = './dist/lessCss';

// 1. 基本使用, 编译单个文件 
// 'src/less/index.less'

// 2. 多个文件以数组形式传入
// ['src/less/index.less','src/less/detail.less']

// 3. 匹配符“!”，“*”，“**”，“{}”
// 编译src目录下的所有less文件,除了reset.less和test.less（**匹配src/less的0个或多个子文件夹）
// ['src/less/*.less', '!src/less/**/{reset,test}.less']

gulp.task('testLess', function() {
    gulp.src(srcLess)
        .pipe(plumber({
            errorHandler: notify.onError('Error: <%= error.message %>')
        }))
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(destLess));
});

gulp.task('testWatch', function() {
    gulp.watch(srcLess, ['testLess']); //当所有less文件发生改变时，调用testLess任务
});