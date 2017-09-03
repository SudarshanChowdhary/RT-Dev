rtRepoChain.$inject = [];
/* @ngInject */
function rtRepoChain() {
    var controller = ['$scope','repositoryservice', 'checkRepositoryService',  '$state', function($scope, repositoryservice, checkRepositoryService, $state) {
            $scope.goToRepoState = function(itemName, testId, listIndex){
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
                          $scope.repoChainList.repoChain.splice(listIndex, $scope.repoChainList.repoChain.length);
                            repositoryservice.setRepositoryBreadCrumbChain(itemName, testId);
                             $scope.$emit('repolist', {
                                    repoChain: repositoryservice.getRepositoryBreadCrumbChain()
                                });
                        if (data && data.testFoldersList && data.testFoldersList.length && data.testScriptDetailsList && !data.testScriptDetailsList.length) {
                            scriptListArray.folderArray.push(data.testFoldersList);
                            $state.transitionTo('root.repository.testfolders.modules.submodules', {
                                subLevelData: scriptListArray,
                                subFolderName: itemName
                            });
                        } else if (data && data.testFoldersList && data.testFoldersList.length && data.testScriptDetailsList && data.testScriptDetailsList.length) {
                            scriptListArray.folderArray.push(data.testFoldersList);
                            scriptListArray.testScriptDetailsList.push(data.testScriptDetailsList);
                            checkRepositoryService.hide();
                           $state.transitionTo($state.current, {subLevelData: scriptListArray,tsFolderName: itemName});
                            $scope.$emit('testScriptListData', {
                                    testScripts: scriptListArray
                                });
                        } else {
                            scriptListArray.testScriptDetailsList.push(data.testScriptDetailsList);
                            $state.transitionTo('root.repository.testfolders.modules.submodules.scriptslist', {
                                subLevelData: scriptListArray,
                                tsFolderName: itemName
                            });
                        }
                    }
                  
                });
                };
            $scope.clearRepoChain = function(){
                $scope.repoChainList.repoChain = [];
            };
        }],
        rtRepoDirective = {
            restrict: 'E',
            templateUrl: 'app/shared/check-repository/repo-chain.html',
            controller: controller,
            link: function(scope, element) {
                scope.message = null;
                scope.$on('repolist', function(event, repoChain) {
                    scope.repoChainList = repoChain;
                });

            }
        };
    return rtRepoDirective;
}
module.exports = rtRepoChain;