
function bhuIdLinkRenderer(){

    return {
            restrict: 'EA',
            template: ['<div ng-bind-html="displayItemName(item.bhuId)" bhu-link>',
                '</div>'
            ].join(''),
            link: function(scope, element, attr) {
               scope.displayItemName = function(bhuId) {
                  if(isNaN(bhuId) || bhuId==null){
                    return bhuId;
                  }else{
                    return "<a href='javascript:void(0)'>"+bhuId+"</a>";
                  }
                }
            }
        };

}

module.exports = bhuIdLinkRenderer;