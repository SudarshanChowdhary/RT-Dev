var gulp = require('gulp');
var config = require('../util/config-loader')();
var plugins = require('gulp-load-plugins')();
var run = require('run-sequence');

gulp.task('fonts:copy', function () {
    return gulp
        .src(config.fonts.src)
        .pipe(gulp.dest(config.fonts.build));
});

gulp.task('images:copy', function () {
    return gulp
        .src(config.images.src)
        .pipe(gulp.dest(config.images.build));
});

gulp.task('fav:copy', function () {
    return gulp
        .src(config.images.fav)
        .pipe(gulp.dest(config.build.root));
});

gulp.task('assets', function (cb) {
    return run(['fonts:copy', 'fav:copy', 'images:copy'], cb);
});