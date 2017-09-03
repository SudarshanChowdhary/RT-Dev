AdminFolderController.$inject = ['$state', '$scope', '$log', 'adminservice', '$http'];

function AdminFolderController($state, $scope, $log, adminservice, $http) {
    var vmfol = this;
    vmfol.folderObj = {
        "id": "",
        "folderName": "",
        "readOnly": 0
    }
    vmfol.init = init;
    vmfol.populateFolderData = populateFolderData;
    vmfol.resetForm = resetForm;
    vmfol.addFolder = addFolder;
    vmfol.delFolder = delFolder;
    vmfol.cancelUpdate = cancelUpdate;
    init();

    function init() {
        vmfol.columns = [{
            headerText: 'Folder',
            dataField: 'folderName',
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
        vmfol.populateFolderData();
    }
    vmfol.itemRenderers = {
        'edit': 'edit-item-renderer',
        'delete': 'del-item-renderer'
    };
    vmfol.gridOptions = {
        bindType: 1,
        data: {
            foo: {}
        },
        enablePagination: true
    };
    $scope.$on('modifyRowData', function(e, data) {
        vmfol.updateFolder = data;
        vmfol.newFolder = vmfol.updateFolder.folderName;
    });
    $scope.$on('deleteRowData', function(e, data) {
        vmfol.deleteFolder = data;
        vmfol.delFolder(vmfol.deleteFolder.id);
    });

    function populateFolderData() {
        adminservice.getAdminFolderData().then(function(adminFolderData) {
            if(adminFolderData && adminFolderData.errorCode){
                    $scope.$emit('alert', {
                    message: adminFolderData.message,
                    success: false
                });
            }else{
                    vmfol.folderRowdata = adminFolderData;
            }
        });
        vmfol.newFolder = null;
        vmfol.updateFolder = null;
    }

    function resetForm(form) {
        vmfol.newFolder = null;
        form.$setPristine();
        form.$setUntouched();
    }

    function addFolder(newFolder, form){
        
        if(vmfol.updateFolder && vmfol.updateFolder.id){
           vmfol.folderObj = vmfol.updateFolder;
           vmfol.folderObj.folderName = newFolder;
           delete vmfol.folderObj.expand;
           delete vmfol.folderObj.selected;
           adminservice.updateAdminFolder(vmfol.folderObj).then(function(resp) {
                 if(resp && resp.errorCode){
                    $scope.$emit('alert', {
                     message: resp.message,
                        success: false
                    });
                }else{
                       vmfol.data = resp;
                    $scope.$emit('alert', {
                        message: 'Folder updated successfully',
                        success: true
                    });
                  vmfol.populateFolderData();  
                  vmfol.resetForm(form);
                }
            });

        }else{
            vmfol.folderObj.folderName = newFolder;
            adminservice.saveAdminFolder(vmfol.folderObj).then(function(resp) {
                if(resp && resp.errorCode){
                    $scope.$emit('alert', {
                    message: resp.message,
                    success: false
                });
                }else{
                    vmfol.data = resp; 
                    $scope.$emit('alert', {
                        message: 'Folder created successfully',
                        success: true
                    });
                }
               
                vmfol.populateFolderData();
                vmfol.resetForm(form);
            });
        }
    }

    function delFolder(id) {
        adminservice.deleteAdminFolder(id).then(function(resp) {
            if(resp && resp.errorCode){
                    $scope.$emit('alert', {
                    message: resp.message,
                    success: false
                });
                }else{
                    vmfol.data = resp;
                    $scope.$emit('alert', {
                        message: 'Folder deleted successfully',
                        success: true
                    });
                }
            
            vmfol.populateFolderData();
        });
    }

    function cancelUpdate(form) {
        vmfol.updateFolder = null;
        vmfol.newFolder = null;
        form.$setPristine();
        form.$setUntouched();
    }
}
module.exports = AdminFolderController;