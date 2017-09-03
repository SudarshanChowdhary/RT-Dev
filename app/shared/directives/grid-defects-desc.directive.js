
function descItemRenderer(){

    return {
            restrict: 'EA',
            template: ['<div class="defects-descp" ng-bind-html="truncateDescription(item.description)">',
                '</div>'
            ].join(''),
            link: function(scope, element, attr) {
               scope.truncateDescription = function(desc){
               	
               	 if($('span:first', desc).html() !=''){
               	 	var str = $('span:first', desc).html();
               	 	return str;
               	 }else if($('p:first', desc).html() !=''){
               	 	var str = $('p:first', desc).html();
               	 	return str;
               	 }else if(desc == null){
               	 	 return '--';
               	 }else{
               	 	 return desc;
               	 }
               };
            }
        };

}

module.exports = descItemRenderer;