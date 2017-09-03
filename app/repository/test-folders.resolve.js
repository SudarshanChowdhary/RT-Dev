getTestFolders.$inject = ['repositoryservice', '$http', '$stateParams', '$q', 'spinnerService'];

function getTestFolders(repositoryservice, $http, $stateParams, $q, spinnerService) { //To fetch root level test folders which are defined in RT Dashboard database
    // return repositoryservice.getTestFolders();
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
module.exports = getTestFolders;