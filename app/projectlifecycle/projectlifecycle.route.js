ProjectLifeCycleRoute.$inject = ['$stateProvider'];

function ProjectLifeCycleRoute($stateProvider) {
    $stateProvider.state('root.projectlifecycle', {
        url: '/projectlifecycle',
        views: {
            '@root': {
                templateUrl: 'app/projectlifecycle/templates/projectlifecycle.html',
                controller: 'ProjectLifeCycleController',
                controllerAs: 'vmplc'
            }
        },
        ncyBreadcrumb: {
            label: 'RT Project Life Cycle'
        }
    });
}
module.exports = ProjectLifeCycleRoute;