var gulp = require('gulp');
var config = require('../util/config-loader')();
var plugins = require('gulp-load-plugins')();

gulp.task('clean:build', function () {
    return gulp.src(config.build.root, { read: false })
        .pipe(plugins.clean());
});

gulp.task('styles:clean', function () {
    return gulp.src(config.styles.build, { read: false })
        .pipe(plugins.print())
        .pipe(plugins.clean());
});

gulp.task('scripts:clean', function () {
    return gulp.src(config.scripts.build, { read: false })
        .pipe(plugins.print())
        .pipe(plugins.clean());
});

