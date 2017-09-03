ErrorRoute.$inject = ['$stateProvider'];

function ErrorRoute($stateProvider) {
    $stateProvider.state('root.error', {
        url: '/error',
        views: {
            '@root': {
                templateUrl: 'app/error/error.html',
                controller: 'ErrorController',
                controllerAs: 'vmerror'
            }
        },
        ncyBreadcrumb: {
            skip: true
        }
    });
}
module.exports = ErrorRoute;