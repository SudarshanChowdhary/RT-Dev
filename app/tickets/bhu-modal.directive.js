BhuModalController.$inject = ['$uibModalInstance', 'modal'];

function BhuModalController($uibModalInstance, modal) {
    var ctrl = this;
    ctrl.modal = modal;
    ctrl.ticketsBhuModalData = [];
    ctrl.selBhuId = modal.selectedBhuId;
    ctrl.ticketsBhuModalData = modal.ticketModalData.ticketDetails;
    ctrl.gridOptions = {
            bindType: 1,
            data: {
                foo: {}
            },
            enablePagination: true
        };
   
    ctrl.modalColumns = [
                        {
                            headerText: 'Ticket Type',
                            dataField: 'ticketType',
                            tdClasses: 'width12',
                            thClasses: 'width12',
                            sort: true
                        }, 
                        {
                            headerText: 'Ticket Number',
                            dataField: 'itemName',
                            tdClasses: 'width15',
                            thClasses: 'width15'
                        }, 
                        {
                            headerText: 'Description',
                            dataField: 'description',
                            tdClasses: 'width58',
                            thClasses: 'width58'
                        },
                        {
                            headerText: 'Spoc',
                            dataField: 'rtSpoc',
                            tdClasses: 'width15',
                            thClasses: 'width15'
                        }
        ];

      ctrl.itemRenderers = {
            'description': 'desc-item-renderer',
            'rtSpoc': 'spoc-details-renderer',
            'itemName': 'itemname-link-renderer'
        };   
    ctrl.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };
}
BhuModalDirective.$inject = ['$uibModal', 'ticketservice'];

function BhuModalDirective($uibModal, ticketservice) {
    return {
        restrict: 'A',
        
        link: function(scope, element, attr, ctrl) {
            element.on('click', function() {
               if(!isNaN(scope.item.bhuId)){
                    ticketservice.getTicketBhuDetails(scope.item.bhuId).then(function(resp){
                        if(resp && resp.errorCode){
                            $scope.$emit('alert', {
                            message: resp.message,
                            success: false
                        });
                        }else{
                            scope.selectedBhuId = scope.item.bhuId;
                            scope.ticketModalData = resp;
                        }
                       $uibModal.open({
                            templateUrl: 'app/tickets/templates/bhu-details.html',
                            controller: BhuModalController,
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