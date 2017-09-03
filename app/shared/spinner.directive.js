function spinner() {
    return function($scope, element, attrs) {
        $scope.$on("spinner_show", function() {
            element.addClass('loading');
        });
        $scope.$on("spinner_hide", function() {
            element.removeClass('loading');
        });
    };
}
module.exports = spinner;