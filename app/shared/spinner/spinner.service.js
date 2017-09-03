spinnerService.$inject = ['$rootScope'];

function spinnerService($rootScope) {
    return {
        show: function() {
            $rootScope.$broadcast("spinner_show");
        },
        hide: function() {
            $rootScope.$broadcast("spinner_hide");
        }
    };
}
module.exports = spinnerService;