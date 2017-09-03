HomeRoute.$inject = ['$stateProvider'];

function HomeRoute($stateProvider) {
    $stateProvider
    // abstract route state that loads page layout
        .state('home', {
        parent: 'root',
        url: '/',
        templateUrl: 'app/home/home.html',
        controller: 'HomeController',
        controllerAs: 'vmhome',
        ncyBreadcrumb: {
            label: 'Home'
        }
    });
}
module.exports = HomeRoute;