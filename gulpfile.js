//导入gulp
var gulp = require('gulp');
//1.less文件的编译，压缩
// 导入gulp-less插件，用来将less文件编译为css文件
// 导入gulp-cssnano插件，用来压缩css代码
// 导入browser-sync插件，用来同步浏览器，以及自动打开页面
//cnpm install browser-sync --save-dev
//cnpm install gulp-less gulp-cssnano --save-dev
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');
var browserSync = require('browser-sync');
//注册style任务
gulp.task('style',function(){
	gulp.src(['src/styles/*.less','!src/styles/_*.less'])//忽略以_开头的less文件，因为此处以
	// 下划线开头的less文件是已经在其他less文件中导入的文件
	.pipe(less())//编译
	.pipe(cssnano())//压缩
	.pipe(gulp.dest('dist/styles/'))//导出
	.pipe(browserSync.reload({stream:true}));//重载页面
});
//在命令行输入 gulp style 回车,执行任务
//2.JS文件的压缩，合并，混淆，建议先进行合并
// 导入gulp-concat插件，用来合并文件
// 导入gulp-uglify插件，用来压缩混淆文件
//cnpm install gulp-concat gulp-uglify --save-dev
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
//注册script任务
gulp.task('script',function(){
	gulp.src('src/scripts/*.js')//取文件
	.pipe(concat('all.js'))//为合并后的文件命名
	.pipe(uglify())//压缩混淆
	.pipe(gulp.dest('dist/scripts/'))//导出
	.pipe(browserSync.reload({stream:true}));//刷新
});
//在命令行输入 gulp script 回车,执行任务
//3.图片复制：
//注册任务：
gulp.task('image',function(){
	gulp.src('src/images/*.*')//取出src/images下的所有格式的图片文件
	.pipe(gulp.dest('dist/images/'))//复制
	.pipe(browserSync.reload({stream:true}));//刷新
});
//在命令行输入 gulp image 回车,执行任务
//4.HTML文件处理：
//导入gulp-htmlmin插件，用来压缩HTML文件
//cnpm install gulp-htmlmin --save-dev
var htmlmin = require('gulp-htmlmin');
//注册html任务
gulp.task('html',function(){
	gulp.src('src/*.html')//取文件
	.pipe(htmlmin({
		collapseWhitespace:true,
		removeComments:true
	}))//配置参数：除去空白字符（空格）和注释
	.pipe(gulp.dest('dist/'))//输出
	.pipe(browserSync.reload({stream:true}));//刷新
});
//在命令行输入 gulp html 回车,执行任务
//5.监视文件变化，并自动同步和显示页面
// 注册serve任务
gulp.task('serve',function(){
	browserSync.init({
		server:{
			baseDir:'./dist'//默认打开disc文件下的index.html文件
		}
	});
	//监视下面的文件，当文件更改后执行数组内的任务
	gulp.watch('src/styles/*.less',['style']);	
	gulp.watch('src/scripts/*.js',['script']);	
	gulp.watch('src/images/*.*',['image']);	
	gulp.watch('src/*.html',['html']);	
});
//在命令行输入 gulp serve 回车,执行任务
