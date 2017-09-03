var angular = require('angular');

module.exports = angular
    .module('rt.admin', [])
    .config(require('./admin.route'))
    .constant('adminReferenceData', require('./admin.constants'))
    .controller('AdminController', require('./admin.controller'))
    .controller('AdminFolderController', require('./admin-folder.controller'))
    .controller('AdminSpotlightController', require('./admin-spotlight.controller'))
    .controller('AdminTeamController', require('./admin-team.controller'))
    .controller('AdminTicketController', require('./admin-ticket.controller'))
    .factory('adminservice', require('./admin.service'));