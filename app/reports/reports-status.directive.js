CurrentStatusModalController.$inject = ['$uibModalInstance', 'modal'];

function CurrentStatusModalController($uibModalInstance, modal) {
    var ctrlSts = this;
    ctrlSts.modal = modal;
    ctrlSts.currentStatusModalData = [];
    ctrlSts.selStatus = modal.selectedStatus;
    ctrlSts.selctedBhu = modal.selctedBhu;
    ctrlSts.currentStatusModalData = modal.reportModalData.bhuStatusDetails;
    ctrlSts.gridOptions = {
            bindType: 1,
            data: {
                foo: {}
            },
            enablePagination: true
        };
   
    ctrlSts.modalColumns = [{
                            headerText: 'BHU/IHU',
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
                            headerText: 'MINUTES OF MEEING',
                            dataField: 'minutesOfMeeting',
                            thClasses: 'width20',
                            tdClasses: 'width20',
                            sort: true
                        }];
                        // ctrlSts.itemRenderers = {
                        //     'meetingDate': 'date-format'
                        // };
    ctrlSts.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };
}
BhuCurrentStatusModalDirective.$inject = ['$uibModal', 'reportservice'];

function BhuCurrentStatusModalDirective($uibModal, reportservice) {
    return {
        restrict: 'A',
        
        link: function(scope, element, attr, ctrlSts) {
            element.on('click', function() {
               if(!isNaN(scope.item.bhuId)){
                reportservice.getReportCurrentStatusDetails(scope.item.bhuId).then(function(resp){
                        if(resp && resp.errorCode){
                            $scope.$emit('alert', {
                            message: resp.message,
                            success: false
                        });
                        }else{
                            scope.selectedStatus = scope.item.currentStatus;
                            scope.selctedBhu = scope.item.bhuId;
                            scope.reportModalData = resp;
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