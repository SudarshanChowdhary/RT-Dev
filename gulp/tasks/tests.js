var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var karma = require('karma').Server;

var run = require('run-sequence');
var config = require('../util/config-loader')();

gulp.task('test', function (done) {
    if(config.skipTests) {
        return done();
    }

    return new karma({
        configFile: config.karmaConfig,
        singleRun: true
    }, done).start();
});

gulp.task('test:watch', function (done) {
    return new karma({
        configFile: config.karmaConfig,
        singleRun: false
    }, done).start();
})

gulp.task('test:chrome', function (done) {
    return new karma({
        configFile: config.karmaConfig,
        browsers: ['Chrome'],
        singleRun: false
    }, done).start();
});
