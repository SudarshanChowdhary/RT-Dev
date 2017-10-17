
function searcheffortsUtilizedLinkRenderer(){
    return {
        restrict: 'EA',
        template: ['<div ng-bind-html="displayUtilizedEfforts(item.efortsutilized)" searcheffortsutilized-link>',
            '</div>'
        ].join(''),
        link: function(scope, element, attr) {
           scope.displayUtilizedEfforts = function(efortsutilized) {
              if(isNaN(efortsutilized) || efortsutilized==null || efortsutilized == '' || efortsutilized == 0){
                return efortsutilized;
              }else{
                return "<a title='Get deatils' href='javascript:void(0)'>"+efortsutilized+"</a>";
                //<span class='glyphicon glyphicon-new-window blue'></span>&nbsp;&nbsp;
              }
            }
        }
    };
    }
    
    module.exports = searcheffortsUtilizedLinkRenderer;