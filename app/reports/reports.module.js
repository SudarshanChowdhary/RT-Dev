var angular = require('angular');

module.exports = angular
    .module('rt.reports', [])
    .config(require('./reports.route'))
    .controller('ReportsController', require('./reports.controller'))
    .controller('BhuReportsController', require('./reports-bhu-controller'))
    .factory('reportservice', require('./reports.service'))
    .directive('bhuLink', require('./reports-bhu-directive'))
    .directive('effortsutilizedLink', require('./reports-bhu-directive'))
    .directive('warrantyissueLink', require('./reports-bhu-directive'))
    .directive('currentstatusLink', require('./reports-bhu-directive'));