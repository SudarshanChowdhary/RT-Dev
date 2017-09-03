var gulp = require('gulp');
var run = require('run-sequence');
var config = require('./gulp/util/config-loader')();
var errorHandler = require('./gulp/util/error-handler');
var argv = require('yargs').argv;
require('./gulp/tasks/clean');
require('./gulp/tasks/assets');
require('./gulp/tasks/styles');
require('./gulp/tasks/scripts');
require('./gulp/tasks/html');
require('./gulp/tasks/serve');
require('./gulp/tasks/tests');

gulp.task('build', function (cb) {
    process.env.NODE_ENV = argv.prod ? 'prod' : 'dev';
    if(argv.skipTests) {
        console.log('skipping unit test');
        config.skipTests = true;
    }
    return run('clean:build', ['assets', 'styles', 'scripts'], 'html', errorHandler(cb));
});

gulp.task('serve', function (cb) {
    return run('build', 'serve:mock', errorHandler(cb));
});