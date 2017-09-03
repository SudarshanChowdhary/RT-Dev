var angular = require('angular');

module.exports = angular
    .module('rt.shared', ['ui.bootstrap'])
    .component('rtBreadcrumb', require('./breadcrumb/breadcrumb.component'))
    .component('rtUserPhoto', require('./user-photo/user-photo.component'))
    .directive('spinner', require('./spinner.directive'))
    .directive('editItemRenderer', require('./directives/grid-custom-template.directives'))
    .directive('delItemRenderer', require('./directives/grid-admin-delete.directive'))
    .directive('moduleItemRenderer', require('./directives/grid-spotlight-modules.directive'))
    .directive('descItemRenderer', require('./directives/grid-defects-desc.directive'))
    .directive('expectedItemRenderer', require('./directives/grid-repository-design-expected.directive'))
    .directive('tcodeItemRenderer', require('./directives/grid-repository-design-tcode.directive'))
    .directive('inputItemRenderer', require('./directives/grid-repository-design-inputdata.directive'))
    .directive('itemnameLinkRenderer', require('./directives/grid-item-link.directive'))
    .directive('defectsSummaryItemRenderer', require('./directives/grid-defects-summary.directive'))
    .directive('repoDescItemRenderer', require('./directives/grid-repository-design-desc.directive'))
    .directive('dateFormat', require('./directives/grid-date-format.directive'))
    .directive('bhuIdLinkRenderer', require('./directives/grid-bhu-id-link.directive'))
    .directive('spocDetailsRenderer', require('./directives/grid-spoc-details.directive'))
    .directive('alertBanner', require('./directives/alert-banner/alert-banner.directive'))
    .directive('rtConfirm', require('./directives/confirm-modal/confirm-modal.directive'))
    .directive('validateForm', require('./directives/grid-admin-validation.directive'))
    .directive('checkRepository', require('./check-repository/check-repository.directive'))
    .directive('rtRepoBreadcrumb', require('./directives/generate-repository-breadcrumb.directive'))
    .factory('spinnerService', require('./spinner/spinner.service'))
    .factory('checkRepositoryService', require('./check-repository/check-repository.service'))
    .factory('sharedService', require('./shared.service'));
    
