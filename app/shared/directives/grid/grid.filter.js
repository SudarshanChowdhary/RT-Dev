module.exports = function(app) {
    'use strict';

    app.filter('gridGenericFilter', gridGenericFilter);

    app.filter('offset', function() {
        return function(input, start) {
            start = parseInt(start, 10);
            return (input || []).slice(start);
        };
    });


    app.filter('hypenIfEmpty', function() {
        return function(input) {
            // input = input || '';
            if (input === undefined || input === null || input === '') {
                return '-';
            } else if (angular.isString(input) && input.replace(/[\s]/g, '').length === 0) {
                return '-';
            } else {
                return input;
            }
        };
    });


    function gridGenericFilter() {
        return gridArrayFilter;

        ////////////////

        function gridArrayFilter(input, criteria, safeCopy) {
            var criteriaResult;

            //Since user defined method but never applied any filter or 
            //Sometimes no implementation on that method will get undefined then show all rows in grid

            if (angular.isFunction(criteria)) {
                criteriaResult = criteria(input);
                return criteriaResult === undefined ? input : criteriaResult;
            } else {
                return input;
            }
        }
    }
}