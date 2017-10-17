
function reportNotifyLinkRenderer(){
    return {
        restrict: 'EA',
        template: ['<div ng-bind-html="notifyBhuReport(item.bhuId)" notify-link>',
            '</div>'
        ].join(''),
        link: function(scope, element, attr) {
           scope.notifyBhuReport = function(bhuId) {
              if(bhuId == null || bhuId== undefined || bhuId == ''){
                return bhuId;
              }else{
                return "<a title='Get deatils'  href='javascript:void(0)'><i class='glyphicon glyphicon-envelope blue'></i></a>";
              }
            }
        }
    };
    }
    
    module.exports = reportNotifyLinkRenderer;