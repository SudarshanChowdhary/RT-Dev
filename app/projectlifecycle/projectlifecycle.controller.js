ProjectLifeCycleController.$inject = ['$state', '$scope', '$uibModal', '$log'];

function ProjectLifeCycleController($state, $scope, $uibModal, $log) {
   // var vmplc = this;
   // vmplc.projectlifecycleBtns = [{"Name":"RT PLC MILESTONE","link":"root.projectlifecycle"},{"Name":"RT PLC NOTIFICATION","link":"root.projectlifecycle"}];
     $scope.showMileStoneForm = function () {
            var modalInstance = $uibModal.open({
                templateUrl: 'app/projectlifecycle/templates/rtplcmilestone.html',
                controller: ModalMileStoneController,
                scope: $scope,
                resolve: {
                    userForm: function () {
                        return $scope.userForm;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
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
	            userForm: function () {
	                return $scope.userForm;
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

ModalMileStoneController.$inject = ['$scope', '$uibModalInstance', 'userForm'];

function ModalMileStoneController ($scope, $uibModalInstance, userForm) {
    $scope.form = {}
    $scope.submitForm = function () {
        if ($scope.form.userForm.$valid) {
            console.log('user form is in scope');
            $uibModalInstance.close('closed');
        } else {
            console.log('userform is not in scope');
        }
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
};

ModalNotificationController.$inject = ['$scope', '$uibModalInstance'];

function ModalNotificationController ($scope, $uibModalInstance) {
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
        debugger;
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
            }).  
            error(function (data, status, headers, config) {  
                alert("failed!");  
            });  


           var fl =  $scope.files.length;
            console.log('user form is in scope');
            $uibModalInstance.close('closed');
        } else {
            console.log('userform is not in scope');
        }
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
};

module.exports = ProjectLifeCycleController;
