ProjectLifeCycleController.$inject = ['$state', '$scope', '$uibModal', '$log', 'toaster', 'ProjectLifeCycleService', 'sharedService', 'alertService','$rootScope'];

function ProjectLifeCycleController($state, $scope, $uibModal, $log, toaster, ProjectLifeCycleService, sharedService, alertService, $rootScope) {
     $scope.showMileStoneForm = function () {
            var modalInstance = $uibModal.open({
                templateUrl: 'app/projectlifecycle/templates/rtplcmilestone.html',
                controller: ModalMileStoneController,
                scope: $scope,
                backdrop: "static",
                keyboard: false,
                resolve: {
                    milestoneData: function () {
                        return $scope.milestoneData;
                    }
                }
            });

            sharedService.getrtSpocsUsers().then(function(data){
                $scope.rt_spocs_selected = { items : []};
                $scope.rt_spocs  = data;
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
                console.log($scope.selected);

    

            }, function () {

                toaster.pop({
                    type: 'success',
                    body: 's8dardauaj',
                    timeout: 5000,
                    showCloseButton: true               
                });
    

                $log.info('Modal dismissed at: ' + new Date());
            });
    };

	$scope.showNotificationForm = function () {
	        var modalInstance = $uibModal.open({
	        templateUrl: 'app/projectlifecycle/templates/rtplcnotification.html',
	        controller: ModalNotificationController,
            scope: $scope,
            backdrop: "static",
            keyboard: false,
	        resolve: {
	            notificationData: function () {
	                return $scope.notificationData;
	              }
	            }
            });
            
            sharedService.getrtSpocsUsers().then(function(data){
                $scope.rt_spocs_selected = { items : []};
                $scope.rt_spocs  = data;
            });
	        modalInstance.result.then(function (selectedItem) {
	            $scope.selected = selectedItem;
	        }, function () {
	            $log.info('Modal dismissed at: ' + new Date());
	        });
    };
    $rootScope.success = function(mesg){
        alertService.alertSrv.showAlert("success", mesg, 3000);
    }

    $rootScope.error = function(mesg){
        alertService.alertSrv.showAlert("danger", mesg, 3000);
    }

  
  // root binding for alertService
    $rootScope.closeAlert = function(indx){
        alertService.alertSrv.closeAlert(indx);
    }
}

ModalMileStoneController.$inject = ['$scope', '$uibModalInstance', 'milestoneData', 'toaster',
'ProjectLifeCycleService', 'spinnerService', '$filter'];

function ModalMileStoneController ($scope, $uibModalInstance, milestoneData, toaster, ProjectLifeCycleService, spinnerService, $filter) {
    $scope.milestoneRequiredData = {};
    $scope.date = new Date();
    $scope.resetClicked = false;
    $scope.dateOptions = {
        dateDisabled: false,
        showWeeks:false,
        formatYear: 'yy',
        minDate: new Date(),
        startingDay: 1
      };
      $scope.open1 = function() {
        $scope.popup1.opened = true;
      };
      $scope.format = "dd-MM-yyyy";
      $scope.popup1 = {
        opened: false
      };
    
      $scope.validateNumber =function($event){
        if(isNaN(String.fromCharCode($event.keyCode))){
            $event.preventDefault();
        }
      }
      
      $scope.plc_phase = null;
      $scope.modelOptions = {
        debounce: {
          default: 500,
          blur: 250
        },
        getterSetter: true
      };
      $scope.submitMilestone = function () {
        if ($scope.form.milestone.$valid) {
          spinnerService.show();
          toaster.pop('info', "title", "form valid");

          var shrdScript = document.getElementById("scripts_shared").value;
          var scriptsRecived = document.getElementById("scripts_recived").value;
          var scriptsModified = document.getElementById("scripts_modified").value;
          var scriptsUtilized = document.getElementById("scripts_utilized").value;

          $scope.milestoneRequiredData = {
            "meetingDate": $filter('date')($scope.date, "yyyy-MM-dd"),
            "bhuId": $scope.bhuihu,
            "rtSpoc": $scope.selected,
            "rtPlcMilestone": $scope.plcmilestone,
            "minutesOfMeeting": $scope.elucidationmom,
            "efforts": ($scope.hours ? $scope.hours :00) +"."+ ($scope.minutes ? $scope.minutes : 00),
            "newScripstRecived" : scriptsRecived ? scriptsRecived : 0,
            "scripstModified": scriptsModified ? scriptsModified : 0,
            "scriptsUtilised" : scriptsUtilized ? scriptsUtilized : 0,
            "scriptsShared": shrdScript ? shrdScript : 0
          };
          //console.log("milestone", $scope.milestoneRequiredData);
            ProjectLifeCycleService.rtPlcMilestoneAdd($scope.milestoneRequiredData).then(function(){
              spinnerService.hide();
              $uibModalInstance.close();
              $rootScope.success("Milestone updated..!");
              toaster.pop({
                type: 'success',
                body: 's8dardauaj',
                timeout: 5000,
                showCloseButton: true               
            });


          }, function(err){
            $uibModalInstance.close();
           });
        }
    };

    $scope.reSetFormItems = function(){
        $scope.resetClicked = true;
    }

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
};

ModalNotificationController.$inject = ['$scope', '$uibModalInstance', '$http', 'toaster', 'notificationData', 'ProjectLifeCycleService', 'spinnerService','$q','$rootScope'];

function ModalNotificationController ($scope, $uibModalInstance, $http, toaster, notificationData, ProjectLifeCycleService, spinnerService, $q, $rootScope) {
    $scope.notificationFormData = {}
    $scope.fileAttachment = [];
    $scope.files = [];

    $scope.selectables = [{
      label: 'Design And Development'
    },{
      label: 'Integration and Testing'
    },{
        label: 'UAT'
    },{
        label: 'RT'
    },{
      label: 'Warranty and Phase'
    },{
      label: 'P2S'
    }];
    
    $scope.previewPhase = function(lable){
      $scope.phase_preview =  ProjectLifeCycleService.getPhases(lable);
    };
    $scope.clearImageSource = function(){
      $scope.phase_preview = "";
    }
  // Any function returning a promise object can be used to load values asynchronously
    $scope.$on("seletedFile", function (event, args) {
        $scope.$apply(function () {
            //add the file object to the scope's files collection
            $scope.files.push(args.file);
        });
    });

    $scope.validateNumber =function($event){
      if(isNaN(String.fromCharCode($event.keyCode))){
          $event.preventDefault();
      }
    }
    $scope.submitFormNotfication = function () {
        $uibModalInstance.close();
        $rootScope.success("Notification has been sent to user..!");
        return;
        if ($scope.notificationForm.$valid) {
            var attachment = $scope.myFile;

            var fmData = new FormData();
            fmData.append('bhu-Id', $scope.bhuId);
            fmData.append('rtSpoc', $scope.selected);
            fmData.append('sent-to', $scope.rt_recipients);
            fmData.append('status', $scope.plc_phase);
            fmData.append('content', $scope.content);
            fmData.append('from', $rootScope.user);
            //fmData.append('file', attachments);//new Blob(attachments, { type: 'text/csv' }));
           
            if(attachment.length > 0){
                fmData.append("file", attachment[0]);
            }
            var url = "https://rtdashboardd.rno.apple.com:9012/RTDashboard/milestone/doEmail";
            // var url = "milestone/doEmail";
            $http.post(url , fmData ,{
                //transformRequest: angular.identity,
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }).
            success(function (data, status, headers, config) {
                $uibModalInstance.close();
                $rootScope.success("Notification has been sent to user..!");
                toaster.pop({
                    type: 'success',
                    body: 'messages',
                    timeout: 5000,
                    showCloseButton: true               
                });
    

            }).
            error(function (data, status, headers, config) {
                //deffered.reject(data);
                $uibModalInstance.close();
            });
          }
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
};

module.exports = ProjectLifeCycleController;
