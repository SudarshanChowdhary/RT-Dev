
function warrantyIssuelinkrenderer(){
    return {
        restrict: 'EA',
        template: ['<div ng-bind-html="displayItemName(item.warrantyIssue)" warrantyissue-link>',
            '</div>'
        ].join(''),
        link: function(scope, element, attr) {
           scope.displayItemName = function(warrantyIssue) {
              if(isNaN(warrantyIssue) || warrantyIssue==null){
                return warrantyIssue;
              }else{
                return "<a href='javascript:void(0)'>"+warrantyIssue+"</a>";
              }
            }
        }
    };
    }
    
    module.exports = warrantyIssuelinkrenderer;