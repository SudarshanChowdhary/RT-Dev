AdminTeamController.$inject = ['$state', '$scope', '$log', '$http','$timeout', 'adminservice', 'teamService', 'adminReferenceData'];

function AdminTeamController($state, $scope, $log, $http, $timeout, adminservice, teamService, adminReferenceData) {
    var vmtea = this;
    vmtea.teamObj = {
        "rtTeamMemberId": "",
        "groupName": "",
        "memberName": "",
        "memberEmailId": "",
        "memberTitle": "",
        "primaryPhone": "",
        "managerId": "",
        "nodeLevel": "",
        "memberDescription": ""
    }
    vmtea.team = {};
    vmtea.teamDetails = [ ];
    vmtea.showTeamTypeText = false;

    vmtea.init = init;
    vmtea.populateTeamData = populateTeamData;
    vmtea.addTeamMember = addTeamMember;
    vmtea.delTeam = delTeam;
    vmtea.cancelUpdate = cancelUpdate;
    vmtea.levelname = adminReferenceData.LEVEL;
    vmtea.resetForm = resetForm;
    vmtea.getTeamDetails = getTeamDetails;
    vmtea.refreshResults = refreshResults;
    vmtea.clear = clear;
     vmtea.showManagerByLevels =  showManagerByLevels;
    init();

    function init() {
        vmtea.columns = [{
            headerText: 'Team Member',
            dataField: 'memberName',
            tdClasses: 'width15',
            thClasses: 'width15',
            sort: true
        }, {
            headerText: 'Level',
            dataField: 'nodeLevel',
            tdClasses: 'width5',
            thClasses: 'width5',
        }, {
            headerText: 'Role',
            dataField: 'memberTitle',
            tdClasses: 'width15',
            thClasses: 'width15',
        }, {
            headerText: 'Team',
            dataField: 'groupName',
            tdClasses: 'width5',
            thClasses: 'width5',
        }, {
            headerText: 'Manager name',
            dataField: 'mangerName',
            tdClasses: 'width10',
            thClasses: 'width10',
        }, {
            headerText: 'Email',
            dataField: 'memberEmailId',
            tdClasses: 'width20',
            thClasses: 'width20',
        },
        {
            headerText: 'Specialization',
            dataField: 'memberDescription',
            tdClasses: 'width20',
            thClasses: 'width20',
        }, {
            headerText: 'Edit',
            dataField: 'edit',
            thClasses: 'width5',
            tdClasses: 'width5'
        }, {
            headerText: 'Delete',
            dataField: 'delete',
            thClasses: 'width5',
            tdClasses: 'width5'
        }];
        vmtea.populateTeamData();
        vmtea.getTeamDetails();

    }
    vmtea.itemRenderers = {
        'edit': 'edit-item-renderer',
        'delete': 'del-item-renderer'
    };
    vmtea.gridOptions = {
        bindType: 1,
        data: {
            foo: {}
        },
        enablePagination: true
    };
    $scope.$on('modifyRowData', function(e, data) {
        vmtea.updateTeam = data;
        vmtea.team.newMember = vmtea.updateTeam.memberName;
        vmtea.team.newRole = vmtea.updateTeam.memberTitle;
        vmtea.team.newLevel = vmtea.updateTeam.nodeLevel;
        vmtea.team.newTeamName = vmtea.updateTeam.groupName;
        // vmtea.team.newPrimaryContact = vmtea.updateTeam.primaryPhone;
        vmtea.team.newEmail = vmtea.updateTeam.memberEmailId;
        vmtea.team.newManager = vmtea.updateTeam.managerId;
        vmtea.team.memberDescription = vmtea.updateTeam.memberDescription;
    });
    $scope.$on('deleteRowData', function(e, data) {
        vmtea.deleteTeam = data;
        vmtea.delTeam(vmtea.deleteTeam.rtTeamMemberId);
    });

    function populateTeamData() {
        adminservice.getAdminTeamData().then(function(adminData) {
            if(adminData && adminData.errorCode){
                    $scope.$emit('alert', {
                    message: adminData.message,
                    success: false
                });
            }else{
                vmtea.data = adminData;
            }
            
        });
        vmtea.updateTeam = null;
    }
    
    function getTeamDetails() {
        adminservice.getAdminTeamDetails().then(function(adminData) {
            if(adminData && adminData.errorCode){
                    $scope.$emit('alert', {
                    message: adminData.message,
                    success: false
                });
            }else{
                vmtea.teamDetails = adminData;
            }
        });
    }

    function addTeamMember(team, form) {
        if (vmtea.updateTeam && vmtea.updateTeam.rtTeamMemberId) {
            vmtea.teamObj = vmtea.updateTeam;
            vmtea.teamObj.memberName = team.newMember;
            vmtea.teamObj.nodeLevel = team.newLevel;
            vmtea.teamObj.memberTitle = team.newRole;
            vmtea.teamObj.groupName = team.newTeamName;
            // vmtea.teamObj.primaryPhone = team.newPrimaryContact;
            vmtea.teamObj.memberEmailId = team.newEmail;
            vmtea.teamObj.managerId = team.newManager;
            vmtea.teamObj.memberDescription = team.memberDescription;
            delete vmtea.teamObj.expand;
            delete vmtea.teamObj.selected;
           
            adminservice.updateAdminTeam(vmtea.teamObj).then(function(resp) {
                if(resp && resp.errorCode){
                    $scope.$emit('alert', {
                    message: resp.message,
                    success: false
                });
                }else{
                    vmtea.data = resp;
                     $scope.$emit('alert', {
                        message: 'Team member updated successfully',
                        success: true
                    });
                }
               
                vmtea.populateTeamData();
                vmtea.resetForm(form);
            });
        } else {
            vmtea.teamObj.memberName = team.newMember;
            vmtea.teamObj.nodeLevel = team.newLevel;
            vmtea.teamObj.memberTitle = team.newRole;
            vmtea.teamObj.groupName = team.newTeamName;
            // vmtea.teamObj.primaryPhone = team.newPrimaryContact;
            vmtea.teamObj.memberEmailId = team.newEmail;
            vmtea.teamObj.managerId = team.newManager ? team.newManager : 0;
            vmtea.teamObj.memberDescription = team.memberDescription;
            adminservice.saveAdminTeam(vmtea.teamObj).then(function(resp) {
                if(resp && resp.errorCode)
                {
                    $scope.$emit('alert', {
                        message: resp.message,
                        success: false
                    });
                }else{
                    vmtea.data = resp;
                    $scope.$emit('alert', {
                        message: 'Team member added successfully',
                        success: true
                    });
                    vmtea.populateTeamData();
                }
                vmtea.resetForm(form);
            });
        }
    }

  
 function refreshResults($select){
    var search = $select.search,
      list = angular.copy(vmtea.teamDetails);
    //remove last user input
    list = list.filter(function(item) { 
      return item !== $select.search; 
    });
    if (!search) {
      //use the predefined list
      $select.items = list;
      
    }
    else {
      //manually add user input and set selection
      var userInputItem = search;
      $select.items = [userInputItem].concat(list);
      $select.selected = userInputItem;
    }
  }

  $scope.$watch('vmtea.team.newTeamName', function(newValue, oldValue){
   
        teamService.getTeamChart(newValue).then(function(data){
            vmtea.managersList = data;
            $timeout(function(){
                if(vmtea.managersList && vmtea.managersList.length){
                    vmtea.teamTypeManagers = [];
                    angular.forEach(vmtea.managersList, function(key, value){
                    var obj ={
                            'id': '',
                            'name': '',
                            'level':null
                        };
                        obj.id = key.rtTeamMemberId;
                        obj.name = key.memberName;
                        obj.level = key.nodeLevel;
                        var index = vmtea.teamTypeManagers.indexOf(obj.id);
                        console.log(index);
                        if (index > -1) {
                            vmtea.teamTypeManagers.splice(index, 1);
                        } else {
                            vmtea.teamTypeManagers.push(obj);
                        }
                    });
                }
            }, 100);
        });
  });

  function showManagerByLevels(rowData){
    return rowData.level == vmtea.team.newLevel-1;
  }
  function clear($event, $select){
    $event.stopPropagation(); 
    //to allow empty field, in order to force a selection remove the following line
    $select.selected = undefined;
    //reset search query
    $select.search = undefined;
    //focus and open dropdown
    $select.activate();
  }
    function delTeam(rtTeamMemberId) {
        adminservice.deleteAdminTeam(rtTeamMemberId).then(function(resp) {
           if(resp && resp.errorCode){
                $scope.$emit('alert', {
                message: resp.message,
                success: false
            });
           }else{
             vmtea.data = resp;
            $scope.$emit('alert', {
                message: 'Team member deleted successfully',
                success: true
            });
            vmtea.populateTeamData();
           }
        });
    }

    function cancelUpdate(form) {
        vmtea.updateTeam = null;
        vmtea.team = {};
        form.$setPristine();
        form.$setUntouched();
        vmtea.getTeamDetails();
    }

    function resetForm(form) {
        vmtea.team = {};
        form.$setPristine();
        form.$setUntouched();
        vmtea.getTeamDetails();
    }
}
module.exports = AdminTeamController;