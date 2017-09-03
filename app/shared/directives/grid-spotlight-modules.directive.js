
function moduleItemRenderer(){

    return {
            restrict: 'EA',
            template: ['<div>',
                '<span>{{item.module}}',
                '</span></div>'
            ].join(''),
            link: function(scope, element, attr) {
               
            }
        };

}

module.exports = moduleItemRenderer;