
function highlightCell(){
    return {
            restrict: 'EA',
            template: ['<style parse-style>.css_class {color: red;font-weight:bold;}</style><div ng-bind-html="formatCell(item.deviation)">',
                '</div>'
            ].join(''),
            link: function(scope, element, attr) {
            scope.formatCell = function(deviation) {
                debugger;
                if(deviation && deviation < 0){
                    return '<div class="css_class">'+deviation+'</div>';
                }else{
                    return deviation;
                }
            }
        }
    };
}
    
    module.exports = highlightCell;