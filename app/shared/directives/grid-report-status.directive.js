
function currentStatusLinkRenderer(){
    return {
        restrict: 'EA',
        template: ['<div ng-bind-html="displayStatusItemName(item.currentStatus)" currentstatus-link>',
            '</div>'
        ].join(''),
        link: function(scope, element, attr) {
           scope.displayStatusItemName = function(currentStatus) {
              if(currentStatus == null || currentStatus== undefined || currentStatus == ''){
                return currentStatus;
              }else{
                return "<a title='Get deatils' href='javascript:void(0)'>"+currentStatus+"</a>";
              }
            }
        }
    };
    }
    
    module.exports = currentStatusLinkRenderer;