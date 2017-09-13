ProjectLifeCycleController.$inject = ['$state', '$scope', '$uibModal', '$log'];

function ProjectLifeCycleController($state, $scope, $uibModal, $log) {
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
	        modalInstance.result.then(function (selectedItem) {
	            $scope.selected = selectedItem;
	        }, function () {
	            $log.info('Modal dismissed at: ' + new Date());
	        });
	    };
}

ModalMileStoneController.$inject = ['$scope', '$uibModalInstance', 'milestoneData', 'ProjectLifeCycleService', 'spinnerService'];

function ModalMileStoneController ($scope, $uibModalInstance, milestoneData, ProjectLifeCycleService, spinnerService) {
    $scope.milestoneRequiredData = {};
    $scope.date = new Date();

    $scope.dateOptions = {
        dateDisabled: false,
        formatYear: 'yy',
        minDate: new Date(),
        startingDay: 1
      };

      $scope.open1 = function() {
        $scope.popup1.opened = true;
      };

      $scope.format = "dd/MM/yyyy";
      $scope.popup1 = {
        opened: false
      };


    $scope.submitMilestone = function () {
        spinnerService.show();
        if ($scope.form.milestone.$valid) {
          $scope.milestoneRequiredData = {
            "meetingDate": $scope.date,
            "bhuId": $scope.bhuihu,
            "rtSpoc": $scope.rtspoc,
            "rtPlcMilestone": $scope.plcmilestone,
            "minutesOfMeeting": $scope.elucidationmom,
            "efforts": $scope.hours +"." +$scope.minutes
          };
          console.log("milestone", $scope.milestoneRequiredData);
            ProjectLifeCycleService.rtPlcMilestoneAdd($scope.milestoneRequiredData).then(function(){
              spinnerService.hide();
              $uibModalInstance.close(milestoneRequiredData);
          })
        }
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
};

ModalNotificationController.$inject = ['$scope', '$uibModalInstance', '$http', 'notificationData', 'ProjectLifeCycleService', 'spinnerService'];

function ModalNotificationController ($scope, $uibModalInstance, $http, notificationData, ProjectLifeCycleService, spinnerService) {
    $scope.form = {}
    $scope.fileAttachment = [];
    $scope.files = [];
    $scope.$on("seletedFile", function (event, args) {
        $scope.$apply(function () {
            //add the file object to the scope's files collection
            $scope.files.push(args.file);
        });
    });
    $scope.submitFormNotfication = function () {
        if ($scope.form.notificationForm.$valid) {
            $http({
                method: 'POST',
                url: "http://localhost:51739/PostFileWithData",
                headers: { 'Content-Type': undefined },
                  transformRequest: function (data) {
                    var formData = new FormData();
                    formData.append("model", angular.toJson(data.model));
                    for (var i = 0; i < data.files.length; i++) {
                        formData.append("file" + i, data.files[i]);
                    }
                    return formData;
                },
                data: { model: $scope.jsonData, files: $scope.files }
            }).
            success(function (data, status, headers, config) {
                alert("success!");
                $uibModalInstance.close('closed');

            }).
            error(function (data, status, headers, config) {
                alert("failed!");
            });
            var fl =  $scope.files.length;
            console.log('user form is in scope');
            $uibModalInstance.close('closed');
        }
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
};
module.exports = ProjectLifeCycleController;
