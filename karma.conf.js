module.exports = function (karma) {
    karma.set({

        frameworks: ['jasmine', 'browserify'],

        files: [
            'app/**/*.js'
        ],

        reporters: ['spec', 'kjhtml'],

        preprocessors: {
            'app/**/*.js': ['browserify']
        },

        browsers: ['PhantomJS'],

        logLevel: 'LOG_DEBUG',

        singleRun: true,
        autoWatch: false,

        // browserify configuration
        browserify: {
            debug: true,
            transform: ['brfs'],
            paths: ['./node_modules', './app/core', './app/data-models']
        }
    });
};