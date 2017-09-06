
function efortsutilizedlinkrenderer(){

    return {
        restrict: 'EA',
        template: ['<div ng-bind-html="displayItemName(item.efortsutilized)" effortsutilized-link>',
            '</div>'
        ].join(''),
        link: function(scope, element, attr) {
           scope.displayItemName = function(efortsutilized) {
               debugger;
              if(isNaN(efortsutilized) || efortsutilized==null){
                return efortsutilized;
              }else{
                return "<a href='javascript:void(0)'>"+efortsutilized+"</a>";
              }
            }
        }
    };
    }
    
    module.exports = efortsutilizedlinkrenderer;