
function estimatedeffortsEdit($sce){
    return {
            restrict: 'EA',
            template: ['<div ng-bind-html="formatCell(item.estimatedEfforts)">',
                '</div>'
            ].join(''),
            link: function(scope, element, attr) {
            scope.formatCell = function(estimatedEfforts) {
                return $sce.trustAsHtml('<input type="text" name="estimatedEfforts" style="width: 50%" ng-model="ctrlEfrt.EffortsModalData.estimatedEfforts" value="'+ estimatedEfforts +'">\
                &nbsp;&nbsp;&nbsp;<i style="cursor:pointer" ng-click="" title="update efforts" class="glyphicon glyphicon-floppy-disk"></i>');
            }
        }
    };
}

module.exports = estimatedeffortsEdit;