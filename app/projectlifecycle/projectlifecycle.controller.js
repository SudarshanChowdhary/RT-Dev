	ProjectLifeCycleController.$inject = ['$state', '$scope', '$modal', '$log'];

function ProjectLifeCycleController($state, $scope, $modal, $log) {
    var vmplc = this;
    vmplc.projectlifecycleBtns = [{"Name":"RT PLC MILESTONE","link":"root.projectlifecycle"},{"Name":"RT PLC NOTIFICATION","link":"root.projectlifecycle"}];
    // Variable Definitions
    // Function Definitions
    vmpro.init = init;
    init();
     $scope.showForm = function () {
            $scope.message = "Show Form Button Clicked";
            console.log($scope.message);

            var modalInstance = $modal.open({
                templateUrl: 'modal-form.html',
                controller: ModalInstanceCtrl,
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


    /**
     * init
     * Intializing On Load Services for Set Up Client Page
     */
    function init() {}
}


module.exports = ProjectLifeCycleController;



