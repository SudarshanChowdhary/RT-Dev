var extend = require('extend');
var argv = require('yargs').argv;

module.exports = function () {
    process.env.NODE_ENV = argv.prod ? 'prod' : 'dev';

    if(!global.config) {
        var env = process.env.NODE_ENV,
            path = '../config/',
            baseConfig = require(path + '/base'),
            envConfig = require(path + env);

        console.log('using', env, 'configuration');
        global.config = extend(true, {}, baseConfig, envConfig);
    }

    return global.config;
};