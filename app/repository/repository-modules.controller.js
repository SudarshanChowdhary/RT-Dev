RepositoryModulesController.$inject = ['$state', '$scope','$rootScope', '$log', 'repositoryservice'];

function RepositoryModulesController($state, $scope,$rootScope, $log, repositoryservice) {
    var vmrmc = this;
    // Variable Definitions
    if($state.params && $state.params.modulesData){
        vmrmc.modulesData = $state.params.modulesData.testFoldersList;
    }
    
    if ($state.params.subLevelData) {
        vmrmc.submodulesData = $state.params.subLevelData.folderArray[0];
    }
    $rootScope.folderName = $state.params.folderName;
    $rootScope.subFolderName = $state.params.subFolderName;
    // Function Definitions
    vmrmc.init = init;
    vmrmc.getTestScriptsWithFolders = getTestScriptsWithFolders;
    init();
    /**
     * init
     * Intializing On Load Services for Repository Modules Page
     */
    function init() {
        
    }

    function getTestScriptsWithFolders(itemName, testId) {
        var scriptListArray = {
            "folderArray": [],
            "testScriptDetailsList": []
        };
        repositoryservice.getTestFoldersWithScripts(testId).then(function(data) {
            if(data && data.errorCode){
                $scope.$emit('alert', {
                message: data.message,
                success: false
            });
            }else{
                if (data && data.testFoldersList && data.testFoldersList.length && data.testScriptDetailsList && !data.testScriptDetailsList.length) {
                    repositoryservice.setRepositoryBreadCrumbChain(itemName, testId);
                     $scope.$emit('repolist', {
                            repoChain: repositoryservice.getRepositoryBreadCrumbChain()
                        });
                scriptListArray.folderArray.push(data.testFoldersList);
                $state.go('root.repository.testfolders.modules.submodules', {
                    subLevelData: scriptListArray,
                    subFolderName: itemName
                });
            } else if (data && data.testFoldersList && data.testFoldersList.length && data.testScriptDetailsList && data.testScriptDetailsList.length) {
                repositoryservice.setRepositoryBreadCrumbChain(itemName, testId);
                     $scope.$emit('repolist', {
                            repoChain: repositoryservice.getRepositoryBreadCrumbChain()
                        });
                scriptListArray.folderArray.push(data.testFoldersList);
                scriptListArray.testScriptDetailsList.push(data.testScriptDetailsList);
                $state.go('root.repository.testfolders.modules.submodules.scriptslist', {
                    subLevelData: scriptListArray,
                    tsFolderName: itemName
                });
            } else {
                repositoryservice.setRepositoryBreadCrumbChain(itemName, testId);
                     $scope.$emit('repolist', {
                            repoChain: repositoryservice.getRepositoryBreadCrumbChain()
                        });
                scriptListArray.testScriptDetailsList.push(data.testScriptDetailsList);
                $state.go('root.repository.testfolders.modules.submodules.scriptslist', {
                    subLevelData: scriptListArray,
                    tsFolderName: itemName
                });
            }
            }
            
        });
    }

}
module.exports = RepositoryModulesController;