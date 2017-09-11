

ModalInstanceController.$inject = ['$scope', '$modalInstance', 'userForm'];

function ModalInstanceController ($scope, $modalInstance, userForm) {
debugger;
    $scope.form = {}
    $scope.submitForm = function () {
        if ($scope.form.userForm.$valid) {
            console.log('user form is in scope');
            $modalInstance.close('closed');
        } else {
            console.log('userform is not in scope');
        }
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};

module.exports = ModalInstanceController;