 var gulp = require('gulp');
 var sass = require('gulp-sass');
 var connect = require('gulp-connect');
//gulp.task("copy-index",function(){
//	gulp.src("index.html").pipe(gulp.dest("dist")).pipe(connect.reload());
//;
//})
gulp.task("copy-html",function(){
	gulp.src("*.html").pipe(gulp.dest("dist")).pipe(connect.reload());
;
})
//gulp.task("copy-detail",function(){
//	gulp.src("detail.html").pipe(gulp.dest("dist")).pipe(connect.reload());
//;
//})
gulp.task("copy-image",function(){
	gulp.src("img/**").pipe(gulp.dest("dist/images")).pipe(connect.reload());
})
gulp.task("html",function(){
	gulp.src("html/**").pipe(gulp.dest("dist/htmls")).pipe(connect.reload());
})
gulp.task("copy-data",function(){
	gulp.src("data/**").pipe(gulp.dest("dist/data")).pipe(connect.reload());
})
gulp.task("copy-js",function(){
	gulp.src("js/**").pipe(gulp.dest("dist/js")).pipe(connect.reload());
})
gulp.task("copy-sass",function(){
	gulp.src("css/*.scss").pipe(sass()).pipe(gulp.dest("dist/css")).pipe(connect.reload());
})
gulp.task("server",function(){
	connect.server({
		root:"dist",
		livereload:true
		});
//	gulp.watch("index.html",["copy-index"]);
	gulp.watch("*.html",["copy-html"]);
	gulp.watch("img/**",["copy-image"]);
	gulp.watch("css/*.scss",["copy-sass"]);	
	gulp.watch("js/**",["copy-js"]);
	gulp.watch("data/**",["copy-data"]);
	gulp.watch("html/**",["html"]);
})
gulp.task("default",["server"]);
