BreadCrumbController.$inject = ['$rootScope','$state','repositoryservice'];

function BreadCrumbController($rootScope, $state, repositoryservice) {
    var ctrl = this;
}

var breadcrumbComponent = {
    templateUrl: 'app/shared/breadcrumb/breadcrumb.html',
    controller: BreadCrumbController
};

module.exports = breadcrumbComponent;