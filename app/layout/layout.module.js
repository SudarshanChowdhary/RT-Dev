var angular = require('angular');

module.exports = angular
    .module('rt.layout', [])
    .component('rtHeader', require('./header/header.component'));