
function dateFormat($filter){

    return {
            restrict: 'EA',
            template: ['<div ng-bind-html="formatDate(item.creationDate)">',
                '</div>'
            ].join(''),
            link: function(scope, element, attr) {
              scope.formatDate = function(newDate) {
                var newFormatDate  = $filter('date')(newDate, 'MM/dd/yyyy');
                return newFormatDate;
            }
        }

  };
}

module.exports = dateFormat;