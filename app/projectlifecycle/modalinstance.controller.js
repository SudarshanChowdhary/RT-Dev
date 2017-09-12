ModalInstanceController.$inject = ['$scope', '$modalInstance', 'userForm','rtplcmilestoneservice'];

function ModalInstanceController ($scope, $modalInstance, userForm, rtplcmilestoneservice) {
    var rtPlc = this;
    $scope.form = {};
    $scope.submitForm = function () {
        var frm = $scope.form.userForm;
        if (frm.$valid) {
            console.log('user form is in scope');
            var data = {
                "meetingDate": frm.date,
                "bhuId": frm.bhu_ihu,
                "rtSpoc": frm.rt_Spoc,
                "rtPlcMilestone": frm.plc_milestone,
                "minutesOfMeeting": frm.elucidation_mom,
                "efforts": frm.mlEfforts
            };
            var resp = rtplcmilestoneservice.rtPlcMilestoneAdd(data);

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