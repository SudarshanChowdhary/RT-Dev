function checkRepository() {
    return function($scope, element, attrs) {
        $scope.$on("show_repository_breadcrumb", function() {
            // element.removeClass('hide');
            $('.breadcrumb-plugin').removeClass('hide');
            $('.breadcrumb-container').parent().parent('.page-header-section').children().children('.repo-breadcrumb-container').addClass('hide');
        });
        $scope.$on("hide_repository_breadcrumb", function() {
            $('.breadcrumb-plugin').addClass('hide');
            $('.breadcrumb-container').parent().parent('.page-header-section').children().children('.repo-breadcrumb-container').removeClass('hide');
        });
    };
}
module.exports = checkRepository;