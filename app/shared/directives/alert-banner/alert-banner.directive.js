    rtAlert.$inject = [];
    /* @ngInject */
    function rtAlert() {
        var controller = ['$scope', function($scope) {
                $scope.closeBtn = function() {
                    $scope.message = null;
                };
            }],
            alertDirective = {
                restrict: 'E',
                replace: true,
                transclude: true,
                templateUrl: 'app/shared/directives/alert-banner/alert-banner.html',
                controller: controller,
                link: function(scope, element) {
                    scope.message = null;
                    scope.$on('alert', function(event, alertData) {
                        scope.success = alertData.success;
                        scope.message = alertData.message;
                        angular.element(element).fadeIn('fast');
                        setTimeout(function() {
                            angular.element(element).fadeOut('slow', function() {
                                scope.message = null;
                            });
                        }, 6000);
                    });
                }
            };
        return alertDirective;
    }
    module.exports = rtAlert;