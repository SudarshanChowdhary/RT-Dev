BhuRptModalController.$inject = ['$uibModalInstance', 'modal', 'reportservice'];

function BhuRptModalController($uibModalInstance, modal, reportservice) {
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
                            headerText: 'BHU/IHU#',
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
                            headerText: 'RT TICKET#',
                            dataField: 'itemName',
                            tdClasses: 'width15',
                            thClasses: 'width15',
                            sort: true
                        }];//desc-item-renderer

    ctrl.itemRenderers = {
        'description': 'desc-item-renderer'
    };
    ctrl.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };
    
    ctrl.exportBhuDtlsToExcel = function(bhuId){
        window.location.href = reportservice.exportBhuDtlsToExcelSrv(bhuId);
    }
}
BhuReportModalDirective.$inject = ['$uibModal', 'reportservice'];

function BhuReportModalDirective($uibModal, reportservice) {
    return {
        restrict: 'A',
        
        link: function(scope, element, attr, ctrl) {
            element.on('click', function() {
               if(scope.item.bhuId){
                reportservice.getReportBhuDetails(scope.item.bhuId,"bDtl").then(function(resp){
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
module.exports = BhuReportModalDirective;