var angular = require('angular');

module.exports = angular
    .module('rt.search', [])
    .config(require('./search.route'))
     .controller('SearchController', require('./search.controller'))
      .directive('searchbhuLink', require('./search-bhu.directive'))
      .directive('searcheffortsutilizedLink', require('./search-efforts.directive'))
      .directive('searchwarrantyissueLink', require('./search-warrentyissues.directive'))
      .directive('searchcurrentstatusLink', require('./search-status.directive'));
    

