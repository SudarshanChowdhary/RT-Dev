EffortsModalController.$inject = ['$uibModalInstance', 'modal','$rootScope', 'reportservice' ];

function EffortsModalController($uibModalInstance, modal, $rootScope, reportservice) {
    var ctrlEfrt = this;
    ctrlEfrt.modal = modal;
    ctrlEfrt.EffortsModalData = [];
    ctrlEfrt.selBhuId = modal.selectedBhuId;
    ctrlEfrt.EffortsModalData = modal.reportModalData.effortsDetails;
    ctrlEfrt.rtSpoc = modal.selctedSpoc;
    ctrlEfrt.gridOptions = {
            bindType: 1,
            data: {
                foo: {}
            },
            enablePagination: true
        };
        angular.element('.table--fixed').css({
            "width": reportservice.getWindowsWidthPx() > 1300 ? "100%" : "1500px"
        })
   
    ctrlEfrt.modalColumns = [
        { headerText: 'BHU / IHU', dataField: 'bhuId', thClasses: 'width5', tdClasses: 'width5', sort: true }, 
        { headerText: 'SIZE', dataField: 'size', thClasses: 'width5',tdClasses: 'width5' },
        { headerText: 'KICK-OFF', dataField: 'kickOff', thClasses: 'width5', tdClasses: 'width5' },
        { headerText: 'DESIGN REVIEW', dataField: 'designReview', tdClasses: 'width5', thClasses: 'width5' },
        { headerText: 'RT SCRIPT SHARING', dataField: 'rtScriptSharing',tdClasses: 'width5', thClasses: 'width5' },
        { headerText: 'RT SCRIPT WALKTHROUGH',dataField: 'rtScriptWalthr', tdClasses: 'width10',thClasses: 'width10'},

        { headerText: 'IT SYSTEM DEMO/ SCRIPT WALKTHROUGH',dataField: 'itSystemDemo', tdClasses: 'width10',thClasses: 'width10'},
        { headerText: 'IT REVIEW',dataField: 'itReview', tdClasses: 'width5',thClasses: 'width5'},
        { headerText: 'UAT REVIEW',dataField: 'uatReview', tdClasses: 'width5',thClasses: 'width5'},
        { headerText: 'RT SCOPING',dataField: 'rtScoping', tdClasses: 'width5',thClasses: 'width5'},
        { headerText: 'RT EXECUTION/ DEFECT',dataField: 'itExecutionDefects', tdClasses: 'width5',thClasses: 'width5', sort: true},
        { headerText: 'WARRANTY SUPORT',dataField: 'warrantySupport', tdClasses: 'width5',thClasses: 'width5'},

        { headerText: 'P2S',dataField: 'p2s', tdClasses: 'width5',thClasses: 'width5'},
        { headerText: 'PLC FOLLOWUPS',dataField: 'plcFollowups', tdClasses: 'width5',thClasses: 'width5'},
        { headerText: 'ESTIMETED EFFORTS',dataField: 'estimatedEfforts', tdClasses: 'width5',thClasses: 'width5'},
        { headerText: 'TOTAL ACTUAL EFFORTS',dataField: 'actualEfforts', tdClasses: 'width5',thClasses: 'width5', sort: true},
        { headerText: 'DEVIATION',dataField: 'deviation', tdClasses: 'width5',thClasses: 'width5', sort: true}
    ];
    ctrlEfrt.itemRenderers = {
        "deviation":"highlight-cell"
    };
    
    //If in future estimated effort functionality need to add, then uncommet below lines

    // if($rootScope.userRoles && $rootScope.userRoles.indexOf('admin') > -1){
    //     ctrlEfrt.itemRenderers["estimatedEfforts"] = "estimatedefforts-edit";
    //}

    ctrlEfrt.exportEffortsToExcel = function(bhuId){
        window.location.href = reportservice.exportEffortsToExcelSrv(bhuId);
    }

    ctrlEfrt.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };
}
BhuEffortsDirective.$inject = ['$uibModal', 'reportservice'];

function BhuEffortsDirective($uibModal, reportservice) {
    return {
        restrict: 'A',
        link: function(scope, element, attr, ctrlEfrt) {
            element.on('click', function() {
               if(!isNaN(scope.item.bhuId)){
                reportservice.getReportEffortsDetails(scope.item.bhuId, scope.item.size, scope.item.rtsSpoc).then(function(resp){
                        if(resp && resp.errorCode){
                            $scope.$emit('alert', {
                            message: resp.message,
                            success: false
                        });
                        }else{
                            scope.selectedBhuId = scope.item.bhuId;
                            scope.reportModalData = resp;
                            scope.selctedSpoc = scope.item.rtsSpoc;
                        }
                       $uibModal.open({
                            templateUrl: 'app/reports/templates/modal-efforts-details.html',
                            controller: EffortsModalController,
                            controllerAs: 'ctrlEfrt',
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
module.exports = BhuEffortsDirective;