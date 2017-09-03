ConfirmModalController.$inject = ['$uibModalInstance', 'modal'];

function ConfirmModalController($uibModalInstance, modal) {
    var ctrl = this;
    ctrl.modal = modal;
    ctrl.confirm = function ok() {
        $uibModalInstance.close();
    };
    ctrl.cancel = function cancel() {
        $uibModalInstance.dismiss();
    };
}
ConfirmModalDirective.$inject = ['$uibModal'];

function ConfirmModalDirective($uibModal) {
    return {
        restrict: 'A',
        scope: {
            title: '@',
            content: '@',
            note: '@',
            cancelCaption: '@',
            confirmCaption: '@',
            confirm: '&',
            cancel: '&',
            noFooter: '<',
            confirmEnable: '<',
            confirmClick: '&' //handle defualt click when confirm popup is disabled
        },
        link: function(scope, element, attr, ctrl) {
            element.on('click', function() {
                if (!scope.confirmEnable) {
                    if (scope.confirmClick) {
                        scope.confirmClick();
                    }
                    return;
                }
                $uibModal.open({
                    templateUrl: 'app/shared/directives/confirm-modal/confirm-modal.html',
                    controller: ConfirmModalController,
                    controllerAs: 'ctrl',
                    windowClass: 'center-modal',
                    size: 'xm',
                    resolve: {
                        modal: function() {
                            return scope;
                        }
                    }
                }).result.then(function() {
                    scope.confirm();
                }, function() {
                    scope.cancel();
                });
            });
        }
    };
}
module.exports = ConfirmModalDirective;