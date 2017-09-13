var angular = require('angular');

module.exports = angular
    .module('rt.projectlifecycle', [])
    .config(require('./projectlifecycle.route'))
    .controller('ProjectLifeCycleController', require('./projectlifecycle.controller'))
    .service("rtplcmilestoneservice", require("./plclifecycle.service"))
    .directive("fileModel","./rtplcNotification.directive");
