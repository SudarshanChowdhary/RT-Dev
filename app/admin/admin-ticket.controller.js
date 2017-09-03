AdminTicketController.$inject = ['$state', '$scope', '$log', 'adminservice', '$http'];

function AdminTicketController($state, $scope, $log, adminservice, $http) {
    var vmtic = this;
    vmtic.ticketObj = {
        "id": "",
        "ticketCategory": ""
    }
    vmtic.init = init;
    vmtic.populateTicketData = populateTicketData;
    vmtic.resetForm = resetForm;
    vmtic.addTicket = addTicket;
    vmtic.cancelUpdate = cancelUpdate;
    vmtic.delTicket = delTicket;
    init();

    function init() {
        vmtic.columns = [{
            headerText: 'Ticket Type',
            dataField: 'ticketCategory',
            thClasses: 'width80',
            tdClasses: 'width80'
        }, {
            headerText: 'Edit',
            dataField: 'edit',
            thClasses: 'width10',
            tdClasses: 'width10'
        }, {
            headerText: 'Delete',
            dataField: 'delete',
            thClasses: 'width10',
            tdClasses: 'width10'
        }];
        vmtic.populateTicketData();
    }
    vmtic.itemRenderers = {
        'edit': 'edit-item-renderer',
        'delete': 'del-item-renderer'
    };
    vmtic.gridOptions = {
        bindType: 1,
        data: {
            foo: {}
        },
        enablePagination: true
    };

    $scope.$on('modifyRowData', function(e, data) {
        vmtic.updateTicket = data;
        vmtic.newTicketCategory = vmtic.updateTicket.ticketCategory;
    }); 

    $scope.$on('deleteRowData', function(e, data) {
        vmtic.deleteTicket = data;
        vmtic.delTicket(vmtic.deleteTicket.id);
    });

    function populateTicketData() {
        adminservice.getAdminTicketData().then(function(adminTicketData) {
            if(adminTicketData && adminTicketData.errorCode){
                    $scope.$emit('alert', {
                    message: adminTicketData.message,
                    success: false
                });
            }else{
                vmtic.ticketRowdata = adminTicketData;
            }
            
        });
        vmtic.updateTicket = null;
    }

    function resetForm(form){
        vmtic.newTicketCategory= null;
        form.$setPristine();
        form.$setUntouched();
    }

    function addTicket(newTicketCategory, form){
        if(vmtic.updateTicket && vmtic.updateTicket.id){
           vmtic.ticketObj = vmtic.updateTicket;
           vmtic.ticketObj.ticketCategory = newTicketCategory;
           delete vmtic.ticketObj.expand;
           delete vmtic.ticketObj.selected;
           adminservice.updateAdminTicket(vmtic.ticketObj).then(function(resp) {
            if(resp && resp.errorCode){
                    $scope.$emit('alert', {
                message: resp.message,
                success: false
            });
            }else{
                 vmtic.data = resp;
                $scope.$emit('alert', {
                    message: 'Ticket type updated successfully',
                    success: true
                });
            }
                
                    vmtic.populateTicketData();
                    vmtic.newTicketCategory= null; 
                    vmtic.resetForm(form);
                });

        }else{
            vmtic.ticketObj.ticketCategory = newTicketCategory;
            adminservice.saveAdminTicket(vmtic.ticketObj).then(function(resp) {

                if(resp && resp.errorCode){
                    $scope.$emit('alert', {
                message: resp.message,
                success: false
            });
            }else{
                 vmtic.data = resp;
                  $scope.$emit('alert', {
                    message: 'Ticket type added successfully',
                    success: true
                });
            }
               
                vmtic.populateTicketData();
                vmtic.newTicketCategory= null;
                vmtic.resetForm(form);
            });
        }
    }

    function cancelUpdate(form) {
        vmtic.updateTicket = null;
        vmtic.newTicketCategory = null;
        form.$setPristine();
        form.$setUntouched();
    }

    function delTicket(id) {
        adminservice.deleteAdminTicket(id).then(function(resp) {
           if(resp && resp.errorCode){
                    $scope.$emit('alert', {
                message: resp.message,
                success: false
            });
            }else{
                 vmtic.data = resp;
                  $scope.$emit('alert', {
                    message: 'Ticket type deleted successfully',
                    success: true
                });
            }
           
            vmtic.populateTicketData();
        });
    }
}
module.exports = AdminTicketController;    