
function rtSpocDesc(sharedService){

    return {
            restrict: 'EA',
            template: ['<div ng-if="item.rtSpoc"><span class="glyphicon glyphicon-info-sign" ng-mouseover="showSpocDetails(item.rtSpoc)" uib-tooltip="RT ID :&nbsp;{{spocDetails.name}}&#13;&#10;Full Name :&nbsp;{{spocDetails.fullName}}&#10;Email :&nbsp;{{spocDetails.email}}" tooltip-placement="bottom" tooltip-class="spocDetails"></span>&nbsp;&nbsp;<span ng-bind="item.rtSpoc"></span>',
                '</div>'
            ].join(''),
            link: function(scope, element, attr) {
               scope.showSpocDetails = function(spocDesc) {
                      sharedService.getSpocDetails(spocDesc).then(function(resp) {
                        if(resp && resp.errorCode){
                            scope.$emit('alert', {
                            message: resp.message,
                            success: false
                              });
                        }else{
                          scope.spocDetails = resp;
                        }
                         
                      });       
                }
            }
        };

}

module.exports = rtSpocDesc;