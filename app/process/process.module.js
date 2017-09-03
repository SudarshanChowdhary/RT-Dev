var angular = require('angular');

module.exports = angular
    .module('rt.process', [])
    .config(require('./process.route'))
    .controller('ProcessController', require('./process.controller'));
