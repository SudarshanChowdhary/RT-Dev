
function repoDescItemRenderer(){

    return {
            restrict: 'EA',
            template: ['<div ng-bind-html="item.description">',
                '</div>'
            ].join(''),
            link: function(scope, element, attr) {
               
            }
        };

}

module.exports = repoDescItemRenderer;