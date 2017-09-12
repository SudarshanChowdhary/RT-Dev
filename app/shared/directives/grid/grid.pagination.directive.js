module.exports = function(app) {

    app.directive('rtPagination', function() {
        return {
            restrict: 'A',
            templateUrl: 'app/shared/directives/grid/grid.pagination.tpl.html'
        }
    });
};