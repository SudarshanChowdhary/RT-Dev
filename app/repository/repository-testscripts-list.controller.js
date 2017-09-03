RepositoryTestScriptListController.$inject = ['$state', '$stateParams', '$scope', '$rootScope', '$log', '$filter', '$timeout', 'repositoryservice'];

function RepositoryTestScriptListController($state, $stateParams, $scope, $rootScope, $log, $filter, $timeout, repositoryservice) {
    var vmtsl = this;
    vmtsl.checkCount = '';
    vmtsl.checkedValues = [];
    // Variable Definitions
    console.log($state.params);
    vmtsl.testScriptsList = [];
    $rootScope.tsFolderName = $state.params.tsFolderName;
    vmtsl.testScriptsTabs = [{
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
    $scope.details = {};
    $scope.gridOptions = {
        enablePagination: false
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
    $scope.itemRenderers = {
        'description': 'repo-desc-item-renderer',
        'expectedTxt': 'expected-item-renderer',
        'tcodeTxt': 'tcode-item-renderer',
        'inputDataTxt': 'input-item-renderer'
    };
    // Function Definitions
    vmtsl.init = init;
    vmtsl.getTestScriptDetails = getTestScriptDetails;
    vmtsl.sortTestScripts = sortTestScripts;
    vmtsl.showTabData = showTabData;
    vmtsl.downloadTestScript = downloadTestScript;
    vmtsl.populateTestDetailsData = populateTestDetailsData;
    vmtsl.populateTestDesignStepsData = populateTestDesignStepsData;
    vmtsl.populateAttachmentsData = populateAttachmentsData;
    $scope.downloadAttachmentLink = downloadAttachmentLink;
    vmtsl.getTestScriptsWithFolders = getTestScriptsWithFolders;
    vmtsl.checkAll = checkAll;
    vmtsl.isTestScriptChecked = isTestScriptChecked;
    init();
    /**
     * init
     * Intializing On Load Services for Page
     */
    function init() {
        if ($state.params.subLevelData && $state.params.subLevelData.folderArray.length) {
            vmtsl.testScriptFolderList = $state.params.subLevelData.folderArray[0];
        }
        if ($state.params.subLevelData && $state.params.subLevelData.testScriptDetailsList.length) {
            vmtsl.testScriptsList = $state.params.subLevelData.testScriptDetailsList[0];
            sortTestScripts(vmtsl.testScriptsList);
        }
        $scope.$on('testScriptListData', function(event, testScripts) {
                   vmtsl.testScriptFolderList = testScripts.folderArray ? testScripts.folderArray : [];
                   vmtsl.testScriptsList = testScripts.testScriptDetailsList ? testScripts.testScriptDetailsList : [];
                });
    }

    function showTabData(tabIndex) {
        $rootScope.activeTabIndex = tabIndex;
        vmtsl.template = vmtsl.testScriptsTabs[tabIndex].templateUrl;
        switch (tabIndex) {
            case 0:
                // vmtsl.details = vmtsl.testScriptsList[testIndex];
                vmtsl.populateTestDetailsData(vmtsl.testId);
                break;
            case 1:
                vmtsl.populateTestDesignStepsData(vmtsl.testId);
                break;
            case 2:
                vmtsl.populateAttachmentsData(vmtsl.testId, vmtsl.itemName);
                break;
            default:
        }
    }

    function getTestScriptsWithFolders(itemName, testId) {
        vmtsl.testScriptFolderList = [];
        vmtsl.testScriptsList = [];
        $rootScope.tsFolderName = itemName;
        repositoryservice.setRepositoryBreadCrumbChain(itemName, testId);
                     $scope.$emit('repolist', {
                            repoChain: repositoryservice.getRepositoryBreadCrumbChain()
                        });
        repositoryservice.getTestFoldersWithScripts(testId).then(function(data) {
            if(data && data.errorCode){
                    $scope.$emit('alert', {
                    message: data.message,
                    success: false
                });
            }else{
                if (data && data.testFoldersList && data.testFoldersList.length && data.testScriptDetailsList && !data.testScriptDetailsList.length) {
                vmtsl.testScriptFolderList = data.testFoldersList;
            } else if (data && data.testFoldersList && data.testFoldersList.length && data.testScriptDetailsList && data.testScriptDetailsList.length) {
                vmtsl.testScriptFolderList = data.testFoldersList;
                vmtsl.testScriptsList = data.testScriptDetailsList;
                vmtsl.getTestScriptDetails(vmtsl.testScriptsList[0].itemId, 0, vmtsl.testScriptsList[0].itemName);
            } else {
                vmtsl.testScriptsList = data.testScriptDetailsList;
                vmtsl.getTestScriptDetails(vmtsl.testScriptsList[0].itemId, 0, vmtsl.testScriptsList[0].itemName);
                }
            }
            
        });
        vmtsl.checkCount = 0;
        vmtsl.selectedAll = false;
    }

    function getTestScriptDetails(testId, i, itemName) {
        vmtsl.testId = testId;
        vmtsl.itemName = itemName;
        vmtsl.selectedTestScript = i;
        vmtsl.showTabData(0);
        vmtsl.selectedAll = false;
        vmtsl.checkAll();
    }

    function sortTestScripts(scriptsList) {
        if (scriptsList && scriptsList.length) {
            vmtsl.testScriptsList = $filter('orderBy')(scriptsList, 'itemId');
            getTestScriptDetails(vmtsl.testScriptsList[0].itemId, 0, vmtsl.testScriptsList[0].itemName);
        }
    }

     function populateTestDetailsData(tId) {
        repositoryservice.getTestScriptDetailsData(tId).then(function(response) {
            if(response && response.errorCode){
                $scope.$emit('alert', {
                message: response.message,
                success: false
            });
            }else{
            $scope.details = response.testScriptDetailsList[0];
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
                $scope.designStepsData = response.testScriptsDesignList;
            }
           
        });
    }

    function downloadTestScript() {
        var testIdsList = [],
            postTestIds;
        var downloadTestScriptList = $filter('filter')(vmtsl.testScriptsList, {
            Selected: 'true'
        });
        angular.forEach(downloadTestScriptList, function(key, value) {
            testIdsList.push(key.itemId);
            postTestIds = testIdsList.join();
        });
        if(postTestIds){
             $timeout(function() {
                    window.location.href =  repositoryservice.downloadTestScript(postTestIds);
                }, 500);
        }
        
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

    function downloadAttachmentLink(aId) {
         window.location.href = repositoryservice.getDownloadTestScriptAttachmentUrl(aId);
    }

    function checkAll() {
        vmtsl.checkCount = 0;
        vmtsl.checkedValues = [];
        if (vmtsl.selectedAll) {
            vmtsl.selectedAll = true;
            vmtsl.checkCount = 5;
        } else {
            vmtsl.selectedAll = false;
        }
        angular.forEach(vmtsl.testScriptsList, function(item) {
            item.Selected = vmtsl.selectedAll;
            vmtsl.checkedValues.push(item.itemName);
        });
    }

    function isTestScriptChecked(){
        vmtsl.checkCount = 0;
        vmtsl.checkedValues= [];
            angular.forEach(vmtsl.testScriptsList, function(item) {
               if(item.Selected){
                vmtsl.checkCount++;
            }
        });
        for(var i = 0; i< vmtsl.testScriptsList.length ; i++){
                if(vmtsl.testScriptsList[i].Selected){
                    vmtsl.checkedValues.push(vmtsl.testScriptsList[i].itemName);
                }
           }
        if(vmtsl.checkCount == vmtsl.testScriptsList.length){
            vmtsl.selectedAll = true;
        }
        else{
            vmtsl.selectedAll = false;
        }
    }

}
module.exports = RepositoryTestScriptListController;