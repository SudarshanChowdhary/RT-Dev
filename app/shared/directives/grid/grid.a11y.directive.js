module.exports = function(app) {

    app.directive('rtGridA11y', function($compile, $timeout) {
        return {
            restrict: 'EA',
            template: ['<span class="a11y">',
                '<span role="text" ng-if="grid.data.length > 0">{{grid.tblCaption}}',
                '<span class="sort-name">{{grid.sortedColumn.headerText}}</span>',
                '<span ng-if="grid.tblLoad" > :',
                '<span ng-if="grid.sortedColumn.isOrdered" class="sort-type"> {{grid.sortedColumn.sortState}}</span>',
                '<span ng-if="!grid.sortedColumn.isOrdered" class="sort-type"> {{grid.sortedColumn.sortState}}</span>',
                '</span>',
                '</span>',
                '<span role="text" ng-if="grid === null || grid.data === null || grid.data.length <= 0">Table has no data</span>',
                '</span>'
            ].join(''),
            link: function(scope, element, attr) {
                var alertPromise;
                var delayPromise;
                var $tbl = element.closest('table');
                var $alert = $tbl.siblings('p[role="alert"]');

                scope.$watch('grid.sortedColumn.isOrdered', function(newVal, oldVal) {

                    delayPromise = $timeout(function() {
                        $timeout.cancel(delayPromise);
                        $alert.empty();
                        if ($alert && $alert.length) {
                            $alert[0].innerHTML = element.html();

                            $compile($alert)(scope);

                            $timeout.cancel(alertPromise);
                            alertPromise = $timeout(function() {
                                $alert.empty();
                            }, 4000);
                        }
                    }, 3000);
                });
            }
        }
    });
};