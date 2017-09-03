TeamRoute.$inject = ['$stateProvider'];

function TeamRoute($stateProvider) {
    $stateProvider.state('root.team', {
        url: '/team',
        views: {
            '@root': {
                templateUrl: 'app/team/templates/team.html',
                controller: 'TeamController',
                controllerAs: 'vmt'
            }
        },
        ncyBreadcrumb: {
            label: 'Team'
        }
    });
}
module.exports = TeamRoute;