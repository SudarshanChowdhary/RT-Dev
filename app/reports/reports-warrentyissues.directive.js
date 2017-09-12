WarrantyModalController.$inject = ['$uibModalInstance', 'modal', 'reportservice'];

function WarrantyModalController($uibModalInstance, modal, reportservice) {
    debugger;
    var ctrlWar = this;
    ctrlWar.modal = modal;
    ctrlWar.bhuWarrantyModalData = [];
    ctrlWar.selBhu = modal.selectedBhuId;
    ctrlWar.bhuWarrantyModalData = modal.reportModalData.bhuWarrantyDetails;
    ctrlWar.gridOptions = {
            bindType: 1,
            data: {
                foo: {}
            },
            enablePagination: true
        };
   
    ctrlWar.modalColumns = [{
                            headerText: 'TICKET',
                            dataField: 'ticketNo',
                            sort: true,
                            thClasses: 'width30',
                            tdClasses: 'width30',
                        },{
                            headerText: 'ROOT COUSE',
                            dataField: 'rootCause',
                            sort: true, 
                            thClasses: 'width30',
                            tdClasses: 'width30',
                        },{
                            headerText: 'JUSTIFICATION',
                            dataField: 'justification',
                            thClasses: 'width30',
                            tdClasses: 'width40'
                        }];

    ctrlWar.exportWarrantyToExcel = function(bhuId){
        window.location.href = reportservice.exportWarrantyToExcelSrv(bhuId);
    }
                       
    ctrlWar.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };
}
WarrantyModalDirective.$inject = ['$uibModal', 'reportservice'];

function WarrantyModalDirective($uibModal, reportservice) {
    return {
        restrict: 'A',
        
        link: function(scope, element, attr, ctrlWar) {
            element.on('click', function() {
               if(!isNaN(scope.item.bhuId)){
                reportservice.getReportWarrantyDetails(scope.item.bhuId).then(function(resp){
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
                            templateUrl: 'app/reports/templates/modal-warrentyissues-details.html',
                            controller: WarrantyModalController,
                            controllerAs: 'ctrlWar',
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
module.exports = WarrantyModalDirective;