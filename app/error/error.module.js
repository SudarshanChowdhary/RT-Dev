var angular = require('angular');

module.exports = angular
    .module('rt.error', [])
    .config(require('./error.route'))
    .controller('ErrorController', require('./error.controller'));
