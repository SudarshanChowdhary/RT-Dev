module.exports = function(app) {

    app.directive('rtReorder', function($parse, $compile) {
        return {
            restrict: 'A',
            require: '^rtGrid',
            link: function(scope, element, attr, ctrl) {

                scope.$watch(attr.rtReorder, function(newVal, oldVal) {
                    var newColumnOrder = newVal;

                    if (!newColumnOrder) return;

                    var columnPositionMap = newColumnOrder.reduce(function(columnKey, current, index) {
                        columnKey[current.dataField] = index;
                        return columnKey;
                    }, {});

                    ctrl.columns.forEach(function(column) {
                        column.position = columnPositionMap[column.dataField];
                    });

                    ctrl.columns.sort(function(a, b) {
                        return a.position - b.position;
                    });
                });
            }
        }
    });
};