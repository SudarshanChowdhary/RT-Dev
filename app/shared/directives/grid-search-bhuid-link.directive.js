function searchbhuIdLinkRenderer(){
        return {
                restrict: 'EA',
                template: ['<div ng-bind-html="displayItemName(item.bhuId)" searchbhu-link>',
                    '</div>'
                ].join(''),
                link: function(scope, element, attr) {
                   scope.displayItemName = function(bhuId) {
                      if(!bhuId || bhuId == null || bhuId == ''){
                        return bhuId;
                      }else{
                        return "<a title='Get deatils' href='javascript:void(0)'>"+bhuId+"</a>";
                      }
                    }
                }
            };
    
    }
    
    module.exports = searchbhuIdLinkRenderer;