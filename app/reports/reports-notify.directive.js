
ReportNotificationController.$inject = ['$uibModal', '$scope', '$uibModalInstance', '$http', 'notificationData',
    'ProjectLifeCycleService', 'spinnerService', '$q', '$rootScope', 'toaster', 'Upload', '$timeout', '$log', 'sharedService', 'reportservice'];

function ReportNotificationController($uibModal, $scope, $uibModalInstance, $http, notificationData,
    ProjectLifeCycleService, spinnerService, $q, $rootScope, toaster, Upload, $timeout, $log, sharedService, reportservice) {
    $scope.notificationFormData = {};
    $scope.bhuId = notificationData.item.bhuId;
    $scope.isBhuNotify = true;
    $scope.selected = notificationData.item.rtsSpoc;
    $scope.rt_spocs = notificationData.rt_spocs ? notificationData.rt_spocs : [];
    $scope.rt_spocs_selected = notificationData.rt_spocs_selected ? notificationData.rt_spocs_selected : { items: [] };

    $scope.selectables = [{
        label: 'Design And Development'
    }, {
        label: 'Integration and Testing'
    }, {
        label: 'UAT'
    }, {
        label: 'RT'
    }, {
        label: 'Warranty and Phase'
    }, {
        label: 'P2S'
    }];

    $scope.previewPhase = function (lable) {
        $scope.phase_preview = ProjectLifeCycleService.getPhases(lable);
    };

    $scope.resetForm = function () {
        $scope.phase_preview = "";
        $scope.content = "";
        $scope.rt_recipients = "";
    };
    // Any function returning a promise object can be used to load values asynchronously
    $scope.$on("seletedFile", function (event, args) {
        $scope.$apply(function () {
            //add the file object to the scope's files collection
            $scope.files.push(args.file);
        });
    });

    $scope.validateNumber = function ($event) {
        if (isNaN(String.fromCharCode($event.keyCode))) {
            $event.preventDefault();
        }
    };

    //this function has implemented for new functionality, BHU Report notification
    $scope.submitBhuDetailsNotfication = function () {
        if ($scope.notificationForm.$valid) {
            var itm = notificationData.item;
            var dsd={
                 bhuId:itm.bhuId,
                 currentStatus:itm.currentStatus,
                 size:itm.size,
                 objImpacted:itm.noOfObjects,
                 projManager:itm.projectManager,
                 rtSpoc:itm.rtsSpoc,
                 rtExtendedTeam:itm.extteammembers,
                 scriptsShared:itm.scriptshared,
                 scriptsUtilized:itm.scriptutilized,

                 scriptsExecuted:itm.scriptexecuted,
                 rtDefects:itm.rtdefects,
                 rtMiss:itm.rtmiss,
                 warrantyIssues:itm.warrantyissue,
                 warrantyScriptsExecuted:itm.scriptExcpartOfwarranty,

                 newScriptsreceived:itm.newscriptreceived,
                 scriptsModified:itm.scriptsmodified,
                 efforts:itm.efortsutilized,
                 description:itm.desc
            }
            var reqData =  {
                bhuDetails: JSON.stringify(dsd),
                recepients: $scope.rt_recipients,
                content: $scope.content,
                from: $rootScope.user
            }
            reportservice.sendBhuNotification(reqData).then(function (response) {
                console.log(response);
                $uibModalInstance.dismiss('cancel');
                if (response && response.errorCode) {
                    toaster.pop({
                        type: 'error',
                        body: 'Notification sending error, Please contact with admin..!',
                        timeout: 3000,
                        showCloseButton: true
                    });
                } else {
                    toaster.pop({
                        type: 'success',
                        body: 'Notification has been sent successfully..!',
                        timeout: 3000,
                        showCloseButton: true
                    });
                }
            });
        }
    }

    //if there is no attachment for this functionality then no need to keep this unction, use aboue  one "submitBhuDetailsNotfication()"
    /*$scope.submitFormNotfication = function (file) {
        if ($scope.notificationForm.$valid) {
            //var reqUrl = "https://rtdashboardd.rno.apple.com:9012/RTDashboard/milestone/doEmail";
            var reqUrl = "milestone/doEmail";
            file.upload = Upload.upload({
                url: reqUrl,
                file: file,
                fields: {
                    bhuId: $scope.bhuId,
                    rtSpoc:$scope.selected,
                    sentTo:$scope.rt_recipients,
                    status:$scope.plc_phase,
                    content:$scope.content,
                    from:$rootScope.user
                },
              });
 
              file.upload.then(function (response) {
                $log.warn(JSON.stringify(response.config.transformRequest));
                file.result = response.data;
                $uibModalInstance.close();
                if (response.status == 200){
                    toaster.pop({
                        type: 'success',
                        body: 'Notification has been sent successfully..!',
                        timeout: 3000,
                        showCloseButton: true               
                    });
                }else if(response.status == 500){
                    toaster.pop({
                        type: 'error',
                        body: 'Notification sending error, Please contact with admin..!',
                        timeout: 3000,
                        showCloseButton: true               
                    });
                }
              }, function (response) {
                if (response.status > 0){
                  $uibModalInstance.close();
                  $scope.errorMsg = response.status + ': ' + response.data;
                  $log.log( $scope.errorMsg);
                    toaster.pop({
                        type: 'error',
                        body: 'Notification sending error, Please contact with admin..!',
                        timeout: 3000,
                        showCloseButton: true               
                    });
                }
              }, function (evt) {
                $log.warn(evt.type);
                  if(evt.type=='load'){
                    $log.warn(JSON.stringify( evt.config));
                    $log.warn(JSON.stringify( evt.currentTarget));
                  }
                // Math.min is to fix IE which reports 200% sometimes ded / evt.total));
              });
          }
    };*/

    $scope.getNotificationPreview = function () {
        if ($scope.notificationForm.$valid) {
            notificationData.recipient = notificationForm.rt_recipient.value;
            notificationData.content = notificationForm.content.value;
            $uibModal.open({
                templateUrl: 'app/reports/templates/bhu-notification-preview.html',
                controller: BhuNotificationPreviewController,
                //scope: $scope,
                backdrop: "static",
                keyboard: false,
                //size: 'lg',
                resolve: {
                    notificationData: function () {
                        return notificationData;
                    }
                }
            });
        }
    }

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
};

BhuNotificationPreviewController.$inject = ['$scope', '$uibModalInstance', 'notificationData', 'reportservice'];

function BhuNotificationPreviewController($scope, $uibModalInstance, notificationData, reportservice) {
    $scope.bhuId = notificationData.item.bhuId;
    $scope.fields = notificationData.item;
    $scope.recipients = notificationData.recipient;
    $scope.content = notificationData.content;
    $scope.keys = reportservice.getBhuReportColumns();
    $scope.rtspocs = notificationData.item.rtsSpoc;
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}

module.exports = BhuNotificationPreviewController;

BhuNotifyModalDirective.$inject = ['$uibModal', 'sharedService'];

function BhuNotifyModalDirective($uibModal, sharedService) {
    return {
        restrict: 'A',

        link: function (scope, element, attr, ctrl) {
            element.on('click', function () {
                if (scope.item.bhuId) {
                    if (!scope.rt_spocs && !scope.item.rtsSpoc) {
                        sharedService.getrtSpocsUsers().then(function (data) {
                            scope.rt_spocs_selected = { items: [] };
                            scope.rt_spocs = data;
                            $uibModal.open({
                                templateUrl: 'app/reports/templates/modal-bhu-notification.html',
                                controller: ReportNotificationController,
                                //scope: $scope,
                                backdrop: "static",
                                keyboard: false,
                                resolve: {
                                    notificationData: function () {
                                        return scope;
                                    }
                                }
                            });
                        });
                    } else {
                        $uibModal.open({
                            templateUrl: 'app/reports/templates/modal-bhu-notification.html',
                            controller: ReportNotificationController,
                            //scope: $scope,
                            backdrop: "static",
                            keyboard: false,
                            resolve: {
                                notificationData: function () {
                                    return scope;
                                }
                            }
                        });
                    }
                }
            });
        }
    };
}
module.exports = BhuNotifyModalDirective;