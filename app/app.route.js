AppRoute.$inject = ['$stateProvider', '$urlRouterProvider'];

function AppRoute($stateProvider, $urlRouterProvider) {
    // abstract and root route state
    $stateProvider.state('root', {
        abstract: true,
        url: '/app',
        views: {
            '@': {
                templateUrl: 'app/layout/layout.html',
            },
            'footer@root': {
                templateUrl: 'app/layout/footer.html'
            }
        }
    });
    $urlRouterProvider.otherwise('/app/');
}
module.exports = AppRoute;