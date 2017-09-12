
function warrantyIssueLinkRenderer(){
    return {
        restrict: 'EA',
        template: ['<div ng-bind-html="displayWarrantyissueItemName(item.warrantyissue)" warrantyissue-link>',
            '</div>'
        ].join(''),
        link: function(scope, element, attr) {
           scope.displayWarrantyissueItemName = function(warrantyissue) {
              if(isNaN(warrantyissue) || warrantyissue==null){
                return warrantyissue;
              }else{
                return "<a href='javascript:void(0)'>"+warrantyissue+"</a>";
              }
            }
        }
    };
    }
    
    module.exports = warrantyIssueLinkRenderer;