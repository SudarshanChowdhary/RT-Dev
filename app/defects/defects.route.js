DefectsRoute.$inject = ['$stateProvider'];

function DefectsRoute($stateProvider) {
    $stateProvider.state('root.defects', {
        url: '/defects',
        views: {
            '@root': {
                templateUrl: 'app/defects/templates/defects.html',
                controller: 'DefectsController',
                controllerAs: 'vmdef'
            }
        },
        ncyBreadcrumb: {
            label: 'Defects'
        }
    });
}
module.exports = DefectsRoute;