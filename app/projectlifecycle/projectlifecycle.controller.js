ProjectLifeCycleController.$inject = ['$state', '$scope', '$uibModal', '$log', 'ProjectLifeCycleService', 'sharedService'];

function ProjectLifeCycleController($state, $scope, $uibModal, $log, ProjectLifeCycleService, sharedService) {

    
     $scope.showMileStoneForm = function () {
            var modalInstance = $uibModal.open({
                templateUrl: 'app/projectlifecycle/templates/rtplcmilestone.html',
                controller: ModalMileStoneController,
                scope: $scope,
                resolve: {
                    milestoneData: function () {
                        return $scope.milestoneData;
                    }
                }
            });
            
            // ProjectLifeCycleService.getBhuid($scope.bhuid).then(function(data){
            //     $scope.bhuihu = data;
            // });

            sharedService.getTeamMembers().then(function(data){
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
	        resolve: {
	            notificationData: function () {
	                return $scope.notificationData;
	              }
	            }
            });
            // ProjectLifeCycleService.getBhuid($scope.bhuid).then(function(data){
            //     $scope.bhuId = data;
            // });
            
            sharedService.getTeamMembers().then(function(data){
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
'ProjectLifeCycleService', 'spinnerService', '$filter'];

function ModalMileStoneController ($scope, $uibModalInstance, milestoneData, ProjectLifeCycleService, spinnerService, $filter) {
    $scope.milestoneRequiredData = {};
    $scope.date = new Date();
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
            debugger;
          spinnerService.show();
          $scope.milestoneRequiredData = {
            "meetingDate": $filter('date')($scope.date, "dd-MM-yyyy"),
            "bhuId": $scope.bhuihu,
            "rtspoc": $scope.selected,
            "rtPlcMilestone": $scope.plcmilestone,
            "minutesOfMeeting": $scope.elucidationmom,
            "efforts": $scope.hours +"." +$scope.minutes
          };
          console.log("milestone", $scope.milestoneRequiredData);
            ProjectLifeCycleService.rtPlcMilestoneAdd($scope.milestoneRequiredData).then(function(){
              spinnerService.hide();
          });
          $uibModalInstance.close('closed');
        }
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
};

ModalNotificationController.$inject = ['$scope', '$uibModalInstance', '$http', 'notificationData', 'ProjectLifeCycleService', 'spinnerService','$q','$rootScope'];

function ModalNotificationController ($scope, $uibModalInstance, $http, notificationData, ProjectLifeCycleService, spinnerService, $q, $rootScope) {
    $scope.notificationFormData = {}
    $scope.fileAttachment = [];
    $scope.files = [];

    $scope.selectables = [{
      label: 'UAT'
    },{
      label: 'Design And Development'
    },{
      label: 'Integration and Testing'
    },{
      label: 'Warranty and Phase'
    },{
      label: 'P2S'
    }];
    
    $scope.previewPhase = function(lable){
      $scope.phase_preview =  ProjectLifeCycleService.getPhases(lable);
    };

  // Any function returning a promise object can be used to load values asynchronously
    $scope.$on("seletedFile", function (event, args) {
        $scope.$apply(function () {
            //add the file object to the scope's files collection
            $scope.files.push(args.file);
        });
    });

    $scope.submitFormNotfication = function () {
        if ($scope.notificationForm.$valid) {
            var attachments = $scope.myFile;
           debugger;
           var deffered = $q.defer();
            $scope.notificationFormData = {
                "bhuId": $scope.bhuId,
                "rtSpoc": $scope.selected,
                "send-to":$scope.rt_recipients,
                "status": $scope.plc_phase,
                "content": $scope.content,
                "file": attachments,
                "from": $rootScope.user
            }
            var fmData = new FormData();
            debugger;
            if(attachments && attachments.length > 0){
                fmData.append("files", attachments);
            }
            fmData.append("data", JSON.stringify($scope.notificationFormData));

            $http.post("milestone/doEmail", $scope.notificationFormData,{
                headers: { 'Content-Type': "undefined" },
                transformRequest: angular.identity
            }).
            success(function (data, status, headers, config) {
                alert("success!");
                $uibModalInstance.close('closed');
                deffered.resolve(data);
            }).
            error(function (data, status, headers, config) {
                alert(data);
                deffered.reject(data);
                $uibModalInstance.close('closed');
            });
          }
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
};

module.exports = ProjectLifeCycleController;
