module.exports = function(app) {

    app.directive('rtAccordion', function($parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attr) {
                var row = scope.$eval(attr.rtAccordion);
                element.on('click', function() {
                    scope.$apply(function() {
                        row.expand = !row.expand;
                    });
                });
            }
        }
    });
};