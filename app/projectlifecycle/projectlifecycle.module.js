var angular = require('angular');

module.exports = angular
    .module('rt.projectlifecycle', [])
    .config(require('./projectlifecycle.route'))
    .controller('ProjectLifeCycleController', require('./projectlifecycle.controller'))
    .service("ProjectLifeCycleService", require("./plclifecycle.service"))
    .directive("demoFileModel",require("./rtplcNotification.directive"))
