AdminSpotlightController.$inject = ['$state', '$scope', '$log', '$http','$filter', 'adminservice', 'adminReferenceData'];

function AdminSpotlightController($state, $scope, $log, $http, $filter, adminservice, adminReferenceData) {
    var vmspo = this;
    vmspo.spotLightObj = {
        "id": "",
        "module": "Repository",
        "text": "",
        "isActive": "1"
    }
    vmspo.spotlight = {};
    vmspo.init = init;
    vmspo.populateSpotlightData = populateSpotlightData;
    vmspo.addSpotLight = addSpotLight;
    vmspo.delSpotLight = delSpotLight;
    vmspo.cancelUpdate = cancelUpdate;
    vmspo.modules = adminReferenceData.MODULES;
    vmspo.resetForm = resetForm;
    vmspo.validateEventsCount = validateEventsCount;
    init();

    function init() {
        vmspo.columns = [{
            headerText: 'Spotlights',
            dataField: 'text',
            tdClasses: 'width40',
            thClasses: 'width40',
            sort: true,
            initsort: true
        }, {
            headerText: 'Module',
            dataField: 'module',
            thClasses: 'width40',
            tdClasses: 'width40',
            sort: true,
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
        vmspo.populateSpotlightData();
    }
    vmspo.itemRenderers = {
        'edit': 'edit-item-renderer',
        'module': 'module-item-renderer',
        'delete': 'del-item-renderer'
    };
    vmspo.gridOptions = {
        bindType: 1,
        data: {
            foo: {}
        },
        enablePagination: true
    };
    $scope.$on('modifyRowData', function(e, data) {
        vmspo.updateSpotlight = data;
        vmspo.spotlight.newSpotlight = vmspo.updateSpotlight.text;
        vmspo.spotlight.module = vmspo.updateSpotlight.module;
    });
    $scope.$on('deleteRowData', function(e, data) {
        vmspo.deleteSpotLight = data;
        vmspo.delSpotLight(vmspo.deleteSpotLight.id);
    });

    function populateSpotlightData() {
        adminservice.getAdminSpotlightData().then(function(adminData) {
            if(adminData && adminData.errorCode){
                $scope.$emit('alert', {
                message: adminData.message,
                success: false
            });
            }else{
                vmspo.data = adminData;
            }
        });
        vmspo.updateSpotlight = null;
    }

    function addSpotLight(spotlight, form) {
        if (vmspo.updateSpotlight && vmspo.updateSpotlight.id && vmspo.validateEventsCount(spotlight.module)) {
            vmspo.spotLightObj = vmspo.updateSpotlight;
            vmspo.spotLightObj.text = spotlight.newSpotlight;
            vmspo.spotLightObj.module = spotlight.module;
            delete vmspo.spotLightObj.expand;
            delete vmspo.spotLightObj.selected;
            adminservice.updateAdminSpotLight(vmspo.spotLightObj).then(function(resp) {
                if(resp && resp.errorCode){
                        $scope.$emit('alert', {
                        message: resp.message,
                        success: false
                     });
                }else{
                    vmspo.data = resp;
                      $scope.$emit('alert', {
                        message: 'Spotlight updated successfully',
                        success: true
                    });
                }
              
                vmspo.spotlight = {};
                vmspo.populateSpotlightData();
                vmspo.resetForm(form);
            });
        } else if(vmspo.validateEventsCount(spotlight.module)){

            vmspo.spotLightObj.text = spotlight.newSpotlight;
            vmspo.spotLightObj.module = spotlight.module;
            adminservice.saveAdminSpotLight(vmspo.spotLightObj).then(function(resp) {
                if(resp && resp.errorCode){
                    $scope.$emit('alert', {
                    message: resp.message,
                    success: false
                });
                }else{
                    vmspo.data = resp;
                     $scope.$emit('alert', {
                        message: 'Spotlight created successfully',
                        success: true
                    });
                }
               
                vmspo.spotlight = {};
                vmspo.populateSpotlightData();
                vmspo.resetForm(form);
            });
        }
    }

    function delSpotLight(sId) {
        adminservice.deleteAdminSpotLight(sId).then(function(resp) {
            if(resp && resp.errorCode){
                    $scope.$emit('alert', {
                    message: resp.message,
                    success: false
                });
                }else{
                    vmspo.data = resp;
                     $scope.$emit('alert', {
                        message: 'Spotlight deleted successfully',
                        success: true
                    });
                }
           
            vmspo.populateSpotlightData();
        });
    }

    function cancelUpdate(form) {
        vmspo.updateSpotlight = null;
        vmspo.spotlight = {};
        form.$setPristine();
        form.$setUntouched();
    }

    function resetForm(form) {
        vmspo.spotlight = {};
        form.$setPristine();
        form.$setUntouched();
    }

    function validateEventsCount(selectedModule){
        var moduleCount = $filter('filter')(vmspo.data, {'module': selectedModule.toLowerCase()}).length;
        if(moduleCount >= 5){
            $scope.$emit('alert', {
                    message: 'Only 5 events per module',
                    success: false
                });
            return false;
        }
        else{
            return true;
        }

    }
}
module.exports = AdminSpotlightController;