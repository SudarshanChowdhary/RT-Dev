BhuRptModalController.$inject = ['$uibModalInstance', 'modal'];

function BhuRptModalController($uibModalInstance, modal) {
    debugger;
    var ctrl = this;
    ctrl.modal = modal;
    ctrl.reportBhuModalData = [];
    ctrl.selBhuId = modal.selectedBhuId;
    ctrl.reportBhuModalData = modal.reportModalData.ticketDetails;
    ctrl.gridOptions = {
            bindType: 1,
            data: {
                foo: {}
            },
            enablePagination: true
        };
   
    ctrl.modalColumns = [{
                            headerText: 'BHU/IHU',
                            dataField: 'bhuId',
                            tdClasses: 'width12',
                            thClasses: 'width12'
                        },{
                            headerText: 'BHU DESCRIPTION',
                            dataField: 'description',
                            tdClasses: 'width58',
                            thClasses: 'width58'
                        },{
                            headerText: 'RT SPOC',
                            dataField: 'rtSpoc',
                            tdClasses: 'width15',
                            thClasses: 'width15',
                            sort: true
                        },{
                            headerText: 'RT TICKET',
                            dataField: 'itemName',
                            tdClasses: 'width15',
                            thClasses: 'width15',
                            sort: true
                        }];

    ctrl.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };
}
BhuModalDirective.$inject = ['$uibModal', 'reportservice'];

function BhuModalDirective($uibModal, reportservice) {
    return {
        restrict: 'A',
        
        link: function(scope, element, attr, ctrl) {
            element.on('click', function() {
               if(!isNaN(scope.item.bhuId)){
                reportservice.getReportBhuDetails(scope.item.bhuId).then(function(resp){
                        debugger;
                        if(resp && resp.errorCode){
                            $scope.$emit('alert', {
                            message: resp.message,
                            success: false
                        });
                        }else{
                            scope.selectedBhuId = scope.item.bhuId;
                            scope.reportModalData = resp;
                        }
                       $uibModal.open({
                            templateUrl: 'app/reports/templates/modal-report-bhu-details.html',
                            controller: BhuRptModalController,
                            controllerAs: 'ctrl',
                            windowClass: 'center-modal',
                            size: 'lg',
                            resolve: {
                                modal: function() {
                                    return scope;
                                }
                            }
                        });
                    });
               }
            });
        }
    };
}
module.exports = BhuModalDirective;