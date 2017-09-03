var angular = require('angular');

module.exports = angular
    .module('rt.tickets', [])
    .config(require('./tickets.route'))
    .controller('TicketsController', require('./tickets.controller'))
    .directive('bhuLink', require('./bhu-modal.directive'))
    .factory('ticketservice', require('./tickets.service'));

