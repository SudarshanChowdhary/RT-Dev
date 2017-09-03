var src = '.',
    app = src + '/app',
    build = './build',
    content = src + '/content';

module.exports = {
    src: src,

    build: {
        root: build,
        index: build + '/index.html',
        inject: [build + '/scripts/*.js', build + '/styles/*.css']
    },

    app: app,

    scripts: {
        src: app + '/app.js',
        build: build + '/scripts',
        output: 'rtdashboard.js',
        all: app + '/**/*.js',
        include: ['./node_modules', './app/core']
    },

    styles: {
        src: content + '/styles/rtdashboard.scss',
        all: content + '/styles/**/*.scss',
        build: build + '/styles',
        prefix: {
            browsers: [
                'last 2 versions',
                'Safari >= 5.1.10',
                'Explorer >= 7',
                'iOS >= 6.1',
                'Android >= 4.1.1',
                'Firefox <= 20'
            ]
        },
        sassConfig: {
            'default-encoding': 'UTF-8',
            includePaths: 'node_modules/bootstrap-sass/assets/stylesheets'
        }
    },

    images: {
        src: content + '/images/*.*',
        fav: src + '/*.ico',
        build: build + '/images'
    },

    fonts: {
        src: [content + '/fonts/**/*.{eot,svg,ttf,woff,woff2}', 'node_modules/bootstrap-sass/assets/fonts/**/*.*'],
        build: build + '/fonts',
        replaceUrl: null
    },

    html: {
        src: [src + '/app/**/*.html', src + '/errorpages/**/*.html', src + '/*.html']
    },

    karmaConfig: require('path').resolve('karma.conf.js'),

    mock: {
        path: './mock',
        config: 'mock/mock.config.js'
    },

    debug: false,

    versioning: false,

    optimize: false
};