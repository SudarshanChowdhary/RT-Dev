CurrentStatusModalController.$inject = ['$uibModalInstance', 'modal', 'reportservice'];

function CurrentStatusModalController($uibModalInstance, modal, reportservice) {
    var ctrlSts = this;
    ctrlSts.modal = modal;
    ctrlSts.currentStatusModalData = [];
    ctrlSts.selStatus = modal.selectedStatus;
    ctrlSts.selctedBhu = modal.selctedBhu;
    ctrlSts.rtSpoc = modal.selctedSpoc;
    ctrlSts.currentStatusModalData = modal.reportModalData.bhuStatusDetails;
    ctrlSts.gridOptions = {
            bindType: 1,
            data: {
                foo: {}
            },
            enablePagination: true
        };
   
    ctrlSts.modalColumns = [{
                            headerText: 'BHU/IHU#',
                            dataField: 'bhuId',
                            thClasses: 'width10',
                            tdClasses: 'width10'
                        },{
                            headerText: 'RT PLC MILESTONE',
                            dataField: 'rtPlcMilestone',
                            thClasses: 'width20',
                            tdClasses: 'width20'
                        },{
                            headerText: 'DATE',
                            dataField: 'meetingDate',
                            thClasses: 'width15',
                            tdClasses: 'width15',
                            sort: true,
                            initSort: true
                        },{
                            headerText: 'RT SPOC',
                            dataField: 'rtSpoc',
                            sort: true,
                            thClasses: 'width20',
                            tdClasses: 'width20'
                        },{
                            headerText: 'MINUTES OF MEETING',
                            dataField: 'mom',
                            thClasses: 'width20',
                            tdClasses: 'width20',
                            sort: true
                        }];
    ctrlSts.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };
    
    ctrlSts.exportStatusToExcel= function(bhuId, rtspoc){
        window.location.href = reportservice.exportStatusToExcelSrv(bhuId, rtspoc);
    }
}
BhuCurrentStatusModalDirective.$inject = ['$uibModal', 'reportservice'];

function BhuCurrentStatusModalDirective($uibModal, reportservice) {
    return {
        restrict: 'A',
        
        link: function(scope, element, attr, ctrlSts) {
            element.on('click', function() {
               if(scope.item.bhuId){
                reportservice.getReportCurrentStatusDetails(scope.item.bhuId, scope.item.rtsSpoc).then(function(resp){
                        if(resp && resp.errorCode){
                            $scope.$emit('alert', {
                            message: resp.message,
                            success: false
                        });
                        }else{
                            scope.selectedStatus = scope.item.currentStatus;
                            scope.selctedBhu = scope.item.bhuId;
                            scope.reportModalData = resp;
                            scope.selctedSpoc = scope.item.rtsSpoc;
                        }
                       $uibModal.open({
                            templateUrl: 'app/reports/templates/modal-currentstatus-details.html',
                            controller: CurrentStatusModalController,
                            controllerAs: 'ctrlSts',
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
module.exports = BhuCurrentStatusModalDirective;