
function itemnameLinkRenderer(){

    return {
            restrict: 'EA',
            template: ['<div ng-bind-html="displayItemName(item.itemName)" ng-if="item.itemName">',
                '</div>',
                '<div ng-bind-html="displayItemName(item.defectName)"  ng-if="item.defectName">',
                '</div>'
            ].join(''),
            link: function(scope, element, attr) {
               scope.displayItemName = function(itemName) {
                   var displayName = '';
                   displayName = itemName;
                   if(displayName.length == 8){
                   	 // var url =  'exp2://Ticket/'+displayName+;
                   	 return "<a class='espressolink' target='_blank'>"+displayName+"</a>";
                   }else if(displayName.toUpperCase().startsWith('INC') || displayName.toUpperCase().startsWith('RITM') || displayName.toUpperCase().startsWith('TASK')){
                   	 	
                   	 		return "<a href='https://cst.apple.com/tkt.do?tkt="+displayName+"' target='_blank'>"+displayName+"</a>";
                   	 	
                   }else{
                   		return displayName;
                   }
                }
                element.on('click', function (e) {
                    scope.$apply(function () {
                      if (angular.element(e.target).hasClass('espressolink')) {
                          var name = angular.element(e.target).text();
                        window.location.href="exp2://Ticket/"+name;
                        }
                     });
                   });

            }
        };

}

module.exports = itemnameLinkRenderer;