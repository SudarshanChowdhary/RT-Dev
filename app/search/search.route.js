SearchRoute.$inject = ['$stateProvider'];

function SearchRoute($stateProvider) {
    $stateProvider.state('root.search', {
        url: '/search',
        params: {
            searchParam : null
        },
        views: {
            '@root': {
                templateUrl: 'app/search/templates/search.html',
                controller: 'SearchController',
                controllerAs: 'vmsea'
            }
        },
        ncyBreadcrumb: {
            label: 'Search Results'
        }
    }).state('root.search.Bhuid', {
        url: '/search/:bhuid',
        views: {
            "@root": {
                templateUrl: 'app/search/templates/search-Bhuid.html',
                controller: 'SearchController',
                controllerAs: 'vmsea'
            }
        },
        ncyBreadcrumb: {
            skip: true
        }
    });
}
module.exports = SearchRoute;