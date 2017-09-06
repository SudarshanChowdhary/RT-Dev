var angular = require('angular');

module.exports = angular
    .module('rt.projectlifecycle', [])
    .config(require('./projectlifecycle.route'))
    .controller('ProjectLifeCycleController', require('./projectlifecycle.controller'))
    .controller('ModalInstanceController', require('./modalinstance.controller'));
