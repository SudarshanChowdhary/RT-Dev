var angular = require('angular');

module.exports = angular
    .module('rt.team', ['ui.bootstrap'])
    .config(require('./team.route'))
    .controller('TeamController', require('./team.controller'))
    .factory('teamService', require('./team.service'));
