RepositoryController.$inject = ['$state', '$scope', '$log', 'repositoryservice', 'testFolders'];

function RepositoryController($state, $scope, $log, repositoryservice, testFolders) {
    var vmrep = this;
    console.log(testFolders);
    vmrep.testFoldersList = testFolders.testFoldersList;
    if(testFolders && testFolders.errorCode){
            $scope.$emit('alert', {
                message: 'RT Dashboard currently down for Maintenance. We will be back soon. Thank you for your patience.',
                success: false
            });
        }
    // Variable Definitions
    // Function Definitions
    vmrep.init = init;
    vmrep.getChildFolders = getChildFolders;
    init();
    /**
     * init
     * Intializing On Load Services for Repository Page
     */
    function init() {}

    function getChildFolders(itemName, itemId) {
        repositoryservice.getChildTestFolders(itemId).then(function(modulesData) {
            repositoryservice.setRepositoryBreadCrumbChain(itemName, itemId);
             $scope.$emit('repolist', {
                    repoChain: repositoryservice.getRepositoryBreadCrumbChain()
                });
            if(modulesData && modulesData.errorCode){
                    $scope.$emit('alert', {
                    message: modulesData.message,
                    success: false
                });
            }else{
                vmrep.modules = modulesData;
            }
            
            $state.go('root.repository.testfolders.modules', {
                modulesData: vmrep.modules,
                folderName: itemName
            });
        });
    }
}
module.exports = RepositoryController;