
function inputItemRenderer(){

    return {
            restrict: 'EA',
            template: ['<div ng-bind-html="item.inputDataTxt">',
                '</div>'
            ].join(''),
            link: function(scope, element, attr) {
               
            }
        };

}

module.exports = inputItemRenderer;