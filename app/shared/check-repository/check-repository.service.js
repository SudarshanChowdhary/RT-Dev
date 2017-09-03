checkRepositoryService.$inject = ['$rootScope'];

function checkRepositoryService($rootScope) {
    return {
        show: function() {
            $rootScope.$broadcast("show_repository_breadcrumb");
        },
        hide: function() {
            $rootScope.$broadcast("hide_repository_breadcrumb");
        }
    };
}
module.exports = checkRepositoryService;