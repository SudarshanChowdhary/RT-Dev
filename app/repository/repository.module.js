var angular = require('angular');

module.exports = angular
    .module('rt.repository', [])
    .config(require('./repository.route'))
    .controller('RepositoryController', require('./repository.controller'))
    .controller('RepositoryModulesController', require('./repository-modules.controller'))
    .controller('RepositoryTestScriptListController', require('./repository-testscripts-list.controller'))
    .factory('repositoryservice', require('./repository.service'))
    .filter('sanitize', require('./repository.filter'));

