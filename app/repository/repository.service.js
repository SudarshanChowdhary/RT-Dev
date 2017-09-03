RepositoryService.$inject = ['$http', '$q', 'spinnerService'];

function RepositoryService($http, $q, spinnerService) {
    var repositoryService = {
            getTestFolders: getTestFolders,
            getChildTestFolders: getChildTestFolders,
            getTestFoldersWithScripts: getTestFoldersWithScripts,
            getTestScriptsData: getTestScriptsData,
            downloadTestScript: downloadTestScript,
            getTestScriptDetailsData: getTestScriptDetailsData, 
            getTestScriptDesignSteps: getTestScriptDesignSteps,
            getTestScriptAttachmentsData: getTestScriptAttachmentsData,
            getDownloadTestScriptAttachmentUrl: getDownloadTestScriptAttachmentUrl,
            getRepositoryBreadCrumbChain: getRepositoryBreadCrumbChain,
            setRepositoryBreadCrumbChain: setRepositoryBreadCrumbChain
        }, repositoryChain = [];
    return repositoryService

    function getTestFolders() { //To fetch root level test folders which are defined in RT Dashboard database
        var def = $q.defer();
        spinnerService.show();
        $http.get("repository/testfolders").success(function(data) {
            def.resolve(data);
            spinnerService.hide();
        }).error(function() {
            def.reject("Failed to get data");
        });
        return def.promise;
    }

    function getChildTestFolders(itemId) { //To fetch all child folders under the given test folder 
        var def = $q.defer();
        repositoryChain = [];
        spinnerService.show();
        $http.get("repository/testfolders/" + itemId).success(function(data) {
            def.resolve(data);
            spinnerService.hide();
        }).error(function() {
            def.reject("Failed to get data");
        });
        return def.promise;
    }

    function getTestFoldersWithScripts(testId) { //To fetch all child folders and scripts under the given test folder
        var def = $q.defer();
        spinnerService.show();
        $http.get("repository/testfolderswithscripts/" + testId).success(function(data) {
            def.resolve(data);
            spinnerService.hide();
        }).error(function() {
            def.reject("Failed to get data");
        });
        return def.promise;
    }

    function getTestScriptsData(testId) {
        var def = $q.defer();
        spinnerService.show();
        $http.get("repository/testscripts/" + testId).success(function(data) {
            def.resolve(data);
            spinnerService.hide();
        }).error(function() {
            def.reject("Failed to get data");
        });
        return def.promise;
    }

    function getTestScriptDetailsData(testId) {
        var def = $q.defer();
        spinnerService.show();
        $http.get("repository/testscript/"+testId+"/details").success(function(data) {
            def.resolve(data);
            spinnerService.hide();
        }).error(function() {
            def.reject("Failed to get data");
        });
        return def.promise;
    }

    function getTestScriptDesignSteps(testId) {
        var def = $q.defer();
        spinnerService.show();
        $http.get("repository/testscript/"+testId+"/designsteps").success(function(data) {
            def.resolve(data);
            spinnerService.hide();
        }).error(function() {
            def.reject("Failed to get data");
        });
        return def.promise;
    }

    function downloadTestScript(testIds) {
       return "repository/testscript/downloadselected?testIds=" + testIds;
    }

    function getTestScriptAttachmentsData(testId) {
        var def = $q.defer();
        spinnerService.show();
        $http.get("repository/testscript/"+testId+"/attachments").success(function(data) {
            def.resolve(data);
            spinnerService.hide();
        }).error(function() {
            def.reject("Failed to get test script attachments");
        });
        return def.promise;
    }

    function getDownloadTestScriptAttachmentUrl(aId) {
        return "repository/testscript/attachment/"+aId;
    }

  

    function getRepositoryBreadCrumbChain(){
         return repositoryChain;
    }

    function setRepositoryBreadCrumbChain(name, id){
        chainObj =  {
                      'testId': '',
                       'itemName': ''
                   };
        chainObj.itemName = name;
        chainObj.testId = id;
        repositoryChain.push(chainObj);
    }
}
module.exports = RepositoryService;