ProjectLifeCycleController.$inject = ['$state', '$scope', '$uibModal', '$log'];

function ProjectLifeCycleController($state, $scope, $uibModal, $log) {
    var vmplc = this;
    vmplc.projectlifecycleBtns = [{"Name":"RT PLC MILESTONE","link":"root.projectlifecycle"},{"Name":"RT PLC NOTIFICATION","link":"root.projectlifecycle"}];
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

ModalNotificationController.$inject = ['$scope', '$uibModalInstance', 'userForm'];

function ModalNotificationController ($scope, $uibModalInstance, userForm) {
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

module.exports = ProjectLifeCycleController;
