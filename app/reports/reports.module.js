var angular = require('angular');

module.exports = angular
    .module('rt.reports', [])
    .config(require('./reports.route'))
    .controller('ReportsController', require('./reports.controller'))
    .controller('BhuReportsController', require('./reports-bhu-controller'))
    .factory('reportservice', require('./reports.service'))
    .directive('reportbhuLink', require('./reports-bhu.directive'))
    .directive('effortsutilizedLink', require('./reports-efforts.directive'))
    .directive('warrantyissueLink', require('./reports-warrentyissues.directive'))
    .directive('currentstatusLink', require('./reports-status.directive'))
    .directive('estimatedeffortsEdit',require("./report-admin-effort-edit.directive"));