ProjectLifeCycleController.$inject = ['$state', '$scope', '$uibModal', '$log', 'ProjectLifeCycleService', 'sharedService', 'toaster'];

function ProjectLifeCycleController($state, $scope, $uibModal, $log, ProjectLifeCycleService, sharedService, toaster) {
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
}

ModalMileStoneController.$inject = ['$scope', '$uibModalInstance', 'milestoneData',
'ProjectLifeCycleService', 'spinnerService', '$filter', 'toaster'];

function ModalMileStoneController ($scope, $uibModalInstance, milestoneData, ProjectLifeCycleService, spinnerService, $filter, toaster) {
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

          var shrdScript = document.getElementById("scripts_shared").value;
          var scriptsRecived = document.getElementById("scripts_recived").value;
          var scriptsModified = document.getElementById("scripts_modified").value;
          var scriptsUtilized = document.getElementById("scripts_utilized").value;

          $scope.milestoneRequiredData = {
            "meetingDate": $filter('date')($scope.date, "yyyy-MM-dd"),
            "bhuId": $scope.bhuihu,
            "rtSpoc": $scope.selected,
            "rtPlcMilestone": $scope.plcmilestone,
            "mom": $scope.elucidationmom,
            "efforts": ($scope.hours ? $scope.hours :00) +"."+ ($scope.minutes ? $scope.minutes : 00),
            "newScriptsReceived" : scriptsRecived ? scriptsRecived : "0",
            "scriptsModified": scriptsModified ? scriptsModified : "0",
            "scriptsUtilised" : scriptsUtilized ?  scriptsUtilized : "0",
            "scriptsShared": shrdScript ?  shrdScript : "0"
          };
          //console.log("milestone", $scope.milestoneRequiredData);
            ProjectLifeCycleService.rtPlcMilestoneAdd($scope.milestoneRequiredData).then(function(res){
              spinnerService.hide();
              $uibModalInstance.close();
              if(res == true){
                toaster.pop({
                    type: 'success',
                    body: 'Milestone Successfully Added..!',
                    timeout: 3000,
                    showCloseButton: true               
                });
            }else{
                if(res && res.errorCode){
                    toaster.pop({
                        type: 'error',
                        body: 'Milestone does not added, Please check BHU ID# and RT SPOC details..!',
                        timeout: 3000,
                        showCloseButton: true               
                    });
                }
            }
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

ModalNotificationController.$inject = ['$scope', '$uibModalInstance', '$http', 'notificationData', 'ProjectLifeCycleService', 'spinnerService','$q','$rootScope', 'toaster'];

function ModalNotificationController ($scope, $uibModalInstance, $http, notificationData, ProjectLifeCycleService, spinnerService, $q, $rootScope, toaster) {
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
        if ($scope.notificationForm.$valid) {
            var attachment = $scope.myFile;
            var fmData = new FormData();
            fmData.append('bhuId', $scope.bhuId);
            fmData.append('rtSpoc', $scope.selected);
            fmData.append('sentTo', $scope.rt_recipients);
            fmData.append('status', $scope.plc_phase);
            fmData.append('content', $scope.content);
            fmData.append('from', $rootScope.user);
            //fmData.append('file', attachments);//new Blob(attachments, { type: 'text/csv' }));
           var contentType = undefined;
            if(attachment && attachment.length > 0){
                fmData.append("file", attachment[0]);
                //contentType = 'multipart/form-data';
            }
           // var url = "https://rtdashboardd.rno.apple.com:9012/RTDashboard/milestone/doEmail";
            var url = "milestone/doEmail";
            $http.post(url , fmData ,{
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': contentType
                },
            }).
            success(function (data, status, headers, config) {
                $uibModalInstance.close();
                if(data == true){
                    toaster.pop({
                        type: 'success',
                        body: 'Notification Successfully sent',
                        timeout: 3000,
                        showCloseButton: true               
                    });
                }else{
                    toaster.pop({
                        type: 'error',
                        body: 'Notification sending error, Please contact with admin..!',
                        timeout: 3000,
                        showCloseButton: true               
                    });
                }
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
