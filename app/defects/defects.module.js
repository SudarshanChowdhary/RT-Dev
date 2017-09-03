var angular = require('angular');

module.exports = angular
    .module('rt.defects', [])
    .config(require('./defects.route'))
    .controller('DefectsController', require('./defects.controller'))
    .factory('defectsservice', require('./defects.service'));

