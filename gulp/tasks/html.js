var gulp = require('gulp');
var config = require('../util/config-loader')();
var plugins = require('gulp-load-plugins')();
var run = require('run-sequence');

gulp.task('html:copy', function () {
    return gulp
        .src(config.html.src, { base: './' })
        .pipe(gulp.dest(config.build.root));
});

gulp.task('html:inject', function () {
    return gulp
        .src(config.build.index)
        .pipe(plugins.inject(gulp.src(config.build.inject), {
            ignorePath: 'build/'
        }))
        .pipe(gulp.dest(config.build.root));
});

gulp.task('html', function(cb){
    return run('html:copy', 'html:inject', cb);
});