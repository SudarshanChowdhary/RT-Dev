var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var config = require('../util/config-loader')();
var run = require('run-sequence');
var browserSync = require('browser-sync');

gulp.task('scripts:compile', function () {
    var bundle = browserify({
        entries: config.scripts.src,
        debug: config.debug,
        paths: config.scripts.include
    }).bundle();

    return bundle
        .pipe(source(config.scripts.output))
        .pipe(buffer())
        .pipe(plugins.if(config.debug, plugins.sourcemaps.init({
            loadMaps: true
        })))
        .pipe(plugins.if(config.optimize, plugins.uglify({
            compress: {
                drop_console: true
            }
        })))
        .pipe(plugins.if(config.versioning, plugins.rev()))
        .pipe(plugins.if(config.debug, plugins.sourcemaps.write('./')))
        .pipe(gulp.dest(config.scripts.build))
        .pipe(plugins.print())
        .pipe(browserSync.stream());
});


gulp.task('scripts:lint', function () {
    return gulp.src(config.scripts.all)
        // .pipe(plugins.eslint())
        // .pipe(plugins.eslint.format());
        // .pipe(plugins.eslint.failAfterError());
});

gulp.task('scripts', function (cb) {
    return run('scripts:clean', 'scripts:lint', 'scripts:compile', cb);
});