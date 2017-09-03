
function delItemRenderer(){

    return {
            restrict: 'EA',
            template: ['<div class="delete_icon">',
                '<span class="glyphicon glyphicon-trash" ng-class={"disabled":item.readOnly==1} rt-confirm title="Delete"',
                'content="Are you sure you want to delete?" confirm="onDeleteClick(item)"',
                'confirm-caption="Delete" confirm-enable="true" confirm-click="onDeleteClick(item)">',
                '</span></div>'
            ].join(''),
            link: function(scope, element, attr) {
               scope.onDeleteClick = function(deleteRow) {
                   scope.$emit('deleteRowData', deleteRow);
                }
            }
        };

}

module.exports = delItemRenderer;