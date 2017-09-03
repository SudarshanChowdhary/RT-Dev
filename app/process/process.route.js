ProcessRoute.$inject = ['$stateProvider'];

function ProcessRoute($stateProvider) {
    $stateProvider.state('root.process', {
        url: '/process',
        views: {
            '@root': {
                templateUrl: 'app/process/templates/process.html',
                controller: 'ProcessController',
                controllerAs: 'vmpro'
            }
        },
        ncyBreadcrumb: {
            label: 'Process'
        }
    });
}
module.exports = ProcessRoute;