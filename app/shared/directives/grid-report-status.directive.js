
function currentStatuslinkrenderer(){
    return {
        restrict: 'EA',
        template: ['<div ng-bind-html="displayItemName(item.currentStatus)" currentstatus-link>',
            '</div>'
        ].join(''),
        link: function(scope, element, attr) {
           scope.displayItemName = function(currentStatus) {
              if(currentStatus == null || currentStatus){
                return currentStatus;
              }else{
                return "<a href='javascript:void(0)'>"+currentStatus+"</a>";
              }
            }
        }
    };
    }
    
    module.exports = currentStatuslinkrenderer;