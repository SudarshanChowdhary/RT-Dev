
function editItemRenderer(){

    return {
            restrict: 'EA',
            template: ['<div class="edit_icon">',
                '<span class="glyphicon glyphicon-pencil" ng-click="onEditClick(item)" ng-class={"disabled":item.readOnly==1}>',
                '</span></div>'
            ].join(''),
            link: function(scope, element, attr) {
               scope.onEditClick = function(editRow) {
                   scope.$emit('modifyRowData', editRow);
                }
            }
        };

}

module.exports = editItemRenderer;