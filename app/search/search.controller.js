SearchController.$inject = [    
    '$state',
    '$scope',
    '$rootScope',
    '$http',
    '$filter',
    '$timeout',
    'repositoryservice',
    'sharedService'
];

function SearchController($state, $scope,$rootScope, $http, $filter, $timeout, repositoryservice, sharedService) {
    var vmsea = this;
    vmsea.folderPath = '';
    vmsea.testScriptCount = '';
    vmsea.selectedAll = [];
    vmsea.array = [];


    angular.element('.table--fixed').css({
        "width": sharedService.getWindowWidth() > 1500 ? "100%" : "1700px"
      });

    angular.element(".rt-grid__wrapper").css({
        "margin-top": sharedService.getWindowWidth() > 1500 ? "2%":"2.5%",
    });

    angular.element(".grid-filter").css({
        "margin-right": sharedService.getWindowWidth() > 1500 ? "1.1%":"1.5%",
        "margin-top": "0.5%"
    });
    angular.element(".export-excel").css({
        "margin-right": sharedService.getWindowWidth() > 1500 ? "5.5%":"7.8%",
        "margin-top": "0.5%"
    });

    vmsea.gridOptions = {
        bindType: 1,
        data: {
            foo: {}
        },
        dataOptions: {
            nodata: 'No data'
        },
        enablePagination: true
    };

    if($state.params && $state.params.searchParam && $state.params.searchParam.searchResponseDTO){
       vmsea.folderPath = $state.params.searchParam.searchResponseDTO; 
    }
    if($state.params && $state.params.searchParam && $state.params.searchParam.bhurptDetails){
       vmsea.searchResultsByBhuid = $state.params.searchParam.bhurptDetails; 
       vmsea.bhuid = $state.params.bhuid;
    }
    vmsea.testScriptCount = ($state.params.searchParam && $state.params.searchParam.testcasescount)? $state.params.searchParam.testcasescount : 0;

    vmsea.testScriptsTabs = [{
        title: 'Details',
        content: 'Dynamic content 1',
        templateUrl: 'app/repository/templates/test-scripts/design-details.html'
    }, {
        title: 'Design Steps',
        content: 'Dynamic content 2',
        templateUrl: 'app/repository/templates/test-scripts/design-steps.html'
    }, {
        title: 'Attachments',
        content: 'Dynamic content 3',
        templateUrl: 'app/repository/templates/test-scripts/test-script-attachments.html'
    }];
    $scope.gridOptions = {
        enablePagination: false
    };
    $scope.gridOptionsByBhuid = {
        enablePagination: true
    };
    $scope.designStepsColumns = [{
        headerText: 'Step Name',
        dataField: 'itemName',
        tdClasses: 'width10',
        thClasses: 'width10'
    }, {
        headerText: 'Description',
        dataField: 'description',
        thClasses: 'width35',
        tdClasses: 'width35 wordwrap-text'
    }, {
        headerText: 'Expected Result',
        dataField: 'expectedTxt',
        thClasses: 'width15',
        tdClasses: 'width15 wordwrap-text'
    }, {
        headerText: 'T-Code',
        dataField: 'tcodeTxt',
        thClasses: 'width10',
        tdClasses: 'width10 wordwrap-text'
    }, {
        headerText: 'Input Data',
        dataField: 'inputDataTxt',
        thClasses: 'width15',
        tdClasses: 'width15 wordwrap-text'
    }, {
        headerText: 'Comments',
        dataField: 'commentsTxt',
        thClasses: 'width15',
        tdClasses: 'width15'
    }];

    vmsea.columnDataByBhuid =[
    //     {
    //                         headerText: 'Ticket Type',
    //                         dataField: 'ticketType',
    //                         tdClasses: 'width10',
    //                         thClasses: 'width10',
    //                         sort: true
    //                     }, 
    //                     {
    //                         headerText: 'Ticket Number',
    //                         dataField: 'itemName',
    //                         tdClasses: 'width10',
    //                         thClasses: 'width10'
    //                     }, 
    //                     {
    //                         headerText: 'Description',
    //                         dataField: 'description',
    //                         tdClasses: 'width70',
    //                         thClasses: 'width70'
    //                     },
    //                     {
    //                         headerText: 'Spoc',
    //                         dataField: 'rtSpoc',
    //                         tdClasses: 'width10',
    //                         thClasses: 'width10'
    // }

    {
        headerText: 'BHU/IHU#',
        dataField: 'bhuId',
        thClasses: 'width5',
        tdClasses: 'width5',
        sort: true
    }, {
        headerText: 'Current Status',
        dataField: 'currentStatus',
        thClasses: 'width5',
        tdClasses: 'width5',
        sort: true
    }, {
        headerText: 'Size',
        dataField: 'size',
        //sort: true,
        thClasses: 'width5',
        tdClasses: 'width5'
    },{
        headerText: 'Impacted Objects',
        dataField: 'noOfObjects',
        thClasses: 'width5',
        tdClasses: 'width5'
    },{
        headerText: 'Project Manager',
        dataField: 'projectManager',
        thClasses: 'width10',
        tdClasses: 'width10',
        sort: true
    },{
        headerText: 'RT Spoc',
        dataField: 'rtsSpoc',
        thClasses: 'width5',
        tdClasses: 'width5',
        sort: true
    },{
        headerText: 'Extended Team Members',
        dataField: 'extteammembers',
        thClasses: 'width10',
        tdClasses: 'width10'
    },{
        headerText: 'Scripts Shared',
        dataField: 'scriptshared',
        thClasses: 'width5',
        tdClasses: 'width5'
    },{
        headerText: 'Scripts Utilized',
        dataField: 'scriptutilized',
        thClasses: 'width5',
        tdClasses: 'width5'
    },{
        headerText: 'Scripts Executed',
        dataField: 'scriptexecuted',
        thClasses: 'width5',
        tdClasses: 'width5'
    },{
        headerText: 'RT Defects',
        dataField: 'rtdefects',
        thClasses: 'width5',
        tdClasses: 'width5'
    },{
        headerText: 'RT Miss',
        dataField: 'rtmiss',
        thClasses: 'width5',
        tdClasses: 'width5'
    },{
        headerText: 'Warranty Issues',
        dataField: 'warrantyissue',
        thClasses: 'width5',
        tdClasses: 'width5',
        sort: true
    },{
        headerText: 'Scripts Executed as part of Warranty',
        dataField: 'scriptExcpartOfwarranty',
        thClasses: 'width10',
        tdClasses: 'width10'
    },{
        headerText: 'Scripts Modified',
        dataField: 'scriptsmodified',
        thClasses: 'width5',
        tdClasses: 'width5'
    }
];


    if($rootScope.isTeamMember == true || ($rootScope.userRoles && $rootScope.userRoles.indexOf("admin")> -1)){
        var colm15 = vmsea.columnDataByBhuid[14];
        vmsea.columnDataByBhuid[14] = {
            headerText: 'New Scripts Received',
            dataField: 'newscriptreceived',
            thClasses: 'width5',
            tdClasses: 'width5'
        };
        vmsea.columnDataByBhuid[15] = colm15;
        vmsea.columnDataByBhuid.push({
            headerText: 'Efforts Utilized',
            dataField: 'efortsutilized',
            thClasses: 'width5',
            tdClasses: 'width5',
            sort: true
        });
    }else if($rootScope.isTeamMember==false){
        var colm15 = vmsea.columnDataByBhuid[14];
        vmsea.columnDataByBhuid[14] = {
            headerText: 'New Script Received',
            dataField: 'newscriptreceived',
            thClasses: 'width10',
            tdClasses: 'width10'
        };
        vmsea.columnDataByBhuid[15] = colm15;
    }

    vmsea.itemRenderers = {
        //link going to appear in grid
        'bhuId': 'search-bhu-link-renderer',//reportbhu-id-link-renderer
        'currentStatus': 'search-current-status-link-renderer',
        'warrantyissue': 'search-warranty-issue-link-renderer',
        'efortsutilized': 'search-efforts-utilized-link-renderer'
    };

    //grid-search-status.directive

    $scope.itemRenderers = {
        'description': 'repo-desc-item-renderer',
        'expectedTxt': 'expected-item-renderer',
        'tcodeTxt': 'tcode-item-renderer',
        'inputDataTxt': 'input-item-renderer',
        'itemName': 'itemname-link-renderer',
        'rtSpoc': 'spoc-details-renderer'
    };
  // Variable Definitions
    
    // Function Definitions
    vmsea.init = init;
    vmsea.formatFolderPath = formatFolderPath;
    vmsea.showTabData = showTabData;
    vmsea.getTestScriptDetails = getTestScriptDetails;
    vmsea.populateTestDetailsData = populateTestDetailsData;
    vmsea.populateTestDesignStepsData = populateTestDesignStepsData;
    vmsea.populateAttachmentsData = populateAttachmentsData;
    vmsea.checkAll = checkAll;
    vmsea.downloadTestScript = downloadTestScript;
    vmsea.isTestScriptChecked = isTestScriptChecked;
    vmsea.uncheckOther = uncheckOther;

    init();
     
    
    function init(){	
        if(vmsea.folderPath.length){
            vmsea.getTestScriptDetails(vmsea.folderPath[0].searchDTO[0].id, 0, 0, vmsea.folderPath[0].searchDTO[0].name);
        }
    }

    $scope.downloadAttachmentLink = function(aId) {
         window.location.href = repositoryservice.getDownloadTestScriptAttachmentUrl(aId);
    }
    
    function showTabData(tabIndex, testIndex) {
        $rootScope.activeTabIndex = tabIndex;
        vmsea.template = vmsea.testScriptsTabs[tabIndex].templateUrl;
        switch (tabIndex) {
            case 0:
                // vmtsl.details = vmtsl.testScriptsList[testIndex];
                vmsea.populateTestDetailsData(vmsea.testId);
                break;
            case 1:
                vmsea.populateTestDesignStepsData(vmsea.testId);
                break;
            case 2:
                vmsea.populateAttachmentsData(vmsea.testId, vmsea.itemName);
                break;
            default:
        }
    }

    function downloadTestScript(i) {
        var testIdsList = [],
            postTestIds;
        var downloadTestScriptList = $filter('filter')(vmsea.folderPath[i].searchDTO, {
            Selected: 'true'
        });
        angular.forEach(downloadTestScriptList, function(key, value) {
            testIdsList.push(key.id);
            postTestIds = testIdsList.join();
        });
        if(postTestIds){
             $timeout(function() {
                    window.location.href =  repositoryservice.downloadTestScript(postTestIds);
                }, 500);
        }
    }

    function formatFolderPath(folderName){
            var formattedString = folderName.replace(/%/gi,">").substring(9,folderName.length);
            var i;
            for (i = 0; i <= formattedString.length; i++) {
                var newFormattedString = formattedString.replace(/>/gi, " > ");
             } 
        return newFormattedString
    }

    function getTestScriptDetails(testId, pi, i, itemName) {
        vmsea.testId = testId;
        vmsea.itemName = itemName;
        vmsea.selectedParentTestScript = pi;
        vmsea.selectedTestScript = i;
        vmsea.showTabData(0, i);
    }

    function populateTestDetailsData(tId) {
        repositoryservice.getTestScriptDetailsData(tId).then(function(response) {
            if(response && response.errorCode){
                $scope.$emit('alert', {
                    message: response.message,
                    success: false
                });
            }else{
                if(response && response.testScriptDetailsList){
                $scope.details = response.testScriptDetailsList[0];
            }else{
                $scope.details = [];
                }
            }     
        });
    }

    function populateTestDesignStepsData(tId) {
        repositoryservice.getTestScriptDesignSteps(tId).then(function(response) {
            if(response && response.errorCode){
                    $scope.$emit('alert', {
                    message: response.message,
                    success: false
                });
            }else{
               if(response && response.testScriptsDesignList.length){
                 $scope.designStepsData = response.testScriptsDesignList;
             }else{
                $scope.designStepsData = [];
                } 
            } 
        });
    }

    function populateAttachmentsData(tId, tName) {
        repositoryservice.getTestScriptAttachmentsData(tId).then(function(response) {
           if(response && response.errorCode){
                    $scope.$emit('alert', {
                    message: response.message,
                    success: false
                });
            }else{
                 $scope.selectedTestScript = tName;
            $scope.attachmentsDataList = response;
            }
        });
    }

    function checkAll(i) {
        console.log(i);
            angular.forEach(vmsea.folderPath[i].searchDTO, function(key, item) {
                key.Selected =  vmsea.selectedAll[i] ? vmsea.selectedAll[i]: false;
            });
            if(vmsea.array.indexOf(i) == -1){
                 vmsea.array.push(i);
            }
            if(vmsea.array.length > 1){
               angular.forEach(vmsea.folderPath[vmsea.array[0]].searchDTO, function(key, item) {
                key.Selected =  false;
                vmsea.selectedAll[vmsea.array[0]] = false;
            });
                vmsea.array.splice(0, 1);     
            }
    }

    function isTestScriptChecked(parentIndex, index, e){
        var childCheckCount = 0;
        var parentId = 0;
        angular.forEach(vmsea.folderPath[parentIndex].searchDTO, function(key, item){
          childCheckCount += key.Selected ? 1 : 0;
        });
        if(childCheckCount == vmsea.folderPath[parentIndex].searchDTO.length){
            vmsea.selectedAll[parentIndex] = true;
        }else{
            vmsea.selectedAll[parentIndex] = false;
        }
        vmsea.uncheckOther(parentIndex);
    }

    function uncheckOther(parentIndex){
        if(vmsea.array.indexOf(parentIndex) == -1){
        vmsea.array.push(parentIndex);
            }
            if(vmsea.array.length > 1){
               angular.forEach(vmsea.folderPath[vmsea.array[0]].searchDTO, function(key, item) {
                key.Selected =  false;
                vmsea.selectedAll[vmsea.array[0]] = false;
            });
                vmsea.array.splice(0, 1);     
            }
    }

}

module.exports = SearchController;