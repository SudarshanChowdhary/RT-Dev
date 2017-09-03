
function expectedItemRenderer(){

    return {
            restrict: 'EA',
            template: ['<div ng-bind-html="item.expectedTxt">',
                '</div>'
            ].join(''),
            link: function(scope, element, attr) {
               
            }
        };

}

module.exports = expectedItemRenderer;