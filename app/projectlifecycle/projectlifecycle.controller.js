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

        sharedService.getrtSpocsUsers().then(function (data) {
            $scope.rt_spocs_selected = { items: [] };
            $scope.rt_spocs = data;
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
        $('#summernote').summernote();

        sharedService.getrtSpocsUsers().then(function (data) {
            $scope.rt_spocs_selected = { items: [] };
            $scope.rt_spocs = data;
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

function ModalMileStoneController($scope, $uibModalInstance, milestoneData, ProjectLifeCycleService, spinnerService, $filter, toaster) {
    $scope.milestoneRequiredData = {};
    $scope.date = new Date();
    $scope.resetClicked = false;
    $scope.dateOptions = {
        dateDisabled: false,
        showWeeks: false,
        formatYear: 'yy',
        minDate: new Date(),
        startingDay: 1
    };
    $scope.open1 = function () {
        $scope.popup1.opened = true;
    };
    $scope.format = "dd-MM-yyyy";
    $scope.popup1 = {
        opened: false
    };

    $scope.validateNumber = function ($event) {
        if (isNaN(String.fromCharCode($event.keyCode))) {
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
                "efforts": ($scope.hours ? $scope.hours : 00) + "." + ($scope.minutes ? $scope.minutes : 00),
                "newScriptsReceived": scriptsRecived ? scriptsRecived : "0",
                "scriptsModified": scriptsModified ? scriptsModified : "0",
                "scriptsUtilised": scriptsUtilized ? scriptsUtilized : "0",
                "scriptsShared": shrdScript ? shrdScript : "0"
            };
            //console.log("milestone", $scope.milestoneRequiredData);
            ProjectLifeCycleService.rtPlcMilestoneAdd($scope.milestoneRequiredData).then(function (res) {
                spinnerService.hide();
                $uibModalInstance.close();
                if (res == true) {
                    toaster.pop({
                        type: 'success',
                        body: 'Milestone Successfully Added..!',
                        timeout: 3000,
                        showCloseButton: true
                    });
                } else {
                    if (res && res.errorCode) {
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

    $scope.reSetFormItems = function () {
        $scope.resetClicked = true;
    }

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
};

ModalNotificationController.$inject = ['$scope', '$uibModalInstance', '$http', 'notificationData',
    'ProjectLifeCycleService', '$q', '$rootScope', 'toaster', 'Upload', '$timeout', '$log'];

function ModalNotificationController($scope, $uibModalInstance, $http, notificationData,
    ProjectLifeCycleService, $q, $rootScope, toaster, Upload, $timeout, $log) {
    $scope.isBhuNotify = false;
    $scope.notificationFormData = {};
    $scope.fileAttachment = [];
    $scope.files = [];
    $scope.phase_selectables = {
        selectables : [{
            label: 'Design And Development',
            value: 'Design'
        }, {
            label: 'Integration Testing',
            value:'IT'
        }, {
            label: 'UAT',
            value: 'UAT'
        }, {
            label: 'RT',
            value: 'RT'
        }, {
            label: 'Warranty Phase',
            value: 'Warranty'
        }, {
            label: 'P2S',
            value: 'P2S'
        }]};

    $scope.previewPhase = function (phase) {
        console.log(phase)
        $scope.phase_preview = ProjectLifeCycleService.getPhases(phase.label);
        $scope.plcphase_preview = ProjectLifeCycleService.getPLCPhases(phase.value);
       

        // //note-editing-area
        $('#summernote').summernote('code', $scope.plcphase_preview);
        $( "#hiddenPLCPhase" ).val($scope.plcphase_preview).change();
        $('#summernote').parent().css("display","block");
        // $('#hiddenPLCPhase').append($scope.plcphase_preview);
        
        $(document).bind("keyup",".note-codable",function(e){
            $( "#hiddenPLCPhase" ).val($('.note-editable').text().trim() ).change();
        });
       
        // $("#summernote").load();
        // $(".note-codable").keyup();
    };
    $scope.clearImageSource = function () {
        $scope.phase_preview = "";
        $scope.plc_phase="";
        $('.note-editable').text("").keyup();
        $('#summernote').parent().css("display","none");
    }
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
    }

    $scope.bindrtSpoc = function(bhuid){
        ProjectLifeCycleService.getBhuSpocDetails(bhuid).then(function(res){
            var rtspoc = [];
            res.forEach(function(element, indx) {
                //avoiding the duplicate rtspoc
                if(rtspoc.indexOf(element.rtSpoc) == -1){
                    rtspoc.push(element.rtSpoc);
                }
            }, this);
            if(rtspoc.length == 0){
                //do it validation here
                prompt("BHUID is not valid")
            }
            $scope.rt_spocs = rtspoc;
        });
    }

    $scope.submitFormNotfication = function (picFile) {
        if ($scope.notificationForm.$valid) {
            ProjectLifeCycleService.sendNotification($scope, picFile).then(function (response) {
                $uibModalInstance.close();
                if (response.status == 200) {
                    toaster.pop({
                        type: 'success',
                        body: 'Notification has been sent successfully..!',
                        timeout: 3000,
                        showCloseButton: true
                    });
                } else if (response.status == 500) {
                    toaster.pop({
                        type: 'error',
                        body: 'Notification sending error, Please contact with admin..!',
                        timeout: 3000,
                        showCloseButton: true
                    });
                }
                else if (response.isError && response.isError == true) {
                    toaster.pop({
                        type: 'error',
                        body: 'Notification sending error, Please contact with admin..!',
                        timeout: 3000,
                        showCloseButton: true
                    });
                }
            });
            // //var reqUrl = "https://rtdashboardd.rno.apple.com:9012/RTDashboard/milestone/doEmail";
            // var reqUrl = "milestone/doEmail";

            // file.upload = Upload.upload({
            //     url: reqUrl,
            //     file: file,
            //     fields: {
            //         bhuId: $scope.bhuId,
            //         rtSpoc:$scope.selected,
            //         sentTo:$scope.rt_recipients,
            //         status:$scope.plc_phase,
            //         content:$scope.content,
            //         from:$rootScope.user
            //     },
            //   });

            //   file.upload.then(function (response) {
            //     $log.warn(JSON.stringify(response.config.transformRequest));
            //     file.result = response.data;
            //     $uibModalInstance.close();
            //     if (response.status == 200){
            //         toaster.pop({
            //             type: 'success',
            //             body: 'Notification has been sent successfully..!',
            //             timeout: 3000,
            //             showCloseButton: true               
            //         });
            //     }else if(response.status == 500){
            //         toaster.pop({
            //             type: 'error',
            //             body: 'Notification sending error, Please contact with admin..!',
            //             timeout: 3000,
            //             showCloseButton: true               
            //         });
            //     }
            //   }, function (response) {
            //     if (response.status > 0){
            //       $uibModalInstance.close();
            //       $scope.errorMsg = response.status + ': ' + response.data;
            //       $log.log( $scope.errorMsg);
            //         toaster.pop({
            //             type: 'error',
            //             body: 'Notification sending error, Please contact with admin..!',
            //             timeout: 3000,
            //             showCloseButton: true               
            //         });
            //     }
            //   }, function (evt) {
            //     $log.warn(evt.type);
            //       if(evt.type=='load'){
            //         $log.warn(JSON.stringify( evt.config));
            //         $log.warn(JSON.stringify( evt.currentTarget));
            //       }
            //     // Math.min is to fix IE which reports 200% sometimes
            //     //file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            //   });
        }
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
};

module.exports = ProjectLifeCycleController;
