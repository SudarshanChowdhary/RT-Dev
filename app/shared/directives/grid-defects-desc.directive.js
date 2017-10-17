
function descItemRenderer(){

    return {
            restrict: 'EA',
            template: ['<div class="defects-descp" ng-bind-html="truncateDescription(item.description, item.justification)">',
                '</div>'
            ].join(''),
            link: function(scope, element, attr) {
               scope.truncateDescription = function(desc, just ){
				   var p = desc?  desc:just;
				   if(!p || p==''){
					return p;
				   }else{
					   if(desc){
							 if($('span:first', p).html() !=''){
								 var str = $('span:first', p).html();
								 if(!str || str==""){
									var dt = (new DOMParser).parseFromString(p, "text/html").documentElement.textContent;
									var val = dt.substr(dt.indexOf('\n'),dt.replace("\n","").indexOf("\n"));
									 return val;
								 }
							 	return str;
							 }else if($('p:first', p).html() !=''){
								 var str = $('p:first', p).html();
								 if(!str || str==""){
									var dt = (new DOMParser).parseFromString(p, "text/html").documentElement.textContent;
									var val = dt.substr(dt.indexOf('\n'),dt.replace("\n","").indexOf("\n"));
									 return val;
								 }
							 	return str;
							 }else if(p == null){
							 	 return '--';
							 }else{
								 return p;
							 }
					   }else{
							return p;//(new DOMParser).parseFromString(p, "text/html").documentElement.textContent.replace(new RegExp('\n','g'), '').trim().split(".").join("\n");
					   }
				   }
					
               };
            }
        };

}

module.exports = descItemRenderer;