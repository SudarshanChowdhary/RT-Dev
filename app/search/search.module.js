var angular = require('angular');

module.exports = angular
    .module('rt.search', [])
    .config(require('./search.route'))
     .controller('SearchController', require('./search.controller'));
    

