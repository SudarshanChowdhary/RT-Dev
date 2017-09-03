
function defectsSummaryItemRenderer(){

    return {
            restrict: 'EA',
            template: ['<div class="defects-descp" ng-bind-html="item.description">',
                '</div>'
            ].join(''),
            link: function(scope, element, attr) {
               
            }
        };

}

module.exports = defectsSummaryItemRenderer;