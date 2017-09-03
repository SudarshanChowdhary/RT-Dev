var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var config = require('../util/config-loader')();
var run = require('run-sequence');
var browserSync = require('browser-sync');

gulp.task('styles:sass', function () {
    return gulp
        .src(config.styles.src)
        .pipe(plugins.print())
        .pipe(plugins.if(config.debug, plugins.sourcemaps.init()))
        .pipe(plugins.sass(config.styles.sassConfig)
            .on('error', plugins.sass.logError))
        .pipe(plugins.autoprefixer(config.styles.prefix))
        .pipe(plugins.if(config.debug, plugins.sourcemaps.write('./')))
        .pipe(plugins.if(config.optimize, plugins.csso()))
        .pipe(plugins.if(config.versioning, plugins.rev()))
        .pipe(gulp.dest(config.styles.build))
        .pipe(plugins.print())
        .pipe(browserSync.stream());
});

gulp.task('styles:lint', function(){
    return gulp
        .src(config.styles.all)
        .pipe(plugins.sassLint())
        .pipe(plugins.sassLint.format())
        .pipe(plugins.sassLint.failOnError());
});

gulp.task('styles', function(cb){
    return run('styles:clean', 'styles:lint', 'styles:sass', cb);
});
