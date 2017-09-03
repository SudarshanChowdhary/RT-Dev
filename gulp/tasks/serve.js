var gulp = require('gulp');
var browserSync = require('browser-sync');
var mockMiddleware = require('../util/mock-middleware');

gulp.task('serve:mock', function () {
    browserSync({
        notify: false,
        port: 3001,
        server: {
            baseDir: './build'
        },
        middleware: [mockMiddleware]
    });

    gulp.watch(config.scripts.all, ['scripts']);
    gulp.watch(config.styles.all, ['styles']);
    gulp.watch(config.html.src, ['html']).on('end', browserSync.reload);
});