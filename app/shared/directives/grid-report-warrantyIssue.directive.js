
function warrantyIssueLinkRenderer(){
    return {
        restrict: 'EA',
        template: ['<div ng-bind-html="displayWarrantyissueItemName(item.warrantyissue)" warrantyissue-link>',
            '</div>'
        ].join(''),
        link: function(scope, element, attr) {
           scope.displayWarrantyissueItemName = function(warrantyissue) {
              if(isNaN(warrantyissue) || warrantyissue==null || warrantyissue=='' || warrantyissue==0){
                return warrantyissue;
              }else{
                return "<a title='Show issued warranty deatils' href='javascript:void(0)'>"+warrantyissue+"</a>";
              }
            }
        }
    };
}
module.exports = warrantyIssueLinkRenderer;