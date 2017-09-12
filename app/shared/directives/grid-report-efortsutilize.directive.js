
function effortsUtilizedLinkRenderer(){

    return {
        restrict: 'EA',
        template: ['<div ng-bind-html="displayUtilizedEfforts(item.efortsutilized)" effortsutilized-link>',
            '</div>'
        ].join(''),
        link: function(scope, element, attr) {
           scope.displayUtilizedEfforts = function(efortsutilized) {
              if(isNaN(efortsutilized) || efortsutilized==null){
                return efortsutilized;
              }else{
                return "<a href='javascript:void(0)'>"+efortsutilized+"</a>";
              }
            }
        }
    };
    }
    
    module.exports = effortsUtilizedLinkRenderer;