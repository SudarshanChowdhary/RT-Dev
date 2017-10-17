SearchWarrantyModalController.$inject = ['$uibModalInstance', 'modal', 'reportservice'];

function SearchWarrantyModalController($uibModalInstance, modal, reportservice) {
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
                            headerText: 'TICKET#',
                            dataField: 'ticketNo',
                            sort: true,
                            thClasses: 'width30',
                            tdClasses: 'width30',
                        },{
                            headerText: 'ROOT CAUSE',
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
                        ctrlWar.itemRenderers = {
                            'justification': 'desc-item-renderer'
                        };
    ctrlWar.exportWarrantyToExcel = function(bhuId){
        window.location.href = reportservice.exportWarrantyToExcelSrv(bhuId);
    }
                       
    ctrlWar.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };
}
SearchWarrantyModalDirective.$inject = ['$uibModal', 'reportservice'];

function SearchWarrantyModalDirective($uibModal, reportservice) {
    return {
        restrict: 'A',
        
        link: function(scope, element, attr, ctrlWar) {
            element.on('click', function() {
               if(scope.item.bhuId &&  scope.item.warrantyissue && scope.item.warrantyissue !=0){
                reportservice.getReportWarrantyDetails(scope.item.bhuId).then(function(resp){
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
                            controller: SearchWarrantyModalController,
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
module.exports = SearchWarrantyModalDirective;