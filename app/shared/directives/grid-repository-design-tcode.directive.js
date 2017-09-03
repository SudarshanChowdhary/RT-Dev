function tcodeItemRenderer(){

    return {
            restrict: 'EA',
            template: ['<div ng-bind-html="item.tcodeTxt">',
                '</div>'
            ].join(''),
            link: function(scope, element, attr) {
               
            }
        };

}

module.exports = tcodeItemRenderer;