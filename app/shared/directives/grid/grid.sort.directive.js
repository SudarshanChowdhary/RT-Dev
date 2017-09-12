module.exports = function(app) {
    'use strict';

        app.directive('rtSortColumn', rtSortColumn);

    rtSortColumn.$inject = [];

    /* @ngInject */
    function rtSortColumn() {

        var directive = {
            restrict: 'EA',
            require: '^rtGrid',
            templateUrl: 'app/shared/directives/grid/grid.sort.tpl.html',
            link: link
        };
        return directive;

        function link(scope, element, attrs, ctrl) {
            var column = scope.col;

            scope.orderByField = function($event) {
                ctrl.sortBy(column, $event);
            };

            function setDefaults() {
                if (column) {
                    column.sorted = "unsorted";
                    column.toggleSortIcon = 'glyphicon glyphicon-sort';
                }
            }

            setDefaults(column);

            if (column.sort && column.initSort) {
                ctrl.sortBy(column);
            }
        }
    }
};